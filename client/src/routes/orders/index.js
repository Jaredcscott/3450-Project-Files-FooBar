import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useQueryCache } from 'react-query'
import { useHistory } from 'react-router-dom'
import { getOrders, addOrder, setOrderStatus } from '../../queries'
import { Button, Form, Header, Screen, Background, Order, BasicFooter } from '../../general'
import { ORDER_STATUS, type PopulatedOrder, type OrderToSendToServer } from '../../types'
import { parseTime, normalizeTime, normalizeDate } from '../../utils/time'

export default function Orders() {
	const orders = useQuery('orders', getOrders, {
		refetchOnWindowFocus: false,
	}).data

	const history = useHistory()

	if (!orders) {
		return <div>Loading</div>
	} else
		return (
			<Screen>
				<Background>
					<Header text="Order History"></Header>
					<Form>
						{orders.length === 0 ? (
							<Form>
								No Order History To Display
								<div style={{ margin: '25px' }}>
									<Button
										color="primary"
										onClick={() => history.replace('/order')}>
										Place An Order
									</Button>
								</div>
							</Form>
						) : (
							orders.map((order) => (
								<OrderInteractive order={order} key={order._id} />
							))
						)}
					</Form>
					<BasicFooter />
				</Background>
			</Screen>
		)
}

function OrderInteractive({ order }: { order: PopulatedOrder }) {
	const queryCache = useQueryCache()
	const [isPlacingOrder, setIsPlacingOrder] = useState(false)
	return (
		<Order showItems={true} order={order}>
			{!isPlacingOrder ? (
				<Button width="250px" onClick={() => setIsPlacingOrder(true)} color="primary">
					Reorder
				</Button>
			) : (
				<PlaceOrder
					orderToPlace={order}
					onPlaced={(promise) => {
						promise.then(() => {
							setIsPlacingOrder(false)
							queryCache.invalidateQueries('orders')
						})
					}}
				/>
			)}
			{order.status === ORDER_STATUS.PLACED ? (
				<Button
					width="250px"
					onClick={() => {
						setOrderStatus(order._id, ORDER_STATUS.CANCELED).then(() => {
							queryCache.invalidateQueries('orders')
						})
					}}
					color="warn">
					Cancel Order
				</Button>
			) : null}
		</Order>
	)
}

function PlaceOrder({
	orderToPlace,
	onPlaced,
}: {
	orderToPlace: any,
	onPlaced: (promise: Promise<*>) => void,
}) {
	const [currentDate, setCurrentDate] = useState(() => {
		const today = new Date()
		return normalizeDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
	})

	const [currentTime, setCurrentTime] = useState(() => {
		const today = new Date()
		return normalizeTime(`${today.getHours()}:${today.getMinutes()}`)
	})

	return (
		<>
			<div>
				I would like my order to be ready at
				<input
					type="time"
					id="time"
					value={currentTime}
					onChange={(event) => setCurrentTime(normalizeTime(event.target.value))}></input>
				on
				<input
					type="date"
					id="date"
					value={currentDate}
					onChange={(event) => setCurrentDate(normalizeDate(event.target.value))}></input>
				<PlaceOrderButton
					color="primary"
					onClick={() => {
						onPlaced(
							addOrder(
								normalizeOrder({
									...orderToPlace,
									pickupAt: parseTime(currentDate, currentTime),
								})
							)
						)
					}}>
					Place Order
				</PlaceOrderButton>
			</div>
		</>
	)
}

function normalizeOrder(order: PopulatedOrder): OrderToSendToServer {
	return {
		bagels: order.bagels.map((bagel) => {
			return {
				bagel: bagel.bagel._id,
				toppings: bagel.toppings.map((topping) => topping._id),
			}
		}),
		beverages: order.beverages.map((beverage) => beverage._id),
		pickupAt: order.pickupAt,
	}
}

const PlaceOrderButton = styled(Button)`
	margin-left: ${({ theme }) => theme.spacing.large};
`
