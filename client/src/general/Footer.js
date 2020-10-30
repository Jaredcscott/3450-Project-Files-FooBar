import React from 'react'
import styled from 'styled-components'

type Props = {
	children: React$Node,
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

export default function Footer({ children } : Props ) {
    return (
        <Content>
            <div>
            <div style={phantom} />
                { children }
            </div>
        </Content>
    )
}


const Content = styled.div`
	background-color: #BDB76B;
    width: 90%;
    height: 22%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: top;
    font-size: calc(35px + 2vmin);
    color: #FFFFF0;
    margin-top: 0px;
`
