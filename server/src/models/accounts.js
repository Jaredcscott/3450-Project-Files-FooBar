// @flow
import { Schema } from 'mongoose'
import config from '../config'
import passportUserPassportConnector from 'passport-local-mongoose'
import { createMongooseConnection } from '../database/connection'
import { ROLES_ENUM } from '../utils/constants'

export const mongooseAccountConnection = createMongooseConnection(
	config.accountDatabaseName
)

const UserSchema = new Schema({
	email: { type: String, required: true, lowercase: true },
	name: { type: String, required: true, default: 'Anonymous' },
	roles: [
		{
			type: String,
			enum: ROLES_ENUM,
		},
	],
})

UserSchema.plugin(passportUserPassportConnector, {
	usernameField: 'email',
	usernameLowerCase: true,
	lastLoginField: 'lastLogin',
	usernameQueryFields: ['email'],
})

export const UserModel = mongooseAccountConnection.model('User', UserSchema)

/**
 * doesUserWithEmailExist - check if a user has the email
 *
 * @param  {string} email - the email to check if a user has
 * @returns Promise<boolean> -  a promise which resolves to true if a user exists with the email, false otherwise
 */
export async function doesUserWithEmailExist(email: string): Promise<boolean> {
	return (await UserModel.findOne({ email })) !== null
}
