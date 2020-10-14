import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

export default function ServerExample() {
	const info = useQuery('test', getTestNumber)

	return <StyledDiv>{info.data ? info.data : 'Loading'}</StyledDiv>
}

function getTestNumber() {
	return fetch('http://localhost:8100/', {
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => res.number)
		.catch(console.error)
}

const StyledDiv = styled.div`
	color: darkred;
`
