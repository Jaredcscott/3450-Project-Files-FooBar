import React, { Component, useState } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import Body from '../../general/Body'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Button from '../../general/Button'

const ONE_SECOND = 1000 // ms

function getAnalytics() {
	return axios
		.get(`http://localhost:8100/analytics`)
		.then((res) => {
			console.log('successfully got Analytics')
			return res.data.data
		})
		.catch((err) => null)
}

function getUsers() {
	return axios
		.get('http://localhost:8100/user/all')
		.then((res) => {
			console.log('successfully retrieved accounts')
			return res.data.data
		})
		.catch(() => null)
}

export default function Analytics() {
	const analyticData = useQuery('analytics', getAnalytics, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const users = useQuery('users', getUsers, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const USERS = users.data
	const analytics = analyticData.data

	console.log(analytics)
	console.log(USERS)

	if (!analytics || !USERS) {
		return (
			<Screen>
				<Background>
					<Header text="Buisiness Analytics"></Header>
					<Body text="">Loading Data</Body>
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
	} else {
		return (
			<Screen>
				<Background>
					<Header text="Buisiness Analytics"></Header>
					<Form>
						<BusinessInfo
							name={"Dan's Bagel Shop"}
							balance={analytics.totalPrice}
							custCount={USERS.length}
							allOrders={analytics.orders.length}
						/>
					</Form>
					<Form>
						ORDERS
						{analytics.orders.length === 0 ? (
							<NoOrders />
						) : (
							<FilterableProductTable products={analytics.orders} />
						)}
					</Form>
					<Form>
						<div style={{ marginBottom: '25px' }}>
							USERS
							<UserTable users={USERS} />
						</div>
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
}

class BusinessInfo extends Component {
	render() {
		const name = this.props.name
		const balance = this.props.balance
		const custCount = this.props.custCount
		const curOrders = this.props.curOrders
		const empCount = this.props.empCount
		const allOrders = this.props.allOrders
		return (
			<section style={{ textShadow: '3px 3px 5px blue', fontSize: '25px' }}>
				<h4>
					{' '}
					<strong>Business Name: {name}</strong>
				</h4>
				<h4>Business Account Balance: ${balance / 100}</h4>
				<h4>User Count: {custCount}</h4>
				<h4>Historical Order Count: {allOrders}</h4>
			</section>
		)
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
							...bagelOrder.toppings.filter((item) => item).map((item) => item._id),
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
				<OrderLayout orders={this.props.products} />
			</ScreenCenter>
		)
	}
}

function NoOrders() {
	const history = useHistory()
	return <Form>No Order History To Display</Form>
}

function UserRow({ user }) {
	const queryCache = useQueryCache()
	const name = <span style={{ color: 'black' }}>{user.name}</span>
	const [funds, setFunds] = useState(user.balance)
	return (
		<tr style={{ fontSize: '20px', textAlign: 'center' }}>
			<td>{name}</td>
			<td>{user.email}</td>
			<td>${funds / 100}</td>
			<td>{user.roles.join(',')}</td>
		</tr>
	)
}

function none() {}

class UserTable extends React.Component {
	render() {
		const rows = []
		this.props.users.forEach((user) => {
			rows.push(<UserRow user={user} key={user._id} />)
		})
		return (
			<table>
				<thead>
					<tr style={{ fontSize: '30px' }}>
						<th>Name </th>
						<th>Email </th>
						<th>Balance </th>
						<th>Roles </th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
}
