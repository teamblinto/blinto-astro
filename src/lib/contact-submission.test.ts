import { describe, expect, it, vi } from 'vitest';
import { HONEYPOT_FIELD, handleContactSubmission } from './contact-submission';

const config = {
  resendApiKey: 're_test_key',
  turnstileSecretKey: 'ts_secret',
  from: 'Blinto <noreply@blinto.co>',
  to: 'hello@blinto.co',
};

const validFields = () =>
  new Map<string, string>([
    ['name', 'Ada Lovelace'],
    ['email', 'ada@example.com'],
    ['message', 'We would like to talk about a Shopify app build.'],
    ['cf-turnstile-response', 'token-abc'],
  ]);

/** Stubs the two upstreams the pipeline talks to, in call order. */
const stubFetch = (responses: Array<{ url: RegExp; body: unknown; status?: number }>) => {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init: init ?? {} });
    const match = responses.find((r) => r.url.test(url));
    if (!match) throw new Error(`unexpected fetch to ${url}`);
    return new Response(JSON.stringify(match.body), {
      status: match.status ?? 200,
      headers: { 'content-type': 'application/json' },
    });
  });
  return { fetchImpl, calls };
};

const happyPath = () =>
  stubFetch([
    { url: /siteverify/, body: { success: true } },
    { url: /api\.resend\.com/, body: { id: 'email-123' } },
  ]);

describe('handleContactSubmission', () => {
  it('sends the email and reports success', async () => {
    const { fetchImpl, calls } = happyPath();

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('sent');
    const resendCall = calls.find((c) => c.url.includes('api.resend.com'));
    expect(resendCall).toBeDefined();
    const body = JSON.parse(String(resendCall!.init.body));
    expect(body.to).toEqual(['hello@blinto.co']);
    expect(body.from).toBe('Blinto <noreply@blinto.co>');
    expect(body.reply_to).toBe('ada@example.com');
    expect(body.subject).toContain('Ada Lovelace');
  });

  it('authenticates to Resend with a bearer token and never puts the key in the body', async () => {
    const { fetchImpl, calls } = happyPath();

    await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    const resendCall = calls.find((c) => c.url.includes('api.resend.com'))!;
    const headers = new Headers(resendCall.init.headers);
    expect(headers.get('authorization')).toBe('Bearer re_test_key');
    expect(String(resendCall.init.body)).not.toContain('re_test_key');
  });

  it('verifies the Turnstile token before sending anything', async () => {
    const { fetchImpl, calls } = happyPath();

    await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(calls[0]!.url).toContain('siteverify');
    expect(calls[1]!.url).toContain('api.resend.com');
  });

  it('passes the visitor IP to Turnstile so the token cannot be replayed elsewhere', async () => {
    const { fetchImpl, calls } = happyPath();

    await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    const verify = calls[0]!;
    const sent = new URLSearchParams(String(verify.init.body));
    expect(sent.get('secret')).toBe('ts_secret');
    expect(sent.get('response')).toBe('token-abc');
    expect(sent.get('remoteip')).toBe('203.0.113.5');
  });

  it('rejects a failed Turnstile check without calling Resend', async () => {
    const { fetchImpl, calls } = stubFetch([
      { url: /siteverify/, body: { success: false, 'error-codes': ['invalid-input-response'] } },
    ]);

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('challenge-failed');
    expect(calls.some((c) => c.url.includes('resend'))).toBe(false);
  });

  it('rejects a missing Turnstile token without calling out at all', async () => {
    const { fetchImpl, calls } = happyPath();
    const fields = validFields();
    fields.delete('cf-turnstile-response');

    const result = await handleContactSubmission({
      fields,
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('challenge-failed');
    expect(calls).toHaveLength(0);
  });

  it('silently drops a submission that filled the honeypot, reporting success', async () => {
    const { fetchImpl, calls } = happyPath();
    const fields = validFields();
    fields.set(HONEYPOT_FIELD, 'http://spam.example');

    const result = await handleContactSubmission({
      fields,
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    // The bot is told the same thing a person is told, so it learns nothing.
    expect(result.status).toBe('ignored');
    expect(calls).toHaveLength(0);
  });

  it('returns field errors for an invalid submission without calling Resend', async () => {
    const { fetchImpl, calls } = happyPath();
    const fields = validFields();
    fields.set('email', 'not-an-email');

    const result = await handleContactSubmission({
      fields,
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('invalid');
    if (result.status !== 'invalid') return;
    expect(result.errors.email).toBeDefined();
    expect(calls.some((c) => c.url.includes('resend'))).toBe(false);
  });

  it('reports a send failure when Resend rejects the request', async () => {
    const { fetchImpl } = stubFetch([
      { url: /siteverify/, body: { success: true } },
      { url: /api\.resend\.com/, body: { message: 'domain not verified' }, status: 403 },
    ]);

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('send-failed');
  });

  it('reports a send failure when the network throws', async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      if (String(input).includes('siteverify')) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      throw new Error('connection reset');
    });

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('send-failed');
  });

  it('stops a rate-limited visitor before the challenge or the send', async () => {
    const { fetchImpl, calls } = happyPath();

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
      rateLimiter: { limit: async () => ({ success: false }) },
    });

    expect(result.status).toBe('rate-limited');
    expect(calls).toHaveLength(0);
  });

  it('keys the rate limiter on the visitor IP', async () => {
    const { fetchImpl } = happyPath();
    const seen: string[] = [];

    await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
      rateLimiter: {
        limit: async ({ key }) => {
          seen.push(key);
          return { success: true };
        },
      },
    });

    expect(seen).toEqual(['203.0.113.5']);
  });

  it('proceeds when no rate limiter binding is configured', async () => {
    const { fetchImpl } = happyPath();

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: '203.0.113.5',
      config,
      fetch: fetchImpl as unknown as typeof fetch,
      rateLimiter: undefined,
    });

    expect(result.status).toBe('sent');
  });

  it('fails closed when the Resend key is missing rather than sending nothing silently', async () => {
    const { fetchImpl } = happyPath();

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config: { ...config, resendApiKey: '' },
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('misconfigured');
  });

  it('fails closed when the Turnstile secret is missing', async () => {
    const { fetchImpl } = happyPath();

    const result = await handleContactSubmission({
      fields: validFields(),
      clientIp: null,
      config: { ...config, turnstileSecretKey: '' },
      fetch: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe('misconfigured');
  });
});
