import React from 'react'
import styled from 'styled-components'
import type { StatusColor } from '../themes/type'

type Props = {
    children: React$Node,
}

export default function Form({children}: Props) {
	return (
		<FormBackground>
			{children}
		</FormBackground>
	)
}

const FormBackground = styled.div`
    background-color: #BDB76B;
    height: 100%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(25px + 2vmin);
    color: #FFFFF0;
    margin: auto;
`