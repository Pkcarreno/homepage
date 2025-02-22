import { z } from 'astro:schema'

import projects from '@/data/projects.json'

const _projectsSchema = z.object({
  list: z.array(
    z.object({
      title: z.string(),
      description: z.object({
        es: z.string(),
        en: z.string().optional()
      }),
      url: z.string().url()
    })
  )
})

type projectsType = z.infer<typeof _projectsSchema>

export const getProjects: () => Promise<projectsType> = async () => {
  return projects
}
