import { ROLES, INVENTORY_ITEM_CATEGORIES } from './constants'

export type MongooseDocument<U> = {|
	...U,
	save: () => Promise<U>,
|}

export type Roles = $Keys<typeof ROLES>[]
export type InventoryItemCategory = $Keys<typeof INVENTORY_ITEM_CATEGORIES>

export type PublicUser = {|
	name: string,
	email: string,
	roles: Roles,
|}

export type BasicUser = {|
	_id: string,
	...PublicUser,
|}

export type UserDocument = {|
	...MongooseDocument<BasicUser>,
	changePassword: (oldPassword: string, password: string) => Promise<*>,
|}

export type BaseRequest<
	Body = {},
	Parameters = {},
	Query = {}
> = express$Response & {|
	body: Body,
	params: Parameters,
	query: Query,
|}

export type MaybeUserRequest<
	Body = {},
	Parameters = {},
	Query = {}
> = BaseRequest<Body, Parameters, Query> & {|
	user?: ?UserDocument,
|}

export type AuthenticatedUserRequest<
	Body = {},
	Parameters = {},
	Query = {}
> = BaseRequest<Body, Parameters, Query> & {|
	user: UserDocument,
|}
