import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const writings = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.mdoc',
    base: './src/content/escritos'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    draft: z.boolean().default(true),
    keywords: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date().transform(str => new Date(str)),
    lastMod: z.date().transform(str => new Date(str)),
    heroImage: z.string().optional()
  })
})

export const collections = {
  writings
}
