import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { invokeExecutionEndpoint } from '@/lib/execution-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const { searchParams } = new URL(request.url);
  const stage = searchParams.get('stage') ?? 'storyboard_generate';
  const dryRun = searchParams.get('dryRun') !== 'false';
  return NextResponse.json(await invokeExecutionEndpoint({ stage, dryRun }));
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json(await invokeExecutionEndpoint({
    stage: String(body.stage ?? 'storyboard_generate'),
    payload: body.payload,
    workspaceId: body.workspaceId,
    projectId: body.projectId,
    idempotencyKey: body.idempotencyKey,
    dryRun: body.dryRun !== false
  }));
}
