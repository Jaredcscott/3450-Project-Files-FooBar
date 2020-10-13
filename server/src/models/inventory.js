import mongoose, { Schema } from 'mongoose'
import config from '../config'

export const mongooseInventoryConnection = mongoose.createConnection(
	`${config.dbUrl}${config.inventoryDatabaseName}`,
	{ useNewUrlParser: true }
)

const Category = ['BEVERAGE', 'SAMMICHE_TOPPINGS', 'SMEAR', 'BAGEL']

const InventorySchema = new Schema({
  enum: {
    type: Category,
  },  
  name: {
    type: String
  },
  qty: {
    type: Number
  },
  price: {
    type: Number
  },

});


const InventoryModel = mongooseInventoryConnection.model('Inventory', InventorySchema)

module.exports = {
	inventoryConnection: mongooseInventoryConnection,
	Inventory: InventoryModel,
}