# CineLoom v7.3 — Frontend Endpoint Router

This release adds a Super Admin page that lets CineLoom keep the visible product simple while every important link, button, form, and Studio action can be connected to backend endpoints.

## New Super Admin page

`/studio/super-admin/frontend-integrations`

Use this page to review and test:

- public navigation links
- free storyboard CTA
- create scene submission
- pricing checkout buttons
- Studio project pages
- storyboard review
- prompt corrections
- export package
- billing portal
- Super Admin frontend router itself

## Design principle

The user should only see this simple workflow:

`Paste script → Generate storyboard → Review/fix panels → Export package`

The backend can still be complex, but it is hidden behind endpoint contracts.

## New frontend capability

`components/EndpointAwareLink.tsx` wraps public links and CTAs with an action key.

Each action key maps to:

- frontend URL
- API route
- backend endpoint chain
- required Vercel environment variables
- sample payload
- fallback behavior
- success result

## New APIs

- `GET /api/super-admin/frontend-endpoints`
- `POST /api/super-admin/frontend-endpoints/test`
- `POST /api/super-admin/frontend-endpoints/save`
- `GET /api/super-admin/frontend-endpoints/env-template`
- `POST /api/frontend-action`

## Safety

The public `/api/frontend-action` route is safe by default. It records/documents frontend actions without invoking costly providers unless `PUBLIC_FRONTEND_ENDPOINT_ROUTER_ENABLED=true`.

## Vercel env additions

Add endpoint URLs and secrets based on the Super Admin env template. Required examples:

```env
EXEC_STORYBOARD_GENERATE_URL=
EXEC_STORYBOARD_GENERATE_SECRET=
EXEC_STORYBOARD_CORRECT_URL=
EXEC_STORYBOARD_CORRECT_SECRET=
EXEC_EXPORT_PACKAGE_URL=
EXEC_EXPORT_PACKAGE_SECRET=
EXEC_ANALYTICS_EVENT_URL=
EXEC_ANALYTICS_SECRET=
TOKEN_LEDGER_ENDPOINT_URL=
TOKEN_LEDGER_SECRET=
PUBLIC_FRONTEND_ENDPOINT_ROUTER_ENABLED=false
```

Keep `PUBLIC_FRONTEND_ENDPOINT_ROUTER_ENABLED=false` in staging until all endpoints are secure, authenticated, rate-limited, and monitored.

## Validation

Run:

```bash
npm run frontend-router-check
npm run smoke
npm run production-check
```
