import React from 'react'
import styled from 'styled-components'

type Props = {
	children: React$Node,
}

export default function Screen({ children } : Props ) {
    return (
        <Content>
            { children }
        </Content>
    )
}


const Content = styled.div`

`