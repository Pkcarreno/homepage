import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      render: component("./src/components/atoms/anchor.astro"),
    },
    image: {
      ...nodes.image,
      render: component("./src/components/atoms/image.astro"),
    },
  },
});
