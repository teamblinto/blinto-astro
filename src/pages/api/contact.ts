import type { APIRoute } from 'astro';
import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  RESEND_API_KEY,
  TURNSTILE_SECRET_KEY,
} from 'astro:env/server';
import {
  handleContactSubmission,
  type RateLimiter,
  type SubmissionOutcome,
} from '~/lib/contact-submission';

/**
 * The contact form's endpoint. The only on-demand route on the site — every
 * page around it is still prerendered.
 *
 * It answers two callers with the same logic. The inline script on the contact
 * page sends `Accept: application/json` and gets a JSON body it can render in
 * place; a browser with no JavaScript posts the form natively and gets a 303 to
 * a thank-you page, or back to the form with a reason in the query string.
 *
 * All of the work happens in `~/lib/contact-submission`, which takes its
 * dependencies as arguments and is unit tested. This file only reads the
 * environment and turns an outcome into a response.
 */
export const prerender = false;

/** The page the form lives on, for the no-JavaScript error round trip. */
const FORM_PAGE = '/contact-us/';
const THANK_YOU_PAGE = '/thank-you/';

interface OutcomeResponse {
  httpStatus: number;
  ok: boolean;
  /** Shown to the visitor. Never contains internal detail. */
  message: string;
  /** Distinguishes cases in the query string on the no-JavaScript path. */
  reason: string;
}

const RESPONSES: Record<SubmissionOutcome['status'], OutcomeResponse> = {
  sent: {
    httpStatus: 200,
    ok: true,
    message: 'Thanks — your message is on its way. We usually reply within one working day.',
    reason: 'sent',
  },
  // A bot that filled the honeypot is told exactly what a person is told, so it
  // cannot learn which submissions were dropped.
  ignored: {
    httpStatus: 200,
    ok: true,
    message: 'Thanks — your message is on its way. We usually reply within one working day.',
    reason: 'sent',
  },
  invalid: {
    httpStatus: 422,
    ok: false,
    message: 'Please check the highlighted fields and try again.',
    reason: 'invalid',
  },
  'challenge-failed': {
    httpStatus: 403,
    ok: false,
    message: 'We could not verify that you are human. Please reload the page and try again.',
    reason: 'challenge',
  },
  'rate-limited': {
    httpStatus: 429,
    ok: false,
    message: 'That is a lot of messages in a short time. Please wait a minute and try again.',
    reason: 'rate-limited',
  },
  'send-failed': {
    httpStatus: 502,
    ok: false,
    message:
      'Something went wrong sending your message. Please try again, or email us directly at hello@blinto.co.',
    reason: 'send-failed',
  },
  misconfigured: {
    httpStatus: 503,
    ok: false,
    message:
      'The contact form is temporarily unavailable. Please email us directly at hello@blinto.co.',
    reason: 'unavailable',
  },
};

/** True when the caller is the page's own script rather than a form navigation. */
const wantsJson = (request: Request) =>
  (request.headers.get('accept') ?? '').includes('application/json');

/**
 * Cloudflare's Rate Limiting binding, if the account and environment provide
 * one. It is absent under `astro dev` without local bindings, and the pipeline
 * treats that as "no limit configured" rather than failing — Turnstile is the
 * primary control, this is depth behind it.
 */
async function getRateLimiter(): Promise<RateLimiter | undefined> {
  try {
    const { env } = await import('cloudflare:workers');
    const binding: RateLimit | undefined = env.CONTACT_RATE_LIMITER;
    if (typeof binding?.limit === 'function') return binding;
  } catch {
    // Not running on workerd.
  }
  return undefined;
}

export const POST: APIRoute = async ({ request }) => {
  let fields: FormData;
  try {
    fields = await request.formData();
  } catch {
    return respond(request, RESPONSES.invalid, {
      message: 'We could not read that submission. Please try again.',
    });
  }

  const outcome = await handleContactSubmission({
    fields,
    // Set by Cloudflare on every inbound request and not forgeable by the
    // client, unlike `x-forwarded-for`.
    clientIp: request.headers.get('cf-connecting-ip'),
    config: {
      resendApiKey: RESEND_API_KEY ?? '',
      turnstileSecretKey: TURNSTILE_SECRET_KEY ?? '',
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
    },
    fetch,
    rateLimiter: await getRateLimiter(),
  });

  const response = RESPONSES[outcome.status];
  return respond(
    request,
    response,
    outcome.status === 'invalid' ? { errors: outcome.errors } : {},
  );
};

function respond(
  request: Request,
  outcome: OutcomeResponse,
  extra: { errors?: Record<string, string>; message?: string },
): Response {
  const message = extra.message ?? outcome.message;

  if (wantsJson(request)) {
    return new Response(
      JSON.stringify({ ok: outcome.ok, message, errors: extra.errors ?? {} }),
      {
        status: outcome.httpStatus,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        },
      },
    );
  }

  // No-JavaScript path: 303 so the browser follows with GET and a reload cannot
  // resubmit the form.
  const location = outcome.ok
    ? THANK_YOU_PAGE
    : `${FORM_PAGE}?status=error&reason=${encodeURIComponent(outcome.reason)}#contact-form`;

  return new Response(null, {
    status: 303,
    headers: { location, 'cache-control': 'no-store' },
  });
}

/** Anything but POST is a mistake worth naming rather than a 404. */
export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, message: 'This endpoint accepts POST only.' }), {
    status: 405,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      allow: 'POST',
      'cache-control': 'no-store',
    },
  });
