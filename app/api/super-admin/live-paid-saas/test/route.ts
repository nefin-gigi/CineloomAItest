import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { testLiveServiceHealth } from '@/lib/live-paid-saas';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const url = new URL(request.url);
  return secureJson(await testLiveServiceHealth({ id: url.searchParams.get('id') ?? undefined }));
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return secureJson(await testLiveServiceHealth({ id: body.id }));
}
