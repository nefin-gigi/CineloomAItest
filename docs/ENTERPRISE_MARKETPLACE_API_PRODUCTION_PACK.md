# Enterprise, Marketplace, and API Production Pack

## Enterprise

- SAML metadata route contract: `/api/enterprise/sso/saml`
- SCIM user lifecycle route contract: `/api/enterprise/scim/users`
- Required env: `ENTERPRISE_SSO_PROVIDER`, `SAML_METADATA_URL`, `SCIM_PROVIDER_ENDPOINT`, `SCIM_BEARER_TOKEN`.
- Evidence: SSO test, SCIM deprovisioning test, audit export, DPA, SOC 2 readiness pack.

## Marketplace

- Seller onboarding: `/api/marketplace/sellers`
- Payout contract: `/api/marketplace/payouts`
- Required env: `MARKETPLACE_PAYOUT_ENDPOINT`, `MARKETPLACE_PAYOUT_SECRET`, `STRIPE_CONNECT_CLIENT_ID`.
- Evidence: seller KYC, template review, commercial license attestation, payout test, refund test.

## Developer API

- API keys: `/api/developer/keys`
- Usage metering: `/api/developer/usage`
- Required env: `DEVELOPER_API_KEY_ENDPOINT`, `DEVELOPER_USAGE_METER_ENDPOINT`, `DEVELOPER_API_BILLING_ENDPOINT`.
- Evidence: API key issue, usage event, webhook callback, API invoice, SDK smoke test.
