// @flow
import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Background from '../../general/Background'
import Screen from '../../general/Screen'
import Button from '../../general/Button'
import Header from '../../general/Header'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Footer from '../../general/Footer'
import produce from 'immer'
import axios from 'axios'

export default function Order() {
	const info = useQuery('menu', getMenu)

	const [orderBagels, setOrderBagels] = useState<
		{ bagel: string, toppings: (?string)[], smears: (?string)[] }[]
	>([])
	const [orderBeverages, setOrderBeverages] = useState<string[]>([])
	const [currentDate, setCurrentDate] = useState(() => {
		const today = new Date()
		return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	})

	const [currentTime, setCurrentTime] = useState(() => {
		const today = new Date()
		return `${today.getHours()}:${today.getMinutes()}`
	})

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
				<Form>
					<div
						style={{
							'margin': 'auto',
							'marginTop': '25px',
							'marginBottom': '25px',
							'textShadow': '3px 3px 5px blue',
							'width':'1200px'
						}}>
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
														orderBagels[index].bagel =
															event.target.value
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
																orderBagels[index].smears[
																	smearIndex
																] = event.target.value
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
															<option
																key={smear._id}
																value={smear._id}>
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
																orderBagels[index].toppings[
																	toppingIndex
																] = event.target.value
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
															<option
																key={topping._id}
																value={topping._id}>
																{topping.name}
															</option>
														)
													})}
												</select>
											)
										})}
										<Button
											color="primary"
											onClick={() => {
												setOrderBagels(
													produce(orderBagels, (orderBagels) => {
														orderBagels[index].smears.push(null)
													})
												)
											}}>
											Add Smear
										</Button>
										<Button
											color="primary"
											onClick={() => {
												setOrderBagels(
													produce(orderBagels, (orderBagels) => {
														orderBagels[index].toppings.push(null)
													})
												)
											}}>
											Add Topping
										</Button>
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
								<input
									type="time"
									id="time"
									value={currentTime}
									onChange={(event) =>
										setCurrentTime(event.target.value)
									}></input>
								on
								<input
									type="date"
									id="date"
									value={currentDate}
									onChange={(event) =>
										setCurrentDate(event.target.value)
									}></input>
							</p>
							<Button
								width="250px"
								onClick={() =>
									addOrder(orderBagels, orderBeverages, currentDate, currentTime)
								}
								color="primary">
								Place Order
							</Button>
						</Body>
					</div>
				</Form>
				<Footer>
					<ul>
						<li>
							<a href="account">Take Me To My Account</a>
						</li>
						<li>
							<a href="home">Home Page</a>
						</li>
						<li>
							<a href="about">About Dan's Bagel Shop</a>
						</li>
						<li>
							<a href="contact">Contact Us</a>
						</li>
					</ul>
				</Footer>
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

function addOrder(
	bagelList: Array,
	beverageList: Array,
	date: string,
	time: string,
	queryCache: any
) {
	var pickupAt = new Date(date + ' ' + time).getTime()
	axios
		.post('http://localhost:8100/order', {
			bagels: bagelList
				.filter((bagelOrder) => bagelOrder.bagel)
				.map((bagelOrder) => {
					return {
						bagel: bagelOrder.bagel,
						toppings: [
							...bagelOrder.toppings.filter((item) => item),
							...bagelOrder.smears.filter((item) => item),
						],
					}
				}),
			beverages: beverageList.filter((item) => item),
			pickupAt: pickupAt,
		})
		.then(() => {
			console.log('successfully placed order')
		})
		.catch((err) => {
			console.log('failed to place order')
			console.error(err)
		})
}