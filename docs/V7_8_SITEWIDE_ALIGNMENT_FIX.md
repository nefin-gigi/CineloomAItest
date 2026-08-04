# CineLoom v7.8 — Sitewide Alignment and Public Page Visual QA Fix

This release fixes the staging issues where feature-card headings, example page titles, and public page text alignment were inheriting older global `h1/h2` rules from earlier prototype styles.

## Fixes

- Adds `app/v78-sitewide-alignment.css` as the final CSS layer.
- Forces safe typography for `.v77-page`, `.bd-page`, `.sl-page`, and `.scc-page`.
- Fixes oversized feature card titles under `#features`.
- Centers public page hero titles and subtitles.
- Standardizes public grids for examples, pricing, security, support, and how-it-works.
- Adds responsive layout safeguards for tablet/mobile.
- Preserves AI Harness, low-token workflow, Super Admin endpoint router, input validation, security hardening, and existing APIs.

## Visual rule

All public pages must follow:

```text
Centered nav
→ centered page title/subtitle
→ constrained grid/cards
→ readable card headings
→ no text overlap
→ no horizontal overflow
```

## Validation

Run:

```bash
npm run sitewide-alignment-check
npm run smoke
npm run typecheck
npm run build
```
