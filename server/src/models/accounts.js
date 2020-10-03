import mongoose, { Schema } from 'mongoose'
import config from '../config'
import passportUserPassportConnector from 'passport-local-mongoose'

export const mongooseAccountConnection = mongoose.createConnection(
	`${config.dbUrl}${config.accountDatabaseName}`,
	{ useNewUrlParser: true }
)

const Roles = ['CUSTOMER', 'CASHIER', 'CHEF', 'MANAGER', 'ADMIN']

const UserSchema = new Schema({
	email: { type: String, required: true },
	roles: [
		{
			type: String,
			enum: Roles,
		},
	],
})

UserSchema.plugin(passportUserPassportConnector, {
	usernameField: 'email',
	usernameLowerCase: true,
	lastLoginField: 'lastLogin',
	usernameQueryFields: ['email'],
})

const UserModel = mongooseAccountConnection.model('User', UserSchema)

module.exports = {
	accountConnection: mongooseAccountConnection,
	User: UserModel,
}
