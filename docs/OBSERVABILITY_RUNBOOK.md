# Observability Runbook

Monitor these areas before public launch:

- API error rate
- Provider error rate
- Queue failure rate
- Generation latency
- Export rendering latency
- Token ledger mismatches
- Stripe webhook failures
- Storage upload/download failures
- Login/session failures
- Unexpected cost spikes

## Alerts

Create alerts for:

- Stripe webhook failures over threshold
- Provider failures over threshold
- Queue backlog over threshold
- Token reservation older than expected
- Export generation failures
- Super admin connector changes
- Private asset access denied spike
