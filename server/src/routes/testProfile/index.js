import { Router } from 'express'

const router = new Router()

router.get('/', (request, response) => response.json({ name: "Jared Scott", accountBal: 85 }))

export default router
