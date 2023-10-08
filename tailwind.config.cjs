/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
		extend: {
      fontFamily: {
        notoSans: ["'Noto Sans'", 'Verdana', 'sans-serif']
      },
      colors: {
       'text': 'hsl(var(--text))',
       'background': 'hsl(var(--background))',
       'primary': 'hsl(var(--primary))',
       'secondary': 'hsl(var(--secondary))',
       'accent': 'hsl(var(--accent))',
      },
    },
	},
	plugins: [],
}
