import React from 'react'
import Navigation from '../navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home'
import Test from './test'
import Profile from './profilePrototype'
import orderPrototype from './Order'
import styled from 'styled-components'
import ServerExample from './serverExample'
import Register from './auth/Register'
import Login from './auth/Login'
import EditableProfile from './auth/EditableProfile'

export default function Routing() {
	return (
		<BrowserRouter>
			<Screen>
				<Navigation />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/test" component={Test} />
					<Route path="/profilePrototype" component={Profile} />
					<Route path="/Order" component={orderPrototype} />
					<Route path="/serverExample" component={ServerExample} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/profile" component={EditableProfile} />
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
