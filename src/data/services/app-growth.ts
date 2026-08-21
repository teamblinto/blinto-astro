import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  CardImage,
  ListPanel,
  ProcessStep,
  SectionCopy,
  StageCard,
} from './types';

import heroBanner from '~/assets/images/grw-hero-banner.jpg';
import whereGrowthStalls from '~/assets/images/grw-where-growth-stalls.jpg';
import growthFunnel from '~/assets/images/grw-growth-funnel.jpg';
import whyBlintoCafe from '~/assets/images/grw-why-blinto-1.jpg';
import whyBlintoWorkshop from '~/assets/images/grw-why-blinto-2.jpg';
import keepLearning from '~/assets/images/grw-keep-learning.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Shopify App Growth service page content, transcribed from the Figma design
 * (node 232:2234, "Service — Shopify App Growth · Desktop").
 *
 * Alt text is authored here: the design carries no alternative text, so each
 * string describes the photograph that shipped in that slot.
 */

export const meta = {
  title:
    'Shopify App Marketing & Growth Services — Blinto | Installs, Activation, Retention',
  description:
    'Blinto helps Shopify app teams turn visibility into qualified installs, stronger activation and lasting retention through marketing built around the product.',
};

/* ------------------------------------------------------------------- hero */

/** Section / Hero (Figma 232:2262). */
export const hero = {
  eyebrow: 'Shopify App Growth',
  heading:
    'Turn More App Visibility Into Installs, Activation, and Growth With Shopify App Marketing',
  subheading:
    'Turn app visibility into real growth. We help Shopify app teams win qualified installs, stronger activation, and lasting retention through marketing built around the product.',
  actions: [
    { label: 'Book a Growth Strategy Call', href: '/contact', tone: 'black' },
    {
      label: 'Explore Our Growth Process',
      href: '#our-process',
      tone: 'outline',
    },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'Analytics dashboard showing user retention bar charts and session metrics on a dark screen',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* ------------------------------------------------- where growth stalls ---- */

/** Section / Where Growth Stalls (Figma 233:2277). */
export const growthStallsSection: SectionCopy = {
  eyebrow: 'Where Growth Stalls',
  heading: 'Launching the App Was Only the Beginning',
  subheading:
    "Shipping the app felt like the hard part. Then growth became the real challenge, and traffic alone couldn't fix it.",
};

export const growthStallsPanel: ListPanel = {
  tone: 'blue',
  heading:
    'A live app can attract attention and still struggle to grow. What happens before, during, and after install decides everything.',
  subheading: 'Common growth challenges include',
  items: [
    "Traffic that doesn't convert into installs",
    'Weak App Store positioning',
    'Installs without activation',
    'Early user drop-off during onboarding',
    'Marketing channels running in isolation',
  ],
};

export const growthStallsImage: CardImage = {
  src: whereGrowthStalls,
  alt: 'Flat-lay of a handwritten marketing strategy note beside a pricing guide, pens and a plant on a wooden desk',
  width: 650,
  height: 376,
};

/* --------------------------------------------------------- where you are */

/** Section / Where You Are (Figma 233:2317). */
export const stagesSection: SectionCopy = {
  eyebrow: 'Where You Are',
  heading: 'Every Stalled App Has a Different Growth Bottleneck',
  subheading:
    'Growth stalls in different places for different teams. Spotting where your app sits today helps us build the right plan.',
};

export const stageCards: StageCard[] = [
  {
    icon: 'growth',
    tone: 'blue',
    heading: 'Merchants See the App but Do Not Install',
    body: "Merchants find the listing, then keep scrolling. Unclear positioning, weak messaging, or a listing that doesn't build trust usually causes this.",
  },
  {
    icon: 'launch',
    tone: 'yellow',
    heading: 'Users Install but Never Reach the First Value Moment',
    body: 'Installs happen, but users stall during setup. Confusing onboarding and unclear next steps keep them from seeing what the app can do.',
  },
  {
    icon: 'admin',
    tone: 'green',
    heading: 'Growth Has Plateaued Across Every Channel',
    body: "Every channel performs fine on its own, yet growth won't move. Disconnected campaigns and unclear priorities usually explain the plateau.",
  },
];

/* ------------------------------------------------------------ what we do */

/** Section / What We Do (Figma 233:2424). */
export const whatWeDoSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading: 'Real Shopify App Growth Connects More Than One Marketing Channel',
  subheading:
    "One channel rarely fixes an app's whole growth problem. Real growth connects discovery, conversion, onboarding, and retention.",
};

export const whatWeDoCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'App Positioning and Messaging',
    body: "We sharpen your app's positioning, audience, and value proposition, so merchants understand why it matters within seconds of finding it.",
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Shopify App Store Listing Optimization',
    body: "We rework your listing's title, description, and visuals so browsers convert into qualified installs instead of scrolling past.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'SEO and Content for App Growth',
    body: 'We build Shopify app SEO and content that helps merchants discover your app through search, not just paid traffic.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Paid Media and Acquisition Support',
    body: 'We run paid search and targeted campaigns with messaging built for app installs, not generic ecommerce clicks.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Activation and Retention Improvement',
    body: 'We find onboarding friction and activation gaps, helping new users reach their first real outcome faster.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Reviews and Trust Building',
    body: 'We help build a steady flow of genuine reviews, since trust signals shape both install decisions and merchant confidence.',
  },
];

/* ------------------------------------------------------- the growth funnel */

/** Section / The Growth Funnel (Figma 233:2453). */
export const funnelSection: SectionCopy = {
  eyebrow: 'The Growth Funnel',
  heading: 'Traffic Matters Only When Merchants Take the Next Step',
  subheading:
    'Traffic is just the start of the story. Growth happens across six connected stages of the merchant journey.',
};

export const funnelPanel: ListPanel = {
  tone: 'green',
  heading: 'Six stages of the merchant journey',
  items: [
    'Discover: Merchants come across the app through search, ads, or referral.',
    'Understand: Positioning makes the value obvious right away.',
    'Install: Curiosity turns into action inside the App Store.',
    'Activate: New users reach their first meaningful outcome.',
    'Retain: The app keeps proving its worth after setup.',
    'Advocate: Happy merchants leave reviews and recommend it to others.',
  ],
};

export const funnelImage: CardImage = {
  src: growthFunnel,
  alt: 'Hand-drawn growth chart climbing across a notepad beside a ruler, pen and planner',
  width: 650,
  height: 289,
};

/* ------------------------------------------------------------ our process */

/** Section / Our Process (Figma 234:2405). */
export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'A Clear Growth Process Replaces Guesswork With Better Priorities',
  subheading:
    "We don't guess where to start. Evidence from your app and funnel tells us where growth is actually stuck.",
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'First, We Understand Where Growth Stands Today',
    body: 'We review your app, listing, website, traffic sources, and current campaigns to see the full picture.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Then, We Find Where Merchants Are Dropping Off',
    body: 'We trace the funnel to see whether visibility, conversion, onboarding, or retention needs attention first.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Next, We Set the Highest-Impact Priorities',
    body: 'We build a focused plan around the biggest opportunities instead of spreading effort across every channel at once.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'The Right Channels Put the Plan Into Action',
    body: 'We execute SEO, content, paid media, listing updates, or lifecycle work based on what the strategy calls for.',
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Finally, We Learn and Keep Improving',
    body: 'We track performance, reviews, and user behavior to refine what comes next.',
  },
];

export const processAction: CtaAction = {
  label: 'Book a Growth Strategy Call',
  href: '/contact',
  tone: 'black',
};

/* ------------------------------------------------------------ why blinto */

/** Section / Why Blinto (Figma 234:2451). */
export const whyBlintoSection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading:
    'Your Marketing Partner Should Understand the Product Behind the Campaign',
  subheading:
    "Campaigns alone can't fix a product problem. We connect marketing decisions with how your app actually works.",
};

export const whyBlintoCells: BeliefCell[] = [
  {
    kind: 'image',
    image: {
      src: whyBlintoCafe,
      alt: 'Three colleagues laughing together over laptops at a café table',
      width: 427,
      height: 320,
    },
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'App Growth, Not Generic Store Marketing',
    body: 'Shopify apps need different audiences, funnels, and metrics than Shopify stores. We build around app-specific behavior, not store traffic.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Product and Marketing Decisions Work Together',
    body: 'Positioning, onboarding, and marketing shape each other. We treat them as one connected system, not separate tasks.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'The Whole Funnel Matters More Than Install Volume',
    body: "Installs alone don't build a business. We care just as much about activation, retention, and reviews.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Clear Priorities Come Before More Campaigns',
    body: 'We diagnose the real bottleneck first, so every campaign we run solves an actual problem.',
  },
  {
    kind: 'image',
    image: {
      src: whyBlintoWorkshop,
      alt: 'Team workshop with a presenter pointing at sticky notes on a wall while colleagues work at a table',
      width: 427,
      height: 320,
    },
  },
];

/* --------------------------------------------------------- keep learning */

/** Section / Keep Learning (Figma 234:2558). */
export const keepLearningSection: SectionCopy = {
  eyebrow: 'Keep Learning',
  heading:
    'Growth Becomes Stronger When Marketing and Product Keep Learning Together',
  subheading:
    "Growth doesn't stop at the campaign. What we learn from merchants shapes the product too.",
};

export const keepLearningPanel: ListPanel = {
  tone: 'blue',
  heading: 'What we learn from merchants',
  items: [
    'Campaigns reveal what earns attention.',
    'Onboarding shows where users get stuck.',
    'Reviews and support tickets point to what keeps merchants around.',
  ],
};

export const keepLearningImage: CardImage = {
  src: keepLearning,
  alt: 'Two people pointing at a chart on a laptop screen while reviewing it together',
  width: 650,
  height: 190,
};

export const keepLearningActions: CtaAction[] = [
  {
    label: 'Explore Shopify App Development Services',
    href: '/services/app-development',
    tone: 'black',
  },
  {
    label: 'Explore Shopify App Support and Maintenance Services',
    href: '/services/support-maintenance',
    tone: 'outline',
  },
];

/* -------------------------------------------------------------------- faq */

/** Section / FAQ (Figma 235:2528). */
export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Questions App Teams Ask Before Investing in Shopify App Marketing',
  subheading:
    'Here are the questions we hear most before a growth strategy call.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What is Shopify app marketing?',
    answer:
      "Shopify app marketing is the process of improving an app's visibility, positioning, installs, activation, retention, and long-term merchant adoption.",
  },
  {
    question:
      'How is Shopify app marketing different from Shopify store marketing?',
    answer:
      'App marketing targets merchants, not shoppers. It measures listing conversion, installs, activation, retention, and reviews instead of cart and checkout metrics.',
  },
  {
    question: 'Can Blinto help increase Shopify app installs?',
    answer:
      "We improve positioning, SEO, listing conversion, content, and paid acquisition to support install growth. We don't promise specific install numbers.",
  },
  {
    question: 'Can Blinto help improve activation and retention?',
    answer:
      "Yes. We review onboarding, product messaging, user behavior, and lifecycle communication to find what's stopping users from sticking around.",
  },
];

/* -------------------------------------------------------------------- cta */

/** Section / CTA (Figma 235:2569). */
export const closingCta = {
  kicker: 'Next Step',
  heading: "Your App's Next Growth Stage Can Start With a Clearer Plan",
  body: 'Whether growth is blocked by visibility, conversion, activation, or retention, we can help you find the right priority and build a clearer path forward.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book a Growth Strategy Call', href: '/contact', tone: 'black' },
    { label: 'Explore All Shopify Services', href: '/services', tone: 'white' },
  ] satisfies CtaAction[],
};
