import { ROLES } from './constants'

export type MongooseDocument<U> = {|
	...U,
	save: () => Promise<U>,
|}

export type PublicUser = {|
	name: string,
	email: string,
	roles: $Keys<typeof ROLES>[],
|}

export type BasicUser = {|
	_id: string,
	...PublicUser,
|}

export type UserDocument = MongooseDocument<BasicUser>

export type BaseRequest<
	Body = {},
	Parameters = {},
	Query = {}
> = express$Response & {|
	body: Body,
	params: Parameters,
	query: Query,
|}

export type AuthenticatedUserRequest<
	Body = {},
	Parameters = {},
	Query = {}
> = BaseRequest<Body, Parameters, Query> & {|
	user: UserDocument,
|}
