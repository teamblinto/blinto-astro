# Public image assets

These three files are real Figma artwork, exported as SVG and served as-is.
They are referenced with plain `<img>` rather than Astro's `<Image>` because
SVG needs no rasterisation or format conversion.

| File | Figma node | Used by |
| --- | --- | --- |
| `region-us.svg` | 105:125 | Footer — Wyoming office |
| `region-bd.svg` | 105:149 | Footer — Dhaka office |
| `wordmark.svg` | 72:185 | Footer — decorative oversized wordmark |

`region-*.svg` coordinates are rounded to 1dp; these render at 84px, so the
precision is well beyond what is visible. The wordmark carries its own 4%
opacity, matching the design.

**Photography lives in `src/assets/images/`, not here** — that puts it through
Astro's image pipeline (WebP + density srcset). See the README at the repo root.
