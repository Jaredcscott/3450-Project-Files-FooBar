import { Router } from 'express'

const router = new Router()

router.get('/profile/', (request, response) =>
	response.json({ name: 'Jared Scott', email: 'jared@msn.com', accountBal: 85 })
)
router.get('/', (request, response) =>
	response.json({ hello: 'world', number: Math.random() })
)

export default router
