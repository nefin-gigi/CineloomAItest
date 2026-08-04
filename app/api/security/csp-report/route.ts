import { secureJson } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const redacted = JSON.stringify(body).slice(0, 2000);
  console.warn('[cineloom-csp-report]', redacted);
  return secureJson({ ok: true, message: 'CSP report accepted.' });
}
