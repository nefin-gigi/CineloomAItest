# Install CineLoom v7.2 on Vercel

## 1. Upload or push the package

Unzip this package, push it to your GitHub repo, then connect that repo to your Vercel staging project.

## 2. Add staging variables in Vercel

Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_APP_URL=https://stg.cineloom.ai
LAUNCH_GATE_ENABLED=false
PUBLIC_SITE_ENABLED=true
REQUIRE_AUTH_FOR_STUDIO=false
PUBLIC_GENERATION_ENDPOINTS_ENABLED=true
```

Select Production, Preview, and Development for the staging project.

## 3. Deploy clean

Vercel → Deployments → Redeploy → Use existing build cache: No

## 4. Confirm these pages work

```text
https://stg.cineloom.ai/
https://stg.cineloom.ai/examples
https://stg.cineloom.ai/pricing
https://stg.cineloom.ai/how-it-works
https://stg.cineloom.ai/security
https://stg.cineloom.ai/support
https://stg.cineloom.ai/create-free-storyboard
https://stg.cineloom.ai/studio
```

## 5. Local build commands

```bash
npm install
npm run typecheck
npm run build
```


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


## v7.6 Low-Token Agent Workflow

The Director AI Harness now supports a lowest-token workflow for correcting one storyboard board out of a large board set. The UI sends only the target board, short neighbor summaries, continuity locks, and the director note to the agent. It blocks full-storyboard context by default for large storyboards and keeps dynamic stitching blocked until director approval.

New route: `/studio/agent-harness`
New API: `POST /api/agent-harness/token-plan`
New API: `POST /api/agent-harness/change-board` with `scope` and `tokenMode`.

Run: `npm run low-token-agent-flow-check`
