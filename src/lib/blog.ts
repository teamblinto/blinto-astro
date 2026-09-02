/**
 * Blog helpers.
 *
 * Framework-free on purpose, like the rest of `src/lib/`: everything here is a
 * pure function over frontmatter and body text, so it is unit tested rather
 * than eyeballed in a built page.
 *
 * The pastel tone is here rather than in frontmatter because the design cycles
 * it — blue, green, yellow — across the card grid instead of tying it to a
 * topic. Making an author choose would mean two adjacent cards can come out the
 * same colour, which the design never does.
 */

/** Matches `CardTone` in `FeatureCard.astro`, without importing a component. */
export type Tone = 'blue' | 'yellow' | 'green';

/** Figma's order in the Latest grid: blue, green, yellow, repeating. */
const TONE_CYCLE: Tone[] = ['blue', 'green', 'yellow'];

export function toneFor(index: number): Tone {
  return TONE_CYCLE[index % TONE_CYCLE.length];
}

/**
 * Reading time in whole minutes.
 *
 * 200 words a minute is the conservative end of the usual 200–250 range, so
 * the estimate errs long rather than short. Markdown syntax is stripped first
 * — a fenced code block's backticks and a link's URL are not words somebody
 * reads — and anything under a minute still reads "1 min" rather than "0".
 */
export function readingTime(markdown: string): number {
  const prose = markdown
    // Fenced code: counted as its own lines, not as its syntax.
    .replace(/```[\s\S]*?```/g, ' ')
    // Images and links: keep the visible text, drop the target.
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Inline marks.
    .replace(/[*_`>#|-]+/g, ' ');

  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** "6 min read" — the string the card's meta row prints. */
export function readingLabel(markdown: string): string {
  return `${readingTime(markdown)} min read`;
}

/**
 * "12 September 2026". Pinned to `en-GB` and UTC so the string a visitor sees
 * matches the string the build produced — a date formatted in the server's
 * local zone can land a day out either side of midnight.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** `2026-09-12` — the value a `<time datetime>` and a schema date want. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * URL segment for a topic page. Lower-cased, ampersands spelled out so
 * "Maintenance & SEO" cannot produce an empty segment, everything else
 * collapsed to single hyphens.
 */
export function topicSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** `/blog/topic/shopify-apps/` — built here so no page hardcodes the shape. */
export function topicHref(category: string): string {
  return `/blog/topic/${topicSlug(category)}/`;
}

/* ------------------------------------------------------------- pagination */

/** `/blog/how-merchants-choose-a-shopify-app/` from a collection entry id. */
export function articleHref(id: string): string {
  return `/blog/${id}/`;
}

/**
 * Cards per index page. Six is the design's grid — three across, two rows —
 * so a full page of the blog looks like the frame it came from.
 */
export const ARTICLES_PER_PAGE = 6;

/**
 * `/blog/` for the first page and `/blog/page/2/` after it.
 *
 * The first page keeps the bare path because that is the URL the site links
 * to and the one search engines already know; a `/blog/page/1/` duplicate of
 * it would be a canonical problem for no gain.
 */
export function indexHref(page: number): string {
  return page <= 1 ? '/blog/' : `/blog/page/${page}/`;
}

export interface ArticlePage<T> {
  items: T[];
  current: number;
  total: number;
  prevHref?: string;
  nextHref?: string;
}

/**
 * Slices a sorted post list into one index page.
 *
 * Written here rather than using the generator's own paginator because both
 * `/blog/` and `/blog/page/[page]/` need the same slice from two different
 * routes, and one tested function beats two mechanisms that have to agree.
 */
export function paginateArticles<T>(
  items: T[],
  current: number,
  perPage: number = ARTICLES_PER_PAGE,
): ArticlePage<T> {
  const total = Math.max(1, Math.ceil(items.length / perPage));
  const page = Math.min(Math.max(1, Math.trunc(current)), total);
  const start = (page - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    current: page,
    total,
    prevHref: page > 1 ? indexHref(page - 1) : undefined,
    nextHref: page < total ? indexHref(page + 1) : undefined,
  };
}
