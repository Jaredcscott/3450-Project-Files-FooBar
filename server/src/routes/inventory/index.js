import { Router } from 'express'
import { Inventory } from '../../models/inventory'
import {default_inventory} from './inventory_data'
import mongoose from 'mongoose'

const router = new Router()

// this is to populate the database with the table of data.
// router.post("/insertdefault", (req, res) =>{
//   for (var i = 0; i < default_inventory.length; i++){
//     Inventory.insert(default_inventory[i])
//   }
// })
inventory = db.collection(Inventory)



router.get('/', (request, response) =>
response.json({ Inventory }))


router.post('/register', (req, res) => {
	Inventory.register(
		new Inventory({
        category: "BAGEL",
        name: "Onion",
        qty: 0,
        price: 2,
		}),
		(err) => {
			if (err) {
				console.error(err)
				res.redirect('/err')
				return
			}
		}
	)
})

export default router