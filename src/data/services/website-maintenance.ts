import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  SectionCopy,
  Testimonial,
  WorkItem,
} from '../types';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';
import work1 from '~/assets/images/work/work-img1.webp';
import work2 from '~/assets/images/work/work-img2.webp';
import work3 from '~/assets/images/work/work-img3.webp';

/**
 * Website Maintenance — content migrated verbatim from
 * https://blinto.co/website-maintenance/. No Figma frame exists for this page.
 *
 * Its three recent projects reuse the portfolio shots already checked in for
 * /wordpress-design-development/. The originals were a different, partly
 * mismatched set — the Big Boy Media Group card was illustrated with a photo
 * of dried herbs — so the correct shot is used for each client instead.
 */

export const meta = {
  /** The current site's title and description, kept verbatim — they rank. */
  title: 'Website Maintenance Services | Keep Your Site Fast & Secure',
  description:
    'Blinto LLC keeps your website updated, secure, and running smoothly. From fixes to speed optimization, our maintenance plans protect your online growth',
};

export const hero = {
  eyebrow: 'Website Maintenance',
  heading: 'We Keep Your Website Secure and Updated',
  subheading:
    'Our website maintenance solution cover updates, security, backups, and support so your site always runs smoothly.',
  actions: [
    {
      label: 'Book your free call with an expert',
      href: '/book-a-call/',
      tone: 'black',
    },
  ] satisfies CtaAction[],
};

/* -------------------------------------------------------------- included */

export const includedSection: SectionCopy = {
  eyebrow: 'What You Get',
  heading: 'What’s Included in Website Maintenance',
  subheading:
    'Everything your website needs to stay Secure and perform well.',
};

export const includedCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Regular Maintenance',
    body: 'We perform regular updates and checks to keep your website running smoothly and without interruptions. This helps prevent problems before they happen and ensures everything works as it should.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Security Updates and Monitoring',
    body: 'We protect your site by applying security updates and constantly monitoring for threats like hackers or malware. This keeps your website safe and your visitors’ information secure at all times.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Performance Optimization',
    body: 'We improve your website’s speed and overall performance. Faster load times mean visitors stay longer, have a better experience, and are more likely to take action on your site.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Technical Support',
    body: 'If any issues arise, our team is ready to fix them quickly. From small glitches to urgent problems, we provide fast and reliable support to keep your website running without downtime.',
  },
];

/* ------------------------------------------------------------ industries */

export const industriesSection: SectionCopy = {
  eyebrow: 'Industries',
  heading: 'Industries We Serve',
  subheading:
    'We Maintain Websites for a Wide Range of Businesses and Services',
};

/** Named and no more, exactly as the original lists them. */
export const industryCells: BeliefCell[] = [
  { kind: 'belief', tone: 'blue', heading: 'Agriculture & Farming' },
  { kind: 'belief', tone: 'green', heading: 'Manufacturing & Industrial' },
  { kind: 'belief', tone: 'yellow', heading: 'Travel & Tourism' },
  { kind: 'belief', tone: 'green', heading: 'Logistics & Supply Chain' },
  { kind: 'belief', tone: 'yellow', heading: 'Healthcare' },
  { kind: 'belief', tone: 'blue', heading: 'Fitness & Wellness' },
  { kind: 'belief', tone: 'green', heading: 'Professional Services' },
  { kind: 'belief', tone: 'yellow', heading: 'Arts & Entertainment' },
  { kind: 'belief', tone: 'blue', heading: 'E-commerce' },
  { kind: 'belief', tone: 'yellow', heading: 'SaaS Website' },
  { kind: 'belief', tone: 'blue', heading: 'Finance' },
  { kind: 'belief', tone: 'green', heading: 'Automobile Industries' },
];

/* --------------------------------------------------------------- projects */

export const projectsSection: SectionCopy = {
  eyebrow: 'Recent Work',
  heading: 'Our Recent Projects',
  subheading:
    'Real websites we’ve built that deliver results across industries.',
};

export const projects: WorkItem[] = [
  {
    name: 'Renova Technology',
    sector: 'Electronics Repair',
    body: 'Like many local PCB repair shops, Renova Technology struggled to gain online visibility and attract new B2B clients seeking their services. We built them a new website and used smart strategies to help more businesses find them online. Now, they are easily found by those who need their help, and their business is growing steadily.',
    href: 'https://renovatechnology.com/',
    shot: work1,
  },
  {
    name: 'Resurgence',
    sector: 'Healthcare',
    body: 'It was difficult and confusing for people to book appointments on Resurgence’s website. We fixed their website by making it simple and easy to use, focusing on what visitors needed most, so booking could be done quickly and efficiently on any device. Now, their patients can easily get the care they need, starting with a smooth, stress-free step online.',
    href: 'https://resurgenceptclinic.com/',
    shot: work2,
  },
  {
    name: 'Big Boy Media Group',
    sector: 'Marketing Agency',
    body: 'As a marketing agency, Big Boy Media Group needed a better way to showcase their work and make it simple for potential clients to take the next step. We built them a user friendly website that clearly highlights what they can do and makes it really easy for visitors to book a consultation. This helps them turn website visits into potential clients.',
    href: 'https://bigboymediagroup.com/',
    shot: work3,
  },
];

/** The original points this at /works; the new sitemap's path is below. */
export const projectsAction: CtaAction = {
  label: 'Explore More Projects',
  href: '/case-studies/',
  tone: 'black',
};

/* ------------------------------------------------------------ why blinto */

export const whySection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading: 'Why Partner With Blinto',
};

export const whyCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Rapid Problem Resolution',
    body: "We don't just fix issues, we eliminate them before they impact your business.",
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Comprehensive Technical Support',
    body: 'From minor glitches to complex technical challenges, our expert team provides end-to-end maintenance.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Continuous Performance Optimization',
    body: 'Our maintenance service includes regular performance audits, security updates, and strategic improvements that keep your website running.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Always Here for You',
    body: 'Need help at 2 AM? We’re here. Our team offers urgent support, strategic advice, and long-term maintenance to ensure your site grows with you.',
  },
];

/* ---------------------------------------------------------- testimonials */

export const quotesSection: SectionCopy = {
  eyebrow: 'Testimonials',
  heading: 'What Our Clients Say',
  subheading:
    'Hear from real businesses we’ve partnered with, their feedback reflects how we’ve helped them succeed online.',
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

/* -------------------------------------------------------------------- faq */

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Answer to your questions',
};

export const faqs: FaqEntry[] = [
  {
    question: "What's included in your website maintenance plans?",
    answer:
      'Our maintenance plans include regular security updates, plugin/software updates, daily backups, uptime monitoring, performance optimization, content updates (varies by plan), malware scanning, and monthly reports. Higher-tier plans also include priority support and development hours for new features.',
  },
  {
    question: 'How often do you perform backups?',
    answer:
      'We perform automated daily backups of your entire website, including databases and files. Backups are stored securely off-site for 30 days, and we can restore your site to any point within that period. Critical sites can opt for hourly backups.',
  },
  {
    question: 'What happens if my website gets hacked?',
    answer:
      'If a security breach occurs, we immediately isolate the threat, clean infected files, restore from a clean backup if needed, patch vulnerabilities, and implement additional security measures. This emergency response is included in all plans at no extra cost.',
  },
  {
    question: 'How quickly do you respond to maintenance requests?',
    answer:
      'Emergency issues (site down, security breaches) are addressed within 1-2 hours. Standard maintenance requests are handled within 24 hours on business days. Premium plan members get priority 4-hour response times for all requests.',
  },
  {
    question:
      'Can I update content myself while you handle technical maintenance?',
    answer:
      'Absolutely! You retain full access to your website. We handle all technical aspects while you’re free to update content, add blog posts, or manage products. We can also handle content updates for you if included in your plan.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Let’s Turn Your Vision Into a Powerful Website',
  body: 'Get a free website review and practical insights',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book Your Call', href: '/book-a-call/', tone: 'black' },
  ] satisfies CtaAction[],
};
