import mongoose from 'mongoose'

/**
 *createMongooseConnection - create a connection to the database (overridden during mock)
 *
 * @param  {string} database - the database to connect to
 * @return Mongoose$Connection
 */
export function createMongooseConnection(database: string) {
	return mongoose.createConnection(`${process.env.DB_BASE_URL}/${database}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
}
