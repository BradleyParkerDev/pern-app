import type { Config } from 'tailwindcss';

export default {
	content: ['./app/client/index.html', './app/client/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '640px', // small phones → small tablets
			md: '768px', // tablets
			lg: '1024px', // laptops
			xl: '1280px', // desktops
			'2xl': '1536px', // large desktops
			'3xl': '1920px', // full HD / very large monitors
		},
		fontFamily: {
			sans: ['Geist', 'system-ui', 'sans-serif'],
			mono: ['Geist Mono', 'ui-monospace', 'monospace'],
		},
		extend: {},
	},
	plugins: [],
} satisfies Config;
