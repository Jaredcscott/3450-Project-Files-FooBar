import React, { Component, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import Body from '../../general/Body'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'
import axios from 'axios'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

class ProfileInfo extends Component {
	render() {
		const name = this.props.name
		const email = this.props.email
		const balance = this.props.balance
		const role = this.props.role
		return (
			<section style={{ 'text-shadow': '3px 3px 5px blue' }}>
				<h4>
					{' '}
					<strong>Account Name: {name}</strong>
				</h4>
				<h4>Email Id: {email}</h4>
				<h4>Account Balance: {balance}</h4>
				<h5>Role(s): {role}</h5>
			</section>
		)
	}
}

const ONE_SECOND = 1000 // ms

export default function Account() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [verifyPassword, setVerifyPassword] = useState('')
	const queryCache = useQueryCache()

	if (loggedin.data) {
		return (
			<Screen>
				<Background>
					<Header text="Account Information"></Header>
					<Form>
						<div style={{ 'margin-bottom': '25px' }}>
							<ProfileInfo
								name={loggedin.data.name}
								email={loggedin.data.email}
								balance={loggedin.data.balance}
								role={loggedin.data.roles}
							/>
							<div className="flex-container">
								<Button
									color="primary"
									onClick={() => {
										history.replace('/home')
										logout()
									}}>
									Logout
								</Button>
								<div style={{ 'padding-left': '25px' }}>
									<Button
										color="primary"
										onClick={() => history.replace('/order')}>
										Place An Order
									</Button>
								</div>
								<div style={{ 'padding-left': '25px' }}>
									<Button
										color="primary"
										onClick={() => {
											history.replace('/orders')
										}}>
										Order History
									</Button>
								</div>
							</div>
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
	} else {
		return (
			<Screen>
				<Background>
					<Header text="Account Information"></Header>
					<Form>
						<h3>Join The Dan's Family</h3>
						<div>
							<label>
								Name:{' '}
								<input
									type="text"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</label>
							<br></br>
							<label>
								Email:{' '}
								<input
									type="text"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</label>
							<br></br>
							<label>
								Password:{' '}
								<input
									type="text"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
							</label>
							<br></br>
							<Button
								color="primary"
								onClick={() => {
									register(name, email, password, password, queryCache)
									history.replace('/home')
								}}>
								Register
							</Button>
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
}

function register(
	name: string,
	email: string,
	password: string,
	verifyPassword: string,
	queryCache: any
) {
	axios
		.post('http://localhost:8100/auth/register', { name, email, password, verifyPassword })
		.then(() => {
			console.log('successful register')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to register')
			console.error(err)
		})
}

function login(email: string, password: string, queryCache: any) {
	axios
		.post('http://localhost:8100/auth/login', {
			email,
			password,
		})
		.then((res) => {
			console.log('successfully loged in')
			console.log(res)
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to login')
			console.error(err)
		})
}

function logout() {
	axios
		.get('http://localhost:8100/auth/logout', { credentials: 'include' })
		.then(() => {
			console.log('successfully logged out')
			console.log()
			window.location.reload(false)
		})
		.catch((err) => {
			console.log('failed to logout')
			console.error(err)
		})
}
