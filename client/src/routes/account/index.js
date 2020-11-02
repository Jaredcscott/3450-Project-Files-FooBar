import React, {Component, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import Button from '../../general/Button'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'



export default function Account() {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
    const loggedin = getSignedInUser
    
	if( loggedin.data) {
		return (
			<Screen>
				<ProfileInfo name={loggedin.data.name} email={loggedin.data.email} accountBal={loggedin.data.accountBal} role={loggedin.data.role}/>
			</Screen>
		)
    }
    else{
        return(
            <Screen>
				<h1>Not Signed in</h1>
                <div>
			<label>
				Name:{' '}
				<input type="text" value={name} onChange={(event) => setName(event.target.value)} />
			</label>
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
			<Button color="primary" onClick={() => register(name, email, password, password)}>
				Register
			</Button>
		</div>
            </Screen>
        )
    }
}


function register(name: string, email: string, password: string, verifyPassword: string) {
	fetch('http://localhost:8100/auth/register', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password, verifyPassword }),
    })
    fetch('http://localhost:8100/auth/login', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
    })
}



class ProfileInfo extends Component {
    render() {
		const name = this.props.name
		const email = this.props.email
        const balance = this.props.balance
        const role = this.props.role
        return (
            <section>
                <h3> <strong>Account Name: {name}</strong></h3>
                <h4>Email Id: {email}</h4>
                <h4>Account Balance: {balance}</h4>
                <h5>Role: {role}</h5>
            </section>
        )
    }
}


function getSignedInUser() {
	return fetch('http://localhost:8100/user GET', {
		credentials: 'include',
	})
		.then((res) => {
			return res.json()
		})
		.catch(() => null)
}


const Screen = styled.div`
	width: 100%;
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.color.base.darker};
`


// function Profile({ user }: { user: { name: string, email: string } }) {
// 	const [name, setName] = useState(user.name)
// 	return (
// 		<>
// 			<div>Email: {user.email}</div>
// 			<label>
// 				Name:{' '}
// 				<input type="text" value={name} onChange={(event) => setName(event.target.value)} />
// 			</label>
// 			<Button color="secondary" onClick={() => updateProfile(name)}>
// 				Update
// 			</Button>
// 			<Button color="warn" onClick={signOut}>
// 				Sign out
// 			</Button>
// 		</>
// 	)
// }



// function signOut() {
// 	return fetch('http://localhost:8100/auth/logout', {
// 		credentials: 'include',
// 	}).then(() => {
// 		window.queryCache.refetchQueries()
// 	})
// }
