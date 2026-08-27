import type { ContactSubmission } from './contact-form';

/**
 * Renders a validated submission into the payload Resend expects.
 *
 * Every visitor-supplied value reaches the HTML body through `escapeHtml`, and
 * the plain-text body is sent alongside it so the mail is readable in clients
 * that refuse HTML. The subject and Reply-To carry visitor input too, which is
 * why `contact-form.ts` guarantees those fields hold no line breaks.
 */

export interface EmailAddresses {
  /** The verified sender on the Resend domain, e.g. `Blinto <noreply@blinto.co>`. */
  from: string;
  /** Where enquiries land. */
  to: string;
}

export interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Optional fields are omitted rather than rendered as an empty row. */
const rows = (submission: ContactSubmission): [string, string][] => {
  const entries: [string, string][] = [
    ['Name', submission.name],
    ['Email', submission.email],
  ];
  if (submission.phone) entries.push(['Phone', submission.phone]);
  if (submission.company) entries.push(['Company', submission.company]);
  if (submission.website) entries.push(['Website', submission.website]);
  return entries;
};

export function renderContactEmail(
  submission: ContactSubmission,
  addresses: EmailAddresses,
): ResendPayload {
  const detail = rows(submission);

  const text = [
    ...detail.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    submission.message,
    '',
    '--',
    'Sent from the contact form at https://blinto.co/contact-us/',
  ].join('\n');

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#16181d;">
    <table role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;">
      <tr>
        <td>
          <h1 style="margin:0 0 16px;font-size:18px;">New enquiry from the website</h1>
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
            ${detail
              .map(
                ([label, value]) => `<tr>
              <td style="padding:6px 12px 6px 0;color:#5b6070;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:6px 0;vertical-align:top;">${escapeHtml(value)}</td>
            </tr>`,
              )
              .join('\n            ')}
          </table>
          <h2 style="margin:24px 0 8px;font-size:14px;color:#5b6070;">Message</h2>
          <div style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(submission.message)}</div>
          <p style="margin:24px 0 0;font-size:12px;color:#8a8f9e;">
            Sent from the contact form at blinto.co/contact-us/. Reply directly to reach ${escapeHtml(submission.name)}.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    from: addresses.from,
    to: [addresses.to],
    subject: `New enquiry from ${submission.name}`,
    text,
    html,
    // Replying in the inbox reaches the visitor rather than the noreply sender.
    reply_to: submission.email,
  };
}
