import { describe, expect, it } from 'vitest';
import {
  articleHref,
  formatDate,
  indexHref,
  paginateArticles,
  isoDate,
  readingLabel,
  readingTime,
  toneFor,
  topicHref,
  topicSlug,
} from './blog';

describe('readingTime', () => {
  it('rounds to the nearest minute at 200 words a minute', () => {
    expect(readingTime('word '.repeat(200))).toBe(1);
    expect(readingTime('word '.repeat(1200))).toBe(6);
  });

  it('never reports zero minutes for a short post', () => {
    expect(readingTime('Three words here')).toBe(1);
    expect(readingTime('')).toBe(1);
  });

  it('does not count markdown syntax as words', () => {
    const plain = 'word '.repeat(400);
    const marked = `## Heading\n\n${'**word** '.repeat(400)}`;
    expect(readingTime(marked)).toBe(readingTime(plain));
  });

  it('counts a link by its text, not its url', () => {
    const withLink = `[Shopify app development](/services/shopify-app-development/) ${'word '.repeat(199)}`;
    expect(readingTime(withLink)).toBe(1);
  });

  it('ignores the contents of a fenced code block', () => {
    const fenced = `${'word '.repeat(200)}\n\n\`\`\`js\n${'const x = 1;\n'.repeat(200)}\`\`\``;
    expect(readingTime(fenced)).toBe(1);
  });

  it('labels the estimate the way the card prints it', () => {
    expect(readingLabel('word '.repeat(1400))).toBe('7 min read');
  });
});

describe('toneFor', () => {
  it('cycles blue, green, yellow so no two adjacent cards match', () => {
    expect([0, 1, 2, 3, 4, 5].map(toneFor)).toEqual([
      'blue',
      'green',
      'yellow',
      'blue',
      'green',
      'yellow',
    ]);
  });
});

describe('dates', () => {
  it('formats the byline date in full', () => {
    expect(formatDate(new Date('2026-09-12T00:00:00Z'))).toBe(
      '12 September 2026',
    );
  });

  it('formats in UTC rather than the build machine timezone', () => {
    // Late evening UTC would be the next day in Dhaka and the same day in
    // Wyoming; the printed date must not depend on where the build ran.
    expect(formatDate(new Date('2026-09-12T23:30:00Z'))).toBe(
      '12 September 2026',
    );
  });

  it('emits an ISO date for datetime attributes', () => {
    expect(isoDate(new Date('2026-09-12T00:00:00Z'))).toBe('2026-09-12');
  });
});

describe('topicSlug', () => {
  it('slugifies a plain category', () => {
    expect(topicSlug('Shopify Apps')).toBe('shopify-apps');
  });

  it('spells out an ampersand rather than dropping it', () => {
    expect(topicSlug('Maintenance & SEO')).toBe('maintenance-and-seo');
  });

  it('collapses punctuation and trims stray hyphens', () => {
    expect(topicSlug('  App Store — Growth!  ')).toBe('app-store-growth');
  });

  it('builds the topic href from the slug', () => {
    expect(topicHref('App Store Growth')).toBe(
      '/blog/topic/app-store-growth/',
    );
  });
});

describe('paginateArticles', () => {
  const items = Array.from({ length: 14 }, (_, i) => i + 1);

  it('keeps the first page on the bare /blog/ path', () => {
    expect(indexHref(1)).toBe('/blog/');
    expect(indexHref(2)).toBe('/blog/page/2/');
  });

  it('slices a page and reports the total', () => {
    const page = paginateArticles(items, 2, 6);
    expect(page.items).toEqual([7, 8, 9, 10, 11, 12]);
    expect(page.current).toBe(2);
    expect(page.total).toBe(3);
  });

  it('links forward from the first page and back from the last', () => {
    expect(paginateArticles(items, 1, 6)).toMatchObject({
      prevHref: undefined,
      nextHref: '/blog/page/2/',
    });
    expect(paginateArticles(items, 3, 6)).toMatchObject({
      prevHref: '/blog/page/2/',
      nextHref: undefined,
    });
  });

  it('clamps a page number outside the range rather than emptying the page', () => {
    expect(paginateArticles(items, 0, 6).current).toBe(1);
    expect(paginateArticles(items, 99, 6).current).toBe(3);
  });

  it('reports one page when there is nothing to paginate', () => {
    const page = paginateArticles([], 1, 6);
    expect(page).toMatchObject({ items: [], current: 1, total: 1 });
    expect(page.nextHref).toBeUndefined();
  });

  it('does not offer a next page when the posts fit exactly', () => {
    expect(paginateArticles(items.slice(0, 6), 1, 6).nextHref).toBeUndefined();
  });

  it('builds a post href from its collection id', () => {
    expect(articleHref('shopify-app-store-pricing')).toBe(
      '/blog/shopify-app-store-pricing/',
    );
  });
});
