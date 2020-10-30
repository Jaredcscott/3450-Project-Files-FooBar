import React from 'react'
import styled from 'styled-components'
import logo from './logo.png'

type Props = {
	text: string
}

export default function Header({text} : Props) {
	return (
        <Paragraph>
            <header className="App-header">
					<div className="flex-container" style={{'padding-top': "5px"}}>
						<div className="flex-child">
							<p style={{'padding-right': "100px"}}>{text}</p>
						</div>
						<div>
							<img src={logo} className="photo" alt="Dans Bagel Shop" width="275px" height="183px"/>
						</div>
					</div>
				</header>
        </Paragraph>
	)
}

const Paragraph = styled.div`
    background-color: #BDB76B;
    width: 90%;
    height: 22%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    font-size: calc(35px + 2vmin);
    color: #FFFFF0;
    margin-top: 0px;

`