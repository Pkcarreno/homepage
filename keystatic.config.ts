import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? {
          kind: 'local'
        }
      : {
          kind: 'github',
          repo: `Pkcarreno/homepage`
        },
  ui: {
    brand: { name: 'PK Blog' }
  },
  singletons: {
    navigations: singleton({
      label: 'Navigations',
      path: 'src/data/navigations',
      format: { data: 'json' },
      schema: {
        list: fields.array(
          fields.object({
            label: fields.text({
              label: 'Title',
              validation: {
                isRequired: true
              }
            }),
            href: fields.url({
              label: 'href',
              validation: {
                isRequired: true
              }
            }),
            options: fields.object(
              {
                target: fields.select({
                  label: 'Target',
                  options: [
                    {
                      label: 'Empty',
                      value: ''
                    },
                    {
                      label: '_blank',
                      value: '_blank'
                    }
                  ],
                  defaultValue: ''
                }),
                rel: fields.select({
                  label: 'Rel',
                  options: [
                    {
                      label: 'Empty',
                      value: ''
                    },
                    {
                      label: 'me',
                      value: 'me'
                    }
                  ],
                  defaultValue: ''
                })
              },
              {
                label: 'Link options'
              }
            )
          }),
          {
            label: 'Navigations',
            itemLabel: props => props.fields.label.value
          }
        )
      }
    }),
    contacts: singleton({
      label: 'Contacts',
      path: 'src/data/contacts',
      format: { data: 'json' },
      schema: {
        list: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: {
                isRequired: true
              }
            }),
            link: fields.object({
              label: fields.text({
                label: 'Link Label',
                validation: {
                  isRequired: true
                }
              }),
              href: fields.url({
                label: 'URL',
                validation: {
                  isRequired: true
                }
              })
            })
          }),
          {
            label: 'Contacts',
            itemLabel: props => props.fields.label.value
          }
        )
      }
    }),
    projects: singleton({
      label: 'Projects',
      path: 'src/data/projects',
      format: { data: 'json' },
      schema: {
        list: fields.array(
          fields.object({
            title: fields.text({
              label: 'Title',
              validation: {
                isRequired: true
              }
            }),
            description: fields.object({
              es: fields.text({
                label: 'Spanish Description',
                multiline: true,
                validation: {
                  isRequired: true
                }
              }),
              en: fields.text({
                label: 'English Description',
                multiline: true,
                validation: {
                  isRequired: false
                }
              })
            }),
            url: fields.url({
              label: 'URL',
              validation: {
                isRequired: true
              }
            })
          }),
          {
            label: 'Projects',
            itemLabel: props => props.fields.title.value
          }
        )
      }
    })
  },
  collections: {
    writings: collection({
      label: 'Writings',
      slugField: 'title',
      path: 'src/content/escritos/*',
      columns: ['title', 'draft', 'pubDate', 'lastMod'],
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true
        }),
        heroImage: fields.image({
          label: 'Hero Image'
        }),
        pubDate: fields.date({
          label: 'Published Date',
          defaultValue: {
            kind: 'today'
          }
        }),
        lastMod: fields.date({
          label: 'Last Modified',
          defaultValue: {
            kind: 'today'
          }
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description:
            'Set this post as draft to prevent it from being published',
          defaultValue: true
        }),
        tags: fields.array(fields.text({ label: 'Tags' }), {
          label: 'Tags',
          itemLabel: props => props.value
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/escritos',
              publicPath: '@assets/images/escritos/'
            }
          }
        })
      }
    })
  }
})
