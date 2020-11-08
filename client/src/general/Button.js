import React from 'react'
import styled from 'styled-components'

type Props = {
	onClick: () => void,
	color: string,
	children: React$Node,
	width: string,
}

export default function Button({ onClick, color, children, width }: Props) {
	return (
		<ButtonBackground style={{'width': {width}}} onClick={onClick} color={color}>
			{children}
		</ButtonBackground>
	)
}

const ButtonBackground = styled.div`
	background-color: ${({ theme, color }) => theme.color[color].normal};
	color: ${({ theme, color }) => theme.color.on[color]};
	display: inline-block;
	padding: ${({ theme }) => theme.spacing.large};
	border-radius: ${({ theme }) => theme.spacing.normal};
	&:hover {
		background-color: ${({ theme, color }) => theme.color[color].darker};
		cursor: pointer;
	}

	user-select: none;
`
