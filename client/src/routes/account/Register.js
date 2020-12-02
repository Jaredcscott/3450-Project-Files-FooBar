import React, { useState } from 'react'
import { Form, Header, Footer, Screen, Background, Button, Link } from '../../general'
import { useHistory } from 'react-router-dom'
import { useQueryCache } from 'react-query'
import { register } from '../../queries'

export default function Register() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const queryCache = useQueryCache()

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
									register(name, email, password, password, queryCache, history)
								}}>
								Register
							</Button>
						</div>
						<div style={{ fontSize: '20px', textShadow: '3px 3px 5px blue' }}>
							<label>
								Password must contain: <br></br>-At least on upper case letter
								<br></br> -One lower case letter<br></br> -One number<br></br> -Must
								be between 8 and 32 digits long'
							</label>
						</div>
					</div>
				</Form>
				<Footer>
					<ul>
						<li>
							<Link href={'home'}>Home Page</Link>
						</li>
						<li>
							<Link href={'about'}>About Dan's Bagel Shop</Link>
						</li>
						<li>
							<Link href={'contact'}>Contact Us</Link>
						</li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}
