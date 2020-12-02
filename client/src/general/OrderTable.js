import React from 'react'
import type { PopulatedOrder } from '../types'
import styled from 'styled-components'
import Form from './Form'
import Order from './Order'

export default function OrderTable({ orders }: { orders?: ?(PopulatedOrder[]) }) {
	return (
		<ScreenCenter>
			{orders && orders.length ? (
				<OrdersWrapper>
					{orders.map((order) => (
						<Order order={order} key={order._Id} />
					))}
				</OrdersWrapper>
			) : (
				<Form>No Order History To Display</Form>
			)}
		</ScreenCenter>
	)
}

const OrdersWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ScreenCenter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`
