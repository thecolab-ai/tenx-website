# AGENTS.md — tenX website operating rules for AI agents

Any agent (Claude, Codex, etc.) working in this repo MUST read both of these before touching anything:

- **`STYLE_GUIDE.md`** — visual design system, tokens, components, accessibility minimums, anti-patterns
- **`COPY_PLAYBOOK.md`** — voice, banned words, page formulas, GEO patterns, blog rules

If `STYLE_GUIDE.md` or `COPY_PLAYBOOK.md` and a draft disagree, the guide wins. Rewrite the draft.

---

## Work routing

This repo is improved continuously by sub-agent sessions spawned from an orchestrator. Routing rule:

- **Claude** handles design, copy, UX, hero rewrites, layout decisions, visual polish, content writing, blog articles, programmatic page templates, brand voice.
- **Codex** handles engineering grunt: programmatic page generation from data files, scaffolding new templates, schema markup, build fixes, CI tweaks, data file expansion (roles/cities/competitors), refactors, dependency upgrades.

If a task crosses both (e.g. "write 5 new role hub pages"), Claude drafts the copy + structure first, codex wires it into the data layer and template.

---

## Locked brand decisions (never contradict)

- **Brand name:** tenX (not "10x", not "tenxtalent" — the domain is the URL, not the name).
- **Domain:** tenxtalent.ai (live). Site currently deploys to `https://thecolab-ai.github.io/tenx-website/` until DNS is wired.
- **Independent brand.** No mention of TheColab on the site. No cross-linking, no "by TheColab" framing.
- **Model-agnostic positioning.** Hero is "AI-verified engineers. Fluent across Claude, OpenAI, Google. Hired in days." Never lead with "Anthropic-credentialed".
- **Pricing published:** 10% perm / 20% contractor loading. Always specific numbers.
- **Candidate-first launch.** Primary CTA: "Apply as an engineer" → /apply. Secondary: "Hire engineers" → /hire (waitlist soft-gate).
- **Network claim at launch:** 100 AI-verified engineers.
- **Geography:** NZ first (Auckland, Wellington, Christchurch) → AUS (Sydney, Melbourne, Brisbane, Perth) → US/UK/EU phased.
- **Default locale:** en-NZ.
- **Vetting mechanism:** self-service sandbox tests ("Star Trek tests"), badge-based, zero founder calls.

---

## Repo conventions

- **Stack:** Astro 5 static, Tailwind, TypeScript strict, MDX for articles, `output: "static"`, deployed via GitHub Actions to GH Pages.
- **Base path:** astro config uses `base: "/tenx-website"` for github.io deployment. Will flip to empty once tenxtalent.ai DNS is live (override via `BASE_PATH` env if needed).
- **Internal links** must use `import.meta.env.BASE_URL` or Astro's relative path patterns — never hardcode `/apply`, always `${import.meta.env.BASE_URL}apply` or equivalent.
- **Data lives in `/src/data/*.json`** — roles, cities, competitors, industries. Expanding the dataset shouldn't require code changes.
- **Programmatic pages** must inherit the universal skeleton (see STYLE_GUIDE §3.6). Same chrome, different content.
- **Every page** ships with: title, meta description, canonical, OG, Twitter card, JSON-LD schema (Organization + WebSite + page-specific).
- **Builds must pass.** `pnpm run build` zero errors. Never push a broken build.

---

## Per-cycle improvement workflow

When a cron-spawned session works on this repo:

1. Use a unique working dir (e.g. `/tmp/tenx-cron-$(date +%s)`).
2. Clone main, read `CONTINUOUS_IMPROVEMENT.md` for next move.
3. Pull latest. If commits exist in the last 25 minutes from another agent, pick a non-overlapping file area.
4. Load the live site with Playwright (desktop 1280x800 + mobile 375x812). Screenshot at least 4 pages. Look for visual / copy / layout issues.
5. Pick ONE focused improvement (visual bug fix, copy tighten, new pSEO page batch, new blog article, etc).
6. Spawn the right agent (Claude for design/copy, codex for engineering — see routing above).
7. Verify `pnpm run build` passes locally before committing.
8. Push to main. Wait for GH Action to complete green.
9. Re-screenshot to confirm the change landed.
10. Update `CONTINUOUS_IMPROVEMENT.md` — mark done, add 2-3 new ideas.

---

## Hard rules

- Never push a failing build to main.
- Never use banned words from `COPY_PLAYBOOK.md` §2.
- Never use a design pattern in `STYLE_GUIDE.md` §4 anti-patterns.
- Never mention TheColab on the site.
- Never lead with vendor credential ("Anthropic-credentialed", "OpenAI partner") as the hero hook.
- Never reuse `/tmp/tenx-cron-*` paths across cron firings.
- Never spawn two coding agents into the same working directory.
- Never commit secrets. `.env.example` for shape, real `.env` in `.gitignore`.
- Never use Lorem Ipsum on a shipped page. If we don't have real content, don't ship the page.
- Never claim a number ("100 engineers", "1,247 vetted") without it being accurate or marked as a launch target.
