import React, { useState } from 'react'
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


export default function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [verify, setVerifyPassword] = useState({})
	const [name, setName] = useState('')

	return (
		<Screen>
			<Background>
				<Header text="Welcome to Dan's Bagel Shop"></Header>
				<Form>
					<div>
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
								onClick={() => {
									console.log({ email, password })
									// Insert logic for sign up
								}}
								color="primary"
								width="">
								Register
							</Button>
						</div>
						<div className="flex-child">
							<Button
								onClick={() => {
									console.log({ email, password })
									// Insert logic for sign in
								}}
								color="primary"
								width="">
								Sign In
							</Button>
						</div>
					</div>
				</Form>
				<Footer>
					<div className="Testimonials">
						<div className="flex-container" style={{ 'padding-top': '5px' }}>
							<Body text="'Dan's Bagel Shop has the best shmears!'-Jimmy Joe">
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
									style={{ 'padding-left': '75px' }}
								/>
							</Body>
						</div>
					</div>
				</Footer>
			</Background>
		</Screen>
	)
}
