import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../general/Button'
import Body from '../../general/Body'
import Form from '../../general/Form'
import Header from '../../general/Header'
import Footer from '../../general/Footer'
import Screen from '../../general/Screen'
import Background from '../../general/Background'
import config from '../../config'
import axios from 'axios'
import { useQuery, useQueryCache } from 'react-query'
import cart from '../../general/cart.jpg'
import yumBagel from '../../general/yumBagel.jpg'
import moreBagels from '../../general/moreBagels.jpg'
import smearBagels from '../../general/bagelWithSmear.jpg'
import bagelShop from '../../general/bagelShop.jpg'

function getSignedInUser() {
	return axios
		.get('http://localhost:8100/user')
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

const ONE_SECOND = 1000 // ms

export default function About() {
	const loggedin = useQuery('user', getSignedInUser, {
		cacheTime: ONE_SECOND,
		refetchOnWindowFocus: false,
	})
	const queryCache = useQueryCache()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [verify, setVerifyPassword] = useState({})
	const [name, setName] = useState('')
    if (loggedin.data) {
        return (
            <Screen>
                <Background>
                    <Header text="Who is Dan?"></Header>
                    <Form>
                        <div
                            className="flex-container"
                            style={{
                                'fontSize': '25px',
                            }}>
                            <div className="flex-child">
                                <div style={{
                                    'marginTop': '5px',
									'marginBottom': '5px',
                                    'marginLeft': '5px',
                                    'marginRight': '5px',
                                    'padding': '5px',
									'borderStyle': 'ridge',
									'borderColor': 'blue',
									'borderWidth': '15px',
									'textShadow': '3px 3px 5px blue',
								}}>
                                    <Body
                                        text="  
                                        ">Dan's Bagel Shop has a long and rich history. What started as a small bagel cart delivering bagels to hungry customers, 
                                        has now blossomed into the bagel kingdom we know as The Dan's Bagel Shop. Dan's was started by the intrepid entrepreneur Mr. Dan.
                                        In 1985 Dan sought to be the worlds greatest bagel supplier.<br></br><br></br>
                                        He bought his first cart for $250, and worked out a deal with the local bakery to supply him with fresh made bagels each morning. Him and his wife, Daniel, would hand make the next day's smears 
                                        each night in their small studio apartment. When the lines for the cart started to become unmanageable, Dan bought the first brick and mortar
                                        Dan's Bagel Shop location.<br></br><br></br>
                                        Today there are over 1 locations, and Dan's is moving into the 21st century by incorporating this high-tech web application. 
                                        We thank you for being a member of the Dan's family and hope you enjoy the worlds greatest bagels!
                                        <br></br><br></br>
                                    </Body>
                                    <div className="flex-child" style={{'textAlign':'center'}}>
                                        <img
                                                src={cart}
                                                className="photo"
                                                alt="Dans Bagel Cart"
                                                style={{}}
                                        />
                                        <img
                                                src={yumBagel}
                                                className="photo"
                                                alt="Yummy Bagel"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={moreBagels}
                                                className="photo"
                                                alt="Yummy Bagels"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={smearBagels}
                                                className="photo"
                                                alt="Bagels with smear"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={bagelShop}
                                                className="photo"
                                                alt="Bagel Shop"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <Footer>
                        <ul>
                            <li>
								<a href="account">Take Me To My Account</a>
							</li>
							<li>
								<a href="order">Place An Order</a>
							</li>
                            <li>
                                <a href="home">Home</a>
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
    else {
        return (
            <Screen>
                <Background>
                    <Header text="Who is Dan?"></Header>
                    <Form>
                        <div
                            className="flex-container"
                            style={{
                                'fontSize': '25px',
                            }}>
                            <div className="flex-child">
                                <div style={{
                                    'marginTop': '5px',
									'marginBottom': '5px',
                                    'marginLeft': '5px',
                                    'marginRight': '5px',
                                    'padding': '5px',
									'borderStyle': 'ridge',
									'borderColor': 'blue',
									'borderWidth': '15px',
									'textShadow': '3px 3px 5px blue',
								}}>
                                    <Body
                                        text="  
                                        ">Dan's Bagel Shop has a long and rich history. What started as a small bagel cart delivering bagels to hungry customers, 
                                        has now blossomed into the bagel kingdom we know as The Dan's Bagel Shop. Dan's was started by the intrepid entrepreneur Mr. Dan.
                                        In 1985 Dan sought to be the worlds greatest bagel supplier.<br></br><br></br>
                                        He bought his first cart for $250, and worked out a deal with the local bakery to supply him with fresh made bagels each morning. Him and his wife, Daniel, would hand make the next day's smears 
                                        each night in their small studio apartment. When the lines for the cart started to become unmanageable, Dan bought the first brick and mortar
                                        Dan's Bagel Shop location.<br></br><br></br>
                                        Today there are over 1 locations, and Dan's is moving into the 21st century by incorporating this high-tech web application. 
                                        We thank you for being a member of the Dan's family and hope you enjoy the worlds greatest bagels!
                                        <br></br><br></br>
                                    </Body>
                                    <div className="flex-child" style={{'textAlign':'center'}}>
                                        <img
                                                src={cart}
                                                className="photo"
                                                alt="Dans Bagel Cart"
                                                style={{}}
                                        />
                                        <img
                                                src={yumBagel}
                                                className="photo"
                                                alt="Yummy Bagel"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={moreBagels}
                                                className="photo"
                                                alt="Yummy Bagels"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={smearBagels}
                                                className="photo"
                                                alt="Bagels with smear"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                        <img
                                                src={bagelShop}
                                                className="photo"
                                                alt="Bagel Shop"
                                                style={{'width': '266px', 'height':'190px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <Footer>
                        <ul>
                            <li>
                                <a href="home">Home</a>
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
}