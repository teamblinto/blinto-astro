# Homepage photography

These files are referenced from `src/data/home.ts`. They could **not** be
exported from Figma in the environment this page was built in — `www.figma.com`
is blocked by the network egress policy, so the design's raster fills were
unreachable. Drop the real exports in with these exact filenames and the page
picks them up with no code change.

| File | Figma node | Intrinsic size | Used by |
| --- | --- | --- | --- |
| `hero-wireframes.jpg` | 135:139 (Slot 1) | 264x380 | Hero Image Strip |
| `hero-laptop.jpg` | 135:141 (Slot 2) | 264x380 | Hero Image Strip |
| `hero-mobile-storefront.jpg` | 135:143 (Slot 3) | 264x300 | Hero Image Strip |
| `hero-shopify-app.jpg` | 135:145 (Slot 4) | 264x380 | Hero Image Strip |
| `hero-code.jpg` | 135:147 (Slot 5) | 264x380 | Hero Image Strip |
| `why-pair-programming.jpg` | 149:252 (Card / Image) | 427x320 | Why One Team |
| `why-team-workshop.jpg` | 149:265 (Card / Image) | 427x320 | Why One Team |

Export at 2x for retina. Every slot is `object-fit: cover`, so an export that
is larger than the table's size is fine — the aspect ratio is what matters.

Alt text lives beside the paths in `src/data/home.ts`; update it there if the
photography changes.

## Placeholders

The seven `.jpg` files currently committed are generated neutral placeholders
at the 2x sizes above, so layout, spacing and cropping can be reviewed before
the real photography lands. Overwrite them in place — no code change needed.
