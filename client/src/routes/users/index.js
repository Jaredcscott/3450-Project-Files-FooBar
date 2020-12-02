import React, { useState } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { Button, Form, Header, Footer, Screen, Background } from '../../general'
import { getUsers, updateFunds, updateRoles } from '../../queries'
import { ROLES, type User } from '../../types'
import produce from 'immer'

export default function Users() {
	const users = useQuery('users', getUsers, {
		refetchOnWindowFocus: false,
	}).data

	if (!users) {
		return null
	} else
		return (
			<Screen>
				<Background>
					<Header text="Users"></Header>
					<Form>
						<table>
							<thead>
								<tr style={{ fontSize: '30px' }}>
									<th>Name </th>
									<th>Email </th>
									<th>Balance </th>
									<th>Roles </th>
									<th>Actions </th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<UserRow user={user} key={user._id} />
								))}
							</tbody>
						</table>
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

function UserRow({ user }: { user: User }) {
	const queryCache = useQueryCache()
	const [funds, setFunds] = useState(user.balance)
	return (
		<tr style={{ fontSize: '20px', textAlign: 'center' }}>
			<td>
				<span style={{ color: 'black' }}>{user.name}</span>
			</td>
			<td>{user.email}</td>
			<td>
				$
				<input
					type="number"
					value={funds / 100}
					style={{ width: '75px' }}
					onChange={(event) => {
						try {
							setFunds(Math.floor(Number(event.target.value) * 100))
						} catch {}
					}}
				/>
			</td>
			<td>{user.roles.join(',')}</td>
			<td style={{ fontSize: '15px' }}>
				<Button
					color="primary"
					onClick={() => {
						if (!user.roles.find((role) => role === ROLES.CHEF)) {
							updateRoles(queryCache, user._id, [...user.roles, ROLES.CHEF])
						} else {
							updateRoles(
								queryCache,
								user._id,
								user.roles.filter((role) => role !== ROLES.CHEF)
							)
						}
					}}>
					Toggle Chef
				</Button>
				<Button
					color="primary"
					onClick={() => {
						if (!user.roles.find((role) => role === ROLES.CASHIER)) {
							updateRoles(queryCache, user._id, [...user.roles, ROLES.CASHIER])
						} else {
							updateRoles(
								queryCache,
								user._id,
								user.roles.filter((role) => role !== ROLES.CASHIER)
							)
						}
					}}>
					Toggle Cashier
				</Button>
				<Button
					color="primary"
					onClick={() => {
						if (!user.roles.find((role) => role === ROLES.MANAGER)) {
							updateRoles(queryCache, user._id, [...user.roles, ROLES.MANAGER])
						} else {
							updateRoles(
								queryCache,
								user._id,
								user.roles.filter((role) => role !== ROLES.MANAGER)
							)
						}
					}}>
					Toggle Manager
				</Button>
				<Button
					color="primary"
					onClick={() => {
						if (!user.roles.find((role) => role === ROLES.CUSTOMER)) {
							updateRoles(queryCache, user._id, [...user.roles, ROLES.CUSTOMER])
						} else {
							updateRoles(
								queryCache,
								user._id,
								user.roles.filter((role) => role !== ROLES.CUSTOMER)
							)
						}
					}}>
					Toggle Customer
				</Button>
				<Button color="primary" onClick={() => updateFunds(funds, user._id, queryCache)}>
					Adjust Funds
				</Button>
			</td>
		</tr>
	)
}
