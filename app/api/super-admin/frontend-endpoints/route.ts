import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { getFrontendEndpointRouterHealth } from '@/lib/frontend-link-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({
    ok: true,
    access: access.reason,
    router: getFrontendEndpointRouterHealth(),
    guidance: [
      'Each visible frontend link/action has an action key, UI route, API route, and backend endpoint chain.',
      'Connect endpoints by adding the listed Vercel environment variables.',
      'Use dry-run first; switch to configured/live only after secrets, rate limits, auth, and monitoring are ready.',
      'Public navigation must never be blocked by analytics or noncritical endpoints.'
    ]
  });
}
