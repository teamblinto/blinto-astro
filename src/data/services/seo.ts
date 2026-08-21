import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  ListPanel,
  SectionCopy,
  Testimonial,
} from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * SEO Services — content migrated verbatim from https://blinto.co/seo/ and
 * re-laid-out in the new design system. No Figma frame exists for this page.
 *
 * Section eyebrows are authored: the design system requires one and the
 * WordPress original has none.
 */

export const meta = {
  title: 'SEO Services — Blinto | Boost Rankings, Traffic and Business Growth',
  description:
    'At Blinto LLC, we help to dominate search results with proven SEO strategies. Improve rankings, drive targeted traffic, and turn clicks into customers. Grab it!',
};

export const hero = {
  eyebrow: 'SEO Services',
  heading: 'Crush Your Competition with SEO That Turns Searches Into Sales',
  /** The original hero has no supporting line, only this trust badge. */
  subheading: 'Trusted by 100+ global companies.',
  actions: [
    { label: 'Book a Website Audit Call', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};

/* --------------------------------------------------------- core services */

export const solutionsSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading: 'SEO Solutions to Bring You More Traffic and Leads',
  subheading:
    'Start by checking and speeding up your site, create content that actually ranks, boost your local visibility, and build the authority you need.',
};

export const solutions: ListPanel[] = [
  {
    tone: 'blue',
    heading: 'Website Audit & Technical Foundation',
    items: [
      'Site health check',
      'Site speed optimization',
      'Mobile responsiveness',
      'Google Search Console fixes',
      'CTR, position track',
    ],
  },
  {
    tone: 'yellow',
    heading: 'Content Strategy & Optimization',
    items: [
      'Keyword research',
      'Article writing',
      'Content Gap analysis',
      'Meta tags and headers',
      'AI search optimization',
      'Featured snippets',
      'Voice search content',
    ],
  },
  {
    tone: 'green',
    heading: 'Local Search Dominance',
    items: [
      'Google Business Profile optimization',
      'NAP consistency',
      'Local keywords',
      'Review management',
      'Directory submissions',
    ],
  },
  {
    tone: 'blue',
    heading: 'Authority & Link Building',
    items: [
      'High-quality backlinks',
      'Citation Building',
      'Digital PR campaigns',
      'Guest posting',
      'Competitor link analysis',
    ],
  },
];

/* ------------------------------------------------------------ how we work */

export const resultsSection: SectionCopy = {
  eyebrow: 'How We Get Results',
  heading: 'How We Get Results',
  subheading:
    'We do more than improve keyword rankings and boost traffic. Our SEO strategies are tailored to your business goals and focused on real growth. With transparent methods and measurable outcomes, we help you confidently scale your search presence.',
};

/**
 * Deliberately unnumbered. The original renders these five as a diagram whose
 * DOM order is Learn, Strategize, Implement and Refine, Prepare, Grow — which
 * does not read as a sequence, so numbering them here would assert an order
 * the source does not actually establish.
 */
export const resultsCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Learn',
    body: 'We take the time to understand your business inside out. By analyzing your industry, competitors, and audience behavior, we identify the best opportunities to drive qualified traffic and boost conversions.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Strategize',
    body: 'Using insights from our research, we create a custom SEO strategy that focuses on keyword themes aligned with user intent and your business goals, ensuring every step is purposeful and impactful.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Prepare',
    body: 'We thoroughly audit your website and online presence, addressing both on-page and off-page elements. From technical SEO to content optimization, we make sure your site is primed for success.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Implement and Refine',
    body: 'SEO is an ongoing journey. We continuously adjust and refine our strategy, adapting to changes in search algorithms, user behavior, and market trends to keep your business ahead.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Grow',
    body: 'We track your performance against key metrics and continuously evolve your strategy to meet new goals, ensuring that your SEO efforts always drive long-term growth and success.',
  },
];

/* ---------------------------------------------------------- testimonials */

export const quotesSection: SectionCopy = {
  eyebrow: 'Client Words',
  heading: 'Client Words That Define Our Growth Capabilities',
};

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
  heading: 'Answer to Your Questions',
};

export const faqs: FaqEntry[] = [
  {
    question: 'How long does it take to see results from SEO?',
    answer:
      'SEO is a long-term strategy, but you can expect to see initial improvements in traffic and rankings within 3 to 6 months. Results will vary depending on factors like industry competition and the current state of your website.',
  },
  {
    question: 'How do I know if my website needs SEO?',
    answer:
      'If your website is not ranking well on search engines, or if you’re not attracting enough qualified traffic or conversions, then SEO can help. A quick SEO audit can show you where your site stands and what improvements are needed.',
  },
  {
    question: 'What makes Blinto’s SEO services different?',
    answer:
      'Blinto combines strategic keyword research, on-page optimization, technical SEO, and conversion-focused strategies. We go beyond rankings and focus on real business growth, ensuring measurable results for your company.',
  },
  {
    question: 'Is SEO a one-time service or ongoing?',
    answer:
      'SEO is an ongoing process. We provide continuous optimization, track performance, and adapt to algorithm changes, ensuring your website stays competitive and continues to improve over time.',
  },
  {
    question: 'How will I track the success of my SEO campaign?',
    answer:
      'We provide detailed monthly reports that show traffic growth, keyword rankings, and conversion metrics. This transparency allows you to track the impact of our SEO efforts and see how your investment is paying off.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Get Your Free SEO Audit',
  body: 'We’ll conduct a free SEO audit to identify areas for improvement and show you how our services can drive more traffic and higher conversions for your business.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book a Website Audit Call', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};
