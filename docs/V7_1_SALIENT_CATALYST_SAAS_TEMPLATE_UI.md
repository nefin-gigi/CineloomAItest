# CineLoom v7.1 — Premium SaaS Template UI

This release applies an original, license-safe SaaS interface inspired by the structure of modern Tailwind UI Salient/Catalyst and shadcn-style application design patterns.

## Goals

- Fix homepage alignment and oversized hero issues.
- Replace prototype-like layout with a clean SaaS conversion page.
- Keep the public experience simple for non-technical users.
- Preserve CineLoom's cinema/storyboard identity through product mockups and storyboard frames.
- Keep public pages open for staging with launch gates disabled.

## Key changes

- New stylesheet: `app/v71-saas-template.css`, loaded last to override legacy styling.
- Updated homepage: `app/page.tsx`.
- Updated navigation: `components/PublicNav.tsx`.
- Updated product preview: `components/BillionHeroVisual.tsx`.
- Added validation: `npm run saas-template-check`.

## Design system

- Blue primary CTA: `#2563eb`.
- Red/green/blue accents for storyboard stages and product rhythm.
- Maximum content width: `1180px`.
- Clean rounded cards, subtle shadows, simple typography, and mobile-first responsiveness.

## Deployment notes

For staging:

```env
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

Before deploy:

```bash
npm install
npm run typecheck
npm run build
```
