require('dotenv').config()
import mongoose from 'mongoose'
import app from './app'

const port = process.env.PORT || 8100

let server
mongoose
	.connect(process.env.DB_BASE_URL, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('Connected to MongoDB')
		server = app.listen(port, () => {
			console.log(`Listening to port ${port}`)
		})
	})

const exitHandler = () => {
	if (server) {
		server.close(() => {
			console.log('Server closed')
			process.exit(1)
		})
	} else {
		process.exit(1)
	}
}

const unexpectedErrorHandler = (error) => {
	console.error(error)
	exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
	console.log('SIGTERM received')
	if (server) {
		server.close()
	}
})
