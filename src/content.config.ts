import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
/**
 * `z` re-exported from `astro:content` is deprecated in Astro 7, and pulling
 * `zod` straight from the registry would add a second copy of a library
 * Astro already ships. `astro/zod` is Astro's own export of the one it uses.
 */
import { z } from 'astro/zod';

/**
 * The blog.
 *
 * Every other page keeps its copy in `src/data` as TypeScript, because every
 * other page is cards and grids whose shape the design fixes. A blog post is
 * the one thing on this site that is genuinely running prose written by
 * somebody who is not editing components, so it lives as Markdown instead:
 * drop a `.md` file in `src/content/blog/` and it is published.
 *
 * Nothing here is optional-by-accident. A field is optional only where the
 * design has an honest empty state for it — the cover slot, which falls back
 * to a neutral surface and a pending note the way Card / Product does.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      /** The `<title>`. Kept separate from `headline` so the tab and the
          page can differ in length without one being a compromise. */
      title: z.string(),
      /** The meta description, and the excerpt search results show. */
      description: z.string(),
      /** The article's own headline, as typeset on the page and the card. */
      headline: z.string(),
      /** Card and featured-panel standfirst. */
      excerpt: z.string(),
      /** One topic per post. Becomes the card's overline and its topic page. */
      category: z.string(),
      author: z.string(),
      publishDate: z.coerce.date(),
      /** Set when a post is materially revised, not for a typo fix. */
      updatedDate: z.coerce.date().optional(),
      /**
       * The single post the index leads with. Exactly one post should carry
       * it; if several do, the most recent wins and the rest fall back into
       * the grid.
       */
      featured: z.boolean().default(false),
      /**
       * Pastel fill for this post's card. Left unset, the grid cycles
       * blue → green → yellow the way the design does, which is almost
       * always what you want — set it only to pin a particular card.
       */
      tone: z.enum(['blue', 'green', 'yellow']).optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Keeps a post out of the build entirely, including its own URL. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
