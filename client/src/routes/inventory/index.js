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
    const [category, setCategory] = useState('')

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
                </label>                <br></br>
 
                <label>
                    BEVERAGE: {' '}
                    <input 
                        type="checkbox" 
                        checked={category} 
                        value = {INVENTORY_ITEM_CATEGORIES}
                        onChange={(event) => setCategory(event.target.value)} />

                </label>
                {INVENTORY_ITEM_CATEGORIES.BEVERAGE}
                <br></br>
                <label>
                    SAMMICHE_TOPPINGS: {' '}
                    <input 
                        type="checkbox" 
                        checked={category} 
                        value = {INVENTORY_ITEM_CATEGORIES}
                        onChange={(event) => setCategory(event.target.value)} />

                </label>
                {INVENTORY_ITEM_CATEGORIES.SAMMICHE_TOPPINGS}
                <br></br>
                <label>
                    SMEAR: {' '}
                    <input 
                        type="checkbox" 
                        checked={category} 
                        value = {INVENTORY_ITEM_CATEGORIES}
                        onChange={(event) => setCategory(event.target.value)} />

                </label>
                {INVENTORY_ITEM_CATEGORIES.SMEAR}
                <br></br>
                <label>
                    BAGEL: {' '}
                    <input 
                        type="checkbox" 
                        checked={category} 
                        value = {INVENTORY_ITEM_CATEGORIES}
                        onChange={(event) => setCategory(event.target.value)} />

                </label>
                {INVENTORY_ITEM_CATEGORIES.BAGEL}


                <label>                <br></br>
                    Quantity:{' '}
                    <input
                        type="text"
                        value={qty}
                        onChange={(event) => setQty(event.target.value)}
                    />
                </label>
                <label>                <br></br>
                    Price:{' '}
                    <input
                        type="text"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </label>
                <label>                <br></br>
                    Target Count:{' '}
                    <input
                        type="text"
                        value={targetCount}
                        onChange={(event) => setTargetCount(event.target.value)}
                    />
                </label>                <br></br>
                <Button
                    color="primary"
                    onClick={() => addItem(name, category, qty, price, targetCount, queryCache)}>
                    Add Item
                </Button>
                <Button
                    color="primary"
                    onClick={() => addDefault(loggedin, queryCache)}>
                    Populate Database
                </Button>
            </div>



            
        </Screen>
    )
	
}


const INVENTORY_ITEM_CATEGORIES = [
	{BEVERAGE: 'BEVERAGE',},
	{SAMMICHE_TOPPINGS: 'SAMMICHE_TOPPINGS',},
	{SMEAR: 'SMEAR',},
	{BAGEL: 'BAGEL',}
]

function addItem(
    name: string,
	category: string,
	qty: int,
    price: int,
    targetCount: int,
	queryCache: any
) {
	axios
		.post('http://localhost:8100/inventory', {category, name, qty, price, targetCount})
		.then(() => {
			console.log('successful added item')
		})
		.catch((err) => {
			console.log('failed to add item')
			console.error(err)
		})
}

function addDefault(
    loggedin: res.data.data,
    queryCache: any,
) {
    var i;
    for (i = 0; i < default_inventory.length; i++) {
    var name = default_inventory[i].name
	var category = default_inventory[i].category
	var quantity = default_inventory[i].quantity
    var price = default_inventory[i].price
    var onMenu = false
    var targetCount = default_inventory[i].targetCount

    axios
    .post(`http://localhost:8100/inventory`, {category, name, quantity, price, onMenu, targetCount})
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
function getItem(
    loggedin: res.data.data,
    queryCache: any,
) {
    var i;
    for (i = 0; i < default_inventory.length; i++) {
    var name = default_inventory[i].name
	var category = default_inventory[i].category
	var quantity = default_inventory[i].quantity
    var price = default_inventory[i].price
    var onMenu = false
    var targetCount = default_inventory[i].targetCount

    axios
    .post(`http://localhost:8100/inventory/${loggedin.data._id}`, {category, name, quantity, price, onMenu, targetCount})
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



// var default_inventory = [
//     [
//     {category: INVENTORY_ITEM_CATEGORIES.BAGEL},
//     {name: "Plain"},
//     {quantity: 100},
//     {price: 200},
//     {onMenu: true},
//     {targetCount: 50}
//     ],

//   ]



  var default_inventory = [
    [
    {category: INVENTORY_ITEM_CATEGORIES.BAGEL},
    {name: 'tomato'},
    {quantity: 2},
    {price: 1},
    {onMenu: false},
    {targetCount: 100}
    ],

  ]
