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
 * Shopify Theme & Storefront Development — content migrated verbatim from
 * https://blinto.co/shopify-theme-storefront-development/ and re-laid-out in
 * the new design system. No Figma frame exists for this page.
 *
 * The original's problem band pairs each problem with a headlined fix. The
 * card carries the problem as its title and the fix headline plus its copy as
 * the body, so nothing is dropped.
 */

export const meta = {
  title:
    'Shopify Theme & Storefront Development — Blinto | Custom Stores That Convert',
  description:
    'Blinto engineers high-performance custom Shopify themes and storefronts that look unique, load fast and turn visitors into buyers — plus store setup and platform migration.',
};

export const hero = {
  eyebrow: 'Shopify Theme & Storefront Development',
  heading: 'Stop Using Generic Templates. Get a Shopify Store Built for Your Brand',
  subheading:
    'We don’t just “set up” stores—we engineer high-performance custom Shopify themes that look unique, load fast, and turn visitors into buyers.',
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};

export const problemSection: SectionCopy = {
  eyebrow: 'The Problem',
  heading: 'Why Your Brand Needs More Than a Basic Theme',
};

export const problemCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'The “Generic Look” Trap',
    body: 'A Store That Looks Like Your Brand. We design and build custom sections and layouts that match your identity—so your store feels premium, original, and instantly recognizable (not copy-paste).',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'The “Missing Feature” Wall',
    body: 'Custom Engineering. No Theme Limits. We code the exact features your store needs—right into the theme whenever possible—so you get more flexibility, fewer apps, faster load times, and a smoother shopping experience.',
  },
];

export const coreServicesSection: SectionCopy = {
  eyebrow: 'What We Build',
  heading: 'Our Core Services',
};

export const coreServices: ListPanel[] = [
  {
    tone: 'blue',
    heading: 'Custom Theme Development',
    subheading:
      'We build themes from the ground up or heavily customize existing ones using Shopify 2.0 architecture.',
    items: [
      'Pixel-perfect design implementation.',
      'Mobile-first approach for maximum sales.',
      'Clean code structure for easy future updates.',
    ],
  },
  {
    tone: 'yellow',
    heading: 'Store Setup & Configuration',
    subheading:
      'Launch your store without the headache. We handle the technical heavy lifting.',
    items: [
      'Essential App Integration (Reviews, Chat, etc.).',
      'Payment gateway & shipping setup.',
      'Domain connection & SSL configuration.',
      'Collection & Navigation structure organization.',
    ],
  },
  {
    tone: 'green',
    heading: 'Migration to Shopify',
    subheading:
      'Moving from WooCommerce or another platform? We ensure a safe transfer of your data.',
    items: [
      'Product, Customer, and Order data migration.',
      "SEO URL redirection (so you don't lose Google rankings).",
      'Zero downtime transition.',
    ],
  },
];

export const coreServicesAction: CtaAction = {
  label: 'Let’s Discuss Your Project',
  href: '/contact-us/',
  tone: 'black',
};

export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'Our Development Process',
};

export const processSteps: ProcessStep[] = [
  { number: '01', tone: 'green', heading: 'Discovery', body: 'We analyze your brand, competitors, and products to understand your goals.' },
  { number: '02', tone: 'blue', heading: 'Planning & Design', body: 'We plan the user journey (UX) before writing a single line of code.' },
  { number: '03', tone: 'yellow', heading: 'Development', body: 'Our team codes your store using the latest Shopify coding standards.' },
  { number: '04', tone: 'blue', heading: 'QA & Testing', body: 'We test on mobile, tablet, and desktop to ensure zero bugs.' },
  { number: '05', tone: 'green', heading: 'Launch & Handover', body: 'We push your site live and train you on how to manage it.' },
];

export const whySection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading: 'Why Choose Blinto?',
};

export const whyCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Developers, Not Setup Experts',
    body: 'We have strong custom-coding skills—so you need fewer apps and less clutter.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Speed Obsessed',
    body: 'We optimize images and code to ensure your store passes Core Web Vitals.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Conversion Focused',
    body: 'Every button, banner, and layout decision is made to get you more sales.',
  },
];

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

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
};

export const faqs: FaqEntry[] = [
  { question: 'Do you use templates or build from scratch?', answer: 'We handle it all. We customize both free and premium themes depending on your budget. For custom projects, we can build entirely from scratch, or use a free or paid theme as a foundation to deliver a premium result.' },
  { question: 'Are there monthly fees for the apps you use?', answer: 'We try to code features natively to minimize monthly app fees. However, some advanced features (like Reviews or Subscriptions) may require paid apps. We will discuss this transparently before building.' },
  { question: 'Will I lose my SEO traffic if I switch to Shopify?', answer: 'No. We implement a strict “301 Redirect” strategy to ensure Google knows exactly where your old pages went, preserving your rankings.' },
  { question: 'Do you offer support after the site goes live?', answer: 'Yes. All our projects include 14 days of dedicated post-launch support to handle any bugs or minor tweaks, ensuring your launch is stress-free.' },
  { question: 'Can I edit the content myself later?', answer: 'Absolutely. We build using Shopify 2.0 “Sections” and “Blocks,” so you can easily change text, images, and layouts without touching code.' },
  { question: 'How long does a project take?', answer: 'A standard store setup takes 2-4 weeks. A fully custom theme build typically takes 4-8 weeks.' },
];

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Ready to Build a Store That Actually Converts?',
  body: 'Let’s discuss your project and see if we are the right fit.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};
