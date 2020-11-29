import React from 'react'
import Navigation from '../navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home'
import Order from './order'
import styled from 'styled-components'
import Account from './account'
import Inventory from './inventory'
import Users from './users'
import Orders from './orders'
import Chef from './chef'
import Cashier from './cashier'
import About from './about'
import Contact from './contact'
import Analytics from './analytics'

export default function Routing() {
	return (
		<BrowserRouter>
			<Screen>
				<Navigation />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/order" component={Order} />
					<Route path="/account" component={Account} />
					<Route path="/inventory" component={Inventory} />
					<Route path="/users" component={Users} />
					<Route path="/orders" component={Orders} />
					<Route path="/chef" component={Chef} />
					<Route path="/cashier" component={Cashier} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/analytics" component={Analytics} />

				</Switch>
			</Screen>
		</BrowserRouter>
	)
}

const Screen = styled.div`
	color: ${({ theme }) => theme.color.on.base};
	font-size: ${({ theme }) => theme.font.size.regular};
	width: 100vw;
	height: 100vh;
	background-color: ${({ theme }) => theme.color.base.normal};
	display: flex;
	flex-direction: column;
`
