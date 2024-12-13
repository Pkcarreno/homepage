import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const parser = new MarkdownIt()

export async function GET(context) {
  const writings = await getCollection('escritos')
  return rss({
    title: 'Escritos de Pedro C.',
    description: 'Ideas sobre tecnología, programación y privacidad.',
    site: context.site,
    items: writings
      .filter(
        entry => process.env.NODE_ENV === 'development' || !entry.data.draft
      )
      .sort(
        (entryA, entryB) =>
          new Date(entryB.data.pubDate).getTime() -
          new Date(entryA.data.pubDate).getTime()
      )
      .map(entry => ({
        title: `${entry.data.title}${entry.data.draft ? ' (draft)' : ''}`,
        pubDate: entry.data.pubDate,
        description: entry.data.description,
        link: `/escritos/${entry.slug}`,
        content: sanitizeHtml(parser.render(entry.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        })
      })),
    customData: `<language>es</language>`
  })
}
