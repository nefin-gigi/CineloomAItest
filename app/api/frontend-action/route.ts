import { NextResponse } from 'next/server';
import { getFrontendAction } from '@/lib/frontend-endpoint-registry';
import { testFrontendAction } from '@/lib/frontend-link-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const actionKey = String(body.actionKey ?? '');
  const action = getFrontendAction(actionKey);
  if (!action) return NextResponse.json({ ok: false, status: 'unknown_action' }, { status: 404 });

  const publicRouterEnabled = (process.env.PUBLIC_FRONTEND_ENDPOINT_ROUTER_ENABLED ?? 'false').toLowerCase() === 'true';
  const dryRun = !publicRouterEnabled || action.mode === 'track_only' || action.mode === 'navigation_only';

  // Public endpoint router is intentionally safe by default. It documents/tracks actions without invoking costly providers unless explicitly enabled.
  const result = await testFrontendAction(action.key, {
    dryRun,
    payload: {
      actionKey: action.key,
      href: action.href,
      source: body.source ?? 'frontend_link',
      path: body.path ?? null,
      timestamp: new Date().toISOString()
    }
  });

  return NextResponse.json({
    ok: true,
    status: dryRun ? 'recorded_dry_run' : 'routed',
    actionKey: action.key,
    href: action.href,
    endpointChain: action.backendStages,
    result
  });
}
