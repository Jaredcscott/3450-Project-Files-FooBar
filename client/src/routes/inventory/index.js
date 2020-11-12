import React, { Component, useState, Checkbox } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'
import axios from 'axios'
// import {default_inventory} from './inventory_data'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

export default function Inventory() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const [name, setName] = useState('')
	const [qty, setQty] = useState('')
	const [price, setPrice] = useState('')
	const [targetCount, setTargetCount] = useState('')
	const [category, setCategory] = useState(INVENTORY_ITEM_CATEGORIES[0])
	const [isOnMenu, setIsOnMenu] = useState(false)

	const queryCache = useQueryCache()

	return (
		<Screen>
			<div>
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
					<select value={category} onChange={(event) => setCategory(event.target.value)}>
						{INVENTORY_ITEM_CATEGORIES.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							)
						})}
					</select>
				</label>
				<label>
					{' '}
					<br></br>
					isOnMenu:{' '}
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
					onClick={() =>
						addItem(name, category, qty, price, targetCount, isOnMenu, queryCache)
					}>
					Add Item
				</Button>
				<Button color="primary" onClick={() => addDefault(loggedin, queryCache)}>
					Populate Database
				</Button>
			</div>
		</Screen>
	)
}

const INVENTORY_ITEM_CATEGORIES = ['BEVERAGE', 'SAMMICHE_TOPPINGS', 'SMEAR', 'BAGEL']

function addItem(
	name: string,
	category: string,
	qty: string,
	price: string,
	targetCount: string,
	isOnMenu: boolean,
	queryCache: any
) {
	console.log({
		category,
		name,
		quantity: Number(qty),
		price: Number(price),
		onMenu: isOnMenu,
		targetCount: Number(targetCount),
	})
	axios
		.post('http://localhost:8100/inventory', {
			category,
			name,
			quantity: Number(qty),
			price: Number(price),
			onMenu: isOnMenu,
			targetCount: Number(targetCount),
		})
		.then(() => {
			console.log('successful added item')
		})
		.catch((err) => {
			console.log('failed to add item')
			console.error(err)
		})
}

function addDefault(loggedin: res.data.data, queryCache: any) {
	var i
	for (i = 0; i < default_inventory.length; i++) {
		var name = default_inventory[i].name
		var category = default_inventory[i].category
		var quantity = default_inventory[i].quantity
		var price = default_inventory[i].price
		var onMenu = false
		var targetCount = default_inventory[i].targetCount

		axios
			.post(`http://localhost:8100/inventory`, {
				category,
				name,
				quantity,
				price,
				onMenu,
				targetCount,
			})
			.then(() => {
				console.log('successful added item')
			})
			.catch((err) => {
				console.log('failed to add item')
				console.error(err)
			})
	}
}

// getItem needs refactored
function getItem(loggedin: res.data.data, queryCache: any) {
	var i
	for (i = 0; i < default_inventory.length; i++) {
		var name = default_inventory[i].name
		var category = default_inventory[i].category
		var quantity = default_inventory[i].quantity
		var price = default_inventory[i].price
		var onMenu = false
		var targetCount = default_inventory[i].targetCount

		axios
			.post(`http://localhost:8100/inventory/${loggedin.data._id}`, {
				category,
				name,
				quantity,
				price,
				onMenu,
				targetCount,
			})
			.then(() => {
				console.log('successful added item')
			})
			.catch((err) => {
				console.log('failed to add item')
				console.error(err)
			})
	}
}

const Screen = styled.div`
	width: 100%;
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.color.base.darker};
`

var default_inventory = [
	{ name: 'Plain', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{
		name: 'Strawberry',
		category: 'SMEAR',
		quantity: 100,
		price: 10,
		onMenu: true,
		targetCount: 50,
	},
]
