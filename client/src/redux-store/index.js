import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import type { ReduxState } from './types'
import createRootReducer from './reducers'

const initialState: ReduxState = {}
const enhancers = []
const middleware = []

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers)

export function createReduxStore(initialState: ReduxState) {
	return createStore(createRootReducer(), initialState, composedEnhancers)
}

const store = createReduxStore(initialState)

export default store
