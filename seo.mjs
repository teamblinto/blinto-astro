import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { REDIRECTS } from './redirects.mjs';

/**
 * Writes the three files that tell crawlers — search and answer engines alike —
 * what this site is: `sitemap.xml`, `robots.txt` and `llms.txt`.
 *
 * Titles and descriptions are read back out of the built HTML rather than
 * re-derived from the source. That way there is exactly one source of truth
 * (what actually shipped) and these files cannot describe a page differently
 * from the page itself.
 */

const SITE = 'https://blinto.co';

/**
 * How the sitemap and llms.txt group the site. Anything not listed falls into
 * "Other pages", so a new route is never silently dropped.
 */
const GROUPS = [
  { title: 'Start here', paths: ['/'] },
  {
    title: 'Services',
    match: (p) => p === '/services/' || p.startsWith('/services/'),
  },
  { title: 'Products', paths: ['/shopify-apps/'] },
  {
    title: 'Company',
    paths: ['/about-us/', '/testimonials/', '/career/'],
  },
  {
    title: 'Get in touch',
    paths: ['/contact-us/', '/book-a-call/', '/support/'],
  },
  {
    title: 'Legal',
    paths: ['/privacy-policy/', '/terms-conditions/', '/cookies-policy/'],
  },
];

/** Answer engines we want indexing the site, named so the intent is explicit. */
const ANSWER_ENGINES = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Bytespider',
  'CCBot',
];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const xmlEscape = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function collectPages(root) {
  const pages = [];

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name === 'index.html') {
        const html = await readFile(full, 'utf8');
        // A page that tells crawlers to stay away should not then be
        // advertised in the sitemap or the llms.txt index.
        if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
        const rel = path.relative(root, path.dirname(full)).split(path.sep).join('/');
        const route = rel === '' ? '/' : `/${rel}/`;
        const title = html.match(/<title>([^<]*)<\/title>/);
        const description = html.match(
          /<meta name="description" content="([^"]*)"/,
        );
        pages.push({
          route,
          title: decode(title?.[1] ?? ''),
          description: decode(description?.[1] ?? ''),
        });
      }
    }
  }

  await walk(root);
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

function group(pages) {
  const seen = new Set();
  const grouped = [];

  for (const spec of GROUPS) {
    const members = pages.filter((page) => {
      if (seen.has(page.route)) return false;
      return spec.paths
        ? spec.paths.includes(page.route)
        : spec.match(page.route);
    });
    members.forEach((page) => seen.add(page.route));
    if (members.length) grouped.push({ title: spec.title, members });
  }

  const rest = pages.filter((page) => !seen.has(page.route));
  if (rest.length) grouped.push({ title: 'Other pages', members: rest });

  return grouped;
}

export function emitSeoFiles() {
  return {
    name: 'blinto:seo-files',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const out = (name) => path.join(root, name);
        const pages = await collectPages(root);

        /**
         * No `lastmod`: nothing here tracks per-page edit dates, and a build
         * timestamp on every URL is worse than none — it claims the whole site
         * changed on every deploy, which is exactly why crawlers discount it.
         * `changefreq` and `priority` are omitted for the same reason: Google
         * has said publicly that it ignores both.
         */
        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...pages.map(
            (page) => `  <url><loc>${xmlEscape(SITE + page.route)}</loc></url>`,
          ),
          '</urlset>',
        ].join('\n');
        await writeFile(out('sitemap.xml'), `${sitemap}\n`, 'utf8');

        const robots = [
          '# https://blinto.co',
          '',
          'User-agent: *',
          'Allow: /',
          '',
          '# Answer engines are allowed on purpose: we want Blinto quotable in',
          '# AI answers, not just in search results. Move a name to Disallow to',
          '# opt that one out.',
          ...ANSWER_ENGINES.flatMap((bot) => [
            '',
            `User-agent: ${bot}`,
            'Allow: /',
          ]),
          '',
          `Sitemap: ${SITE}/sitemap.xml`,
          '',
        ].join('\n');
        await writeFile(out('robots.txt'), robots, 'utf8');

        /**
         * llms.txt — the emerging convention for handing a language model a
         * clean map of a site instead of making it infer one from crawled
         * markup. Every entry is the page's own title and meta description.
         */
        const llms = [
          '# Blinto',
          '',
          '> Blinto is a product-focused Shopify expert agency. We help app',
          '> founders and product teams plan, build, grow and support Shopify',
          '> apps, and we build our own. We also do WordPress design, plugin',
          '> development, growth marketing and SEO.',
          '',
          'Offices in Sheridan, Wyoming (US) and Mirpur DOHS, Dhaka (Bangladesh).',
          'Contact: hello@blinto.co',
          '',
          ...group(pages).flatMap(({ title, members }) => [
            `## ${title}`,
            '',
            ...members.map(
              (page) =>
                `- [${page.title}](${SITE}${page.route})` +
                (page.description ? `: ${page.description}` : ''),
            ),
            '',
          ]),
          '## Notes',
          '',
          `- ${Object.keys(REDIRECTS).length} legacy URLs 301 to their new locations; see robots.txt and sitemap.xml for the canonical set.`,
          '- Every page carries a schema.org @graph with the Organization, WebSite, WebPage, breadcrumb and whatever that page is about.',
          '',
        ].join('\n');
        await writeFile(out('llms.txt'), llms, 'utf8');

        logger.info(
          `wrote sitemap.xml (${pages.length} urls), robots.txt and llms.txt`,
        );
      },
    },
  };
}
