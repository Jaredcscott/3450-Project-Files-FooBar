export type ColorGroup = {|
	lighter: string,
	normal: string,
	darker: string,
|}

export type Theme = {|
	font: {|
		size: {|
			extraSmall: string,
			verySmall: string,
			small: string,
			regular: string,
			large: string,
			veryLarge: string,
			extraLarge: string,
		|},

		weight: {|
			light: string,
			regular: string,
			semiBold: string,
			bold: string,
		|},
	|},

	spacing: {|
		verySmall: string,
		small: string,
		normal: string,
		large: string,
		veryLarge: string,
	|},

	color: {|
		neutral: {|
			light: string,
			lighter: string,
			neutral: string,
			variant: string,
			darker: string,
			dark: string,
		|},

		base: ColorGroup,

		primary: ColorGroup,
		secondary: ColorGroup,
		info: ColorGroup,
		warn: ColorGroup,
		success: ColorGroup,

		on: {|
			base: string,
			primary: string,
			secondary: string,
			info: string,
			warn: string,
			success: string,
			info: string,
		|},
	|},
|}

export type StatusColor = 'primary' | 'secondary' | 'info' | 'warn' | 'success'
