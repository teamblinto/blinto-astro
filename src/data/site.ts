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
   * (54:1406). Labels are the design's, which say "App Support & Maintenance"
   * where the footer column says "Support & Maintenance".
   */
  submenu?: NavSubLink[];
}

export const navLinks: NavLink[] = [
  {
    label: 'Services',
    href: '/services',
    submenu: [
      { label: 'Shopify App Development', href: '/services/app-development' },
      { label: 'Shopify App Growth', href: '/services/app-growth' },
      {
        label: 'App Support & Maintenance',
        href: '/services/support-maintenance',
      },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const primaryCta = {
  label: 'Book a Discovery Call',
  href: '/contact',
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
  },
  {
    map: '/images/region-bd.svg',
    name: 'Dhaka',
    address: 'House-1211, Rd-10, Ave-10, Mirpur DOHS, Dhaka, BD.',
  },
];

export const footerTagline =
  'A product-focused Shopify expert agency helping app founders and product teams build, grow, and maintain Shopify apps.';

export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Shopify App Development', href: '/services/app-development' },
      { label: 'Shopify App Growth', href: '/services/app-growth' },
      { label: 'Support & Maintenance', href: '/services/support-maintenance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Blinto', href: '/about' },
      { label: 'Products', href: '/products' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blogs', href: '/blog' },
    ],
  },
];

export const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Facebook', href: 'https://facebook.com/blinto', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com/blinto', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/blinto', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/blinto', icon: 'x' },
  { label: 'YouTube', href: 'https://youtube.com/@blinto', icon: 'youtube' },
];

export const legal = {
  copyright: '© 2026 Blinto LLC. All Rights Reserved.',
  credit: 'Made with Love by Blinto LLC',
};
