import type { CtaAction } from '~/components/sections/Cta.astro';
import type { SectionCopy } from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * The blog's own copy — Figma "Blog · Desktop" (326:8377) and "Blog Post ·
 * Desktop" (326:8378). Post copy lives in `src/content/blog/` as Markdown;
 * everything the pages say around it lives here, like every other page.
 */

export const meta = {
  title: 'Blog — Notes on Building, Growing and Running Shopify Apps | Blinto',
  description:
    'What we learn shipping our own Shopify apps and our clients’ — product decisions, App Store growth, and the maintenance work nobody writes about.',
};

export const hero: SectionCopy = {
  eyebrow: 'Blog',
  heading: 'Notes on Building, Growing and Running Shopify Apps',
  subheading:
    'What we learn shipping our own apps and our clients’ — product decisions, App Store growth, and the maintenance work nobody writes about.',
};

export const latestSection: SectionCopy = {
  eyebrow: 'Latest',
  heading: 'Latest Articles',
  subheading:
    'New posts every other week. No recycled listicles — just what we ran into and what we did about it.',
};

/** Figma's centred button under the Latest grid. Links to the next page. */
export const loadMoreLabel = 'Load More Articles';

/** The "All Articles" pill; the rest of the row is built from the posts. */
export const allTopicsLabel = 'All Articles';

export const relatedSection: SectionCopy = {
  eyebrow: 'Related',
  heading: 'Keep Reading',
  subheading:
    'More from the same corner of the work — pricing, listings and the maintenance nobody budgets for.',
};

/**
 * The closing band.
 *
 * The Figma frames draw a newsletter sign-up here ("Read it before anyone else
 * does" / Subscribe). There is no list to subscribe to yet and no endpoint to
 * post to, and a Subscribe button that opens the contact form is worse than
 * not offering one — so the band ships as the site's standard closing CTA
 * until a newsletter exists. Swapping it back is this one export plus a form.
 */
export const closingCta = {
  kicker: 'Next Step',
  heading: 'Building a Shopify App? Let’s Talk About It',
  body: 'Tell us what you are building and where it is stuck. We will tell you what we would do next, whether or not you hire us.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book a Discovery Call', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};

/** Per-topic listing pages. `%s` is the topic name. */
export const topicMeta = {
  title: '%s — Blinto Blog',
  description: 'Every Blinto article filed under %s.',
};

/** The topic pages' hero. Its heading is the topic name itself. */
export const topicSection = {
  eyebrow: 'Topic',
  subheading: 'Everything we have written on this one, newest first.',
};
