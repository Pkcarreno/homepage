import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import keystatic from '@keystatic/astro'
import tailwindcss from '@tailwindcss/vite'
import umami from '@yeskunall/astro-umami'
import { defineConfig, envField } from 'astro/config'
import favicons from 'astro-favicons'
import robots from 'astro-robots'

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
		css: {
			transformer: 'lightningcss'
		},
		plugins: [tailwindcss()]
	},

	site: config.site,
	adapter: vercel()
})
