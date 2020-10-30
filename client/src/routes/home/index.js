import React from 'react'
import logo from '../../general/logo.png'
import styled from 'styled-components'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import Background from '../../general/Background'


export default function Home() {
	return (
		<Screen>
			<Background>
				<header className="App-header">
					<div className="flex-container" style={{'padding-top': "5px"}}>
						<div className="flex-child">
							<p style={{'font-family': 'PT Sans', 'padding-right': "100px"}}>Welcome to Dan's Bagel Shop</p>
						</div>
						<div>
							<img src={logo} className="photo" alt="Dans Bagel Shop" width="275px" height="183px"/>
						</div>
					</div>
				</header>

				<Form>
					<div>
						<div className="email">
							<input type="text" id="email" placeholder="Email" autofocus="1" aria-label="Email"/>
						</div>
						<div className="password">
							<input type="password" placeholder="Password" aria-label="Password"/>
						</div>
					</div>

					<div className="flex-container" style={{'padding-top': "5px"}}>
						<div className="flex-child">
							<Button width='250px'
								onClick={() => {
									//Insert logic for sign up
								}}
								color='primary'>Sign Up
							</Button>
						</div>
						<div className="flex-child">
							<Button
								onClick={() => {
									//Insert logic for sign in
								}}
								color='primary'
								width='250px'>Sign In
							</Button>
						</div>
					</div>
				</Form>
				<Footer>
					<div className="Testimonials">
						<div className="flex-container" style={{'padding-top': "5px"}}>
						<Body text="Hello">
						</Body>
						<Body text="My ">
						</Body>
						<Body text="Name">
						</Body>
						</div>
					</div>

				</Footer>
			</Background>
		</Screen>
	)
}

const Screen = styled.div`
	flex: 1 0 auto;

	.App {
		text-align: center;
	}

	.App-logo {
		height: 40vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.App-logo {
			animation: App-logo-spin infinite 20s linear;
		}
	}

	.App-header {
		background-color: #BDB76B;
		width: 90%;
		height: 22%;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: top;
		font-size: calc(35px + 2vmin);
		color: #FFFFF0;
		margin-top: 0px;	
	}

	.Testimonials {
		background-color: #BDB76B;
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: top;
		font-size: calc(25px + 2vmin);
		color: #FFFFF0;
		margin: auto;
		
	}

	.flex-container {
    display: flex;

	}

	.flex-child {
		flex: 1;
	}  

	.App-link {
		color: #61dafb;
	}

	@keyframes App-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`
