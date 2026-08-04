import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { getFrontendAction } from '@/lib/frontend-endpoint-registry';
import { getFrontendActionStatus } from '@/lib/frontend-link-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const actionKey = String(body.actionKey ?? '');
  const action = getFrontendAction(actionKey);
  if (!action) return NextResponse.json({ ok: false, message: `Unknown frontend action: ${actionKey}` }, { status: 400 });
  const savedContract = {
    actionKey: action.key,
    label: action.label,
    href: action.href,
    apiRoute: body.apiRoute ?? action.apiRoute,
    method: body.method ?? action.method,
    mode: body.mode ?? action.mode,
    backendStages: body.backendStages ?? action.backendStages,
    requiredEnv: body.requiredEnv ?? action.requiredEnv,
    fallbackBehavior: body.fallbackBehavior ?? action.fallbackBehavior,
    modeOfPersistence: process.env.DATABASE_URL ? 'ready_to_persist' : 'demo_contract_only'
  };
  return NextResponse.json({
    ok: true,
    message: process.env.DATABASE_URL
      ? 'Frontend action contract accepted. Persist this in the frontend_endpoint_contracts table via repository implementation.'
      : 'Demo mode: contract accepted but not persisted. Add DATABASE_URL and repository persistence before production launch.',
    savedContract,
    readiness: getFrontendActionStatus(action),
    nextSteps: [
      'Add missing Vercel environment variables from the readiness section.',
      'Redeploy staging after environment changes.',
      'Run dry-run test from this Super Admin page.',
      'Run configured/live check after the backend provider is ready.',
      'Only turn on public paid launch after production-check:strict passes.'
    ]
  });
}
