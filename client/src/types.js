export const ROLES = {
	CUSTOMER: 'CUSTOMER',
	CASHIER: 'CASHIER',
	CHEF: 'CHEF',
	MANAGER: 'MANAGER',
	ADMIN: 'ADMIN',
}

export const ROLES_ENUM: $Keys<typeof ROLES>[] = Object.keys(ROLES)

export const INVENTORY_ITEM_CATEGORIES = {
	BEVERAGE: 'BEVERAGE',
	SAMMICHE_TOPPINGS: 'SAMMICHE_TOPPINGS',
	SMEAR: 'SMEAR',
	BAGEL: 'BAGEL',
}

export const INVENTORY_ITEM_CATEGORIES_ENUM: Array<
	$Keys<typeof INVENTORY_ITEM_CATEGORIES>
> = Object.keys(INVENTORY_ITEM_CATEGORIES)

export type Roles = $Keys<typeof ROLES>[]
export type InventoryItemCategory = $Keys<typeof INVENTORY_ITEM_CATEGORIES>

export type User = {
	name: string,
	email: string,
	roles: Roles[],
	balance: number,
	_id: string,
}

export const ORDER_STATUS = {
	PLACED: 'PLACED',
	PREPARING: 'PREPARING',
	PREPARED: 'PREPARED',
	FULFILLED: 'FULFILLED',
	CANCELED: 'CANCELED',
	DID_NOT_PICK_UP: 'DID_NOT_PICK_UP',
}

export type OrderStatus = $Keys<typeof ORDER_STATUS>

export const ORDER_STATUS_ENUM: Array<OrderStatus> = Object.keys(ORDER_STATUS)

export type ServerOrder = {|
	bagels: Array<{| bagel: string, toppings: string[] |}>,
	beverages: Array<string>,
	price: number,
	placed: Date,
	fulfilled?: ?Date,
	status: OrderStatus,
	placedBy: string,
|}

export type CreationBagel = {| bagel: ?string, toppings: (?string)[], smears: (?string)[] |}

export type CreationOrder = {|
	bagels: Array<CreationBagel>,
	beverages: Array<?string>,
	pickupAt: number,
|}

export type OrderToSendToServer = {|
	bagels: Array<{| bagel: string, toppings: string[] |}>,
	beverages: Array<string>,
	pickupAt: number,
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
	pickupAt: number,
	_id: string,
|}

export type InventoryItemSentToServer = {|
	category: InventoryItemCategory,
	name: string,
	quantity: number,
	price: number,
	onMenu: boolean,
	targetCount: number,
|}

export type InventoryItem = {|
	...InventoryItemSentToServer,
	_id: string,
|}

export type Analytics = {|
	items: { ...InventoryItem, timesUsed: number }[],
	orders: PopulatedOrder[],
	totalPrice: number,
|}

export type Menu = InventoryItem[]
