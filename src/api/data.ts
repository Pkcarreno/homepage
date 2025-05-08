import { z } from 'astro:schema'

import contacts from '@/data/contacts.json'
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

export const getNavigations: () => Promise<navigationsType['list']> = async () => {
	return navigations.list
}

const _contactsSchema = z.object({
	list: z.array(
		z.object({
			label: z.string(),
			link: z.object({
				label: z.string(),
				href: z.string().url()
			})
		})
	)
})

type contactsType = z.infer<typeof _contactsSchema>

export const getContacts: () => Promise<contactsType['list']> = async () => {
	return contacts.list
}
