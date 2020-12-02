import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useQueryCache } from 'react-query'
import { useHistory } from 'react-router-dom'
import { getOrders, getMenu, addOrder, setOrderStatus } from '../../queries'
import { Button, Form, Header, Footer, Screen, Background, Order } from '../../general'
import { ORDER_STATUS, type PopulatedOrder } from '../../types'
import { parseTime } from '../../utils/time'

export default function Orders() {
	const orders = useQuery('orders', getOrders, {
		refetchOnWindowFocus: false,
	}).data

	const history = useHistory()

	const info = useQuery('menu', getMenu)

	if (!info.data) {
		return <div>Loading</div>
	}

	if (!orders) {
		return null
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
								<OrderInteractive order={orders} key={order._id} />
							))
						)}
					</Form>
					<Footer>
						<ul>
							<li>
								<a href="account">Take Me To My Account</a>
							</li>
							<li>
								<a href="home">Home Page</a>
							</li>
							<li>
								<a href="about">About Dan's Bagel Shop</a>
							</li>
							<li>
								<a href="contact">Contact Us</a>
							</li>
						</ul>
					</Footer>
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
		return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	})

	const [currentTime, setCurrentTime] = useState(() => {
		const today = new Date()
		return `${today.getHours()}:${today.getMinutes()}`
	})

	return (
		<>
			<p>
				I would like my order to be ready at
				<input
					type="time"
					id="time"
					value={currentTime}
					onChange={(event) => setCurrentTime(event.target.value)}></input>
				on
				<input
					type="date"
					id="date"
					value={currentDate}
					onChange={(event) => setCurrentDate(event.target.value)}></input>
				<PlaceOrderButton
					color="primary"
					onClick={() => {
						onPlaced(
							addOrder({
								...orderToPlace,
								pickupAt: parseTime(currentDate, currentTime),
							})
						)
					}}>
					Place Order
				</PlaceOrderButton>
			</p>
		</>
	)
}

const PlaceOrderButton = styled(Button)`
	margin-left: ${({ theme }) => theme.spacing.large};
`
