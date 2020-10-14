import React, { useState } from 'react'
import Button from '../../general/Button'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div>
			<label>
				Email:{' '}
				<input
					type="text"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
			</label>
			<label>
				Password:{' '}
				<input
					type="text"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</label>
			<Button color="primary" onClick={() => login(email, password)}>
				Login
			</Button>
		</div>
	)
}

function login(email: string, password: string) {
	fetch('http://localhost:8100/auth/login', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
}
