import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import bodyParser from 'body-parser'

import { createServer } from 'http'

import testRoutes from './routes/test'
import inventoryRoutes from './routes/inventory'

const app = express()
const server = createServer(app)
if (!config.isDevelopment) {
	app.use(morgan.successHandler)
	app.use(morgan.errorHandler)
}

app.use(
	session({
		name: 'DansBagelShopSessionId',
		secret: 'itIsASecretToEverybody',
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
		},
		store: new MongoStore({
			mongooseConnection: accountConnection,
		}),
		resave: false,
		saveUninitialized: true,
	})
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.options('*', cors())
app.use('/', testRoutes)
app.use('/inv', inventoryRoutes)


export default server
