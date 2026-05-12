# Design Notes — Tracksuit-inspired tenX Redesign

## Tracksuit Design Language (gotracksuit.com)

Tracksuit is a bold New Zealand B2B SaaS brand with a distinctive "confident retro-modern" visual identity. Unable to fetch live site (rate limited), analysis based on known brand.

### Colour Palette
| Role | Tracksuit (light mode) | tenX translation (dark mode) |
|---|---|---|
| Page bg | Warm cream `#F5EFE3` | Warm dark `#0C0A09` |
| Elevated bg | Off-white `#EDE7DB` | Warm dark elevated `#171310` |
| Dark section | Charcoal `#0E0E1A` | Deep navy `#080D18` |
| Primary accent | Coral-orange `#FF5C35` | Same coral `#FF5C35` |
| Secondary accent | Warm amber `#F0B030` | Same amber `#F0B030` |
| Text | `#1A1A1A` on cream | Warm cream `#F2EDE6` on dark |

### Typography
- **Display**: Fraunces (optically variable serif — "retro-modern editorial", great at heavy weight). Replaces Inter for all headings.
- **Body**: Outfit (clean geometric sans, warmer than Inter). Replaces Inter for body copy.
- **Data/Mono**: JetBrains Mono (unchanged — right for data elements)
- Key move: Hero H1 at `clamp(52px, 9vw, 120px)` weight 800 in Fraunces — Tracksuit's signature big-type confidence

### Spacing & Layout
- Section colour blocking: each major section gets a distinct background (warm dark → deep navy → warm dark → coral-tinted dark)
- No gradient fills in section backgrounds — flat solid colour only (Tracksuit's flat graphic quality)
- Generous section padding maintained (128px desktop)
- Hard colour transitions between sections (no fade)

### Buttons
- Changed from 6px radius to full pill (`border-radius: 9999px`) — Tracksuit's approachable rounded CTA style
- Primary CTA: coral `#FF5C35` fill (Tracksuit's signature colour)
- Secondary: border `2px solid currentColor`, pill shape

### Section Colour Rhythm (dark Tracksuit translation)
```
Header:     rgba(12,10,9,0.8) blur — warm dark
Hero:       #0C0A09 — base warm dark
Ticker:     #080D18 — deep navy stripe (Tracksuit's dark contrast band)
Thesis:     #110F08 — warm chocolate dark (Tracksuit's cream-section, dark)
Badges:     #0C0A09 — back to base
Process:    #080D18 — deep navy (alternating rhythm)
CTA:        #1A0A06 — deep warm coral-tinted dark (bold section, not quite solid coral but warm)
Footer:     #0C0A09 — base
```

### What Makes It Feel Like Tracksuit
1. **Fraunces at massive weight** — the editorial serif confidence that Inter never had
2. **Coral as the primary action colour** — warm, inviting, anti-tech-blue
3. **Section colour blocking** — dark rhythm that mirrors Tracksuit's light/dark alternation
4. **Pill CTAs** — rounded, not squared
5. **Warm colour temperature throughout** — even the blacks are warm (brown-tinged, not blue-grey)
6. **Clean flat sections** — no gradient slop

### What Stays tenX
- All copy unchanged
- Mint `#6CF0C2` retained for data viz, badges, journey panel, bar charts
- Journey panel (the live screening sim) preserved exactly
- Bento grid and badge grid preserved
- All functionality unchanged
