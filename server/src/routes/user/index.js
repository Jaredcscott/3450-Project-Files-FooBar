import { Router } from 'express'

const router = new Router()

router.get('/me', (request, response) => {
	response.json(request.user)
})

router.put('/me', async (request, response) => {
	request.user.name = request.body.name
	await request.user.save()
	response.status(200)
})

export default router
