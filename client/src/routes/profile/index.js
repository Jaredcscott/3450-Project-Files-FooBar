import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import Button from '../../general/Button'

const ONE_SECOND = 1000 // ms

export default function ServerExample() {
	const info = useQuery('me', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	useEffect(() => console.log('mounted'), [])

	return (
		<StyledDiv>
			{info.isLoading ? (
				'Loading'
			) : info.data ? (
				<>
					<div>Email: {info.data.email}</div>
					<Button color="secondary" onClick={signOut}>
						sign out
					</Button>
				</>
			) : (
				'Not Logged In'
			)}
		</StyledDiv>
	)
}

function getSignedInUser() {
	return fetch('http://localhost:8100/user/me', {
		credentials: 'include',
	})
		.then((res) => {
			console.log('querying')
			return res.json()
		})
		.catch(() => null)
}

function signOut() {
	return fetch('http://localhost:8100/auth/logout', {
		credentials: 'include',
	}).then(() => {
		window.queryCache.refetchQueries()
	})
}

const StyledDiv = styled.div`
	color: black;
`
