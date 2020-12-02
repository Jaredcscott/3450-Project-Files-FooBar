import React from 'react'
import { useQuery } from 'react-query'
import {
	Body,
	Form,
	Header,
	Footer,
	Screen,
	Background,
	cartImage,
	yumBagelImage,
	moreBagelsImage,
	bagelWithSmearImage,
	bagelShopImage,
} from '../../general'
import { getSignedInUser } from '../../queries'
import { useHistory } from 'react-router-dom'

export default function About() {
	const history = useHistory()

	const user = useQuery('user', getSignedInUser, {
		refetchOnWindowFocus: false,
	}).data

	return (
		<Screen>
			<Background>
				<Header text="Who is Dan?"></Header>
				<Form>
					<div
						className="flex-container"
						style={{
							fontSize: '25px',
						}}>
						<div className="flex-child">
							<div
								style={{
									marginTop: '5px',
									marginBottom: '5px',
									marginLeft: '5px',
									marginRight: '5px',
									padding: '5px',
									borderStyle: 'ridge',
									borderColor: 'blue',
									borderWidth: '15px',
									textShadow: '3px 3px 5px blue',
								}}>
								<Body
									text="  
                                        ">
									Dan's Bagel Shop has a long and rich history. What started as a
									small bagel cart delivering bagels to hungry customers, has now
									blossomed into the bagel kingdom we know as The Dan's Bagel
									Shop. Dan's was started by the intrepid entrepreneur Mr. Dan. In
									1985 Dan sought to be the worlds greatest bagel supplier.
									<br></br>
									<br></br>
									He bought his first cart for $250, and worked out a deal with
									the local bakery to supply him with fresh made bagels each
									morning. Him and his wife, Daniel, would hand make the next
									day's smears each night in their small studio apartment. When
									the lines for the cart started to become unmanageable, Dan
									bought the first brick and mortar Dan's Bagel Shop location.
									<br></br>
									<br></br>
									Today there are over 1 locations, and Dan's is moving into the
									21st century by incorporating this high-tech web application.{' '}
									{user ? (
										`We thank you for being a member of the Dan's
										family and hope you enjoy the world's greatest bagels!`
									) : (
										<>
											<br />
											<br />
											We welcome you, and hope you become a member of the
											Dan's family. Then you can enjoy the world's greatest
											bagels too!
										</>
									)}
									<br></br>
									<br></br>
								</Body>
								<div className="flex-child" style={{ textAlign: 'center' }}>
									<img
										src={cartImage}
										className="photo"
										alt="Dans Bagel Cart"
										style={{}}
									/>
									<img
										src={yumBagelImage}
										className="photo"
										alt="Yummy Bagel"
										style={{ width: '266px', height: '190px' }}
									/>
									<img
										src={moreBagelsImage}
										className="photo"
										alt="Yummy Bagels"
										style={{ width: '266px', height: '190px' }}
									/>
									<img
										src={bagelWithSmearImage}
										className="photo"
										alt="Bagels with smear"
										style={{ width: '266px', height: '190px' }}
									/>
									<img
										src={bagelShopImage}
										className="photo"
										alt="Bagel Shop"
										style={{ width: '266px', height: '190px' }}
									/>
								</div>
							</div>
						</div>
					</div>
				</Form>
				<Footer>
					<ul>
						{user ? (
							<>
								<li>
									<a onClick={() => history.replace('/account')}>
										Take Me To My Account
									</a>
								</li>
								<li>
									<a onClick={() => history.replace('/order')}>Place An Order</a>
								</li>
							</>
						) : null}
						<li>
							<a onClick={() => history.replace('/home')}>Home</a>
						</li>
						<li>
							<a onClick={() => history.replace('/contact')}>Contact Us</a>
						</li>
					</ul>
				</Footer>
			</Background>
		</Screen>
	)
}
