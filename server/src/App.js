import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import bodyParser from 'body-parser'

import passport from 'passport'
import session from 'express-session'
import { mongooseAccountConnection, UserModel as User } from './models/accounts'
import { createServer } from 'http'

import authenticationRoutes from './routes/auth'
import userRoutes from './routes/user'
import inventoryRoutes from './routes/inventory'
import menuRoutes from './routes/menu'
import orderRoutes from './routes/order'
import analyticsRoutes from './routes/analytics'

const MongoStore = require('connect-mongo')(session)

const app = express()
const server = createServer(app)
if (!config.isDevelopment) {
	app.use(morgan.successHandler)
	app.use(morgan.errorHandler)
}

app.use(
	session({
		name: config.cookieSessionKey,
		secret: config.sessionSecret,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
		},
		store: new MongoStore({
			mongooseConnection: mongooseAccountConnection,
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
app.use('/inventory', inventoryRoutes)
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)
app.use('/analytics', analyticsRoutes)

app.use((req: express$Request, res: express$Response) => {
	res.status(404)
	res.end()
})

app.use((err: Error, req: express$Request, res: express$Response) => {
	console.error(err)
	if (!res.finished) {
		res
			.status(500)
			.json({ error: `Internal server error: "${err.name}"` })
			.end()
	}
})

export default server
