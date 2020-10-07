import { Router } from 'express'
import passport from 'passport'
import { User } from '../../models/accounts'

const router = new Router()

router.post('/register', (req, res) => {
	User.register(
		new User({
			email: req.body.email,
			name: req.body.name,
			roles: ['CUSTOMER'],
		}),
		req.body.password,
		(err) => {
			if (err) {
				console.error(err)
				res.redirect('/err')
				return
			}
			passport.authenticate('local')(req, res, function () {
				res.redirect('/')
			})
		}
	)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('/')
})

router.get('/logout', function (req, res) {
	req.logout()
	res.redirect('/')
})

router.get('/', (req, res) => {
	res.json({ hello: 'world' })
})

export default router
