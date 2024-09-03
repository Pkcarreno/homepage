import markdoc from '@astrojs/markdoc'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
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
    markdoc()
  ],
  vite: {
    plugins: [Oxlint({})]
  },
  site: 'https://www.pkcarreno.com'
})
