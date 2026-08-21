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
 * The approved sitemap's six top-level items, in order. `/about-us/`,
 * `/contact-us/` and `/case-studies/` deliberately reuse the paths the current
 * WordPress site already ranks on, so those three need no redirect at launch.
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
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Contact Us', href: '/contact-us/' },
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
export const contact = {
  email: 'hello@blinto.co',
  legalEmail: 'info@blinto.co',
  bookingUrl: 'https://calendly.com/blinto/30min',
};

export const footerTagline =
  'A product-focused Shopify expert agency helping app founders and product teams build, grow, and maintain Shopify apps.';

/**
 * The footer carries every service page, not just the three in the navigation.
 * The approved sitemap caps the Services dropdown at three, but all nine pages
 * are indexed today and a page nothing links to is a page search engines treat
 * as abandoned — the current WordPress footer lists its six services for the
 * same reason. Client Support is here on the same grounds.
 */
export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Shopify App Development', href: '/services/shopify-app-development/' },
      { label: 'Shopify App Growth', href: '/services/shopify-app-marketing/' },
      { label: 'Support & Maintenance', href: '/services/shopify-app-support-maintenance/' },
      {
        label: 'Shopify Theme & Storefront',
        href: '/services/shopify-theme-storefront-development/',
      },
      {
        label: 'WordPress Design & Development',
        href: '/services/wordpress-design-development/',
      },
      {
        label: 'WordPress Plugin Development',
        href: '/services/wordpress-plugin-development/',
      },
      {
        label: 'WordPress Growth Marketing',
        href: '/services/wordpress-growth-marketing/',
      },
      { label: 'SEO', href: '/services/seo/' },
      { label: 'Website Maintenance', href: '/services/website-maintenance/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us/' },
      { label: 'Our Apps', href: '/shopify-apps/' },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Testimonials', href: '/testimonials/' },
      { label: 'Careers', href: '/career/' },
      { label: 'Client Support', href: '/support/' },
      { label: 'Contact Us', href: '/contact-us/' },
    ],
  },
];

/**
 * The policies, in the footer's bottom bar. They are deliberately out of the
 * navigation — the approved sitemap has six top-level items — but they cannot
 * be orphaned either: a page nothing links to is a page search engines treat
 * as abandoned.
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
  credit: 'Made with Love by Blinto LLC',
};
