import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * The suite covers `src/lib/` only: the contact form's validation, email
 * rendering and submission pipeline are written as plain modules with their
 * dependencies passed in, so they run under Node without Astro or `workerd`.
 * The Astro route itself is a thin adapter over them and is exercised in the
 * browser against `astro dev`.
 */
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
