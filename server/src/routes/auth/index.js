// @flow
import { Router } from 'express'
import passport from 'passport'
import type { BaseRequest } from '../../utils/types'
import { UserModel, doesUserWithEmailExist } from '../../models/accounts'
import * as validate from '../../utils/validators'
import { ROLES } from '../../utils/constants'

const router = new Router()

const REGISTER_BODY_VALIDATOR = validate.isObjectWith({
	email: validate.isString,
	name: validate.isString,
	password: validate.isString,
	verifyPassword: validate.isString,
})

router.post(
	'/register',
	async (
		req: BaseRequest<{
			email: string,
			name: string,
			password: string,
			verifyPassword: string,
		}>,
		res: express$Response
	) => {
		if (!REGISTER_BODY_VALIDATOR(req.body)) {
			return res.status(400).json({ reason: 'malformed request' })
		}
		const { email, name, password, verifyPassword } = req.body
		if (!validate.isEmail(email)) {
			return res.status(409).json({
				reason: 'email is not in valid form',
				code: 'BAD_EMAIL',
			})
		}
		if (!validate.isStrongPassword(password)) {
			return res.status(409).json({
				reason:
					'password is not strong enough, password must contain at least on upper case letter, one lower case letter, and one number, and must be between 8 and 32 digits long',
				code: 'WEAK_PASSWORD',
			})
		}
		if (password !== verifyPassword) {
			return res.status(409).json({
				reason: 'password and verify password must match',
				code: 'PASSWORD_MISMATCH',
			})
		}
		if (await doesUserWithEmailExist(email)) {
			return res.status(409).json({
				reason: 'a user with that email is already taken',
				code: 'EMAIL_TAKEN',
			})
		}
		UserModel.register(
			new UserModel({
				email: email,
				name: name,
				roles: [ROLES.CUSTOMER],
			}),
			password,
			(err) => {
				if (err) {
					console.error(err)
					res.status(500).json({ error: 'Internal Server Error (check logs)' })
					return
				}
				passport.authenticate('local')(req, res, function () {
					res.redirect('/')
				})
			}
		)
	}
)

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('/')
})

router.get('/logout', function (req, res) {
	req.logout()
	res.redirect('/')
})

export default router
