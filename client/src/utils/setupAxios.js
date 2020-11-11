import axios from 'axios'

let isSetup = false

export default function SetupAxios() {
	if (isSetup) {
		console.error('axios is already setup')
		return
	}
	isSetup = true

	// used for authentication, if user is signed in then this will add the cookies to the request
	axios.interceptors.request.use(
		(config) => {
			// send all requests with credential cookies
			return { ...config, withCredentials: true }
		},
		(error) => Promise.reject(error)
	)
}
