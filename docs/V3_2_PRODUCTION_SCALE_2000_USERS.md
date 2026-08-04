# CineLoom v3.2 Production Scale Package — 2000 Concurrent Users

This package upgrades CineLoom from a plug-and-play endpoint demo into a production-scale SaaS architecture for film-industry workloads.

## Target

- 2000 concurrent users at launch
- P95 public page latency under 1800 ms
- P95 API latency under 900 ms for lightweight endpoints
- Heavy AI and export jobs offloaded to workers
- Provider endpoint latency target under 4500 ms for immediate API responses
- Error rate below 0.5%
- Availability target: 99.9%

## What Changed

1. Plan-aware rate limits by subscription tier.
2. Queue-first job submission for expensive generation.
3. Token reserve / commit / refund transaction pattern.
4. Idempotency contract for duplicate click and retry safety.
5. Provider circuit breaker and failover model.
6. Private storage and signed download enforcement pattern.
7. Health checks: live, ready, and deep.
8. Super Admin scale readiness console.
9. Load-test plan API and k6 script generator.
10. Production scale database migration.

## Important Reality Check

The source code is now production-structured. It can support a 2000-concurrent-user launch when the configured services are real and sized appropriately:

- Postgres/Supabase/Neon database
- Redis or edge rate limiting
- Stripe live products and webhooks
- Private S3/R2/Supabase storage
- Queue provider and workers
- AI generation endpoints
- Observability and alerting

Without those live services, the package remains a production-grade scaffold and demo.
