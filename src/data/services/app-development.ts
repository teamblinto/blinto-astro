import type { CtaAction } from '~/components/sections/Cta.astro';
import type { FaqEntry } from '~/components/sections/Faq.astro';
import type {
  BeliefCell,
  CardImage,
  ListPanel,
  ProcessStep,
  SectionCopy,
  StageCard,
} from '../types';

/**
 * Photography lives in `src/assets` (not `public`) so Astro's build pipeline
 * optimises it — emitting modern formats and a density srcset — instead of
 * shipping the raw 2x JPEGs.
 */
import heroBanner from '~/assets/images/svc-hero-banner.jpg';
import beforeTheCode from '~/assets/images/svc-before-the-code.jpg';
import appTypes from '~/assets/images/svc-app-types.jpg';
import whyBlintoTeam from '~/assets/images/svc-why-blinto-1.jpg';
import whyBlintoHighFive from '~/assets/images/svc-why-blinto-2.jpg';
import afterLaunch from '~/assets/images/svc-after-launch.jpg';
import ctaBackdrop from '~/assets/images/cta-backdrop.png';

/**
 * Shopify App Development service page content, kept out of the markup so
 * copy can change without touching layout. Strings are transcribed from the
 * Figma design (node 213:2429, "Service — Shopify App Development · Desktop").
 *
 * Alt text is authored here: the design carries no alternative text, so each
 * string describes the photograph that shipped in that slot.
 */

export const meta = {
  title: 'Shopify App Development Services — Blinto',
  description:
    'Blinto helps Shopify app founders and product teams scope an MVP, build around real merchant workflows, and launch a Shopify app that is ready for users.',
};

/* ------------------------------------------------------------------- hero */

/** Section / Hero (Figma 217:3139). */
export const hero = {
  eyebrow: 'Shopify App Development',
  heading:
    'Turn Your App Idea Into a Launch-Ready Product With Shopify App Development Services',
  subheading:
    'We help Shopify app founders and product teams turn an idea into a scoped, buildable product ready for launch, through structured planning and Shopify-specific development.',
  actions: [
    { label: 'Discuss Your App Idea', href: '/contact-us/', tone: 'black' },
    {
      label: 'Explore Our Development Process',
      href: '#our-process',
      tone: 'outline',
    },
  ] satisfies CtaAction[],
  banner: {
    src: heroBanner,
    alt: 'Whiteboard covered in hand-drawn Shopify app wireframes and a coding workflow diagram',
    width: 1440,
    height: 800,
  } satisfies CardImage,
};

/* --------------------------------------------------- before the code ---- */

/** Section / Before the Code (Figma 213:2439). */
export const beforeTheCodeSection: SectionCopy = {
  eyebrow: 'Before the Code',
  heading: 'A Strong Shopify App Begins Before the First Line of Code',
  subheading:
    'An idea can solve a real merchant problem and still need clear priorities, technical direction, and a realistic path to launch.',
};

export const beforeTheCodePanel: ListPanel = {
  tone: 'blue',
  heading:
    "Most founders don't struggle with the idea itself. They struggle with what comes next.",
  subheading: 'Founders often struggle with',
  items: [
    'Choosing the right MVP features',
    'Defining merchant workflows',
    'Planning Shopify integrations',
    'Avoiding unnecessary development',
    'Finding reliable delivery capacity',
  ],
};

export const beforeTheCodeImage: CardImage = {
  src: beforeTheCode,
  alt: 'Illustration of a shopping basket, bags, discount tag and a sales chart on a Shopify-style dashboard',
  width: 650,
  height: 341,
};

/* --------------------------------------------------------- where you are */

/** Section / Where You Are (Figma 213:2444). */
export const stagesSection: SectionCopy = {
  eyebrow: 'Where You Are',
  heading: 'Every App Idea Starts With a Different Kind of Challenge',
  subheading:
    'No two founders arrive at the same starting point. We meet you where you are and build from there.',
};

export const stageCards: StageCard[] = [
  {
    icon: 'idea',
    tone: 'blue',
    heading: 'You Have an Idea but Need a Clear MVP',
    body: 'You understand the problem you want to solve. What you need now is help defining features, user flows, and the technical requirements that turn a concept into version one.',
  },
  {
    icon: 'admin',
    tone: 'yellow',
    heading: 'Your SaaS Product Needs a Shopify Extension',
    body: 'Your product already works elsewhere. Now it needs Shopify API integrations and an embedded experience that fits how merchants actually shop and manage their stores.',
  },
  {
    icon: 'updates',
    tone: 'green',
    heading: 'Your Existing App Needs a Better Technical Direction',
    body: 'Your app is live, but it has outgrown its foundation. We help with improvements, new features, and architecture changes that support where the product needs to go next.',
  },
];

/* ---------------------------------------------------------- what we build */

/** Section / What We Build (Figma 213:2450). */
export const whatWeBuildSection: SectionCopy = {
  eyebrow: 'What We Build',
  heading: 'From MVP Planning to Launch, Every Step Has a Purpose',
  subheading:
    'A clear development journey connects product decisions with technical execution, moving the app closer to solving the right merchant problem.',
};

export const whatWeBuildCells: BeliefCell[] = [
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Turn the Idea Into a Focused MVP',
    body: 'We separate launch-critical features from later improvements, giving your first version a clearer purpose and a more manageable scope.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Build Around Real Merchant Workflows',
    body: 'Development should reflect how merchants actually use the app, not just what looks good on paper. We build around the problem, not the feature list.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Connect the App Through Shopify APIs',
    body: 'We build the Shopify and third-party integrations your app needs to support data flows, merchant actions, and core functionality.',
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Shape the Product Experience Before Development',
    body: 'Before we write code, we map user flows, interface needs, and technical requirements so the build has a clear direction from day one.',
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'Test the App Before Users Depend on It',
    body: 'We run structured QA on core flows, catch issues early, and confirm the app is ready before real merchants rely on it.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Prepare the Product for Launch',
    body: 'We handle final fixes and deployment prep so the app is ready to go live, with launch support built into the process.',
  },
];

/* --------------------------------------------------------------- app types */

/** Section / App Types (Figma 213:2459). */
export const appTypesSection: SectionCopy = {
  eyebrow: 'App Types',
  heading: 'The Right Shopify App Depends on the Problem You Need to Solve',
  subheading:
    'The product format should follow the business problem and the intended users, not a generic development template.',
};

export const appTypesPanel: ListPanel = {
  tone: 'green',
  heading: 'Blinto can support',
  items: [
    'New Shopify app MVPs',
    'Public Shopify apps',
    'Custom merchant applications',
    'Embedded app experiences',
    'SaaS and Shopify integrations',
    'Existing app improvements and rebuilds',
  ],
};

export const appTypesImage: CardImage = {
  src: appTypes,
  alt: 'Four hands fitting the last pieces of a four-piece jigsaw puzzle together',
  width: 650,
  height: 289,
};

/* ------------------------------------------------------------ our process */

/** Section / Our Process (Figma 213:2464). */
export const processSection: SectionCopy = {
  eyebrow: 'Our Process',
  heading: 'A Clear Development Process Turns Uncertainty Into Progress',
  subheading:
    'A structured process gives founders clearer decisions, visible progress, and fewer surprises as the product moves from idea to launch.',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'First, We Understand the Product You Want to Build',
    body: "We start with your idea, your audience, the merchant problem you're solving, and your timeline and known requirements.",
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Then, We Shape the MVP and Roadmap',
    body: 'We define scope and priorities, decide on technical direction, and agree on what can wait until later.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Next, We Plan the Product and Technical Experience',
    body: 'We map user flows, integrations, interface needs, and architecture before development begins.',
  },
  {
    number: '04',
    tone: 'blue',
    heading: 'The App Moves Through Development and Testing',
    body: 'We build with regular communication, test as we go, and resolve issues so you always know where things stand.',
  },
  {
    number: '05',
    tone: 'green',
    heading: 'Finally, We Prepare the Product for Launch',
    body: 'We run final checks, prepare deployment, and set up the transition into post-launch support.',
  },
];

export const processAction: CtaAction = {
  label: 'Start With a Discovery Call',
  href: '/contact-us/',
  tone: 'black',
};

/* ------------------------------------------------------------ why blinto */

/** Section / Why Blinto (Figma 213:2473). */
export const whyBlintoSection: SectionCopy = {
  eyebrow: 'Why Blinto',
  heading: 'Your Development Partner Should Think Beyond the Code',
  subheading:
    'Founders need more than development capacity. They need a partner who sees how product, technical, and growth decisions affect each other.',
};

export const whyBlintoCells: BeliefCell[] = [
  {
    kind: 'image',
    image: {
      src: whyBlintoTeam,
      alt: 'Development team working together on laptops around a shared table',
      width: 427,
      height: 320,
    },
  },
  {
    kind: 'belief',
    tone: 'blue',
    heading: 'Product Decisions Guide Technical Decisions',
    body: "We connect user needs and business goals to MVP scope, so every technical choice supports the product you're actually trying to build.",
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Shopify Expertise Shapes the Build',
    body: 'We build with Shopify APIs, merchant workflows, and platform requirements in mind from the start, not as an afterthought.',
  },
  {
    kind: 'belief',
    tone: 'green',
    heading: 'Clear Priorities Keep the MVP Focused',
    body: "Structured scope keeps unnecessary features from creeping in and delaying the launch you're working toward.",
  },
  {
    kind: 'belief',
    tone: 'yellow',
    heading: 'One Team Can Support What Comes Next',
    body: "Development can connect directly with app marketing, growth, and ongoing support, so you're not starting over with a new partner later.",
  },
  {
    kind: 'image',
    image: {
      src: whyBlintoHighFive,
      alt: 'Two colleagues high-fiving over a laptop after a successful app launch',
      width: 427,
      height: 320,
    },
  },
];

/* ---------------------------------------------------------- after launch */

/** Section / After Launch (Figma 213:2488). */
export const afterLaunchSection: SectionCopy = {
  eyebrow: 'After Launch',
  heading: 'A Successful Launch Should Be the Beginning, Not the End',
  subheading:
    'Once users depend on the app, new feedback, technical needs, and platform changes start shaping the next stage.',
};

export const afterLaunchPanel: ListPanel = {
  tone: 'blue',
  heading:
    "Launch day isn't the finish line. It's where the real feedback starts coming in.",
  subheading: 'Blinto can support',
  items: [
    'Bug fixes and updates',
    'Product improvements',
    'Ongoing app maintenance',
  ],
};

export const afterLaunchImage: CardImage = {
  src: afterLaunch,
  alt: 'Illustration of a rocket lifting off on a plume of cloud against a night sky',
  width: 650,
  height: 275,
};

export const afterLaunchAction: CtaAction = {
  label: 'Explore Shopify App Support and Maintenance Services',
  href: '/services/shopify-app-support-maintenance/',
  tone: 'black',
};

/* -------------------------------------------------------------------- faq */

/** Section / FAQ (Figma 213:2494). */
export const faqSection = {
  eyebrow: 'FAQs',
  heading:
    'Questions Founders Ask Before Choosing Shopify App Development Services',
  subheading:
    'Here are the questions we hear most often before a founder decides to move forward.',
};

export const faqs: FaqEntry[] = [
  {
    question: 'What are Shopify app development services?',
    answer:
      'Shopify app development services help founders and product teams plan, design, build, test, and launch applications for the Shopify ecosystem, from early idea to live product.',
  },
  {
    question: 'Can Blinto help define my Shopify app MVP?',
    answer:
      'Yes. We help prioritize features, clarify user needs, define technical requirements, and build a roadmap that separates what launches now from what comes later.',
  },
  {
    question: 'Can Blinto develop an app using Shopify APIs?',
    answer:
      'Yes. We build Shopify API integrations along with third-party connections, so your app supports the data flows and merchant workflows it needs to function.',
  },
  {
    question: 'Can Blinto support an app after launch?',
    answer:
      'Yes. We handle bug fixes, feature improvements, and Shopify API updates, and offer ongoing technical support so your app stays stable after launch.',
  },
];

/* -------------------------------------------------------------------- cta */

/** Section / CTA (Figma 213:2502). */
export const closingCta = {
  kicker: 'Next Step',
  heading: 'Your Shopify App Can Move From Idea to Action',
  body: 'Whether you have an early idea or a defined product plan, we can help turn your next development decision into real progress.',
  backdrop: ctaBackdrop,
  actions: [
    { label: 'Discuss Your App Idea', href: '/contact-us/', tone: 'black' },
    { label: 'Explore All Shopify Services', href: '/services/', tone: 'white' },
  ] satisfies CtaAction[],
};
