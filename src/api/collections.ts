import { type CollectionEntry, getCollection } from 'astro:content'

export type writingsType = CollectionEntry<'writings'>

export const getAllWritings: () => Promise<writingsType[]> = async () => {
	const entries: writingsType[] = await getCollection('writings', ({ data }) => {
		return import.meta.env.DEV || !data.draft
	})

	return entries
		.map(entry => {
			if (entry.data.draft) {
				entry.data.title = `${entry.data.title} [DRAFT]`
			}
			return entry
		})
		.sort(
			(entryA, entryB) =>
				new Date(entryB.data.pubDate).getTime() - new Date(entryA.data.pubDate).getTime()
		)
}

export const getWritingsById = async () => {
	return (await getAllWritings()).map(entry => ({
		params: { id: entry.id },
		props: { entry }
	}))
}

export const getWritingsByTag = async () => {
	const allEntries = await getAllWritings()

	const uniqueTags = [...new Set(allEntries.flatMap(entry => entry.data.tags))]

	return uniqueTags.map((tag: string) => {
		const filteredEntries = allEntries.filter(entry => entry.data.tags?.includes(tag))
		return {
			params: { tag },
			props: { entries: filteredEntries, tag }
		}
	})
}
