/**
 * Post-build assertions on `dist/`.
 *
 * Adding the Cloudflare adapter for the contact endpoint reopened the exact
 * risk that commit 5e8642d closed: the adapter's default image service defers
 * transformation to runtime, `<Image>` starts emitting `/_image?href=…`, and on
 * a deploy without an image binding every image 404s. `astro.config.mjs` pins
 * `imageService: 'compile'` to prevent that, and this script fails the build if
 * the pin ever stops working.
 *
 * It also checks that the pages really are prerendered and that no secret has
 * been bundled into anything the browser downloads.
 *
 * Run by `npm run build`, so a regression stops the deploy rather than reaching
 * the site.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

/**
 * Adding the adapter split the output: prerendered pages and static files go
 * to `dist/client/`, the Worker bundle to `dist/server/`.
 */
const CLIENT = path.join('dist', 'client');
const SERVER = path.join('dist', 'server');

/**
 * Every page that must exist as prerendered HTML after a build: the
 * twenty-two standing routes plus the blog — its index, one page per post and
 * one per topic.
 */
const EXPECTED_PAGE_COUNT = 36;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

const failures = [];
const fail = (message) => failures.push(message);

const files = await walk(CLIENT);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const clientAssets = files.filter((f) => /\.(js|css|html)$/.test(f));

// 1. Images were transformed at build time, not deferred to a runtime binding.
const withRuntimeImages = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (html.includes('/_image?')) withRuntimeImages.push(path.relative(CLIENT, file));
}
if (withRuntimeImages.length > 0) {
  fail(
    `${withRuntimeImages.length} page(s) reference the runtime image endpoint /_image?href=… ` +
      `which nothing serves on this deploy. Check imageService: 'compile' in astro.config.mjs.\n` +
      withRuntimeImages.map((f) => `      - ${f}`).join('\n'),
  );
}

// 2. The optimised images are actually on disk.
const astroAssets = files.filter((f) => f.includes(`${path.sep}_astro${path.sep}`));
const optimisedImages = astroAssets.filter((f) => /\.(webp|avif|jpe?g|png)$/i.test(f));
if (optimisedImages.length === 0) {
  fail('dist/_astro/ contains no optimised images, so build-time image processing did not run.');
}

// 3. The pages are still static.
if (htmlFiles.length < EXPECTED_PAGE_COUNT) {
  fail(
    `only ${htmlFiles.length} prerendered page(s) in dist/, expected at least ` +
      `${EXPECTED_PAGE_COUNT}. Did a route lose its prerendering?`,
  );
}

// 4. No secret reached anything the browser downloads.
//
//    `astro:env` already enforces this: both secrets are declared with
//    access 'secret', so importing either from `astro:env/client` fails the
//    build outright. What follows is the belt to that braces, catching a value
//    hardcoded into a component or moved to a public variable by mistake.
//
//    The Turnstile checks are by *value*, not by shape. A Turnstile site key
//    and its secret look alike — both begin `0x` — so no pattern can tell them
//    apart, and a shape rule would either miss real secrets or fail on the
//    public site key that is supposed to be in the markup. Comparing against
//    the configured values avoids both failure modes. When the secrets are not
//    present at build time, as on Cloudflare where they are Worker secrets
//    rather than build variables, there is simply nothing to compare and the
//    `astro:env` guarantee stands on its own.
const SECRET_NAMES = ['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY'];

/** Parses the `KEY="value"` lines of a `.dev.vars` file, if there is one. */
async function readDevVars() {
  try {
    const raw = await readFile('.dev.vars', 'utf8');
    return Object.fromEntries(
      raw
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/))
        .filter(Boolean)
        .map((m) => [m[1], m[2]]),
    );
  } catch {
    return {};
  }
}

const devVars = await readDevVars();
const configuredSecrets = SECRET_NAMES.map((name) => ({
  name,
  value: process.env[name] ?? devVars[name] ?? '',
}))
  // A short or placeholder value would match half the bundle by accident.
  .filter(({ value }) => value.length >= 12);

/** Prefix-unambiguous, so worth catching even when the value is unknown. */
const SECRET_PATTERNS = [
  [/\bre_[A-Za-z0-9_-]{16,}/, 'a Resend API key (re_…)'],
  [/RESEND_API_KEY\s*[:=]\s*["'][^"']+["']/, 'an inlined RESEND_API_KEY value'],
  [/TURNSTILE_SECRET_KEY\s*[:=]\s*["'][^"']+["']/, 'an inlined TURNSTILE_SECRET_KEY value'],
];

for (const file of clientAssets) {
  const content = await readFile(file, 'utf8');
  for (const [pattern, what] of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      fail(`${path.relative(CLIENT, file)} appears to contain ${what}.`);
    }
  }
  for (const { name, value } of configuredSecrets) {
    if (content.includes(value)) {
      fail(`${path.relative(CLIENT, file)} contains the configured ${name}.`);
    }
  }
}

// 4b. The public site key, by contrast, must be present: without it the
//     Turnstile widget renders nothing, no token is minted, and every
//     submission is refused as a failed challenge.
const contactPage = path.join(CLIENT, 'contact-us', 'index.html');
try {
  const html = await readFile(contactPage, 'utf8');
  const widget = html.match(/class="cf-turnstile"[^>]*data-sitekey="([^"]+)"/);
  if (!widget) {
    fail('the contact page has no Turnstile widget with a data-sitekey.');
    // Cloudflare test keys begin 1x (always passes) or 2x (always blocks).
    // Deploying one would disable the challenge, so it fails the build. A
    // local build against the test pair is legitimate, and says so explicitly
    // rather than being waved through by a heuristic.
  } else if (
    (widget[1].startsWith('1x') || widget[1].startsWith('2x')) &&
    !process.env.ALLOW_TURNSTILE_TEST_KEY
  ) {
    fail(
      `the contact page ships the Turnstile *test* site key ${widget[1]}. ` +
        `Set PUBLIC_TURNSTILE_SITE_KEY to the real widget before deploying, ` +
        `or ALLOW_TURNSTILE_TEST_KEY=1 for a deliberate local build.`,
    );
  }
} catch {
  fail(`${contactPage} is missing, so the contact form did not build.`);
}

// 5. The Worker that serves /api/contact/ was emitted.
try {
  await readFile(path.join(SERVER, 'entry.mjs'), 'utf8');
} catch {
  fail(`${SERVER}/entry.mjs is missing, so the contact endpoint would 404 in production.`);
}

if (failures.length > 0) {
  console.error('\nBuild output check failed:\n');
  for (const message of failures) console.error(`  ✗ ${message}`);
  console.error('');
  process.exit(1);
}

console.log(
  `build output ok: ${htmlFiles.length} prerendered pages, ` +
    `${optimisedImages.length} build-time images, no secrets in client assets`,
);
