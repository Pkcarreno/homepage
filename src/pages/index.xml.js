import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getCollectionWithDates } from "@/helpers/time";

const parser = new MarkdownIt();

export async function GET(context) {
  const journals = await getCollectionWithDates("journals");
  return rss({
    title: "pkcarreno",
    description: "The journal of pk",
    site: context.site,
    items: journals.map((journal) => ({
      title: journal.data.title,
      pubDate: journal.data.created.toISOString(),
      author: "34664891+Pkcarreno@users.noreply.github.com (pk)",
      description: journal.data.description,
      link: `/journal/${journal.id}`,
      content: sanitizeHtml(parser.render(journal.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: "<language>en</language>",
  });
}
