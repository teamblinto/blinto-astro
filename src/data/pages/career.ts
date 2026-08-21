import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type { Job } from '~/components/ui/JobCard.astro';
import type { BeliefCell, ProcessStep, SectionCopy } from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Career — content migrated verbatim from https://blinto.co/career/.
 *
 * The ten openings and their deadlines are exactly as the old site listed
 * them, including the deadline that has already passed; keeping the listings
 * current is an editorial job, not a migration one. Each role links out to the
 * live posting on Blinto's hiring platform, as it did before.
 *
 * The five journey stages carry no numbers in the source. Card / Step shows
 * one, so they are numbered in order — the order the source already implies.
 */

export const meta = {
  title: 'Careers at Blinto — Grow Your Career With Us',
  description:
    'Open roles at Blinto LLC, our benefits, and what the hiring process looks like — from quick-apply to onboarding.',
};

export const hero = {
  eyebrow: 'Careers',
  heading: 'Grow your career with Blinto',
  subheading:
    'Driven by an endless curiosity, we offer the freedom to forge new paths and the support to grow at your own pace. Embrace continuous learning and explore the vast opportunities ahead.',
  actions: [
    { label: 'Join Our Team', href: '#opening', tone: 'black' },
  ] satisfies CtaAction[],
};

/* -------------------------------------------------------------- benefits */

export const benefitsSection: SectionCopy = {
  eyebrow: 'Life at Blinto',
  heading: 'Benefits',
};

/** Heading-only cards: the original names each benefit and says no more. */
export const benefitCells: BeliefCell[] = [
  { kind: 'belief', tone: 'blue', heading: 'Excellent Culture & Environment' },
  { kind: 'belief', tone: 'green', heading: 'Relax & Sports zone' },
  { kind: 'belief', tone: 'yellow', heading: 'Meals, Coffee & Snacks' },
  { kind: 'belief', tone: 'green', heading: 'Muslim Prayer Zone' },
  { kind: 'belief', tone: 'yellow', heading: 'Dual Festival Bonuses' },
  { kind: 'belief', tone: 'blue', heading: 'Performance Bonus' },
];

/* -------------------------------------------------------------- openings */

export const openingsSection: SectionCopy = {
  eyebrow: 'We Are Hiring',
  heading: 'Current Openings',
  subheading:
    'Join our team and contribute to shaping the future of technology. We’re looking for passionate, innovative, and dedicated individuals to fill the following roles.',
};

export const jobs: Job[] = [
  {
    title: 'Business Analyst',
    tone: 'blue',
    terms: ['Full Time', '1-2 Years Exp', 'Salary: Tk 40k-45k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://blinto.easy.jobs/xzqvqizpwa-business-analyst',
  },
  {
    title: 'Sales & Growth Strategist',
    tone: 'yellow',
    terms: ['Full Time', '2-3 Years Exp', 'Salary: Tk 25k-35k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://blinto.easy.jobs/sales-growth-strategist',
  },
  {
    title: 'Backend Developer — Node.js (Senior)',
    tone: 'green',
    terms: ['Full Time', '2+ Years Exp', 'Salary: Tk 40k-60k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/backend-developer-node-js-senior/',
  },
  {
    title: 'Content Writer (Senior)',
    tone: 'yellow',
    terms: ['Full Time', '2-3 Years Exp', 'Salary: Tk 30k-40k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/content-writer-senior/',
  },
  {
    title: 'Content Writer Intern (3 Months)',
    tone: 'blue',
    terms: ['Full Time', '0-1 Years Exp', 'Salary: Tk 10k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/content-writer-intern-3-months/',
  },
  {
    title: 'Frontend Developer (Junior)',
    tone: 'green',
    terms: ['Full Time', '1-2 Years Exp', 'Salary: Tk 20k-30k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/frontend-developer-junior/',
  },
  {
    title: 'Graphic Designer (Senior)',
    tone: 'blue',
    terms: ['Full Time', '2-3 Years Exp', 'Salary: Tk 30k-40k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/graphic-designer-senior/',
  },
  {
    title: 'Graphic Designer Intern (3 months)',
    tone: 'yellow',
    terms: ['Full Time', '1 Years Exp', 'Salary: Tk 10k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/graphic-designer-intern3-months/',
  },
  {
    title: 'SEO Strategist (Senior)',
    tone: 'green',
    terms: ['Full Time', '2-3 Years Exp', 'Salary: Tk 30k-40k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/seo-strategist-senior/',
  },
  {
    title: 'UI/UX Designer (Senior)',
    tone: 'blue',
    terms: ['Full Time', '2-3 Years Exp', 'Salary: Tk 30k-50k (Monthly)'],
    deadline: '19 February 2026',
    href: 'https://jobs.blinto.co/join/ui-ux-designer-senior/',
  },
];

/* --------------------------------------------------------------- journey */

export const journeySection: SectionCopy = {
  eyebrow: 'Hiring Process',
  heading: 'Your Journey to Joining Team Blinto',
};

export const journeySteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'Apply in Minutes',
    body: 'Submit your resume through our quick-apply form. No lengthy forms—just your skills and passion.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Skills Assessment',
    body: 'Complete a real-world task with a deadline to show us what you can do.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Showcase Your Skills',
    body: 'Our team reviews your work and invites top performers for an interview.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'Interview',
    body: 'Meet with us to discuss your technical knowledge and practical experience.',
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Celebrate & Onboard',
    body: "Welcome to the team! We're excited to have you join us.",
  },
];

/* -------------------------------------------------------------------- faq */

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Answer to your questions',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What is the hiring process like at Blinto LLC?',
    answer:
      'Our process includes submitting an application, assessment, one or two interviews, and a final offer discussion.',
  },
  {
    question: 'How long does the hiring process take?',
    answer:
      'We typically move through the entire process in 2-3 weeks. We know your time is valuable, so we aim to keep things moving while still getting to know you properly.',
  },
  {
    question: 'Do you offer remote or hybrid work options?',
    answer:
      'We’re a 100% on-site company. We believe in the power of in-person collaboration and the energy that comes from working together in our office. You’ll be part of a vibrant workplace culture where ideas flow freely and connections happen naturally.',
  },
  {
    question: 'What opportunities are there for career growth?',
    answer:
      'We’re big on growth here. You’ll have access to mentorship programs, skill development workshops, and clear paths for advancement. Many of our senior team members started in entry-level positions – we love promoting from within and helping our people build their careers.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Keep in Touch',
  heading:
    'We are continuously seeking exceptional talent. We invite you to monitor our careers site regularly for new position openings that align with your expertise.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Explore Current Openings', href: '#opening', tone: 'black' },
  ] satisfies CtaAction[],
};
