import type { NextRequest } from 'next/server';
import { isMutatingRequest, isProductionLike, type SecurityDecision } from './military-security';

const SUSPICIOUS_PATH = /(?:\.\.\/|\.\.\\|%2e%2e|%5c|%2f%2e|;|<|>|\{|\}|\||\^|`)/i;
const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
const SAFE_CONTENT_TYPES = ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'];

export function assertRequestSurface(request: NextRequest): SecurityDecision {
  const pathname = request.nextUrl.pathname;
  const method = request.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) return { allowed: false, status: 405, reason: 'HTTP method is not allowed.' };
  if (SUSPICIOUS_PATH.test(pathname)) return { allowed: false, status: 400, reason: 'Suspicious path sequence blocked.' };

  if (pathname.startsWith('/api') && isMutatingRequest(method)) {
    const contentType = request.headers.get('content-type') ?? '';
    const hasBody = Boolean(request.headers.get('content-length') || request.headers.get('transfer-encoding'));
    if (hasBody && !SAFE_CONTENT_TYPES.some((safe) => contentType.includes(safe))) {
      return { allowed: false, status: 415, reason: 'Unsupported API content type.' };
    }
    const length = Number(request.headers.get('content-length') ?? 0);
    const max = Number(process.env.MAX_API_CONTENT_LENGTH_BYTES ?? 1024 * 1024);
    if (Number.isFinite(length) && length > max) return { allowed: false, status: 413, reason: 'API request body exceeds maximum allowed size.' };
  }

  if (isProductionLike() && isMutatingRequest(method) && pathname.startsWith('/api')) {
    const origin = request.headers.get('origin');
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (origin && appUrl && !origin.startsWith(appUrl)) {
      const allowOrigins = (process.env.ADDITIONAL_ALLOWED_ORIGINS ?? '').split(',').map((item) => item.trim()).filter(Boolean);
      if (!allowOrigins.includes(origin)) return { allowed: false, status: 403, reason: 'Origin is not allowed for mutating API request.' };
    }
  }

  return { allowed: true, reason: 'Request surface accepted.' };
}
