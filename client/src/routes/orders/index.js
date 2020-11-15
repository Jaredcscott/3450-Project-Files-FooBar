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

function getOrders() {
  return axios
	  .get('http://localhost:8100/order')
	  .then((res) => {
        console.log('successful gotten orders')  
        return res.data.data
	  })
	  .catch(() => null)
}

export default function Orders() {

	const orders = useQuery('orders', getOrders, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

	const queryCache = useQueryCache()
	const PRODUCTS = orders.data
    console.log(orders)
    
	if (!PRODUCTS){
		return (null)
	}
	else return (
		<Screen>
			<Background>
				<Header text="Order History"></Header>
				<Form>		
					<FilterableProductTable products={PRODUCTS} />
				</Form>
				<Footer>
					<ul>
						<li><a href="account">Take Me To My Account</a></li>
						<li><a href="home">Home Page</a></li>
						<li><a href="<Fill In>">About Dan's Bagel Shop</a></li>
						<li><a href="<Fill In">Contact Us</a></li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}


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
		  <td>{product.beverages}</td>
		  <td>{product.bagels}</td>
          <td>{product.placed}</td>
          <td>{product.pickupAt}</td>
          <td>{product.placedBy}</td>
          <td>{product.price}</td>
          <td>{product.status}</td>
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
			  <th>Beverages  |  </th>
			  <th> Bagels  |  </th>
			  <th> Placed  |  </th>
			  <th> Pickup At  |  </th>
              <th> Placed By  |  </th>
              <th> Price  |  </th>
              <th> Status</th>
			</tr>
		  </thead>
		  <tbody>{rows}</tbody>
		</table>
	  );
	}
  }
  


  class FilterableProductTable extends React.Component {
	render() {
	  return (
		<div>
		  <ProductTable products={this.props.products} />
		</div>
	  );
	}
  }