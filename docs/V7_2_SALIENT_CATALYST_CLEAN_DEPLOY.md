# CineLoom v7.2 — Salient/Catalyst Clean Deploy UI

This release rebuilds the public marketing experience and studio entry point around a calm, spacious SaaS layout.

## Design direction

- Marketing: original implementation inspired by Tailwind UI Salient patterns.
- Product dashboard: original implementation inspired by Catalyst/shadcn app patterns.
- Hero: custom CineLoom storyboard visual with a simple Script Input → Storyboard Output layout.
- Density: intentionally reduced. No comparison tables, no crowded dashboards, no investor-pitch clutter in the homepage hero.

## Primary homepage structure

1. Clean sticky SaaS navigation
2. One headline
3. One clear product promise
4. Two CTAs
5. Three trust points
6. One custom storyboard hero visual
7. One workflow section
8. One product dashboard preview
9. One audience section
10. Final CTA

## Deployment variables for staging

```env
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

## Pre-deploy commands

```bash
npm install
npm run typecheck
npm run build
npm run salient-catalyst-clean-check
```

## Important note

This package does not copy paid Tailwind UI template code. It uses original React/CSS that follows the same clean SaaS design principles.
