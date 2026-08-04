# Security and Launch Gate

This package uses a lightweight launch gate:

- Public `/` route shows “Site under construction.”
- Protected internal routes require cookie `cineloom_launch_gate`.
- `/api/gate/login` validates `LAUNCH_USERNAME` and `LAUNCH_PASSWORD`.
- On success, it sets an httpOnly cookie using `LAUNCH_GATE_TOKEN`.
- Middleware redirects unauthenticated users back to `/`.

## Required Vercel variables

- `LAUNCH_GATE_ENABLED=true`
- `LAUNCH_USERNAME=<private username>`
- `LAUNCH_PASSWORD=<private password>`
- `LAUNCH_GATE_TOKEN=<long random token>`

## Production recommendation

This is appropriate for a pre-launch construction gate. It is not enough for paid SaaS users, investor-only permissions, or team collaboration. For production, add:

- Real authentication
- Role-based access control
- Audit logging
- Rate limiting
- Secure file permissions
- User-specific project authorization
