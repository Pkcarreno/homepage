import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import oxlint from 'eslint-plugin-oxlint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['node_modules/*', 'dist/*', '.astro']
  },
  oxlint.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'lf'
        }
      ],
      'import/prefer-default-export': 'off',
      'max-params': ['error', 3],
      'max-lines-per-function': [
        'error',
        {
          max: 70,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off'
    }
  },
  {
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx,js}', './*.{ts,tsx,js}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  },
  {
    files: [
      'src/components/**/*.{astro,js,jsx,ts,tsx}',
      'src/layouts/**/*.{astro,js,jsx,ts,tsx}'
    ],
    plugins: {
      unicorn: eslintPluginUnicorn
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase'
        }
      ]
    }
  },
  {
    ignores: [
      'src/components/**/*.{astro,js,jsx,ts,tsx}',
      'src/layouts/**/*.{astro,js,jsx,ts,tsx}'
    ],
    plugins: {
      unicorn: eslintPluginUnicorn
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase'
        }
      ]
    }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },
  {
    plugins: {
      'unused-imports': unusedImports
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.cjs'
      }
    },
    rules: {
      'tailwindcss/classnames-order': [
        'warn',
        {
          officialSorting: true
        }
      ],
      'tailwindcss/no-custom-classname': 'off'
    }
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
)
