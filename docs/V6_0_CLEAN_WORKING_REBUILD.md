# CineLoom v6.0 Clean Working Rebuild

This version rebuilds the public UI after the staging release showed poor layout and broken navigation.

## What was fixed

- Removed the oversized cinematic hero layout.
- Replaced the homepage with a simple SaaS-style product flow.
- Disabled launch gate by default so public pages such as `/examples` and `/pricing` do not redirect to `/?next=...`.
- Updated middleware so public marketing pages stay public even when a launch gate is enabled.
- Removed protected mobile dock links from public navigation.
- Added a local working storyboard preview for staging, so users can click Create and see a result without live AI services.
- Added a clean responsive CSS system loaded last to override old visual clutter.
- Simplified examples, pricing, how-it-works, security, support, login, signup, and studio shell.

## Required Vercel staging env

Set these for staging while testing public pages:

```env
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
```

## Validation

Run:

```bash
npm run clean-production-ui-check
npm run smoke
npm run production-check
```

Then, once dependencies are installed:

```bash
npm install
npm run typecheck
npm run build
```

## Manual staging QA

Open these URLs directly:

- `/`
- `/examples`
- `/pricing`
- `/how-it-works`
- `/security`
- `/support`
- `/create-free-storyboard`

No page should redirect to `/?next=...`.
