import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Background from '../../general/Background'
import Screen from '../../general/Screen'
import Button from '../../general/Button'
import Header from '../../general/Header'
import Body from '../../general/Body'
import produce from 'immer'
// import { useSelector, useDispatch } from 'react-redux'
// import { getTheme } from '../../redux-store/theme'
// import reactRouterDom from 'react-router-dom'

import axios from 'axios'

export default function Order() {
	const info = useQuery('menu', getMenu)

	const [orderBagels, setOrderBagels] = useState([])
	const [orderBeverages, setOrderBeverages] = useState([])

	if (!info.data) {
		return <div>Loading</div>
	}

	const bagels = info.data.BAGEL
	const smears = info.data.SMEAR
	const toppings = info.data.SAMMICHE_TOPPINGS
	const beverages = info.data.BEVERAGE

	return (
		<Screen>
			<Background>
				<Header text="Hungry? Lets Get You A Bagel."></Header>
				<Body text="">
					<Button
						width=""
						onClick={() =>
							setOrderBagels([
								...orderBagels,
								{ bagel: null, toppings: [], smears: [] },
							])
						}
						color="primary">
						Add Bagel To Order
					</Button>
					<Button
						width=""
						onClick={() => {
							setOrderBeverages([...orderBeverages, null])
						}}
						color="primary">
						Add Beverage To Order
					</Button>
					<h3>Bagels</h3>
					<ul id="bagelOrder" style={{ textAlign: 'center' }}>
						{orderBagels.map((bagelOrder, index) => (
							<OrderRow key={index}>
								<select
									selected={bagelOrder.bagel}
									onChange={(event) => {
										setOrderBagels(
											produce(orderBagels, (orderBagels) => {
												orderBagels[index].bagel = event.target.value
											})
										)
									}}>
									{bagelOrder.bagel === null ? (
										<option
											key={'no_item_selected'}
											value={null}
											selected
											disabled>
											None
										</option>
									) : null}
									{bagels.map((bagel) => {
										return (
											<option key={bagel._id} value={bagel._id}>
												{bagel.name}
											</option>
										)
									})}
								</select>
								{bagelOrder.smears.map((smear, smearIndex) => {
									return (
										<select
											selected={smear}
											key={smearIndex}
											onChange={(event) => {
												setOrderBagels(
													produce(orderBagels, (orderBagels) => {
														orderBagels[index].smears[smearIndex] =
															event.target.value
													})
												)
											}}>
											{smear === null ? (
												<option
													key={'no_item_selected'}
													value={null}
													selected
													disabled>
													None
												</option>
											) : null}
											{smears.map((smear) => {
												return (
													<option key={smear._id} value={smear._id}>
														{smear.name}
													</option>
												)
											})}
										</select>
									)
								})}
								{bagelOrder.toppings.map((topping, toppingIndex) => {
									return (
										<select
											selected={topping}
											key={toppingIndex}
											onChange={(event) => {
												setOrderBagels(
													produce(orderBagels, (orderBagels) => {
														orderBagels[index].toppings[toppingIndex] =
															event.target.value
													})
												)
											}}>
											{topping === null ? (
												<option
													key={'no_item_selected'}
													value={null}
													selected
													disabled>
													None
												</option>
											) : null}
											{toppings.map((topping) => {
												return (
													<option key={topping._id} value={topping._id}>
														{topping.name}
													</option>
												)
											})}
										</select>
									)
								})}
								<div
									onClick={() => {
										setOrderBagels(
											produce(orderBagels, (orderBagels) => {
												orderBagels[index].smears.push(null)
											})
										)
									}}>
									Add Smear
								</div>
								<div
									onClick={() => {
										setOrderBagels(
											produce(orderBagels, (orderBagels) => {
												orderBagels[index].toppings.push(null)
											})
										)
									}}>
									Add Topping
								</div>
							</OrderRow>
						))}
					</ul>
					<h3>Beverages</h3>
					<ul id="beverageOrder" style={{ textAlign: 'center' }}>
						{orderBeverages.map((beverageOrder, index) => (
							<OrderRow key={index}>
								<select
									selected={beverageOrder}
									onChange={(event) => {
										setOrderBeverages(
											produce(orderBeverages, (orderBeverages) => {
												orderBeverages[index] = event.target.value
											})
										)
									}}>
									{beverageOrder === null ? (
										<option
											key={'no_item_selected'}
											value={null}
											selected
											disabled>
											None
										</option>
									) : null}
									{beverages.map((beverage) => {
										return (
											<option key={beverage._id} value={beverage._id}>
												{beverage.name}
											</option>
										)
									})}
								</select>
							</OrderRow>
						))}
					</ul>
					<p>
						I would like my order to be ready at
						<input type="time" id="time"></input>
						on
						<input type="date" id="date"></input>
					</p>
					<Button
						width="250px"
						onClick={() => addOrder(null, null, null)}
						color="primary">
						Place Order
					</Button>
				</Body>
			</Background>
		</Screen>
	)
}

const OrderRow = styled.div`
	display: flex;
`

function getMenu() {
	return axios
		.get('http://localhost:8100/menu')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

function addOrder(bagelList: list, beverageList: list, pickupAt: string, queryCache: any) {
	console.log({})
	axios
		.post('http://localhost:8100/order', {
			bagels: bagelList,
			beverages: beverageList,
			pickupAt: pickupAt,
		})
		.then(() => {
			console.log('successful Order')
		})
		.catch((err) => {
			console.log('failed to Order')
			console.error(err)
		})
}
