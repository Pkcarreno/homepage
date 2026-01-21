import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import { defineConfig, envField } from "astro/config";
import robots from "astro-robots";
import { config } from "./src/config";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4200,
  },
  redirects: {
    "/about-me": "/about",
    "/sobre-mi": "/about",
  },
  compressHTML: true,
  prefetch: true,

  devToolbar: {
    enabled: false,
  },
  env: {
    schema: {
      UMAMI_ID: envField.string({
        access: "public",
        context: "client",
        optional: false,
      }),
      UMAMI_ENDPOINT: envField.string({
        access: "public",
        context: "client",
        optional: false,
      }),
    },
  },
  integrations: [
    robots({
      policy: [
        {
          userAgent: config.iaBotAgents,
          disallow: ["/"],
        },
      ],
    }),
    sitemap(),
    markdoc(),
    !!process.env.UMAMI_ID &&
      umami({
        id: process.env.UMAMI_ID,
        domains: ["pkcarreno.com", "www.pkcarreno.com"],
        endpointUrl: process.env.UMAMI_ENDPOINT,
        hostUrl: process.env.UMAMI_ENDPOINT,
      }),
    mdx(),
  ],

  markdown: {
    syntaxHighlight: false,
  },

  output: "static",

  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    css: {
      transformer: "lightningcss",
    },
    build: {
      cssMinify: "lightningcss",
    },
    plugins: [tailwindcss()],
  },

  site: config.site,
});
