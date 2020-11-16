import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'
import man from '../../general/man.png'
import scooby from '../../general/scooby.png'
import config from '../../config'
import axios from 'axios'
import { useQuery, useQueryCache } from 'react-query'

// function useState(value) {
// 	let state = value
// 	let setState = (newState) => state = value
// 	return [state, setState]
// }

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

export default function Home() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})
	const queryCache = useQueryCache()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [verify, setVerifyPassword] = useState({})
	const [name, setName] = useState('')

	if (loggedin.data) {
		return (
			<Screen>
				<Background>
					<Header text="Welcome to Dan's Bagel Shop"></Header>
					<Form>
						<div
							className="flex-container"
							style={{
								'padding-top': '5px',
								'margin-top': '50px',
								margin: 'auto',
								'font-size': '25px',
							}}>
							<div className="flex-child">
								<h2 style={{ 'text-shadow': '3px 3px 5px blue' }}>
									Hello {loggedin.data.name}, we missed you! You are now logged
									in.
								</h2>
								<div className="flex-container">
									<div style={{ 'padding-left': '25%' }}>
										<Button color="primary" onClick={() => logout()}>
											Logout
										</Button>
									</div>
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
											onClick={() => history.replace('/account')}>
											Account Information
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Form>
					<Body text="">
						<div className="Testimonials">
							<div
								className="flex-container"
								style={{
									'margin-bottom': '10px',
									padding: '5px',
									'margin-top': '100px',
									'border-style': 'ridge',
									'border-color': 'blue',
									'border-width': '15px',
									'text-shadow': '3px 3px 5px blue',
								}}>
								<Body text="'Dan's Bagel Shop has the best shmears!'-Sheldon Jones">
									<img
										src={man}
										className="photo"
										alt="Dans Bagel Shop"
										style={{ 'padding-left': '120px' }}
									/>
								</Body>
								<Body text="'I start every day with a Bagel from Dan's.'-Scooby Doo">
									<img
										src={scooby}
										className="photo"
										alt="Dans Bagel Shop"
										style={{ 'padding-left': '25px', display: 'flex' }}
									/>
								</Body>
							</div>
						</div>
					</Body>
					<Footer>
						<ul>
							<li>
								<a href="account">Take Me To My Account</a>
							</li>
							<li>
								<a href="order">Place An Order</a>
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
					<Header text="Welcome to Dan's Bagel Shop"></Header>
					<Form>
						<div style={{ 'margin-top': '50px' }}>
							<div className="email">
								<input
									type="text"
									id="email"
									placeholder="Email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									autoFocus="1"
									aria-label="Email"
									style={{ width: '350px', height: '30px' }}
								/>
							</div>
							<div className="password">
								<input
									type="password"
									placeholder="Password"
									aria-label="Password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									style={{ width: '350px', height: '30px' }}
								/>
							</div>
						</div>
						<div className="flex-container" style={{ 'padding-top': '5px' }}>
							<div className="flex-child">
								<Button
									onClick={() => history.replace('/account')}
									color="primary"
									width="">
									Register
								</Button>
							</div>
							<div className="flex-child">
								<Button
									onClick={() => {
										login(email, password, queryCache)
									}}
									color="primary"
									width="">
									Sign In
								</Button>
							</div>
						</div>
					</Form>
					<Body text="">
						<div className="Testimonials">
							<div
								className="flex-container"
								style={{
									'margin-bottom': '10px',
									padding: '5px',
									'margin-top': '100px',
									'border-style': 'ridge',
									'border-color': 'blue',
									'border-width': '15px',
									'text-shadow': '3px 3px 5px blue',
								}}>
								<Body text="'Dan's Bagel Shop has the best shmears!'-Sheldon Jones">
									<img
										src={man}
										className="photo"
										alt="Dans Bagel Shop"
										style={{ 'padding-left': '120px' }}
									/>
								</Body>
								<Body text="'I start every day with a Bagel from Dan's.'-Scooby Doo">
									<img
										src={scooby}
										className="photo"
										alt="Dans Bagel Shop"
										style={{ 'padding-left': '25px', display: 'flex' }}
									/>
								</Body>
							</div>
						</div>
					</Body>
					<Footer>
						<ul>
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

function login(email: string, password: string, queryCache: any) {
	axios
		.post(`${config.serverUrl}/auth/login`, {
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
		.get(`${config.serverUrl}/auth/logout`, { credentials: 'include' })
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

function register(
	name: string,
	email: string,
	password: string,
	verifyPassword: string,
	queryCache: any
) {
	axios
		.post(`${config.serverUrl}/auth/register`, { name, email, password, verifyPassword })
		.then(() => {
			console.log('successful register')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to register')
			console.error(err)
		})
}
