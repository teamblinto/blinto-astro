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

/** Every page that must exist as prerendered HTML after a build. */
const EXPECTED_PAGE_COUNT = 20;

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

// 4. No secret reached anything the browser downloads. The Resend key and the
//    Turnstile secret are read through `astro:env/server` with access 'secret',
//    which Astro enforces at build time; this is the belt to that braces, and
//    catches a value hardcoded or moved to a public variable by mistake.
const SECRET_PATTERNS = [
  [/\bre_[A-Za-z0-9_-]{16,}/, 'a Resend API key (re_…)'],
  [/RESEND_API_KEY\s*[:=]\s*["'][^"']+["']/, 'an inlined RESEND_API_KEY value'],
  [/TURNSTILE_SECRET_KEY\s*[:=]\s*["'][^"']+["']/, 'an inlined TURNSTILE_SECRET_KEY value'],
  // Turnstile secrets begin 0x…; the public site key does not.
  [/\b0x[A-Za-z0-9]{30,}/, 'a Turnstile secret key (0x…)'],
];
for (const file of clientAssets) {
  const content = await readFile(file, 'utf8');
  for (const [pattern, what] of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      fail(`${path.relative(CLIENT, file)} appears to contain ${what}.`);
    }
  }
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
