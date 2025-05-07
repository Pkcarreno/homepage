import { readFileSync } from 'node:fs'

import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js'
import satori from 'satori'
import { html as toReactElement } from 'satori-html'
import { renderSVG } from 'uqr'

interface generateImage {
  title: string
  subtitle?: string
  description?: string
  url: string
  mode?: 'dark' | 'light'
}

const generateOgImage = async (props: generateImage): Promise<Buffer> => {
  const fontDataRegular = readFileSync(
    'node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-400-normal.woff'
  )
  const fontDataBold = readFileSync(
    'node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-700-normal.woff'
  )

  const height = 630
  const width = 1200

  const htmlContent = generateHtmlContent(props)

  const image = await satori(htmlContent as React.ReactNode, {
    width,
    height,
    fonts: [
      {
        name: 'IA Writer Duo',
        data: fontDataRegular,
        style: 'normal',
        weight: 400
      },
      {
        name: 'IA Writer Duo',
        data: fontDataBold,
        style: 'normal',
        weight: 700
      }
    ]
  })

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width',
      value: width
    }
  }
  const resvg = new Resvg(image, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return pngBuffer
}

const htmlVariants = {
  dark: {
    colors: {
      background: '#140f00',
      foreground: '#d8cec2',
      'muted-foreground': '#a29b86'
    }
  },
  light: {
    colors: {
      background: '#fffaeb',
      foreground: '#140d05',
      'muted-foreground': '#68614a'
    }
  }
}

const generateHtmlContent = ({
  title,
  subtitle,
  description,
  url,
  mode = 'light'
}: generateImage) => {
  const fmtTitle = setStringSizeLimit(title, 40)
  const fmtDescription = setStringSizeLimit(description, 140)

  const variant = htmlVariants[mode]

  const svg = renderSVG(url, {
    ecc: 'L',
    border: 0,
    whiteColor: variant.colors.background,
    blackColor: variant.colors['muted-foreground'],
    pixelSize: 8
  })

  const html = toReactElement(`
    <div tw="flex h-screen flex-col bg-[${variant.colors.background}] px-12 py-6 text-[${variant.colors.foreground}]" style={{ fontFamily: 'IA Writer Duo' }}>
      <div tw="flex flex-1 gap-4">
        <div tw="flex flex-col flex-1 mr-2">
          <h2 tw="text-6xl mb-0">${fmtTitle}</h2>
          ${subtitle ? `<span tw="text-4xl italic text-[${variant.colors['muted-foreground']}]">${subtitle}</span>` : ''}
        </div>

        <div tw="flex">${svg}</div>
      </div>

      ${
        fmtDescription
          ? `
        <span tw="text-4xl text-[${variant.colors['muted-foreground']}]">---</span>
        <div tw="flex flex-1 hyphens-auto break-words">
          <p tw="m-0 text-4xl">${fmtDescription}</p>
        </div>
`
          : ''
      }

      <span tw="text-4xl text-[${variant.colors['muted-foreground']}]">
        ${url}
      </span>
    </div>
  `)

  return html
}

const setStringSizeLimit = (
  string: string | undefined,
  maxCharacters: number
) => {
  return (
    string &&
    `${string.substring(0, maxCharacters)}${string.length > maxCharacters ? '...' : ''}`
  )
}

export default generateOgImage
