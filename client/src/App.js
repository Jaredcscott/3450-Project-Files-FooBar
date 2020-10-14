import React from 'react'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux-store'
import ThemeProvider from './themes/provider'
import Routing from './routes'
import { ReactQueryDevtools } from 'react-query-devtools'
import './App.css'

const queryCache = new QueryCache()

window.queryCache = queryCache

function App() {
	return (
		<ReactQueryCacheProvider queryCache={queryCache}>
			<ReduxProvider store={store}>
				<ThemeProvider>
					<Routing />
				</ThemeProvider>
			</ReduxProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryCacheProvider>
	)
}

export default App
