import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js'
import type { APIRoute } from 'astro'
import satori from 'satori'
import { html as toReactElement } from 'satori-html'

import { getAllEscritos } from '@/utils/collections'

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

const height = 600
const width = 1200

const writtings = await getAllEscritos()

export function getStaticPaths() {
  return writtings.map(entry => ({
    params: { id: entry.id },
    props: { title: entry.data.title, description: entry.data.description }
  }))
}

export const GET: APIRoute = async ({ params, props }) => {
  const title = props.title.trim() ?? 'Blogpost'
  const description = props.description ?? null
  const link = import.meta.env.SITE + '/escritos/' + params.id
  const html = toReactElement(`
    <div
      tw="flex flex-col w-full h-full bg-[#fffaeb] px-16 py-8 border-b-8 border-[#514a43] text-[#140d05]"
      style={{ fontFamily: 'IA Writer Duo' }}
    >
        <div tw="flex w-full justify-end mb-18">
          <div tw="text-7xl font-bold flex-1">${title}</div>
          <div tw="flex flex-col text-5xl font-light pl-14">
            <div tw="text-lg mr-1">por</div>
            <div>PK</div>
          </div>
        </div> 
        <div tw="text-3xl text-[#514a43] mb-4">
          ___
        </div>
        <div tw="text-4xl font-light text-[#514a43] hyphens-auto flex-1">
          ${description}
        </div>
        <div tw="text-3xl font-light text-[#514a43]">
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
