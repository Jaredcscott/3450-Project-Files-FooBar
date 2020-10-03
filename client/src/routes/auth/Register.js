import React, { useState } from 'react'
import Button from '../../general/Button'

export default function Register() {
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
			<Button color="primary" onClick={() => register(email, password)}>
				Register
			</Button>
		</div>
	)
}

function register(email: string, password: string) {
	fetch('http://localhost:8100/auth/register', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
}
