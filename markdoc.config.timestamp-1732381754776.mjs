// markdoc.config.js
import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
var markdoc_config_default = defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      render: component("./src/components/ui/Link.astro")
    },
    image: {
      ...nodes.image,
      render: component("./src/components/ui/Image.astro")
    }
  },
  extends: [
    shiki({
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine"
      },
      defaultColor: false
    })
  ]
});
export {
  markdoc_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFya2RvYy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGNvbXBvbmVudCwgZGVmaW5lTWFya2RvY0NvbmZpZywgbm9kZXMgfSBmcm9tICdAYXN0cm9qcy9tYXJrZG9jL2NvbmZpZydcbmltcG9ydCBzaGlraSBmcm9tICdAYXN0cm9qcy9tYXJrZG9jL3NoaWtpJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYXJrZG9jQ29uZmlnKHtcbiAgbm9kZXM6IHtcbiAgICBsaW5rOiB7XG4gICAgICAuLi5ub2Rlcy5saW5rLFxuICAgICAgcmVuZGVyOiBjb21wb25lbnQoJy4vc3JjL2NvbXBvbmVudHMvdWkvTGluay5hc3RybycpXG4gICAgfSxcbiAgICBpbWFnZToge1xuICAgICAgLi4ubm9kZXMuaW1hZ2UsXG4gICAgICByZW5kZXI6IGNvbXBvbmVudCgnLi9zcmMvY29tcG9uZW50cy91aS9JbWFnZS5hc3RybycpXG4gICAgfVxuICB9LFxuICBleHRlbmRzOiBbXG4gICAgc2hpa2koe1xuICAgICAgdGhlbWVzOiB7XG4gICAgICAgIGxpZ2h0OiAncm9zZS1waW5lLWRhd24nLFxuICAgICAgICBkYXJrOiAncm9zZS1waW5lJ1xuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb2xvcjogZmFsc2VcbiAgICB9KVxuICBdXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsV0FBVyxxQkFBcUIsYUFBYTtBQUN0RCxPQUFPLFdBQVc7QUFFbEIsSUFBTyx5QkFBUSxvQkFBb0I7QUFBQSxFQUNqQyxPQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsTUFDSixHQUFHLE1BQU07QUFBQSxNQUNULFFBQVEsVUFBVSxnQ0FBZ0M7QUFBQSxJQUNwRDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsR0FBRyxNQUFNO0FBQUEsTUFDVCxRQUFRLFVBQVUsaUNBQWlDO0FBQUEsSUFDckQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
