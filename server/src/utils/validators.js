// regular expression to check email form (see: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
const EMAIL_VALIDATION_REGULAR_EXPRESSION = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// regular express to check that password is strong (see: https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/)
const STRONG_PASSWORD_VALIDATION_REGULAR_EXPRESSION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/

type Validator = (element: any) => boolean

/**
 * isEmail - check if element is in a string in valid email form
 *
 * @param  {any} element - the element to check
 * @returns boolean - true if the element is a string in email form, false otherwise
 */
export function isEmail(element: any): boolean {
	return isString(element) && EMAIL_VALIDATION_REGULAR_EXPRESSION.test(element)
}

/**
 * isStrongPassword - check if element is in a string and is a strong password
 *
 * @param  {any} element - the element to check
 * @returns boolean - true if the element is a string and is a strong password, false otherwise
 */
export function isStrongPassword(element: any): boolean {
	return (
		isString(element) &&
		STRONG_PASSWORD_VALIDATION_REGULAR_EXPRESSION.test(element)
	)
}

/**
 * isString - check if the element is a string
 *
 * @param  {any} element - the element to check
 * @returns boolean - true if the element is a string, false otherwise
 */
export function isString(element: any): boolean %checks {
	return typeof element === 'string'
}

/**
 * isUndefined - check if the element is undefined
 *
 * @param  {any} element - the element to check
 * @returns boolean - true if the element is undefined, false otherwise
 */
export function isUndefined(element: any): boolean %checks {
	return element === undefined
}

/**
 * isNull - check if the element is null
 *
 * @param  {any} element - the element to check
 * @returns boolean - true if the element is null, false otherwise
 */
export function isNull(element: any): boolean %checks {
	return element === null
}

/**
 * isObject - check if an element is an object
 *
 * @param  {any} element - the element to check if it is an object
 * @returns boolean - true if the element is an object, false otherwise
 */
export function isObject(element: any): boolean %checks {
	return (
		typeof element === 'object' && element !== null && !Array.isArray(element)
	)
}

/**
 * isNumber - check if an element is a number type
 *
 * @param  {any} element - the element to check if it is a number type
 * @returns boolean - true if the element is a number type, false otherwise
 */
export function isNumber(element: any): boolean %checks {
	return typeof element === 'number'
}

/**
 * isObjectWith - check if an element is an object with the specified keys and values
 *
 * @param  {{ [key: string]: Validator }} template - the template to check the element against
 * @returns Validator - validates to true if element matches the template, false otherwise
 */
export function isObjectWith(template: {
	[key: string]: Validator,
}): Validator {
	return (element: any) => {
		return (
			isObject(element) &&
			Object.keys(template).every((key: string) => template[key](element[key]))
		)
	}
}

/**
 * and - check if the element satisfies all the supplied validators
 *
 * @param  {...validators: Validator[]} validators - the validators the element should satisfy
 * @returns Validator - validates to true if element satisfies all supplied validators, false otherwise
 */
export function and(...validators: Validator[]): Validator {
	return (element: any) => {
		return validators.every((validator) => validator(element))
	}
}

/**
 * or - check if the element satisfies any of the supplied validators
 *
 * @param  {...validators: Validator[]} validators - the validators the element should satisfy
 * @returns Validator - validates to true if element satisfies at least one of the supplied validators, false otherwise
 */
export function or(...validators: Validator[]): Validator {
	return (element: any) => {
		return validators.some((validator) => validator(element))
	}
}

/**
 * isInEnum - check if the element is in the enum
 *
 * @param  {(string | number)[]} Enum - the possible values for the element
 * @returns Validator - validates to true if element is in the enum, false otherwise
 */
export function isInEnum(Enum: (string | number)[]): Validator {
	const set = new Set(Enum)
	return (element: any) => {
		return set.has(element)
	}
}

/**
 * isArray - check if the element is an array
 *
 * @param  {any} element - the element to check if it is an array
 * @returns boolean - true if the element is an array, false otherwise
 */
export function isArray(element: any): boolean %checks {
	return Array.isArray(element)
}

/**
 * isArrayOfType - check if every value in element satisfies the validator
 *
 * @param  {Validator} validator - the validator the values in the element array should satisfy
 * @returns Validator - validates to true if all values in element satisfies the validator, false otherwise
 */
export function isArrayOf(validator: Validator): Validator {
	return (element: any) => {
		return isArray(element) && element.every(validator)
	}
}
