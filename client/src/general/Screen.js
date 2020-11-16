import React from 'react'
import styled from 'styled-components'

type Props = {
	children: React$Node,
}

export default function Screen({ children }: Props) {
	return (
		<Content>
			<div
				style={{
					'min-width': '100%',
					'min-height': '100vh',
					'background-color': '#000000',
				}}>
				{children}
			</div>
		</Content>
	)
}

const Content = styled.div`
	flex: 1 0 auto;

	.App {
		text-align: center;
	}

	.Testimonials {
		background-color: #fccb00;
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: top;
		color: #fffff0;
		margin: auto;
	}

	.flex-container {
		display: flex;
	}

	.flex-child {
		flex: 1;
	}

	.App-link {
		color: #61dafb;
	}
`
