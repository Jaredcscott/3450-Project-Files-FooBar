import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export default function Link({ href, children }: { href: string, children: React$Node }) {
	const history = useHistory()

	return <StyledLink onClick={() => history.replace(href)}>{children}</StyledLink>
}

const StyledLink = styled.span`
	color: blue;

	&:hover {
		color: purple;
		cursor: pointer;
	}
`
