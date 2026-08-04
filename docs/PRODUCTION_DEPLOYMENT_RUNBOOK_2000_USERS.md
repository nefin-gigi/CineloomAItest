# Production Deployment Runbook for 2000 Concurrent Users

## 1. Configure Infrastructure

- Vercel Pro or Enterprise project
- Postgres/Supabase/Neon database
- Redis or equivalent distributed rate limiting store
- Queue provider: Trigger.dev, Inngest, BullMQ/Redis, or custom workers
- Private object storage: Cloudflare R2, AWS S3, or Supabase Storage
- Stripe live products and webhook secret
- AI execution endpoints for storyboard, correction, animatic, export, voice, music, and QA
- Observability endpoint for logs, metrics, and alerts

## 2. Configure Super Admin

Open:

```text
/studio/super-admin
/studio/super-admin/scale-readiness
```

Validate:

- Connector health
- Execution endpoint health
- Scale readiness
- Missing environment variables
- Critical stage coverage

## 3. Deploy Settings

Use this public/private mode for launch:

```env
LAUNCH_GATE_ENABLED=false
REQUIRE_AUTH_FOR_STUDIO=true
EXECUTION_ENDPOINT_TEST_MODE=live
ALLOW_DEMO_READY_HEALTH=false
```

## 4. Test Before Launch

```bash
npm run smoke
npm run super-admin-check
npm run scale-check
npm run load-test-plan
npm run production-check
```

Then run k6 or your chosen load test service.

## 5. Incident Controls

If providers fail:

- Open provider circuit breaker in Super Admin
- Route traffic to backup endpoint
- Pause high-cost generation for free users
- Keep marketing pages and existing exports available
- Refund reserved tokens for failed jobs
