import typescriptParser from '@typescript-eslint/parser'
import eslintPluginAstro from 'eslint-plugin-astro'

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
