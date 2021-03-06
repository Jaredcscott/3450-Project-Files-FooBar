import React from 'react'
import Footer from './Footer'
import Link from './Link'

export default function BasicFooter() {
	return (
		<Footer>
			<ul>
				<li>
					<Link href={'/account'}> Take Me To My Account</Link>
				</li>
				<li>
					<Link href={'/home'}>Home Page</Link>
				</li>
				<li>
					<Link href={'/about'}>About Dan's Bagel Shop</Link>
				</li>
				<li>
					<Link href={'/contact'}>Contact Us</Link>
				</li>
			</ul>
		</Footer>
	)
}
