import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
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
			<section>
				<h3>
					{' '}
					<strong>Account Name: {name}</strong>
				</h3>
				<h4>Email Id: {email}</h4>
				<h4>Account Balance: {balance}</h4>
				<h5>Role: {role}</h5>
				<Button color="primary" onClick={() => logout()}>
						Logout
				</Button>
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
						<ProfileInfo
							name={loggedin.data.name}
							email={loggedin.data.email}
							balance={loggedin.data.balance}
							role={loggedin.data.roles}
						/>
					</Form>
				</Background>
			</Screen>
		)
	} else {
		return (
			<Screen>
				<Background>
					<Header text="Account Information"></Header>
					<h1>Not Signed in</h1>
					<div>
						<label>
							Name:{' '}
							<input
								type="text"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</label>
						<label>
							Email:{' '}
							<input
								type="text"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</label>
						<label>
							Password:{' '}
							<input
								type="text"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</label>
						<Button
							color="primary"
							onClick={() => register(name, email, password, password, queryCache)}>
							Register
						</Button>
						<Button color="primary" onClick={() => login(email, password, queryCache)}>
							Login
						</Button>
					</div>
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
		.get('http://localhost:8100/auth/logout', {credentials: 'include',})
		.then(() => {
			console.log('successfully logged out')
			console.log()
			window.location.reload(false);
			
		})
		.catch((err) => {
			console.log('failed to logout')
			console.error(err)
		})
}


// 	return fetch('http://localhost:8100/auth/logout', {
	// 	credentials: 'include',
	// }).then(() => {
	// 	window.queryCache.refetchQueries()
	// })

//const Screen = styled.div`
//	width: 100%;
//	flex: 1 0 0;
//	display: flex;
//	justify-content: center;
//	align-items: center;
//	background-color: ${({ theme }) => theme.color.base.darker};
//`
