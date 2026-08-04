# Load Test and SLO Plan

## Required Pre-Launch Test

Run a 2000 concurrent user load test against the Vercel preview and production domain before public launch.

## Scenarios

| Scenario | Users | Goal |
|---|---:|---|
| Public funnel | 900 | Homepage, pricing, free storyboard page |
| Studio workflow API | 750 | Free storyboard and storyboard correction APIs |
| Export flow | 250 | Export package and signed download APIs |
| Health / admin checks | 100 | Readiness and deep health endpoints |

## Pass Criteria

- HTTP error rate below 0.5%
- P95 public page latency below 1800 ms
- P95 lightweight API latency below 900 ms
- 429 responses allowed only when rate-limit rules intentionally protect the system
- No duplicate token commits
- No public access to private exports
- Queue start delay below 30 seconds for standard jobs under target load

## Generate k6 Script

```bash
npm run load-test-plan
```

The script is written to:

```text
load-tests/cineloom-2000-users.k6.js
```

## Super Admin API

```text
GET /api/super-admin/load-test-plan
GET /api/super-admin/scale-readiness
GET /api/health/live
GET /api/health/ready
GET /api/health/deep
```
