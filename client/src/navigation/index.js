import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useQuery, useQueryCache } from 'react-query'
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
		if (loggedin.data.roles.includes("MANAGER") ){
			return (
				<Navbar>
					<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
					<NavElement onClick={() => history.replace('/account')}>Account</NavElement>
					<NavElement onClick={() => history.replace('/order')}>Place An Order</NavElement>
					<NavElement onClick={() => history.replace('/inventory')}>Inventory</NavElement>
				</Navbar>
			)
		}
		else {
			return (
				<Navbar>
					<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
					<NavElement onClick={() => history.replace('/order')}>Place An Order</NavElement>
					<NavElement onClick={() => history.replace('/account')}>Account</NavElement>
				</Navbar>
			)
		}
	} else {
		return (
			<Navbar>
				<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
				<NavElement onClick={() => history.replace('/account')}>Account</NavElement>
			</Navbar>
		)
	}

}

const Navbar = styled.nav`
	position: sticky;
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
