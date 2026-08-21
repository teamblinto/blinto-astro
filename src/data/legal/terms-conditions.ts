import type { LegalBlock } from '../types';

/**
 * Terms and Conditions — migrated verbatim from https://blinto.co/terms-conditions/.
 *
 * Legal copy is reproduced word for word: nothing is rewritten, shortened or
 * modernised. Only two things changed. The source heading levels were
 * inconsistent (Elementor emitted h1 for every section here and h6 for
 * subsections elsewhere), so they are normalised into a real document outline;
 * and the contact address, which Cloudflare served obfuscated, is written out.
 */

export const meta = {
  title: 'Terms & Conditions — Blinto',
  description:
    'The rules and regulations for using Blinto LLC’s website, covering cookies, licensing, linking, content liability and disclaimers.',
};

export const hero = {
  eyebrow: 'Legal',
  heading: 'Terms and Conditions',
};

export const blocks: LegalBlock[] = [
  { kind: 'text', text: 'Welcome to Blinto!' },
  { kind: 'text', text: 'These terms and conditions outline the rules and regulations for using Blinto LLC’s Website, located at https://blinto.co/.' },
  { kind: 'text', text: 'By accessing this website, we assume you accept these terms and conditions. Only continue to use Blinto if you agree to take all of the terms and conditions stated on this page.' },
  { kind: 'text', text: 'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client, “You, and “Your refer to you, the person logged on to this website and compliant to the Company’s terms and conditions. “The Company, “Ourselves, “We, “Our and “Us, refers to our Company. “Party, “Parties, or “Us, refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client most appropriately for the express purpose of meeting the Client’s needs in respect of the provision of the Company’s stated services, by and subject to, prevailing law of af. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to same.' },
  { kind: 'heading', level: 2, text: 'Cookies' },
  { kind: 'text', text: 'We employ the use of cookies. By accessing Blinto, you agree to use cookies in agreement with Blinto LLC’s Privacy Policy.' },
  { kind: 'text', text: 'Most interactive websites use cookies to let us retrieve the user’s details for each visit. Our website uses cookies to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.' },
  { kind: 'heading', level: 2, text: 'License' },
  { kind: 'text', text: 'Unless otherwise stated, Blinto LLC and/or its licensors own the intellectual property rights for all material on Blinto. All intellectual property rights are reserved. You may access this from Blinto for your personal use, subject to restrictions set in these terms and conditions.' },
  { kind: 'text', text: 'You must not:' },
  {
    kind: 'list',
    items: [
      'Republish material from Blinto',
      'Sell, rent, or sub-license material from Blinto',
      'Reproduce, duplicate, or copy material from Blinto',
      'Redistribute content from Blinto',
    ],
  },
  { kind: 'text', text: 'Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Blinto LLC does not filter, edit, publish or review Comments before their presence on the website. Comments do not reflect the views and opinions of Blinto LLC, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Blinto LLC shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.' },
  { kind: 'text', text: 'Blinto LLC reserves the right to monitor all Comments and to remove any Comments that can be considered inappropriate, offensive, or cause a breach of these Terms and Conditions.' },
  { kind: 'text', text: 'You warrant and represent that:' },
  {
    kind: 'list',
    items: [
      'You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;',
      'The Comments do not invade any intellectual property right, including without limitation, copyright, patent, or trademark of any third party;',
      'The Comments do not contain defamatory, libelous, offensive, indecent, or otherwise unlawful material, which is an invasion of privacy.',
      'The Comments will not be used to solicit or promote business, custom, or present commercial or unlawful activities.',
    ],
  },
  { kind: 'text', text: 'You now grant Blinto LLC a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce, and edit any of your Comments in any forms, formats, or media.' },
  { kind: 'heading', level: 2, text: 'Hyperlinking to our Content' },
  { kind: 'text', text: 'We may consider and approve other link requests from the following types of organizations:' },
  {
    kind: 'list',
    items: [
      'commonly-known consumer and/or business information sources;',
      'Search engines;',
      'News organizations;',
      'Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and',
    ],
  },
  { kind: 'text', text: 'System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.' },
  {
    kind: 'list',
    items: [
      'These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.',
    ],
  },
  { kind: 'text', text: 'We may consider and approve other link requests from the following types of organizations:' },
  {
    kind: 'list',
    items: [
      'commonly-known consumer and/or business information sources;',
      'dot.com community sites;',
      'associations or other groups representing charities;',
      'online directory distributors;',
      'internet portals;',
      'accounting, law, and consulting firms; and',
      'educational institutions and trade associations.',
    ],
  },
  { kind: 'text', text: 'We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Blinto LLC; and (d) the link is in the context of general resource information.' },
  { kind: 'text', text: 'These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.' },
  { kind: 'text', text: 'If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Blinto LLC. Please include your name, your organization name, contact information, the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.' },
  { kind: 'text', text: 'Approved organizations may hyperlink to our Website as follows:' },
  {
    kind: 'list',
    items: [
      'By use of our corporate name; or',
      'By use of the uniform resource locator being linked to; or',
      'By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site..',
    ],
  },
  { kind: 'text', text: 'Blinto LLC’s logo or other artwork will not be allowed for linking without a trademark license agreement.' },
  { kind: 'heading', level: 2, text: 'iFrames' },
  { kind: 'text', text: 'Without prior approval and written permission, you may not create frames around our web pages that alter our website’s visual presentation or appearance.' },
  { kind: 'heading', level: 2, text: 'Content Liability' },
  { kind: 'text', text: 'We shall not be held responsible for any content on your Website. You agree to protect and defend us against all claims raised on your website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.' },
  { kind: 'heading', level: 2, text: 'Reservation of Rights' },
  { kind: 'text', text: 'We reserve the right to request that you remove all links or any particular link to our Website. You approve removing all links to our Website upon request immediately. We also reserve the right to amend these terms and conditions, and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.' },
  { kind: 'heading', level: 2, text: 'Removal of links from our website' },
  { kind: 'text', text: 'If you find any link on our Website offensive for any reason, you are free to contact and inform us anytime. We will consider requests to remove links, but we are not obligated to do so or to respond to you directly.' },
  { kind: 'text', text: 'We do not ensure that the information on this website is correct, warrant its completeness or accuracy, or promise to ensure that the website remains available or that the material is kept up to date.' },
  { kind: 'heading', level: 2, text: 'Disclaimer' },
  { kind: 'text', text: 'To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will;' },
  {
    kind: 'list',
    items: [
      'limit or exclude our or your liability for death or personal injury;',
      'limit or exclude our or your liability for fraud or fraudulent misrepresentation;',
      'limit any of our or your liabilities in any way that is not permitted under applicable law; or',
      'exclude any of our or your liabilities that may not be excluded under applicable law.',
    ],
  },
  { kind: 'text', text: 'The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.' },
  { kind: 'text', text: 'As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.' },
];
