import React, { Component } from 'react'
import { useQuery } from 'react-query'
import Background from '../../general/Background'
import Header from '../../general/Header'
import Screen from '../../general/Screen'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import Body from '../../general/Body'
import axios from 'axios'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

class BusinessInfo extends Component {
	render() {
		const name = this.props.name
		const balance = this.props.balance
		const custCount = this.props.custCount
        const curOrders = this.props.curOrders
        const empCount = this.props.empCount
        const allOrders = this.props.allOrders
		return (
			<section style={{ 'textShadow': '3px 3px 5px blue', 'fontSize':'25px' }}>
				<h4>
					{' '}
					<strong>Business Name: {name}</strong>
				</h4>
				<h4>Business Account Balance: ${balance / 100}</h4>
                <h4>Employee Count: {empCount}</h4>
				<h4>Customer Count: {custCount}</h4>
                <h4>Active Order Count: {curOrders}</h4>
                <h4>Historical Order Count: {allOrders}</h4>
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
    const roles = new Set(loggedin.data.roles)
	if (loggedin.data && (roles.has("MANAGER") || roles.has("ADMIN"))) {
		return (
			<Screen>
				<Background>
					<Header text="Buisiness Analytics"></Header>
                    <Form>
                        <BusinessInfo
                                    name={"Dan's Bagel Shop"}
                                    balance={"<Fill In>"}
                                    empCount={"<Fill In>"}
                                    custCount={"<Fill In>"}
                                    curOrders={"<Fill In>"}
                                    allOrders={"<Fill In>"}
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
