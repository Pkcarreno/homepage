import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import keystatic from '@keystatic/astro'
import { defineConfig } from 'astro/config'
import Oxlint from 'unplugin-oxlint/vite'

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'always'
  },

  compressHTML: true,
  prefetch: true,

  devToolbar: {
    enabled: false
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true
    }),
    sitemap(),
    markdoc(),
    react(),
    keystatic()
  ],

  output: 'static',

  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    plugins: [
      Oxlint({
        watch: true,
        fix: true,
        includes: ['src/**/*.{ts,astro}'],
        packageManager: 'pnpm'
      })
    ]
  },

  site:
    process.env.VERCEL_ENV === 'production'
      ? 'https://www.pkcarreno.com'
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://127.0.0.1:4321',
  adapter: vercel()
})
