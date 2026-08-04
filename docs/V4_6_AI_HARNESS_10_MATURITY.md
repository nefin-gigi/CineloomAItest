# CineLoom v4.6 — AI Harness Maturity 10/10

CineLoom v4.6 upgrades the AI harness layer from endpoint-compatible to quality-governed, auditable, and production-reviewable.

## What v4.6 adds

- Prompt and model version registry
- Golden film test suite
- Automated film-quality eval rubrics
- Human director feedback scorecards
- Provider benchmarking and model routing governance
- AI regression launch gates
- Red-team and safety suite
- Prompt-injection defense model for uploaded scripts
- Asset provenance and rights ledger
- Quality gates for storyboard, animatic, export, and safety readiness

## New routes

- `/studio/ai-harness`
- `/studio/super-admin/ai-harness`
- `/api/ai-harness/readiness`
- `/api/ai-harness/evaluate`
- `/api/ai-harness/golden-tests`
- `/api/ai-harness/provider-benchmark`
- `/api/ai-harness/provenance`
- `/api/super-admin/ai-harness`

## New migration

- `database/013_ai_harness_10_maturity.sql`

## New validation command

```bash
npm run ai-harness-check
```

## Live production endpoints

The AI harness architecture is 10/10 inside the package. For live production execution, configure these endpoint variables in Vercel:

```env
AI_EVAL_ENDPOINT_URL=
AI_EVAL_ENDPOINT_SECRET=
AI_PROVIDER_BENCHMARK_ENDPOINT_URL=
AI_PROVIDER_BENCHMARK_ENDPOINT_SECRET=
AI_PROVENANCE_ENDPOINT_URL=
AI_PROVENANCE_ENDPOINT_SECRET=
AI_SAFETY_MODERATION_ENDPOINT_URL=
AI_SAFETY_MODERATION_ENDPOINT_SECRET=
```

## Production acceptance criteria

A live release should not pass if:

- Golden tests fall below threshold.
- Prompt/model changes reduce score beyond allowed regression delta.
- Provenance is missing for generated assets.
- Safety or rights checks fail.
- Provider benchmark route selects a disabled or circuit-broken provider.
- Human director feedback marks flagship output as not production-reviewable.
