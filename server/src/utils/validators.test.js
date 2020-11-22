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

	describe('isUndefined', () => {
		it('should return true if element is undefined', () => {
			expect(validate.isUndefined(undefined)).toBe(true)
		})

		it('should return false if element is not undefined', () => {
			expect(validate.isUndefined(null)).toBe(false)
			expect(validate.isUndefined('')).toBe(false)
			expect(validate.isUndefined({})).toBe(false)
			expect(validate.isUndefined([])).toBe(false)
		})
	})

	describe('isNull', () => {
		it('should return true if element is null', () => {
			expect(validate.isNull(null)).toBe(true)
		})

		it('should return false if element is not null', () => {
			expect(validate.isNull(undefined)).toBe(false)
			expect(validate.isNull('')).toBe(false)
			expect(validate.isNull({})).toBe(false)
			expect(validate.isNull([])).toBe(false)
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

	describe('isNoneEmptyString', () => {
		it('should return true if element is string a string and is not empty', () => {
			expect(validate.isNoneEmptyString('hello@gmail.com')).toBe(true)
			expect(validate.isNoneEmptyString('123')).toBe(true)
		})

		it('should return false if element is not string or not is empty', () => {
			expect(validate.isNoneEmptyString(null)).toBe(false)
			expect(validate.isNoneEmptyString(undefined)).toBe(false)
			expect(validate.isNoneEmptyString({})).toBe(false)
			expect(validate.isNoneEmptyString([])).toBe(false)
			expect(validate.isNoneEmptyString('')).toBe(false)
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
			expect(validate.isNumber(null)).toBe(false)
			expect(validate.isNumber(undefined)).toBe(false)
			expect(validate.isNumber({})).toBe(false)
			expect(validate.isNumber([])).toBe(false)
			expect(validate.isNumber('123')).toBe(false)
		})
	})

	describe('isNumeric', () => {
		it('should return true if element is number or can be converted to a number type', () => {
			expect(validate.isNumeric(1)).toBe(true)
			expect(validate.isNumeric(0)).toBe(true)
			expect(validate.isNumeric(-1)).toBe(true)
			expect(validate.isNumeric('123')).toBe(true)
		})

		it('should return false if element is not a number or can not be converted into a number type', () => {
			expect(validate.isNumeric(undefined)).toBe(false)
			expect(validate.isNumeric({})).toBe(false)
			expect(validate.isNumeric([])).toBe(false)
			expect(validate.isNumeric('123ee2')).toBe(false)
			expect(validate.isNumeric('')).toBe(false)
			expect(validate.isNumeric(null)).toBe(false)
		})
	})

	describe('isBoolean', () => {
		it('should return true if element is a boolean type', () => {
			expect(validate.isBoolean(true)).toBe(true)
			expect(validate.isBoolean(false)).toBe(true)
		})

		it('should return false if element is not string or not a number type', () => {
			expect(validate.isBoolean(null)).toBe(false)
			expect(validate.isBoolean(undefined)).toBe(false)
			expect(validate.isBoolean({})).toBe(false)
			expect(validate.isBoolean([])).toBe(false)
			expect(validate.isBoolean('123')).toBe(false)
			expect(validate.isBoolean(1)).toBe(false)
		})
	})

	describe('isGreaterOrEqualTo', () => {
		it('should return true if element is greater than or equal to the amount', () => {
			expect(validate.isGreaterOrEqualTo(1)(2)).toBe(true)
			expect(validate.isGreaterOrEqualTo(-1)(0)).toBe(true)
		})

		it('should return false if element is less than the amount', () => {
			expect(validate.isGreaterOrEqualTo(0)(null)).toBe(false)
			expect(validate.isGreaterOrEqualTo(0)(undefined)).toBe(false)
			expect(validate.isGreaterOrEqualTo(0)({})).toBe(false)
			expect(validate.isGreaterOrEqualTo(0)([])).toBe(false)
			expect(validate.isGreaterOrEqualTo(0)('123')).toBe(false)
			expect(validate.isGreaterOrEqualTo(0)(-0.001)).toBe(false)
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

	describe('isObjectOf', () => {
		it('should return true if element is an object that satisfies the validators', () => {
			expect(validate.isObjectOf({})({})).toBe(true)
			expect(
				validate.isObjectOf({
					hello: validate.isString,
					world: validate.isString,
				})({
					hello: 'world',
					world: 'are',
				})
			).toBe(true)
		})

		it('should return false if element is not an object or the validators fail', () => {
			expect(validate.isObjectOf({})(null)).toBe(false)
			expect(validate.isObjectOf({})(undefined)).toBe(false)
			expect(validate.isObjectOf({})([])).toBe(false)
			expect(validate.isObjectOf({})('helloWorld!')).toBe(false)
			expect(
				validate.isObjectOf({
					hello: validate.isString,
					how: validate.isString,
				})({ hello: 'world', how: 'am', I: 'hello' })
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
