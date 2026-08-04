# CineLoom.ai v3.0 Revenue Launch Checklist

## Must be complete before launch

- [ ] Configure `NEXT_PUBLIC_APP_URL=https://www.cineloom.ai`.
- [ ] Turn on public marketing pages or keep `LAUNCH_GATE_ENABLED=true` for private beta.
- [ ] Connect production authentication.
- [ ] Run the Postgres/Supabase schema migration.
- [ ] Configure Stripe product price IDs for all plans and token packs.
- [ ] Configure Stripe webhook endpoint and verify signatures.
- [ ] Move confidential project exports out of `/public` and into private R2/S3/Supabase Storage.
- [ ] Add token hard-stop logic before every provider call.
- [ ] Add failed-generation token refund workflow.
- [ ] Add real provider keys and queue workers.
- [ ] Add usage analytics and conversion tracking.
- [ ] Confirm Terms, Privacy, Refund, Commercial Use, and Copyright language with counsel.
- [ ] Verify watermark is always applied to free preview exports.
- [ ] Verify paid plans remove watermark and grant commercial export permissions.
- [ ] Test full funnel: visitor → sample → signup → checkout → token wallet → correction → clean export.

## Demo mode behavior

Demo mode keeps the site safe to deploy without live Stripe/provider/database keys. Production mode requires environment variables and persistent database/storage.
