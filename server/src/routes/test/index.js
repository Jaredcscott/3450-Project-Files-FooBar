import { Router } from 'express'

const router = new Router()

router.get('/', (request, response) =>
	response.json({ hello: 'world', number: Math.random() })
)

export default router
