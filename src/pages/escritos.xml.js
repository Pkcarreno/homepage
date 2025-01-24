import rss from '@astrojs/rss'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

import { getAllEscritos } from '@/data/collections'
const parser = new MarkdownIt()

export async function GET(context) {
  const entries = await getAllEscritos()
  return rss({
    title: 'Escritos de Pedro C.',
    description: 'Ideas sobre tecnología, programación y privacidad.',
    site: context.site,
    items: entries.map(entry => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description,
      link: `/escritos/${entry.id}`,
      content: sanitizeHtml(parser.render(entry.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      })
    })),
    customData: `<language>es</language>`
  })
}
