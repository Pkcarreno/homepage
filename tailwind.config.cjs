/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
    fontSize: {
      sm: '0.833rem',
      base: '1rem',
      xl: '1.200rem',
      '2xl': '1.440rem',
      '3xl': '1.728rem',
      '4xl': '2.074rem',
      '5xl': '2.489rem',
    },    
    fontFamily: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
		extend: {
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
