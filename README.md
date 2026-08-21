# Blinto — Astro

The Blinto marketing site, built with [Astro](https://astro.build).

The homepage implements the **Blinto Revamp 2026** Figma design
([node `145:3`, "Homepage — Desktop"](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=145-3)).

## Getting started

```sh
npm install
npm run dev        # dev server on http://localhost:4321
```

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` — types and template diagnostics |

Requires Node 20.10+ (Astro 7).

## Architecture

```
src/
├── data/                 Page content, separated from markup
│   ├── site.ts           Nav, footer, offices, socials
│   └── home.ts           Homepage copy, keyed to Figma nodes
├── styles/
│   ├── tokens.css        Figma design variables, 1:1
│   └── global.css        Reset, a11y kit, layout primitives
├── layouts/
│   └── BaseLayout.astro  <head>, meta/OG tags, nav + footer shell
├── components/
│   ├── ui/               Design-system primitives
│   ├── layout/           NavBar, Footer
│   └── sections/         One component per Figma section
└── pages/
    └── index.astro       Composes the sections
```

### Conventions

- **Tokens, not literals.** `src/styles/tokens.css` is a direct transcription of
  the Figma variable collection. Components consume `var(--token)` so a design
  change lands in one file. Only edit tokens to reflect a change in Figma.
- **Content lives in `src/data`.** Copy changes shouldn't require touching
  layout. Each export notes the Figma node it came from.
- **Styling is scoped `<style>` blocks** in each `.astro` file, plus a small set
  of global layout primitives (`.container`, `.section`, `.card-grid`). No CSS
  framework.
- **Don't style another component's root element.** Astro's scoped styles do not
  reach a child component's root, so a rule written for a class passed via
  `class="..."` into a child silently does nothing. Either wrap the child in an
  element this component owns, or give the child a prop. Shared primitives keep
  their base rules in `:where()` so a consumer can override without a
  specificity fight.
- **Responsive from one pinned frame.** Figma pins a single 1440px frame, so the
  display type ramp is expressed as `clamp()` whose upper bound is the exact
  Figma value. At ≥1440px the design is reproduced verbatim; below it, type and
  spacing scale predictably.

### Accessibility

Skip link; one `h1` with `h2` section headings; a single visible focus
treatment; the FAQ is a native `<details>`/`<summary>` accordion so it works
without JavaScript; the mobile nav traps focus, locks scroll, marks the rest of
the page `inert`, closes on Escape and returns focus to its trigger; animation
is dropped under `prefers-reduced-motion`.

One known issue inherited from the design: the hero's tinted "Shopify"
(`--color-text-shopify`, `#95bf46`) sits at about **2.1:1** against white, below
the WCAG AA large-text minimum of 3:1. It is implemented as designed — changing
a brand colour is a design decision. Darkening it to roughly `#6f8f34` would
clear 3:1 if that is wanted.

## Design assets

Every **vector** asset is the real thing, exported from the Figma file itself.
`www.figma.com` is blocked by this environment's egress policy, so the usual
asset URLs are unreachable — instead the artwork was pulled through the Figma
Plugin API (`exportAsync({ format: 'SVG_STRING' })`), which returns SVG as
text rather than over HTTP. That covers:

| Asset | Figma node | Lives in |
| --- | --- | --- |
| Logo (quatrefoil + wordmark) | 61:4323 | `src/components/ui/Logo.astro` |
| 6 card icons (Idea, Launch, Growth, Admin, Support, Updates) | 125:142 … 125:173 | `src/components/ui/Icon.astro` |
| Tick, Plus, Minus, Menu, caret, arrow | 125:177 … 152:399 | `src/components/ui/Icon.astro` |
| 5 social icons | 61:4357 … 61:4374 | `src/components/ui/Icon.astro` |
| Shopify bag (brand palette kept) | 145:40 | `src/components/ui/Icon.astro` |
| USA / Bangladesh silhouettes | 105:125, 105:149 | `public/images/region-*.svg` |
| Footer wordmark | 72:185 | `public/images/wordmark.svg` |

Inline icons have their `#222222` / `white` strokes rewritten to
`currentColor`; each keeps its own Figma `viewBox` so geometry is exact.

### Still outstanding: the 7 photographs

The hero strip's five photos and the two *Why One Team* photos are **generated
placeholders**, not the real photography. Raster images cannot come through the
text channel: the smallest is 81 KB as JPEG, and a `use_figma` response is
capped at 20 KB, so even a half-resolution export exceeds one response and
would have to be hand-reassembled from base64 fragments — not something to
trust in a production asset.

Two ways to finish them:

1. **Allowlist `www.figma.com`** for this environment's egress policy, then
   re-run the export — this is the clean fix and also restores normal
   `download_assets` behaviour.
2. **Drop the files in by hand.** Overwrite the seven `.jpg` files in
   `public/images/` using the node IDs and sizes in
   `public/images/README.md`. No code change is needed.

The CTA band's background is deliberately *not* an image: Figma backs it with a
315 KB raster gradient, and it is reproduced with layered CSS gradients in
`src/components/sections/Cta.astro`, which scales cleanly and ships no bytes.

## Deviations from the design

- **Equal-height cards.** Figma lets the *Where You Are* cards hug their content
  (388/367/367px). They are rendered equal-height here so the CTAs align, which
  is what the *What We Do* grid does in the design itself.
- **The marquee actually scrolls.** Figma pins a static overflowing line; the
  component description calls it a "scrolling statement band", so it animates,
  and falls back to the static centred line under `prefers-reduced-motion`.
- **The mobile nav drawer is new.** The Figma notes record it as "still an open
  design decision"; it is built from the design's own tokens.
- **The LinkedIn icon was normalised.** Its Figma node (61:4365) carries
  `stroke-opacity="0.2"` and no `stroke-width`, which renders it visibly faded
  beside its four siblings. Treated as an inconsistency rather than intent and
  matched to the rest of the row.
- **The close icon is the Plus rotated 45deg.** The design system ships no
  close glyph, so the drawer reuses Icon / 32 / Plus rather than introducing a
  foreign one.
