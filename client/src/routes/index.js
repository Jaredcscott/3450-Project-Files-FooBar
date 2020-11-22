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
import Contact from './contact'
import About from './about'

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
					<Route path="/contact" component={Contact} />
					<Route path="/about" component={About} />
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
