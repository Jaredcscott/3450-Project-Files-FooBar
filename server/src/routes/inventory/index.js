import { Router } from 'express'
import { Inventory } from '../../models/inventory'
import {default_inventory} from './inventory_data'
import mongoose from 'mongoose'
import { request } from 'http'

const router = new Router()

router.get('/', (request, response) =>
response.json({ Inventory }))

// this is to create an item in the inventory
router.post('/createItem', (req, res) => {
	Inventory.register(
		new Inventory({
        category: req.body.category,
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
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

// an order will come in as an array of items.
// for each item we will find it in the inventory and deduct 1
// will need to turn this into a for loop for updating a order of data.
router.post('/updateOrder', async (req, res) => {
  req.Inventory.qty = req.body.qty
  await req.Inventory,save()
  response.status(200)
});

// this is similar to update order but instead to update a whole item from the inventory menu that will be made.
router.post('/updateItem', async (req, res) => {
  req.Inventory.qty = req.body.qty
  await req.Inventory,save()
  response.status(200)
});


router.post('/importdefaultdata', (req, res) =>{
  for (var x = 0; x <= default_inventory.length; x++){
    Inventory.register({
      category: default_inventory[x].category,
      name: default_inventory[x].name,
      qty: default_inventory[x].qty,
      price: default_inventory[x].price,
		}),
		(err) => {
			if (err) {
				console.error(err)
				res.redirect('/err')
				return
			}
    }
  }
}
)


export default router