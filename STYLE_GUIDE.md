# tenX Style Guide

The constraint set for every page, component, and programmatic template on tenxtalent.ai. If a design decision isn't in here, default to Linear / Vercel / Anthropic.com restraint. When in doubt, remove something.

---

## 0. Brand Posture

tenX is a serious engineering network. The site should feel like infrastructure documentation, not a SaaS landing page. Confident, technical, dense. The reader is a CTO, a head of engineering, or a senior engineer evaluating us. They don't need to be sold to with confetti.

- **Dark mode is default.** Light mode is a courtesy.
- **One accent colour. Period.**
- **Monospace is a design element, not a quirk.**
- **Whitespace is earned, not decorated.**
- **No motion unless it carries meaning.**

---

## 1. Visual Tokens

### 1.1 Colour Palette (Dark — default)

```
--bg-base:        #0A0A0A   /* page background, near-black, not pure */
--bg-elevated:    #111111   /* cards, header on scroll */
--bg-sunken:      #050505   /* code blocks, inset panels */

--text-primary:   #EDEDED   /* body and headings */
--text-secondary: #A1A1A1   /* supporting copy, meta */
--text-muted:     #6B6B6B   /* captions, timestamps, labels */
--text-disabled:  #3F3F3F

--border-subtle:  #1F1F1F   /* default dividers, card borders */
--border-default: #2A2A2A   /* input borders, stronger hairlines */
--border-strong:  #3F3F3F   /* hover, focus-adjacent */

--accent:         #7CFF6B   /* signal green — see argument below */
--accent-hover:   #94FF85
--accent-muted:   #1F3A1B   /* tinted backgrounds, badge fills at 12% */
--accent-ink:     #0A0A0A   /* text on accent backgrounds */

--success:        #7CFF6B   /* same as accent — intentional */
--warning:        #F5A524
--danger:         #FF6B6B
```

**Why signal green (#7CFF6B) as accent.** Every AI startup defaults to blue or purple. Blue is OpenAI, Anthropic-adjacent, generic SaaS. Purple is Cursor, Linear, Replit territory — we'd look derivative. Orange reads as Stripe / Vercel construction-cone. Green is unclaimed in the AI talent space, signals "verified / passed / shipping", and reads as a terminal prompt — which aligns with the engineer-first audience. It's also legible on near-black at WCAG AA Large for non-body usage. Use sparingly: CTAs, single-character accents, status dots, the underline on the logo's "X". Never large fills.

### 1.2 Light Mode Counterparts

```
--bg-base:        #FAFAFA
--bg-elevated:    #FFFFFF
--bg-sunken:      #F2F2F2

--text-primary:   #0A0A0A
--text-secondary: #525252
--text-muted:     #8A8A8A

--border-subtle:  #E8E8E8
--border-default: #D4D4D4
--border-strong:  #A1A1A1

--accent:         #137333   /* darker green for AA on white */
--accent-hover:   #0E5A26
--accent-muted:   #E6F4E8
--accent-ink:     #FFFFFF
```

Light mode is not a recolour — accent green darkens to maintain contrast. Test both.

### 1.3 Typography

**Heading stack (display + headings):**
```
font-family: "Inter Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
font-feature-settings: "ss01", "cv11", "ss03";
letter-spacing: -0.02em; /* tighter at display sizes */
```

**Body stack:**
```
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
font-feature-settings: "cv11", "ss01";
```

**Mono stack:**
```
font-family: "Berkeley Mono", "JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
```

If Berkeley Mono licensing isn't sorted, ship JetBrains Mono. Do not ship Fira Code (ligatures are a distraction here).

**Weights:**
- Display / H1–H2: **500** (medium) — never 700. Bold display is a tell.
- H3–H5: **500**
- Body: **400**
- UI labels, buttons: **500**
- Mono: **400** and **500**

**Type scale (desktop):**

| Token | Size | Line height | Use |
|---|---|---|---|
| display | 72px / 4.5rem | 1.05 | Hero only |
| h1 | 56px / 3.5rem | 1.08 | Page titles |
| h2 | 40px / 2.5rem | 1.15 | Section headers |
| h3 | 28px / 1.75rem | 1.25 | Subsection |
| h4 | 20px / 1.25rem | 1.35 | Card titles |
| h5 | 16px / 1rem | 1.4 | Inline headers, eyebrows |
| body-lg | 18px / 1.125rem | 1.55 | Hero supporting line, intro paragraphs |
| body | 16px / 1rem | 1.6 | Default |
| body-sm | 14px / 0.875rem | 1.55 | Secondary content |
| caption | 13px / 0.8125rem | 1.45 | Meta, labels |
| micro | 12px / 0.75rem | 1.4 | Mono labels, eyebrows |

**Mobile scale:** display → 44px, h1 → 36px, h2 → 28px, h3 → 22px. Body stays 16px (never shrink body on mobile).

**Eyebrow labels** (the small mono labels above section titles): mono, micro size, uppercase, letter-spacing 0.08em, colour `--text-muted`, often prefixed with `// ` or `01 —`. Use these to anchor sections.

### 1.4 Spacing Scale

Base unit: **4px**. Tailwind-compatible.

```
0   = 0
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
32  = 128px
40  = 160px
```

**Section vertical rhythm:** 128px desktop / 80px mobile between major sections. Inside sections, 48–64px between blocks. Don't deviate.

### 1.5 Border Radius

```
--radius-sm:  4px   /* badges, chips, inputs */
--radius-md:  6px   /* buttons, small cards */
--radius-lg:  8px   /* cards, panels */
--radius-xl:  12px  /* hero panels, large containers */
--radius-full: 9999px /* status dots only — not buttons */
```

No pill buttons. Pill buttons are consumer-app energy. We're not Calm.

### 1.6 Shadows

Minimal. The site uses **borders and background elevation**, not drop shadows, to express hierarchy. Allowed:

```
--shadow-focus: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent); /* focus rings */
--shadow-overlay: 0 8px 32px rgba(0,0,0,0.5); /* modals/menus only */
```

No card shadows. No glow effects. No coloured shadows.

### 1.7 Container Widths

```
--container-prose:  680px   /* blog body, long-form */
--container-narrow: 880px   /* forms, focused content */
--container-default: 1200px /* most marketing sections */
--container-wide:   1360px  /* hero, dense comparison tables */
--container-full:   100%    /* edge-to-edge visual breaks only */
```

Page gutters: 24px mobile, 48px tablet, 64px desktop. Never let content touch the viewport edge on desktop.

### 1.8 Grid

12-column on desktop, 4-column on mobile, gutter 24px. Most marketing content sits in 8 of 12 with 2 cols breathing each side. Use CSS grid, not flex hacks, for anything genuinely grid-shaped.

---

## 2. Component Patterns

### 2.1 Buttons

**Primary** — accent fill, dark ink. Used once per viewport (hero CTA, form submit).
```
background: var(--accent);
color: var(--accent-ink);
padding: 10px 18px;
border-radius: 6px;
font-weight: 500;
font-size: 14px;
letter-spacing: -0.01em;
border: 1px solid var(--accent);
transition: background 120ms ease;

hover: background: var(--accent-hover);
focus-visible: outline: none; box-shadow: var(--shadow-focus);
active: transform: translateY(0.5px);
```

**Secondary** — bordered, transparent. Default for most CTAs.
```
background: transparent;
color: var(--text-primary);
border: 1px solid var(--border-default);
hover: border-color: var(--border-strong); background: var(--bg-elevated);
```

**Ghost** — text-only, used in nav and footer.
```
background: transparent; border: none;
color: var(--text-secondary);
hover: color: var(--text-primary);
```

**Sizes:** sm (32px), default (40px), lg (48px — hero only). No xl.

**Never:** gradient buttons, drop-shadowed buttons, full-width buttons on desktop, icon-only buttons without aria-label.

### 2.2 Cards / Feature Blocks

Default card:
```
background: var(--bg-elevated);
border: 1px solid var(--border-subtle);
border-radius: 8px;
padding: 24px;
hover (only if interactive): border-color: var(--border-default);
```

No card shadows. No card hover-lift transforms. If a card is interactive, the whole card is a single clickable region with a focus ring; don't put a button inside a clickable card.

**Feature blocks** (3-up on desktop): mono eyebrow → h4 title → 2–3 sentence body. No icons unless the icon carries information. Generic decorative icons are banned (see anti-patterns).

### 2.3 Pricing Comparison Tables

Sticky header row, hairline borders only, mono for numbers, accent green for our column header. Our column gets a 1px accent-coloured left/right border for the entire column height — subtle but unmistakable.

```
- Border: 1px solid var(--border-subtle) on every cell
- Our column header: bg --accent-muted, text --accent, mono micro label "tenX"
- Competitor columns: text --text-secondary
- Row: 56px tall, padding 16px 20px
- Numbers: mono, --text-primary, tabular-nums
- "Yes/No" cells: use single-char glyphs (✓ in accent, — in muted), never green checkmarks vs red Xs
```

### 2.4 Navigation Header

Sticky, blurred, dense, 64px tall.

```
position: sticky; top: 0;
background: rgba(10,10,10,0.7);
backdrop-filter: saturate(180%) blur(20px);
border-bottom: 1px solid var(--border-subtle);
height: 64px;
padding: 0 24px (mobile) / 0 48px (desktop);
```

Layout: logo left, nav links centre (or left-grouped), CTA right. Nav links are body-sm weight 500, --text-secondary, hover → --text-primary. No underlines, no pill backgrounds.

Active route: thin 1px accent underline 4px below the link baseline, animated in with transform-origin left.

Logo: wordmark only. "tenX" with the X in accent green or underlined in accent. No mark/icon variant on web. Save the mark for favicons.

### 2.5 Mobile Nav

Full-screen overlay sheet, not a hamburger dropdown. Trigger is a 24px icon (three lines, 1.5px stroke, no animation gimmicks beyond rotate-to-X). Sheet has:
- Same background as page, no separate styling
- Links stacked, h3 size, 56px tap targets, separated by 1px --border-subtle dividers
- CTA pinned to bottom
- Close via top-right X or swipe-down (if low-cost to implement)

No off-canvas drawer. No animated reveal beyond a 150ms fade.

### 2.6 Footer

Dense, multi-column, mono labels. Background `--bg-base` (no separate footer colour), top border 1px `--border-subtle`, padding 80px top / 48px bottom.

Layout: 4–5 columns on desktop, 2 on mobile.
- Column headers: mono micro uppercase, `--text-muted`
- Links: body-sm, `--text-secondary` → `--text-primary` on hover
- Bottom row: logo, copyright, region selector, system status dot (green dot + "All systems operational" — actually wire this up or remove it)

No newsletter signup in the footer unless we'll actually send the newsletter.

### 2.7 Form Inputs

```
background: var(--bg-sunken);
border: 1px solid var(--border-default);
border-radius: 6px;
padding: 10px 14px;
font-size: 15px;
color: var(--text-primary);
placeholder color: var(--text-muted);
transition: border-color 120ms;

hover: border-color: var(--border-strong);
focus: border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(124,255,107,0.15);
error: border-color: var(--danger); message below in caption size --danger;
```

Labels sit above inputs, body-sm weight 500, `--text-primary`. Helper text below, caption size, `--text-muted`. No floating labels. No placeholder-as-label.

**Apply form** (candidate-facing): single column, ~600px max width, generous 24px between fields, mono labels for technical fields ("GitHub", "Primary stack"). Submit button is full-width primary on mobile only.

**Waitlist form** (employer-facing): inline email + button on hero, then full form on dedicated page. Don't gate the form behind a modal.

### 2.8 Stat Blocks / Metric Callouts

Numbers are mono, large (h2 size at minimum), tabular-nums. Label is mono micro `--text-muted` above. Sometimes accent green for the lead digit or unit only — sparingly.

```
[mono micro] VETTED ENGINEERS
[mono h1]    1,247
[body-sm]    across 23 countries
```

Stack vertically. Don't put stats in horizontal cards with icons.

### 2.9 Code-ish Accents

**Model fluency chips** — one of our signature elements.
```
display: inline-flex; align-items: center; gap: 6px;
background: var(--bg-elevated);
border: 1px solid var(--border-subtle);
border-radius: 4px;
padding: 4px 8px;
font-family: mono;
font-size: 12px;
color: var(--text-secondary);

prefix: 2px circle in accent green (status dot)
content: "claude-sonnet-4" / "gpt-4o" / "gemini-2.5-pro"
```

**Badges** (status, role tags): mono, 11px, uppercase, letter-spacing 0.06em, padded 2px 6px, border-radius 4px. Variants by tint of background (subtle), text colour drives meaning.

**Inline code** in prose: mono, 0.92em relative size, background `--bg-elevated`, padding 1px 5px, border-radius 3px, no border.

---

## 3. Page-Level Patterns

### 3.1 Hero

Left-aligned, never centred. Centred heroes are SaaS templates.

```
[mono micro eyebrow]   // AI-VERIFIED ENGINEERING TALENT
[display h1]           AI-verified engineers.
                       Fluent across Claude, GPT, Gemini.
                       Hired in days.
[body-lg, --text-secondary, max 60ch]  Supporting line — one sentence, no marketing fluff.
[CTA row]              [Primary: Hire an engineer] [Secondary: Apply to the network →]
[trust strip, mono micro, --text-muted]  // 10% perm · 20% contractor · pricing on page
```

The hero is dense type on a flat background. No illustration. No video. No gradient. No abstract shapes. The most expressive element is the typography itself.

Sub-hero "live status" row (optional, ship if real): small mono line — "// 3 engineers cleared vetting this week · next cohort opens [date]". This is the only animation allowed in the hero: the dot pulses.

### 3.2 "How it works" Step Pattern

Numbered steps, 01 / 02 / 03 / 04 in mono micro accent green, h3 title, body-sm description. Stacked vertically on mobile, 4-column grid on desktop with a hairline divider between cols. Each step gets its own concrete artifact (sample vetting report, sample matched shortlist, sample contract excerpt) shown as a small bordered preview tile, not a stock illustration.

### 3.3 Network / Proof Section

The honest version of "trusted by". Three formats, in priority order:

1. **Real engineer profiles** — anonymised cards: "Senior backend, ex-Stripe, fluent in Claude + GPT, available 20hr/wk". Mono labels for stack, body for narrative. Rotate 6–9 of these. Updates from real network state.
2. **Stat block** — vetted count, countries, average time-to-hire, % offered through us.
3. **Logo strip** — only if we have real client logos. If we don't, kill the section. No placeholder logos, ever.

### 3.4 Pricing Comparison

Full-width table inside `--container-wide`. Our column highlighted (per 2.3). Rows in priority order:
1. Perm placement fee (10% vs Toptal undisclosed, Turing %, Andela %)
2. Contractor margin (20% vs ~50% industry)
3. Time to shortlist
4. Vetting transparency (link to our vetting process page)
5. Model-agnostic (yes vs no/unclear)
6. Candidate equity in process (yes vs no)
7. Refund / replacement window

Below the table: single line in mono — `// pricing last verified [date]. source links →` linking to competitor pricing pages or "pricing not published" honest call-outs.

### 3.5 Blog Article Template

Single-column, `--container-prose` (680px). Generous line-height (1.7). Article structure:

```
[mono micro eyebrow]  // ENGINEERING · 8 MIN READ · MAY 2026
[h1]                  Title, max ~60ch
[body-lg muted]       Standfirst, max 2 sentences
[author row]          Avatar (24px) + name + role, mono caption
[hairline divider]
[body]                Long-form. h2 for sections (40px), h3 for sub (28px).
                      Pull-quotes in mono, --text-primary, left-bordered 2px accent.
                      Code blocks: --bg-sunken, mono, no syntax highlight gimmicks.
[footer]              Related posts (3-up), then CTA card.
```

No reading-progress bar. No floating social share. No "you might also like" carousel.

### 3.6 Programmatic Pages

These are the 100+ pages that will define perceived site quality. They MUST share one skeleton or the whole network will read as cheap.

**Universal skeleton:**

```
1. Breadcrumb               (mono micro, --text-muted, e.g. // engineers / backend / san francisco)
2. H1                       (formulaic: "Hire {role} engineers in {city}" / "{role} salaries 2026" / "tenX vs {competitor}")
3. Standfirst                (1 sentence, body-lg muted, defines what the page covers)
4. Key stats row             (3–4 stat blocks, mono numbers, sourced)
5. Primary content section   (varies by template — table for /salary, comparison for /vs, profile grid for /role-city)
6. "How vetting works" rail  (shared component, 3 steps, links to /vetting)
7. FAQ                       (collapsible, 5–8 Qs, schema markup)
8. Related pages             (cross-link to sibling programmatic pages — same role other cities, same city other roles)
9. CTA card                  (dual: hire OR apply, shared component)
```

**Templates inherit from this. Differences are content, not chrome.** A role × city page and a salary page should feel like the same publication.

Programmatic content quality rules: no AI-generated boilerplate that reads as AI-generated, real data in stat blocks (cite source inline), no duplicate paragraphs across pages. If we can't fill the skeleton with real content, don't ship the page.

---

## 4. Anti-patterns (Never)

- Gradient hero backgrounds. Purple-to-pink, blue-to-teal, any gradient as decoration. Flat backgrounds only.
- Stock photos of diverse smiling teams in offices.
- Generic AI iconography — brain icons, robot heads, glowing nodes, neural network illustrations, abstract sphere meshes.
- Emoji as visual decoration in marketing copy. (Fine in blog post bodies sparingly. Not in nav, buttons, hero, or section headers.)
- Marketing platitudes: "revolutionising hiring", "transforming the future of work", "unlock your team's potential", "next-generation talent", "AI-powered platform". Replace with specifics.
- 4-column feature grids of generic outline icons + 3-word title + 1-line description. Lazy and tells the reader nothing.
- "Trusted by" logo strip with placeholder, fake, or grayscale-blurred logos.
- Animated counter stats that count up on scroll. Stat is what it is.
- Parallax scrolling. Ever.
- Auto-playing video in hero.
- Chat widget bubble in the corner.
- Cookie banner that takes up 40% of viewport. If you need a banner, make it a one-liner at the top, dismissible, no modal.
- Modal-on-load asking for email.
- Centred body copy paragraphs. Left-align everything readable.
- Justified text. Hyphenation off. Ragged-right always.
- Italic body copy for emphasis. Use weight 500 or accent colour instead.
- More than one accent colour. If you find yourself adding "secondary accent", you've already lost.
- Drop shadows on cards.
- Pill-shaped CTA buttons.
- Decorative SVG blobs.
- "AI-powered" anywhere in body copy. We are about AI engineers, not powered by AI.
- Light-mode-first design. Build dark, port light.
- Pages without a clear single primary action.
- Testimonials without a real name + real company + real role + link to verify.

---

## 5. Do This / Not That

### Hero CTA pair

Do
```html
<a class="btn-primary">Hire an engineer</a>
<a class="btn-secondary">Apply to the network →</a>
```
Two clear, asymmetric actions. Employer first (revenue), candidate second (supply).

Not
```html
<a class="btn-gradient">Get Started Free →</a>
<a class="btn-gradient-outline">Book a Demo</a>
```
Both CTAs identical weight, both vague, gradient on both, "Get Started Free" tells me nothing.

### Feature block

Do
```
// 02 — VETTING
Multi-stage technical vetting
Live pairing session on a real bug, async take-home reviewed by two
senior engineers, reference checks with prior engineering managers.
Sample report →
```

Not
```
[generic shield icon]
Rigorous Vetting
We thoroughly vet every engineer to ensure quality.
```

### Stat block

Do
```
// VETTED ENGINEERS
1,247
across 23 countries · updated weekly
```

Not
```
[icon] 1000+ Engineers
World-class talent network
```

### Pricing line

Do
> 10% one-time perm placement fee. 20% margin on contractors. Published, fixed, no negotiation surcharge for procurement.

Not
> Flexible enterprise pricing tailored to your needs. Contact sales.

---

## 6. Accessibility Minimums

Non-negotiable. Audit before shipping any new template.

- **Contrast**: body text on background ≥ 7:1 (AAA). UI text ≥ 4.5:1 (AA). Accent green on `--bg-base` passes AA Large only — never use accent for body copy. Accent green text only at 14px+ weight 500 or 18px+ regular.
- **Focus rings**: visible, accent-coloured, 2px offset + 2px ring (see `--shadow-focus`). Never `outline: none` without a replacement. Test entire keyboard journey: tab through nav → hero CTAs → feature links → footer.
- **Keyboard nav**: every interactive element reachable via Tab in DOM order. Skip-to-content link at top of page (visually hidden until focused). Mobile nav sheet traps focus while open, ESC closes.
- **Touch targets**: minimum 44×44px. Nav links, footer links, social icons. Don't cram dense links into 32px rows on mobile.
- **prefers-reduced-motion**: respect it. The pulsing accent dot in hero stops pulsing. Any transition longer than 150ms collapses to instant. No scroll-triggered animations when reduced-motion is set.
- **prefers-color-scheme**: honour user system preference on first visit, persist user override via toggle. Default to dark if no preference.
- **Semantic HTML**: `<button>` for buttons, `<a>` for navigation, `<nav>` `<main>` `<article>` `<aside>` `<footer>` used correctly. ARIA only when semantic HTML can't carry the meaning.
- **Alt text**: every img has alt. Decorative images get `alt=""`. Engineer profile photos (if used) get descriptive alt referencing role, not appearance.
- **Heading order**: one H1 per page. Don't skip levels. H2 before H3.
- **Forms**: every input has a `<label>`. Errors announced via `aria-live="polite"`. Required fields marked in label, not via colour alone.
- **Link colour**: in prose, links get accent green + underline. Underline is non-negotiable in body copy. Underlines can be removed on nav and button-like links.
- **Language**: `<html lang="en">`. If we ship localised programmatic pages, set lang per page.

---

## 7. Implementation Notes

- **CSS architecture**: tokens in `:root` and `[data-theme="light"]` overrides. No CSS-in-JS runtime cost. Tailwind config maps to tokens — don't use Tailwind's default palette.
- **Fonts**: self-host. Subset to Latin + Latin-Extended. `font-display: swap`. Preload display weight only.
- **Image policy**: AVIF + WebP fallback. No JPEG. SVG for any UI element. Lazy-load below the fold.
- **Performance budget**: hero LCP < 1.5s on 4G. CLS < 0.05. Total JS on marketing pages < 80KB gzipped. If you're adding a library, justify it in PR.
- **Iconography**: when icons are genuinely needed, use Lucide (1.5px stroke) or hand-rolled SVGs that match. Never Heroicons solid, never Font Awesome, never emoji-as-icon.
- **Dark/light toggle**: live in footer or header far-right, mono micro label "dark / light", subtle. Not a giant sun/moon button.

---

## 8. Review Checklist (before shipping any page)

- [ ] Single H1, hierarchy correct
- [ ] One primary CTA, one secondary at most
- [ ] No gradient, no stock photo, no generic AI iconography
- [ ] Mono used intentionally (eyebrows, numbers, code, chips) — not sprinkled
- [ ] Body copy left-aligned, 60–75ch line length
- [ ] Accent colour used 3 times or fewer in viewport
- [ ] Dark and light both tested
- [ ] Keyboard tab order makes sense
- [ ] Focus rings visible on every interactive element
- [ ] prefers-reduced-motion respected
- [ ] Mobile 375px and 414px both checked
- [ ] No "AI-powered", "revolutionise", "transform", "unlock" in copy
- [ ] Every claim has a source or is a direct first-party statement
- [ ] Programmatic page matches the universal skeleton

If any box is unchecked, the page isn't done.
