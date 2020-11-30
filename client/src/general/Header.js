import React from 'react'
import styled from 'styled-components'
import logo from './logo.png'

type Props = {
	text: string,
}

export default function Header({ text }: Props) {
	return (
		<Paragraph>
			<header className="App-header">
				<div className="flex-container" style={{ paddingTop: '5px' }}>
					<div className="flex-child">
						<p style={{ paddingRight: '100px' }}>{text}</p>
					</div>
					<div>
						<img
							src={logo}
							className="photo"
							alt="Dans Bagel Shop"
							width="275px"
							height="183px"
						/>
					</div>
				</div>
			</header>
		</Paragraph>
	)
}

const Paragraph = styled.div`
	background-color: #75662b;
	width: 90%;
	height: 22%;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: top;
	font-size: calc(35px + 2vmin);
	color: #fffff0;
	margin-top: 0px;
`
