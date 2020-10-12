import { Router } from 'express'

const router = new Router()

router.get('/profile/', (request, response) => response.json({ name: 'Jared Scott', email: 'jared@msn.com', accountBal: 85 }))

export default router
