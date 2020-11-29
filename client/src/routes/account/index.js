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
			<section style={{ textShadow: '3px 3px 5px blue', fontSize: '25px' }}>
				<h4>
					{' '}
					<strong style={{ textTransform: 'capitalize' }}>Account Name: {name}</strong>
				</h4>
				<h4>Email Id: {email}</h4>
				<h4>Account Balance: ${balance / 100}</h4>
				<h4>Role(s): {role}</h4>
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

	if (loggedin.data) {
		const roles = new Set(loggedin.data.roles)
		return (
			<Screen>
				<Background>
					<Header text="Account Information"></Header>
					<Form>
						<div style={{ marginBottom: '25px' }}>
							<ProfileInfo
								name={loggedin.data.name}
								email={loggedin.data.email}
								balance={loggedin.data.balance}
								role={loggedin.data.roles.join(',')}
							/>
							<div style={{ fontSize: '25px' }}>
								<label>
									Name:{' '}
									<input
										type="text"
										value={name}
										placeholder="Name"
										onChange={(event) => setName(event.target.value)}
									/>
								</label>
								<div style={{ paddingLeft: '25px' }}>
									<Button
										color="primary"
										onClick={() => {
											changeName(name, queryCache).then(() => setName(''))
										}}>
										Change Name
									</Button>
								</div>
							</div>
							<div style={{ fontSize: '25px' }}>
								<div>
									Current Password:
									<input
										type="text"
										value={currentPassword}
										placeholder="Current Password"
										onChange={(event) =>
											setCurrentPassword(event.target.value)
										}></input>
								</div>
								<div>
									New Password:
									<input
										type="text"
										value={newPassword}
										placeholder="New Password"
										onChange={(event) =>
											setNewPassword(event.target.value)
										}></input>
								</div>
								<div>
									Verify New Password:
									<input
										type="text"
										value={verifyPassword}
										placeholder="Verify Password"
										onChange={(event) =>
											setVerifyPassword(event.target.value)
										}></input>
								</div>
							</div>
							<div className="flex-container" style={{ fontSize: '30px' }}>
								<Button
									color="primary"
									onClick={() => {
										history.replace('/home')
										logout()
									}}>
									Logout
								</Button>
								<div style={{ paddingLeft: '25px' }}>
									<Button
										color="primary"
										onClick={() => history.replace('/order')}>
										Place An Order
									</Button>
								</div>
								<div style={{ paddingLeft: '25px' }}>
									<Button
										color="primary"
										onClick={() => {
											history.replace('/orders')
										}}>
										Order History
									</Button>
								</div>
								<div style={{ paddingLeft: '25px' }}>
									<Button
										color="primary"
										onClick={() => {
											resetPassword(
												currentPassword,
												newPassword,
												verifyPassword
											)
										}}>
										Reset Password
									</Button>
								</div>
								<div style={{ paddingLeft: '25px' }}>
									{roles.has('MANAGER') || roles.has('ADMIN') ? (
										<Button
											color="primary"
											onClick={() => history.replace('/analytics')}>
											Analytics
										</Button>
									) : null}
								</div>
							</div>
						</div>
					</Form>
					<Footer>
						<ul>
							<li>
								<a href="home">Home Page</a>
							</li>
							<li>
								<a href="order">Place An Order</a>
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
					<Header text="Registration Form"></Header>
					<Form>
						<h3 style={{ textShadow: '3px 3px 5px blue' }}>Join The Dan's Family</h3>
						<div
							style={{
								marginBottom: '25px',
								borderStyle: 'ridge',
								borderColor: 'blue',
								borderWidth: '15px',
								padding: '15px',
								textShadow: '3px 3px 5px blue',
							}}>
							<label>
								Name:{' '}
								<input
									type="text"
									value={name}
									placeholder="Name"
									onChange={(event) => setName(event.target.value)}
								/>
							</label>
							<br></br>
							<label>
								Email:{' '}
								<input
									type="text"
									value={email}
									placeholder="Email"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</label>
							<br></br>
							<label>
								Password:{' '}
								<input
									type="text"
									value={password}
									placeholder="Password"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</label>
							<br></br>
							<div style={{ margin: 'auto', textAlign: 'center' }}>
								<Button
									color="primary"
									onClick={() => {
										register(
											name,
											email,
											password,
											password,
											queryCache,
											history
										)
									}}>
									Register
								</Button>
							</div>
							<div style={{ fontSize: '20px', textShadow: '3px 3px 5px blue' }}>
								<label>
									Password must contain: <br></br>-At least on upper case letter
									<br></br> -One lower case letter<br></br> -One number<br></br>{' '}
									-Must be between 8 and 32 digits long'
								</label>
							</div>
						</div>
					</Form>
					<Footer>
						<ul>
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
			console.log('successfully registered')
			queryCache.invalidateQueries('user')
			history.replace('/home')
		})
		.catch((err) => {
			console.log('failed to register')
			console.error(err)
			alert(err?.response?.data?.reason || 'Failed to connect to server')
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

function resetPassword(currentPassword: string, newPassword: string, verifyNewPassword: string) {
	axios
		.post('http://localhost:8100/user', {
			currentPassword,
			newPassword,
			verifyNewPassword,
		})
		.then(() => {
			console.log('successfully reset password')
			window.location.reload(false)
		})
		.catch((err) => {
			console.log('failed to set new password')
			console.error(err)
		})
}

function changeName(name: string, queryCache: any) {
	return axios
		.post('http://localhost:8100/user', {
			name,
		})
		.then(() => {
			console.log('successfully changed name')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to change name')
			console.error(err)
			alert('failed to change name')
		})
}
