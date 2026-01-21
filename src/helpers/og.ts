import { readFileSync } from "node:fs";

import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js";
import satori from "satori";
import { html as toReactElement } from "satori-html";
import { renderSVG } from "uqr";
import { getFormattedDate } from "./time";
import { generateHash } from "./visuals";

interface generateImage {
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  date?: Date;
  mode?: "dark" | "light";
}

const generateOgImage = async (props: generateImage): Promise<Buffer> => {
  const fontDataRegular = readFileSync(
    "node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-400-normal.woff"
  );
  const fontDataBold = readFileSync(
    "node_modules/@fontsource/ia-writer-duo/files/ia-writer-duo-latin-700-normal.woff"
  );

  const height = 630;
  const width = 1200;

  const htmlContent = generateHtmlContent(props);

  const image = await satori(htmlContent, {
    width,
    height,
    fonts: [
      {
        name: "IA Writer Duo",
        data: fontDataRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "IA Writer Duo",
        data: fontDataBold,
        style: "normal",
        weight: 700,
      },
    ],
  });

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: "width",
      value: width,
    },
  };
  const resvg = new Resvg(image, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};

const htmlVariants = {
  dark: {
    colors: {
      light: "#140f00",
      lesslight: "#282213",
      dark: "#bbb1a5",
      moredark: "#d8cec2",
    },
  },
  light: {
    colors: {
      light: "#fffaeb",
      lesslight: "#e8e2d4",
      dark: "#4c453b",
      moredark: "#140d05",
    },
  },
};

const generateHtmlContent = ({
  title,
  subtitle,
  description,
  date,
  url,
  mode = "light",
}: generateImage) => {
  const fmtTitle = setStringSizeLimit(title, 40);
  const fmtDescription = setStringSizeLimit(description, 140);

  const variant = htmlVariants[mode];

  const svg = renderSVG(url, {
    ecc: "L",
    border: 0,
    whiteColor: variant.colors.light,
    blackColor: variant.colors.dark,
    pixelSize: 7,
  });

  const hash = generateHash(url);

  const html = toReactElement(`
<div tw="flex h-screen flex-col bg-[${variant.colors.light}] p-12 text-[${variant.colors.dark}] relative" style="font-family: 'IA Writer Duo'">
    
    <div tw="absolute top-4 right-12 text-2xl opacity-50 text-[${variant.colors.lesslight}]">
      ${hash}
    </div>

    <div tw="flex flex-col mb-4">
      <h1 tw="text-7xl font-bold m-0 leading-none text-[${variant.colors.moredark}]">
        ${fmtTitle}
      </h1>
      <div tw="flex items-baseline mt-2">
        ${subtitle ? `<span tw="text-4xl mr-2 lowercase">${subtitle}</span>` : ""}
        ${date ? `<span tw="text-2xl">/ ${getFormattedDate(date)}</span>` : ""}
      </div>
    </div>

    <div tw="text-4xl mb-6 opacity-40">/////////</div>

    <div tw="flex flex-1">
      <div tw="flex flex-col flex-1 w-full gap-10">
        
        <div tw="flex flex-col flex-1 justify-between">
          <div tw="flex flex-col">
            ${fmtDescription ? `<p tw="text-4xl text-[${variant.colors.moredark}] leading-tight m-0">${fmtDescription}</p>` : ""}
          </div>
        </div>

        <div tw="text-2xl mt-8 opacity-60">
          ${url}
        </div>
      </div>

      <div tw="flex items-end h-fit">
        <div tw="flex">${svg}</div>
      </div>
    </div>
  </div>
  `);

  return html;
};

const setStringSizeLimit = (
  string: string | undefined,
  maxCharacters: number
) => {
  return (
    string &&
    `${string.substring(0, maxCharacters)}${string.length > maxCharacters ? "..." : ""}`
  );
};

export default generateOgImage;
