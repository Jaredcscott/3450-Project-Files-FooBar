import app from '../../App'
import request from 'supertest'
import * as validate from '../../utils/validators'
import {
	INVENTORY_ITEM_CATEGORIES,
	ROLES,
	ORDER_STATUS,
} from '../../utils/constants'
import { Item } from '../../models/inventoryItem'
import { Order } from '../../models/order'
import { UserModel } from '../../models/accounts'

describe('Orders', () => {
	let customerCookies = []
	let cashierCookies = []
	let chefCookies = []
	let chefId = ''
	let beverageId = ''
	let bagelId = ''
	let smearId = ''

	beforeAll(async () => {
		// add test accounts
		await Promise.all([
			request(app)
				.post('/auth/register')
				.send({
					email: 'customerOrder@customer.com',
					name: 'customer',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					customerCookies = response.headers['set-cookie']
				}),

			request(app)
				.post('/auth/register')
				.send({
					email: 'chefOrder@admin.com',
					name: 'chef',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					chefCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'chefOrder@admin.com',
					})
					user.roles.push(ROLES.CHEF)
					chefId = String(user._id)
					return user.save()
				}),

			request(app)
				.post('/auth/register')
				.send({
					email: 'cashierOrder@cashier.com',
					name: 'Cashier',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					cashierCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'cashierOrder@cashier.com',
					})
					user.roles.push(ROLES.CASHIER)
					return user.save()
				}),
		])

		const bagel = new Item({
			category: INVENTORY_ITEM_CATEGORIES.BAGEL,
			name: 'plain',
			quantity: 100,
			price: 50,
			onMenu: true,
			targetCount: 100,
		})

		const smear = new Item({
			category: INVENTORY_ITEM_CATEGORIES.SMEAR,
			name: 'honey',
			quantity: 100,
			price: 29,
			onMenu: true,
			targetCount: 100,
		})

		const beverage = new Item({
			category: INVENTORY_ITEM_CATEGORIES.BEVERAGE,
			name: 'pineapple',
			quantity: 100,
			price: 18,
			onMenu: true,
			targetCount: 100,
		})

		await Promise.all([bagel.save(), smear.save(), beverage.save()])
		smearId = String(smear._id)
		bagelId = String(bagel._id)
		beverageId = String(beverage._id)
	})

	describe('/order GET', () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/order`).expect(401)
		})

		it('should return orders if request is valid', async () => {
			return request(app)
				.get(`/order`)
				.set('Cookie', customerCookies)
				.expect(200)
				.then((res) => expect(validate.isArray(res.body.data)).toBe(true))
		})
	})

	describe('/order POST', () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/order`).expect(401)
		})

		it('should return 400 if request is invalid', async () => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['111111111111111111111111'],
							hello: 'world',
						},
					],
					pickupAt: 100,
				})
				.expect(400)
		})

		it('should return 400 if id is invalid', async () => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['1111111111111111'],
						},
					],
					pickupAt: 100,
				})
				.expect(400)
		})

		it('should return 409 if item by id can not be found', async () => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['111111111111111111111111'],
						},
					],
					pickupAt: 100,
				})
				.expect(409)
		})

		it('should return 200 if order is placed', async () => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: [beverageId, beverageId],
					bagels: [
						{
							bagel: bagelId,
							toppings: [smearId],
						},
					],
					pickupAt: 100,
				})
				.expect(200)
				.then((res) => expect(res.body.data.price).toBe(115))
		})
	})

	describe('/order/price POST', () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/order/price`).expect(401)
		})

		it('should return 400 if request is invalid', async () => {
			return request(app)
				.post(`/order/price`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['111111111111111111111111'],
							hello: 'world',
						},
					],
					pickupAt: 100,
				})
				.expect(400)
		})

		it('should return 400 if id is invalid', async () => {
			return request(app)
				.post(`/order/price`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['1111111111111111'],
						},
					],
					pickupAt: 100,
				})
				.expect(400)
		})

		it('should return 409 if item by id can not be found', async () => {
			return request(app)
				.post(`/order/price`)
				.set('Cookie', customerCookies)
				.send({
					beverages: ['111111111111111111111111', '111111111111111111111111'],
					bagels: [
						{
							bagel: '111111111111111111111111',
							toppings: ['111111111111111111111111'],
						},
					],
					pickupAt: 100,
				})
				.expect(409)
		})

		it('should return 200 if can get price for order', async () => {
			return request(app)
				.post(`/order/price`)
				.set('Cookie', customerCookies)
				.send({
					beverages: [beverageId, beverageId],
					bagels: [
						{
							bagel: bagelId,
							toppings: [smearId],
						},
					],
					pickupAt: 100,
				})
				.expect(200)
				.then((res) => expect(res.body.data).toBe(115))
		})
	})

	describe('/order/:id GET', () => {
		let orderId = ''

		beforeAll(() => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: [beverageId, beverageId],
					bagels: [
						{
							bagel: bagelId,
							toppings: [smearId],
						},
					],
					pickupAt: 100,
				})
				.expect(200)
				.then((res) => (orderId = res.body.data._id))
		})
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/order/${orderId}`).expect(401)
		})

		it('should return 400 if id is invalid', () => {
			return request(app)
				.get(`/order/11111111111`)
				.set('Cookie', customerCookies)
				.expect(400)
		})

		it('should return 404 if order does not exist', () => {
			return request(app)
				.get(`/order/111111111111111111111111`)
				.set('Cookie', customerCookies)
				.expect(404)
		})

		it('should return orders if request is valid', async () => {
			return request(app)
				.get(`/order/${orderId}`)
				.set('Cookie', customerCookies)
				.expect(200)
				.then((res) => expect(validate.isObject(res.body.data)).toBe(true))
		})
	})

	describe('/order/:id POST', () => {
		let orderId = ''

		beforeAll(() => {
			return request(app)
				.post(`/order`)
				.set('Cookie', customerCookies)
				.send({
					beverages: [beverageId, beverageId],
					bagels: [
						{
							bagel: bagelId,
							toppings: [smearId],
						},
					],
					pickupAt: 100,
				})
				.expect(200)
				.then((res) => (orderId = res.body.data._id))
		})

		it('should return 400 if id is invalid', () => {
			return request(app)
				.post(`/order/11111111111`)
				.send({ status: ORDER_STATUS.CANCELED })
				.set('Cookie', customerCookies)
				.expect(400)
		})

		it('should return 404 if order does not exist', () => {
			return request(app)
				.post(`/order/111111111111111111111111`)
				.send({ status: ORDER_STATUS.CANCELED })
				.set('Cookie', customerCookies)
				.expect(404)
		})

		it('should return 409 [RESTRICTED_STATUS] if trying to set to a status not available to role', () => {
			return request(app)
				.post(`/order/${orderId}`)
				.send({ status: ORDER_STATUS.FULFILLED })
				.set('Cookie', chefCookies)
				.expect(409)
				.then((res) => expect(res.body.code).toBe('RESTRICTED_STATUS'))
		})

		it('should return 200 if successfully set order status', () => {
			return request(app)
				.post(`/order/${orderId}`)
				.send({ status: ORDER_STATUS.PREPARED })
				.set('Cookie', chefCookies)
				.expect(200)
		})
	})

	describe('/order/todo GET', () => {
		let preparingOrderId = ''
		let preparedOrderId = ''
		let placedOrderId = ''

		beforeAll(async () => {
			await Order.find().remove()
			const preparingOrder = new Order({
				beverages: [beverageId],
				bagels: [],
				price: 1,
				placed: Date.now(),
				pickupAt: 100,
				status: ORDER_STATUS.PREPARING,
				placedBy: chefId,
			})

			const preparedOrder = new Order({
				beverages: [beverageId],
				bagels: [],
				price: 1,
				placed: Date.now(),
				pickupAt: 100,
				status: ORDER_STATUS.PREPARED,
				placedBy: chefId,
			})

			const placedOrder = new Order({
				beverages: [beverageId],
				bagels: [],
				price: 1,
				placed: Date.now(),
				pickupAt: 100,
				status: ORDER_STATUS.PLACED,
				placedBy: chefId,
			})

			await Promise.all([
				preparedOrder.save(),
				preparingOrder.save(),
				placedOrder.save(),
			])

			preparedOrderId = String(preparedOrder._id)
			preparingOrderId = String(preparingOrder._id)

			return Promise.resolve()
		})

		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/order/todo`).expect(401)
		})

		it('should return 403 if user role is not able to access route', () => {
			return request(app)
				.get(`/order/todo`)
				.send({ status: ORDER_STATUS.FULFILLED })
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should return appropriate orders to CHEF', async () => {
			return request(app)
				.get(`/order/todo`)
				.set('Cookie', chefCookies)
				.expect(200)
				.then((res) => {
					expect(validate.isArray(res.body.data)).toBe(true)
					expect(res.body.data.length).toBe(1)
					expect(res.body.data[0]._id).toBe(preparingOrderId)
				})
		})

		it('should return appropriate orders to CASHIER', async () => {
			return request(app)
				.get(`/order/todo`)
				.set('Cookie', cashierCookies)
				.expect(200)
				.then((res) => {
					expect(validate.isArray(res.body.data)).toBe(true)
					expect(res.body.data.length).toBe(1)
					expect(res.body.data[0]._id).toBe(preparedOrderId)
				})
		})
	})
})
