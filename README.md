# Blinto — Astro

The Blinto marketing site, built with [Astro](https://astro.build).

It is both an implementation of the **Blinto Revamp 2026** Figma design and the
migration target for the current WordPress site at blinto.co. Every URL carries
a trailing slash, pinned via `trailingSlash: 'always'`.

## Routes

Twenty-one pages. Six come from Figma; the rest carry the WordPress site's
content into the new design system, since no frame exists for them.

| Route | From |
| --- | --- |
| `/` | [`145:3` — Homepage · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=145-3) |
| `/services/` | [`272:6260` — Shopify Services · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=272-6260) |
| `/services/shopify-app-development/` | [`213:2429` — Service · Shopify App Development](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=213-2429) |
| `/services/shopify-app-marketing/` | [`232:2234` — Service · Shopify App Growth](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=232-2234) |
| `/services/shopify-app-support-maintenance/` | [`240:3463` — Service · App Support & Maintenance](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=240-3463) |
| `/shopify-apps/` | [`269:5897` — Our Apps · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=269-5897) |
| `/about-us/` | [`251:4816` — About Us · Desktop](https://www.figma.com/design/UTcp8QqVIYUYwK95ao0HqY/Blinto-Revamp-2026?node-id=251-4816) |
| `/services/shopify-theme-storefront-development/` | migrated content |
| `/services/wordpress-design-development/` | migrated content |
| `/services/wordpress-plugin-development/` | migrated content |
| `/services/wordpress-growth-marketing/` | migrated content |
| `/services/seo/` | migrated content |
| `/services/website-maintenance/` | migrated content |
| `/contact-us/` | migrated content |
| `/career/` | migrated content |
| `/testimonials/` | migrated content |
| `/book-a-call/` | migrated content |
| `/support/` | migrated content |
| `/privacy-policy/`, `/terms-conditions/`, `/cookies-policy/` | migrated verbatim |

`/case-studies/` is linked from the navigation and does not exist yet. **It must
not ship in that state** — along with `/works/` and the two case-study detail
pages, it is the only part of the current site with no home here.

## Launch redirects

`redirects.mjs` holds the redirect map — every current URL that moves, with its
final destination, so nothing lands on a second hop. Pages that keep the
path they already rank on (`/about-us/`, `/contact-us/`, `/career/`,
`/testimonials/`, `/book-a-call/`, `/support/` and the three policies) have no
entry.

| Current URL | 301 to |
| --- | --- |
| `/shopify-app-development/` | `/services/shopify-app-development/` |
| `/shopify-growth-marketing/` | `/services/shopify-app-marketing/` |
| `/shopify-theme-storefront-development/` | `/services/shopify-theme-storefront-development/` |
| `/wordpress-design-development/` | `/services/wordpress-design-development/` |
| `/wordpress-plugin-development/` | `/services/wordpress-plugin-development/` |
| `/wordpress-growth-marketing/` | `/services/wordpress-growth-marketing/` |
| `/website-maintenance/` | `/services/website-maintenance/` |
| `/seo/` | `/services/seo/` |
| `/contact/` | `/contact-us/` |
| `/growth-plan/` | `/services/wordpress-growth-marketing/` |
| `/pricing/` | `/services/` |

The last three already 301 on the current site; they live in WordPress and
disappear with it, so they are carried over here. `/growth-plan/` points
straight at the final URL rather than chaining through the old one, and
`/pricing/` has no page behind it — it 301s to the homepage today, so nothing is
indexed there.

A build hook writes the map into `dist/_redirects` (Netlify, Cloudflare Pages)
and `dist/.htaccess` (Apache, which is what the WordPress site runs on today).
**On any other host — nginx, Vercel, S3/CloudFront — those files are inert and
the same table has to be translated into that host's own config.**

Astro's own `redirects` option is deliberately unused: in a static build it
writes a meta-refresh HTML page at each old path, and on Netlify a file that
exists shadows the `_redirects` rule for the same path, so the weaker
client-side redirect would win over the 301.

## SEO and answer engines

Every page emits **one** `application/ld+json` block holding a single `@graph`
with stable `@id`s, rather than several disconnected blobs. The shared
Organization, WebSite, logo, this WebPage and its breadcrumb are declared once
and referenced by id; whatever the page is *about* joins the same graph:

| Page | Its own nodes |
| --- | --- |
| Every page | `Organization`, `ImageObject` (logo), `WebSite`, `WebPage`, `ImageObject` (share image), `BreadcrumbList` |
| The nine service pages | `Service`, `FAQPage` |
| `/services/`, `/shopify-apps/` | `CollectionPage` + `ItemList` of `Service` / `SoftwareApplication`, `FAQPage` |
| `/about-us/` | `AboutPage`, `FAQPage` |
| `/contact-us/` | `ContactPage`, `FAQPage` |
| `/career/` | `JobPosting` ×10, `FAQPage` |
| `/testimonials/` | `Review` ×2 against the Organization |

`src/data/seo.ts` builds it; `BaseLayout` takes `faqs`, `service`, `pageType`
and `schema` so a page declares what it is rather than hand-rolling JSON. The
`faqs` prop takes the same array the `Faq` section renders, so the markup and
the structured data cannot drift apart.

Nothing is asserted that the pages do not say. There is no `aggregateRating` on
the reviews — the clients gave words, not scores — no install counts or prices
on the apps, and no `datePosted` on the job postings, because the current site
never published one and inventing dates is not migration.

Three files are generated at build time by `seo.mjs`, which reads titles and
descriptions back out of the built HTML so they can never disagree with the
pages themselves:

- **`sitemap.xml`** — the 21 canonical URLs. No `lastmod`, `changefreq` or
  `priority`: nothing tracks per-page edit dates, and a build timestamp on
  every URL claims the whole site changed on every deploy, which is why
  crawlers discount it.
- **`robots.txt`** — allows everything, and names thirteen answer-engine
  crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the rest)
  explicitly, so being quotable in AI answers is a visible decision rather than
  an accident. Move a name to `Disallow` to opt it out.
- **`llms.txt`** — the emerging convention for handing a language model a clean
  map of a site instead of making it infer one from crawled markup. Grouped
  index, one line per page, built from each page's own title and description.

Titles are kept at or under 62 characters and descriptions at or under 160, so
neither truncates in a result. Three pages — `/services/seo/`,
`/services/website-maintenance/` and `/testimonials/` — keep the title and
description the WordPress site already ranks on, verbatim; the rest had the
weak `Page name - blinto` default and are authored here.

`og-image.png` and `blinto-logo.png` in `public/` are composed from existing
brand assets — the CTA gradient artwork, the real logo paths, and Staatliches
and DM Sans loaded from the project's own font packages — so the share card is
on-brand without a new design asset. Replace them if a designed version lands.

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
│   ├── site.ts           Nav, footer, offices, contact details, socials
│   ├── home.ts           Homepage copy, keyed to Figma nodes
│   ├── about.ts          About Us copy
│   ├── types.ts          Shapes shared by the pages and the section shells
│   ├── services/         One module per service page (nine)
│   ├── pages/            services, shopify-apps, contact-us, career, …
│   └── legal/            The three policies, as block lists
├── styles/
│   ├── tokens.css        Figma design variables, 1:1
│   └── global.css        Reset, a11y kit, layout and form primitives
├── layouts/
│   └── BaseLayout.astro  <head>, meta/OG tags, nav + footer shell
├── components/
│   ├── ui/               Design-system primitives
│   ├── layout/           NavBar, Footer
│   └── sections/         One component per Figma section
│       └── page/         Data-driven shells shared across the inner pages
└── pages/
    ├── index.astro       Composes the homepage sections
    ├── services.astro    The /services/ hub
    ├── services/         The nine service pages
    └── …                 about-us, shopify-apps, contact-us, career, …
```

A page file is composition only: it imports section shells and one content
module, and passes props. Copy never lives in markup.

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
| `abt-hero-banner.jpg` | 251:4866 | 2400x1600 | About hero banner |
| `abt-how-we-work-1..3.jpg` | 254:4992-4994 | 1200x800 | How We Work |
| `team-01..16-*.png` | 254:4941 … 260:6009 | 564x676 (one 1024²) | The Team |
| `apps-hero-banner.jpg` | 269:5942 | 2400x1602 | Our Apps hero banner |
| `apps-why-1..2.jpg` | 270:6210-6211 | 1000x1500, 1000x667 | Why It Matters |
| `services-hero-banner.jpg` | 272:6310 | 2400x1603 | Services hero banner |
| `services-own-apps.jpg` | 274:6576 | 1200x800 | Our Own Apps |
| `work/work-img1..8.webp` | — | 770x534 | WordPress design portfolio strip |
| `cta-backdrop.png` | 213:2503 | 2400x1100 | CTA band backdrop, all pages |

The team portraits stay PNG because their corners are pre-cut to the card
radius and one is a full cut-out; JPEG would fill that transparency with
black. Astro takes the 6.1 MB of source down to 264 KB of WebP across all
sixteen.

The eight `work/` shots are the only assets not from Figma: the WordPress
design page's portfolio strip served them from `/wp-content/uploads/`, a path
that stops existing at launch, so they are checked in and go through
`astro:assets` like everything else.

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

## Inner pages

The four inner pages reuse the homepage's design system rather than forking it,
and reuse each other's. Section shells live in
`src/components/sections/page/` and are driven by data, because the design
repeats six shapes across all thirty-nine sections:

| Shell | Sections it serves |
| --- | --- |
| `Hero.astro` | all four heroes |
| `ListWithImage.astro` | Before the Code, App Types, After Launch (×2), Where Growth Stalls, The Growth Funnel, What We Investigate, Keep Learning (×2) |
| `BeliefGrid.astro` | What We Build, What We Do (×3), Why Blinto (×3), How We Think, How We Work |
| `StageGrid.astro` | Where You Are (×3), Support Models |
| `ProcessGrid.astro` | Our Process (×3), Our Story |
| `PersonGrid.astro` | The Team |

Each page is one `.astro` file that composes those shells over one content
module in `src/data/`. The shapes they exchange live in `src/data/types.ts`, so
a shell never imports from a particular page to learn its own prop types.

Several sections look like new shapes but are variants of existing ones, which
is how the shells stay this few:

- **Support Models** (`242:3672`) is the same Card / Feature in its short,
  button-less form as Where You Are. About's **What We Do** (`253:4836`) is the
  same card with Figma's Show button=true, which is what `StageCard.cta` sets.
- **How We Work** (`254:4981`) is a `BeliefGrid` whose cells all happen to be
  photo tiles — `BeliefCell` already allowed that.
- **Our Story** (`251:4869`) is `ProcessGrid` with no closing CTA and Card /
  Step's Show body=false, giving heading-only timeline stages.
- **How We Think** (`253:4988`) is Card / Belief's Show body=false over a
  shorter 200 min-height. With no body to sit opposite, the heading centres.

Rows that go 4-up rather than 3-up pass `cardMin={260}`, the min-width Figma
sets on those narrower cards; `.card-row` and `.card-grid` both read
`--layout-card-min`, so that is all it takes.

**Card / Person** (`247:4815`) is the one genuinely new component. Its
portraits carry an empty `alt` on purpose: the name sits in the very next
element, so describing the image would make a screen reader announce the person
twice. The exports are not uniform — fifteen bake their studio backdrop into
the PNG, and one is a cut-out that arrives 51% transparent, so the design
paints `#04ade5` behind it. `PersonCard` takes that as a `background` prop
rather than assuming either case.

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
