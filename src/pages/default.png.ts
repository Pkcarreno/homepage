import type { APIRoute } from "astro";

import generateOgImage from "@/helpers/og";

export const GET: APIRoute = async () => {
  const link = import.meta.env.SITE;

  const pngBuffer = await generateOgImage({
    title: "Pedro C",
    subtitle: "Frontend Engineer",
    mode: "dark",
    url: link,
  });

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "content-type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
