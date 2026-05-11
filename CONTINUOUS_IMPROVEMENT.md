# tenX Website — Continuous Improvement Queue

Last updated: 2026-05-12 (cycle 5)

## Completed
- [x] Initial Astro scaffold (2026-05-11)
- [x] Dynamic /hire/[role]/[city] pages — 40 pages, 8 roles × 5 cities (2026-05-11)
- [x] Role hub pages /hire/[role]/ — 8 pages (2026-05-11)
- [x] Blog: "What is an LLM Engineer?" (2026-05-11)
- [x] Blog: "How to hire an AI engineer in 2026" (2026-05-11)
- [x] Blog: "Toptal vs Turing vs tenX for AI engineering" (2026-05-11)
- [x] Blog: "What makes an AI engineer verified?" (2026-05-11)
- [x] /vs/[competitor] pages — toptal, turing, andela, arc-dev, lemon-io (5 pages live, 2026-05-11)
- [x] Blog: "AI hiring in New Zealand in 2026" (2026-05-11)
- [x] Blog: "RAG engineer vs AI engineer" — definitional piece, links to role hubs (2026-05-11)

## Next (priority order)
- [x] Blog: "How tenX verifies AI engineers (without a phone screen)" — explains mechanism, key trust signal (2026-05-12)
- [ ] /hire/[industry] industry hub pages — fintech, healthtech, saas, govtech (4 pages + role variants)
- [x] Apply page copy tightening — feature cards now eyebrow/title/body per STYLE_GUIDE §2; sub-hero tightened (2026-05-12)
- [ ] Internal linking audit — surface /hire/[role]/[city] links from homepage and network page
- [ ] /hire/[role]/[city] pages for expanded roles: agent-engineer, data-engineer (add to roles.json first)
- [ ] /network page enhancements — add badge filter UI
- [ ] Schema improvements — add HowTo schema to how-it-works page
- [ ] /vs/toptal copy refresh — tighten the narrative section below the table, sharper closing CTA
- [ ] OG images — custom social cards per page (currently using defaults)
- [x] Blog: "The sandbox tests every tenX engineer passes" — 9 badge areas, full pass criteria, retake policy, FAQPage schema; companion piece to /vetting (2026-05-12)
- [x] Blog: "Why 'top 1%' stopped meaning anything in AI hiring" — contrarian take on Toptal/Turing's percentile claims vs evidence-based badge verification; links to /vs/toptal and /vs/turing (2026-05-12)
- [x] Blog: "Agent engineer vs AI engineer — scope, skills, salary" — definitional piece; tool design, loop contracts, observability, evals; NZD/AUD salary bands; FAQPage schema (2026-05-11)
- [x] /vetting page — standalone page detailing the full test rubric with badge areas, pass criteria, and cooldown/retry policy; becomes the primary internal link target from all articles and role hubs (2026-05-12)
- [ ] Salary guide pages /salary/[role]/[city] — target "LLM engineer salary Auckland" and similar queries; noindex until data is real, then flip

## New ideas (added 2026-05-12)
- [ ] Link /vetting from role hub pages (/hire/[role]) — each role hub should have a "vetting for this role" section that names the specific badges required and links to the relevant /vetting#[badge-slug] anchor
- [ ] Blog: "The 14 sandbox tests every tenX engineer passes" — deep-dive companion piece to /vetting, follows each badge in detail, explains failure modes seen in the platform; primary internal link from /vetting page; strong GEO target ("how to pass tenX vetting")
- [ ] /vs pages: add "vetting depth" row to comparison table — shows that tenX publishes a full rubric at /vetting while competitors describe vetting only in marketing language; link the rubric from each /vs page
- [ ] Fix article pubDate for sandbox-tests article — set to 2026-05-12 so it sorts correctly in blog index (currently shows as 11 May, one day behind)
- [ ] Link sandbox article from /vetting page — add a "deep dive" reference to the article from the /vetting page intro section
- [x] Model fluency chips on homepage — updated the chips to provider-level names per COPY_PLAYBOOK

## New ideas (added 2026-05-12, cycle 5)
- [ ] /hire/[industry] pages missing from nav — add industry hubs to the Hire dropdown so fintech/healthtech/saas/govtech are discoverable
- [ ] Internal link from apply page to /vetting — candidates should be able to see the test rubric before applying; add a "See what we test for" link near the feature cards
- [ ] Blog: "The forward-deployed engineer — what the role actually is and why every AI company is hiring one" — definitional piece, strong search value, links to /hire/forward-deployed-engineer

## New ideas (added 2026-05-11, cycle 4)
- [ ] Blog: "The forward-deployed engineer — what the role actually is and why every AI company is hiring one" — follows same definitional format as RAG and agent pieces; strong search value; links to /hire/forward-deployed-engineer
- [ ] Add agent-engineer to roles.json and generate /hire/agent-engineer role hub and city pages — the agent engineer article now needs a role hub to link into; adds 5+ more programmatic pages
- [ ] /salary/[role] pages (non-noindex) — start with ai-engineer and llm-engineer since real data ranges exist in roles.json; these are the highest-traffic salary queries for NZ/AUS
