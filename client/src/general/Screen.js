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

	.Testimonials {
		background-color: #fccb00;
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: top;
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
`