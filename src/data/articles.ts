import { getCollection, type CollectionEntry } from 'astro:content';
import type { ArticleTile } from './types';
import { allTopicsLabel } from './pages/blog';
import {
  articleHref,
  readingLabel,
  toneFor,
  topicHref,
} from '~/lib/blog';

/**
 * The blog collection, in the shapes the sections want.
 *
 * Four routes need the same view of the posts — the index, its later pages,
 * the topic pages and each post's "Keep Reading" row — so the mapping from
 * frontmatter to `ArticleTile` lives here once. `src/lib/blog.ts` holds the
 * pure functions this composes; this module is the part that talks to
 * `astro:content`.
 */

export interface Article {
  entry: CollectionEntry<'blog'>;
  tile: ArticleTile;
  category: string;
  publishDate: Date;
  featured: boolean;
}

/**
 * Every published post, newest first. Drafts are dropped here rather than in
 * each route, so a draft has no URL of its own either.
 *
 * The pastel tone is assigned from a post's position in this list, so a card
 * keeps the same colour wherever it appears — the index, a topic page or a
 * related row — instead of being recoloured by its position in each grid.
 *
 * The counter skips the featured post, because it is lifted out of the grid
 * into the featured panel: counting it would start the grid on the design's
 * second colour. The featured post itself takes the first colour, which is
 * also the panel's, so it looks the same in a related row as it does on the
 * index.
 */
export async function loadArticles(): Promise<Article[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  let position = 0;

  return entries
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .map((entry) => ({
      entry,
      category: entry.data.category,
      publishDate: entry.data.publishDate,
      featured: entry.data.featured,
      tile: {
        headline: entry.data.headline,
        excerpt: entry.data.excerpt,
        href: articleHref(entry.id),
        category: entry.data.category,
        readTime: readingLabel(entry.body ?? ''),
        tone:
          entry.data.tone ??
          (entry.data.featured ? toneFor(0) : toneFor(position++)),
        cover: entry.data.cover,
        coverAlt: entry.data.coverAlt,
      },
    }));
}

/**
 * The post the index leads with, and everything else in order.
 *
 * More than one post can carry `featured: true` — the schema cannot stop that
 * — so the most recent wins and the others simply stay in the grid.
 *
 * Lifting the featured post out of the grid is what stops the index printing
 * the same headline twice. The exception is a blog with a single post: taking
 * it out would leave Latest Articles an empty row, and an empty row reads as
 * something broken rather than as a blog that has published once. So while
 * there is nothing else to show, the panel and the grid are the same post.
 */
export function splitFeatured(articles: Article[]): {
  featured?: Article;
  rest: Article[];
} {
  const featured = articles.find((article) => article.featured);
  if (!featured) return { featured, rest: articles };

  const rest = articles.filter((article) => article !== featured);
  return { featured, rest: rest.length > 0 ? rest : articles };
}

/**
 * The topic row, built from the categories the posts actually use so a pill
 * can never point at an empty page. "All Articles" leads, then the topics in
 * the order their newest post appears.
 */
export function topicRow(articles: Article[]) {
  const topics: { label: string; href: string }[] = [
    { label: allTopicsLabel, href: '/blog/' },
  ];

  for (const article of articles) {
    if (topics.some((topic) => topic.label === article.category)) continue;
    topics.push({
      label: article.category,
      href: topicHref(article.category),
    });
  }

  return topics;
}

/**
 * "Keep Reading" for one post: same topic first, then the most recent of
 * everything else, so a post in a one-article topic still gets a full row.
 *
 * Matched by id rather than by object identity — a route that received its
 * article through `getStaticPaths` props holds a serialised copy, not the
 * same object this list contains.
 */
export function relatedTo(
  articles: Article[],
  currentId: string,
  limit = 3,
): Article[] {
  const current = articles.find((article) => article.entry.id === currentId);
  const others = articles.filter((article) => article.entry.id !== currentId);
  if (!current) return others.slice(0, limit);

  const sameTopic = others.filter(
    (article) => article.category === current.category,
  );
  const elsewhere = others.filter(
    (article) => article.category !== current.category,
  );

  return [...sameTopic, ...elsewhere].slice(0, limit);
}
