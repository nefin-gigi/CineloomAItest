# Production Blocker Closure Matrix

| Blocker | v3.0 Plug-and-Play Closure | Final Production Step |
|---|---|---|
| Real auth | Auth connector contracts for Clerk and Supabase Auth | Choose provider, configure env keys, verify sessions and RBAC |
| Real database | SQL + Prisma schema + connector health checks | Run migrations and connect repositories to Postgres/Supabase |
| Stripe billing | Checkout, webhook, portal contracts, env validation | Create Stripe products/prices, configure webhook, test end-to-end |
| Token enforcement | Token ledger service contracts and hard-stop flags | Persist token reservations/deductions/refunds transactionally |
| Private storage | R2/S3/Supabase storage connector contract | Move private scripts/assets/exports out of `/public` |
| Real AI providers | LLM/image/video/audio connector contracts | Add provider SDK/API calls behind adapters |
| Queue workers | Queue connector and async job lifecycle | Deploy worker service and webhook callback flow |
| Real exports | Render worker connector | Generate PDF/CSV/JSON/MP4/ZIP from project data |
| Analytics | Revenue and funnel event contracts | Connect analytics provider and revenue dashboard |
| Security/legal | Safety/rights connector + audit model | Legal review, moderation provider, retention/deletion workflow |

## Readiness rule

A public paid launch should wait until these are true:

- Auth is live.
- Database is live.
- Stripe checkout and webhooks are live.
- Token hard-stop is enforced server-side.
- Private storage is live.
- At least one storyboard image provider is live.
- Export PDF/ZIP generation is live.
- Basic observability is live.
- Terms/privacy/refund/commercial-use pages are legally reviewed.
