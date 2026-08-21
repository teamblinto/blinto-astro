import type { FaqEntry } from '~/components/sections/Faq.astro';
import type { ProcessStep, SectionCopy } from '../types';

/**
 * Contact Us — content migrated verbatim from https://blinto.co/contact-us/.
 *
 * The three "what happens next" stages carry no numbers in the source; Card /
 * Step shows one, so they are numbered in the order the source lists them.
 */

export const meta = {
  title: 'Contact Blinto — Let’s Connect',
  description:
    'Talk to Blinto about your Shopify or WordPress project. Send us a message and we reply within 2-4 business hours, or reach our Wyoming and Dhaka offices directly.',
};

export const hero = {
  eyebrow: 'Contact Us',
  heading: 'Let’s Connect with Blinto',
};

export const nextSection: SectionCopy = {
  eyebrow: 'What Happens Next',
  heading: 'What Happens After You Send Us a Message?',
};

export const nextSteps: ProcessStep[] = [
  {
    number: '01',
    tone: 'green',
    heading: 'Quick Connect',
    body: 'Within 24 hours, our team reaches out to understand your inquiry and how we can help you.',
  },
  {
    number: '02',
    tone: 'blue',
    heading: 'Clear Guidance',
    body: 'We provide the information you need or create a customized plan based on your specific situation.',
  },
  {
    number: '03',
    tone: 'yellow',
    heading: 'Follow Through',
    body: "Whether it's answering questions, starting a project, or connecting you with the right resources, we ensure you get the support you need.",
  },
];

export const faqSection = {
  eyebrow: 'FAQs',
  heading: 'Answer to your questions',
};

export const faqs: FaqEntry[] = [
  {
    question: "What's the best way to reach Blinto?",
    answer:
      'The fastest way is through our contact form above – we respond within 2-4 business hours. For urgent matters, call us directly.',
  },
  {
    question: 'What are your business hours?',
    answer:
      'Our team is available Monday through Friday, 9 AM to 6 PM EST. We monitor emails and urgent requests on weekends and respond to emergencies 24/7 for maintenance clients.',
  },
  {
    question: 'What information should I include in my message?',
    answer:
      'Please include your business name, website URL (if applicable), project timeline, approximate budget range, and a brief description of what you need. The more details you provide, the more accurate our initial response will be.',
  },
  {
    question: 'Do you offer free consultations?',
    answer:
      'Yes! We offer a free 30-minute consultation call to discuss your project needs, answer questions, and see if we’re a good fit. No obligations, no sales pressure – just an honest conversation about how we can help your business grow.',
  },
  {
    question: 'Can I schedule a video call instead of emailing?',
    answer:
      'Absolutely! Use our calendar scheduling tool to book a convenient time for a Zoom or Google Meet call. Video calls help us understand your needs better.',
  },
];
