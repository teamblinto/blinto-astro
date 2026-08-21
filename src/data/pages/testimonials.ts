import type { CtaAction } from '~/components/sections/Cta.astro';
import type { SectionCopy, Testimonial } from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Testimonials — content migrated verbatim from
 * https://blinto.co/testimonials/. Same two clients as the quote band on every
 * service page, at the length they gave them.
 */

export const meta = {
  /** The current site's title and description, kept verbatim — they rank. */
  title: 'Client Testimonials | Success Stories with Blinto LLC',
  description:
    'See what our clients say about working with Blinto LLC. Real testimonials showcasing results from website design, development, SEO, and growth plans.',
};

export const hero = {
  eyebrow: 'Testimonials',
  heading: 'What Our Clients Say',
  subheading:
    'Hear from real businesses we’ve partnered with, their feedback reflects how we’ve helped them succeed online.',
};

export const quotesSection: SectionCopy = {
  eyebrow: 'In Their Words',
  heading: 'Client Stories',
};

export const quotes: Testimonial[] = [
  {
    heading: 'Blinto exceeded our expectations with creative, reliable design',
    quote:
      'I worked with Blinto on a complex project, and their creativity and ability to deliver innovative solutions really stood out. They were incredibly responsive and easy to work with throughout the entire process. The final result exceeded my expectations, and I’m extremely satisfied with the outcome. If you’re looking for a reliable, creative website design and development team, Blinto is the one!',
    name: 'Bill Banfield',
    role: 'Managing Director, 4AMI',
    tone: 'blue',
  },
  {
    heading: 'Blinto delivered creative, reliable web design—highly recommended',
    quote:
      'I recently opened a hypnotherapy practice in Miami Beach and needed a website. After a positive experience with Blinto for a previous company, I trusted them again. They guided me through every step, providing valuable insights on design, functionality, and SEO. Creative, proactive, and economical, my website is now running smoothly. I highly recommend Blinto for anyone seeking top-quality web services!',
    name: 'Jonathan Pine',
    role: 'Hypnotherapist, Constructive Hypnosis',
    tone: 'green',
  },
];

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Ready to See What We Can Do for You?',
  body: 'Let’s Build Your Success!',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book Your Call', href: '/book-a-call/', tone: 'black' },
  ] satisfies CtaAction[],
};
