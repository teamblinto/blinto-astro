import type { CardTone } from '~/components/ui/FeatureCard.astro';

/**
 * Shapes shared by every service page's content module, and by the section
 * shells in `src/components/sections/page/` that render them.
 *
 * These live here rather than in one page's module so a shell never has to
 * import from a particular page to know its own prop types.
 */

/**
 * The eyebrow / heading / subheading triple every Section Header carries.
 *
 * `subheading` is optional because several sections migrated from WordPress
 * have a heading and nothing else, and inventing a supporting line would be
 * writing copy rather than migrating it.
 */
export interface SectionCopy {
  eyebrow: string;
  heading: string;
  subheading?: string;
}

export interface CardImage {
  src: ImageMetadata;
  alt: string;
  /** Designed slot size from Figma, in px. */
  width: number;
  height: number;
}

/** Card / List (Figma 173:1127). */
export interface ListPanel {
  tone: CardTone;
  heading: string;
  subheading?: string;
  items: string[];
}

/** A cell in a belief grid: either a statement card or a photo tile. */
export type BeliefCell =
  | { kind: 'belief'; tone: CardTone; heading: string; body?: string }
  | { kind: 'image'; image: CardImage };

/**
 * Card / Feature (Figma 129:96) without its tick list. `cta` is Figma's
 * "Show button" — omitted it gives the short, button-less stage card.
 */
export interface StageCard {
  icon: import('~/components/ui/Icon.astro').IconName;
  tone: CardTone;
  heading: string;
  body: string;
  cta?: { label: string; href?: string };
}

/**
 * Client quote. The Figma library has no testimonial component, so QuoteCard
 * builds one from Card / Belief's shape; `tone` picks the pastel fill the same
 * way every other card in the system does.
 */
export interface Testimonial {
  /** Only /testimonials/ carries a headline above the quote. */
  heading?: string;
  quote: string;
  name: string;
  role: string;
  tone: CardTone;
}

/** Card / Person (Figma 247:4815) — portrait, name, role. No bio by design. */
export interface Person {
  name: string;
  role: string;
  photo: ImageMetadata;
  /**
   * Fill painted behind the portrait. Most exports bake their studio backdrop
   * into the image; a cut-out with a transparent background needs the colour
   * supplied here instead.
   */
  photoBackground?: string;
}

/**
 * Card / Step (Figma 170:1056). `body` is Figma's "Show body" — omit it for
 * the heading-only timeline stage the About page's Our Story row uses.
 */
export interface ProcessStep {
  number: string;
  tone: CardTone;
  heading: string;
  body?: string;
}

/**
 * A portfolio tile: a live client site, its sector, and a screenshot. The
 * shots are the ones the WordPress site served, kept in `src/assets` so they
 * survive the platform move.
 */
export interface WorkItem {
  name: string;
  sector: string;
  /** A short case note, printed under the tile on /website-maintenance/. */
  body?: string;
  href: string;
  shot: ImageMetadata;
}

/**
 * One block of legal prose. The privacy, terms and cookie policies are
 * migrated word for word, so they are stored as a block list rather than as
 * markup: the copy stays in `src/data` like every other page's, and
 * `LegalProse` decides how each block is typeset.
 */
export type LegalBlock =
  | { kind: 'heading'; level: 2 | 3 | 4; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] };
