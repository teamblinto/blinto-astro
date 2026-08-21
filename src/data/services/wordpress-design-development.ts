import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  ListPanel,
  ProcessStep,
  SectionCopy,
  Testimonial,
  WorkItem,
} from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';
import work1 from '~/assets/images/work/work-img1.webp';
import work2 from '~/assets/images/work/work-img2.webp';
import work3 from '~/assets/images/work/work-img3.webp';
import work4 from '~/assets/images/work/work-img4.webp';
import work5 from '~/assets/images/work/work-img5.webp';
import work6 from '~/assets/images/work/work-img6.webp';
import work7 from '~/assets/images/work/work-img7.webp';
import work8 from '~/assets/images/work/work-img8.webp';

/**
 * WordPress Design & Development — content migrated verbatim from
 * https://blinto.co/wordpress-design-development/ and re-laid-out in the new
 * design system. No Figma frame exists for this page.
 *
 * The original's problem band pairs each problem with a headlined fix; the
 * card carries the problem as its title and the fix as its body. Its "Our Work
 * Speaks for Itself" strip is the only portfolio row on the old site — the
 * eight shots came from /wp-content/uploads/ and are now checked in under
 * `src/assets/images/work/`, since that path stops existing at launch.
 */

export const meta = {
  title:
    'WordPress Design & Development — Blinto | Fast, Professional Sites You Control',
  description:
    'Blinto designs and builds secure, high-performance WordPress sites — custom theme work, migrations and WooCommerce stores that launch fast and stay easy to manage.',
};

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'WordPress Design & Development',
  heading: 'Fast, Professional WordPress Sites You Can Control and Scale',
  subheading:
    'We design and build secure, high-performance sites using the best themes and plugins. Get a stunning site that launches fast, is easy to manage, and lets you add powerful features instantly.',
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};

/* --------------------------------------------------------------- problem */

export const problemSection: SectionCopy = {
  eyebrow: 'The Problem',
  heading: 'The Obstacles Stopping Your Online Growth',
};

export const problemCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'The “No Website” Invisible Wall',
    body: 'We design sites that impress investors and customers instantly. No generic looks—we customize themes to fit your brand perfectly.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'The “Hard-Code” Trap',
    body: 'Need a booking system, a shop, or a contact form? We install and configure the best plugins to add features in hours, not months.',
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
    heading: 'Website Design & Customization',
    subheading:
      'We select the perfect theme and customize it to look unique to your brand.',
    items: [
      'Modern UI/UX design tailored to your identity.',
      'Mobile-responsive layouts that look great on any phone.',
      'Visual consistency across all pages.',
    ],
  },
  {
    tone: 'yellow',
    heading: 'Migration to WordPress',
    subheading:
      'Move from static HTML or hard-to-use platforms to WordPress.',
    items: [
      'Safe content migration (text, images, blogs).',
      'Replicating your existing design on a manageable platform.',
      'SEO setup to ensure Google finds your new site.',
    ],
  },
  {
    tone: 'green',
    heading: 'eCommerce Store Setup',
    subheading: 'Start selling your products online with WooCommerce.',
    items: [
      'Beautiful product galleries and shop pages.',
      'Secure checkout and payment gateway setup.',
      'Easy inventory and order management dashboard.',
    ],
  },
];

export const coreServicesAction: CtaAction = {
  label: 'Let’s Discuss Your Project',
  href: '/contact-us/',
  tone: 'black',
};

/* ------------------------------------------------------------------- work */

export const workSection: SectionCopy = {
  eyebrow: 'Portfolio',
  heading: 'Our Work Speaks for Itself',
};

export const workItems: WorkItem[] = [
  {
    name: 'Renova Technology',
    sector: 'Electronics Repair',
    href: 'https://renovatechnology.com/',
    shot: work1,
  },
  {
    name: 'Resurgence',
    sector: 'Healthcare',
    href: 'https://resurgenceptclinic.com/',
    shot: work2,
  },
  {
    name: 'Big Boy Media Group',
    sector: 'Marketing Agency',
    href: 'https://bigboymediagroup.com/',
    shot: work3,
  },
  {
    name: 'Foreplay Golf Shop',
    sector: 'E-commerce',
    href: 'https://foreplaygolfshop.com/',
    shot: work4,
  },
  {
    name: 'INFINITY Mega Mall',
    sector: 'E-commerce',
    href: 'https://infinitymegamall.com/',
    shot: work5,
  },
  {
    name: 'Shadleen’s Herb',
    sector: 'E-commerce',
    href: 'https://shadleens.com/',
    shot: work6,
  },
  {
    name: 'SpeedySoft',
    sector: 'Software service',
    href: 'https://speedysoftusa.com/',
    shot: work7,
  },
  {
    name: 'Pavlik Health & Wellness',
    sector: 'Healthcare',
    href: 'https://pavlikhealth.com/',
    shot: work8,
  },
];

/* ------------------------------------------------------------ our process */

export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'Our Process',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'Discovery',
    body: 'We learn about your brand, your audience, and the style you love.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Design',
    body: 'We choose the best theme and customize the layout to match your brand identity.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Setup & Build',
    body: 'We set up WordPress, configure essential plugins, and build your pages.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'Testing',
    body: 'We check everything on mobile and desktop to ensure it looks perfect.',
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Handover',
    body: 'We give you the keys and train you on how to edit your own website.',
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
    heading: 'Design That Sells',
    body: "We understand that a website isn't just code; it's your digital storefront. We make sure it looks premium and trustworthy.",
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Built with Best Practices',
    body: "We don't guess. We use the industry's most trusted themes and plugins to ensure your site is stable, fast, and secure from day one.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Security & Reliability',
    body: "We configure firewalls and security settings properly so you don't have to worry about hacks or downtime.",
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
    question: 'Do I need to know how to code?',
    answer:
      'Not at all. That’s why we use WordPress. We build the site so you can change text, swap images, and add blog posts using a simple visual editor.',
  },
  {
    question: 'Can you redesign my old website?',
    answer:
      'Yes. If your current site looks outdated or is hard to use, we can keep your content but give it a completely modern, fresh design on WordPress.',
  },
  {
    question: 'Will my website work on mobile phones?',
    answer:
      'Absolutely. Every website we design is “responsive,” meaning it automatically adjusts to look perfect on laptops, tablets, and smartphones.',
  },
  {
    question: 'How long does it take to build?',
    answer:
      'For a standard business website, we can typically design, build, and launch within 2 weeks, getting you online fast.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Ready to Build a Site That Actually Converts?',
  body: 'Let’s discuss your project and see if we are the right fit.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Let’s Discuss Your Project', href: '/contact-us/', tone: 'black' },
  ] satisfies CtaAction[],
};
