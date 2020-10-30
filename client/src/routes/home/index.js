import React from 'react'
import styled from 'styled-components'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'


export default function Home() {
	return (
		<Screen>
			<Background>
				<Header text="Welcome to Dan's Bagel Shop">
				</Header>
				<Form>
					<div>
						<div className="email">
							<input type="text" id="email" placeholder="Email" autofocus="1" aria-label="Email"/>
						</div>
						<div className="password">
							<input type="password" placeholder="Password" aria-label="Password"/>
						</div>
					</div>
{/*
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
*/}
				</Form>
				<Footer>
					<div className="Testimonials">
						<div className="flex-container" style={{'padding-top': "5px"}}>
						<Body text="Fill In With Customer Review">
						</Body>
						<Body text="Fill In With Customer Review">
						</Body>
						<Body text="Fill In With Customer Review">
						</Body>
						</div>
					</div>
				</Footer>
			</Background>
		</Screen>
	)
}
