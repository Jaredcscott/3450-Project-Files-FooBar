import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux-store'
import ThemeProvider from './themes/provider'
import Routing from './routes'
import './App.css'

function App() {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider>
				<Routing />
			</ThemeProvider>
		</ReduxProvider>
	)
}

export default App
