# Live Paid SaaS Connectivity Runbook

## Order of operations

1. Configure production auth and RBAC.
2. Run database migrations 001 through 011.
3. Configure Stripe products, prices, portal, and webhook endpoint.
4. Connect billing reconciliation endpoint.
5. Connect transactional token ledger endpoint.
6. Connect private storage and signed URL endpoint.
7. Connect Redis, WAF, bot protection, and distributed rate limits.
8. Connect queue workers and callback secret.
9. Connect AI execution endpoints.
10. Connect export rendering worker.
11. Connect analytics, logs, metrics, alerts, status page, support, and email.
12. Complete legal/security approvals.
13. Run Vercel preview QA and k6 load test.
14. Set `PUBLIC_PAID_CHECKOUT_ENABLED=true` and `PAID_LAUNCH_ENABLED=true` only after the Super Admin launch gate passes.

## Super Admin test URLs

- Readiness: `/api/super-admin/live-paid-saas`
- Health tests: `/api/super-admin/live-paid-saas/test`
- Launch gate: `/api/super-admin/live-paid-saas/launch-gate`

All Super Admin APIs require zero-trust Super Admin credentials.

## Blocking behavior

When `REQUIRE_LIVE_READINESS_FOR_PUBLIC_PAYMENTS=true`, live paid actions are blocked until readiness is 10/10. This protects against accidental public launch with demo auth, demo billing, memory rate limits, public storage, or unverified token accounting.
