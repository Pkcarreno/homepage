import fs from 'node:fs'

import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js'
import type { APIRoute } from 'astro'
import satori from 'satori'
import { html as toReactElement } from 'satori-html'

const fontDataRegular = fs.readFileSync(
  'node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-400-normal.woff'
)
const fontDataBold = fs.readFileSync(
  'node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-700-normal.woff'
)

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
