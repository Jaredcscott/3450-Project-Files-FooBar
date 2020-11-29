import React, { useState } from 'react'
import Button from '../../general/Button'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'
import axios from 'axios'
import { useQuery } from 'react-query'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

function none() {}

export default function Contact() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const [email] = useState('')
	const [subject] = useState('')
	const [message] = useState('')

	if (loggedin.data) {
		return (
			<Screen>
				<Background>
					<Header text="What's On Your Mind? "></Header>
					<Form>
						<div
							className="flex-container"
							style={{
								'margin':'10px',
								'padding': '10px',
								'borderStyle': 'ridge',
								'borderColor': 'blue',
								'borderWidth': '15px',
								'font-size': '25px'
							}}>
							<div className="flex-child">
								<h2 style={{ 'text-shadow': '3px 3px 5px blue', 'marginTop':'5px'}}>
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
								<br></br>
								<input
									type="text"
									id="subject"
									placeholder="Subject"
									value={subject}
									autoFocus="1"
									aria-label="Subject"
									style={{ width: '350px', height: '30px' }}
								/>
								<br></br>
								<input
									type="text"
									id="message"
									placeholder="Message"
									value={message}
									autoFocus="1"
									aria-label="Message"
									style={{ width: '350px', height: '30px' }}
								/>
								<br></br>
								<Button
									color="primary"
									onClick={none}>
									Send
								</Button>
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
    else {
        return (
			<Screen>
				<Background>
					<Header text="Whats On Your Mind? "></Header>
					<Form>
						<div
							className="flex-container"
							style={{
								'margin':'10px',
								'padding': '10px',
								'borderStyle': 'ridge',
								'borderColor': 'blue',
								'borderWidth': '15px',
								'font-size': '25px'
							}}>
							<div className="flex-child">
								<h2 style={{ 'text-shadow': '3px 3px 5px blue', 'marginTop':'5px'}}>
									To Contact Us Fill Out This Form
								</h2>
								<div className="flex-container">
                                <div className="email">
								<input
									type="text"
									id="email"
									placeholder="Email"
									value={email}
									autoFocus="1"
									aria-label="Email"
									style={{ width: '350px', height: '30px' }}
								/>
								<br></br>
								<input
									type="text"
									id="subject"
									placeholder="Subject"
									value={subject}
									autoFocus="1"
									aria-label="Subject"
									style={{ width: '350px', height: '30px' }}
								/>
								<br></br>
								<input
									type="text"
									id="message"
									placeholder="Message"
									value={message}
									autoFocus="1"
									aria-label="Message"
									style={{ width: '350px', height: '30px' }}
								/>
								<br></br>
								<Button
									color="primary"
									onClick={none}>
									Send
								</Button>
							</div>
								</div>
							</div>
						</div>
					</Form>
					<Footer>
						<ul>
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