import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import bodyParser from 'body-parser'

import { createServer } from 'http'

import testRoutes from './routes/test'

const app = express()
const server = createServer(app)
if (!config.isDevelopment) {
	app.use(morgan.successHandler)
	app.use(morgan.errorHandler)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.options('*', cors())
app.use('/', testRoutes)

export default server
