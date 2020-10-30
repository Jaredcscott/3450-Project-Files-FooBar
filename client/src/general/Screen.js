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
    flex: 1 0 auto;

	.App {
		text-align: center;
	}

	.App-logo {
		height: 40vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.App-logo {
			animation: App-logo-spin infinite 20s linear;
		}
	}

	.App-header {
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
	}

	.Testimonials {
		background-color: #BDB76B;
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: top;
		font-size: calc(25px + 2vmin);
		color: #FFFFF0;
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

	@keyframes App-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

`