import React from 'react'
import {
	Screen,
	Background,
	Header,
	Form,
	Button,
	Body,
	Footer,
	manImage,
	scoobyImage,
} from '../../general'
import { useHistory } from 'react-router-dom'
import type { User } from '../../types'

export default function UserHome({ user }: { user: User }) {
	const history = useHistory()

	return (
		<Screen>
			<Background>
				<Header text="Welcome to Dan's Bagel Shop"></Header>
				<Form>
					<div
						className="flex-container"
						style={{
							paddingTop: '5px',
							marginTop: '50px',
							margin: 'auto',
							fontSize: '25px',
						}}>
						<div className="flex-child">
							<h2
								style={{
									textShadow: '3px 3px 5px blue',
									textTransform: 'capitalize',
								}}>
								Hello {user.name}, we missed you! You are now logged in.
							</h2>
							<div className="flex-container">
								<div style={{ paddingLeft: '25%' }}>
									<Button color="primary" onClick={() => logout()}>
										Logout
									</Button>
								</div>
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
								marginBottom: '10px',
								padding: '5px',
								marginTop: '100px',
								borderStyle: 'ridge',
								borderColor: 'blue',
								borderWidth: '15px',
								textShadow: '3px 3px 5px blue',
							}}>
							<Body text="'Dan's Bagel Shop has the best smears!'-Sheldon Jones">
								<img
									src={manImage}
									className="photo"
									alt="Dans Bagel Shop"
									style={{ paddingLeft: '120px' }}
								/>
							</Body>
							<Body text="'I start every day with a Bagel from Dan's.'-Scooby Doo">
								<img
									src={scoobyImage}
									className="photo"
									alt="Dans Bagel Shop"
									style={{ paddingLeft: '25px', display: 'flex' }}
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
