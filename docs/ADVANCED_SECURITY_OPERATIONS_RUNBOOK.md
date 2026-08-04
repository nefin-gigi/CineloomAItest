# Advanced Security Operations Runbook

## Pre-production checklist

1. Configure `SECURITY_PROFILE=military`.
2. Keep `PUBLIC_LAUNCH_ENABLED=false` until all security gates pass.
3. Configure real auth with MFA/SSO. Do not use demo auth.
4. Configure WAF and bot protection before public generation endpoints are enabled.
5. Configure Redis/Upstash rate limiting with fail-closed mode.
6. Configure KMS and envelope encryption for scripts, prompts, exports, and provenance.
7. Configure DLP and malware scan endpoints.
8. Configure private upload quarantine bucket.
9. Configure signed internal request secret and internal service secret.
10. Configure SIEM endpoint, immutable audit store, and audit signing secret.
11. Configure risk engine and step-up MFA provider.
12. Configure tenant policy engine.
13. Configure secret manager, rotation webhook, and leak scan tooling.
14. Configure SAST, DAST, SCA, and SBOM workflows.
15. Configure AI prompt-injection firewall, safety moderation, provenance, and rights clearance.
16. Store all evidence in compliance evidence locker.

## Internal request signing

Canonical request format:

```text
<METHOD>
<PATHNAME>
<TIMESTAMP_MS>
<NONCE>
<BODY>
```

The caller computes:

```text
base64url(HMAC-SHA256(REQUEST_SIGNATURE_SECRET, canonical_request))
```

Required headers:

```text
x-cineloom-request-timestamp
x-cineloom-request-nonce
x-cineloom-request-signature
```

## Upload flow

```text
upload request
→ metadata validation
→ private quarantine bucket
→ malware scan
→ DLP scan
→ tenant policy check
→ KMS encrypt
→ release to private project storage
→ signed audit event
```

## AI generation flow

```text
script/prompt input
→ DLP classification
→ prompt-injection firewall
→ safety/rights moderation
→ tenant policy check
→ token reserve
→ signed internal provider request
→ provenance ledger
→ token commit/refund
→ signed audit event
```

## Super Admin support access

Support access must follow break-glass rules:

1. Customer or internal leader approval.
2. Time-limited access.
3. Cross-tenant access explicitly enabled only during the case.
4. Every read/export/action signed into immutable audit store.
5. Access revoked after case closure.

## Incident response

1. Trigger kill switch for affected capability.
2. Disable public generation and paid launch if data or billing is at risk.
3. Rotate impacted secrets.
4. Preserve immutable audit records.
5. Notify legal/security leadership.
6. Run forensic review.
7. Publish customer-facing status update if required.
8. Add regression security test before re-enabling.
