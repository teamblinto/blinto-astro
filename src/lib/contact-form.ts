/**
 * Validation for the contact form, kept free of Astro and Cloudflare imports so
 * it can be unit tested and reused by both the fetch and no-JavaScript paths of
 * the endpoint.
 *
 * The rules are deliberately strict about length and shape but forgiving about
 * formatting: input is trimmed, and a bare domain in the website field is
 * upgraded to https rather than rejected. Nobody should lose an enquiry to a
 * missing scheme.
 */

/**
 * A field no person can see or tab into, so anything in it came from a bot that
 * filled the form blindly. Named to look worth filling; deliberately not
 * something a password manager or browser autofill will touch.
 */
export const HONEYPOT_FIELD = 'fax';

/**
 * Anything that reads like a parsed form body. Deliberately `unknown` rather
 * than `string`, because `FormData.get()` can return a `File`; every reader
 * below narrows with a `typeof` check, so a file upload is simply ignored.
 */
export interface FormLike {
  get(key: string): unknown;
}

/** Every field the form posts, in the order it renders. */
export const FIELD_NAMES = ['name', 'email', 'phone', 'company', 'website', 'message'] as const;

export type FieldName = (typeof FIELD_NAMES)[number];

export type ContactSubmission = Record<FieldName, string>;

export type ValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: Partial<Record<FieldName, string>> };

export const NAME_MAX = 100;
/** The RFC 5321 ceiling on a full address. */
export const EMAIL_MAX = 254;
export const PHONE_MAX = 40;
export const COMPANY_MAX = 100;
export const WEBSITE_MAX = 200;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;

/**
 * Deliberately not an attempt at RFC 5322. That grammar accepts addresses no
 * mail provider will route, and the cost of a false reject on a contact form is
 * a lost lead. This checks the shape people actually type: one @, no spaces, a
 * dotted domain.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

const LINE_FEED = 10;

/**
 * The C0 range, DEL, and the C1 range. Tested by code point rather than written
 * as a regex class so the source file carries no control characters of its own.
 */
const isControlCharacter = (code: number) => code < 32 || (code >= 127 && code <= 159);

/**
 * Replaces control characters with a space. Anything interpolated into a mail
 * header — the subject, the Reply-To — must not carry a line break, or it could
 * append headers of its own; dropping the rest of the range keeps NUL and
 * friends out of the JSON we hand to Resend.
 *
 * `keepNewline` is set only for the message, whose paragraph breaks are
 * meaningful and which is placed in the body, never a header.
 */
const replaceControlCharacters = (value: string, keepNewline: boolean) =>
  Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    if (!isControlCharacter(code)) return character;
    if (keepNewline && code === LINE_FEED) return character;
    return ' ';
  }).join('');

/** Collapses the runs of whitespace that replacing control characters leaves. */
const tidy = (value: string) =>
  replaceControlCharacters(value, false).replace(/\s+/g, ' ').trim();

const tidyMessage = (value: string) =>
  replaceControlCharacters(value.replace(/\r\n?/g, '\n'), true).trim();

/**
 * Accepts what a person types into a website field. A bare `example.com` gets
 * https; anything that is not http(s) once parsed is rejected, which is what
 * keeps `javascript:` and `data:` out of the mail we render.
 */
const normaliseWebsite = (value: string): string | null => {
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  // `new URL('https://not a url')` throws, but `https://nourl` does not — a
  // hostname with no dot is a typo far more often than an intranet host.
  if (!url.hostname.includes('.')) return null;

  return url.href.replace(/\/$/, '');
};

/**
 * Reads the posted fields and returns either the cleaned submission or a map of
 * per-field messages. Every field is checked, so the form can show all its
 * errors at once rather than one reload at a time.
 *
 * Takes a `Map`-like rather than `FormData` so the caller controls how the body
 * was parsed, and so the tests need no DOM.
 */
export function validateContactForm(fields: FormLike): ValidationResult {
  const read = (key: FieldName) => {
    const value = fields.get(key);
    return typeof value === 'string' ? value : '';
  };

  const errors: Partial<Record<FieldName, string>> = {};

  const name = tidy(read('name'));
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length > NAME_MAX) errors.name = `Please keep your name under ${NAME_MAX} characters.`;

  const email = tidy(read('email'));
  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > EMAIL_MAX) errors.email = 'That email address is too long.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';

  const phone = tidy(read('phone'));
  if (phone.length > PHONE_MAX)
    errors.phone = `Please keep your phone number under ${PHONE_MAX} characters.`;

  const company = tidy(read('company'));
  if (company.length > COMPANY_MAX)
    errors.company = `Please keep your company name under ${COMPANY_MAX} characters.`;

  const rawWebsite = tidy(read('website'));
  let website = '';
  if (rawWebsite) {
    if (rawWebsite.length > WEBSITE_MAX) {
      errors.website = 'That website address is too long.';
    } else {
      const normalised = normaliseWebsite(rawWebsite);
      if (!normalised) errors.website = 'Please enter a valid website address.';
      else website = normalised;
    }
  }

  const message = tidyMessage(read('message'));
  if (!message) errors.message = 'Please tell us how we can help.';
  else if (message.length < MESSAGE_MIN)
    errors.message = `Please write at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX)
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { name, email, phone, company, website, message } };
}
