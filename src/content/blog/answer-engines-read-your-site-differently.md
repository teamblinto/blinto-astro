---
title: 'Answer Engines Read Your Site Differently — Blinto'
description: 'Structured data, a clean llms.txt and headings that answer a question outright. What we changed once ChatGPT started sending traffic.'
headline: 'Answer Engines Read Your Site Differently'
excerpt: 'Structured data, a clean llms.txt and headings that answer a question outright. What we changed once ChatGPT started sending traffic.'
category: 'SEO'
author: 'Rakibul Islam'
publishDate: 2026-06-18
---

## The traffic that does not come from search

Somewhere in the last two years a second kind of referral started appearing: visitors who arrived having already been told what we do. They did not browse. They landed on one page, read one section, and either got in touch or left.

They came from an answer engine, and the page they landed on was chosen by a model reading our markup rather than by a ranking algorithm. That reads a site differently enough to be worth designing for.

## What a retriever wants

A crawler ranks pages. A retriever extracts passages. The unit of value stops being the page and becomes the self-contained answer, which changes what good markup looks like:

- **A heading that states the answer**, not the topic. "How long does a Shopify app build take" beats "Timeline".
- **The answer immediately under it**, in a paragraph that makes sense quoted on its own with no surrounding context.
- **Facts as facts.** Prices, timelines and locations written plainly in prose, not implied by a graphic or hidden in a tab nobody expands.
- **One structured-data graph per page**, with stable identifiers, so the model does not have to guess how the entities relate.

## What we actually changed

We consolidated every page onto a single `@graph` where the organisation, the page and whatever the page is about all reference each other by identifier. Question-and-answer bands became real `FAQPage` markup, because a question with an answer attached is the shape a model can quote directly.

Then we added an `llms.txt`: a plain index of the site with each page's own title and description, generated from the built HTML so it cannot drift from what actually shipped.

<div class="callout">
<p class="callout__label">Worth knowing</p>
<p>Generate machine-readable files from the built output, not from your source. Anything hand-maintained alongside the site will eventually describe a version of it that no longer exists.</p>
</div>

## What we did not do

We did not write a separate set of pages for machines. A page written to be quotable by a model turns out to be a page that is clearer for a person: a specific heading, a direct answer, the facts stated rather than implied.

If the two ever pull in different directions, the person wins. But so far they have not.
