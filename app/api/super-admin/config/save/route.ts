import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const redacted = {
    connectorId: body.connectorId,
    endpointUrl: body.endpointUrl,
    authMode: body.authMode,
    secretEnvName: body.secretEnvName,
    timeoutMs: body.timeoutMs
  };
  return NextResponse.json({
    ok: true,
    mode: process.env.DATABASE_URL ? 'ready_to_persist' : 'demo_contract_only',
    message: process.env.DATABASE_URL
      ? 'Connector contract accepted. Persist this object through the integration_connectors repository implementation.'
      : 'Demo mode: connector contract accepted but not persisted. Add DATABASE_URL and implement repository persistence before production.',
    savedContract: redacted,
    nextSteps: ['Add provider secret in Vercel environment variables', 'Redeploy', 'Run connector health test', 'Enable feature flag when ready']
  });
}
