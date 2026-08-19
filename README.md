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

`www.figma.com` was blocked by the network egress policy of the environment this
page was built in, so **no exported asset bytes could be retrieved** — not via
the shell, the server-side fetch, or the Figma MCP `download_assets` tool. Three
things are therefore stand-ins, each isolated so it can be swapped in one place:

| What | Where | To replace |
| --- | --- | --- |
| 7 photographs | `public/images/` | Overwrite the `.jpg` files — see `public/images/README.md` for the node IDs and sizes. No code change. |
| Logo + icon glyphs | `src/components/ui/Logo.astro`, `src/components/ui/Icon.astro` | Authored from the design renders. Drop in the official SVGs and replace the component bodies. |
| CTA band background | `src/components/sections/Cta.astro` | Figma backs it with a raster gradient; reproduced with layered CSS gradients, which also scales cleanly and ships no image. |

The two footer map silhouettes (`region-us`, `region-bd` in `Icon.astro`) are
explicit placeholder glyphs, not reconstructions — they need the real
illustrations.

## Deviations from the design

- **Equal-height cards.** Figma lets the *Where You Are* cards hug their content
  (388/367/367px). They are rendered equal-height here so the CTAs align, which
  is what the *What We Do* grid does in the design itself.
- **The marquee actually scrolls.** Figma pins a static overflowing line; the
  component description calls it a "scrolling statement band", so it animates,
  and falls back to the static centred line under `prefers-reduced-motion`.
- **The mobile nav drawer is new.** The Figma notes record it as "still an open
  design decision"; it is built from the design's own tokens.
