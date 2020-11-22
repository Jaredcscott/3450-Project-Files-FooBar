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
import config from '../../config'
import axios from 'axios'
import { useQuery, useQueryCache } from 'react-query'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

export default function Contact() {
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
					<Header text="Whats On Your Mind? "></Header>
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
									To Contact Us Fill Out This Form
								</h2>
								<div className="flex-container">
                                <div className="email">
								<input
									type="text"
									id="email"
									placeholder="Email"
									value={loggedin.data.email}
									autoFocus="1"
									aria-label="Email"
									style={{ width: '350px', height: '30px' }}
								/>
							</div>
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
								<a href="order">Place An Order</a>
							</li>
							<li>
								<a href="about">About Dan's Bagel Shop</a>
							</li>
							<li>
								<a href="home">Home</a>
							</li>
						</ul>
					</Footer>
				</Background>
			</Screen>
        )
	}
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
