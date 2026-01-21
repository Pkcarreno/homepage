import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const journals = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdoc",
    base: "./src/content/journals",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    tags: z.array(z.string()).optional(),
    og: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdoc",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    tags: z.array(z.string()).optional(),
    og: z.string().optional(),
  }),
});

export const collections = {
  journals,
  projects,
};
