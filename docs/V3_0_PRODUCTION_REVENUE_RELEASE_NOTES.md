# CineLoom.ai v3.0 Production Revenue Release Notes

This version converts CineLoom from a private storyboard demo into a production revenue scaffold.

## Added

- Public marketing pages: pricing, examples, how it works, free storyboard funnel, login, signup, legal pages.
- Revenue funnel: guest visitor → 10-second watermarked storyboard → signup → subscription/token purchase → prompt correction → clean export.
- Revenue pricing table with Preview, Creator, Studio, Producer, Enterprise plans.
- Token wallet, ledger rules, hard-stop policy, failed-job refund pattern, auto-top-up placeholder.
- Plan enforcement API to block clean export, animatic download, commercial use, and team features unless paid.
- Protected export center with authenticated/signed URL delivery pattern.
- Admin revenue dashboard for MRR, conversion, costs, token usage, failed jobs, refunds, and export downloads.
- Production database schema for users, workspaces, subscriptions, tokens, projects, scripts, beats, scenes, shots, panels, assets, jobs, exports, and audit logs.
- Auth API scaffolds for signup/login/me.
- Project persistence API scaffold.
- Safety, legal, and commercial rights pages.
- Template marketplace page for genre and audience templates.
- Launch readiness checklist.

## Production launch requirements

Before accepting public payments, connect:

1. Real auth provider: Supabase Auth, Clerk, Auth.js, or enterprise SSO.
2. Postgres/Supabase database using `database/001_production_schema.sql`.
3. Stripe Checkout, Billing Portal, and verified webhook processing.
4. Private storage using R2/S3/Supabase Storage with signed URLs.
5. AI providers and queue workers for image/video/voice/music jobs.
6. Real analytics events for visitor → sample → signup → paid conversion.
7. Final legal review of Terms, Privacy, Refund, Commercial Use, copyright, likeness, and AI-content language.

## Intended launch funnel

Visitor → free 10-second watermarked storyboard → account creation → subscription or token pack → prompt corrections → clean export → repeat project usage.
