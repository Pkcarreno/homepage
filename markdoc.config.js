import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config'
import shiki from '@astrojs/markdoc/shiki'

export default defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      render: component('./src/components/ui/Link.astro')
    },
    image: {
      ...nodes.image,
      render: component('./src/components/ui/Image.astro')
    }
  },
  extends: [
    shiki({
      themes: {
        light: 'rose-pine-dawn',
        dark: 'rose-pine'
      },
      defaultColor: false
    })
  ]
})
