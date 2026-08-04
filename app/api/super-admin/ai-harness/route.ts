import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { buildAIHarnessReadiness, runGoldenTestSuite, scoreAIOutput } from '@/lib/ai-harness';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString(), readiness: buildAIHarnessReadiness() });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  const action = String(payload.action ?? 'run_golden_tests');
  if (action === 'evaluate') return NextResponse.json({ ok: true, result: scoreAIOutput(payload) });
  return NextResponse.json({ ok: true, result: runGoldenTestSuite() });
}
