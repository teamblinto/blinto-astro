---
title: 'The Unglamorous Work That Keeps a Store Online — Blinto'
description: 'Backups nobody restores, plugins nobody updates, certificates nobody renews. What a maintenance retainer actually does week to week.'
headline: 'The Unglamorous Work That Keeps a Store Online'
excerpt: 'Backups nobody restores, plugins nobody updates, certificates nobody renews. A maintenance retainer is mostly a calendar.'
category: 'Maintenance'
author: 'Rakibul Islam'
publishDate: 2026-07-02
---

## Nothing here is interesting

That is the point. Every incident we have been called into after the fact was preventable by something boring that nobody owned: an expired certificate, a plugin two major versions behind, a backup job that had been failing silently since March.

Maintenance is not a skill problem. It is an ownership problem. The work is easy and nobody's job.

## The weekly pass

- Updates applied on staging, smoke-tested, then promoted. Never straight to production, however minor the version bump.
- Error log read, not just collected. A log nobody reads is a disk cost.
- Uptime and checkout tested by an actual request, not by a green dashboard.
- Backup **restored** into a scratch environment. A backup you have never restored is a hypothesis.

## The monthly pass

- Certificate and domain expiry dates checked against the calendar.
- Dependency audit: what is unmaintained, what has a known advisory, what can be removed entirely.
- Core Web Vitals from field data rather than a lab run, because a lab run on a fast laptop is not what the customer has.
- One thing deleted. An unused plugin, a dead redirect, a script from a campaign that ended last year.

<div class="callout">
<p class="callout__label">Worth knowing</p>
<p>The most valuable line in a maintenance report is the list of things removed. Sites do not get slow by one big mistake; they get slow by accumulation.</p>
</div>

## What a retainer is really buying

Somebody whose name is on the calendar entry. The technical work in a month of maintenance is a handful of hours. What the retainer buys is that those hours happen in a month when nothing is on fire, which is the only month in which they are cheap.

> Every emergency we have been called into was a calendar entry somebody skipped.
