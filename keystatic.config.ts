import { config, fields, collection } from '@keystatic/core'

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? {
          kind: 'local'
        }
      : {
          kind: 'github',
          repo: `Pkcarreno/hompage-collection`
        },
  ui: {
    brand: { name: 'PK Blog' }
  },
  collections: {
    escritos: collection({
      label: 'Escritos',
      slugField: 'title',
      path: 'src/content/escritos/*',
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
