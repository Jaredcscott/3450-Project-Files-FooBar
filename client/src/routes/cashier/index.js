import React from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { ORDER_STATUS } from '../../types'
import { Button, Form, Header, Screen, Background, Order, BasicFooter } from '../../general'
import { getOrdersTodo, setOrderStatus } from '../../queries'

export default function Cashier() {
	const orders = useQuery('orders', getOrdersTodo, {
		refetchOnWindowFocus: false,
	}).data

	const queryCache = useQueryCache()

	if (!orders) {
		return null
	} else
		return (
			<Screen>
				<Background>
					<Header text="Orders To Distribute"></Header>
					<Form>
						{orders.length === 0 ? (
							<Form>
								<div
									style={{
										textAlign: 'center',
										margin: '25px',
										textShadow: '3px 3px 5px blue',
									}}>
									No Orders To Display<br></br>Enjoy Your Break!
								</div>
							</Form>
						) : (
							orders.map((order) => (
								<Order key={order._id} order={order} showItems={true}>
									<Button
										style={{ paddingLeft: '25px' }}
										width="250px"
										onClick={() =>
											setOrderStatus(
												order._id,
												ORDER_STATUS.FULFILLED
											).then(() => queryCache.invalidateQueries('orders'))
										}
										color="primary">
										Mark Order Complete
									</Button>
									<Button
										style={{ paddingLeft: '25px' }}
										width="250px"
										onClick={() =>
											setOrderStatus(
												order._id,
												ORDER_STATUS.DID_NOT_PICK_UP
											).then(() => queryCache.invalidateQueries('orders'))
										}
										color="primary">
										Did not pick up
									</Button>
								</Order>
							))
						)}
					</Form>
					<BasicFooter />
				</Background>
			</Screen>
		)
}
