# CineLoom v4.5 — Live Storyboard, Live Export, and Redis Rate Limits

This version implements the remaining public paid-launch blockers requested as items 7, 8, and 9:

1. **Live storyboard generation endpoint**
   - `POST /api/storyboard/free-sample`
   - `POST /api/storyboard/generate-live`
   - Uses `EXEC_STORYBOARD_GENERATE_URL` or `EXEC_STORYBOARD_CORRECT_URL` through the production-controlled execution runtime.
   - Supports watermarked previews, paid generation, prompt correction mode, continuity locks, idempotency keys, token estimates, and async `jobId` responses.

2. **Live export generation endpoint**
   - `GET /api/export/package`
   - `POST /api/export/generate-live`
   - Uses `EXEC_EXPORT_PACKAGE_URL` through production controls.
   - Supports storyboard PDF, shot list CSV, prompt JSON, QA PDF, animatic MP4, ZIP, and director packages.
   - Output contract expects private files or signed URLs, not public customer assets.

3. **Redis-backed distributed rate limiting**
   - Production execution now calls `checkDistributedRateLimit()`.
   - Supports `RATE_LIMIT_PROVIDER=upstash` with `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
   - Supports `RATE_LIMIT_PROVIDER=external` with `RATE_LIMIT_ENDPOINT_URL` and `RATE_LIMIT_ENDPOINT_SECRET`.
   - `RATE_LIMIT_FAIL_CLOSED=true` blocks generation if the distributed limiter is unavailable.

## New Super Admin page

`/studio/super-admin/execution-launch`

This page shows readiness for:

- Live storyboard generation endpoint
- Live export generation endpoint
- Redis/external distributed rate limiting

## Acceptance test

Run:

```bash
npm run execution-launch-check
npm run live-paid-saas-check
npm run military-security-check
npm run final-launch-check
npm run smoke
```

## Required production configuration

```env
EXEC_STORYBOARD_GENERATE_URL=
EXEC_STORYBOARD_GENERATE_SECRET=
EXEC_STORYBOARD_CORRECT_URL=
EXEC_STORYBOARD_CORRECT_SECRET=
EXEC_EXPORT_PACKAGE_URL=
EXEC_EXPORT_PACKAGE_SECRET=
RATE_LIMIT_PROVIDER=upstash
RATE_LIMIT_FAIL_CLOSED=true
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

For an external limiter instead of Upstash:

```env
RATE_LIMIT_PROVIDER=external
RATE_LIMIT_ENDPOINT_URL=
RATE_LIMIT_ENDPOINT_SECRET=
```

## Provider response contracts

Storyboard provider can return a synchronous result:

```json
{
  "status": "completed",
  "panels": [{ "panelId": "panel_001", "assetId": "asset_001", "signedUrl": "https://..." }],
  "assets": [],
  "tokenUsage": { "reserved": 120, "committed": 118 }
}
```

or async job:

```json
{
  "status": "queued",
  "jobId": "job_storyboard_123"
}
```

Export provider can return:

```json
{
  "status": "completed",
  "files": [{ "type": "storyboard_pdf", "assetId": "asset_pdf_001", "signedUrl": "https://..." }],
  "packageUrl": "https://signed-download-url",
  "expiresAt": "2026-07-30T22:00:00Z"
}
```

or async job:

```json
{
  "status": "queued",
  "jobId": "job_export_123"
}
```
