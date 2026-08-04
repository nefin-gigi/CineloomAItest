import { advancedSecurityJson, buildRequestAttestation, readRequestBodyForSignature, verifySignedRequest } from '@/lib/advanced-security';
import { assertSuperAdminAccess } from '@/lib/military-security';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason }, { status: access.status ?? 403 });
  const url = new URL(request.url);
  const pathname = url.searchParams.get('pathname') ?? '/api/worker/callback';
  const method = url.searchParams.get('method') ?? 'POST';
  return advancedSecurityJson({ ok: true, attestation: buildRequestAttestation(pathname, method, '') });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get('pathname') ?? url.pathname;
  let body = '';
  try {
    body = await readRequestBodyForSignature(request);
  } catch (error) {
    return advancedSecurityJson({ ok: false, message: error instanceof Error ? error.message : 'Request body rejected.' }, { status: 413 });
  }
  const decision = verifySignedRequest({
    method: request.method,
    pathname,
    timestamp: request.headers.get('x-cineloom-request-timestamp') ?? '',
    nonce: request.headers.get('x-cineloom-request-nonce') ?? '',
    signature: request.headers.get('x-cineloom-request-signature') ?? '',
    secret: process.env.REQUEST_SIGNATURE_SECRET ?? '',
    body
  });
  return advancedSecurityJson({ ok: decision.allowed, decision }, { status: decision.allowed ? 200 : decision.status ?? 401 });
}
