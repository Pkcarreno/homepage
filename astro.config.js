import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import keystatic from '@keystatic/astro'
import umami from '@yeskunall/astro-umami'
import { defineConfig, envField } from 'astro/config'
import favicons from 'astro-favicons'
import robots from 'astro-robots'
import Oxlint from 'unplugin-oxlint/vite'

import { config } from './src/config'

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'always'
  },
  server: {
    port: 4200
  },
  compressHTML: true,
  prefetch: true,

  devToolbar: {
    enabled: false
  },
  env: {
    schema: {
      UMAMI_ID: envField.string({
        access: 'public',
        context: 'client',
        optional: false
      }),
      UMAMI_ENDPOINT: envField.string({
        access: 'public',
        context: 'client',
        optional: false
      })
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true
    }),
    favicons(),
    robots({
      policy: [
        {
          userAgent: config.iaBotAgents,
          disallow: ['/']
        }
      ]
    }),
    sitemap(),
    markdoc(),
    react(),
    keystatic(),
    !!process.env.UMAMI_ID &&
      umami({
        id: process.env.UMAMI_ID,
        domains: ['pkcarreno.com', 'www.pkcarreno.com'],
        endpointUrl: process.env.UMAMI_ENDPOINT,
        hostUrl: process.env.UMAMI_ENDPOINT
      })
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

  site: config.site,
  adapter: vercel()
})
