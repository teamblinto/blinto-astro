// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
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

  /**
   * Output stays static: all 21 pages prerender exactly as before. The adapter
   * is here for one route — `/api/contact/`, which opts out with
   * `export const prerender = false` — and everything else is served from
   * Cloudflare's asset storage without touching the Worker.
   */
  adapter: cloudflare({
    /**
     * Non-negotiable, and the reason commit 5e8642d existed. The adapter's
     * default is `cloudflare-binding`, which defers image transformation to
     * runtime and makes `<Image>` emit `/_image?href=…` URLs. Nothing served
     * those on an assets-only deploy, so every image 404'd. `compile` keeps
     * optimisation at build time, writing hashed files into `_astro/`.
     *
     * `scripts/check-build-output.mjs` asserts this after every build.
     */
    imageService: 'compile',
  }),

  build: {
    inlineStylesheets: 'auto',
  },

  security: {
    /**
     * Rejects a POST to an on-demand route whose `Origin` header is not this
     * site. Astro enables this by default; it is written out because it is the
     * contact endpoint's cross-site request forgery defence and should not be
     * removed without a replacement.
     */
    checkOrigin: true,
  },

  /**
   * Typed environment variables. `access: 'secret'` is the guarantee the task
   * asked for: a secret is readable only from `astro:env/server`, and importing
   * one into client code fails the build rather than inlining it into a bundle.
   *
   * The two secrets are optional here because Cloudflare Worker secrets do not
   * exist at build time. Their absence is caught at request time instead, in
   * `handleContactSubmission`, which refuses the submission rather than
   * silently dropping mail.
   */
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      /**
       * Blinto's Turnstile widget. Public by nature — it renders into the
       * widget markup and is visible in the page source, so it lives here
       * rather than in a build variable that a new environment could forget.
       * Its secret half is `TURNSTILE_SECRET_KEY` above.
       *
       * Override in `.env` to point local development at a different widget —
       * Cloudflare's always-passes test key is `1x00000000000000000000AA` —
       * which is what you need if this widget's hostname list omits localhost.
       */
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        default: '0x4AAAAAAEbQmi88eyau51tl',
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'hello@blinto.co',
      }),
      /** Must be an address on a domain verified in Resend. */
      CONTACT_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'Blinto <noreply@blinto.co>',
      }),
    },
  },

  integrations: [
    /** Launch 301s for the WordPress URLs that move. See `redirects.mjs`. */
    emitHostRedirects(),
    /** sitemap.xml, robots.txt and llms.txt. See `seo.mjs`. */
    emitSeoFiles(),
  ],
});
