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

import { ROLES } from '../../utils/constants'

const router = new Router()

// return all data of an item for admin/manager
router.get(
	'/',
	verifyUserHasRole(([ROLES.ADMIN, ROLES.MANAGER]: any)),
	async (
		req: AuthenticatedUserRequest<{}, {| id: string |}>,
		res: express$Response
	) => {
		const items: {
			...InventoryItem,
			usedInOrders?: ?number,
		}[] = await Item.find().lean()
		const orders: OrderType[] = await Order.find().lean()
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
			item.usedInOrders = itemFrequency[item._id] || 0
		})

		return res.status(200).json({ data: { items, orders, totalPrice } })
	}
)

export default router
