import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
				<Profile user={info.data} />
			) : (
				'Not Logged In'
			)}
		</StyledDiv>
	)
}

function Profile({ user }: { user: { name: string, email: string } }) {
	const [name, setName] = useState(user.name)
	return (
		<>
			<div>Email: {user.email}</div>
			<label>
				Name:{' '}
				<input type="text" value={name} onChange={(event) => setName(event.target.value)} />
			</label>
			<Button color="secondary" onClick={() => updateProfile(name)}>
				Update
			</Button>
			<Button color="warn" onClick={signOut}>
				Sign out
			</Button>
		</>
	)
}

function getSignedInUser() {
	return fetch('http://localhost:8100/user/me', {
		credentials: 'include',
	})
		.then((res) => {
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

function updateProfile(name: string) {
	return axios
		.put('http://localhost:8100/user/me', {
			name,
		})
		.catch(console.error)
		.finally((res) => {
			window.queryCache.refetchQueries()
		})
}

const StyledDiv = styled.div`
	color: black;
`

axios.interceptors.request.use(
	(config) => {
		return { ...config, withCredentials: true }
	},
	(error) => Promise.reject(error)
)
