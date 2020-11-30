// @flow
import { Router } from 'express'
import { verifiedUserSignedIn, verifyUserHasRole } from '../../middleware/auth'
import type {
	AuthenticatedUserRequest,
	MaybeUserRequest,
	Roles,
} from '../../utils/types'
import { UserModel } from '../../models/accounts'
import * as validate from '../../utils/validators'
import { ROLES, ROLES_ENUM } from '../../utils/constants'
import { Types as mongooseTypes } from 'mongoose'

const router = new Router()

const USER_SELF_UPDATE_VALIDATOR = validate.isObjectWith({
	name: validate.or(validate.isString, validate.isUndefined, validate.isNull),
	currentPassword: validate.or(
		validate.isString,
		validate.isUndefined,
		validate.isNull
	),
	newPassword: validate.or(
		validate.isString,
		validate.isUndefined,
		validate.isNull
	),
	verifyNewPassword: validate.or(
		validate.isString,
		validate.isUndefined,
		validate.isNull
	),
})

const USER_MANAGER_UPDATE_VALIDATOR = validate.isObjectWith({
	roles: validate.or(
		validate.isArrayOf(validate.isInEnum(ROLES_ENUM)),
		validate.isNull,
		validate.isUndefined
	),
	balance: validate.or(validate.isNumber, validate.isUndefined),
})

router.get('/', (req: MaybeUserRequest<>, res: express$Response) => {
	if (req.user) {
		return res.status(200).json({ data: req.user })
	}
	return res.status(200).json({ data: null })
})

router.post(
	'/',
	verifiedUserSignedIn,
	async (
		req: AuthenticatedUserRequest<{
			name?: ?string,
			currentPassword?: ?string,
			newPassword?: ?string,
			verifyNewPassword?: ?string,
		}>,
		res: express$Response
	) => {
		const updateData = req.body
		if (!USER_SELF_UPDATE_VALIDATOR(updateData)) {
			return res.status(400).json({ reason: 'malformed request' })
		}
		const { name, currentPassword, newPassword, verifyNewPassword } = updateData
		if (currentPassword) {
			if (!newPassword || !verifyNewPassword) {
				return res.status(409).json({
					reason: 'No new password was sent',
					code: 'NO_NEW_PASSWORD',
				})
			}
			if (!validate.isStrongPassword(newPassword)) {
				return res.status(409).json({
					reason:
						'new password is not strong enough, password must contain at least on upper case letter, one lower case letter, and one number, and must be between 8 and 32 digits long',
					code: 'WEAK_PASSWORD',
				})
			}
			if (newPassword !== verifyNewPassword) {
				return res.status(409).json({
					reason: 'new password and verify new password must match',
					code: 'PASSWORD_MISMATCH',
				})
			}
			try {
				await req.user.changePassword(currentPassword, newPassword)
			} catch (err) {
				if (err.name === 'IncorrectPasswordError') {
					return res.status(409).json({
						code: 'INCORRECT_PASSWORD',
						reason:
							'can not update password because current password is incorrect',
					})
				}
				throw err
			}
			await req.user.save()
		}
		if (name) {
			req.user.name = name
			await req.user.save()
		}
		res.status(200).end()
	}
)

router.get(
	'/all',
	verifyUserHasRole(([ROLES.ADMIN, ROLES.MANAGER]: any)),
	async (req: AuthenticatedUserRequest<>, res: express$Response) => {
		res.json({ data: await UserModel.find({}).lean() })
	}
)

router.get(
	'/:id',
	verifyUserHasRole(
		([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER, ROLES.CHEF]: any)
	),
	async (
		req: AuthenticatedUserRequest<{}, {| id: string |}>,
		res: express$Response
	) => {
		if (!mongooseTypes.ObjectId.isValid(req.params.id)) {
			return res.status(400).end()
		}
		const user = await UserModel.findOne({ _id: req.params.id }).lean()
		if (!user) {
			return res.status(404).end()
		}
		return res.status(200).json({ data: user }).end()
	}
)

router.post(
	'/:id',
	verifyUserHasRole(([ROLES.ADMIN, ROLES.MANAGER]: any)),
	async (
		req: AuthenticatedUserRequest<
			{ roles: Roles[], balance: number },
			{| id: string |}
		>,
		res: express$Response
	) => {
		if (
			!mongooseTypes.ObjectId.isValid(req.params.id) ||
			!USER_MANAGER_UPDATE_VALIDATOR(req.body)
		) {
			return res.status(400).end()
		}
		const user = await UserModel.findOne({ _id: req.params.id })
		if (!user) {
			return res.status(404).end()
		}
		const { roles, balance } = req.body
		if (roles) {
			user.roles = roles
		}
		if (balance) {
			user.balance = balance
		}
		await user.save()
		return res.status(200).end()
	}
)

export default router
