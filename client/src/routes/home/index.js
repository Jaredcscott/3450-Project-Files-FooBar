import React from 'react'
import { useQuery } from 'react-query'
import { getSignedInUser } from '../../queries'
import UserHome from './UserHome'
import UserSignIn from './UserSignIn'

export default function Home() {
	// get user
	const user = useQuery('user', getSignedInUser, {
		refetchOnWindowFocus: false,
	}).data

	if (user) {
		// user is logged in display user home page
		return <UserHome user={user} />
	}
	// user is not logged in display sign in page
	return <UserSignIn />
}
