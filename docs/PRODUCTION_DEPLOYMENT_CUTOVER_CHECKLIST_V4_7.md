# Production Deployment Cutover Checklist v4.7

## Before public launch

- Run `npm install`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Run `npm run final-production-10-check`.
- Run `npm run production-check:strict` with production environment variables.
- Deploy Vercel preview.
- Configure live environment variables.
- Test `/api/production/launch-gate`.
- Run Stripe checkout and webhook reconciliation tests.
- Run token ledger reserve/commit/refund tests.
- Run private storage upload/signed download tests.
- Run live storyboard and export endpoint tests.
- Run AI harness golden/eval/safety/provenance tests.
- Run Redis rate-limit and WAF/bot protection tests.
- Run backup/restore drill.
- Run 2,000-user load test.
- Run penetration test.
- Complete legal/security approval.
- Only then enable public paid launch flags.

## Required launch flags

```env
PUBLIC_LAUNCH_ENABLED=true
PUBLIC_PAID_CHECKOUT_ENABLED=true
PAID_LAUNCH_ENABLED=true
LEGAL_REVIEW_APPROVED=true
SECURITY_REVIEW_APPROVED=true
PENETRATION_TEST_APPROVED=true
LOAD_TEST_2000_USERS_APPROVED=true
PAYMENT_RECONCILIATION_TEST_APPROVED=true
PRIVATE_STORAGE_TEST_APPROVED=true
AI_ENDPOINTS_TEST_APPROVED=true
UNIT_ECONOMICS_APPROVED=true
```
