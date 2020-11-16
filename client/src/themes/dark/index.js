import defaultFontStyles from '../shared/font'
import defaultSpacingStyles from '../shared/spacing'
import type { Theme } from '../type'

const DARK_THEME: Theme = {
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
			lighter: '#00008B',
			normal: '#191919',
			darker: '#101010',
		},

		primary: {
			darker: '#0000D0',
			normal: '#0000C0',
			lighter: '#0000A0',
		},
		secondary: {
			darker: '#00D0D0',
			normal: '#00C0C0',
			lighter: '#00A0A0',
		},
		info: {
			darker: '#1C0FDD',
			normal: '#1C0FAA',
			lighter: '#1C0F88',
		},
		warn: {
			darker: '#FF7700',
			normal: '#ff6600',
			lighter: '#ff5500',
		},
		success: {
			darker: '#00DD00',
			normal: '#00CC00',
			lighter: '#00AA00',
		},

		on: {
			base: '#EEEEEE',
			primary: '#DDDDDD',
			secondary: '#DDDDDD',
			info: '#DDDDDD',
			warn: '#DDDDDD',
			success: '#DDDDDD',
		},
	},
}

export default DARK_THEME
