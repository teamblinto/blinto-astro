// @ts-check
import { defineConfig } from 'astro/config';
import { emitHostRedirects } from './redirects.mjs';
import { emitSeoFiles } from './seo.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blinto.co',
  /**
   * The approved sitemap and the current WordPress site both canonicalise to a
   * trailing slash, so pin it rather than leaving it to the host. Every
   * internal link is written with the slash, which keeps launch-day requests
   * off a needless 301 hop.
   */
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    /** Launch 301s for the WordPress URLs that move. See `redirects.mjs`. */
    emitHostRedirects(),
    /** sitemap.xml, robots.txt and llms.txt. See `seo.mjs`. */
    emitSeoFiles(),
  ],
});
