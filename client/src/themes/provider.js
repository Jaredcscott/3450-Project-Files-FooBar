import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { getTheme } from '../redux-store/theme'
import { AVAILABLE_THEMES } from '../redux-store/theme/constants'
import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'

const THEMES = {
	[AVAILABLE_THEMES.LIGHT]: lightTheme,
	[AVAILABLE_THEMES.DARK]: darkTheme,
}

export default function Provider(props: { children: React$Node }) {
	const theme = THEMES[useSelector(getTheme)] || lightTheme
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
