import {
	ORDER_STATUS,
	PREPARING_BEFORE_PICKUP,
	PREPARING_UPDATE_RATE,
} from '../utils/constants'
import { Order } from '../models/order'

const prepareOrderStatus = () => {
	Order.updateMany(
		{
			status: ORDER_STATUS.PLACED,
			pickupAt: { $lte: Date.now() + PREPARING_BEFORE_PICKUP },
		},
		{ $set: { status: ORDER_STATUS.PREPARING } }
	)
		.then(() => {})
		.catch(console.error)
}

export default function startUpdatingOrders() {
	prepareOrderStatus()
	setInterval(prepareOrderStatus, PREPARING_UPDATE_RATE)
}
