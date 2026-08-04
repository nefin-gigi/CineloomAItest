# Endpoint Plug-and-Play Implementation Guide

## Step 1: Pick the stage

Open `/studio/super-admin`, scroll to **Execution Layer**, and select a stage such as:

- `script_parse`
- `storyboard_generate`
- `storyboard_correct`
- `animatic_generate`
- `export_package`
- `token_reserve`
- `storage_upload`

## Step 2: Build your external endpoint

Your endpoint should accept JSON over POST.

Required headers sent by CineLoom:

```text
content-type: application/json
x-cineloom-stage: <stage_key>
x-cineloom-idempotency-key: <key>
authorization: Bearer <secret>    # for bearer_env_secret mode
```

## Step 3: Return required keys

Super Admin lists required response keys. Do not change the frontend for provider differences. Normalize provider responses inside your endpoint.

## Step 4: Configure Vercel env vars

Example:

```env
EXEC_STORYBOARD_GENERATE_URL=https://workers.cineloom.ai/storyboard/generate
EXEC_STORYBOARD_GENERATE_SECRET=your-secret-value
EXECUTION_ENDPOINT_TEST_MODE=configured
```

Redeploy after changing environment variables.

## Step 5: Dry-run test

Use Super Admin **Dry-run test** to validate payload shape.

## Step 6: Configured/live check

Use **Configured/live check**. In configured mode, CineLoom validates that env vars exist without invoking the provider.

## Step 7: Enable live mode carefully

```env
EXECUTION_ENDPOINT_TEST_MODE=live
```

Only after:

- Endpoint authentication is tested.
- Token reserve/commit/refund is connected.
- Private storage is connected.
- Provider failure handling is tested.
- Analytics and logs are configured.

## Recommended endpoint architecture

```text
Vercel UI / API
→ Execution endpoint adapter
→ Queue worker
→ AI provider or renderer
→ Private storage
→ Token ledger commit/refund
→ Job result callback
```

