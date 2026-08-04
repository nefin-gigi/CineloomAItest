# Analytics and Revenue Events

Track the full revenue funnel from visitor to paid export.

## Funnel events

- `visitor_landed`
- `free_sample_started`
- `free_sample_completed`
- `signup_started`
- `signup_completed`
- `checkout_started`
- `subscription_started`
- `token_pack_purchased`
- `generation_started`
- `generation_completed`
- `generation_failed`
- `tokens_reserved`
- `tokens_committed`
- `tokens_refunded`
- `export_started`
- `export_downloaded`
- `prompt_correction_used`
- `workspace_invite_sent`

## Revenue KPIs

- Visitor-to-sample conversion
- Sample-to-signup conversion
- Signup-to-paid conversion
- MRR / ARR
- Token pack revenue
- Provider cost per generation
- Gross margin per action
- Export downloads
- Churn and failed payments
- Refund rate

## Implementation note

Analytics should not block generation. Send events asynchronously through a queue or non-blocking server call.
