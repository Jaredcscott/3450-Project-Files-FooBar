import React from 'react'
import type { PopulatedOrder } from '../types'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getUser } from '../queries'

export default function Order({
	order,
	children,
	showItems,
}: {
	order?: ?PopulatedOrder,
	children?: ?React$Node,
	showItems?: ?boolean,
}) {
	if (!order) {
		return null
	}
	return (
		<OrderWrapper key={order._id}>
			<OrderHeader>
				<div>{order.status}</div>
				<div>Pickup At: {new Date(order.pickupAt).toISOString()}</div>
				<div>${order.price / 100}</div>
				<UserName userId={order.placedBy} />
			</OrderHeader>
			{order.beverages.length > 0 ? (
				<>
					<h3> Beverages</h3>
					<Grouping>
						{order.beverages.map((beverage, index) => (
							<div key={index}>{beverage.name}</div>
						))}
					</Grouping>{' '}
				</>
			) : null}

			{order.bagels.length > 0 ? (
				<>
					<h3>Bagels</h3>
					<Grouping>
						{order.bagels.map((bagelOrder) => (
							<>
								<h4>{bagelOrder.bagel.name}</h4>
								<Grouping>
									{bagelOrder.toppings.map((topping, index) => (
										<div key={index}>{topping.name}</div>
									))}
								</Grouping>
							</>
						))}
					</Grouping>
				</>
			) : null}
			{children}
		</OrderWrapper>
	)
}

function UserName({ userId }: { userId: string }) {
	const user = useQuery(`user-${userId}`, getUser(userId))
	if (user.data) {
		return <div>{user.data.name}</div>
	}
	return null
}

const OrderHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const OrderWrapper = styled.div`
	width: 80%;
	font-size: ${({ theme }) => theme.font.size.large};
	margin: ${({ theme }) => theme.spacing.large};
	padding: ${({ theme }) => theme.spacing.large};
	border: 2px solid #75662b;
	border-radius: 4px;
`

const Grouping = styled.div`
	margin-left: ${({ theme }) => theme.spacing.indent};
	width: 100%;
	justify-content: space-between;
`
