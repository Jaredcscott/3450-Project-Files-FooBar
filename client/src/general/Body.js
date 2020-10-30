import React from 'react'
import styled from 'styled-components'

type Props = {
	text: string
}

export default function Body({text} : Props) {
	return (
        <Paragraph className="Text">
            {text}
        </Paragraph>
	)
}

const Paragraph = styled.div`
    height: 68%;
    font-size: 25px;
    color: #FFFFF0;
    margin: auto;
`