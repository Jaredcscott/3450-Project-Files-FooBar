// @flow
import { Router } from 'express'
import type { MaybeUserRequest } from '../../utils/types'
import { Item } from '../../models/inventoryItem'
import { INVENTORY_ITEM_CATEGORIES } from '../../utils/constants'

const router = new Router()

router.get('/', async (req: MaybeUserRequest<>, res: express$Response) => {
	const items = await Item.find({ onMenu: true }).lean()
	const menu: {
		[key: $Keys<typeof INVENTORY_ITEM_CATEGORIES>]: typeof Item[],
	} = {}
	Object.keys(INVENTORY_ITEM_CATEGORIES).forEach(
		(category) => (menu[category] = [])
	)
	items.forEach((item) => {
		if (!menu[item.category]) {
			menu[item.category] = []
		}
		menu[item.category].push(item)
	})
	return res.status(200).json({ data: menu })
})

export default router
