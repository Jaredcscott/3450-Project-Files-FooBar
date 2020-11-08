import React from 'react'
import styled from 'styled-components'

type Props = {
	text: string,
    children: React$Node,
}

export default function Body({text, children} : Props) {
	return (
        <Paragraph>
            {text}
            {children}
        </Paragraph>
	)
}

const Paragraph = styled.div`
    background-color: #BDB76B;
    width: 90%;
    height: 68%;
    font-size: 25px;
    color: #FFFFFF;
    margin: auto;
`