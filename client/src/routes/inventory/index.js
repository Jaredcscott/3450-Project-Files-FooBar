import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useQueryCache } from 'react-query'
import { Button, Form, Header, Footer, Screen, Background } from '../../general'
import produce from 'immer'
import { isEqual, startCase } from 'lodash'
import { getInventory, addInventoryItem, updateInventoryItem } from '../../queries'
import { DEFAULT_INVENTORY } from './constants'
import { INVENTORY_ITEM_CATEGORIES_ENUM, type InventoryItem } from '../../types'

export default function Inventory() {
	const inventory = useQuery('inventory', getInventory, {
		refetchOnWindowFocus: false,
	}).data

	const [name, setName] = useState('')
	const [qty, setQty] = useState('')
	const [price, setPrice] = useState('')
	const [targetCount, setTargetCount] = useState('')
	const [category, setCategory] = useState(INVENTORY_ITEM_CATEGORIES_ENUM[0])
	const [isOnMenu, setIsOnMenu] = useState(false)
	const queryCache = useQueryCache()

	if (!inventory) {
		return null
	} else
		return (
			<Screen>
				<Background>
					<Header text="Inventory"></Header>
					<Form>
						<div style={{ marginTop: '25px', marginBottom: '25px', fontSize: '25px' }}>
							<div style={{ width: '80%', textShadow: '3px 3px 5px blue' }}>
								<label>
									Name:{' '}
									<input
										type="text"
										value={name}
										onChange={(event) => setName(event.target.value)}
									/>
								</label>{' '}
								<br></br>
								<label>
									Category:{' '}
									<select
										value={category}
										onChange={(event) => setCategory(event.target.value)}>
										{INVENTORY_ITEM_CATEGORIES_ENUM.map((category) => {
											return (
												<option key={category} value={category}>
													{startCase(category)}
												</option>
											)
										})}
									</select>
								</label>
								<label>
									{' '}
									<br></br>
									On Menu:{' '}
									<input
										type="checkbox"
										checked={isOnMenu}
										onChange={(event) => setIsOnMenu(event.target.checked)}
									/>
								</label>
								<label>
									{' '}
									<br></br>
									Quantity:{' '}
									<input
										type="number"
										value={qty}
										onChange={(event) => setQty(event.target.value)}
									/>
								</label>
								<label>
									{' '}
									<br></br>
									Price:{' '}
									<input
										type="number"
										value={price}
										onChange={(event) => setPrice(event.target.value)}
									/>
								</label>
								<label>
									{' '}
									<br></br>
									Target Count:{' '}
									<input
										type="number"
										value={targetCount}
										onChange={(event) => setTargetCount(event.target.value)}
									/>
								</label>{' '}
								<br></br>
								<Button
									color="primary"
									onClick={() => {
										addInventoryItem({
											category,
											name,
											quantity: Number(qty),
											price: Number(price),
											onMenu: isOnMenu,
											targetCount: Number(targetCount),
										}).then(() => {
											queryCache.invalidateQueries('inventory')
											setName('')
											setQty('')
											setPrice('')
											setTargetCount('')
											setCategory(INVENTORY_ITEM_CATEGORIES_ENUM[0])
											setIsOnMenu(false)
										})
									}}>
									Add Item
								</Button>
								<Button
									color="primary"
									onClick={() => populateDatabase(queryCache)}>
									Populate Database
								</Button>
							</div>{' '}
							<br></br>
							<InventoryTable inventory={inventory} />
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

function InventoryTable({ inventory }: { inventory: InventoryItem[] }) {
	const rows = []
	let lastCategory = null

	const items = [...inventory]

	items.sort((product1, product2) =>
		String(product1.category).localeCompare(String(product2.category))
	)
	items.forEach((item: InventoryItem) => {
		if (item.category !== lastCategory) {
			rows.push(
				<tr>
					<th colSpan="2" style={{ fontSize: '20px', textAlign: 'left' }}>
						{item.category}
					</th>
				</tr>
			)
		}
		rows.push(<InventoryItemRow item={item} key={item._id} />)
		lastCategory = item.category
	})

	return (
		<TableWrapper>
			<table style={{ fontSize: '25px', textAlign: 'center' }}>
				<thead>
					<tr>
						<th> Name </th>
						<th> Price </th>
						<th> On Menu </th>
						<th> Quantity </th>
						<th> Target Count </th>
						<th> Needed </th>
						<th> </th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</TableWrapper>
	)
}

function InventoryItemRow({ item }: { item: InventoryItem }) {
	const queryCache = useQueryCache()
	const [editableItem, setEditableItem] = useState(item)
	const amountNeeded = editableItem.targetCount - editableItem.quantity

	return (
		<tr>
			<td>
				<input
					value={editableItem.name}
					onChange={(event) =>
						setEditableItem(
							produce(editableItem, (newItem) => {
								newItem.name = event.target.value
							})
						)
					}
				/>
			</td>
			<td>
				$
				<input
					type="number"
					value={editableItem.price / 100}
					onChange={(event) =>
						setEditableItem(
							produce(editableItem, (newItem) => {
								try {
									newItem.price = Math.floor(Number(event.target.value) * 100)
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					type="checkbox"
					checked={editableItem.onMenu}
					onChange={(event) =>
						setEditableItem(
							produce(editableItem, (newItem) => {
								try {
									newItem.onMenu = Boolean(event.target.checked)
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					id="quan"
					type="number"
					value={editableItem.quantity}
					onChange={(event) =>
						setEditableItem(
							produce(editableItem, (newItem) => {
								try {
									newItem.quantity = Math.floor(Number(event.target.value))
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					type="number"
					value={editableItem.targetCount}
					onChange={(event) =>
						setEditableItem(
							produce(editableItem, (newItem) => {
								try {
									newItem.targetCount = Math.floor(Number(event.target.value))
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<Needed>{amountNeeded > 0 ? amountNeeded : null}</Needed>
			</td>
			{!isEqual(item, editableItem) ? (
				<td>
					<Button
						color="primary"
						onClick={() => updateInventoryItem(editableItem, queryCache)}>
						Save
					</Button>
				</td>
			) : null}
		</tr>
	)
}

function populateDatabase(queryCache: any) {
	return Promise.all(DEFAULT_INVENTORY.map(addInventoryItem))
		.then(() => {
			console.log('successfully added item')
			alert('successfully populated database')
			queryCache.invalidateQueries('inventory')
		})
		.catch((err) => {
			console.log('failed to add item')
			alert('faled to  populated database')
			console.error(err)
		})
}

const Needed = styled.span`
	color: red;
`

const TableWrapper = styled.div`
	text-shadow: 3px 3px 5px blue;
`
