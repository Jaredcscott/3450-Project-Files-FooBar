import app from '../../App'
import request from 'supertest'
import {
	INVENTORY_ITEM_CATEGORIES,
	ROLES,
	ORDER_STATUS,
} from '../../utils/constants'
import { Item } from '../../models/inventoryItem'
import { UserModel } from '../../models/accounts'
import { Order } from '../../models/order'

describe('Analytics', () => {
	let customerCookies = []
	let customerId = ''
	let managerCookies = []
	let beverageId = ''
	let bagelId = ''
	let smearId = ''

	beforeAll(async () => {
		// add test accounts
		await Promise.all([
			request(app)
				.post('/auth/register')
				.send({
					email: 'customerAnalytics@customer.com',
					name: 'customer',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					customerCookies = response.headers['set-cookie']
					customerId = (
						await UserModel.findOne({
							email: 'customerAnalytics@customer.com',
						}).lean()
					)._id
				}),

			request(app)
				.post('/auth/register')
				.send({
					email: 'managerAnalytics@admin.com',
					name: 'manager',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					managerCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'managerAnalytics@admin.com',
					})
					user.roles.push(ROLES.MANAGER)
					return user.save()
				}),
		])

		const bagel = new Item({
			category: INVENTORY_ITEM_CATEGORIES.BAGEL,
			name: 'plain',
			quantity: 100,
			price: 50,
			onMenu: true,
			targetCount: 25,
		})

		const smear = new Item({
			category: INVENTORY_ITEM_CATEGORIES.SMEAR,
			name: 'honey',
			quantity: 100,
			price: 29,
			onMenu: true,
			targetCount: 25,
		})

		const beverage = new Item({
			category: INVENTORY_ITEM_CATEGORIES.BEVERAGE,
			name: 'pineapple',
			quantity: 100,
			price: 18,
			onMenu: true,
			targetCount: 25,
		})

		await Promise.all([bagel.save(), smear.save(), beverage.save()])
		smearId = String(smear._id)
		bagelId = String(bagel._id)
		beverageId = String(beverage._id)

		let order1 = new Order({
			beverages: [],
			bagels: [
				{
					bagel: bagelId,
					toppings: [],
				},
			],
			placed: 100,
			placedBy: customerId,
			price: 2,
			status: ORDER_STATUS.FULFILLED,
			pickupAt: 10000000000,
		})

		let order2 = new Order({
			beverages: [beverageId],
			bagels: [],
			placed: 175,
			placedBy: customerId,
			price: 3,
			status: ORDER_STATUS.FULFILLED,
			pickupAt: 10000000000,
		})

		let order3 = new Order({
			beverages: [beverageId],
			bagels: [{ bagel: bagelId, toppings: [smearId, smearId] }],
			placed: 200,
			placedBy: customerId,
			price: 5,
			status: ORDER_STATUS.FULFILLED,
			pickupAt: 10000000000,
		})

		await Promise.all([order1.save(), order2.save(), order3.save()])

		return Promise.resolve()
	})

	describe('/analytics GET', () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/analytics`).expect(401)
		})

		it('should not allow this route to roles other than MANAGER and ADMIN', async () => {
			return request(app)
				.get(`/analytics`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should return 400 if query string is invalid', async () => {
			return request(app)
				.get(`/analytics?startDate=230239&endDate=2362736e7878e8`)
				.set('Cookie', managerCookies)
				.expect(400)
		})

		it('should return the analytics of all the orders if no time range is given', async () => {
			return request(app)
				.get(`/analytics`)
				.set('Cookie', managerCookies)
				.expect(200)
				.then((response) => {
					const { items, orders, totalPrice } = response.body.data
					expect(orders.length >= 2).toBe(true)
					expect(totalPrice >= 9).toBe(true)
					expect(items.length > 2).toBe(true)
					const itemMap = {}
					items.forEach((item) => (itemMap[item._id] = item))
					expect(itemMap[smearId].timesUsed).toBe(2)
					expect(itemMap[bagelId].timesUsed).toBe(2)
					expect(itemMap[beverageId].timesUsed).toBe(2)
				})
		})

		it('should return the analytics only in the time range if the time range is given (inclusive)', async () => {
			return request(app)
				.get(`/analytics?startDate=100&endDate=100`)
				.set('Cookie', managerCookies)
				.expect(200)
				.then((response) => {
					const { orders, totalPrice } = response.body.data
					expect(orders.length).toBe(1)
					expect(totalPrice).toBe(2)
				})
		})
	})
})
