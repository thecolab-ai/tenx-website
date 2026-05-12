import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

function rehypeTenXWordmark() {
  const skippedTags = new Set(["code", "pre", "script", "style", "textarea", "title"]);

  function wordmarkNode() {
    return {
      type: "element",
      tagName: "span",
      properties: {
        className: ["tenx-wordmark"],
        "aria-label": "tenX"
      },
      children: [
        { type: "text", value: "ten" },
        {
          type: "element",
          tagName: "sup",
          properties: { className: ["tenx-sup"] },
          children: [{ type: "text", value: "x" }]
        }
      ]
    };
  }

  function splitTextNode(node) {
    const parts = node.value.split("tenX");
    return parts.flatMap((part, index) => {
      const nodes = [];

      if (part) {
        nodes.push({ type: "text", value: part });
      }

      if (index < parts.length - 1) {
        nodes.push(wordmarkNode());
      }

      return nodes;
    });
  }

  function visit(node) {
    if (!node || typeof node !== "object" || !Array.isArray(node.children)) {
      return;
    }

    if (node.type === "element") {
      if (skippedTags.has(node.tagName)) {
        return;
      }

      const className = node.properties?.className;
      if (Array.isArray(className) && className.includes("tenx-wordmark")) {
        return;
      }
    }

    for (let index = node.children.length - 1; index >= 0; index -= 1) {
      const child = node.children[index];

      if (child.type === "text" && typeof child.value === "string" && child.value.includes("tenX")) {
        node.children.splice(index, 1, ...splitTextNode(child));
      } else {
        visit(child);
      }
    }
  }

  return visit;
}

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
    rehypePlugins: [rehypeTenXWordmark],
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
