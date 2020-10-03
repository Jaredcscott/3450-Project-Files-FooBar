import { Router } from 'express'

const router = new Router()

router.get('/me', (request, response) => {
	response.json(request.user)
})

export default router
