import app from '../../App'
import request from 'supertest'
import config from '../../config'

describe('Auth Route', () => {
	beforeAll(() => {
		// add test account
		return request(app).post('/auth/register').send({
			email: 'test@test.com',
			name: 'test',
			password: 'testAccount1',
			verifyPassword: 'testAccount1',
		})
	})
	describe('/register', () => {
		it('should set a session cookie and redirect if no errors occur', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'hello@world.com',
					name: 'me',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.expect(302)
				.then((response) => {
					expect(
						response.headers['set-cookie'].some((cookie) =>
							cookie.startsWith(config.cookieSessionKey)
						)
					).toBe(true)
				})
		})

		it('should send 400 for a bad request', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'hello@world.com',
					name: 'me',
					password: 'HelloWorld123',
				})
				.expect(400)
		})

		it('should send 409 with code BAD_EMAIL for bad email address', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'hello@com',
					name: 'me',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.expect(409)
				.then((response) => {
					expect(response.body.code).toBe('BAD_EMAIL')
				})
		})

		it('should send 409 with code WEAK_PASSWORD for a week password', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'hello@gmail.com',
					name: 'me',
					password: 'HelloWorld',
					verifyPassword: 'HelloWorld',
				})
				.expect(409)
				.then((response) => {
					expect(response.body.code).toBe('WEAK_PASSWORD')
				})
		})

		it('should send 409 with code PASSWORD_MISMATCH if password and verifyPassword do not match', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'hello@gmail.com',
					name: 'me',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld1234',
				})
				.expect(409)
				.then((response) => {
					expect(response.body.code).toBe('PASSWORD_MISMATCH')
				})
		})

		it('should send 409 with code EMAIL_TAKEN if a user already exists with the email', () => {
			return request(app)
				.post('/auth/register')
				.send({
					email: 'helloWorld@world.com',
					name: 'me',
					password: 'HelloWorld123',
					verifyPassword: 'HelloWorld123',
				})
				.expect(302)
				.then(() => {
					return request(app)
						.post('/auth/register')
						.send({
							email: 'helloWorld@world.com',
							name: 'me',
							password: 'HelloWorld123',
							verifyPassword: 'HelloWorld123',
						})
						.expect(409)
						.then((response) => {
							expect(response.body.code).toBe('EMAIL_TAKEN')
						})
				})
		})
	})

	describe('/login', () => {
		it('Should login with the correct credentials', () => {
			return request(app)
				.post('/auth/login')
				.send({
					email: 'test@test.com',
					password: 'testAccount1',
				})
				.expect(302)
				.then((response) => {
					expect(
						response.headers['set-cookie'].some((cookie) =>
							cookie.startsWith(config.cookieSessionKey)
						)
					).toBe(true)
				})
		})

		it('Should not login with incorrect password', () => {
			return request(app)
				.post('/auth/login')
				.send({
					email: 'test@test.com',
					password: 'testAccountBad',
				})
				.expect(401)
		})

		it('Should not login with incorrect email', () => {
			return request(app)
				.post('/auth/login')
				.send({
					email: 'testBad@test.com',
					password: 'testAccount1',
				})
				.expect(401)
		})
	})

	describe('/logout', () => {
		it('Should login with the correct credentials', () => {
			return request(app).get('/auth/logout').expect(302)
		})
	})
})
