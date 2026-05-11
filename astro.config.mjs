import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// We deploy to GitHub Pages at https://thecolab-ai.github.io/tenx-website/
// until DNS for tenxtalent.ai is pointed at Pages. Override via env once live:
//   SITE_URL=https://tenxtalent.ai BASE_PATH=/ pnpm build
const site = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://thecolab-ai.github.io";
const base = process.env.BASE_PATH ?? "/tenx-website";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  output: "static",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
