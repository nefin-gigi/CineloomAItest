# Zero-Trust Super Admin Runbook

## Access flow

1. Admin connects from approved IP/VPN if `SUPER_ADMIN_IP_ALLOWLIST` is configured.
2. Admin opens `/studio/super-admin/access`.
3. Admin enters `SUPER_ADMIN_API_KEY`, `SUPER_ADMIN_SESSION_TOKEN`, and optional MFA/break-glass token.
4. CineLoom issues a short-lived, HTTP-only, secure, strict SameSite browser session cookie scoped to `/studio/super-admin`.
5. Mutating Super Admin API calls require CSRF when `CSRF_PROTECTION_ENFORCE=true`.
6. All Super Admin API calls also accept `x-cineloom-super-admin-key` for machine-to-machine operations.

## Lockdown rules

- `AUTH_MODE=demo` is blocked in production.
- Missing `SUPER_ADMIN_API_KEY` blocks production Super Admin.
- Missing `SUPER_ADMIN_SESSION_TOKEN` blocks production browser Super Admin.
- `REQUIRE_AUTH_FOR_STUDIO=false` is blocked in production.
- Public generation/email endpoints are locked until anti-abuse controls are enabled.

## Rotation

Rotate these at least every 90 days and immediately after staff changes or suspected exposure:

- `SUPER_ADMIN_API_KEY`
- `SUPER_ADMIN_SESSION_TOKEN`
- provider API keys
- Stripe webhook secret
- storage signing key
- queue worker secret

## Incident response

1. Disable `SUPER_ADMIN_ENABLED`.
2. Rotate all Super Admin and provider secrets.
3. Revoke active sessions in the database.
4. Review `security_events` and provider logs.
5. Freeze token-generating jobs if provider abuse is suspected.
6. Publish customer notifications only after legal/security review.
