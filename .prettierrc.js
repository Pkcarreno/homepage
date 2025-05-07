/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  arrowParens: 'avoid',
  singleQuote: true,
  bracketSpacing: true,
  semi: false,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
