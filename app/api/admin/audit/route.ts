import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { buildAuditEvent } from '@/lib/observability';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({ ok: true, audit: buildAuditEvent({ action: String(body.action ?? 'admin.event'), target: String(body.target ?? 'system'), metadata: body }) });
}
