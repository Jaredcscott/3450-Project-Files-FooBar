import React from 'react'
import styled from 'styled-components'
import { useQuery, useQueryCache } from 'react-query'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from '../../general/Button'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'

const ONE_SECOND = 1000 // ms

function getOrders() {
	return axios
		.get('http://localhost:8100/order')
		.then((res) => {
			console.log('successfully retrieved orders')
			return res.data.data
		})
		.catch(() => null)
}

export default function Orders() {
	const orders = useQuery('orders', getOrders, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const PRODUCTS = orders.data

	const info = useQuery('menu', getMenu)

	if (!info.data) {
		return <div>Loading</div>
	}

	if (!PRODUCTS) {
		return null
	} else
		return (

			<Screen>
				<Background>
					<Header text="Order History"></Header>
					<Form>
						{PRODUCTS.length === 0 ? <NoOrders/> : <FilterableProductTable products={PRODUCTS} />}
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

const OrderHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const Grouping = styled.div`
	margin-left: ${({ theme }) => theme.spacing.indent};
	width: 100%;
	justify-content: space-between;
`

function UserName({ userId }: { userId: string }) {
	const user = useQuery(`user-${userId}`, getUser(userId))
	if (user.data) {
		return <div>{user.data.name}</div>
	}
	return null
}

function getUser(userId: string) {
	return () => {
		axios
			.get(`http://localhost:8100/user/${userId}`)
			.then((res) => {
				return res.data.data
			})
			.catch(() => null)
	}
}

const OrderWrapper = styled.div`
	width: 80%;
	font-size: ${({ theme }) => theme.font.size.large};
	margin: ${({ theme }) => theme.spacing.large};
	padding: ${({ theme }) => theme.spacing.large};
	border: 2px solid #75662b;
	border-radius: 4px;
`

type OrderItem = { _id: string, name: string }

function Order({
	
	order,
}: {
	order: {
		pickupAt: number,
		status: string,
		price: number,
		placedBy: string,
		beverages: Array<OrderItem>,
		bagels: Array<{ bagel: OrderItem, toppings: Array<OrderItem> }>,
	},
}) {
	const queryCache = useQueryCache()
	return (
		<OrderWrapper>
			<OrderHeader>
				<div>{order.status}</div>
				<div>Pickup At: {new Date(order.pickupAt).toISOString()}</div>
				<div>${order.price / 100}</div>
				<UserName userId={order.placedBy} />
			</OrderHeader>
			{order.beverages.length > 0 ? (
				<>
					<h3> Beverages</h3>
					<Grouping>
						{order.beverages.map((beverage) => (
							<div>{beverage.name}</div>
						))}
					</Grouping>{' '}
				</>
			) : null}
			{order.bagels.length > 0 ? (
				<>
					<h3>Bagels</h3>
					<Grouping>
						{order.bagels.map((bagelOrder) => (
							<>
								<h4>{bagelOrder.bagel.name}</h4>
								<Grouping>
									{bagelOrder.toppings.map((topping, index) => (
										<div key={index}>{topping.name}</div>
									))}
								</Grouping>
							</>
						))}
					</Grouping>
				</>
			) : null}
			<Button
				width="250px"
				onClick={() => addOrder(order.bagels, order.beverages, queryCache)}
				color="primary">
				Reorder
			</Button>
		</OrderWrapper>
	)
}

function addOrder(bagelList: Array, beverageList: Array, queryCache: any) {
	axios
	.post('http://localhost:8100/order', {
		bagels: bagelList
			.filter((bagelOrder) => bagelOrder.bagel._id)
			.map((bagelOrder) => {
				return {
					bagel: bagelOrder.bagel._id,
					toppings: [
						...bagelOrder.toppings.filter((item) => item).map((item) => item._id)
					],
				}
			}),
		beverages: beverageList.filter((item) => item).map((item) => item._id),
		pickupAt: Date.now(),
		
	})
	.then(() => {
		console.log('successfully placed order')
		queryCache.invalidateQueries('orders')
	})
	.catch((err) => {
		console.log('failed to place order')
		console.error(err)
	})
	
}

function getMenu() {
	return axios
		.get('http://localhost:8100/menu')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}


const OrdersWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

function OrderLayout({ orders }) {
	return (
		<OrdersWrapper>
			{orders.map((order) => (
				<Order order={order} key={order._id} />
			))}
		</OrdersWrapper>
	)
}

const ScreenCenter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`

class FilterableProductTable extends React.Component {
	render() {
		return (
			<ScreenCenter>
				<OrderLayout orders={this.props.products}/>
			</ScreenCenter>
		)
	}
}

function NoOrders() {
	const history = useHistory()
	return (
		<Form>
			No Order History To Display
			<div style={{ 'margin':'25px'}}>
				<Button
					color="primary"
					onClick={() => history.replace('/order')}>
					Place An Order
				</Button>
			</div>
		</Form>
	)
}