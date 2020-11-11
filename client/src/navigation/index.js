import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

export default function Navigation() {
	const history = useHistory()
	return (
		<Navbar>
			<NavElement onClick={() => history.replace('/home')}>Home</NavElement>
			<NavElement onClick={() => history.replace('/order')}>Place An Order</NavElement>
			<NavElement onClick={() => history.replace('/account')}>Account</NavElement>
		</Navbar>
	)
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
