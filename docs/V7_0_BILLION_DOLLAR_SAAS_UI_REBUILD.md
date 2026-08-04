# CineLoom v7.0 — Billion-Dollar SaaS UI Rebuild

This release rebuilds the public site around a professional, aligned, revenue-focused SaaS landing experience.

## What changed

- Rebuilt homepage hero with bounded max-width alignment.
- Added professional script-to-storyboard product mockup.
- Added real storyboard thumbnail assets.
- Rebuilt public navigation and mobile menu.
- Rebuilt core public pages: Home, How it works, Examples, Pricing, Security, Support, Create Free Storyboard.
- Added working staging-safe storyboard preview without requiring live AI endpoints.
- Added unique `bd-*` design system CSS imported last to override earlier visual clutter.
- Added `npm run billion-ui-check` validation.

## Deployment variables for staging

```env
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

## Required test URLs

- `/`
- `/examples`
- `/pricing`
- `/how-it-works`
- `/security`
- `/support`
- `/create-free-storyboard`

None of the public marketing pages should redirect to `/?next=...`.
