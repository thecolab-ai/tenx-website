import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Until tenxtalent.ai DNS is pointed at GH Pages we deploy at
// https://thecolab-ai.github.io/tenx-website/ — set site/base accordingly.
// Override via env (SITE_URL, BASE_PATH) once the custom domain is wired.
const site = process.env.SITE_URL || "https://thecolab-ai.github.io";
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
