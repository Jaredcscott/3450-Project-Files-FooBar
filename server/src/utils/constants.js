export const ROLES = {
	CUSTOMER: 'CUSTOMER',
	CASHIER: 'CASHIER',
	CHEF: 'CHEF',
	MANAGER: 'MANAGER',
	ADMIN: 'ADMIN',
}

export const ROLES_ENUM: $Keys<typeof ROLES>[] = Object.keys(ROLES)
