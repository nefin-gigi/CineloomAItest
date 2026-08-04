# CineLoom v3.1 Endpoint Execution Layer

Version 3.1 adds the missing execution-behind-the-UI layer. The customer-facing CineLoom workflow can stay stable while each backend capability is plugged in through a secure endpoint contract from Super Admin.

## What changed

- Added `ExecutionEndpointConsole` inside `/studio/super-admin`.
- Added endpoint catalog for every major production action.
- Added dry-run, configured, and live execution modes.
- Added generic execution API routes.
- Added execution endpoint database migration and Prisma models.
- Added token-safe execution policies: estimate, reserve, commit, refund.
- Added endpoint workflow maps for customer journeys.

## Core idea

Every CineLoom stage now maps to an endpoint:

```text
Customer UI action
→ Super Admin endpoint contract
→ token reserve if needed
→ external endpoint / provider / worker
→ private storage
→ token commit or refund
→ customer result
```

## Execution modes

| Mode | Behavior |
|---|---|
| demo | Endpoint env vars are missing; CineLoom uses fallback/demo response. |
| configured | Endpoint URL and secret are set; Super Admin validates readiness but does not call live provider. |
| live | `EXECUTION_ENDPOINT_TEST_MODE=live`; CineLoom POSTs to the configured endpoint. |

Do not enable live mode until endpoint auth, rate limiting, logging, token policy, and provider failure handling are ready.

## New API routes

```text
GET  /api/super-admin/execution-endpoints
GET  /api/super-admin/execution-endpoints/health
GET  /api/super-admin/execution-endpoints/test?stage=storyboard_generate
POST /api/super-admin/execution-endpoints/test
POST /api/super-admin/execution-endpoints/save
POST /api/super-admin/execution-endpoints/run
```

## Production endpoint requirements

Each endpoint should return the required response keys listed in Super Admin. CineLoom validates response shape and reports missing keys.

Example storyboard generation response:

```json
{
  "panels": [
    { "panelId": "panel_001", "assetId": "asset_panel_001", "status": "generated" }
  ],
  "providerRequestId": "img_req_001",
  "tokenUsage": 50
}
```

## 10/10 customer-readiness strategy

The UI is no longer the limiting factor. The highest ranking depends on endpoint quality:

- Real script parser for screenwriters.
- Real storyboard generator for enthusiasts and filmmakers.
- Prompt correction with locks for directors.
- Secure exports for producers.
- Token reserve/commit/refund for revenue operations.
- Private storage and audit logs for studios.

