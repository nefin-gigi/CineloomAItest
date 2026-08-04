# CineLoom.ai v7.2 — Salient/Catalyst Clean Production UI

A deployable Next.js package for CineLoom.ai with a clean SaaS marketing site, Catalyst/shadcn-style product dashboard, and a custom CineLoom storyboard hero visual.

## What this version is optimized for

- A simple, spacious homepage that does not look crowded
- Clear SaaS navigation and conversion path
- Script-to-storyboard product proof above the fold
- Non-technical creator usability
- Product dashboard structure for logged-in users
- Staging deployment on Vercel

## Design system

- Inspired by Tailwind UI Salient for marketing structure
- Inspired by Catalyst/shadcn app patterns for the studio dashboard
- Original React/CSS implementation; no paid template code is copied
- Blue primary action with red/green/blue product accents

## Quick start

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Staging environment variables

```env
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

## Validation

```bash
npm run salient-catalyst-clean-check
npm run saas-template-check
npm run clean-production-ui-check
npm run smoke
npm run production-check
```

`production-check` will warn until real live services are configured. That is expected for staging.

## Main URLs to test

- `/`
- `/examples`
- `/pricing`
- `/how-it-works`
- `/security`
- `/support`
- `/create-free-storyboard`
- `/studio`


## v7.3 Plug-and-Play Frontend Endpoint Router

This package includes a Super Admin integration page at `/studio/super-admin/frontend-integrations`. It maps public navigation, create-storyboard CTAs, pricing checkout buttons, Studio project actions, correction actions, exports, billing, and support to backend endpoint chains.

Recommended staging settings:

```env
PUBLIC_FRONTEND_ENDPOINT_ROUTER_ENABLED=false
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

Use dry-run tests first. Only enable live endpoint routing after auth, rate limits, token ledger, observability, WAF/bot protection, and provider secrets are configured.


## v7.4 Top Security Upgrade

This package adds route-specific API input validation, request-surface hardening, source-level penetration-test harnesses, and a GitHub security pipeline with optional OWASP ZAP baseline scanning for staging.

Security commands:

```bash
npm run validate-input-coverage
npm run penetration-test
npm run top-security-check
```

Super Admin security console:

```text
/studio/super-admin/security/top-architecture
```

Readiness APIs:

```text
/api/security/input-validation-readiness
/api/security/top-architecture
/api/security/penetration-test
```

Live DAST/pentest evidence still requires deploying to staging and running the GitHub security workflow against `https://stg.cineloom.ai`.


## v7.6 Low-Token Agent Workflow

The Director AI Harness now supports a lowest-token workflow for correcting one storyboard board out of a large board set. The UI sends only the target board, short neighbor summaries, continuity locks, and the director note to the agent. It blocks full-storyboard context by default for large storyboards and keeps dynamic stitching blocked until director approval.

New route: `/studio/agent-harness`
New API: `POST /api/agent-harness/token-plan`
New API: `POST /api/agent-harness/change-board` with `scope` and `tokenMode`.

Run: `npm run low-token-agent-flow-check`
