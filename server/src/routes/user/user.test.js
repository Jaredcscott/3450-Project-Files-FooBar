import app from '../../App'
import request from 'supertest'
import config from '../../config'
import * as validate from '../../utils/validators'
import { UserModel } from '../../models/accounts'
import { ROLES } from '../../utils/constants'

describe('Auth Route', () => {
	beforeAll(() => {
		// add test account
		return request(app).post('/auth/register').send({
			email: 'userTest@test.com',
			name: 'userTest',
			password: 'testAccount2',
			verifyPassword: 'testAccount2',
		})
	})
	describe('/user GET', () => {
		it('should send the user currently signed in (if signed in)', () => {
			return request(app)
				.post('/auth/login')
				.send({
					email: 'userTest@test.com',
					password: 'testAccount2',
				})
				.then((response) => {
					const cookies = response.headers['set-cookie']
					return request(app)
						.get('/user')
						.set('Cookie', cookies)
						.expect(200)
						.then((response) => {
							const user = response.body.data
							expect(
								validate.isObjectWith({
									name: validate.isString,
									roles: validate.isArray,
									email: validate.isEmail,
								})(user)
							).toBe(true)
							expect(user.name).toBe('userTest')
							expect(user.email).toBe('usertest@test.com')
						})
				})
		})

		it('should send null if not currently signed in', () => {
			return request(app)
				.get('/user')
				.expect(200)
				.then((response) => {
					expect(response.body.data).toBe(null)
				})
		})
	})

	describe('/user POST', () => {
		let cookies = []

		beforeAll(() => {
			// add test account
			return request(app)
				.post('/auth/login')
				.send({
					email: 'userTest@test.com',
					name: 'userTest',
					password: 'testAccount2',
					verifyPassword: 'testAccount2',
				})
				.then((response) => {
					cookies = response.headers['set-cookie']
				})
		})

		it('should not allow this routes to those not signed in', () => {
			return request(app).post('/user').expect(401)
		})

		it('should change name if name is sent', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({ name: 'hello' })
				.expect(200)
				.then(() => {
					return request(app)
						.get('/user')
						.set('Cookie', cookies)
						.expect(200)
						.then((response) => {
							const user = response.body.data
							expect(user.name).toBe('hello')
						})
				})
		})

		it('should change password if currentPassword, newPassword, verifyNewPassword is sent', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({
					currentPassword: 'testAccount2',
					newPassword: 'newPassword2',
					verifyNewPassword: 'newPassword2',
				})
				.expect(200)
				.then(() => {
					return request(app)
						.post('/auth/login')
						.send({
							email: 'userTest@test.com',
							password: 'newPassword2',
						})
						.expect(302)
				})
		})

		it('should not change password if currentPassword is incorrect [INCORRECT_PASSWORD]', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({
					currentPassword: 'Account2',
					newPassword: 'Password2',
					verifyNewPassword: 'Password2',
				})
				.expect(409)
				.then((res) => {
					expect(res.body.code).toBe('INCORRECT_PASSWORD')
					return request(app)
						.post('/auth/login')
						.send({
							email: 'userTest@test.com',
							password: 'newPassword2',
						})
						.expect(302)
				})
		})

		it('should not change password if newPassword is not strong [WEAK_PASSWORD]', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({
					currentPassword: 'newPassword2',
					newPassword: 'password3',
					verifyNewPassword: 'password2',
				})
				.expect(409)
				.then((res) => {
					expect(res.body.code).toBe('WEAK_PASSWORD')
					return request(app)
						.post('/auth/login')
						.send({
							email: 'userTest@test.com',
							password: 'newPassword2',
						})
						.expect(302)
				})
		})

		it('should not change password if newPassword or verifyNewPassword is not sent [NO_NEW_PASSWORD]', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({
					currentPassword: 'newPassword2',
				})
				.expect(409)
				.then((res) => {
					expect(res.body.code).toBe('NO_NEW_PASSWORD')
					return request(app)
						.post('/auth/login')
						.send({
							email: 'userTest@test.com',
							password: 'newPassword2',
						})
						.expect(302)
				})
		})

		it('should not change password if newPassword and verifyNewPassword do not match [PASSWORD_MISMATCH]', () => {
			return request(app)
				.post('/user')
				.set('Cookie', cookies)
				.send({
					currentPassword: 'newPassword2',
					newPassword: 'Password3',
					verifyNewPassword: 'Password4',
				})
				.expect(409)
				.then((res) => {
					expect(res.body.code).toBe('PASSWORD_MISMATCH')
					return request(app)
						.post('/auth/login')
						.send({
							email: 'userTest@test.com',
							password: 'newPassword2',
						})
						.expect(302)
				})
		})
	})

	describe('/user/all GET', () => {
		let customerCookies = []
		let managerCookie = []

		beforeAll(() => {
			// add test account
			return Promise.all([
				request(app)
					.post('/auth/register')
					.send({
						email: 'customer@customer.com',
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
						email: 'admin1@admin.com',
						name: 'admin',
						password: 'HelloWorld123',
						verifyPassword: 'HelloWorld123',
					})
					.then(async (response) => {
						managerCookie = response.headers['set-cookie']
						const user = await UserModel.findOne({ email: 'admin1@admin.com' })
						user.roles.push(ROLES.MANAGER)
						return user.save()
					}),
			])
		})
		it('should not allow this routes to those not signed in', () => {
			return request(app).get('/user/all').expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER roles', () => {
			return request(app)
				.get('/user/all')
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should send a list of users if ADMIN or MANAGER', () => {
			return request(app)
				.get('/user/all')
				.set('Cookie', managerCookie)
				.expect(200)
				.expect((res) => expect(validate.isArray(res.body.data)).toBe(true))
		})
	})

	describe('/user/:id GET', () => {
		let customerCookies = []
		let managerCookie = []
		let customerId = ''

		beforeAll(() => {
			// add test account
			return Promise.all([
				request(app)
					.post('/auth/register')
					.send({
						email: 'customer2@customer.com',
						name: 'customer',
						password: 'HelloWorld123',
						verifyPassword: 'HelloWorld123',
					})
					.then(async (response) => {
						customerCookies = response.headers['set-cookie']
						return request(app)
							.get('/user')
							.set('Cookie', customerCookies)
							.then(async (response) => {
								customerId = response.body.data._id
							})
					}),

				request(app)
					.post('/auth/register')
					.send({
						email: 'admin2@admin.com',
						name: 'admin',
						password: 'HelloWorld123',
						verifyPassword: 'HelloWorld123',
					})
					.then(async (response) => {
						managerCookie = response.headers['set-cookie']
						const user = await UserModel.findOne({ email: 'admin2@admin.com' })
						user.roles.push(ROLES.MANAGER)
						await user.save()
					}),
			])
		})
		it('should not allow this routes to those not signed in', () => {
			return request(app).get(`/user/${customerId}`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER roles', () => {
			return request(app)
				.get(`/user/${customerId}`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should send a the user if ADMIN or MANAGER', () => {
			return request(app)
				.get(`/user/${customerId}`)
				.set('Cookie', managerCookie)
				.expect(200)
				.expect((res) => expect(validate.isObject(res.body.data)).toBe(true))
		})

		it('should send 400 the if the id is invalid', () => {
			return request(app)
				.get(`/user/thisUserDoesNotExist`)
				.set('Cookie', managerCookie)
				.expect(400)
		})

		it('should send 404 the if the user does not exist', () => {
			return request(app)
				.get(`/user/111111111111111111111111`)
				.set('Cookie', managerCookie)
				.expect(404)
		})
	})

	describe('/user/:id POST', () => {
		let customerCookies = []
		let managerCookie = []
		let customerId = ''

		beforeAll(() => {
			// add test account
			return Promise.all([
				request(app)
					.post('/auth/register')
					.send({
						email: 'customer3@customer.com',
						name: 'customer',
						password: 'HelloWorld123',
						verifyPassword: 'HelloWorld123',
					})
					.then(async (response) => {
						customerCookies = response.headers['set-cookie']
						return request(app)
							.get('/user')
							.set('Cookie', customerCookies)
							.then(async (response) => {
								customerId = response.body.data._id
							})
					}),

				request(app)
					.post('/auth/register')
					.send({
						email: 'admin3@admin.com',
						name: 'admin',
						password: 'HelloWorld123',
						verifyPassword: 'HelloWorld123',
					})
					.then(async (response) => {
						managerCookie = response.headers['set-cookie']
						const user = await UserModel.findOne({ email: 'admin3@admin.com' })
						user.roles.push(ROLES.MANAGER)
						await user.save()
					}),
			])
		})
		it('should not allow this routes to those not signed in', () => {
			return request(app).post(`/user/${customerId}`).expect(401)
		})

		it('should not allow this routes to those without ADMIN or MANAGER roles', () => {
			return request(app)
				.post(`/user/${customerId}`)
				.set('Cookie', customerCookies)
				.expect(403)
		})

		it('should send a the user if ADMIN or MANAGER', async () => {
			return request(app)
				.post(`/user/${customerId}`)
				.send({ roles: [ROLES.CHEF] })
				.set('Cookie', managerCookie)
				.expect(200)
				.expect(async () => {
					const user = await UserModel.findOne({ _id: customerId }).lean()
					expect(user.roles[0] === ROLES.CHEF && user.roles.length === 1).toBe(
						true
					)
				})
		})

		it('should send 400 the if the id is invalid', () => {
			return request(app)
				.get(`/user/thisUserDoesNotExist`)
				.set('Cookie', managerCookie)
				.expect(400)
		})

		it('should send 400 the roles is invalid', () => {
			return request(app)
				.post(`/user/${customerId}`)
				.send({ roles: ['HELLO'] })
				.set('Cookie', managerCookie)
				.expect(400)
		})

		it('should send 404 the if the user does not exist', () => {
			return request(app)
				.get(`/user/111111111111111111111111`)
				.set('Cookie', managerCookie)
				.expect(404)
		})
	})
})
