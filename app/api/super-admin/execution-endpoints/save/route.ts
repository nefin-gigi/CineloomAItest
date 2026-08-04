import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { getExecutionEndpointDefinition } from '@/lib/execution-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const stage = String(body.stage ?? '');
  const definition = getExecutionEndpointDefinition(stage);
  if (!definition) return NextResponse.json({ ok: false, message: `Unknown execution stage: ${stage}` }, { status: 400 });
  const savedContract = {
    stage: definition.key,
    label: definition.label,
    endpointUrlEnv: body.endpointUrlEnv ?? definition.defaultUrlEnv,
    secretEnvName: body.secretEnvName ?? definition.defaultSecretEnv,
    authMode: body.authMode ?? definition.defaultAuthMode,
    timeoutMs: Number(body.timeoutMs ?? definition.timeoutMs),
    tokenPolicy: body.tokenPolicy ?? definition.tokenPolicy,
    requiredResponseKeys: body.requiredResponseKeys ?? definition.requiredResponseKeys,
    mode: process.env.DATABASE_URL ? 'ready_to_persist' : 'demo_contract_only'
  };
  return NextResponse.json({
    ok: true,
    message: process.env.DATABASE_URL
      ? 'Execution endpoint contract accepted. Persist this through the ExecutionEndpoint repository implementation.'
      : 'Demo mode: endpoint contract accepted but not persisted. Add DATABASE_URL and repository persistence before public launch.',
    savedContract,
    nextSteps: [
      `Add ${savedContract.endpointUrlEnv} and ${savedContract.secretEnvName} in Vercel environment variables`,
      'Redeploy the Vercel project',
      'Run a dry-run test from Super Admin',
      'Set EXECUTION_ENDPOINT_TEST_MODE=live only after endpoint is ready',
      'Verify token reserve/commit/refund around paid generation'
    ]
  });
}
