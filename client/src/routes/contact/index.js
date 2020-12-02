import React, { useState, useEffect } from 'react'
import { Button, Form, Header, Footer, Screen, Background, Link } from '../../general'
import { useQuery } from 'react-query'
import { getSignedInUser } from '../../queries'

export default function Contact() {
	const user = useQuery('user', getSignedInUser, {
		refetchOnWindowFocus: false,
	}).data

	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		if (user) {
			setEmail(user.email)
		}
	}, [user])

	return (
		<Screen>
			<Background>
				<Header text="What's On Your Mind? "></Header>
				<Form>
					<div
						className="flex-container"
						style={{
							margin: '10px',
							padding: '10px',
							borderStyle: 'ridge',
							borderColor: 'blue',
							borderWidth: '15px',
							fontSize: '25px',
						}}>
						<div className="flex-child">
							<h2 style={{ textShadow: '3px 3px 5px blue', marginTop: '5px' }}>
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
										onChange={(event) => setEmail(event.target.value)}
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
										onChange={(event) => setSubject(event.target.value)}
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
										onChange={(event) => setMessage(event.target.value)}
									/>
									<br></br>
									<Button
										color="primary"
										onClick={() => {
											alert(
												'this is just a mock, it does not actually do anything'
											)
										}}>
										Send
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Form>
				<Footer>
					<ul>
						{user ? (
							<>
								<li>
									<Link href={'/account'}>Take Me To My Account</Link>
								</li>
								<li>
									<Link href={'/order'}>Place An Order</Link>
								</li>
							</>
						) : null}
						<li>
							<Link href={'/about'}>About Dan's Bagel Shop</Link>
						</li>
						<li>
							<Link href={'/home'}>Home</Link>
						</li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}
