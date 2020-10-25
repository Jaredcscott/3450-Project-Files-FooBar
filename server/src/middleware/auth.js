import type { Roles, MaybeUserRequest } from '../utils/types'

/**
 *  verifiedUserSignedIn - express middleware - verify that the request is coming from a user which is signed in
 *
 * @param  {MaybeUserRequest<>} req - express request
 * @param  {express$Response} res - express response
 * @param  {express$NextFunction} next - express next function
 */
export function verifiedUserSignedIn(
	req: MaybeUserRequest<>,
	res: express$Response,
	next: express$NextFunction
) {
	if (req.user) {
		return next()
	}
	res.status(401).end()
}

/**
 *  verifyUserHasRole - express middleware - verify that the user is signed in and has one of the roles specified
 *
 * @param  {Roles[]} roles - roles which can access the route
 */
export const verifyUserHasRole = (roles: Roles[]) => (
	req: MaybeUserRequest<>,
	res: express$Response,
	next: express$NextFunction
) => {
	const { user } = req
	if (!user) {
		return res.status(401).end()
	}
	const userRoles = new Set(user.roles)
	if (!roles.some((role) => userRoles.has(role))) {
		return res
			.status(403)
			.json({ reason: 'User does not have necessary role(s)' })
	}
	next()
}
