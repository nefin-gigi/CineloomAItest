# CineLoom v4.3 Security Acceptance Criteria

The site should not be considered publicly launchable until these pass in a deployed Vercel preview:

- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run military-security-check` passes.
- `npm run production-check:strict` passes with all required env values configured.
- Super Admin API returns 403 without `x-cineloom-super-admin-key`.
- Super Admin browser pages redirect to `/studio/super-admin/access` without a hardened session.
- Demo auth is blocked when `NODE_ENV=production` and `AUTH_MODE=demo`.
- Security headers are present on public and protected pages.
- CSP report endpoint accepts reports and forwards them to observability in live mode.
- CSRF token endpoint returns token and mutating protected endpoints reject missing CSRF when enforcement is on.
- Public free-generation endpoints are locked until WAF/rate limit/bot protection is configured.
- Customer exports are not directly reachable from public folders in production mode.
- A third-party penetration test has no critical or high findings before public paid launch.
