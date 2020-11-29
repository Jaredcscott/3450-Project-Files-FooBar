import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useQueryCache } from 'react-query'
import axios from 'axios'
import Button from '../../general/Button'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'
import produce from 'immer'
import { isEqual, startCase } from 'lodash'

const ONE_SECOND = 1 // ms

function getInventory() {
	return axios
		.get('http://localhost:8100/inventory')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

export default function Inventory() {
	const inventory = useQuery('inventory', getInventory, {
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
	const PRODUCTS = inventory.data
	console.log(inventory)
	if (!PRODUCTS) {
		return (
			<Screen>
				<Background>
					<Header text="Inventory"></Header>
					<Form>
						<div width="1700px">
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
									addItem(
										name,
										category,
										qty,
										price,
										targetCount,
										isOnMenu,
										queryCache
									)
								}>
								Add Item
							</Button>
							<Button color="primary" onClick={() => populateDatabase(queryCache)}>
								Populate Database
							</Button>
						</div>{' '}
						<br></br>
					</Form>
				</Background>
			</Screen>
		)
	} else
		return (
			<Screen>
				<Background>
					<Header text="Inventory"></Header>
					<Form>
						<div style={{ marginTop: '25px', marginBottom: '25px' }}>
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
										{INVENTORY_ITEM_CATEGORIES.map((category) => {
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
										addItem(
											name,
											category,
											qty,
											price,
											targetCount,
											isOnMenu,
											queryCache
										).then(() => {
											setName('')
											setQty('')
											setPrice('')
											setTargetCount('')
											setCategory(INVENTORY_ITEM_CATEGORIES[0])
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
							<FilterableProductTable products={PRODUCTS} />
							<Button color="primary" onClick={(event) => setQty(event.target.value)}>
								Save This inventory
							</Button>
							<Button color="primary" onClick={(event) => setQty(event.target.value)}>
								Print Analytics
							</Button>
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
								<a href="<about>">About Dan's Bagel Shop</a>
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
	return axios
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
			queryCache.invalidateQueries('inventory')
		})
		.catch((err) => {
			console.log('failed to add item')
			console.error(err)
		})
}

function populateDatabase(queryCache: any) {
	var i
	for (i = 0; i < default_inventory.length; i++) {
		var name = default_inventory[i].name
		var category = default_inventory[i].category
		var quantity = default_inventory[i].quantity
		var price = default_inventory[i].price
		var onMenu = default_inventory[i].onMenu
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
				queryCache.invalidateQueries('inventory')
			})
			.catch((err) => {
				console.log('failed to add item')
				console.error(err)
			})
	}
}

function updateItem(item: any, queryCache: any) {
	axios
		.post(`http://localhost:8100/inventory/${item._id}`, item)
		.then(() => {
			console.log('successful updated item')
			queryCache.invalidateQueries('inventory')
		})
		.catch((err) => {
			console.log('failed to update item')
			console.error(err)
		})
}

function none() {}

var default_inventory = [
	{ name: 'Plain', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{ name: 'Onion', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{
		name: 'Cinnamon raisin',
		category: 'BAGEL',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{ name: 'Sesame', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{ name: 'Cheesy', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{
		name: 'Pumpernickel',
		category: 'BAGEL',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},

	{ name: 'Plain', category: 'SMEAR', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
	{
		name: 'Honey Nut',
		category: 'SMEAR',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Strawberry',
		category: 'SMEAR',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'French Onion',
		category: 'SMEAR',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},

	{
		name: 'Bacon',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Egg',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Cheese',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Sausage',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Avocado',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 1000,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Turkey',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Ham',
		category: 'SAMMICHE TOPPINGS',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Spinach',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Tomato',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 100,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Lox',
		category: 'SAMMICHE_TOPPINGS',
		quantity: 100,
		price: 1000,
		onMenu: true,
		targetCount: 50,
	},

	{
		name: 'Coffee',
		category: 'BEVERAGE',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{
		name: 'Milk',
		category: 'BEVERAGE',
		quantity: 100,
		price: 200,
		onMenu: true,
		targetCount: 50,
	},
	{ name: 'OJ', category: 'BEVERAGE', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
	{
		name: 'Water',
		category: 'BEVERAGE',
		quantity: 100,
		price: 500,
		onMenu: true,
		targetCount: 50,
	},
]

//  https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
class ProductCategoryRow extends React.Component {
	render() {
		const category = this.props.category
		return (
			<tr>
				<th colSpan="2" style={{ fontSize: '30px' }}>
					{category}
				</th>
			</tr>
		)
	}
}

function ProductRow({ product }: { product: any }) {
	const queryCache = useQueryCache()

	const [editableProduct, setEditableProduct] = useState(product)
	const amountNeeded = editableProduct.targetCount - editableProduct.quantity

	return (
		<tr>
			<td>
				<input
					value={editableProduct.name}
					onChange={(event) =>
						setEditableProduct(
							produce(editableProduct, (newProduct) => {
								newProduct.name = event.target.value
							})
						)
					}
				/>
			</td>
			<td>
				$
				<input
					type="number"
					value={editableProduct.price / 100}
					onChange={(event) =>
						setEditableProduct(
							produce(editableProduct, (newProduct) => {
								try {
									newProduct.price = Math.floor(Number(event.target.value) * 100)
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					type="checkbox"
					checked={editableProduct.onMenu}
					onChange={(event) =>
						setEditableProduct(
							produce(editableProduct, (newProduct) => {
								try {
									newProduct.onMenu = Boolean(event.target.checked)
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					id="quan"
					type="number"
					value={editableProduct.quantity}
					onChange={(event) =>
						setEditableProduct(
							produce(editableProduct, (newProduct) => {
								try {
									newProduct.quantity = Math.floor(Number(event.target.value))
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<input
					type="number"
					value={editableProduct.targetCount}
					onChange={(event) =>
						setEditableProduct(
							produce(editableProduct, (newProduct) => {
								try {
									newProduct.targetCount = Math.floor(Number(event.target.value))
								} catch {}
							})
						)
					}></input>
			</td>
			<td>
				<Needed>{amountNeeded > 0 ? amountNeeded : null}</Needed>
			</td>
			{!isEqual(product, editableProduct) ? (
				<td>
					<Button color="primary" onClick={() => updateItem(editableProduct, queryCache)}>
						Save
					</Button>
				</td>
			) : null}
		</tr>
	)
}

const Needed = styled.span`
	color: red;
`

function ProductTable({ products }: { products: any }) {
	const rows = []
	let lastCategory = null
	products.sort((product1, product2) =>
		String(product1.category).localeCompare(String(product2.category))
	)
	products.forEach((product) => {
		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					category={product.category}
					key={product.category + ' ' + product.name}
				/>
			)
		}
		rows.push(<ProductRow product={product} key={product._id} />)
		lastCategory = product.category
	})

	return (
		<table style={{ fontSize: '30px', textAlign: 'left' }}>
			<thead>
				<tr>
					<th> Name </th>
					<th> Price </th>
					<th> On Menu </th>
					<th> Quantity </th>
					<th> Target Count </th>
					<th> Amount Needed </th>
					<th> Save </th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	)
}

function SearchBar() {
	return (
		<form>
			<input type="text" placeholder="Search..." />
			<p>
				<input type="checkbox" /> Only show products in stock
			</p>
		</form>
	)
}

function FilterableProductTable({ products }) {
	return (
		<div style={{ textShadow: '3px 3px 5px blue' }}>
			<SearchBar />
			<ProductTable products={products} />
		</div>
	)
}
