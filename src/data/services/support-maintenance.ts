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

import heroBanner from '~/assets/images/sup-hero-banner.jpg';
import afterLaunch from '~/assets/images/sup-after-launch.jpg';
import whatWeInvestigate from '~/assets/images/sup-what-we-investigate.jpg';
import whyBlintoTeam from '~/assets/images/sup-why-blinto-1.jpg';
import whyBlintoHuddle from '~/assets/images/sup-why-blinto-2.jpg';
import keepLearning from '~/assets/images/sup-keep-learning.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * App Support & Maintenance service page content, transcribed from the Figma
 * design (node 240:3463, "Service — App Support & Maintenance · Desktop").
 *
 * Alt text is authored here: the design carries no alternative text, so each
 * string describes the photograph that shipped in that slot.
 */

export const meta = {
  title:
    'Shopify App Support & Maintenance Services — Blinto | Keep Your App Stable',
  description:
    'Blinto helps Shopify app owners fix recurring bugs, manage Shopify API updates and keep live apps stable through structured technical support and ongoing maintenance.',
};

/* ------------------------------------------------------------------- hero */

/** Section / Hero (Figma 240:3491). */
export const hero = {
  eyebrow: 'App Support & Maintenance',
  heading:
    'Keep Your App Stable and Ready for What Comes Next With Shopify App Support and Maintenance Services',
  subheading:
    'Blinto helps app owners fix recurring bugs, manage Shopify API updates, and keep live apps stable through structured technical support and ongoing maintenance.',
  actions: [
    { label: 'Request Maintenance Support', href: '/contact', tone: 'black' },
    {
      label: 'Explore Our Support Process',
      href: '#our-process',
      tone: 'outline',
    },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'Code editor open on a laptop, lit blue and purple in a darkened room',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* ---------------------------------------------------------- after launch */

/** Section / After Launch (Figma 241:3482). */
export const afterLaunchSection: SectionCopy = {
  eyebrow: 'After Launch',
  heading: 'The App Launched: Then the Real Maintenance Work Began',
  subheading:
    'Launching an app is only the start. Once merchants depend on it, every issue starts to carry real weight.',
};

export const afterLaunchPanel: ListPanel = {
  tone: 'blue',
  heading:
    'Unresolved bugs chip away at user trust, pile up support tickets, and slow the team down when they try to move the product forward.',
  subheading: 'Common pressures include',
  items: [
    'Bugs that return after quick fixes',
    'Shopify API and platform changes',
    'Growing support ticket backlogs',
    'Third-party integrations that break without warning',
    'Technical debt that delays new updates',
  ],
};

export const afterLaunchImage: CardImage = {
  src: afterLaunch,
  alt: 'Close-up of colourful source code on a screen at shallow focus',
  width: 650,
  height: 376,
};

/* --------------------------------------------------------- where you are */

/** Section / Where You Are (Figma 241:3536). */
export const stagesSection: SectionCopy = {
  eyebrow: 'Where You Are',
  heading: 'Every Live App Reaches a Different Support Crossroad',
  subheading:
    "Not every app hits the same wall. Here's where teams usually land, and how we fit in.",
};

export const stageCards: StageCard[] = [
  {
    icon: 'admin',
    tone: 'blue',
    heading: 'The Original Developer Is No Longer Available',
    body: 'The person who built the app moved on, and the team is left managing a codebase without anyone who truly understands it.',
  },
  {
    icon: 'support',
    tone: 'yellow',
    heading: 'Your Internal Team Cannot Keep Up With Support',
    body: 'Bugs, roadmap work, integrations, and support tickets keep stacking up faster than the internal team can clear them.',
  },
  {
    icon: 'updates',
    tone: 'green',
    heading: 'The App Works, but Every Update Feels Risky',
    body: 'Outdated components and shaky integrations make even small changes feel like they could break something else.',
  },
];

/* ------------------------------------------------------------ what we do */

/** Section / What We Do (Figma 241:3643). */
export const whatWeDoSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading:
    'Reliable Shopify App Support and Maintenance Services Keep the Product Moving',
  subheading:
    "Live apps need more than emergency fixes. Here's what ongoing support actually covers.",
};

export const whatWeDoCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Resolve Bugs Before They Become Recurring Problems',
    body: 'We investigate root causes, prioritize by impact, and fix bugs across the workflows that matter most to your users.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Keep the App Aligned With Shopify API Changes',
    body: 'We review compatibility needs, flag deprecated functionality, and handle the technical updates your app requires to stay in step with Shopify.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Restore Integrations That Stop Working as Expected',
    body: 'We troubleshoot third-party integrations, fix broken data flows, and get synchronization issues working again.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Improve Performance Where Users Feel the Friction',
    body: 'We track down slow workflows, unreliable behavior, and error patterns that hurt the day-to-day user experience.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Move Product Updates Forward Without Losing Stability',
    body: "We help ship smaller features and roadmap items without putting the app's existing stability at risk.",
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Reduce Technical Debt That Slows Every Next Step',
    body: 'We identify the outdated code and maintainability issues that make bugs harder to fix and updates slower to ship.',
  },
];

/* -------------------------------------------------- what we investigate ---- */

/** Section / What We Investigate (Figma 241:3672). */
export const investigateSection: SectionCopy = {
  eyebrow: 'What We Investigate',
  heading: 'Small Technical Issues Can Become Bigger Product Problems',
  subheading:
    'A broken workflow rarely stays small. It usually spreads into user frustration and support tickets fast.',
};

export const investigatePanel: ListPanel = {
  tone: 'green',
  heading: 'Blinto can help investigate',
  items: [
    'Recurring app bugs',
    'Shopify API compatibility issues',
    'Broken integrations',
    'Slow or unstable workflows',
    'Failed app updates',
    'Data synchronization errors',
    'Outdated dependencies',
    'Support-driven technical problems',
  ],
};

export const investigateImage: CardImage = {
  src: whatWeInvestigate,
  alt: 'Hands using a screwdriver on an opened circuit board',
  width: 650,
  height: 355,
};

/* ------------------------------------------------------------ our process */

/** Section / Our Process (Figma 242:3626). */
export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading:
    'A Clear Support Process Turns Technical Pressure Into Manageable Priorities',
  subheading:
    'Good maintenance starts with understanding the app, not jumping straight into fixes.',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'First, We Understand the App and Its Current Condition',
    body: 'We review the codebase, documentation, technical access, and support history to see where things actually stand.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Then, We Separate Urgent Issues From Longer-Term Work',
    body: 'We prioritize based on user impact, product risk, support pressure, and where it sits on your roadmap.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Next, We Investigate and Resolve the Agreed Priorities',
    body: 'We work through troubleshooting, bug fixes, integration issues, and the technical updates the app needs.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'The App Moves Into a More Predictable Maintenance Rhythm',
    body: "We organize ongoing updates, improvements, and monitoring around the engagement we've agreed on.",
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Finally, We Learn From Repeated Issues',
    body: 'We use technical patterns and support requests to spot improvements that reduce friction down the road.',
  },
];

export const processAction: CtaAction = {
  label: 'Request Maintenance Support',
  href: '/contact',
  tone: 'black',
};

/* -------------------------------------------------------- support models */

/** Section / Support Models (Figma 242:3672). */
export const supportModelsSection: SectionCopy = {
  eyebrow: 'Support Models',
  heading: 'Some Apps Need One Fix: Others Need a Team That Stays',
  subheading:
    "Not every team needs the same kind of support. Here's how the models differ.",
};

export const supportModels: StageCard[] = [
  {
    icon: 'idea',
    tone: 'blue',
    heading: 'One-Time Technical Support',
    body: 'For a specific bug, broken feature, or integration issue that needs focused investigation and a fix.',
  },
  {
    icon: 'support',
    tone: 'green',
    heading: 'Ongoing App Maintenance',
    body: 'For teams that need regular updates, troubleshooting, and someone who knows the codebase over time.',
  },
  {
    icon: 'growth',
    tone: 'yellow',
    heading: 'Post-Launch Product Improvements',
    body: 'For app owners still refining features, merchant workflows, and overall product reliability after launch.',
  },
];

/* ------------------------------------------------------------ why blinto */

/** Section / Why Blinto (Figma 242:3779). */
export const whyBlintoSection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading:
    'Your Support Partner Should Understand What the Technical Issue Means for the Product',
  subheading:
    'A bug is rarely just a bug. It can touch onboarding, trust, and retention too.',
};

export const whyBlintoCells: BeliefCell[] = [
  {
    kind: 'image',
    image: {
      src: whyBlintoTeam,
      alt: 'Development team working across laptops around a large shared table',
      width: 427,
      height: 320,
    },
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'App Support, Not Generic Store Maintenance',
    body: 'We focus on app functionality, Shopify APIs, integrations, and the workflows merchants actually rely on.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'User Impact Helps Shape Technical Priorities',
    body: 'We weigh user experience, support pressure, and business risk when deciding what gets fixed first.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Maintenance Should Reduce Future Friction',
    body: "We look at recurring patterns, not just the symptom in front of us, so the same bug doesn't keep coming back.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'One Team Understands Development, Growth, and Support',
    body: 'Our product, technical, and growth work stays connected, since one decision often affects the others.',
  },
  {
    kind: 'image',
    image: {
      src: whyBlintoHuddle,
      alt: 'Four colleagues gathered around a laptop, smiling at something on the screen',
      width: 427,
      height: 320,
    },
  },
];

/* --------------------------------------------------------- keep learning */

/** Section / Keep Learning (Figma 242:3855). */
export const keepLearningSection: SectionCopy = {
  eyebrow: 'Keep Learning',
  heading: 'Every Support Request Can Reveal What the Product Needs Next',
  subheading:
    "Support issues carry information too. They're worth paying attention to.",
};

export const keepLearningPanel: ListPanel = {
  tone: 'blue',
  heading: 'What support requests tell us',
  items: [
    'Repeated bugs point to technical priorities.',
    'Support tickets reveal workflow friction.',
    'User feedback can guide the next product or growth decision.',
  ],
};

export const keepLearningImage: CardImage = {
  src: keepLearning,
  alt: 'Closed laptop on a desk in a quiet office beside a telephone',
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
    label: 'Explore Shopify App Marketing',
    href: '/services/app-growth',
    tone: 'outline',
  },
];

/* -------------------------------------------------------------------- faq */

/** Section / FAQ (Figma 243:3781). */
export const faqSection = {
  eyebrow: 'FAQs',
  heading:
    'Questions App Owners Ask Before Choosing Shopify App Support and Maintenance Services',
  subheading: 'A few quick answers before you reach out.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What are Shopify app support and maintenance services?',
    answer:
      'They help app owners fix bugs, manage updates, troubleshoot integrations, maintain compatibility, and keep live Shopify apps running well after launch.',
  },
  {
    question: 'Can Blinto support an app built by another developer?',
    answer:
      "Yes, once we review the codebase, access, documentation, and current technical condition. We can't guarantee scope before that review.",
  },
  {
    question: 'Can Blinto help with Shopify API updates?',
    answer:
      'Yes. We check API compatibility, flag deprecated functionality, and handle the technical changes your app workflows need.',
  },
  {
    question: 'Does Blinto offer ongoing Shopify app maintenance?',
    answer:
      'Yes, based on the scope we agree on. That can include troubleshooting, updates, bug fixes, and product improvements over time.',
  },
];

/* -------------------------------------------------------------------- cta */

/** Section / CTA (Figma 243:3822). */
export const closingCta = {
  kicker: 'Next Step',
  heading:
    'Your App Does Not Have to Carry Every Technical Issue Into Its Next Stage',
  body: 'Whether you need one urgent fix or ongoing technical support, we can help you sort the priorities and build a manageable path forward.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Request Maintenance Support', href: '/contact', tone: 'black' },
    { label: 'Explore All Shopify Services', href: '/services', tone: 'white' },
  ] satisfies CtaAction[],
};
