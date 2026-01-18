import { z } from "astro/zod";

export const StructuredDataSchema = z.object({
  "@context": z.literal("https://schema.org").default("https://schema.org"),
  "@type": z.literal("WebSite"),
  publisher: z.object({
    "@type": z.literal("Person"),
    givenName: z.literal("pk"),
  }),
  url: z.string().url(),
  mainEntityOfPage: z.object({
    "@type": z.literal("WebPage"),
    "@id": z.string().url(),
  }),
  description: z.string(),
});

export type StructuredData = z.infer<typeof StructuredDataSchema>;
