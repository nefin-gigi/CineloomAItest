# Super Admin User Guide

Open:

`/studio/super-admin`

## What Super Admin does

The console lets CineLoom operators configure production connectivity without changing the main CineLoom customer experience.

## Recommended setup order

1. **Identity** — Configure Clerk or Supabase Auth.
2. **Database** — Connect Postgres/Supabase and run migrations.
3. **Billing** — Configure Stripe products, price IDs, and webhooks.
4. **Token ledger** — Enable hard-stop token enforcement.
5. **Private storage** — Configure signed URL asset storage.
6. **Queue worker** — Connect background jobs for AI generation and exports.
7. **AI providers** — Connect LLM, image, video, voice, and music providers.
8. **Render worker** — Connect PDF/MP4/ZIP export renderer.
9. **Analytics** — Connect funnel and revenue analytics.
10. **Observability** — Connect logs, errors, uptime, and alerts.
11. **Safety/rights** — Connect moderation and rights review.

## Endpoint connectivity form

Use the form to register connector metadata:

- Connector ID
- Endpoint URL
- Auth mode
- Secret environment variable name
- Timeout

Secrets themselves must never be typed into the UI. Add them in Vercel project settings or your secret manager.

## Feature flags

Use environment variables to control launch behavior:

- `LAUNCH_GATE_ENABLED`
- `PUBLIC_SITE_ENABLED`
- `REQUIRE_AUTH_FOR_STUDIO`
- `PAYMENT_GATEWAY_MODE`
- `AI_PROVIDER_MODE`
- `TOKEN_HARD_STOP_ENABLED`
- `WATERMARK_FREE_EXPORTS`
- `SUPER_ADMIN_ENABLED`

## Production hardening

Before opening the site to paid users, protect `/studio/super-admin` and `/api/super-admin/*` with a real admin role, audit all changes, and require a second admin approval for billing/provider changes.
