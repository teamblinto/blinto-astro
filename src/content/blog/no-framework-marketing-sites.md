---
title: 'Why We Stopped Reaching for a Framework on Marketing Sites — Blinto'
description: 'A marketing site that ships a kilobyte of JavaScript is not a compromise. How we build static sites that stay fast without a framework runtime.'
headline: 'Why We Stopped Reaching for a Framework on Marketing Sites'
excerpt: 'A marketing site that ships one kilobyte of JavaScript is not a compromise. It is what the brief asked for all along.'
category: 'Engineering'
author: 'Rakibul Islam'
publishDate: 2026-07-30
---

## The default that stopped making sense

For years the reflex on any new marketing site was to reach for a component framework, ship a client runtime, and hydrate the whole page. It made sense when the alternative was hand-writing HTML in a template language nobody liked.

It stopped making sense once static site generators started giving us components without the runtime. A marketing page has no client state. There is a navigation drawer, maybe an accordion, and everything else is text and images. Shipping a framework to render text is paying for a capability the page never uses.

## What replaced it

Components at build time, plain HTML and CSS at runtime. Concretely, on a recent site:

- One inline script, about a kilobyte, for the mobile navigation drawer.
- No external scripts, no hydration, no client router.
- Accordions as `<details>` and `<summary>`, which work with JavaScript disabled.
- Dropdowns that open on hover and focus in CSS, so they work on a keyboard without a single event listener.

## The parts that need care

Going runtime-free is not free. Three things need deliberate work:

**Images.** Without a framework's image component you need the generator's own, and you need to stop it from upscaling. We cap density per image against the source's real dimensions, so a 900px export is never requested at 2x.

**Focus management.** The one interactive component — the drawer — has to trap focus, lock scroll and mark the rest of the page inert. That is real work, and it is the reason the script is a kilobyte rather than nothing.

**Discipline about scope.** The moment a page genuinely needs client state, this approach fights you. That is a signal to reach for an island on that one page, not to reconsider the other twenty.

> Being unable to add a framework casually turns out to be the feature. Every interaction has to justify its bytes.

## Was it worth it

The pages are fast on a bad connection without a performance budget meeting, they degrade to readable HTML when anything fails, and nothing about them will need a migration when the current framework generation ages out.

For a site whose job is to load quickly and say what a company does, that is the entire brief.
