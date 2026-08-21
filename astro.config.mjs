// @ts-check
import { defineConfig } from 'astro/config';

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
});
