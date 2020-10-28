// @flow
import { Router } from 'express'
import { verifyUserHasRole } from '../../middleware/auth'
import type {
	AuthenticatedUserRequest,
	Order as OrderType,
	InventoryItem,
} from '../../utils/types'
import { Item } from '../../models/inventoryItem'
import { Order } from '../../models/order'
import * as validate from '../../utils/validators'

import { ROLES } from '../../utils/constants'

const QUERY_PARAMETER_VALIDATOR = validate.isObjectWith({
	startDate: validate.or(validate.isNumeric, validate.isUndefined),
	endDate: validate.or(validate.isNumeric, validate.isUndefined),
})

const router = new Router()

// return all data of an item for admin/manager
router.get(
	'/',
	verifyUserHasRole(([ROLES.ADMIN, ROLES.MANAGER]: any)),
	async (
		req: AuthenticatedUserRequest<
			{},
			{},
			{| startDate: number, endDate: number |}
		>,
		res: express$Response
	) => {
		if (!QUERY_PARAMETER_VALIDATOR(req.query)) {
			return res.status(400).json({ reason: 'malformed request' })
		}

		const items: {
			...InventoryItem,
			timesUsed?: ?number,
		}[] = await Item.find().lean()

		const { startDate, endDate } = req.query
		let queryParameters = {}

		if (startDate && endDate) {
			queryParameters = { placed: { $gte: startDate, $lte: endDate } }
		}

		const orders: OrderType[] = await Order.find(queryParameters).lean()
		const itemFrequency: { [itemId: string]: number } = {}
		const addToItemFrequency = (id: string) => {
			if (!itemFrequency[id]) {
				itemFrequency[id] = 0
			}
			itemFrequency[id] += 1
		}
		let totalPrice = 0
		orders.forEach((order) => {
			totalPrice += order.price
			order.bagels.forEach((bagel) => {
				addToItemFrequency(bagel.bagel)
				bagel.toppings.forEach((topping) => addToItemFrequency(topping))
			})
			order.beverages.forEach((beverageId) => addToItemFrequency(beverageId))
		})

		items.forEach((item) => {
			item.timesUsed = itemFrequency[item._id] || 0
		})

		return res.status(200).json({ data: { items, orders, totalPrice } })
	}
)

export default router
