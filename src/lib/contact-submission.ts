import { renderContactEmail } from './contact-email';
import {
  HONEYPOT_FIELD,
  validateContactForm,
  type FieldName,
  type FormLike,
} from './contact-form';

/**
 * The contact form's server-side pipeline: rate limit, honeypot, Turnstile,
 * validate, send.
 *
 * Every dependency — `fetch`, the secrets, the rate limiter binding — is passed
 * in rather than imported, so the whole flow runs under plain Node in the test
 * suite and the Astro route stays a thin adapter that reads the environment.
 */

export { HONEYPOT_FIELD };

const TURNSTILE_FIELD = 'cf-turnstile-response';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

/** Neither upstream is allowed to hold a request open indefinitely. */
const UPSTREAM_TIMEOUT_MS = 10_000;

export interface ContactConfig {
  resendApiKey: string;
  turnstileSecretKey: string;
  /** The verified sender, e.g. `Blinto <noreply@blinto.co>`. */
  from: string;
  /** Where enquiries land. */
  to: string;
}

/** The shape of Cloudflare's Rate Limiting binding, narrowed to what we call. */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface SubmissionRequest {
  fields: FormLike;
  /** From `cf-connecting-ip`. Null when it cannot be determined. */
  clientIp: string | null;
  config: ContactConfig;
  fetch: typeof fetch;
  rateLimiter?: RateLimiter | undefined;
}

export type SubmissionOutcome =
  | { status: 'sent' }
  /** Honeypot tripped. Reported to the caller as success. */
  | { status: 'ignored' }
  | { status: 'invalid'; errors: Partial<Record<FieldName, string>> }
  | { status: 'challenge-failed' }
  | { status: 'rate-limited' }
  | { status: 'send-failed' }
  /** A secret is unset, so the endpoint refuses rather than dropping mail. */
  | { status: 'misconfigured' };

const read = (fields: FormLike, key: string): string => {
  const value = fields.get(key);
  return typeof value === 'string' ? value : '';
};

/**
 * Verifies the Turnstile token with Cloudflare. Any failure — a bad token, a
 * timeout, a malformed response — is treated as a failed challenge, so the
 * endpoint fails closed if the challenge service is unreachable.
 */
async function verifyTurnstile(
  token: string,
  secret: string,
  clientIp: string | null,
  fetchImpl: typeof fetch,
): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (clientIp) body.set('remoteip', clientIp);

  try {
    const response = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export async function handleContactSubmission(
  request: SubmissionRequest,
): Promise<SubmissionOutcome> {
  const { fields, clientIp, config, fetch: fetchImpl, rateLimiter } = request;

  // A missing secret is an operator error. Refusing loudly beats accepting a
  // submission the visitor believes was sent and then dropping it.
  if (!config.resendApiKey || !config.turnstileSecretKey) {
    console.error('[contact] refused: RESEND_API_KEY or TURNSTILE_SECRET_KEY is unset');
    return { status: 'misconfigured' };
  }

  // Cheapest checks first: neither costs an upstream call.
  if (rateLimiter && clientIp) {
    const { success } = await rateLimiter.limit({ key: clientIp });
    if (!success) return { status: 'rate-limited' };
  }

  if (read(fields, HONEYPOT_FIELD).trim()) return { status: 'ignored' };

  const token = read(fields, TURNSTILE_FIELD).trim();
  if (!token) return { status: 'challenge-failed' };

  if (!(await verifyTurnstile(token, config.turnstileSecretKey, clientIp, fetchImpl))) {
    return { status: 'challenge-failed' };
  }

  const validation = validateContactForm(fields);
  if (!validation.ok) return { status: 'invalid', errors: validation.errors };

  const payload = renderContactEmail(validation.data, { from: config.from, to: config.to });

  try {
    const response = await fetchImpl(RESEND_URL, {
      method: 'POST',
      headers: {
        // The key travels in the header and never in the body, so it cannot be
        // echoed back by an error response that quotes the request.
        authorization: `Bearer ${config.resendApiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      // Resend's error bodies describe the request, not the credential, but the
      // status alone is enough to diagnose from the tail without risking it.
      console.error(`[contact] Resend rejected the send with status ${response.status}`);
      return { status: 'send-failed' };
    }

    return { status: 'sent' };
  } catch (error) {
    console.error(
      `[contact] Resend request failed: ${error instanceof Error ? error.name : 'unknown error'}`,
    );
    return { status: 'send-failed' };
  }
}
