import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../general/Button'
import { AVAILABLE_THEMES } from '../../redux-store/theme/constants'
import { getTheme, setTheme } from '../../redux-store/theme'

export default function Test() {
	const theme = useSelector(getTheme)
	const dispatch = useDispatch()

	return (
		<Screen>
			<Button
				onClick={() => {
					if (theme === AVAILABLE_THEMES.LIGHT) {
						dispatch(setTheme(AVAILABLE_THEMES.DARK))
					} else {
						dispatch(setTheme(AVAILABLE_THEMES.LIGHT))
					}
				}}
				color={theme === AVAILABLE_THEMES.LIGHT ? 'primary' : 'secondary'}>
				Turn to {theme === AVAILABLE_THEMES.LIGHT ? 'dark' : 'light'} theme
			</Button>
		</Screen>
	)
}

const Screen = styled.div`
	width: 100%;
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.color.base.darker};
`
