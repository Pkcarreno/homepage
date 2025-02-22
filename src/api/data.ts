import { z } from 'astro:schema'

import navigations from '@/data/navigations.json'
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

export const getProjects: () => Promise<projectsType['list']> = async () => {
  return projects.list
}

const _navigationsSchema = z.object({
  list: z.array(
    z.object({
      label: z.string(),
      href: z.string().url(),
      options: z.object({
        target: z.string().optional(),
        rel: z.string().optional()
      })
    })
  )
})

type navigationsType = z.infer<typeof _navigationsSchema>

export const getNavigations: () => Promise<
  navigationsType['list']
> = async () => {
  return navigations.list
}
