import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import keystatic from '@keystatic/astro'
import { defineConfig } from 'astro/config'
import favicons from 'astro-favicons'
import robots from 'astro-robots'
import Oxlint from 'unplugin-oxlint/vite'

import { config } from './src/config'

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
    favicons(),
    robots({
      policy: [
        {
          userAgent: iaBotAgents,
          disallow: ['/']
        }
      ]
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

  site: config.site,
  adapter: vercel()
})

const iaBotAgents = [
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Amazonbot',
  'anthropic-ai',
  'Applebot',
  'Applebot-Extended',
  'Brightbot 1.0',
  'Bytespider',
  'CCBot',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Crawlspace',
  'Diffbot',
  'DuckAssistBot',
  'FacebookBot',
  'FriendlyCrawler',
  'Google-Extended',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'GPTBot',
  'iaskspider/2.0',
  'ICC-Crawler',
  'ImagesiftBot',
  'img2dataset',
  'ISSCyberRiskCrawler',
  'Kangaroo Bot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'OAI-SearchBot',
  'omgili',
  'omgilibot',
  'PanguBot',
  'PerplexityBot',
  'Perplexity‑User',
  'PetalBot',
  'Scrapy',
  'SemrushBot-OCOB',
  'SemrushBot-SWA',
  'Sidetrade indexer bot',
  'Timpibot',
  'VelenPublicWebCrawler',
  'Webzio-Extended',
  'YouBot'
]
