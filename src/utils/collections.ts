import { type CollectionEntry, getCollection } from 'astro:content'

export type escritosType = CollectionEntry<'escritos'>

export const getAllEscritos: () => Promise<escritosType[]> = async () => {
  const entries: escritosType[] = await getCollection('escritos')
  return entries
    .filter(entry => import.meta.env.DEV || !entry.data.draft)
    .map(entry => {
      if (entry.data.draft) {
        console.log('entro al draft')
        entry.data.title = `${entry.data.title} [DRAFT]`
      }
      return entry
    })
    .sort(
      (entryA, entryB) =>
        new Date(entryB.data.pubDate).getTime() -
        new Date(entryA.data.pubDate).getTime()
    )
}

export const getEscritosById = async () => {
  return (await getAllEscritos()).map(entry => ({
    params: { id: entry.id },
    props: { entry }
  }))
}

export const getEscritosByTag = async () => {
  const allEntries = await getAllEscritos()

  const uniqueTags = [
    ...new Set(allEntries.map(entry => entry.data.tags).flat())
  ]

  return uniqueTags.map((tag: string) => {
    const filteredEntries = allEntries.filter(entry =>
      entry.data.tags?.includes(tag)
    )
    return {
      params: { tag },
      props: { entries: filteredEntries, tag }
    }
  })
}
