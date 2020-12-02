import React, { useState } from 'react'
import { Form, Header, Screen, Background, Button, BasicCustomerFooter } from '../../general'
import type { User } from '../../types'
import { useHistory } from 'react-router-dom'
import { useQueryCache } from 'react-query'
import { logout, resetPassword, changeName } from '../../queries'

export default function Profile({ user }: { user: User }) {
	const history = useHistory()

	const [name, setName] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [verifyPassword, setVerifyPassword] = useState('')
	const queryCache = useQueryCache()

	const roles = new Set(user.roles)

	return (
		<Screen>
			<Background>
				<Header text="Account Information"></Header>
				<Form>
					<div style={{ marginBottom: '25px' }}>
						<ProfileInfo user={user} />
						<div style={{ fontSize: '25px' }}>
							<label>
								Name:{' '}
								<input
									type="text"
									value={name}
									placeholder="Name"
									onChange={(event) => setName(event.target.value)}
								/>
							</label>
							<div style={{}}>
								<Button
									color="primary"
									onClick={() => {
										changeName(name, queryCache).then(() => setName(''))
									}}>
									Change Name
								</Button>
							</div>
						</div>
						<div style={{ fontSize: '25px' }}>
							<div>
								Current Password:
								<input
									type="text"
									value={currentPassword}
									placeholder="Current Password"
									onChange={(event) =>
										setCurrentPassword(event.target.value)
									}></input>
							</div>
							<div>
								New Password:
								<input
									type="text"
									value={newPassword}
									placeholder="New Password"
									onChange={(event) =>
										setNewPassword(event.target.value)
									}></input>
							</div>
							<div>
								Verify New Password:
								<input
									type="text"
									value={verifyPassword}
									placeholder="Verify Password"
									onChange={(event) =>
										setVerifyPassword(event.target.value)
									}></input>
							</div>
						</div>
						<div className="flex-container" style={{ fontSize: '30px' }}>
							<Button
								color="primary"
								onClick={() => {
									history.replace('/home')
									logout()
								}}>
								Logout
							</Button>
							<div style={{ paddingLeft: '25px' }}>
								<Button color="primary" onClick={() => history.replace('/order')}>
									Place An Order
								</Button>
							</div>
							<div style={{ paddingLeft: '25px' }}>
								<Button
									color="primary"
									onClick={() => {
										history.replace('/orders')
									}}>
									Order History
								</Button>
							</div>
							<div style={{ paddingLeft: '25px' }}>
								<Button
									color="primary"
									onClick={() => {
										resetPassword(currentPassword, newPassword, verifyPassword)
									}}>
									Reset Password
								</Button>
							</div>
							<div style={{ paddingLeft: '25px' }}>
								{roles.has('MANAGER') || roles.has('ADMIN') ? (
									<Button
										color="primary"
										onClick={() => history.replace('/analytics')}>
										Analytics
									</Button>
								) : null}
							</div>
						</div>
					</div>
				</Form>
				<BasicCustomerFooter />
			</Background>
		</Screen>
	)
}

function ProfileInfo({ user }: { user: User }) {
	return (
		<section style={{ textShadow: '3px 3px 5px blue', fontSize: '25px' }}>
			<h4>
				{' '}
				<strong style={{ textTransform: 'capitalize' }}>Account Name: {user.name}</strong>
			</h4>
			<h4>Email Id: {user.email}</h4>
			<h4>Account Balance: ${user.balance / 100}</h4>
			<h4>Role(s): {user.roles.join(', ')}</h4>
		</section>
	)
}
