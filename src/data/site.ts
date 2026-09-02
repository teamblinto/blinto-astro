import type { IconName } from '~/components/ui/Icon.astro';

/** Shared chrome content: navigation and footer. */

export interface NavSubLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  /**
   * Sub-navigation. Its presence is what renders the caret and the dropdown —
   * Services Menu (Figma 172:1052), the hidden state of the Navigation bar
   * (54:1406). Labels are the design's; the paths are the approved sitemap's.
   */
  submenu?: NavSubLink[];
}

/**
 * The navigation. Contact is reached through the Book a Discovery Call button
 * beside it rather than a second link to the same page, and Case Studies is out
 * until those pages exist.
 *
 * Blog sits last, after the three pages the design's bar carries. The Figma
 * frame predates the blog and so does not draw it, but a blog nobody can reach
 * from the chrome is a section of the site that only search finds — and the
 * footer already lists it under Company, so the two would disagree.
 *
 * `/about-us/` and `/contact-us/` deliberately reuse the paths the current
 * WordPress site already ranks on, so neither needs a redirect at launch.
 */
export const navLinks: NavLink[] = [
  {
    label: 'Services',
    href: '/services/',
    submenu: [
      { label: 'Shopify App Development', href: '/services/shopify-app-development/' },
      { label: 'Shopify App Growth', href: '/services/shopify-app-marketing/' },
      {
        label: 'App Support & Maintenance',
        href: '/services/shopify-app-support-maintenance/',
      },
    ],
  },
  { label: 'Our Apps', href: '/shopify-apps/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Blog', href: '/blog/' },
];

export const primaryCta = {
  label: 'Book a Discovery Call',
  href: '/contact-us/',
};

/**
 * `map` points at the illustrated silhouette exported from Figma
 * (nodes 105:125 and 105:149). They are shipped as standalone SVG files
 * rather than inline icons because they are detailed illustrations, not
 * currentColor glyphs.
 */
export const offices = [
  {
    map: '/images/region-us.svg',
    name: 'Wyoming',
    address: '30 N Gould St Ste R Sheridan, WY 82801, USA.',
    phone: '+1 (818) 474-8731',
    phoneHref: 'tel:+18184748731',
  },
  {
    map: '/images/region-bd.svg',
    name: 'Dhaka',
    address: 'House-1211, Rd-10, Ave-10, Mirpur DOHS, Dhaka, BD.',
    phone: '+880 1841 012136',
    phoneHref: 'tel:+8801841012136',
  },
];

/**
 * Where enquiries actually land. `hello@` is the address the current site's
 * contact page publishes; `info@` is the one its policies name for legal and
 * privacy requests, so both are kept rather than collapsed into one.
 */
/**
 * `twitterHandle` is the account the Twitter card is attributed to. The
 * current site's Yoast config publishes `@blintodotco` while its footer links
 * to `x.com/BlintoHQ` — the two disagree. The linked profile wins here so the
 * site is internally consistent with `socialLinks`; confirm which account is
 * live and change this one line if it is the other.
 */
export const contact = {
  email: 'hello@blinto.co',
  twitterHandle: '@BlintoHQ',
  legalEmail: 'info@blinto.co',
  bookingUrl: 'https://calendly.com/blinto/30min',
};

export const footerTagline =
  'A product-focused Shopify expert agency helping app founders and product teams build, grow, and maintain Shopify apps.';

/**
 * The footer promotes the three Shopify services and three company pages.
 *
 * Nine pages are deliberately unlinked from both the navigation and the
 * footer: the six other service pages (Shopify theme & storefront, the three
 * WordPress pages, SEO, website maintenance) and Testimonials, Careers and
 * Client Support. Their URLs stay live, they keep their 301s from the
 * WordPress paths, and they stay in `sitemap.xml` and `llms.txt`, so search
 * and answer engines still index them; they are simply not promoted.
 *
 * Case Studies is out until those pages exist, rather than pointing the footer
 * at a 404.
 */
export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Shopify App Development', href: '/services/shopify-app-development/' },
      { label: 'Shopify App Growth', href: '/services/shopify-app-marketing/' },
      { label: 'Support & Maintenance', href: '/services/shopify-app-support-maintenance/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us/' },
      { label: 'Our Apps', href: '/shopify-apps/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact Us', href: '/contact-us/' },
    ],
  },
];

/**
 * The policies. They sit opposite the copyright in the footer's bottom bar,
 * where the "Made with Love" credit used to be.
 */
export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms-conditions/' },
  { label: 'Cookie Policy', href: '/cookies-policy/' },
];

/** Blinto's real handles, taken from the current site's footer. */
export const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/BlintoHQ/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/blintohq/', icon: 'instagram' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/blintohq',
    icon: 'linkedin',
  },
  { label: 'X', href: 'https://x.com/BlintoHQ', icon: 'x' },
  { label: 'YouTube', href: 'https://www.youtube.com/@BlintoHQ', icon: 'youtube' },
];

export const legal = {
  copyright: '© 2026 Blinto LLC. All Rights Reserved.',
};
