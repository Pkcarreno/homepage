import type { APIRoute } from "astro";
import generateOgImage from "@/helpers/og";
import { getCollectionWithDates } from "@/helpers/time";

export async function getStaticPaths() {
  return (await getCollectionWithDates("journals")).map((entry) => ({
    params: { id: entry.id },
    props: {
      title: entry.data.title,
      description: entry.data.description,
      date: entry.data.created,
    },
  }));
}

export const GET: APIRoute = async ({ params, props }) => {
  const title = props.title.trim();
  const description = props.description ?? null;
  const link = `${import.meta.env.SITE}/journal/${params.id}`;

  const pngBuffer = await generateOgImage({
    title,
    subtitle: "journal",
    description,
    date: props.date,
    mode: "light",
    url: link,
  });

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "content-type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
