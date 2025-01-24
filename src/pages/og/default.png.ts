import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js'
import type { APIRoute } from 'astro'
import satori from 'satori'
import { html as toReactElement } from 'satori-html'

const getFontPath = ({
  weight,
  style = 'normal',
  format = 'woff2'
}: {
  weight: '400' | '700'
  style?: 'normal' | 'italic'
  format?: 'woff' | 'woff2'
}) =>
  `https://cdn.jsdelivr.net/fontsource/fonts/ia-writer-duo@latest/latin-${weight}-${style}.${format}`

const fontFileRegular = await fetch(
  getFontPath({
    weight: '400',
    format: 'woff'
  })
)
const fontFileBold = await fetch(
  getFontPath({
    weight: '700',
    format: 'woff'
  })
)
const fontDataRegular: ArrayBuffer = await fontFileRegular.arrayBuffer()
const fontDataBold: ArrayBuffer = await fontFileBold.arrayBuffer()

const height = 630
const width = 1200

export const GET: APIRoute = async () => {
  const link = import.meta.env.SITE
  const html = toReactElement(`
    <div
      tw="flex flex-col w-full h-full bg-[#140f00] px-16 py-8 border-b-8 border-[#bcb5ae] text-[#fcfaf8]"
      style={{ fontFamily: 'IA Writer Duo' }}
    >
        <div tw="flex flex-1 justify-center items-center w-full mb-18">
          <div tw="text-8xl font-bold">Pedro Carreño</div>
        </div> 
        <div tw="text-3xl font-light text-[#bcb5ae]">
          ${link}
        </div>
    </div>
  `)

  const svg = await satori(html as React.ReactNode, {
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
    ],
    height,
    width
  })

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width',
      value: width
    }
  }
  const resvg = new Resvg(svg, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer, {
    headers: {
      'content-type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
