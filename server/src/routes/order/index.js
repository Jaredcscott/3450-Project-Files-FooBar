// @flow
import { Router } from 'express'
import { verifiedUserSignedIn, verifyUserHasRole } from '../../middleware/auth'
import type {
	AuthenticatedUserRequest,
	Order as OrderType,
	PopulatedOrder,
} from '../../utils/types'
import { Item } from '../../models/inventoryItem'
import { ORDER_STATUS, ORDER_STATUS_ENUM, ROLES } from '../../utils/constants'
import * as validate from '../../utils/validators'
import { Types as mongooseTypes } from 'mongoose'
import { Order } from '../../models/order'

const ORDER_VALIDATOR = validate.isObjectWith({
	beverages: validate.isArrayOf(mongooseTypes.ObjectId.isValid),
	bagels: validate.isArrayOf(
		validate.isObjectOf({
			bagel: mongooseTypes.ObjectId.isValid,
			toppings: validate.isArrayOf(mongooseTypes.ObjectId.isValid),
		})
	),
	pickupAt: validate.isGreaterOrEqualTo(0),
})

const ENDING_STATUSES = new Set([
	ORDER_STATUS.FULFILLED,
	ORDER_STATUS.DID_NOT_PICK_UP,
	ORDER_STATUS.CANCELED,
])

const CAN_UPDATE_STATUS_FROM = new Set([
	ORDER_STATUS.PREPARING,
	ORDER_STATUS.PREPARED,
	ORDER_STATUS.PLACED,
])
const CAN_UPDATE_TO_STATUS = {
	[ROLES.CASHIER]: new Set([
		ORDER_STATUS.DID_NOT_PICK_UP,
		ORDER_STATUS.FULFILLED,
	]),
	[ROLES.CHEF]: new Set([ORDER_STATUS.PREPARED]),
}

/**
 * populateOrders - from a list of orders which only contains ids, populate the ids with their respective items
 *
 * @param  {OrderType[]} orders - the orders to populate
 * @returns Promise<PopulatedOrder> - the populated orders
 */
async function populateOrders(orders: OrderType[]): Promise<PopulatedOrder[]> {
	const itemIds = new Set()
	orders.forEach((order) => {
		order.beverages.forEach((id) => itemIds.add(id))
		order.bagels.forEach((bagel) => {
			itemIds.add(bagel.bagel)
			bagel.toppings.forEach((id) => itemIds.add(id))
		})
	})
	const itemsList = await Item.find({ _id: { $in: [...itemIds] } }).lean()
	const items = {}
	itemsList.forEach((item) => {
		items[item._id] = {
			_id: item._id,
			category: item.category,
			name: item.name,
		}
	})
	return orders.map((order) => {
		return {
			...order,
			beverages: order.beverages.map((id) => items[id]),
			bagels: order.bagels.map((bagel) => {
				return {
					bagel: items[bagel.bagel],
					toppings: bagel.toppings.map((id) => items[id]),
				}
			}),
		}
	})
}

type IncomingOrder = {|
	beverages: string[],
	bagels: {| bagel: string, toppings: string[] |}[],
	pickupAt: number,
|}

/**
 * calculatePrice - calculate a price for an order
 *
 * @param  {OrderType} order - the order to populate the price for
 * @returns Promise<number> - the price of the order
 */
async function calculatePrice(order: IncomingOrder): Promise<number> {
	const itemCount = {}
	const add = (id: string) => {
		if (!itemCount[id]) {
			itemCount[id] = 0
		}
		itemCount[id] += 1
	}
	order.beverages.forEach((id) => add(id))
	order.bagels.forEach((bagel) => {
		add(bagel.bagel)
		bagel.toppings.forEach((id) => add(id))
	})
	let priceMap: { [id: string]: number } = {}
	;(
		await Item.find({
			_id: { $in: Object.keys(itemCount) },
			onMenu: true,
		}).lean()
	).forEach((item) => (priceMap[item._id] = item.price))
	let price = 0
	Object.keys(itemCount).forEach((itemId) => {
		if (!priceMap[itemId] && priceMap[itemId] !== 0) {
			const err = new Error(`Unknown item ${itemId}`)
			err.name = 'UNKNOWN_ITEM'
			throw err
		}
		price += priceMap[itemId] * itemCount[itemId]
	})
	return price
}

const router = new Router()

router.get(
	'/',
	verifiedUserSignedIn,
	async (req: AuthenticatedUserRequest<>, res: express$Response) => {
		return res.status(200).json({
			data: await populateOrders(
				await Order.find({ placedBy: req.user._id }).lean()
			),
		})
	}
)

// post for placing an order and checking if order is valid
router.post(
	'/',
	verifiedUserSignedIn,
	async (
		req: AuthenticatedUserRequest<IncomingOrder>,
		res: express$Response
	) => {
		if (!ORDER_VALIDATOR(req.body)) {
			return res.status(400).json({ reason: 'malformed request' }).end()
		}
		const baseOrder: IncomingOrder = {
			bagels: req.body.bagels,
			beverages: req.body.beverages,
			pickupAt: req.body.pickupAt,
		}
		let price = 0
		try {
			price = await calculatePrice(baseOrder)
		} catch (err) {
			if (err.name === 'UNKNOWN_ITEM') {
				return res.status(409).json({
					code: err.name,
					reason: 'Order a referenced an item not in the menu',
				})
			}
			throw err
		}
		if (req.user.balance - price < 0) {
			return res.status(409).json({
				code: 'INSUFFICIENT_BALANCE',
				reason: 'not enough money in account',
			})
		}
		req.user.balance -= price
		const order = Order({
			...baseOrder,
			price,
			placed: Date.now(),
			status: ORDER_STATUS.PLACED,
			placedBy: req.user._id,
		})
		await order.save()
		await req.user.save()
		return res.status(200).json({
			data: order,
		})
	}
)

router.get(
	'/todo',
	verifyUserHasRole(([ROLES.CHEF, ROLES.CASHIER]: any)),
	async (req: AuthenticatedUserRequest<>, res: express$Response) => {
		const roles = new Set(req.user.roles)
		const statusesToGet = []
		if (roles.has(ROLES.CHEF)) {
			statusesToGet.push(ORDER_STATUS.PREPARING)
		}
		if (roles.has(ROLES.CASHIER)) {
			statusesToGet.push(ORDER_STATUS.PREPARED)
		}
		const orders = await populateOrders(
			await Order.find({ status: { $in: statusesToGet } }).lean()
		)
		return res.status(200).json({ data: orders })
	}
)

// calls calculate price if order works and returns it.
router.post(
	'/price',
	verifiedUserSignedIn,
	async (
		req: AuthenticatedUserRequest<IncomingOrder>,
		res: express$Response
	) => {
		if (!ORDER_VALIDATOR(req.body)) {
			return res.status(400).json({ reason: 'malformed request' }).end()
		}
		const baseOrder: IncomingOrder = {
			bagels: req.body.bagels,
			beverages: req.body.beverages,
			pickupAt: req.body.pickupAt,
		}
		let price = 0
		try {
			price = await calculatePrice(baseOrder)
		} catch (err) {
			if (err.name === 'UNKNOWN_ITEM') {
				return res.status(409).json({
					code: err.name,
					reason: 'Order a referenced an item not in the menu',
				})
			}
			throw err
		}
		return res.status(200).json({ data: price }).end()
	}
)

// finds orders placed by the user
router.get(
	'/:id',
	verifiedUserSignedIn,
	async (
		req: AuthenticatedUserRequest<{}, {| id: string |}>,
		res: express$Response
	) => {
		if (!mongooseTypes.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ reason: 'invalid id' }).end()
		}
		const order = await Order.findOne({
			_id: req.params.id,
			placedBy: req.user._id,
		}).lean()
		if (!order) {
			return res.status(404).end()
		}
		return res.status(200).json({
			data: order,
		})
	}
)

const UPDATE_STATUS_VALIDATOR = validate.isObjectWith({
	status: validate.isInEnum(ORDER_STATUS_ENUM),
})

// returns the status of the order
router.post(
	'/:id',
	verifiedUserSignedIn,
	async (
		req: AuthenticatedUserRequest<
			{| status: $Keys<typeof ORDER_STATUS> |},
			{| id: string |}
		>,
		res: express$Response
	) => {
		if (
			!mongooseTypes.ObjectId.isValid(req.params.id) ||
			!UPDATE_STATUS_VALIDATOR(req.body)
		) {
			return res.status(400).json({ reason: 'invalid request' }).end()
		}
		const order = await Order.findOne({
			_id: req.params.id,
		})
		if (!order) {
			return res.status(404).end()
		}
		if (!CAN_UPDATE_STATUS_FROM.has(order.status)) {
			return res.status(409).json({
				code: 'ORDER_ALREADY_FINISHED',
				reason: 'order has already been finished',
			})
		}
		const { status } = req.body
		if (
			String(order.placedBy) === String(req.user._id) &&
			order.status === ORDER_STATUS.PLACED &&
			status === ORDER_STATUS.CANCELED
		) {
			order.status = ORDER_STATUS.CANCELED
			await order.save()
			return res.status(200).json({ data: order })
		}
		for (let i = 0; i < req.user.roles.length; i++) {
			if (CAN_UPDATE_TO_STATUS[req.user.roles[i]]?.has(status)) {
				order.status = status
				if (ENDING_STATUSES.has(status)) {
					order.fulfilled = Date.now()
				}
				await order.save()
				return res.status(200).json({ data: order })
			}
		}
		return res.status(409).json({
			code: 'RESTRICTED_STATUS',
			reason: 'status sent was restricted and could not be set',
		})
	}
)

export default router
