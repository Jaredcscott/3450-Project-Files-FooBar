import React, { Component, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
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
			<section style={{ 'textShadow': '3px 3px 5px blue', 'fontSize':'25px' }}>
				<h4>
					{' '}
					<strong>Account Name: {name}</strong>
				</h4>
				<h4>Email Id: {email}</h4>
				<h4>Account Balance: ${balance / 100}</h4>
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

	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [verifyPassword, setVerifyPassword] = useState('')
	const queryCache = useQueryCache()

	const [addFunds, setFunds] = useState('')

	if (loggedin.data) {
		const roles = new Set(loggedin.data.roles)
		return (
			<Screen>
				<Background>
					<Header text="Account Information"></Header>
					<Form>
						<div style={{ 'marginBottom': '25px' }}>
							<ProfileInfo
								name={loggedin.data.name}
								email={loggedin.data.email}
								balance={loggedin.data.balance}
								role={loggedin.data.roles.join(',')}
							/>
							<div style={{ 'fontSize':'30px', 'textAlign':'left' }}>
								<Button
									color="primary"
									onClick={() => {
										var newBalance = loggedin.data.balance + (addFunds * 100)
										addFundsToAccount(newBalance, loggedin.data.name, queryCache)
									}}>
									Add funds
								</Button>
								
								<input type="number" value={addFunds}
									onChange={(event) => setFunds(event.target.value)}
									placeholder="Add Funds"
									>
								</input>

							</div>
							<div style={{'fontSize':'25px'}}>
								<div>
									Current Password:<input 
										type="text" 
										value={currentPassword}
										placeholder="Current Password"
										onChange={(event) => setCurrentPassword(event.target.value)}></input>
								</div>
								<div>
									New Password:<input 
										type="text" 
										value={newPassword}
										placeholder="New Password"
										onChange={(event) => setNewPassword(event.target.value)}>
									</input>
								</div>
								<div>
									Verify New Password:<input 
										type="text" 
										value={verifyPassword}
										placeholder="Verify Password"
										onChange={(event) => setVerifyPassword(event.target.value)}>	
									</input>
								</div>
							</div>
							<div className="flex-container" style={{'fontSize':'30px'}}>
								<Button
									color="primary"
									onClick={() => {
										history.replace('/home')
										logout()
									}}>
									Logout
								</Button>
								<div style={{ 'paddingLeft': '25px' }}>
									<Button
										color="primary"
										onClick={() => history.replace('/order')}>
										Place An Order
									</Button>
								</div>
								<div style={{ 'paddingLeft': '25px' }}>
									<Button
										color="primary"
										onClick={() => {
											history.replace('/orders')
										}}>
										Order History
									</Button>
								</div>
								<div style={{ 'paddingLeft': '25px' }}>
									<Button
											color="primary"
											onClick={() => {
												resetPassword(loggedin.data.name, currentPassword, newPassword, verifyPassword)
											}}>
											Reset Password
									</Button>
								</div>
								<div style={{ 'paddingLeft': '25px'}}>
									{ roles.has("MANAGER") || roles.has("ADMIN") ? <Button color="primary" onClick={() => history.replace('/analytics')}>Analytics</Button> : null}
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
					<Header text="Account Information"></Header>
					<Form>
						<h3>Join The Dan's Family</h3>
						<div style={{
							'marginBottom':'25px',
							'borderStyle': 'ridge',
							'borderColor': 'blue',
							'borderWidth': '15px',
							'padding':'15px'
							}}>
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
									register(name, email, password, password, queryCache, history)
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

function register(
	name: string,
	email: string,
	password: string,
	verifyPassword: string,
	queryCache: any,
	history: any
) {
	axios
		.post('http://localhost:8100/auth/register', { name, email, password, verifyPassword })
		.then(() => {
			console.log('successful register')
			queryCache.invalidateQueries('user')
			history.replace('/home')
		})
		.catch((err) => {
			console.log('failed to register')
			console.error(err)
			alert(err.response.data.reason)
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


function resetPassword(
	name: string,
	currentPassword: string,
	newPassword: string,
	verifyNewPassword: string,
){
	axios
		.get('http://localhost:8100/user', { 
			name,
			currentPassword,
			newPassword,
			verifyNewPassword, 
		})
		.then(() => {
			console.log('successfully Reset Password')
			window.location.reload(false)
		})
		.catch((err) => {
			console.log('failed to set new password')
			console.error(err)
		})
}

function addFundsToAccount(newBalance: Number, name: any, queryCache){
	axios
		.post(`http://localhost:8100/user`, { 
			name,
			newBalance
		})
		.then(() => {
			console.log('successfully added funds')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to add funds')
			console.error(err)
		})

}