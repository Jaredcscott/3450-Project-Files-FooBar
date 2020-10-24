// A file that runs before any tests. Used for general test setup.
import mongoose from 'mongoose'

// // Always mock the calls to create the mongoose connection
jest.mock('./src/database/connection.js')

beforeAll(() => {
	return mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
})

afterAll(async () => {
	await mongoose.disconnect()
})
