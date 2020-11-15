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

function getUsers() {
  return axios
	  .get('http://localhost:8100/user/all')
	  .then((res) => {
        console.log('successful gotten accounts')  
        return res.data.data
	  })
	  .catch(() => null)
}

export default function Users() {

	const users = useQuery('users', getUsers, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})

    // name, email, balance, roles


	const queryCache = useQueryCache()
	const PRODUCTS = users.data
    console.log(users)
    
	if (!PRODUCTS){
		return (null)
	}
	else return (
		<Screen>
			<Background>
				<Header text="Users"></Header>
				<Form>		
					<FilterableProductTable products={PRODUCTS} />
				</Form>
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
		  <td>{name}</td>
		  <td>{product.email}</td>
		  <td>{product.balance}</td>
		  <td>{product.roles}</td>
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
			  <th>Name </th>
			  <th>Email </th>
			  <th>Balance </th>
			  <th>Roles </th>
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