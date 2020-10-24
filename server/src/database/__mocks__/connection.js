import mongoose from 'mongoose'

export function createMongooseConnection() {
	// this is setup in jest.setup.js (reroutes to in memory database)
	return mongoose.connection
}
