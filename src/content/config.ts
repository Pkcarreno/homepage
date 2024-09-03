import { defineCollection, z } from 'astro:content'

const writeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string().optional()),
    date: z.date().transform(str => new Date(str)),
    image: z.string().optional()
  })
})

export const collections = {
  escritos: writeCollection
}
