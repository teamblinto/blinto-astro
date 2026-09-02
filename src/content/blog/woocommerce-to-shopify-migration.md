---
title: 'Migrating a WooCommerce Store to Shopify Without Losing Rankings — Blinto'
description: 'The redirect map is the whole job. How we plan and verify a WooCommerce to Shopify migration without losing search traffic.'
headline: 'Migrating a WooCommerce Store Without Losing Rankings'
excerpt: 'The redirect map is the whole job. Here is the spreadsheet we build first, and the checks we run for a month afterwards.'
category: 'WordPress'
author: 'Rakibul Islam'
publishDate: 2026-07-16
---

## The redirect map comes first

Before a theme, before the data, before anyone opens Shopify. Export every URL the current store has ever ranked for, and decide where each one goes.

That export comes from three places, and you need all three: the sitemap for what exists, Search Console for what earns impressions, and the server logs or analytics for what still gets traffic from old links. A URL that is not in the sitemap but is still taking traffic is exactly the one that will be missed.

## What the spreadsheet has in it

- The old URL, verbatim, with its trailing slash as served.
- The new URL, or a deliberate decision that there is not one.
- Why, in a few words — so the reviewer can see the reasoning rather than re-derive it.
- Its current monthly clicks, so the highest-value rows get checked first.

Product and collection URLs map mechanically. The rows that need judgement are the ones WooCommerce created and Shopify has no equivalent for: tag archives, paginated category pages, attribute filters. Most should resolve to the nearest collection rather than the homepage. A blanket redirect to `/` tells Google the old page is gone and takes the ranking with it.

<div class="callout">
<p class="callout__label">Worth knowing</p>
<p>A 301 to an irrelevant page is treated as a soft 404. Redirecting everything to the homepage is functionally the same as deleting it.</p>
</div>

## Launch day

Put the redirects in place before DNS moves, not after. Then walk the spreadsheet's top fifty rows by hand — actually request them, follow the chain, confirm one hop and a 200 at the end. Chains of two and three redirects are the most common defect, and they are invisible unless you look.

## The month afterwards

- Submit the new sitemap and watch Search Console's coverage report daily for the first week.
- Watch the 404 report, not the ranking report. New 404s are the leading indicator; rankings lag by weeks.
- Keep the old store readable somewhere. You will need to check what a page used to say.
- Expect a dip. Two to four weeks of softness is normal even on a clean migration; six weeks is a problem worth investigating.

## What actually loses rankings

In our experience it is rarely the platform move. It is thin new templates that dropped the old page's copy, product pages that lost their descriptions in the export, and redirect rows that nobody checked because they were below the fold of the spreadsheet.
