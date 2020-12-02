// @flow
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { Background, Screen, Button, Header, Body, Form, Footer } from '../../general'
import { getMenu, getOrderPrice, addOrder } from '../../queries'
import type { CreationOrder, OrderToSendToServer, CreationBagel } from '../../types'
import { parseTime } from '../../utils/time'
import produce from 'immer'

export default function Order() {
	const menu = useQuery('menu', getMenu).data

	const [orderBagels, setOrderBagels] = useState<CreationBagel[]>([])
	const [orderBeverages, setOrderBeverages] = useState<(?string)[]>([])
	const [currentDate, setCurrentDate] = useState(() => {
		const today = new Date()
		return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	})

	const [currentTime, setCurrentTime] = useState(() => {
		const today = new Date()
		return `${today.getHours()}:${today.getMinutes()}`
	})

	const [price, setPrice] = useState(0)

	useEffect(() => {
		getOrderPrice(
			toServerOrder({ bagels: orderBagels, beverages: orderBeverages, pickUpAt: Date.now() })
		).then((newPrice) => {
			setPrice(newPrice)
		})
	}, [orderBeverages, orderBagels])

	if (!menu) {
		return <div>Loading</div>
	}

	const bagels = menu.BAGEL
	const smears = menu.SMEAR
	const toppings = menu.SAMMICHE_TOPPINGS
	const beverages = menu.BEVERAGE

	return (
		<Screen>
			<Background>
				<Header text="Hungry? Lets Get You A Bagel."></Header>
				<Form>
					<div
						style={{
							margin: 'auto',
							marginTop: '25px',
							marginBottom: '25px',
							textShadow: '3px 3px 5px blue',
							width: '1200px',
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
														{bagel.name} ${bagel.price / 100}
													</option>
												)
											})}
										</select>
										<DeleteButton
											onDelete={() => {
												setOrderBagels(
													produce(orderBagels, (orderBagels) => {
														orderBagels.splice(index, 1)
													})
												)
											}}
										/>

										{bagelOrder.smears.map((smear, smearIndex) => {
											return (
												<Wrapper key={smearIndex}>
													<WrappedSelect
														selected={smear}
														onChange={(event) => {
															setOrderBagels(
																produce(
																	orderBagels,
																	(orderBagels) => {
																		orderBagels[index].smears[
																			smearIndex
																		] = event.target.value
																	}
																)
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
																	{smear.name} $
																	{smear.price / 100}
																</option>
															)
														})}
													</WrappedSelect>
													<DeleteButton
														key={String(smearIndex) + 'delete'}
														onDelete={() => {
															setOrderBagels(
																produce(
																	orderBagels,
																	(orderBagels) => {
																		orderBagels[
																			index
																		].smears.splice(
																			smearIndex,
																			1
																		)
																	}
																)
															)
														}}
													/>
												</Wrapper>
											)
										})}
										{bagelOrder.toppings.map((topping, toppingIndex) => {
											return (
												<Wrapper key={toppingIndex}>
													<WrappedSelect
														selected={topping}
														key={toppingIndex}
														onChange={(event) => {
															setOrderBagels(
																produce(
																	orderBagels,
																	(orderBagels) => {
																		orderBagels[index].toppings[
																			toppingIndex
																		] = event.target.value
																	}
																)
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
																	{topping.name} $
																	{topping.price / 100}
																</option>
															)
														})}
													</WrappedSelect>
													<DeleteButton
														key={String(toppingIndex) + 'delete'}
														onDelete={() => {
															setOrderBagels(
																produce(
																	orderBagels,
																	(orderBagels) => {
																		orderBagels[
																			index
																		].toppings.splice(
																			toppingIndex,
																			1
																		)
																	}
																)
															)
														}}
													/>
												</Wrapper>
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
														{beverage.name} ${beverage.price / 100}
													</option>
												)
											})}
										</select>
										<DeleteButton
											onDelete={() => {
												setOrderBeverages(
													produce(orderBeverages, (orderBeverages) => {
														orderBeverages.splice(index, 1)
													})
												)
											}}
										/>
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
								onClick={() => {
									addOrder(
										toServerOrder({
											bagels: orderBagels,
											beverages: orderBeverages,
											pickUpAt: parseTime(currentDate, currentTime),
										})
									)
								}}
								color="primary">
								Place Order ${price / 100}
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

const Wrapper = styled.div`
	display: inline-block;
`

const WrappedSelect = styled.select`
	height: 100%;
`

const OrderRow = styled.div`
	display: flex;
	align-items: center;
`

const RedText = styled.span`
	color: red;

	&:hover {
		text-align: center;
		cursor: pointer;
		color: darkred;
	}
`

function DeleteButton({ onDelete }: { onDelete: () => void }) {
	return <RedText onClick={onDelete}>X</RedText>
}

function toServerOrder(order: CreationOrder): OrderToSendToServer {
	return {
		bagels: order.bagels
			.filter((bagelOrder) => bagelOrder.bagel)
			.map((bagelOrder: any) => {
				return {
					bagel: bagelOrder.bagel,
					toppings: [
						...bagelOrder.toppings.filter((item) => item),
						...bagelOrder.smears.filter((item) => item),
					],
				}
			}),
		beverages: ((order.beverages.filter((item) => item): any): string[]),
		pickUpAt: order.pickUpAt,
	}
}
