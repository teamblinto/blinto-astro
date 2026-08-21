import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  ListPanel,
  ProcessStep,
  SectionCopy,
  Testimonial,
} from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * WordPress Growth Marketing — content migrated verbatim from
 * https://blinto.co/wordpress-growth-marketing/ and re-laid-out in the new
 * design system. No Figma frame exists for this page.
 *
 * Its "why us" band is the one section with no heading of its own in the
 * source — only three cards. The heading below is the one its sibling service
 * pages use over the identical band, rather than a line invented here.
 */

export const meta = {
  title:
    'WordPress Growth Marketing — Blinto | SEO, Paid Ads & Conversion Optimization',
  description:
    'Blinto turns WordPress sites into growth machines: technical SEO, structured Google Ads and conversion rate optimization measured on leads, sales and ROAS.',
};

/* ------------------------------------------------------------------- hero */

/** Every CTA on the original points at /contact-us. */
const auditCta: CtaAction = {
  label: 'Get a Free Site Audit',
  href: '/contact-us/',
  tone: 'black',
};

export const hero = {
  eyebrow: 'WordPress Growth Marketing',
  heading: 'Transform Your WordPress Site Into a Growth Machine',
  subheading:
    'Traffic means nothing without conversions. We combine technical fixes, smart advertising, and precise tracking to turn your website into your business’s best salesperson.',
  actions: [auditCta],
};

/* --------------------------------------------------------------- problem */

export const problemSection: SectionCopy = {
  eyebrow: 'The Problem',
  heading: "Why Your Website Isn't Converting",
};

export const problemCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'The “Broken Foundation”',
    body: 'We fix the entire ecosystem. We clean up technical debt for speed, restructure your content for SEO, and refine the user experience (UX) to ensure visitors trust you instantly.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'The “Ad Waste” Cycle',
    body: 'We stop the guesswork. We build structured ad campaigns with precise targeting and compelling copy to ensure every dollar you spend brings in real customers, not just clicks.',
  },
];

/* --------------------------------------------------------- core services */

export const coreServicesSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading: 'Our Core Services',
};

export const coreServices: ListPanel[] = [
  {
    tone: 'blue',
    heading: 'Advanced WordPress SEO',
    subheading: 'Rank higher for the keywords that matter to your business.',
    items: [
      'Local & Global Reach: Whether you are targeting customers in your city or selling products worldwide, we optimize your site to dominate the search results for your specific market.',
      'On-Page Optimization: Fixing headings, meta tags, and internal linking structures using tools like RankMath or Yoast.',
      'Technical Health: Fixing crawl errors, sitemaps, and SSL issues that hurt your trust score.',
    ],
  },
  {
    tone: 'yellow',
    heading: 'Paid Advertising (Lead Gen & Sales)',
    subheading: 'Drive high-intent traffic to your landing pages.',
    items: [
      'Google Search Ads: Capturing leads the moment they search for your specific service or product.',
      "Retargeting Campaigns: Bringing back visitors who read your blog or viewed your pricing page but didn't contact you.",
      'Ad Creative Strategy: Designing high-performing visuals and copy that get clicks.',
    ],
  },
  {
    tone: 'green',
    heading: 'Conversion Rate Optimization (CRO)',
    subheading: 'Turn more visitors into inquiries or orders.',
    items: [
      'Landing Page Optimization: Building dedicated, distraction-free pages for your ad campaigns.',
      'Form Optimization: Simplifying contact forms and checkout flows to reduce abandonment.',
      'Trust Signals: Strategically placing testimonials and case studies to build confidence.',
    ],
  },
];

export const coreServicesAction = auditCta;

/* ------------------------------------------------------------ our process */

export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'Our Growth Process',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'The Audit',
    body: 'We analyze your site speed, SEO health, and backlink profile to find the bottlenecks.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'The Fix',
    body: 'We clean up code, optimize database performance, and harden security.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'The Traffic',
    body: 'We launch SEO improvements and paid campaigns to drive qualified visitors.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'The Scale',
    body: 'We monitor lead quality and cost-per-acquisition (CPA), refining the funnel to maximize profit.',
  },
];

/* ------------------------------------------------------------ why blinto */

export const whySection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading: 'Why Choose Blinto?',
};

export const whyCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'ROI-Obsessed Marketing',
    body: 'We don’t care about "vanity metrics" like likes. We focus entirely on Leads, Sales, and ROAS (Return on Ad Spend).',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Unified Strategy',
    body: 'SEO and Ads work better together. We use data from your paid campaigns to uncover high-value keywords for your long-term SEO strategy.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'WordPress Experts',
    body: 'A slow site kills marketing. Because we are developers, we know the difference between a server issue and a plugin conflict, ensuring your marketing foundation is rock solid.',
  },
];

/* ---------------------------------------------------------- testimonials */

export const quotesSection: SectionCopy = {
  eyebrow: 'Client Words',
  heading: 'Client Words That Define Our Growth Capabilities',
};

/** The original repeats these two quotes twice; carried over once. */
export const quotes: Testimonial[] = [
  {
    quote:
      'Blinto gave creative and practical solutions for a complex project, delivering great results. They were responsive and easy to work with.',
    name: 'Bill Banfield',
    role: 'Managing Director, 4AMI',
    tone: 'blue',
  },
  {
    quote:
      'Blinto provided creative, reliable web design for my hypnotherapy practice. They guided me through every step, delivering a smooth, functional website. Highly recommended!',
    name: 'Jonathan Pine',
    role: 'Founder, Constructive Hypnosis',
    tone: 'green',
  },
];

/* -------------------------------------------------------------------- faq */

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
};

export const faqs: FaqEntry[] = [
  {
    question: 'How long does SEO take to work?',
    answer:
      'SEO is a long-term investment. You typically see technical improvements immediately, but rankings and organic traffic growth start compounding after 3-6 months.',
  },
  {
    question: 'Do I need a big budget for ads?',
    answer:
      'Not necessarily. We can start with a focused budget (e.g., $1,000/month) to test specific keywords and audiences, then scale up once we see a positive return.',
  },
  {
    question:
      'What is the difference between Local SEO and National SEO?',
    answer:
      'Local SEO focuses on ranking in the “Map Pack” for customers in your city (great for service businesses). National SEO targets keywords across the whole country (great for eCommerce or software). We handle both.',
  },
  {
    question: "Why isn't my Yoast plugin enough?",
    answer:
      'Yoast is just a tool; it doesn’t do the work for you. It can’t fix slow server speeds, bad site architecture, or poor content strategy. That requires a human expert.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Ready to Stop Guessing and Start Growing?',
  body: 'Let’s look at your data and build a plan that actually moves the needle.',
  backdrop: ctaBackdrop,
  actions: [auditCta],
};
