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
 * WordPress Plugin Development — content migrated verbatim from
 * https://blinto.co/wordpress-plugin-development/ and re-laid-out in the new
 * design system. No Figma frame exists for this page; it is composed from the
 * shells the Shopify service pages already use.
 *
 * Section eyebrows are the one thing authored here. The design system requires
 * one on every Section Header and the WordPress originals have none, so each
 * is a short label taken from the section's own subject.
 */

export const meta = {
  title: 'Custom WordPress Plugin Development — Blinto',
  description:
    'Blinto engineers secure, lightweight custom WordPress plugins — bespoke features, third-party API integrations and WooCommerce extensions.',
};

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'WordPress Plugin Development',
  heading: 'Stop Relying on Bloated Plugins. Build the Exact Feature You Need',
  subheading:
    'We don’t just install plugins; we write them. We engineer secure, lightweight custom WordPress plugins to solve complex business problems without slowing down your site.',
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};

/* --------------------------------------------------------------- problem */

export const problemSection: SectionCopy = {
  eyebrow: 'The Problem',
  heading: 'Why Generic Plugins Are Hurting Your Site',
};

/** The original pairs each problem with its fix; the card carries both. */
export const problemCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'The “Bloat” Trap',
    body: 'We build custom plugins that do exactly what you need—nothing more, nothing less. This eliminates unused code and keeps your site lightning fast.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Plugin Conflicts',
    body: 'We write clean, isolated code that follows strict standards, ensuring your new feature integrates perfectly without breaking your theme or causing security risks.',
  },
];

/* --------------------------------------------------------- core services */

export const coreServicesSection: SectionCopy = {
  eyebrow: 'What We Build',
  heading: 'Our Core Services',
};

export const coreServices: ListPanel[] = [
  {
    tone: 'blue',
    heading: 'Custom Plugin Development',
    subheading:
      'We build standalone plugins from scratch to handle unique business logic.',
    items: [
      'Custom calculators & booking systems.',
      'Advanced directory or listing functionality.',
      'Internal team dashboards & portals.',
    ],
  },
  {
    tone: 'yellow',
    heading: 'Third-Party API Integrations',
    subheading: 'Connect your WordPress site to external software.',
    items: [
      'CRM integrations (HubSpot, Salesforce, Zoho).',
      'Payment gateway integrations.',
      'ERP & Inventory synchronization.',
    ],
  },
  {
    tone: 'green',
    heading: 'WooCommerce Extensions',
    subheading: 'Extend the functionality of your online store.',
    items: [
      'Custom checkout fields & logic.',
      'Dynamic pricing & discount rules.',
      'Custom shipping rate calculators.',
    ],
  },
];

export const coreServicesAction: CtaAction = {
  label: 'Let’s Discuss Your Project',
  href: '/contact-us/',
  tone: 'black',
};

/* ------------------------------------------------------------ our process */

export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'Our Development Process',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'Discovery',
    body: 'We map the feature, users, and how it fits your current site.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Planning & Architecture',
    body: 'We design plugin structure and database strategy for scale.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Development',
    body: 'We build using modern PHP/JS standards for security and compatibility.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'QA & Testing',
    body: 'We test across themes, plugins, and PHP versions to prevent conflicts.',
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Delivery & Handover',
    body: 'We install, configure, and share documentation for your team.',
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
    heading: 'Security Focused',
    body: 'Bad plugins are the #1 reason WordPress sites get hacked. We sanitize every input and output to ensure your site stays safe.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Lightweight Code',
    body: "We don't use heavy frameworks. We write clean, native code that keeps your PageSpeed scores high.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Future-Proof',
    body: "We follow official WordPress development guidelines, so your plugin won't break when WordPress updates.",
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
    question: 'Do I need to pay monthly for a custom plugin?',
    answer:
      'No. Unlike SaaS products, a custom plugin is a one-time build cost. You own the code forever.',
  },
  {
    question: 'Will the plugin slow down my website?',
    answer:
      'No. We build specifically for performance. Unlike generic plugins that load scripts on every page, we only load assets where they are strictly needed.',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do. Once the project is complete and paid for, you have full ownership of the plugin and its intellectual property.',
  },
  {
    question: 'Do you offer support for updates?',
    answer:
      'Yes. We offer maintenance packages to ensure your custom plugin stays compatible as WordPress and PHP versions evolve over time.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: "Have a Feature You Can't Find in a Plugin?",
  body: 'If you can imagine it, we can code it. Let’s solve your technical challenge.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};
