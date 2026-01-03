import type { APIRoute } from 'astro'

import { getAllWritings } from '@/api/collections'
import generateOgImage from '@/lib/generate-og-image'

const writtings = await getAllWritings()

export function getStaticPaths() {
	return writtings.map(entry => ({
		params: { id: entry.id },
		props: { title: entry.data.title, description: entry.data.description }
	}))
}

export const GET: APIRoute = async ({ params, props }) => {
	const title = props.title.trim() ?? 'Blogpost'
	const description = props.description ?? null
	const link = `${import.meta.env.SITE}/escritos/${params.id}`

	const pngBuffer = await generateOgImage({
		title: title,
		subtitle: 'by pkcarreno',
		description: description,
		mode: 'light',
		url: link
	})

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			'content-type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	})
}
