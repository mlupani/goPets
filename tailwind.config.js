module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#FFFFFF',
			blue: {
				greenBlueCrayola: '#0792D4',
				greenBlueCrayola2: '#0094D8',
				cyanProcess: '#40AFE4',
				aliceBlue: '#E8F7FF',
				white: '#FFFFFF'
			},
		}
	},
	variants: {
		extend: {
			border: ['active', 'hover', 'focus'],
			borderColor: ['active', 'hover', 'focus'],
			borderWidth: ['hover', 'focus', 'active'],
		},
	},
	plugins: [],
}
