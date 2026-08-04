# CineLoom v4.8 Advanced Security Defense-in-Depth

This release adds a deeper security layer on top of the existing v4.3 zero-trust security posture and v4.7 production launch gates.

## New protection layers

1. **Signed internal requests**
   - HMAC-SHA256 request attestation with timestamp, nonce, canonical request, and replay window.
   - Intended for worker callbacks, AI provider adapters, token ledger, export renderer, and internal platform APIs.

2. **Internal service authorization**
   - Advanced security endpoints require Super Admin or `x-cineloom-internal-secret`.
   - Public callers cannot inspect advanced readiness, DLP, risk, tenant checks, or audit tooling.

3. **DLP and data classification**
   - Detects likely PII, secrets, payment-card-like values, confidential film/IP markers, and restricted content.
   - Blocks restricted data from AI provider calls unless explicitly approved.

4. **Upload quarantine and malware scanning contracts**
   - Blocks risky extensions.
   - Enforces content-type and max-size policy.
   - Requires malware scanner configuration in production mode.

5. **KMS / envelope encryption contracts**
   - Adds required environment variables and database evidence tables for encryption of scripts, prompts, exports, and provenance.

6. **Risk engine and step-up MFA contracts**
   - Scores high-value actions such as export, checkout, Super Admin actions, and public generation.
   - Routes high/critical risk to step-up MFA or block action.

7. **Tenant isolation checks**
   - Adds workspace ownership decision function and audit evidence table.
   - Blocks cross-tenant data access unless explicitly enabled through audited Super Admin support flow.

8. **Immutable signed audit events**
   - Every sensitive event can be signed with HMAC and forwarded to SIEM/immutable store.

9. **Secret rotation and supply-chain security**
   - Adds env contracts for secret manager, rotation webhook, leak scanning, SAST, DAST, SCA, SBOM, and dependency policy.

10. **AI security boundary**
   - Requires prompt-injection firewall, AI moderation, provenance, rights clearance, and provider allowlist enforcement.

11. **Compliance evidence locker**
   - Adds proof records for pentest, SOC2 evidence, security tabletop, legal/IP, billing, load, and release approvals.

## New pages

- `/studio/super-admin/security/advanced`
- `/studio/security`

## New APIs

- `GET /api/security/advanced-readiness`
- `GET|POST /api/super-admin/security/advanced`
- `GET|POST /api/security/request-attestation`
- `POST /api/security/audit-event`
- `POST /api/security/dlp-scan`
- `POST /api/security/upload-scan`
- `POST /api/security/risk-score`
- `POST /api/security/tenant-access`
- `GET|POST /api/security/key-rotation`
- `GET|POST /api/security/kill-switch`

## New database migration

- `database/015_advanced_security_defense_in_depth.sql`

## Validation command

```bash
npm run advanced-security-check
```

## Production note

This package provides advanced security architecture and contracts. It becomes operationally active after the live providers are connected:

- WAF/bot provider
- Auth/MFA/SSO provider
- KMS/envelope encryption provider
- DLP provider
- Malware scanner/quarantine storage
- SIEM and immutable audit store
- Risk engine and step-up MFA
- Tenant policy engine
- Secret manager/rotation provider
- SAST/DAST/SCA/SBOM pipeline
- AI prompt-injection firewall, moderation, provenance, and rights clearance
