# Production Connectivity Acceptance Tests

Before claiming production 10/10, run these tests in staging and production.

## Auth
- Signup, email verification, login, logout, forgot password.
- Team invite and role permission checks.

## Billing
- Checkout for each plan.
- Webhook entitlement update.
- Token pack purchase.
- Failed payment and billing portal.

## Tokens
- Reserve before job.
- Commit after success.
- Refund after failure.
- Idempotency prevents duplicate charge.

## Generation
- Paste script and produce beat/scene/shot/storyboard output.
- Prompt correction regenerates one frame while respecting locks.
- 10-second sample completes under target latency.

## Exports
- PDF/CSV/JSON/MP4/ZIP generated from user project.
- Signed URL expires and checks workspace authorization.

## Scale
- 2,000 concurrent users load test.
- P95 latency and job throughput meet SLO.
- Rate limit behavior is clear and friendly.

## Security
- Private assets are not public.
- Audit logs record admin and export actions.
- Model-training opt-out enforced.
