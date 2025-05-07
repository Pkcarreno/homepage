import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				}
			},
			fontFamily: {
				mono: ['iA Writer Duo', ...fontFamily.mono]
			},
			fontSize: {
				xs: ['0.878rem', '1.6'],
				sm: ['0.937rem', '1.6'],
				base: ['1rem', '1.6']
			}
		}
	},
	plugins: []
}
