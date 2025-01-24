import type { HTMLAttributes } from 'astro/types'

export type LinkProps = HTMLAttributes<'a'> & {
  unstyled?: boolean
}
