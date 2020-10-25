import app from '../../App'
import request from 'supertest'
import * as validate from '../../utils/validators'
import { INVENTORY_ITEM_CATEGORIES_ENUM } from '../../utils/constants'
describe('menu', () => {
	describe('/menu GET', () => {
		it('should return a menu', () => {
			return request(app)
				.get('/menu')
				.expect(200)
				.then(async (response) => {
					const menuValidatorTemplate = {}
					INVENTORY_ITEM_CATEGORIES_ENUM.forEach(
						(category) => (menuValidatorTemplate[category] = validate.isArray)
					)
					expect(
						validate.isObjectWith(menuValidatorTemplate)(response.body.data)
					).toBe(true)
				})
		})
	})
})
