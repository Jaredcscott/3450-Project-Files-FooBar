import app from '../../App'
import request from 'supertest'

describe('Test Route', () => {
	it('should return a json object with key "hello" and attribute "world"', () => {
		return request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body.hello).toBe('world')
			})
	})
})
