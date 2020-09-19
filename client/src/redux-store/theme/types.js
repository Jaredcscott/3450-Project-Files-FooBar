import { AVAILABLE_THEMES } from './constants'
export type ThemeState = {
	theme: $Keys<typeof AVAILABLE_THEMES>,
}
