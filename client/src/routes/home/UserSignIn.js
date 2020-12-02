import React, { useState } from 'react'
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
	Link,
} from '../../general'
import { useQueryCache } from 'react-query'
import { useHistory } from 'react-router-dom'
import { login } from '../../queries'

export default function UserHome() {
	const history = useHistory()

	const queryCache = useQueryCache()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<Screen>
			<Background>
				<Header text="Welcome to Dan's Bagel Shop"></Header>
				<Form>
					<div style={{ marginTop: '50px' }}>
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
					<div className="flex-container" style={{ paddingTop: '5px' }}>
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
								marginBottom: '10px',
								padding: '5px',
								marginTop: '100px',
								borderStyle: 'ridge',
								borderColor: 'blue',
								borderWidth: '15px',
								textShadow: '3px 3px 5px blue',
							}}>
							<Body text="'Dan's Bagel Shop has the best shmears!'-Sheldon Jones">
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
							<Link href={'/about'}>About Dan's Bagel Shop</Link>
						</li>
						<li>
							<Link href={'/contact'}>Contact Us</Link>
						</li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}
