// @flow
import { Schema } from 'mongoose'
import config from '../config'
import { createMongooseConnection } from '../database/connection'
import { INVENTORY_ITEM_CATEGORIES_ENUM } from '../utils/constants'

export const mongooseInventoryConnection = createMongooseConnection(
	config.inventoryDatabaseName
)

const InventoryItemSchema = new Schema(
	{
		category: {
			type: String,
			enum: INVENTORY_ITEM_CATEGORIES_ENUM,
			required: true,
		},
		name: { type: String, required: true },
		quantity: { type: Number, required: true, default: 100 },
		price: { type: Number, required: true },
		onMenu: { type: Boolean, required: true, default: true },
		targetCount: { type: Number, required: true },
	},
	{ minimize: false }
)

export const Item = mongooseInventoryConnection.model(
	'InventoryItem',
	InventoryItemSchema
)
