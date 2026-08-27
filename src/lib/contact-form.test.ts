import { describe, expect, it } from 'vitest';
import { validateContactForm, MESSAGE_MAX, MESSAGE_MIN } from './contact-form';

/** A submission that should always pass, so each test can vary one field. */
const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '+1 555 0100',
  company: 'Analytical Engines',
  website: 'https://example.com',
  message: 'We would like to talk about a Shopify app build.',
};

const fieldsOf = (input: Record<string, string>) => new Map(Object.entries(input));

describe('validateContactForm', () => {
  it('accepts a complete, well-formed submission', () => {
    const result = validateContactForm(fieldsOf(valid));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.name).toBe('Ada Lovelace');
    expect(result.data.email).toBe('ada@example.com');
    expect(result.data.website).toBe('https://example.com');
  });

  it('accepts a submission with every optional field omitted', () => {
    const result = validateContactForm(
      fieldsOf({ name: valid.name, email: valid.email, message: valid.message }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.phone).toBe('');
    expect(result.data.company).toBe('');
    expect(result.data.website).toBe('');
  });

  it('trims surrounding whitespace rather than rejecting it', () => {
    const result = validateContactForm(fieldsOf({ ...valid, name: '   Ada Lovelace \t ' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.name).toBe('Ada Lovelace');
  });

  it('treats a whitespace-only required field as missing', () => {
    const result = validateContactForm(fieldsOf({ ...valid, name: '     ' }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.name).toBeDefined();
  });

  it('reports every invalid field at once, not just the first', () => {
    const result = validateContactForm(fieldsOf({ name: '', email: 'nope', message: '' }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(['email', 'message', 'name']);
  });

  it.each([
    'plainaddress',
    'no-at-sign.example.com',
    'two@@example.com',
    'trailing@dot.',
    'spaced address@example.com',
    '@example.com',
    'ada@',
  ])('rejects the malformed address %j', (email) => {
    expect(validateContactForm(fieldsOf({ ...valid, email })).ok).toBe(false);
  });

  it.each([
    'ada@example.com',
    'ada.lovelace+shopify@sub.example.co.uk',
    "o'hara@example.com",
  ])('accepts the well-formed address %j', (email) => {
    expect(validateContactForm(fieldsOf({ ...valid, email })).ok).toBe(true);
  });

  it('rejects an email longer than the 254-character limit', () => {
    const email = `${'a'.repeat(250)}@example.com`;
    expect(validateContactForm(fieldsOf({ ...valid, email })).ok).toBe(false);
  });

  it('rejects a message shorter than the minimum', () => {
    const result = validateContactForm(fieldsOf({ ...valid, message: 'a'.repeat(MESSAGE_MIN - 1) }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.message).toBeDefined();
  });

  it('rejects a message longer than the maximum', () => {
    const result = validateContactForm(fieldsOf({ ...valid, message: 'a'.repeat(MESSAGE_MAX + 1) }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.message).toBeDefined();
  });

  it('keeps newlines inside the message body', () => {
    const message = 'First paragraph.\n\nSecond paragraph, which is long enough.';
    const result = validateContactForm(fieldsOf({ ...valid, message }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.message).toContain('\n\n');
  });

  it.each(['name', 'email', 'phone', 'company'] as const)(
    'strips CR and LF from %s so it cannot inject an email header',
    (field) => {
      const injected =
        field === 'email'
          ? 'ada@example.com\r\nBcc: victim@example.com'
          : 'Ada\r\nBcc: victim@example.com';
      const result = validateContactForm(fieldsOf({ ...valid, [field]: injected }));
      if (!result.ok) {
        // Rejecting outright is also a correct defence, and is what happens to
        // the email field: the injected value stops looking like an address.
        expect(result.errors[field]).toBeDefined();
        return;
      }
      // The line break is the whole attack. Without one, `Bcc:` is inert text
      // inside a header value, so the assertion is about breaks, not wording.
      expect(result.data[field]).not.toMatch(/[\r\n]/);
      expect(result.data[field].split(/\r\n|\r|\n/)).toHaveLength(1);
    },
  );

  it.each(['javascript:alert(1)', 'ftp://example.com', 'data:text/html,hi', 'not a url'])(
    'rejects the non-http(s) website %j',
    (website) => {
      const result = validateContactForm(fieldsOf({ ...valid, website }));
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.errors.website).toBeDefined();
    },
  );

  it('accepts a bare domain in the website field by assuming https', () => {
    const result = validateContactForm(fieldsOf({ ...valid, website: 'example.com' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.website).toBe('https://example.com');
  });

  it('rejects an over-long name, phone or company', () => {
    expect(validateContactForm(fieldsOf({ ...valid, name: 'a'.repeat(101) })).ok).toBe(false);
    expect(validateContactForm(fieldsOf({ ...valid, phone: '1'.repeat(41) })).ok).toBe(false);
    expect(validateContactForm(fieldsOf({ ...valid, company: 'a'.repeat(101) })).ok).toBe(false);
  });

  it('treats a missing key the same as an empty one', () => {
    const result = validateContactForm(new Map());
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(['email', 'message', 'name']);
  });
});
