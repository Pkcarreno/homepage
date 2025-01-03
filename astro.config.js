import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import keystatic from '@keystatic/astro'
import { defineConfig } from 'astro/config'
import Oxlint from 'unplugin-oxlint/vite'

import vercel from '@astrojs/vercel';

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
    plugins: [Oxlint({})]
  },

  site: 'https://www.pkcarreno.com',
  adapter: vercel()
})