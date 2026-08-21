import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  CardImage,
  Person,
  ProcessStep,
  SectionCopy,
  StageCard,
} from './types';

import heroBanner from '~/assets/images/abt-hero-banner.jpg';
import howWeWork1 from '~/assets/images/abt-how-we-work-1.jpg';
import howWeWork2 from '~/assets/images/abt-how-we-work-2.jpg';
import howWeWork3 from '~/assets/images/abt-how-we-work-3.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

import teamFazleRabbi from '~/assets/images/team-01-fazle-rabbi.png';
import teamZannatulFerdousi from '~/assets/images/team-02-zannatul-ferdousi.png';
import teamRafsanZahid from '~/assets/images/team-03-rafsan-zahid.png';
import teamJubaerHossenSiam from '~/assets/images/team-04-jubaer-hossen-siam.png';
import teamIshratJahanUsha from '~/assets/images/team-05-ishrat-jahan-usha.png';
import teamFatemaAFerdaus from '~/assets/images/team-06-fatema-a-ferdaus.png';
import teamAboRaihan from '~/assets/images/team-07-abo-raihan.png';
import teamMdYasinArafat from '~/assets/images/team-08-md-yasin-arafat.png';
import teamMosharrafHossen from '~/assets/images/team-09-mosharraf-hossen.png';
import teamAbuSayem from '~/assets/images/team-10-abu-sayem.png';
import teamAtiaRasidaSilvia from '~/assets/images/team-11-atia-rasida-silvia.png';
import teamMdImranHossain from '~/assets/images/team-12-md-imran-hossain.png';
import teamMdOmarFaruque from '~/assets/images/team-13-md-omar-faruque.png';
import teamIfratJahanChowdhury from '~/assets/images/team-14-ifrat-jahan-chowdhury.png';
import teamWasiaZamanDrishty from '~/assets/images/team-15-wasia-zaman-drishty.png';
import teamRakibulHRocky from '~/assets/images/team-16-rakibul-h-rocky.png';

/**
 * About Us page content, transcribed from the Figma design (node 251:4816,
 * "About Us · Desktop").
 *
 * Alt text is authored here for the photography. The team portraits carry none
 * by design — see PersonCard for why.
 */

export const meta = {
  title: 'About Blinto — A Product-Focused Shopify App Agency',
  description:
    'Blinto helps founders and product teams build, grow and maintain Shopify apps — and builds its own Shopify products, using what it learns to serve clients better.',
};

/* ------------------------------------------------------------------- hero */

/** Section / Hero (Figma 251:4844). */
export const hero = {
  eyebrow: 'About Blinto',
  heading:
    'We Build Shopify Apps and Help Product Teams Build What Comes Next',
  subheading:
    'We help founders and product teams build, grow, and maintain Shopify apps. We also build our own Shopify products, using what we learn to serve clients better.',
  actions: [
    { label: 'Explore Our Shopify Services', href: '/services', tone: 'black' },
    { label: 'Explore Our Shopify Apps', href: '/products', tone: 'outline' },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'The Blinto team working together across laptops in their studio',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* -------------------------------------------------------------- our story */

/** Section / Our Story (Figma 251:4869). */
export const storySection: SectionCopy = {
  eyebrow: 'Our Story',
  heading:
    'Blinto Has Evolved, but the Goal Has Always Been to Build Things That Create Real Value',
  subheading:
    "We started as a company building for clients. Along the way, we picked up product and growth skills that changed how we worked. That shift pulled us deeper into the Shopify app ecosystem, and eventually led us to start building Shopify products of our own. The work looks different today, but the goal behind it hasn't changed.",
};

/** Heading-only Card / Step: Figma sets Show body=false across this row. */
export const storySteps: ProcessStep[] = [
  { number: '01', tone: 'green', heading: 'Started Building for Clients' },
  {
    number: '02',
    tone: 'blue',
    heading: 'Expanded Product and Growth Capabilities',
  },
  { number: '03', tone: 'yellow', heading: 'Deepened Our Shopify App Focus' },
  {
    number: '04',
    tone: 'green',
    heading: 'Started Building Shopify Products of Our Own',
  },
];

/* ------------------------------------------------------------ what we do */

/** Section / What We Do (Figma 253:4836). */
export const whatWeDoSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading:
    'Today, We Support the Shopify App Journey From the First Idea to What Happens After Launch',
  subheading:
    'Building an app is only the first step. Growth brings new challenges, and a live app needs ongoing care to stay useful. Blinto stays involved through every stage of that journey.',
};

export const whatWeDoCards: StageCard[] = [
  {
    icon: 'launch',
    tone: 'blue',
    heading: 'Build the Product',
    body: 'MVP planning, Shopify app development, integrations, testing, and launch preparation.',
    cta: {
      label: 'Explore Shopify App Development',
      href: '/services/app-development',
    },
  },
  {
    icon: 'growth',
    tone: 'yellow',
    heading: 'Grow the Product',
    body: 'Positioning, visibility, installs, activation, retention, and app-focused marketing.',
    cta: {
      label: 'Explore Shopify App Marketing',
      href: '/services/app-growth',
    },
  },
  {
    icon: 'support',
    tone: 'green',
    heading: 'Maintain the Product',
    body: 'Bug fixes, Shopify API updates, support, and ongoing improvements.',
    cta: {
      label: 'Explore Support & Maintenance',
      href: '/services/support-maintenance',
    },
  },
];

/* --------------------------------------------------------- how we think */

/** Section / How We Think (Figma 253:4988). */
export const howWeThinkSection: SectionCopy = {
  eyebrow: 'How We Think',
  heading:
    'Product Thinking Changes the Questions We Ask Before We Start the Work',
  subheading:
    'Owning products of our own changes how we approach client work too. Before we start building, we ask questions that shape everything that follows.',
};

/** Heading-only Card / Belief over a 200 min-height, 4-up. */
export const howWeThinkCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'What problem are we actually solving?',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'What matters now, and what can wait?',
  },
  { kind: 'belief', tone: 'yellow', heading: 'What happens after launch?' },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'What does the next stage need from us?',
  },
];

/* -------------------------------------------------------------- the team */

/** Section / The Team (Figma 254:4930). */
export const teamSection: SectionCopy = {
  eyebrow: 'The Team',
  heading:
    'Behind Every Product, Campaign, and Release Is a Team of Real People',
  subheading:
    'Every app we build and every campaign we run comes down to the people behind it. Here is who they are.',
};

export const team: Person[] = [
  { name: 'Fazle Rabbi', role: 'Founder & CEO', photo: teamFazleRabbi },
  { name: 'Zannatul Ferdousi', role: 'HR & Admin', photo: teamZannatulFerdousi },
  { name: 'Rafsan Zahid', role: 'Account Manager', photo: teamRafsanZahid },
  {
    name: 'Jubaer Hossen Siam',
    role: 'Frontend Developer',
    photo: teamJubaerHossenSiam,
  },
  {
    name: 'Ishrat Jahan Usha',
    role: 'Frontend Developer',
    photo: teamIshratJahanUsha,
  },
  {
    name: 'Fatema-A-Ferdaus',
    role: 'Frontend Developer',
    photo: teamFatemaAFerdaus,
  },
  { name: 'Abo Raihan', role: 'Frontend Developer', photo: teamAboRaihan },
  {
    name: 'Md. Yasin Arafat',
    role: 'Frontend Developer',
    photo: teamMdYasinArafat,
  },
  {
    name: 'Mosharraf Hossen',
    role: 'Frontend Developer',
    photo: teamMosharrafHossen,
  },
  { name: 'Abu Sayem', role: 'Backend Developer', photo: teamAbuSayem },
  {
    name: 'Atia Rasida Silvia',
    role: 'UI/UX Designer',
    photo: teamAtiaRasidaSilvia,
  },
  { name: 'Md Imran Hossain', role: 'UI/UX Designer', photo: teamMdImranHossain },
  { name: 'Md. Omar Faruque', role: 'SEO Strategist', photo: teamMdOmarFaruque },
  {
    name: 'Ifrat Jahan Chowdhury',
    role: 'Business Analyst',
    photo: teamIfratJahanChowdhury,
  },
  {
    name: 'Wasia Zaman Drishty',
    role: 'Content Writer',
    photo: teamWasiaZamanDrishty,
  },
  {
    name: 'Rakibul H. Rocky',
    role: 'Senior Product Designer',
    photo: teamRakibulHRocky,
    /**
     * The only portrait exported as a cut-out rather than with its studio
     * backdrop baked in, so the design paints the fill behind it. Matches the
     * cyan the other studio shots were taken against.
     */
    photoBackground: '#04ade5',
  },
];

/* ---------------------------------------------------------- how we work */

/** Section / How We Work (Figma 254:4981). */
export const howWeWorkSection: SectionCopy = {
  eyebrow: 'How We Work',
  heading:
    'Good Work Happens When People Can Think, Question, Build, and Improve Together',
  subheading:
    "We ask before we assume. We keep communication clear, and we own what we ship. We stay curious about the products we build, learning from what works and what doesn't, long after launch.",
};

export const howWeWorkCells: BeliefCell[] = [
  {
    kind: 'image',
    image: {
      src: howWeWork1,
      alt: 'Two colleagues reviewing work together at a desk',
      width: 427,
      height: 360,
    },
  },
  {
    kind: 'image',
    image: {
      src: howWeWork2,
      alt: 'The team in discussion around a laptop during a working session',
      width: 427,
      height: 360,
    },
  },
  {
    kind: 'image',
    image: {
      src: howWeWork3,
      alt: 'A developer at work on a dual-monitor setup',
      width: 427,
      height: 360,
    },
  },
];

/* -------------------------------------------------------------------- faq */

/** Section / FAQ (Figma 256:5018). */
export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'A Few Things People Usually Want to Know About Blinto',
  subheading: 'Short answers to the questions we hear most.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'Is Blinto a Shopify app development agency?',
    answer:
      'We build, grow, and maintain Shopify apps for clients, and we build our own too. That product experience shapes how we work.',
  },
  {
    question: 'Does Blinto only work with Shopify apps?',
    answer:
      'Yes. Shopify apps are our focus, and it is where our team has the deepest experience.',
  },
  {
    question: 'Does Blinto build its own products?',
    answer:
      'Yes. Giftify, GrowSell, and Smart Pop-Up Offer Builder are all products we built and maintain ourselves.',
  },
  {
    question: 'Can Blinto help after an app is already live?',
    answer:
      'Yes. We support live apps with maintenance, updates, and growth work, not just new builds.',
  },
];

/* -------------------------------------------------------------------- cta */

/** Section / CTA (Figma 256:5059). */
export const closingCta = {
  kicker: 'Next Step',
  heading: 'The Next Shopify App Story Could Start With a Conversation',
  body: 'Whether you are building your first app or growing one that is already live, we would like to hear about it.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Start a Conversation', href: '/contact', tone: 'white' },
  ] satisfies CtaAction[],
};
