# CineLoom v8.1 — Standardized Site Footer

This release adds a single reusable footer template for CineLoom.ai so public, marketing, legal, support, pricing, examples, and studio-entry pages present a consistent SaaS footer.

## Goals

- One footer component across the site.
- Consistent navigation groups: Product, Studio, Trust, Legal.
- Clear trust markers without fake customer claims.
- Responsive behavior for desktop, tablet, and mobile.
- CTA footer area that encourages storyboard creation and AI Harness discovery.
- Preserve existing endpoint-aware tracking and plug-and-play routing.

## Files Added

- `components/StandardSiteFooter.tsx`
- `app/v81-standard-footer.css`
- `database/028_standardized_site_footer.sql`
- `scripts/standard-footer-check.mjs`

## Components Updated

- `components/BillionFooter.tsx`
- `components/SimpleFooter.tsx`
- `components/BillionHomeExperience.tsx`
- `app/layout.tsx`

## Footer Sections

- Product: How it works, Examples, Pricing, Create storyboard
- Studio: My Studio, AI Harness, Exports, Status
- Trust: Security, Commercial use, Support, Enterprise
- Legal: Privacy, Terms, Refund policy, Contact

## Validation

Run:

```bash
npm run standard-footer-check
```

Then run regular validation:

```bash
npm run cinematic-hero-check
npm run responsive-layout-lock-check
npm run sitewide-alignment-check
npm run smoke
```
