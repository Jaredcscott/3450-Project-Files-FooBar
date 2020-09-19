import { Router } from 'express'

const router = new Router()

router.get('/', (request, response) => response.json({ hello: 'world' }))

export default router
