import React from 'react'
import styled from 'styled-components'
import background from './background.png';

type Props = {
	children: React$Node,
}

export default function Background({ children, image } : Props ) {
    return (
        <Content>
            <div style={{backgroundImage: "url(" + background + ")"}}>
                { children }
            </div>
        </Content>
    )
}


const Content = styled.div`

`