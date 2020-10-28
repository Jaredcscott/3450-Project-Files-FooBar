// @flow
import { Router } from 'express'
import { verifyUserHasRole } from '../../middleware/auth'
import type {
	AuthenticatedUserRequest,
	MaybeUserRequest,
	InventoryItemCategory,
} from '../../utils/types'
import { Item } from '../../models/inventoryItem'
import { Order } from '../../models/order'
import calculatePrice from '../order/index'

import * as validate from '../../utils/validators'
import { ROLES, INVENTORY_ITEM_CATEGORIES_ENUM } from '../../utils/constants'
import { Types as mongooseTypes } from 'mongoose'

import type {
	AuthenticatedUserRequest,
	Order as OrderType,
	PopulatedOrder,
} from '../../utils/types'
import { ORDER_STATUS, ORDER_STATUS_ENUM, ROLES } from '../../utils/constants'


const router = new Router()


// return all data of an item for admin/manager
router.get(
	'/:id',
	verifyUserHasRole(([ROLES.ADMIN, ROLES.MANAGER]: any)),
	async (
		req: AuthenticatedUserRequest<{}, {| id: string |}>,
		res: express$Response
	) => {
		if (!mongooseTypes.ObjectId.isValid(req.params.id)) {
			return res.status(400).end()
		}

		const item = await Item.findOne().lean();
		const order = await Order.findOne().lean();
		const total = 0;
		for (const [price, Number] of Object.entries(order)) {
			total = total + Number;
		}
		const analysis = [item, order, total]

		return res.status(200).json({ data: analysis })
	}
)

export default router
