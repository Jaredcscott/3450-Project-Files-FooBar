import React from 'react'
import { useQuery } from 'react-query'
import { getSignedInUser } from '../../queries'
import type { User } from '../../types'
import Profile from './Profile'
import Register from './Register'

export default function Account() {
	const user: ?User = useQuery('user', getSignedInUser, {
		refetchOnWindowFocus: false,
	}).data

	if (user) {
		return <Profile user={user} />
	} else {
		return <Register />
	}
}
