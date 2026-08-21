import type { CardTone } from '~/components/ui/FeatureCard.astro';

/**
 * Shapes shared by every service page's content module, and by the section
 * shells in `src/components/sections/service/` that render them.
 *
 * These live here rather than in one page's module so a shell never has to
 * import from a particular page to know its own prop types.
 */

/** The eyebrow / heading / subheading triple every Section Header carries. */
export interface SectionCopy {
  eyebrow: string;
  heading: string;
  subheading: string;
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
  | { kind: 'belief'; tone: CardTone; heading: string; body: string }
  | { kind: 'image'; image: CardImage };

/** Card / Feature (Figma 129:96) in its short, button-less stage form. */
export interface StageCard {
  icon: import('~/components/ui/Icon.astro').IconName;
  tone: CardTone;
  heading: string;
  body: string;
}

/** Card / Step (Figma 170:1056). */
export interface ProcessStep {
  number: string;
  tone: CardTone;
  heading: string;
  body: string;
}
