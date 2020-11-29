import React, { Component, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import Body from '../../general/Body'
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

function none() {}

class BusinessInfo extends Component {
	render() {
		const name = this.props.name
		const balance = this.props.balance
		const customers = this.props.customers
		return (
			<section style={{ 'textShadow': '3px 3px 5px blue', 'fontSize':'25px' }}>
				<h4>
					{' '}
					<strong>Business Name: {name}</strong>
				</h4>
				<h4>Business Account Balance: ${balance / 100}</h4>
				<h4>Customer Count: {customers}</h4>
			</section>
		)
	}
}

const ONE_SECOND = 1000 // ms

export default function Analytics() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})
	if (loggedin.data) {
		const roles = new Set(loggedin.data.roles)
		return (
			<Screen>
				<Background>
					<Header text="Buisiness Analytics"></Header>
                    <Form>
                        <BusinessInfo
                                    name={"Dan's Bagel Shop"}
                                    balance={"<Fill In>"}
                                    customers={"<Fill In>"}
                                />
                    </Form>
					<Footer>
						<ul>
							<li>
								<a href="account">Take Me To My Account</a>
							</li>
							<li>
								<a href="home">Home Page</a>
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
	} else {
		return (
			<Screen>
				<Background>
					<Header text="Buisiness Analytics"></Header>
					<Body text="">
                        Please Log In To View Analytics
					</Body>
					<Footer>
						<ul>
							<li>
								<a href="account">Take Me To My Account</a>
							</li>
							<li>
								<a href="home">Home Page</a>
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
}
