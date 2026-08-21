import type { LegalBlock } from '../types';

/**
 * Cookie Policy — migrated verbatim from https://blinto.co/cookies-policy/.
 *
 * Legal copy is reproduced word for word: nothing is rewritten, shortened or
 * modernised. Only two things changed. The source heading levels were
 * inconsistent (Elementor emitted h1 for every section here and h6 for
 * subsections elsewhere), so they are normalised into a real document outline;
 * and the contact address, which Cloudflare served obfuscated, is written out.
 */

export const meta = {
  title: 'Cookie Policy — Blinto',
  description:
    'What cookies Blinto uses, why we use them, the difference between session and persistent cookies, and how to control or delete them in your browser.',
};

export const hero = {
  eyebrow: 'Legal',
  heading: 'Cookie Policy',
};

export const blocks: LegalBlock[] = [
  { kind: 'text', text: 'This Cookies Policy explains what Cookies are and how We use them. You should read this policy to understand what type of cookies We use, or the information We collect using Cookies and how that information is used.' },
  { kind: 'text', text: 'Cookies do not typically contain any information that personally identifies a user. Still, personal information we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store, and keep your data secure, see our Privacy Policy.' },
  { kind: 'text', text: 'We do not store sensitive personal information, such as mailing addresses, account passwords, etc., in our Cookies.' },
  { kind: 'heading', level: 2, text: 'Interpretation and Definitions' },
  { kind: 'heading', level: 3, text: 'Interpretation' },
  { kind: 'text', text: 'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.' },
  { kind: 'heading', level: 3, text: 'Definitions' },
  { kind: 'text', text: 'For the purposes of this Cookies Policy:' },
  {
    kind: 'list',
    items: [
      'Company (referred to as either “the Company,” “We,” “Us,” or “Our” in this Cookies Policy) refers to Blinto LLC, 30 N Gould St Ste R Sheridan, WY 82801, USA.',
      'Cookies are small files placed on Your computer, mobile device, or any other device by a website, containing details of your browsing history on that website among its many uses.',
      'Website refers to Blinto, accessible from https://blinto.co/',
      'You means the individual accessing or using the Website, a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.',
    ],
  },
  { kind: 'heading', level: 2, text: 'The use of the Cookies' },
  { kind: 'heading', level: 3, text: 'Type of Cookies We Use' },
  { kind: 'text', text: 'Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.' },
  { kind: 'text', text: 'We use both session and persistent Cookies for the purposes set out below:' },
  { kind: 'heading', level: 4, text: 'Necessary / Essential Cookies' },
  { kind: 'text', text: 'Type: Session Cookies' },
  { kind: 'text', text: 'Administered by: Us' },
  { kind: 'text', text: 'Purpose: These cookies are essential to provide you with services available through the website and enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.' },
  { kind: 'heading', level: 4, text: 'Functionality Cookies' },
  { kind: 'text', text: 'Type: Persistent Cookies' },
  { kind: 'text', text: 'Administered by: Us' },
  { kind: 'text', text: 'Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid having to re-enter your preferences every time You use the Website.' },
  { kind: 'heading', level: 2, text: 'Your Choices Regarding Cookies' },
  { kind: 'text', text: 'If You prefer to avoid using Cookies on the Website, You must disable the Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option to prevent using Cookies at any time.' },
  { kind: 'text', text: 'If You do not accept Our Cookies, You may experience some inconvenience in using the Website, and some features may not function properly.' },
  { kind: 'text', text: 'If You’d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.' },
  { kind: 'text', text: 'For the Chrome web browser, please visit this page from Google: https://support.google.com/accounts/answer/32050' },
  { kind: 'text', text: 'For the Internet Explorer web browser, please visit this page from Microsoft: http://support.microsoft.com/kb/278835' },
  { kind: 'text', text: 'For the Firefox web browser, please visit this page from Mozilla: https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored' },
  { kind: 'text', text: 'For the Safari web browser, please visit this page from Apple: https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac' },
  { kind: 'text', text: 'For any other web browser, please visit your web browser’s official web pages.' },
  { kind: 'text', text: 'If you have any questions about this Cookies Policy, You can contact us:' },
  { kind: 'text', text: 'By email: info@blinto.co' },
];
