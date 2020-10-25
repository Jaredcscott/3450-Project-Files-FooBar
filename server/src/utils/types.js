import { ROLES, INVENTORY_ITEM_CATEGORIES, ORDER_STATUS } from './constants'

export type MongooseDocument<U> = {|
	...U,
	save: () => Promise<U>,
|}

export type Roles = $Keys<typeof ROLES>[]
export type InventoryItemCategory = $Keys<typeof INVENTORY_ITEM_CATEGORIES>

export type InventoryItem = {|
	category: InventoryItemCategory,
	name: string,
	quantity: number,
	price: number,
	onMenu: boolean,
|}

export type Order = {|
	bagels: Array<{| bagel: string, toppings: string[] |}>,
	beverages: Array<string>,
	price: number,
	placed: Date,
	fulfilled?: ?Date,
	status: $Keys<typeof ORDER_STATUS>,
	placedBy: string,
|}

type TrimmedInventoryItem = {|
	category: InventoryItemCategory,
	name: string,
	_id: string,
|}
export type PopulatedOrder = {|
	bagels: Array<{|
		bagel: TrimmedInventoryItem,
		toppings: TrimmedInventoryItem[],
	|}>,
	beverages: Array<TrimmedInventoryItem>,
	price: number,
	placed: Date,
	fulfilled?: ?Date,
	status: $Keys<typeof ORDER_STATUS>,
	placedBy: string,
|}

export type PublicUser = {|
	name: string,
	email: string,
	roles: Roles,
	balance: number,
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
