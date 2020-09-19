import produce from 'immer'
import { AVAILABLE_THEMES } from './constants'
import type { ReduxState } from '../types'
import type { ThemeState } from './types'

const SET_THEME = 'SET_THEME'

// ====================== Action Types ======================

type SetThemeAction = {
	type: 'SET_THEME',
	payload: {
		theme: $Keys<typeof AVAILABLE_THEMES>,
	},
}

// ======================= Action Generators ================
export function setTheme(theme: $Keys<typeof AVAILABLE_THEMES>): SetThemeAction {
	return {
		type: SET_THEME,
		payload: {
			theme,
		},
	}
}

export type Action = SetThemeAction

const INITIAL_STATE: ThemeState = {
	theme: AVAILABLE_THEMES.LIGHT,
}

export default function themeReducer(
	state: ThemeState = INITIAL_STATE,
	action: Action
): ThemeState {
	switch (action.type) {
		case SET_THEME: {
			return produce(state, (draft: ThemeState) => {
				draft.theme = action.payload.theme
			})
		}
		default:
			return state
	}
}

// ============================ SELECTORS =====================

export function getTheme(state: ReduxState): $Keys<typeof AVAILABLE_THEMES> {
	return state.theme.theme
}
