import React from 'react'
import bagel from './bagels.png'
import styled from 'styled-components'

export default function Home() {
	return (
		<Screen>
			
			<header className="App-header">
			<div>
				<p>Welcome to Dan's Bagel Shop</p>
			</div>
			<div className="flex-container">
				<div className="flex-child">
					<p className="Body">
						Fill in intro
					</p>
				</div>
				<div className="flex-child">
					<img src={bagel} className="photo" alt="Bagels" width="275px" height="183px"/>
				</div> 
			</div>
			</header>
		</Screen>
	)
}

const Screen = styled.div`
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
		background-color: #2F4F4F;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: top;
		font-size: calc(25px + 2vmin);
		color: #FFFFF0;
		padding-left: 20px;
		margin-top: 0px;
		
	}
	.Body {
		background-color: #2F4F4F;
		height: 100%;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: top;
		font-size: calc(10px + 2vmin);
		color: #FFFFF0;
		padding-left: 20px;
		margin-top: 0px;
		
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

	.float-child {
		width: 50%;
		padding: 20px;
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
