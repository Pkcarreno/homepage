import type { LinkProps } from '@/components/ui/Link.type'

interface NavigationProps {
  label: string
  linkProps: LinkProps
}

export const navigations: NavigationProps[] = [
  {
    label: 'Sobre mí',
    linkProps: {
      href: '/sobre-mi'
    }
  },
  {
    label: 'Proyectos',
    linkProps: {
      href: '/proyectos'
    }
  },
  {
    label: 'Escritos',
    linkProps: {
      href: '/escritos'
    }
  },
  {
    label: 'Contacto',
    linkProps: {
      href: '/contacto'
    }
  },
  {
    label: 'GitHub',
    linkProps: {
      href: 'https://github.com/Pkcarreno'
    }
  },
  {
    label: 'LinkedIn',
    linkProps: {
      href: 'https://www.linkedin.com/in/pkcarreno/'
    }
  },
  {
    label: 'Mastodon',
    linkProps: {
      href: 'https://mastodon.social/@Pkcarreno',
      rel: 'me'
    }
  },
  {
    label: 'RSS',
    linkProps: {
      target: '_blank',
      href: '/escritos.xml'
    }
  }
]
