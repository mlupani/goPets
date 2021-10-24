module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
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
