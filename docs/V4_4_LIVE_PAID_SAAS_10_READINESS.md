# CineLoom v4.4 — Live Paid SaaS 10/10 Readiness

This release adds a hard launch-gate layer for public paid SaaS readiness. It does not pretend demo mode is production. Public checkout and paid token-consuming generation stay blocked until critical live services are configured and verified.

## What changed

- Added Super Admin page: `/studio/super-admin/live-paid-saas`
- Added API: `/api/super-admin/live-paid-saas`
- Added health test API: `/api/super-admin/live-paid-saas/test`
- Added launch-gate API: `/api/super-admin/live-paid-saas/launch-gate`
- Added live paid SaaS readiness model in `lib/live-paid-saas.ts`
- Added external token ledger adapter in `lib/live-token-ledger.ts`
- Hardened Stripe checkout route with paid launch gate and idempotency key support
- Hardened Stripe webhook route with timestamp tolerance and external reconciliation endpoint
- Hardened token reserve/commit/refund routes to use an external transactional ledger when configured
- Hardened protected asset downloads to use signed-url endpoint mode for customer exports
- Added database migration `011_live_paid_saas_10_readiness.sql`
- Added package check: `npm run live-paid-saas-check`

## 10/10 launch criteria

CineLoom is live paid SaaS 10/10 only when all critical checks are green:

1. Production authentication and RBAC
2. Persistent database and migrations
3. Live Stripe checkout and webhook reconciliation
4. Transactional token ledger
5. Private asset storage and signed URLs
6. Background queue and worker orchestration
7. Production AI execution endpoints
8. Production export rendering
9. Distributed rate limiting, WAF, and bot protection
10. Legal, rights, privacy, and commercial-use approvals

## Launch switch

Keep these false until all systems are configured and tested:

```env
PUBLIC_PAID_CHECKOUT_ENABLED=false
PAID_LAUNCH_ENABLED=false
```

After live services pass health checks, set:

```env
PUBLIC_PAID_CHECKOUT_ENABLED=true
PAID_LAUNCH_ENABLED=true
LIVE_PAID_SAAS_MODE=live
```

Then run:

```bash
npm run live-paid-saas-check
npm run production-check:strict
npm run build
```

## Important note

This package provides the 10/10 readiness architecture and hard launch gates. The deployed service becomes live paid SaaS 10/10 only after your real auth, database, Stripe, private storage, queue, AI, export, analytics, support, and legal/security approvals are connected in the environment.
