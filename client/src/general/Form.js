import styled from 'styled-components'
import React, { useState } from 'react'


type Props = {
    children: React$Node,
}

export default function Form({children }: Props) {
    //const [email, setEmail] = useState('')
    //const [password, setPassword] = useState('')
    //const [name, setName] = useState('')
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(25px + 2vmin);
    color: #FFFFF0;
    margin: auto;
`