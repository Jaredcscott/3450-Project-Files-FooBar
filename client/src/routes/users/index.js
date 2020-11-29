import React, { Component, useState, Checkbox } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'
import axios from 'axios'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'

const ONE_SECOND = 1 // ms

function getUsers() {
	return axios
		.get('http://localhost:8100/user/all')
		.then((res) => {
			console.log('successful gotten accounts')
			return res.data.data
		})
		.catch(() => null)
}

function none() {}

function promote(){
	return axios
		.get('http://localhost:8100/user/all')
		.then((res) => {
			console.log('successfully retrieved accounts')
			return res.data.data
		})
		.catch(() => null)
}

export default function Users() {
	const users = useQuery('users', getUsers, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const queryCache = useQueryCache()
	const USERS = users.data

	if (!USERS) {
		return null
	} else
		return (
			<Screen>
				<Background>
					<Header text="Users"></Header>
					<Form>
						<UserTable users={USERS} />
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
								<a href="<Fill In>">About Dan's Bagel Shop</a>
							</li>
							<li>
								<a href="<Fill In">Contact Us</a>
							</li>
						</ul>
					</Footer>
				</Background>
			</Screen>
		)
}

function UserRow({user}) {
	const queryCache = useQueryCache()
	const name = <span style={{ color: 'black' }}>{user.name}</span>
	return (
		<tr style={{"fontSize":"20px", "textAlign":"center"}}>
			<td>{ name }</td>	
			<td>{ user.email }</td>
			<td>${ user.balance / 100 }</td>
			<td>{ user.roles.join(',') }</td>
			<td style={{"fontSize":"15px"}}>
				<Button
					color="primary"
					onClick={() =>{
						if (!(user.roles.find((element) => element === 'CHEF'))) {
							updateRoles(queryCache,user._id,[...user.roles, 'CHEF'])
						}
						else {
							updateRoles(queryCache,user._id,user.roles.filter((element) => element != 'CHEF'))
						}
					}}>
					Toggle Chef
				</Button>
				<Button
					color="primary"
					onClick={() =>{
						if (!(user.roles.find((element) => element === 'CASHIER'))) {
							updateRoles(queryCache,user._id,[...user.roles, 'CASHIER'])
						}
						else {
							updateRoles(queryCache,user._id,user.roles.filter((element) => element != 'CASHIER'))
						}
					}}>
					Toggle Cashier
				</Button>
				<Button
					color="primary"
					onClick={() =>{
						if (!(user.roles.find((element) => element === 'MANAGER'))) {
							updateRoles(queryCache,user._id,[...user.roles, 'MANAGER'])
						}
						else {
							updateRoles(queryCache,user._id,user.roles.filter((element) => element != 'MANAGER'))
						}
					}}>
					Toggle Manager
				</Button>
				<Button
					color="primary"
					onClick={() =>{
						if (!(user.roles.find((element) => element === 'CUSTOMER'))) {
							updateRoles(queryCache,user._id,[...user.roles, 'CUSTOMER'])
						}
						else {
							updateRoles(queryCache,user._id,user.roles.filter((element) => element != 'CUSTOMER'))
						}
					}}>
					Toggle Customer
				</Button>
			</td>
		</tr>
	)
}

function updateRoles(queryCache: any,id: string, roles: Array<string>) {
	axios
		.post(`http://localhost:8100/user/${id}`, { 
			roles
		})
		.then(() => {
			console.log('successfully changes roles')
			queryCache.invalidateQueries('users')
		})
		.catch((err) => {
			console.log('failed to update roles')
			console.error(err)
		})
}

class UserTable extends React.Component {
	render() {
		const rows = []
		this.props.users.forEach((user) => {
			rows.push(<UserRow user={user} key={user.name} />)
		})

		return (
			<table>
				<thead>
					<tr style={{"fontSize":"30px"}}>
						<th >Name </th>
						<th >Email </th>
						<th >Balance </th>
						<th >Roles </th>
						<th >Actions </th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
}
