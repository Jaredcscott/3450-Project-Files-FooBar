import * as validate from './validators'

describe('Validators', () => {
	describe('isString', () => {
		it('should return true if element is string', () => {
			expect(validate.isString('hello World')).toBe(true)
			expect(validate.isString('')).toBe(true)
			expect(validate.isString('123')).toBe(true)
		})

		it('should return false if element is not string', () => {
			expect(validate.isString(null)).toBe(false)
			expect(validate.isString(undefined)).toBe(false)
			expect(validate.isString({})).toBe(false)
			expect(validate.isString([])).toBe(false)
		})
	})

	describe('isEmail', () => {
		it('should return true if element is string a string and in email form', () => {
			expect(validate.isEmail('hello@gmail.com')).toBe(true)
			expect(validate.isEmail('hello.world@hotmail.com')).toBe(true)
			expect(validate.isEmail('justAlot89382394899ofnumbers@numbers.com')).toBe(
				true
			)
		})

		it('should return false if element is not string or not in email form', () => {
			expect(validate.isEmail(null)).toBe(false)
			expect(validate.isEmail(undefined)).toBe(false)
			expect(validate.isEmail({})).toBe(false)
			expect(validate.isEmail([])).toBe(false)
			expect(validate.isEmail('@gmail.com')).toBe(false)
			expect(validate.isEmail('hello@com')).toBe(false)
			expect(validate.isEmail('helloWorld!')).toBe(false)
		})
	})

	describe('isStrongPassword', () => {
		it('should return true if element is a string with at least one numeric digit, one lower case letter, one upper case letter, and between 8 and 32 characters', () => {
			expect(validate.isStrongPassword('hEllo93820')).toBe(true)
		})

		it('should return false if element is not string or not in email form', () => {
			expect(validate.isStrongPassword(null)).toBe(false)
			expect(validate.isStrongPassword(undefined)).toBe(false)
			expect(validate.isStrongPassword({})).toBe(false)
			expect(validate.isStrongPassword([])).toBe(false)
			expect(validate.isStrongPassword('hello')).toBe(false)
			expect(validate.isStrongPassword('hE9')).toBe(false)
			expect(validate.isStrongPassword('helloWorld')).toBe(false)
			expect(validate.isStrongPassword('hello83923')).toBe(false)
		})
	})

	describe('isArray', () => {
		it('should return true if element is an array', () => {
			expect(validate.isArray([])).toBe(true)
			expect(validate.isArray(['hello', 'world', 2])).toBe(true)
		})

		it('should return false if element is not string or not in email form', () => {
			expect(validate.isArray(null)).toBe(false)
			expect(validate.isArray(undefined)).toBe(false)
			expect(validate.isArray({})).toBe(false)
		})
	})

	describe('isNumber', () => {
		it('should return true if element is a number type', () => {
			expect(validate.isNumber(1)).toBe(true)
			expect(validate.isNumber(0)).toBe(true)
			expect(validate.isNumber(-1)).toBe(true)
		})

		it('should return false if element is not string or not a number type', () => {
			expect(validate.isEmail(null)).toBe(false)
			expect(validate.isEmail(undefined)).toBe(false)
			expect(validate.isEmail({})).toBe(false)
			expect(validate.isEmail([])).toBe(false)
			expect(validate.isEmail('123')).toBe(false)
		})
	})

	describe('isObject', () => {
		it('should return true if element is an object', () => {
			expect(validate.isObject({})).toBe(true)
		})

		it('should return false if element is not an object', () => {
			expect(validate.isObject(null)).toBe(false)
			expect(validate.isObject(undefined)).toBe(false)
			expect(validate.isObject([])).toBe(false)
			expect(validate.isObject('helloWorld!')).toBe(false)
		})
	})

	describe('isObjectWith', () => {
		it('should return true if element is an object that satisfies the validators', () => {
			expect(validate.isObjectWith({})({})).toBe(true)
			expect(
				validate.isObjectWith({ hello: validate.isString })({
					hello: 'world',
					how: 'are',
				})
			).toBe(true)
		})

		it('should return false if element is not an object or the validators fail', () => {
			expect(validate.isObjectWith({})(null)).toBe(false)
			expect(validate.isObjectWith({})(undefined)).toBe(false)
			expect(validate.isObjectWith({})([])).toBe(false)
			expect(validate.isObjectWith({})('helloWorld!')).toBe(false)
			expect(
				validate.isObjectWith({
					hello: validate.isString,
					how: validate.isString,
				})({ hello: 'world', I: 'am' })
			).toBe(false)
		})
	})

	describe('or', () => {
		it('should return true if the element satisfies any of the validators', () => {
			expect(validate.or(validate.isString, validate.isObject)('hello')).toBe(
				true
			)
			expect(validate.or(validate.isString, validate.isObject)({})).toBe(true)
		})

		it('should return false if the element fails to satisfy any of the validators', () => {
			expect(validate.or(validate.isString, validate.isObject)(null)).toBe(
				false
			)
			expect(validate.or(validate.isString, validate.isObject)(undefined)).toBe(
				false
			)
			expect(validate.or(validate.isString, validate.isObject)([])).toBe(false)
		})
	})

	describe('and', () => {
		it('should return true if the element satisfies all of the validators', () => {
			expect(
				validate.and(
					validate.isString,
					validate.isEmail,
					validate.isInEnum(['hello', 'world', 'hello@world.com'])
				)('hello@world.com')
			).toBe(true)
		})

		it('should return false if the element fails to satisfy any of the validators', () => {
			expect(
				validate.and(
					validate.isString,
					validate.isEmail,
					validate.isInEnum([1, 'hello', 'world', 'hello@world.com'])
				)(1)
			).toBe(false)
			expect(
				validate.and(
					validate.isString,
					validate.isEmail,
					validate.isInEnum([1, 'hello', 'world', 'hello@world.com'])
				)('hello')
			).toBe(false)
			expect(
				validate.and(
					validate.isString,
					validate.isEmail,
					validate.isInEnum([1, 'hello', 'world', 'hello@world.com'])
				)('hello@gmail.com')
			).toBe(false)
		})
	})

	describe('isArrayOf', () => {
		it('should return true if all elements in array satisfy the validator', () => {
			expect(validate.isArrayOf(validate.isString)(['hello', 'world'])).toBe(
				true
			)
			expect(
				validate.isArrayOf(
					validate.or(
						validate.isString,
						validate.isObjectWith({ hello: validate.isString })
					)
				)(['hello', { hello: 'world', this: 'is' }])
			).toBe(true)
		})

		it('should return false if the element fails to satisfy any of the validators', () => {
			expect(validate.isArrayOf(validate.isString)(['hello', 2, 'world'])).toBe(
				false
			)
			expect(
				validate.isArrayOf(
					validate.or(
						validate.isString,
						validate.isObjectWith({ hello: validate.isString })
					)
				)(['hello', { hi: 'world', this: 'is' }])
			).toBe(false)
		})
	})
})
