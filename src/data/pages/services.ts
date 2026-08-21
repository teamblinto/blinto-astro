import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  CardImage,
  ProcessStep,
  SectionCopy,
  StageCard,
} from '../types';
import heroBanner from '~/assets/images/services-hero-banner.jpg';
import ownApps from '~/assets/images/services-own-apps.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Services — built from Figma "Shopify Services · Desktop" (272:6260). Copy is
 * the design's, verbatim.
 *
 * This is the hub above the three Shopify service pages, so every "Explore …"
 * button routes to one of them and every discovery-call button to /contact-us/.
 */

export const meta = {
  title: 'Shopify Services — Blinto | Build, Grow and Support Your App',
  description:
    'Blinto helps app founders and product teams plan, build, grow and support Shopify apps — development, marketing and ongoing maintenance shaped around each product stage.',
};

const DISCOVERY_HREF = '/contact-us/';
const DEV_HREF = '/services/shopify-app-development/';
const GROWTH_HREF = '/services/shopify-app-marketing/';
const SUPPORT_HREF = '/services/shopify-app-support-maintenance/';

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Shopify Services',
  heading:
    'Shopify Services That Help Your App Move From Idea to Growth and Long-Term Support',
  subheading:
    'We help app founders and product teams plan, build, grow, and support Shopify apps through connected services shaped around each product stage.',
  actions: [
    {
      label: 'Find the Right Shopify Service',
      href: '#choose-your-service',
      tone: 'black',
    },
    { label: 'Book a Discovery Call', href: DISCOVERY_HREF, tone: 'outline' },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'A product team working together at a laptop',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* -------------------------------------------------------- where you are */

export const stageSection: SectionCopy = {
  eyebrow: 'Where You Are',
  heading: 'Every Shopify App Team Arrives at a Different Stage',
  subheading:
    'Some teams are shaping an idea. Others need growth or technical continuity. The right Shopify service depends on where your product stands today.',
};

export const stageCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'blue',
    heading: 'You Have an App Idea but Need a Clear Path to Launch',
    body: 'If you’re a founder with a validated idea, you need MVP planning, technical direction, custom development, testing, and a clear path to launch.',
    cta: { label: 'Explore App Development', href: DEV_HREF },
  },
  {
    icon: 'growth',
    tone: 'yellow',
    heading: 'Your App Is Live, but Growth Needs a Stronger Direction',
    body: 'If your app is live but stuck, you need better positioning, more qualified installs, stronger activation, and a real plan for retention.',
    cta: { label: 'Explore App Marketing', href: GROWTH_HREF },
  },
  {
    icon: 'support',
    tone: 'green',
    heading: 'Your App Needs Continued Technical Ownership',
    body: 'If you’re managing a live app, you need someone watching for bugs, Shopify API changes, integration issues, and the maintenance work that keeps things stable.',
    cta: { label: 'Explore App Support', href: SUPPORT_HREF },
  },
];

/* ------------------------------------------------------------ what we do */

export const servicesSection: SectionCopy = {
  eyebrow: 'What We Do',
  heading: 'The Right Shopify Services Depend on What Your App Needs Next',
  subheading:
    'An app’s needs change as it moves from idea to launch, growth, and daily operation. We bring the right Shopify service into each stage.',
};

export const serviceCards: StageCard[] = [
  {
    icon: 'launch',
    tone: 'green',
    heading: 'Turn the App Idea Into a Product Merchants Can Use',
    body: 'We handle MVP planning and scope, custom Shopify app development, Shopify API integrations, and testing before launch.',
    features: ['Plan the MVP', 'Build the app', 'Prepare for launch'],
    cta: { label: 'Explore Shopify App Development Services', href: DEV_HREF },
  },
  {
    icon: 'growth',
    tone: 'blue',
    heading: 'Turn App Visibility Into Installs, Activation, and Retention',
    body: 'Our Shopify app marketing work covers positioning, App Store optimization, SEO, content, paid acquisition, and the activation work that keeps users around.',
    features: [
      'Strengthen positioning',
      'Improve qualified installs',
      'Support long-term adoption',
    ],
    cta: { label: 'Explore Shopify App Marketing', href: GROWTH_HREF },
  },
  {
    icon: 'updates',
    tone: 'yellow',
    heading: 'Keep the Live App Stable as the Product Evolves',
    body: 'Our Shopify app support and maintenance services cover bug fixes, Shopify API updates, integration work, and the technical debt that piles up over time.',
    features: [
      'Resolve technical issues',
      'Manage platform changes',
      'Maintain product stability',
    ],
    cta: {
      label: 'Explore Shopify App Support and Maintenance Services',
      href: SUPPORT_HREF,
    },
  },
];

/* -------------------------------------------------- one product story */

export const storySection: SectionCopy = {
  eyebrow: 'One Product Story',
  heading:
    'Development, Growth, and Support Work Better When They Share the Same Product Story',
  subheading:
    'A development decision can affect activation. A support issue can reveal a product weakness. We connect those signals across the app lifecycle.',
};

export const storyCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Product Decisions Shape What Gets Built',
    body: 'Merchant needs, project scope, and the product roadmap all shape what gets built and how it holds up later.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'The Product Experience Shapes Marketing Performance',
    body: 'Positioning only works if onboarding and usability back it up. Growth depends on how the product actually feels to use.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Support Issues Reveal What Needs Improvement',
    body: 'Recurring bugs and support tickets point to real product gaps. That feedback should shape the roadmap, not just get patched over.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'One Partner Creates Better Continuity',
    body: 'A team that understands your product across stages moves faster than one that has to relearn it every time.',
  },
];

/* ------------------------------------------------- choose your service */

export const chooseSection: SectionCopy = {
  eyebrow: 'Choose Your Service',
  heading: 'One Clear Path Helps You Choose the Service That Fits Today',
  subheading:
    'Not every team knows exactly which service it needs. Start with the challenge in front of your product right now.',
};

export const chooseCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Starting With an Idea?',
    body: 'Choose Shopify app development services.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Trying to Improve Growth?',
    body: 'Choose Shopify app marketing.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Managing a Live Product?',
    body: 'Choose Shopify app support and maintenance services.',
  },
];

export const chooseNote =
  'Still not sure? We can help you find the right starting point during a discovery call.';

export const chooseAction: CtaAction = {
  label: 'Help Me Choose the Right Service',
  href: DISCOVERY_HREF,
  tone: 'black',
};

/* -------------------------------------------------------- how we start */

export const startSection: SectionCopy = {
  eyebrow: 'How We Start',
  heading: 'From the First Conversation, Every Step Should Move the App Forward',
  subheading:
    'Every engagement starts by understanding where your app stands today and what real progress looks like from here.',
};

export const startSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'First, We Understand the App’s Current Stage',
    body: 'We look at your product, your audience, your business goal, and the specific challenge you’re facing right now.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Then, We Identify the Right Priorities',
    body: 'We define the scope, the growth focus, the technical issue, or the maintenance need that matters most.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'The Right Specialists Put the Plan Into Action',
    body: 'We bring in the development, marketing, product, or support expertise your app actually needs.',
  },
  {
    number: '04',
    tone: 'green',
    heading: 'Finally, We Learn and Plan the Next Stage',
    body: 'We use product data, campaign results, user feedback, or support patterns to shape what comes next.',
  },
];

export const startAction: CtaAction = {
  label: 'Start With a Discovery Call',
  href: DISCOVERY_HREF,
  tone: 'black',
};

/* -------------------------------------------------------- our own apps */

export const ownAppsSection: SectionCopy = {
  eyebrow: 'Our Own Apps',
  heading: 'We Know the Journey Because We Build Shopify Products Too',
  subheading:
    'Building our own Shopify products gives us firsthand experience with the decisions, updates, and responsibilities that app teams face at every stage.',
};

export const ownAppsCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'blue',
    heading: 'Giftify (Gift Wrap & Notes)',
    body: 'Helps merchants let shoppers add gift wrapping and personal notes at checkout, built and maintained by our own team from planning through launch.',
  },
];

export const ownAppsImage: CardImage = {
  src: ownApps,
  alt: 'A gift-wrapped parcel prepared for a customer',
  width: 650,
  height: 226,
};

export const ownAppsAction: CtaAction = {
  label: 'Explore Shopify Apps Built by Blinto',
  href: '/shopify-apps/',
  tone: 'black',
};

/* ------------------------------------------------------------ why blinto */

export const whySection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading:
    'Blinto Was Built for Teams That Need More Than a One-Time Shopify Provider',
  subheading:
    'We work with teams that treat their Shopify app as a long-term product, not a one-time technical task.',
};

export const whyCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'The Team Focuses on Shopify Apps',
    body: 'We work with app products, Shopify APIs, merchant workflows, and the ongoing technical needs that come with running an app.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Product Thinking Connects Every Service',
    body: 'Business goals, user needs, technical decisions, and growth priorities all move together, not in separate lanes.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'The Partnership Can Continue as the App Changes',
    body: 'We can support your app at different stages, so you don’t have to switch providers every time your needs shift.',
  },
];

/* -------------------------------------------------------------------- faq */

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Questions Teams Ask Before Choosing Shopify Services',
  subheading:
    'Here are quick answers to the questions we hear most before teams get started.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What Shopify services does Blinto provide?',
    answer:
      'We provide Shopify services for app development, marketing and growth, and ongoing support and maintenance across the Shopify app lifecycle.',
  },
  {
    question: 'Does Blinto work on Shopify stores or Shopify apps?',
    answer:
      'Our primary focus is Shopify apps and app-led products, along with the teams building, growing, and maintaining them.',
  },
  {
    question: 'Which Shopify service should I choose?',
    answer:
      'It depends on whether your team needs to build a new app, grow an existing one, or keep a live app stable and supported.',
  },
  {
    question: 'Can Blinto support more than one stage of the app journey?',
    answer:
      'Yes. We can connect development, marketing, and maintenance when your product needs support across multiple stages at once.',
  },
];

/* -------------------------------------------------------------------- cta */

export const closingCta = {
  kicker: 'Next Step',
  heading: 'Your App’s Next Stage Starts With the Right Shopify Service',
  body: 'Whether your app needs a clearer build plan, stronger growth, or reliable support, we can help you find the right service and next step.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Book a Discovery Call', href: DISCOVERY_HREF, tone: 'black' },
    {
      label: 'Explore Shopify Apps Built by Blinto',
      href: '/shopify-apps/',
      tone: 'white',
    },
  ] satisfies CtaAction[],
};
