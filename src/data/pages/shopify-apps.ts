import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  CardImage,
  ProcessStep,
  ProductTile,
  SectionCopy,
  StageCard,
} from '../types';
import heroBanner from '~/assets/images/apps-hero-banner.jpg';
import whyOne from '~/assets/images/apps-why-1.jpg';
import whyTwo from '~/assets/images/apps-why-2.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Our Apps — built from Figma "Our Apps · Desktop" (269:5897). Copy is the
 * design's, verbatim.
 *
 * The design labels every per-app CTA "Explore <app>" but the approved sitemap
 * has no per-app route, so there is nowhere for those to point yet. Each app
 * therefore carries an optional `storeUrl`: while it is unset the CTA jumps to
 * that app's card in the Product Tour, which is a real destination on this
 * page; setting it switches the CTA to the live Shopify App Store listing. No
 * invented URLs, and no dead links either way.
 */

export const meta = {
  title: 'Shopify Apps by Blinto — Built Around Real Merchant Problems',
  description:
    'Blinto builds Shopify apps around real merchant needs: gifting with Giftify, post-purchase selling with GrowSell, and onsite offers with Smart Pop-Up.',
};

/** Set these once the App Store listings are confirmed. */
const APPS = {
  giftify: { name: 'Giftify', storeUrl: undefined as string | undefined },
  growsell: { name: 'GrowSell', storeUrl: undefined as string | undefined },
  popups: {
    name: 'Smart Pop-Up Offer Builder',
    storeUrl: undefined as string | undefined,
  },
};

const TOUR_ANCHOR = '#product-tour';

const appHref = (app: { storeUrl?: string }) => app.storeUrl ?? TOUR_ANCHOR;

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Our Apps',
  heading:
    'Shopify Apps Built Around the Problems Merchants Want to Solve',
  subheading:
    'Blinto builds Shopify apps around real merchant needs, from better shopper experiences to new opportunities for conversion, engagement, and growth.',
  actions: [
    { label: 'Explore Shopify Apps', href: '#the-apps', tone: 'black' },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'A merchant serving a customer at a shop counter',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* -------------------------------------------------------- where you are */

export const opportunitySection: SectionCopy = {
  eyebrow: 'Where You Are',
  heading: 'Every Shopify Store Has a Different Opportunity to Unlock',
  subheading:
    'One merchant wants better gifting. Another wants more order value, more engagement, or more conversions. The right app starts with the opportunity.',
};

/** Five cards on one wrapping line: 3 x 426 then 2 x 650 at 1440. */
export const opportunityCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Turn a Purchase Into a More Personal Gift',
    body: 'Add gift wrap, notes, and delivery dates.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Create More Value After the First Purchase Decision',
    body: 'Offer more after checkout.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Engage Visitors Before They Leave',
    body: 'Capture attention before they bounce.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Put Relevant Offers in Front of the Right Shopper',
    body: 'Show the right message at the right time.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Create Better Moments Across the Store Journey',
    body: 'Support shoppers at every touchpoint.',
  },
];

/* ---------------------------------------------------------------- the apps */

export const appsSection: SectionCopy = {
  eyebrow: 'The Apps',
  heading: 'Find the Shopify App That Fits What Your Store Needs Next',
  subheading:
    'We design each Shopify app around a specific merchant problem, then build the tools to solve it well.',
};

export const appCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'green',
    heading: 'Make It Easier for Shoppers to Turn an Order Into a Gift',
    body: 'Giftify helps merchants add personalized gifting options directly into the shopping journey. Shoppers can choose gift wrap, write a personal note, and pick a delivery date, all without leaving the checkout flow merchants already use.',
    features: [
      'Gift wrap options',
      'Gift notes and messages',
      'Delivery date selection',
    ],
    cta: { label: 'Explore Giftify', href: appHref(APPS.giftify) },
  },
  {
    icon: 'growth',
    tone: 'blue',
    heading: 'Keep the Customer Journey Creating Opportunity After Checkout',
    body: 'GrowSell helps merchants create targeted post-purchase and thank-you-page offers. It gives stores another chance to grow order value right after the buying decision, using conditions merchants set and test over time.',
    features: [
      'Post-purchase upsells',
      'Targeted offer conditions',
      'Campaign testing and analytics',
    ],
    cta: { label: 'Explore GrowSell', href: appHref(APPS.growsell) },
  },
  {
    icon: 'launch',
    tone: 'yellow',
    heading: 'Reach Visitors With the Right Offer at the Right Moment',
    body: 'Smart Pop-Up Offer Builder helps merchants create targeted onsite offers, lead-capture forms, and announcements. Each popup appears based on timing, page, audience, and device, so the message reaches the right shopper.',
    features: [
      'Targeted popup campaigns',
      'Triggers and frequency controls',
      'Conversion performance tracking',
    ],
    cta: {
      label: 'Explore Smart Pop-Up Offer Builder',
      href: appHref(APPS.popups),
    },
  },
];

/* ----------------------------------------------------------- find your fit */

export const fitSection: SectionCopy = {
  eyebrow: 'Find Your Fit',
  heading: 'Start With What You Want to Improve in Your Store',
  subheading:
    'You do not need to start with an app name. Start with the store experience, revenue opportunity, or customer interaction you want to improve, and we will point you to the right product.',
};

/** Routing tiles: icon, question, button. Figma's Show body=false. */
export const fitCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'green',
    heading: 'Want a better gifting experience?',
    cta: { label: 'Explore Giftify', href: appHref(APPS.giftify) },
  },
  {
    icon: 'growth',
    tone: 'blue',
    heading: 'Want to create post-purchase upsell opportunities?',
    cta: { label: 'Explore GrowSell', href: appHref(APPS.growsell) },
  },
  {
    icon: 'launch',
    tone: 'yellow',
    heading: 'Want to engage or convert more onsite visitors?',
    cta: {
      label: 'Explore Smart Pop-Up Offer Builder',
      href: appHref(APPS.popups),
    },
  },
];

export const fitNote =
  'Each path leads straight to the app built for that specific goal.';

/* ---------------------------------------------------------- how we build */

export const buildSection: SectionCopy = {
  eyebrow: 'How We Build',
  heading: 'Each App Starts With a Real Merchant Problem',
  subheading:
    'Our products begin with a specific moment merchants want to improve in their store. The technology comes after we understand the shopper, the workflow, and the real business need behind it.',
};

export const buildCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Solve a Specific Store Problem',
    body: 'Every product starts with an identifiable merchant or shopper need.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Keep Merchant Control Simple',
    body: 'Settings, customization, and targeting stay easy to manage.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Fit Into the Existing Shopify Journey',
    body: 'Our apps support merchant workflows instead of adding unnecessary complexity.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Measure What Happens Next',
    body: 'Where it matters, merchants get visibility into app and campaign activity.',
  },
];

/* ------------------------------------------------------------- the journey */

export const journeySection: SectionCopy = {
  eyebrow: 'The Journey',
  heading:
    'Different Apps Can Improve Different Moments in the Customer Journey',
  subheading:
    'A merchant’s challenges show up at different moments. Our Shopify apps are built to improve specific interactions instead of forcing every problem into one product.',
};

export const journeySteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'yellow',
    heading: 'Visit',
    body: 'Smart Pop-Up Offer Builder — engagement',
  },
  { number: '02', tone: 'green', heading: 'Purchase', body: 'Giftify — gifting' },
  {
    number: '03',
    tone: 'blue',
    heading: 'Post-Purchase',
    body: 'GrowSell — order value',
  },
];

export const journeyNote =
  'Each app picks up where the last moment leaves off, so the journey feels connected instead of scattered.';

/* ------------------------------------------------------------ product tour */

export const tourSection: SectionCopy = {
  eyebrow: 'Product Tour',
  heading: 'See the Product Experience Before You Choose What Fits',
  subheading:
    'Explore how each product handles its own workflow, from configuring gift options and writing gift notes to building popup offers, targeting the right visitors, and tracking campaign performance in real time. Every screenshot comes from the live app merchants use, not a concept design.',
};

/**
 * The design ships these slots deliberately empty, with a pending note rather
 * than a stand-in photo: the section promises screenshots of the live app, so
 * anything else here would be a claim the page cannot make yet.
 */
export const products: ProductTile[] = [
  {
    name: 'Giftify',
    description:
      'Live app screenshot pending — the brief specifies real screenshots from the live app, not concept designs.',
    tone: 'green',
    note: 'UI screenshot',
  },
  {
    name: 'GrowSell',
    description:
      'Live app screenshot pending — the brief specifies real screenshots from the live app, not concept designs.',
    tone: 'blue',
    note: 'UI screenshot',
  },
  {
    name: 'Smart Pop-Up Offer Builder',
    description:
      'Live app screenshot pending — the brief specifies real screenshots from the live app, not concept designs.',
    tone: 'yellow',
    note: 'UI screenshot',
  },
];

/* ---------------------------------------------------------- why it matters */

export const whySection: SectionCopy = {
  eyebrow: 'Why It Matters',
  heading:
    'Building Shopify Apps Gives Blinto a Merchant-Side View of the Ecosystem',
  subheading:
    'We are not just listing recommended apps here. Every product on this page is one we designed and built ourselves. That work keeps us close to the merchant problems, workflows, and decisions that shape useful apps across the Shopify ecosystem. Building them ourselves means we understand what merchants actually need before we ever start writing code.',
};

export const whyCells: BeliefCell[] = [
  {
    kind: 'image',
    image: {
      src: whyOne,
      alt: 'A merchant at work in their store',
      width: 650,
      height: 360,
    },
  },
  {
    kind: 'image',
    image: {
      src: whyTwo,
      alt: 'Shopping bags arranged on a dark surface',
      width: 650,
      height: 360,
    },
  },
];

export const whyAction: CtaAction = {
  label: 'Learn How We Build Shopify Apps',
  href: '/services/shopify-app-development/',
  tone: 'black',
};

/* -------------------------------------------------------------------- faq */

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Questions Merchants Ask About Blinto’s Shopify Apps',
  subheading:
    'Short answers to the questions we hear most about the app portfolio.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What Shopify apps does Blinto build?',
    answer:
      'We build Shopify apps around practical merchant needs like gifting, post-purchase selling, shopper engagement, and conversion. The portfolio is designed to grow as we build solutions for more needs.',
  },
  {
    question: 'Which Blinto Shopify app is right for my store?',
    answer:
      'It depends on the problem you want to solve. Gifting points to Giftify, post-purchase upselling points to GrowSell, and onsite offers or lead capture point to Smart Pop-Up Offer Builder.',
  },
  {
    question: 'Where can I learn more about each Shopify app?',
    answer:
      'Open the product page for the app you are interested in, or check its verified Shopify App Store listing for full details, screenshots, reviews, and pricing information.',
  },
  {
    question: 'Does Blinto plan to add more Shopify apps?',
    answer:
      'Our Shopify apps page is designed as a growing product portfolio, not a fixed list. We add new products as we build solutions for additional merchant needs.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Find the Shopify App That Fits Your Store’s Next Opportunity',
  body: 'Whether you want to improve gifting, post-purchase selling, visitor engagement, or another part of the store journey, start with the Shopify app built for that exact opportunity and see how it fits your store.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Explore Shopify Apps', href: '#the-apps', tone: 'black' },
    { label: 'Contact Blinto', href: '/contact-us/', tone: 'white' },
  ] satisfies CtaAction[],
};
