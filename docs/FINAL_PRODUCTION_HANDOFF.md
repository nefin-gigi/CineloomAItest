# Final Production Handoff

## Live service checklist

1. Configure real authentication.
2. Run database migrations 001 through 007.
3. Configure Stripe products, prices, checkout, portal and webhooks.
4. Connect private storage and signed downloads.
5. Connect queue workers and endpoint execution providers.
6. Connect storyboard, animatic, voice, music, export and QA providers.
7. Enable analytics events and A/B tests.
8. Review terms, privacy, commercial use, refunds, copyright and training opt-out policies.
9. Run production readiness, scale readiness and final 10 checks.
10. Deploy public revenue mode with LAUNCH_GATE_ENABLED=false.

## Suggested Vercel mode

```env
LAUNCH_GATE_ENABLED=false
REQUIRE_AUTH_FOR_STUDIO=true
EXECUTION_ENDPOINT_TEST_MODE=live
```
