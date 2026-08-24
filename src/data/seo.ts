import { contact, offices, socialLinks } from './site';

/**
 * Search and answer-engine metadata, in one place.
 *
 * Every page emits a single `application/ld+json` block holding one `@graph`
 * with stable `@id`s, rather than several disconnected blobs. That is what the
 * current WordPress site does through Yoast, and it is what both crawlers and
 * LLM retrievers read best: the Organization, the WebSite, this WebPage, its
 * breadcrumb and whatever the page itself is about all reference each other
 * instead of repeating the same facts.
 *
 * Nothing here is invented. Names, addresses, phone numbers and social handles
 * come from `site.ts`, which took them from the current site.
 */

export const ORG_NAME = 'Blinto';
export const ORG_LEGAL_NAME = 'Blinto LLC';

export const ORG_DESCRIPTION =
  'Blinto is a product-focused Shopify expert agency. We help app founders and product teams plan, build, grow and support Shopify apps, and we build our own.';

export const SITE_DESCRIPTION =
  'Shopify app development, growth marketing and long-term support from Blinto — plus WordPress design, plugin development and SEO.';

/** Raster logo for the Organization node; search engines want one. */
const LOGO = { path: '/blinto-logo.png', width: 1200, height: 360 };

/**
 * Breadcrumb labels, keyed by route. Explicit rather than derived so a
 * breadcrumb never reads as a slug: `/services/seo/` is "SEO", not "Seo".
 * A route missing here falls back to title-casing its last segment.
 */
export const pageLabels: Record<string, string> = {
  '/': 'Home',
  '/services/': 'Services',
  '/services/shopify-app-development/': 'Shopify App Development',
  '/services/shopify-app-marketing/': 'Shopify App Growth',
  '/services/shopify-app-support-maintenance/': 'App Support & Maintenance',
  '/services/shopify-theme-storefront-development/':
    'Shopify Theme & Storefront Development',
  '/services/wordpress-design-development/': 'WordPress Design & Development',
  '/services/wordpress-plugin-development/': 'WordPress Plugin Development',
  '/services/wordpress-growth-marketing/': 'WordPress Growth Marketing',
  '/services/seo/': 'SEO',
  '/services/website-maintenance/': 'Website Maintenance',
  '/shopify-apps/': 'Our Apps',
  '/about-us/': 'About Us',
  '/contact-us/': 'Contact Us',
  '/career/': 'Careers',
  '/testimonials/': 'Testimonials',
  '/book-a-call/': 'Book a Call',
  '/support/': 'Client Support',
  '/privacy-policy/': 'Privacy Policy',
  '/terms-conditions/': 'Terms & Conditions',
  '/cookies-policy/': 'Cookie Policy',
};

function labelFor(path: string): string {
  if (pageLabels[path]) return pageLabels[path];
  const slug = path.replace(/\/$/, '').split('/').pop() ?? '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** `WebPage` subtypes schema.org defines that this site actually has. */
export type PageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'FAQPage';

/** What a page's own schema builder is handed. */
export interface SchemaContext {
  canonical: URL;
  origin: string;
}

export interface GraphInput {
  /** The page's canonical URL. */
  canonical: URL;
  title: string;
  description: string;
  /** Absolute URL of the page's share image. */
  imageUrl: string;
  pageType?: PageType;
  /** Nodes describing what this page is about: Service, FAQPage, JobPosting… */
  extra?: Record<string, unknown>[];
}

/** Node `@id`s, so a page's own nodes can point at the shared ones. */
export const idFor = {
  organization: (origin: string) => `${origin}/#organization`,
  logo: (origin: string) => `${origin}/#logo`,
  website: (origin: string) => `${origin}/#website`,
  webpage: (canonical: string) => `${canonical}#webpage`,
  primaryImage: (canonical: string) => `${canonical}#primaryimage`,
  breadcrumb: (canonical: string) => `${canonical}#breadcrumb`,
};

/**
 * A crumb per path segment, each pointing at a URL that exists. The list is
 * built from the path so it can never disagree with the page it sits on.
 */
function breadcrumbs(canonical: URL) {
  const segments = canonical.pathname.split('/').filter(Boolean);
  const trail = [{ path: '/', name: labelFor('/') }];

  const walked: string[] = [];
  for (const segment of segments) {
    walked.push(segment);
    const path = `/${walked.join('/')}/`;
    trail.push({ path, name: labelFor(path) });
  }

  return trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: new URL(crumb.path, canonical.origin).href,
  }));
}

export function buildGraph({
  canonical,
  title,
  description,
  imageUrl,
  pageType = 'WebPage',
  extra = [],
}: GraphInput) {
  const origin = canonical.origin;
  const url = canonical.href;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': idFor.organization(origin),
        name: ORG_NAME,
        legalName: ORG_LEGAL_NAME,
        url: `${origin}/`,
        description: ORG_DESCRIPTION,
        email: contact.email,
        logo: { '@id': idFor.logo(origin) },
        image: { '@id': idFor.logo(origin) },
        address: offices.map((office) => ({
          '@type': 'PostalAddress',
          name: `${office.name} office`,
          streetAddress: office.address,
          addressCountry: office.name === 'Wyoming' ? 'US' : 'BD',
        })),
        contactPoint: offices.map((office) => ({
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: office.phone,
          email: contact.email,
          areaServed: office.name === 'Wyoming' ? 'US' : 'BD',
          availableLanguage: 'en',
        })),
        sameAs: socialLinks.map((social) => social.href),
      },
      {
        '@type': 'ImageObject',
        '@id': idFor.logo(origin),
        url: new URL(LOGO.path, origin).href,
        contentUrl: new URL(LOGO.path, origin).href,
        width: LOGO.width,
        height: LOGO.height,
        caption: ORG_NAME,
      },
      {
        '@type': 'WebSite',
        '@id': idFor.website(origin),
        url: `${origin}/`,
        name: ORG_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': idFor.organization(origin) },
        inLanguage: 'en',
      },
      {
        '@type': pageType,
        '@id': idFor.webpage(url),
        url,
        name: title,
        description,
        isPartOf: { '@id': idFor.website(origin) },
        about: { '@id': idFor.organization(origin) },
        primaryImageOfPage: { '@id': idFor.primaryImage(url) },
        /** The current site's Yoast graph carries this too. */
        thumbnailUrl: imageUrl,
        breadcrumb: { '@id': idFor.breadcrumb(url) },
        inLanguage: 'en',
      },
      {
        '@type': 'ImageObject',
        '@id': idFor.primaryImage(url),
        url: imageUrl,
        contentUrl: imageUrl,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': idFor.breadcrumb(url),
        itemListElement: breadcrumbs(canonical),
      },
      ...extra,
    ],
  };
}

/* ------------------------------------------------------- node builders */

/**
 * Every FAQ band on the site, as one node per page. Answer-engine retrieval is
 * the main reason this exists: a question/answer pair is the shape an LLM can
 * quote directly.
 */
export function faqNode(
  canonical: URL,
  items: { question: string; answer: string }[],
) {
  return {
    '@type': 'FAQPage',
    '@id': `${canonical.href}#faq`,
    isPartOf: { '@id': idFor.webpage(canonical.href) },
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** What a service page is selling, tied back to the provider. */
export function serviceNode(
  canonical: URL,
  {
    name,
    description,
    serviceType,
  }: { name: string; description: string; serviceType?: string },
) {
  return {
    '@type': 'Service',
    '@id': `${canonical.href}#service`,
    name,
    description,
    ...(serviceType ? { serviceType } : {}),
    url: canonical.href,
    provider: { '@id': idFor.organization(canonical.origin) },
    /** Both offices serve clients worldwide; the pages make no local claim. */
    areaServed: 'Worldwide',
    mainEntityOfPage: { '@id': idFor.webpage(canonical.href) },
  };
}
