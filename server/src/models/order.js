// @flow
import { Schema } from 'mongoose'
import config from '../config'
import { createMongooseConnection } from '../database/connection'
import { ORDER_STATUS_ENUM, ORDER_STATUS } from '../utils/constants'
import { ObjectId } from 'mongoose'

export const mongooseOrderConnection = createMongooseConnection(
	config.orderDatabaseName
)

const OrderSchema = new Schema(
	{
		beverages: { type: [ObjectId], required: true, default: [] },
		bagels: {
			type: [
				{
					bagel: { type: ObjectId, required: true },
					toppings: { type: [ObjectId], required: true, default: [] },
				},
			],
			required: true,
			default: [],
		},
		price: {
			type: Number,
			required: true,
		},
		placed: { type: Number, required: true },
		pickupAt: { type: Number, required: true },
		fulfilled: Number,
		status: {
			type: String,
			enum: ORDER_STATUS_ENUM,
			default: ORDER_STATUS.PLACED,
		},
		placedBy: { type: ObjectId, required: true },
	},
	{ minimize: false }
)

export const Order = mongooseOrderConnection.model('Order', OrderSchema)
