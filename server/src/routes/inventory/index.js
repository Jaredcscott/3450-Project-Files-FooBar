import { Router } from 'express'
import { Inventory } from '../../models/inventory'
import {default_inventory} from './inventory_data'
import mongoose from 'mongoose'

const router = new Router()

router.get('/', (request, response) =>
response.json({ Inventory }))


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

router.post('/updateItem', (req, res) => {



})

router.post('/importdefaultdata', (req, res) =>{
  Inventory.insertmany(
    default_inventory
  ),
  (err) => {
    if (err) {
      console.error(err)
      res.redirect('/err')
      return
    }
  }


})

export default router