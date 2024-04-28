import eslintPluginAstro from 'eslint-plugin-astro'
import typescriptParser from '@typescript-eslint/parser'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['*.astro', '.tsx'],
    languageOptions: {
      parser: typescriptParser,
      extraFileExtensions: ['.astro']
    }
  }
]
