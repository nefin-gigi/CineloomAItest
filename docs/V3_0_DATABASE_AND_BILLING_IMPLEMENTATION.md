# CineLoom.ai v3.0 Database and Billing Implementation Guide

## Database

Use `/database/001_production_schema.sql` as the source migration for Supabase/Postgres. The schema supports workspaces, roles, tokens, projects, scripts, beats, scenes, shots, panels, assets, generation jobs, exports, and audit logs.

## Billing

Use Stripe Checkout for subscriptions and token packs. The frontend should never activate a plan by itself. The Stripe webhook must:

1. Verify webhook signature.
2. Find or create the user/workspace by Stripe customer ID.
3. Update subscription status and plan.
4. Credit monthly tokens or token packs.
5. Record an audit log entry.

## Token model

Every generation endpoint should follow this pattern:

1. Estimate tokens.
2. Check plan and action permission.
3. Reserve tokens in `token_ledger`.
4. Create `generation_jobs` record.
5. Call provider/queue.
6. Mark job complete and attach asset.
7. Refund only if job fails before usable output.

## Storage

Do not store private user scripts, storyboards, videos, or exports in `/public`. Use private storage and signed URLs through `/api/export/secure-download`.
