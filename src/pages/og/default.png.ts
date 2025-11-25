import type { APIRoute } from 'astro'

import generateOgImage from '@/lib/generate-og-image'

export const GET: APIRoute = async () => {
	const link = import.meta.env.SITE

	const png = await generateOgImage({
		title: 'Pedro C',
		subtitle: 'frontend & mobile dev',
		mode: 'dark',
		url: link
	})

  // @ts-ignore
	return new Response(png, {
		headers: {
			'content-type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	})
}
