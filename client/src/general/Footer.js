import React from 'react'
import styled from 'styled-components'
import logo from './logo.png'

type Props = {
	children: React$Node,
}

export default function Footer({ children }: Props) {
	return (
		<Content>
			<div className="flex-container" style={{ paddingTop: '5px' }}>
				<div className="flex-child" style={{ paddingTop: '15px' }}>
					{children}
				</div>
				<div style={{ margin: '20px' }}>
					<img
						src={logo}
						className="photo"
						alt="Dans Bagel Shop"
						width="206px"
						height="137px"
					/>
				</div>
			</div>
		</Content>
	)
}

const Content = styled.div`
	background-color: #75662b;
	width: 90%;
	height: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: top;
	font-size: calc(10px + 2vmin);
	color: #fffff0;
	margin-top: 0px;
`
