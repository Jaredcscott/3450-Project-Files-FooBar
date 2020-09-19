// @flow
import { combineReducers } from 'redux'
import themeReducer from './theme'

export type Action = any

function createRootReducer() {
	return combineReducers<{}, Action>({
		theme: themeReducer,
	})
}

export default createRootReducer
