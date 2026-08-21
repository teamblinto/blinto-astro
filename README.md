# Blinto — Astro

The Blinto marketing site, built with [Astro](https://astro.build).

Implements the **Blinto Revamp 2026** Figma design:

| Route | Figma node |
| --- | --- |
| `/` | [`145:3` — Homepage · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=145-3) |
| `/services/app-development` | [`213:2429` — Service · Shopify App Development · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=213-2429) |
| `/services/app-growth` | [`232:2234` — Service · Shopify App Growth · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=232-2234) |
| `/services/support-maintenance` | [`240:3463` — Service · App Support & Maintenance · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=240-3463) |

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
│   ├── home.ts           Homepage copy, keyed to Figma nodes
│   └── services/         One module per service page
│       ├── types.ts      Shapes shared by the pages and the shells
│       ├── app-development.ts
│       ├── app-growth.ts
│       └── support-maintenance.ts
├── styles/
│   ├── tokens.css        Figma design variables, 1:1
│   └── global.css        Reset, a11y kit, layout primitives
├── layouts/
│   └── BaseLayout.astro  <head>, meta/OG tags, nav + footer shell
├── components/
│   ├── ui/               Design-system primitives
│   ├── layout/           NavBar, Footer
│   └── sections/         One component per Figma section
│       └── service/      Section shells shared by the service pages
└── pages/
    ├── index.astro       Composes the homepage sections
    └── services/
        ├── app-development.astro
        ├── app-growth.astro
        └── support-maintenance.astro
```

### Conventions

- **Tokens, not literals.** `src/styles/tokens.css` is a direct transcription of
  the Figma variable collection. Components consume `var(--token)` so a design
  change lands in one file. Only edit tokens to reflect a change in Figma.
- **Content lives in `src/data`.** Copy changes shouldn't require touching
  layout. Each export notes the Figma node it came from.
- **Styling is scoped `<style>` blocks** in each `.astro` file, plus a small set
  of global layout primitives (`.container`, `.section`, `.card-grid`,
  `.card-row`). No CSS
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
without JavaScript; the Services dropdown works without JavaScript too (see
below); the mobile nav traps focus, locks scroll, marks the rest of the page
`inert`, closes on Escape and returns focus to its trigger; animation is
dropped under `prefers-reduced-motion`.

**The Services dropdown** (Services Menu, Figma `172:1052`) ships no
JavaScript. Its panel is hidden with `opacity: 0` rather than
`visibility: hidden` or `display: none`, so the three links stay in the tab
order: tabbing off "Services" lands on the first service and `:focus-within`
reveals the panel in the same instant, while `:hover` covers the pointer. The
caret stays decorative and the markup is a plain nested `<ul>`, which is what a
screen reader announces as a sub-level — so there is no `aria-expanded` to fall
out of sync with a CSS-driven hover state. Hit-testing lives on the panel's
anchor: `pointer-events` is off while closed, so the invisible box cannot
swallow clicks meant for the page beneath the bar, and on while open, so the
21px gap the design leaves between label and panel is inside the hover target
instead of a dead zone. The mobile drawer shows the sub-level outright rather
than nesting a second accordion inside a sheet.

One known issue inherited from the design: the hero's tinted "Shopify"
(`--color-text-shopify`, `#95bf46`) sits at about **2.1:1** against white, below
the WCAG AA large-text minimum of 3:1. It is implemented as designed — changing
a brand colour is a design decision. Darkening it to roughly `#6f8f34` would
clear 3:1 if that is wanted.

## Design assets

Every asset on the page is the real artwork from the Figma file — no
placeholders, no reconstructions.

**Vectors** were pulled through the Figma Plugin API
(`exportAsync({ format: 'SVG_STRING' })`), which returns SVG as text:

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

**Photography** was exported at 2x the designed slot size and lives in
`src/assets/images/` — deliberately *not* `public/`, so Astro's build pipeline
optimises it. The `<Image>` component with `densities={[1, 2]}` emits WebP with
a 1x/2x srcset, which takes the homepage's seven photos from 2.3 MB of source
JPEG down to about 500 KB of shipped WebP.

| File | Figma node | Source | Used by |
| --- | --- | --- | --- |
| `hero-wireframes.jpg` | 135:139 | 530x760 | Hero slot 1 |
| `hero-laptop.jpg` | 135:141 | 530x760 | Hero slot 2 |
| `hero-mobile-storefront.jpg` | 135:143 | 530x600 | Hero slot 3 |
| `hero-shopify-app.jpg` | 135:145 | 530x760 | Hero slot 4 |
| `hero-code.jpg` | 135:147 | 530x760 | Hero slot 5 |
| `why-pair-programming.jpg` | 149:252 | 854x640 | Why One Team |
| `why-team-workshop.jpg` | 149:265 | 854x640 | Why One Team |
| `svc-hero-banner.jpg` | 213:2952 | 2880x1920 | App Development hero banner |
| `svc-before-the-code.jpg` | 217:2928 | 1300x731 | Before the Code |
| `svc-app-types.jpg` | 213:2463 | 1299x1027 | App Types |
| `svc-why-blinto-1.jpg` | 213:2476 | 1000x667 | Why Blinto |
| `svc-why-blinto-2.jpg` | 213:2481 | 1000x667 | Why Blinto |
| `svc-after-launch.jpg` | 217:3206 | 1300x731 | After Launch |
| `grw-hero-banner.jpg` | 232:2284 | 2400x1600 | App Growth hero banner |
| `grw-where-growth-stalls.jpg` | 233:2316 | 1200x800 | Where Growth Stalls |
| `grw-growth-funnel.jpg` | 233:2492 | 1200x800 | The Growth Funnel |
| `grw-why-blinto-1.jpg` | 234:2462 | 1200x800 | Why Blinto |
| `grw-why-blinto-2.jpg` | 234:2475 | 1200x800 | Why Blinto |
| `grw-keep-learning.jpg` | 234:2597 | 1200x800 | Keep Learning |
| `sup-hero-banner.jpg` | 240:3513 | 2400x1600 | Support hero banner |
| `sup-after-launch.jpg` | 241:3535 | 1200x800 | After Launch |
| `sup-what-we-investigate.jpg` | 241:3725 | 1200x800 | What We Investigate |
| `sup-why-blinto-1.jpg` | 242:3790 | 1200x1799 | Why Blinto |
| `sup-why-blinto-2.jpg` | 242:3803 | 1200x900 | Why Blinto |
| `sup-keep-learning.jpg` | 242:3908 | 1200x800 | Keep Learning |
| `cta-backdrop.png` | 213:2503 | 2400x1100 | CTA band backdrop, all pages |

Alt text lives beside each import in the page's `src/data` module.

**Density is capped to the source.** `ImageCard` and the service hero compute
their own `densities` rather than always asking for `[1, 2]`. Several Figma
exports come back at 1200px against a 650px slot, and a blanket 2x makes Astro
*upscale* — a visibly softer image in a larger file than the 1x it would
otherwise have shipped. The build is audited: no generated image is wider than
its source.

**The CTA backdrop is one shared asset.** All three service pages' CTA
gradients export byte-identical, so `cta-backdrop.png` is imported by each
rather than committed three times. It is passed in as `Cta.astro`'s `backdrop`
prop and drawn as a `background-image`, so `background-position` can pin the
glow to the bottom of the band whatever height the copy gives it — 863 KB of
source PNG down to a 22 KB WebP. The homepage was built before this could be
exported and still falls back to `Cta.astro`'s layered CSS gradients, which is
why it looks unchanged; passing it the same asset is a one-line change if the
real artwork is wanted there too.

## Service pages

The three service pages reuse the homepage's design system rather than forking
it, and reuse each other's. Section shells live in
`src/components/sections/service/` and are driven by data, because the design
repeats five shapes across all thirty-one sections:

| Shell | Sections it serves |
| --- | --- |
| `Hero.astro` | all three heroes |
| `ListWithImage.astro` | Before the Code, App Types, After Launch (×2), Where Growth Stalls, The Growth Funnel, What We Investigate, Keep Learning (×2) |
| `BeliefGrid.astro` | What We Build, What We Do (×2), Why Blinto (×3) |
| `StageGrid.astro` | Where You Are (×3), Support Models |
| `ProcessGrid.astro` | Our Process (×3) |

Each page is one `.astro` file that composes those shells over one content
module in `src/data/services/`. The shapes they exchange live in
`src/data/services/types.ts`, so a shell never imports from a particular page
to learn its own prop types.

Support Models (`242:3672`) is worth calling out as reuse rather than a new
shape: Figma builds it from the same Card / Feature in its short, button-less
form as Where You Are, so it renders through `StageGrid` with different copy.
`ListWithImage` takes a list of actions because Figma's Keep Learning sections
put two buttons under the grid where After Launch puts one.

Four design-system cards were missing and are new: `ListCard` (Card / List
`173:1127`, including Bullet Row `170:1034`), `ImageCard` (Card / Image
`130:145`), `BeliefCard` (Card / Belief `130:144`) and `StepCard` (Card / Step
`170:1056`). Where You Are reuses the existing `FeatureCard` with `features`
and `cta` omitted, which is Figma's Features=false / Show button=false state.

Four shared pieces gained capability, all additive — their defaults reproduce
the homepage exactly:

- `SectionHeader` takes `compact`, Figma's "… Compact" layout half, dropping
  the heading from Display/Section (72) to Display/Feature (60).
- `LargeButton` takes Figma's 560px maximum and lets its label wrap, so the
  design's 513px-wide *Explore Shopify App Support and Maintenance Services*
  CTA renders as designed instead of overflowing.
- `Faq` and `Cta` take their copy as props; `Cta` also takes an optional
  `body`, a list of `actions` with per-action tones, and a `backdrop` image.

`.card-row` is a new global primitive. Some rows in this design are a wrapping
flex line of `flex: 1 0 0` cards rather than equal grid tracks, and the
difference shows whenever the card count is not a multiple of the column count:
Our Process is five cards, which Figma lays out as 3 x 426 then 2 x 650.
`.card-grid`'s `auto-fit` tracks would leave that trailing pair at 426 with a
hole beside them.

## Deviations from the design

- **Equal-height cards.** Figma lets the *Where You Are* cards hug their content
  (388/367/367px). They are rendered equal-height here so the CTAs align, which
  is what the *What We Do* grid does in the design itself.
- **The marquee actually scrolls.** Figma pins a static overflowing line; the
  component description calls it a "scrolling statement band", so it loops
  continuously. Two identical groups animate from 0 to -50%, and each group
  carries its trailing gap as `padding-inline-end` so the shift lands exactly
  on a repeat boundary — a track-level `gap` would leave it half a gap short
  and the loop would visibly jump. Hover pauses it, and it falls back to the
  static centred line under `prefers-reduced-motion`.
- **The mobile nav drawer is new.** The Figma notes record it as "still an open
  design decision"; it is built from the design's own tokens.
- **The LinkedIn icon was normalised.** Its Figma node (61:4365) carries
  `stroke-opacity="0.2"` and no `stroke-width`, which renders it visibly faded
  beside its four siblings. Treated as an inconsistency rather than intent and
  matched to the rest of the row.
- **The close icon is the Plus rotated 45deg.** The design system ships no
  close glyph, so the drawer reuses Icon / 32 / Plus rather than introducing a
  foreign one.
- **The CTA heading wraps greedily.** It carried `text-wrap: balance`, which
  re-broke it into two shorter lines. Figma fills each line to the 790px
  content width before breaking — the same greedy wrap `SectionHeader` already
  documents — so `Cta.astro` now uses `text-wrap: normal`. This is the only
  change here that alters the homepage: its CTA heading breaks one word later
  than before. Everything else on the homepage is pixel-identical.
