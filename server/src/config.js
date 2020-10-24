type Config = {|
	mongoAccountsUser: string,
	mongoAccountsPass: string,
	cookieSessionKey: string,
	isProduction: boolean,
	isDevelopment: boolean,
	sessionSecret: string,
	sessionDomain: string,
	dbUrl: string,
	accountDatabaseName: string,
	inventoryDatabaseName: string,
|}

let config: Config = {
	mongoAccountsUser: 'accountsAdmin',
	mongoAccountsPass: 'adminAccounts827399',
	cookieSessionKey: 'dans_bagel_shop.sid',
	isProduction: false,
	isDevelopment: true,
	sessionSecret: process.env.SESSION_SECRET || 'secret',
	sessionDomain: 'SHOULD NOT BE USED IN DEV',
	dbUrl: 'mongodb://localhost/',
	accountDatabaseName: 'accounts',
	inventoryDatabaseName: 'inventory',
}

if (process.env.NODE_ENV === 'prod') {
	config.isProduction = true
	config.isDevelopment = false
}

export default config
