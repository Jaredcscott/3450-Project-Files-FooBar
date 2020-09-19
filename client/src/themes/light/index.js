import defaultFontStyles from '../shared/font'
import defaultSpacingStyles from '../shared/spacing'
import type { Theme } from '../type'

const LIGHT_THEME: Theme = {
	font: defaultFontStyles,
	spacing: defaultSpacingStyles,
	color: {
		neutral: {
			light: '#FFFFFF',
			lighter: '#EAEAEA',
			neutral: '#DCDCDC',
			variant: '#CDCDCD',
			darker: '#A0A0A0',
			dark: '#8B8B8B',
		},

		base: {
			lighter: '#FFFFFF',
			normal: '#DDDDDD',
			darker: '#BBBBBB',
		},

		primary: {
			lighter: '#0000D0',
			normal: '#0000C0',
			darker: '#0000A0',
		},
		secondary: {
			lighter: '#00D0D0',
			normal: '#00C0C0',
			darker: '#00A0A0',
		},
		info: {
			lighter: '#1C0FDD',
			normal: '#1C0FAA',
			darker: '#1C0F88',
		},
		warn: {
			lighter: '#FF7700',
			normal: '#ff6600',
			darker: '#ff5500',
		},
		success: {
			lighter: '#00DD00',
			normal: '#00CC00',
			darker: '#00AA00',
		},

		on: {
			base: '#222222',
			primary: '#DDDDDD',
			secondary: '#DDDDDD',
			info: '#DDDDDD',
			warn: '#DDDDDD',
			success: '#DDDDDD',
		},
	},
}

export default LIGHT_THEME
