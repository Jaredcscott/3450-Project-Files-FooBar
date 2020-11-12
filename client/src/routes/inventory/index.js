import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryCache } from 'react-query'
import Button from '../../general/Button'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'
import axios from 'axios'

// const InventoryItemSchema = new Schema(
// 	{
// 		category: {
// 			type: String,
// 			enum: INVENTORY_ITEM_CATEGORIES_ENUM,
// 			required: true,
// 		},
// 		name: { type: String, required: true },
// 		quantity: { type: Number, required: true, default: 0 },
// 		price: { type: Number, required: true },
// 		onMenu: { type: Boolean, required: true, default: false },
// 		targetCount: { type: Number, required: true },
// 	},
// 	{ minimize: false }
// )


export default function Inventory() {
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
                    Category:{' '}
                    <input
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </label>
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
                    onClick={() => addItem(name, category, qty, price, targetCount, queryCache)}>
                    Populate Database
                </Button>
            </div>
        </Screen>
    )
	
}

const INVENTORY_ITEM_CATEGORIES = {
	BEVERAGE: 'BEVERAGE',
	SAMMICHE_TOPPINGS: 'SAMMICHE_TOPPINGS',
	SMEAR: 'SMEAR',
	BAGEL: 'BAGEL',
}

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

const Screen = styled.div`
	width: 100%;
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.color.base.darker};
`
