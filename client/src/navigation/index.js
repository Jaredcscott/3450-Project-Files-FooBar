import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

export default function Navigation() {
	const history = useHistory()
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})
	
	if (loggedin.data) {
		const roles = new Set(loggedin.data.roles)
		return( 
			<Navbar>
				<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
				<NavElement onClick={() => history.replace('/order')}>Place An Order</NavElement>
				<NavElement onClick={() => history.replace('/account')}>Account</NavElement>
				<NavElement onClick={() => history.replace('/orders')}>Order History</NavElement>
				{ roles.has("MANAGER") || roles.has("ADMIN") || roles.has("CHEF") ? <NavElement onClick={() => history.replace('/inventory')}>Inventory</NavElement> : null}
				{ roles.has("MANAGER") || roles.has("ADMIN")  ? <NavElement onClick={() => history.replace('/analytics')}>Analytics</NavElement> : null}
				{ roles.has("MANAGER") || roles.has("ADMIN")  ? <NavElement onClick={() => history.replace('/users')}>Users</NavElement> : null}
				{ roles.has("CASHIER") ? <NavElement onClick={() => history.replace('/cashier')}>Cashier</NavElement> : null}
				{ roles.has("CHEF") ? <NavElement onClick={() => history.replace('/chef')}>Chef</NavElement>: null}
				
			</Navbar>
		)
	} else {
		return (
			<Navbar>
				<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
			</Navbar>
		)
	}
}

const Navbar = styled.nav`
	position: sticky;
	z-index: 50;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	flex: 0 0 auto;
	background-color: ${({ theme }) => theme.color.base.lighter};
`

const NavElement = styled.div`
	color: ${({ theme }) => theme.color.on.base};
	padding: 8px;
	margin-right: ${({ theme }) => theme.spacing.veryLarge};
	color: #fffff0;

	&:hover {
		background-color: ${({ theme }) => theme.color.base.normal};
		cursor: pointer;
	}
`
