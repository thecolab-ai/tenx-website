# tenX website

Static-first Astro 5 marketing site for tenX at `tenxtalent.ai`.

## Stack

- Astro `5.18.1`
- Tailwind CSS `4.3.0` via `@tailwindcss/vite`
- TypeScript strict
- MDX content collections for articles
- Cloudflare Pages static output in `dist`
- Cloudflare Pages Functions stubs in `functions/api`
- Schema.org JSON-LD, OpenGraph, Twitter cards, sitemap, robots.txt, and llms.txt

No client JS framework is used. The only browser script is a small theme toggle.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm check
```

`pnpm build` runs `astro check` before `astro build`.

## Environment

Copy `.env.example` if local overrides are needed. Do not commit `.env`.

```bash
PUBLIC_SITE_URL=https://tenxtalent.ai
TENX_SANDBOX_URL=https://app.tenxtalent.ai/sandbox
```

The sandbox URL is currently hard-coded in the success page as the launch placeholder.

## Cloudflare Pages

`wrangler.toml` sets:

```toml
pages_build_output_dir = "dist"
```

Build command:

```bash
pnpm build
```

Do not deploy from this repo without Adam wiring the Cloudflare project.

## Forms

Candidate form:

- Page: `/apply`
- Action: `/api/apply`
- Success: `/apply/success`
- Function: `functions/api/apply.ts`

Employer waitlist:

- Page: `/hire`
- Action: `/api/hire`
- Success: `/hire/thanks`
- Function: `functions/api/hire.ts`

The functions currently log submitted form fields and redirect. Wire storage, email, CRM, or queue handling later.

## Adding roles

Edit `src/data/roles.json`. Each role automatically creates:

- `/hire/[role]`
- `/hire/[role]/[city]` for every city
- `/salary/[role]`
- `/salary/[role]/[city]` for every city

Required fields:

- `slug`
- `title`
- `shortTitle`
- `summary`
- `skills`
- `badges`
- `salaryMin`
- `salaryMax`
- `contractMonthlyMin`
- `contractMonthlyMax`

## Adding cities

Edit `src/data/cities.json`. Each city automatically expands the role-city and salary-city grids.

Use `status: "open"` for launch markets and `status: "opening-june-2026"` for soft-gated AUS markets.

## Adding comparison pages

Edit `src/data/competitors.json`. Each entry creates `/vs/[competitor]`.

Include a source URL for pricing or marketplace context. Label rumoured margins as rumoured, not official disclosures.

## Adding articles

Add MDX files to `src/content/blog`.

Required frontmatter:

```yaml
title: "Article title"
description: "Search description"
pubDate: 2026-05-11
author: "tenX editorial"
```

Optional `faqs` frontmatter is rendered into FAQPage JSON-LD on the article page.

## SEO and GEO

- Global JSON-LD is emitted by `src/layouts/BaseLayout.astro`.
- Page-specific schemas are passed from each page.
- `@astrojs/sitemap` generates the sitemap during build.
- `public/robots.txt` allows major search and LLM crawlers.
- `public/llms.txt` summarises the network, pricing, and hiring flows for LLM citation.

## Analytics

No analytics tracking is installed. If Adam wants Plausible, Fathom, PostHog, or Cloudflare Web Analytics later, add it explicitly and document the privacy tradeoff before shipping.
