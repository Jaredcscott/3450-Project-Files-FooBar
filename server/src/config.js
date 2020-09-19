type Config = {|
	mongoAccountsUser: string,
	mongoAccountsPass: string,
	cookieSessionKey: string,
	isProduction: boolean,
	isDevelopment: boolean,
	sessionSecret: string,
	sessionDomain: string,
|}

let config: Config = {
	mongoAccountsUser: 'accountsAdmin',
	mongoAccountsPass: 'accountsAdmin4178',
	cookieSessionKey: 'infinid-server.sid',
	isProduction: false,
	isDevelopment: true,
	sessionSecret: 'dev_secret',
	sessionDomain: 'SHOULD NOT BE USED IN DEV',
}

if (process.env.NODE_ENV === 'prod') {
	config.isProduction = true
	config.isDevelopment = false
}

export default config
