/**
 * Markdown build plugins.
 *
 * The blog is the only Markdown on this site, and so the only place where
 * markup arrives from a file rather than from a component. Anything the
 * compiler emits that the design system has no component for is fixed up
 * here, once, rather than worked around in every post.
 *
 * These are Sätteri hast plugins — Astro 7's own Markdown pipeline — rather
 * than rehype ones, which would pull the whole unified processor back in as a
 * second Markdown implementation just to move one element.
 */

/** `class` values that mark a table already wrapped, so a re-run cannot nest. */
const WRAPPER_CLASS = 'table-scroll';

/**
 * Wraps every table in a horizontally scrollable, focusable region.
 *
 * A pricing table is wider than the 780px prose column allows on a phone, and
 * the usual CSS-only fix — `table { display: block; overflow: auto }` — trades
 * the table's semantics away: changing a table's `display` drops its implicit
 * table role in several browser and screen-reader pairings, so the rows and
 * column headers stop being announced as a table at all.
 *
 * Wrapping instead keeps `<table>` a table and puts the overflow on a `<div>`.
 * `tabindex="0"` is what makes that scroll region reachable without a mouse —
 * Chrome and Firefox focus scrollable containers on their own, Safari does not
 * — and `role="region"` with a name is what keeps the new tab stop from
 * landing somewhere unannounced. The name is the table's caption where it has
 * one, since that is the sentence describing the thing being scrolled.
 */
export const tableScroll = {
  name: 'blinto:table-scroll',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      const parent = ctx.parent(node);
      if (parent && hasClass(parent, WRAPPER_CLASS)) return;

      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [WRAPPER_CLASS],
          role: 'region',
          tabindex: '0',
          'aria-label': captionOf(node, ctx) ?? 'Table',
        },
        children: [],
      });
    },
  },
};

function hasClass(node, name) {
  const value = node.properties?.className;
  if (Array.isArray(value)) return value.includes(name);
  return typeof value === 'string' && value.split(/\s+/).includes(name);
}

/** The table's caption as plain text, if it has one. */
function captionOf(table, ctx) {
  const caption = table.children?.find(
    (child) => child.type === 'element' && child.tagName === 'caption',
  );
  if (!caption) return undefined;

  const text = ctx.textContent(caption).trim();
  return text.length > 0 ? text : undefined;
}
