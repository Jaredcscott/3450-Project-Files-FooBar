import React, { Component, useState, Checkbox } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'
import axios from 'axios'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'

const ONE_SECOND = 1 // ms

function getInventory() {
  return axios
	  .get('http://localhost:8100/inventory')
	  .then((res) => {
		  return res.data.data
		  console.log('successful gotten inventory')
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
	if (!PRODUCTS){
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
							</label>{' '}<br></br>
							<label>
								Category:{' '}
								<select 
									value={category} 
									onChange={(event) => 
										setCategory(event.target.value)
									}>
									{INVENTORY_ITEM_CATEGORIES.map((category) => {
										return (
											<option key={category} value={category}>
												{category}
											</option>
										)
									})}
								</select>
							</label>
							<label>{' '}<br></br>
								isOnMenu:{' '}
								<input
									type="checkbox"
									checked={isOnMenu}
									onChange={(event) => setIsOnMenu(event.target.checked)}
								/>
							</label>
							<label>{' '}<br></br>
								Quantity:{' '}
								<input
									type="number"
									value={qty}
									onChange={(event) => setQty(event.target.value)}
								/>
							</label>
							<label>{' '}<br></br>
								Price:{' '}
								<input
									type="number"
									value={price}
									onChange={(event) => setPrice(event.target.value)}
								/>
							</label>
							<label>{' '}<br></br>
								Target Count:{' '}
								<input
									type="number"
									value={targetCount}
									onChange={(event) => setTargetCount(event.target.value)}
								/>
							</label>{' '}<br></br>
							<Button
								color="primary"
								onClick={() =>
									addItem(name, category, qty, price, targetCount, isOnMenu, queryCache)
								}>
								Add Item
							</Button>
							<Button 
								color="primary" 
								onClick={() => 
									populateDatabase(queryCache)
								}>
								Populate Database
							</Button>
						</div> <br></br>
					</Form>
				</Background>
			</Screen>
		)
	}
	else return (
		<Screen>
			<Background>
				<Header text="Inventory"></Header>
				<Form>
					<div  style={{ 'width':"80%" }}>
						<label>
							Name:{' '}
							<input
								type="text"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</label>{' '}<br></br>
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
						<label>{' '}<br></br>
							isOnMenu:{' '}
							<input
								type="checkbox"
								checked={isOnMenu}
								onChange={(event) => setIsOnMenu(event.target.checked)}
							/>
						</label>
						<label>{' '}<br></br>
							Quantity:{' '}
							<input
								type="number"
								value={qty}
								onChange={(event) => setQty(event.target.value)}
							/>
						</label>
						<label>{' '}<br></br>
							Price:{' '}
							<input
								type="number"
								value={price}
								onChange={(event) => setPrice(event.target.value)}
							/>
						</label>
						<label>{' '}<br></br>
							Target Count:{' '}
							<input
								type="number"
								value={targetCount}
								onChange={(event) => setTargetCount(event.target.value)}
							/>
						</label>{' '}<br></br>
						<Button
							color="primary"
							onClick={() =>
								addItem(name, category, qty, price, targetCount, isOnMenu, queryCache)
							}>
							Add Item
						</Button>
						<Button color="primary" onClick={() => populateDatabase(queryCache)}>
							Populate Database
						</Button>
					</div> <br></br>			
					<FilterableProductTable products={PRODUCTS} />
				</Form>
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

function populateDatabase(queryCache: any) {
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
				window.location.reload(false);
			})
			.catch((err) => {
				console.log('failed to add item')
				console.error(err)
			})
	}
}

function updateItem(
	itemId: string,
	name: string,
	category: string,
	quantity: string | number,
	price: string | number,
	onMenu: boolean,
	targetCount: string | number
) {
	axios
		.post(`http://localhost:8100/inventory/${itemId}`, {
			category,
			name,
			quantity: Number(quantity),
			price: Number(price),
			onMenu: Boolean(onMenu),
			targetCount: Number(targetCount),
		})
		.then(() => {
			console.log('successful updated item')
		})
		.catch((err) => {
			console.log('failed to update item')
			console.error(err)
		})
}

var default_inventory = [
	{ name: 'Plain', category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Onion", category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Cinnamon raisin", category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Sesame", category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Cheesy", category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Pumpernickel", category: 'BAGEL', quantity: 100, price: 200, onMenu: true, targetCount: 50 },


    { name: "Plain", category: 'SMEAR', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Honey_nut", category: 'SMEAR', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Strawberry", category: 'SMEAR', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "French_onion", category: 'SMEAR', quantity: 100, price: 100, onMenu: true, targetCount: 50 },

    { name: "Bacon", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Egg", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Cheese", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Sausage", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Avocado", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 1000, onMenu: true, targetCount: 50 },
    { name: "Turkey", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Ham", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Spinach", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Tomato", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 100, onMenu: true, targetCount: 50 },
    { name: "Lox", category: 'SAMMICHE_TOPPINGS', quantity: 100, price: 1000, onMenu: true, targetCount: 50 },

    { name: "Coffee", category: 'BEVERAGE', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Milk", category: 'BEVERAGE', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "OJ", category: 'BEVERAGE', quantity: 100, price: 200, onMenu: true, targetCount: 50 },
    { name: "Water", category: 'BEVERAGE', quantity: 100, price: 500, onMenu: true, targetCount: 50 },
]


//  https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
class ProductCategoryRow extends React.Component {
	render() {
	  const category = this.props.category;
	  return (
		<tr>
		  <th colSpan="2">
			{category}
		  </th>
		</tr>
	  );
	}
  }


  class ProductRow extends React.Component {
	render() {
	  const product = this.props.product;
	  const name = product.stocked ?
		product.name :
		<span style={{color: 'red'}}>
		  {product.name}
		</span>;
  
	  return (
		<tr>
		  <td>{name}</td>
		  <td>{product.price}</td>
		  <td>{product.onMenu}</td>
		  <td>{product.quantity}</td>
		  <td>{product.targetCount}</td>
		</tr>
	  );
	}
  }


  class ProductTable extends React.Component {
	render() {
	  const rows = [];
	  let lastCategory = null;
	  
	  this.props.products.forEach((product) => {
		if (product.category !== lastCategory) {
		  rows.push(
			<ProductCategoryRow
			  category={product.category}
			  key={product.category} />
		  );
		}
		rows.push(
		  <ProductRow
			product={product}
			key={product.name} />
		);
		lastCategory = product.category;
	  });
  
	  return (
		<table>
		  <thead>
			<tr>
			  <th>Name</th>
			  <th>Price</th>
			  <th>On Menu</th>
			  <th>Quantity</th>
			  <th>Target Count</th>
			</tr>
		  </thead>
		  <tbody>{rows}</tbody>
		</table>
	  );
	}
  }
  

  class SearchBar extends React.Component {
	render() {
	  return (
		<form>
		  <input type="text" placeholder="Search..." />
		  <p>
			<input type="checkbox" />
			{' '}
			Only show products in stock
		  </p>
		</form>
	  );
	}
  }

  class FilterableProductTable extends React.Component {
	render() {
	  return (
		<div>
		  <SearchBar />
		  <ProductTable products={this.props.products} />
		</div>
	  );
	}
  }