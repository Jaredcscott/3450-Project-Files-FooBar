import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import bodyParser from 'body-parser'

import passport from 'passport'
import session from 'express-session'
import { accountConnection, User } from './models/accounts'

const MongoStore = require('connect-mongo')(session)

import { createServer } from 'http'

import testRoutes from './routes/test'
import authenticationRoutes from './routes/auth'
import userRoutes from './routes/user'

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

app.use(passport.initialize())
app.use(passport.session())

const corsOptions = {
	origin: /localhost:(\d+)$/,
	credentials: true,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// setup passport
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/auth', authenticationRoutes)
app.use('/user', userRoutes)
app.use('/', testRoutes)

export default server
