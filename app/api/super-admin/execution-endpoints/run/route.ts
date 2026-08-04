import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { invokeProductionControlledEndpoint } from '@/lib/production-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const controlled = await invokeProductionControlledEndpoint(request, {
    stage: String(body.stage ?? 'storyboard_generate'),
    payload: body.payload,
    workspaceId: body.workspaceId,
    projectId: body.projectId,
    idempotencyKey: body.idempotencyKey,
    dryRun: body.dryRun === true
  });
  return NextResponse.json(controlled.result, { status: controlled.httpStatus, headers: controlled.headers });
}
