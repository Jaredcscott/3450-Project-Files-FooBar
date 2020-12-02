import axios from 'axios'
import config from '../config'
import type {
	User,
	Analytics,
	PopulatedOrder,
	OrderStatus,
	InventoryItem,
	InventoryItemSentToServer,
	OrderToSendToServer,
	Menu,
	Roles,
} from '../types'

export function getSignedInUser(): Promise<?User> {
	return axios
		.get(`${config.serverUrl}/user`)
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

export function login(email: string, password: string, queryCache: any): void {
	axios
		.post(`${config.serverUrl}/auth/login`, {
			email,
			password,
		})
		.then((res) => {
			console.log('successfully logged in')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to login')
			console.error(err)
		})
}

export function logout(): void {
	axios
		.get(`${config.serverUrl}/auth/logout`, { credentials: 'include' })
		.then(() => {
			console.log('successfully logged out')
			window.location.reload(false)
		})
		.catch((err) => {
			console.log('failed to logout')
			console.error(err)
		})
}

export function register(
	name: string,
	email: string,
	password: string,
	verifyPassword: string,
	queryCache: any,
	history: any
): void {
	axios
		.post(`${config.serverUrl}/auth/register`, { name, email, password, verifyPassword })
		.then(() => {
			console.log('successfully registered')
			queryCache.invalidateQueries('user')
			history.replace('/home')
		})
		.catch((err) => {
			console.log('failed to register')
			console.error(err)
			alert(err?.response?.data?.reason || 'Failed to connect to server')
		})
}

export function resetPassword(
	currentPassword: string,
	newPassword: string,
	verifyNewPassword: string
): void {
	axios
		.post(`${config.serverUrl}/user`, {
			currentPassword,
			newPassword,
			verifyNewPassword,
		})
		.then(() => {
			console.log('successfully reset password')
			window.location.reload(false)
		})
		.catch((err) => {
			console.log('failed to set new password')
			console.error(err)
		})
}

export function changeName(name: string, queryCache: any): Promise<*> {
	return axios
		.post(`${config.serverUrl}/user`, {
			name,
		})
		.then(() => {
			console.log('successfully changed name')
			queryCache.invalidateQueries('user')
		})
		.catch((err) => {
			console.log('failed to change name')
			console.error(err)
			alert('failed to change name')
		})
}

export function getAnalytics(): Promise<?Analytics> {
	return axios
		.get(`${config.serverUrl}/analytics`)
		.then((res) => {
			console.log('successfully got Analytics')
			return res.data.data
		})
		.catch((err) => console.error(err))
}

export function getUsers(): Promise<?(User[])> {
	return axios
		.get(`${config.serverUrl}/user/all`)
		.then((res) => {
			console.log('successfully retrieved accounts')
			return res.data.data
		})
		.catch(() => null)
}

export function getUser(userId: string): () => Promise<?User> {
	return () => {
		return axios
			.get(`${config.serverUrl}/user/${userId}`)
			.then((res) => {
				return res.data.data
			})
			.catch(() => null)
	}
}

export function getOrdersTodo(): Promise<PopulatedOrder[]> {
	return axios
		.get(`${config.serverUrl}/order/todo`)
		.then((res) => {
			console.log('successfully retrieved orders')
			return res.data.data
		})
		.catch(() => null)
}

export function setOrderStatus(orderID: string, status: OrderStatus): Promise<*> {
	return axios.post(`${config.serverUrl}/order/${orderID}`, { status }).catch(() => null)
}

export function getInventory(): Promise<?(InventoryItem[])> {
	return axios
		.get(`${config.serverUrl}/inventory`)
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

export function addInventoryItem(item: InventoryItemSentToServer): Promise<*> {
	return axios
		.post(`${config.serverUrl}/inventory`, item)
		.then(() => {
			console.log('successfully added item')
		})
		.catch((err) => {
			console.log('failed to add the following item')
			console.log(item)
			console.error(err)
		})
}

export function updateInventoryItem(item: InventoryItem, queryCache: any) {
	return axios
		.post(`${config.serverUrl}/inventory/${item._id}`, item)
		.then(() => {
			console.log('successfully updated item')
			queryCache.invalidateQueries('inventory')
		})
		.catch((err) => {
			console.log('failed to update item')
			console.error(err)
		})
}

export function getMenu(): Promise<?Menu> {
	return axios
		.get(`${config.serverUrl}/menu`)
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

export function getOrderPrice(order: OrderToSendToServer) {
	return axios
		.post(`${config.serverUrl}/order/price`, order)
		.then((res) => {
			return res.data.data
		})
		.catch(() => null)
}

export function addOrder(order: OrderToSendToServer): Promise<*> {
	return axios
		.post(`${config.serverUrl}/order`, order)
		.then(() => {
			alert('Order Placed!')
			console.log('successfully placed order')
		})
		.catch((err) => {
			console.log('failed to place order')
			console.error(err)
			alert(err.response.data.reason)
		})
}

export function getOrders(): Promise<?PopulatedOrder> {
	return axios
		.get(`${config.serverUrl}/order`)
		.then((res) => {
			console.log('successfully retrieved orders')
			return res.data.data
		})
		.catch(() => null)
}

export function updateRoles(queryCache: any, id: string, roles: Array<Roles>) {
	axios
		.post(`${config.serverUrl}/user/${id}`, {
			roles,
		})
		.then(() => {
			console.log('successfully changed roles')
			queryCache.invalidateQueries('users')
		})
		.catch((err) => {
			console.log('failed to update roles')
			console.error(err)
		})
}

export function updateFunds(balance: Number, id: string, queryCache: any) {
	axios
		.post(`${config.serverUrl}/user/${id}`, {
			balance,
		})
		.then(() => {
			console.log('successfully added funds')
			queryCache.invalidateQueries('users')
		})
		.catch((err) => {
			console.log('failed to add funds')
			console.error(err)
		})
}
