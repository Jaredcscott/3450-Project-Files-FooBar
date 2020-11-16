import React from 'react'
import styled from 'styled-components'

type Props = {
	text: string,
	children: React$Node,
}

export default function Body({ text, children }: Props) {
	return (
		<Paragraph>
			{text}
			{children}
		</Paragraph>
	)
}

const Paragraph = styled.div`
	background-color: #fccb00;
	width: 90%;
	height: 100%;
	font-size: 20px;
	color: #fffff0;
	margin: auto;
`
