import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { testFrontendAction } from '@/lib/frontend-link-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const actionKey = String(body.actionKey ?? 'cta_create_free_storyboard');
  const dryRun = body.dryRun !== false;
  const payload = body.payload && typeof body.payload === 'object' ? body.payload as Record<string, unknown> : undefined;
  const result = await testFrontendAction(actionKey, { dryRun, payload });
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
