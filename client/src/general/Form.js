import styled from 'styled-components'
import React from 'react'

type Props = {
	children: React$Node,
}

export default function Form({ children }: Props) {
	return <FormBackground>{children}</FormBackground>
}

const FormBackground = styled.div`
	background-color: #fccb00;
	height: 100%;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(25px + 2vmin);
	color: #fffff0;
	margin: auto;
`
