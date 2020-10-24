import app from '../../App'
import request from 'supertest'
import * as validate from '../../utils/validators'
import { ROLES, INVENTORY_ITEM_CATEGORIES } from '../../utils/constants'
import { UserModel } from '../../models/accounts'
import { Item } from '../../models/inventoryItem'

describe('inventory', () => {
	let chefCookies = []
	let customerCookies = []
	let managerCookies = []
	let adminCookies = []

	beforeAll(() => {
		// add test accounts
		return Promise.all([
			request(app)
				.post('/auth/register')
				.send({
					email: 'customerInventory@customer.com',
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
					email: 'adminInventory@admin.com',
					name: 'admin',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					adminCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'adminInventory@admin.com',
					})
					user.roles.push(ROLES.ADMIN)
					return user.save()
				}),

			request(app)
				.post('/auth/register')
				.send({
					email: 'managerInventory@admin.com',
					name: 'admin',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					managerCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'managerInventory@admin.com',
					})
					user.roles.push(ROLES.MANAGER)
					return user.save()
				}),

			request(app)
				.post('/auth/register')
				.send({
					email: 'chefInventory@admin.com',
					name: 'chef',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.then(async (response) => {
					chefCookies = response.headers['set-cookie']
					const user = await UserModel.findOne({
						email: 'chefInventory@admin.com',
					})
					user.roles.push(ROLES.CHEF)
					return user.save()
				}),
		])
	})

	describe('/inventory GET', () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/inventory`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER or CHEF roles', () => {
			return request(app)
				.get(`/inventory`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should send the inventory items if the user has the role user CHEF or ADMIN or MANAGER', async () => {
			return Promise.all([
				request(app)
					.get(`/inventory`)
					.set('Cookie', chefCookies)
					.expect(200)
					.expect((res) => {
						expect(validate.isArray(res.body.data)).toBe(true)
					}),
				request(app)
					.get(`/inventory`)
					.set('Cookie', managerCookies)
					.expect(200)
					.expect((res) => {
						expect(validate.isArray(res.body.data)).toBe(true)
					}),
				request(app)
					.get(`/inventory`)
					.set('Cookie', adminCookies)
					.expect(200)
					.expect((res) => {
						expect(validate.isArray(res.body.data)).toBe(true)
					}),
			])
		})
	})

	describe(`/inventory POST`, () => {
		it('should not allow this routes to those not signed in', () => {
			return request(app).post(`/inventory`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER roles', () => {
			return Promise.all([
				request(app)
					.post(`/inventory`)
					.set('Cookie', customerCookies)
					.expect(403),

				request(app).post(`/inventory`).set('Cookie', chefCookies).expect(403),
			])
		})

		it('should send a 400 if the request is invalid', () => {
			return request(app)
				.post(`/inventory`)
				.set('Cookie', managerCookies)
				.send({
					category: 'INVALID',
					name: 'hello',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.expect(400)
		})

		it('should create an item if the request is valid and the user role is ADMIN or MANAGER', () => {
			return request(app)
				.post(`/inventory`)
				.set('Cookie', managerCookies)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BAGEL,
					name: 'hello',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.expect(200)
				.then(async (res) => {
					const item = await Item.findOne({ _id: res.body.data._id }).lean()
					expect(item.category).toBe(INVENTORY_ITEM_CATEGORIES.BAGEL)
					expect(item.name).toBe('hello')
					expect(item.quantity).toBe(2)
					expect(item.price).toBe(1)
					expect(item.onMenu).toBe(false)
				})
		})
	})

	describe('/inventory/:id GET', () => {
		let itemId = ''

		beforeAll(() => {
			return request(app)
				.post(`/inventory`)
				.set('Cookie', managerCookies)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BAGEL,
					name: 'sesame',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.expect(200)
				.then(async (res) => {
					itemId = res.body.data._id
				})
		})

		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/inventory/${itemId}`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER or CHEF roles', () => {
			return request(app)
				.get(`/inventory/${itemId}`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should return 400 if the id is malformed', () => {
			return request(app)
				.get(`/inventory/10001`)
				.set('Cookie', managerCookies)
				.expect(400)
		})

		it('should return 404 if an item does not exist with the id', () => {
			return request(app)
				.get(`/inventory/111111111111111111111111`)
				.set('Cookie', managerCookies)
				.expect(404)
		})

		it('should the item if it exists and it is requested by a user with ADMIN, MANAGER, or CHEF roles', () => {
			return request(app)
				.get(`/inventory/${itemId}`)
				.set('Cookie', managerCookies)
				.expect(200)
				.then((res) => expect(res.body.data._id).toBe(itemId))
		})
	})

	describe('/inventory/:id POST', () => {
		let itemId = ''

		beforeAll(() => {
			return request(app)
				.post(`/inventory`)
				.set('Cookie', managerCookies)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BAGEL,
					name: 'tomato',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.expect(200)
				.then(async (res) => {
					itemId = res.body.data._id
				})
		})

		it('should not allow this routes to those not signed in', () => {
			return request(app).post(`/inventory/${itemId}`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER or CHEF roles', () => {
			return request(app)
				.post(`/inventory/${itemId}`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should return 400 if the id is malformed', () => {
			return request(app)
				.post(`/inventory/10001`)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BAGEL,
					name: 'tomato',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.set('Cookie', managerCookies)
				.expect(400)
		})

		it('should return 404 if an item does not exist with the id', () => {
			return request(app)
				.post(`/inventory/111111111111111111111111`)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BAGEL,
					name: 'tomato',
					quantity: 2,
					price: 1,
					onMenu: false,
				})
				.set('Cookie', managerCookies)
				.expect(404)
		})

		it('should update only the item quantity if updated by the chef', () => {
			return request(app)
				.post(`/inventory/${itemId}`)
				.set('Cookie', chefCookies)
				.send({
					category: INVENTORY_ITEM_CATEGORIES.BEVERAGE,
					name: 'juice',
					quantity: 0,
					price: 20,
					onMenu: true,
				})
				.expect(200)
				.then((res) => {
					const { category, name, quantity, price, onMenu } = res.body.data
					expect(category).toBe(INVENTORY_ITEM_CATEGORIES.BAGEL)
					expect(name).toBe('tomato')
					expect(quantity).toBe(0)
					expect(price).toBe(1)
					expect(onMenu).toBe(false)
				})
		})
	})
})
