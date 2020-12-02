import React, { useState } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { Form, Body, Header, Footer, Screen, Background, OrderTable } from '../../general'
import { useHistory } from 'react-router-dom'
import type { Analytics as AnalyticsType, User } from '../../types'
import { getAnalytics, getUsers } from '../../queries'

export default function Analytics() {
	const history = useHistory()

	const analytics: ?AnalyticsType = useQuery('analytics', getAnalytics, {
		refetchOnWindowFocus: false,
	}).data

	const users = useQuery('users', getUsers, {
		refetchOnWindowFocus: false,
	}).data

	return (
		<Screen>
			<Background>
				<Header text="Buisiness Analytics"></Header>
				{analytics && users ? (
					<>
						<Form>
							<section style={{ textShadow: '3px 3px 5px blue', fontSize: '25px' }}>
								<h4>
									{' '}
									<strong>Business Name: Dan's Bagel Shop</strong>
								</h4>
								<h4>Business Account Balance: ${analytics.totalPrice / 100}</h4>
								<h4>User Count: {users.length}</h4>
								<h4>Historical Order Count: {analytics.orders.length}</h4>
							</section>
						</Form>
						<Form>
							ORDERS
							<OrderTable orders={analytics.orders} />
						</Form>
						<Form>
							<div style={{ marginBottom: '25px' }}>
								USERS
								<UserTable users={users} />
							</div>
						</Form>
					</>
				) : (
					<Body text="">Loading Data</Body>
				)}

				<Footer>
					<ul>
						<li>
							<a onClick={() => history.replace('/account')}>
								{' '}
								Take Me To My Account
							</a>
						</li>
						<li>
							<a onClick={() => history.replace('/home')}>Home Page</a>
						</li>
						<li>
							<a onClick={() => history.replace('/about')}>About Dan's Bagel Shop</a>
						</li>
						<li>
							<a onClick={() => history.replace('/contact')}>Contact Us</a>
						</li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}

function UserTable({ users }: { users: User[] }) {
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
			<tbody>
				{users.map((user) => (
					<tr style={{ fontSize: '20px', textAlign: 'center' }} key={user._id}>
						<td>
							<span style={{ color: 'black' }}>{user.name}</span>
						</td>
						<td>{user.email}</td>
						<td>${user.balance / 100}</td>
						<td>{user.roles.join(', ')}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
