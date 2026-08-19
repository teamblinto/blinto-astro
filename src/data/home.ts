import type { IconName } from '~/components/ui/Icon.astro';
import type { CardTone } from '~/components/ui/FeatureCard.astro';

/**
 * Homepage content, kept out of the markup so copy can change without
 * touching layout. Strings are transcribed from the Figma design
 * (node 145:3, "Homepage — Desktop").
 */

export interface HeroImage {
  /** Path under /public. See public/images/README.md for the export list. */
  src: string;
  alt: string;
  /** Figma image height inside the slot, in px. */
  height: number;
  /** Figma slot top offset, in px — this is what forms the hero arc. */
  offset: number;
}

/**
 * Hero Image Strip (Figma 135:137) — "Five staggered photo slots forming the
 * hero arc. Each slot is a FILL-width column whose top padding sets its
 * offset (0/80/160/80/0) and whose image carries a fixed height."
 */
export const heroImages: HeroImage[] = [
  {
    src: '/images/hero-wireframes.jpg',
    alt: 'Designer sketching Shopify app wireframes on paper prototypes',
    height: 380,
    offset: 0,
  },
  {
    src: '/images/hero-laptop.jpg',
    alt: 'Developer reviewing app code on a laptop while holding a phone',
    height: 380,
    offset: 80,
  },
  {
    src: '/images/hero-mobile-storefront.jpg',
    alt: 'Shopper browsing a Shopify storefront on a mobile phone',
    height: 300,
    offset: 160,
  },
  {
    src: '/images/hero-shopify-app.jpg',
    alt: 'Shopify mobile app open on a phone beside a notebook',
    height: 380,
    offset: 80,
  },
  {
    src: '/images/hero-code.jpg',
    alt: 'Close-up of Shopify app source code on a monitor',
    height: 380,
    offset: 0,
  },
];

export const marqueeItems = [
  'Shopify App-Focused Team',
  'Development, Growth, and Support',
  'Built for App-Led Businesses',
];

export interface StageCard {
  icon: IconName;
  tone: CardTone;
  heading: string;
  body: string;
  features?: string[];
  cta: { label: string; href: string };
}

/** Section / Where You Are (148:48) */
export const stageCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'blue',
    heading: 'You Have an App Idea but Need a Clear Path to Launch',
    body: 'You know what your app should do, but turning that idea into a working product takes planning. We help you scope, build, and launch with confidence.',
    cta: { label: 'Discuss Your App Idea', href: '/contact' },
  },
  {
    icon: 'growth',
    tone: 'yellow',
    heading: 'Your App Is Live, but Growth Has Slowed',
    body: "Installs have stalled and merchants aren't sticking around. We sharpen your positioning, boost activation, and turn browsers into loyal users.",
    cta: { label: 'Explore App Growth Support', href: '/services/app-growth' },
  },
  {
    icon: 'support',
    tone: 'green',
    heading: 'Your App Needs Reliable Support After Launch',
    body: 'Bugs pile up and Shopify keeps updating its API. We handle fixes, updates, and day-to-day support so your app stays stable.',
    cta: { label: 'Request Maintenance Support', href: '/contact' },
  },
];

/** Section / What We Do (148:223) */
export const serviceCards: StageCard[] = [
  {
    icon: 'launch',
    tone: 'green',
    heading: 'Turn the Idea Into a Launch-Ready Shopify App',
    body: "We plan the features that matter, build your app on Shopify's API, and test it before launch. You get a product ready for real merchants, not just a demo.",
    features: [
      'MVP and feature planning',
      'Custom Shopify app development',
      'Shopify API integrations',
    ],
    cta: { label: 'Explore App Development', href: '/services/app-development' },
  },
  {
    icon: 'system',
    tone: 'blue',
    heading: 'Build a System for Installs, Activation, and Retention.',
    body: "Getting listed isn't the same as getting used. We work on App Store positioning, SEO, paid media, and the small product changes that keep merchants active.",
    features: [
      'Shopify App Store optimization',
      'SEO, paid media, and content',
      'Activation and retention',
    ],
    cta: { label: 'Explore App Growth', href: '/services/app-growth' },
  },
  {
    icon: 'maintain',
    tone: 'yellow',
    heading: 'Keep the App Stable, Updated, and Easier to Manage',
    body: 'Shopify changes its API. Merchants report bugs. We stay on top of both, so your app keeps running smoothly long after launch day.',
    features: [
      'Bug fixes and updates',
      'Shopify API maintenance',
      'Ongoing technical support',
    ],
    cta: {
      label: 'Explore Support & Maintenance',
      href: '/services/support-maintenance',
    },
  },
];

/**
 * Section / Why One Team (149:241) — a 3-up grid mixing photo cards and
 * belief cards. `kind` decides which of the two a cell renders as, so the
 * designed checkerboard order lives in data rather than in the markup.
 */
export type WhyCell =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'belief'; tone: CardTone; heading: string; body: string };

export const whyCells: WhyCell[] = [
  {
    kind: 'image',
    src: '/images/why-pair-programming.jpg',
    alt: 'Two Blinto engineers reviewing Shopify app code together at a desk',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Product decisions should shape the build',
    body: 'Every technical choice affects the merchant experience. We build with your users, workflows, and business goals in mind, not just the spec sheet.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Growth should not begin after development ends',
    body: 'Waiting until launch to think about growth costs you time. We plan positioning and acquisition while the app is still being built.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Support should continue after launch',
    body: 'A live app needs fixes, updates, and steady attention. We stay involved after launch instead of moving on to the next project.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'One team should understand the whole app journey',
    body: 'Switching teams between stages creates gaps. One team that understands development, growth, and maintenance keeps your app moving forward without losing context.',
  },
  {
    kind: 'image',
    src: '/images/why-team-workshop.jpg',
    alt: 'The Blinto team planning an app roadmap around a shared monitor',
  },
];

/** Section / FAQ (149:266) */
export const faqs = [
  {
    question: 'What does a Shopify expert agency do?',
    answer:
      'A Shopify expert agency helps businesses plan, build, market, and support Shopify products. Blinto focuses specifically on Shopify apps and their full product lifecycle, not general Shopify stores.',
  },
  {
    question: 'Does Blinto build custom Shopify apps?',
    answer:
      'Yes. We scope, design, and build custom Shopify apps on the Shopify API — from an MVP that proves the idea through to a public App Store listing.',
  },
  {
    question: 'Can Blinto help market and grow an existing Shopify app?',
    answer:
      'We do. App Store optimization, SEO, paid media, and activation work are all part of our growth engagements, alongside the product changes that keep merchants active.',
  },
  {
    question: 'Does Blinto provide ongoing Shopify app maintenance?',
    answer:
      'Yes. We handle bug fixes, Shopify API updates, and day-to-day technical support so your app stays stable and compliant long after launch.',
  },
];

/** Section / CTA (150:296) */
export const closingCta = {
  kicker: 'Next Step',
  heading: "Your Shopify App's Next Stage Can Start With One Conversation",
  action: { label: 'Book a Discovery Call', href: '/contact' },
};
