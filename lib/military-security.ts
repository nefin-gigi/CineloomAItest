import { NextResponse, type NextRequest } from 'next/server';

export type SecurityDecision = {
  allowed: boolean;
  reason: string;
  status?: number;
  remediation?: string[];
};

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function isProductionLike() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.SECURITY_PROFILE === 'military';
}

export function securityProfile() {
  return (process.env.SECURITY_PROFILE ?? (isProductionLike() ? 'military' : 'demo')).toLowerCase();
}

export function isMilitaryMode() {
  return securityProfile() === 'military';
}

export function securityLevelLabel() {
  return isMilitaryMode() ? 'Zero-trust military-grade profile' : securityProfile();
}

export function isMutatingRequest(method: string) {
  return MUTATING_METHODS.has(method.toUpperCase());
}

export function constantTimeEquals(a = '', b = '') {
  const maxLength = Math.max(a.length, b.length, 1);
  let result = a.length === b.length ? 0 : 1;
  for (let i = 0; i < maxLength; i += 1) {
    result |= (a.charCodeAt(i % Math.max(a.length, 1)) || 0) ^ (b.charCodeAt(i % Math.max(b.length, 1)) || 0);
  }
  return result === 0;
}

export function getClientIp(request: Request | NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('cf-connecting-ip') ?? request.headers.get('x-real-ip') ?? forwarded ?? 'unknown';
}

function splitList(value?: string) {
  return (value ?? '').split(',').map((item) => item.trim()).filter(Boolean);
}

function ipMatchesRule(ip: string, rule: string) {
  if (!rule) return false;
  if (rule === ip) return true;
  if (rule.endsWith('*')) return ip.startsWith(rule.slice(0, -1));
  return false;
}

export function assertIpAllowlist(request: Request | NextRequest, envKey = 'SUPER_ADMIN_IP_ALLOWLIST'): SecurityDecision {
  const rules = splitList(process.env[envKey]);
  if (!rules.length) return { allowed: true, reason: `${envKey} not configured; IP allowlist not enforced.` };
  const ip = getClientIp(request);
  const allowed = rules.some((rule) => ipMatchesRule(ip, rule));
  return {
    allowed,
    reason: allowed ? `IP ${ip} allowed by ${envKey}.` : `IP ${ip} not allowed by ${envKey}.`,
    status: allowed ? 200 : 403,
    remediation: allowed ? [] : ['Add office/VPN IP to allowlist', 'Use enterprise SSO/VPN for Super Admin']
  };
}

export function assertProductionSafeConfiguration(): SecurityDecision {
  if (!isProductionLike()) return { allowed: true, reason: 'Non-production environment.' };
  const blockers: string[] = [];
  const authMode = (process.env.AUTH_MODE ?? 'demo').toLowerCase();
  const allowDemo = (process.env.ALLOW_DEMO_AUTH_IN_PRODUCTION ?? 'false').toLowerCase() === 'true';
  if (authMode === 'demo' && !allowDemo) blockers.push('AUTH_MODE=demo is blocked in production. Configure Clerk/Supabase/Auth.js or set AUTH_MODE=external.');
  if (!process.env.SUPER_ADMIN_API_KEY) blockers.push('SUPER_ADMIN_API_KEY is required in production.');
  if (!process.env.SUPER_ADMIN_SESSION_TOKEN) blockers.push('SUPER_ADMIN_SESSION_TOKEN is required for browser Super Admin access in production.');
  if ((process.env.REQUIRE_AUTH_FOR_STUDIO ?? 'true').toLowerCase() === 'false') blockers.push('REQUIRE_AUTH_FOR_STUDIO=false is not allowed in production.');
  if ((process.env.LAUNCH_GATE_ENABLED ?? 'true').toLowerCase() === 'false' && !process.env.DATABASE_URL) blockers.push('Public launch without DATABASE_URL is blocked.');
  if ((process.env.PUBLIC_EMAIL_ENDPOINT_ENABLED ?? 'false').toLowerCase() === 'true' && !process.env.EMAIL_PROVIDER_API_KEY) blockers.push('Public email endpoint enabled without EMAIL_PROVIDER_API_KEY.');
  return blockers.length
    ? { allowed: false, reason: 'Production-safe configuration failed.', status: 503, remediation: blockers }
    : { allowed: true, reason: 'Production-safe configuration passed.' };
}

export function getSecurityHeaders() {
  const cspReportUri = process.env.CSP_REPORT_URI ?? '/api/security/csp-report';
  const allowInlineStyle = (process.env.CSP_ALLOW_INLINE_STYLE ?? 'true').toLowerCase() === 'true';
  const styleSrc = allowInlineStyle ? "'self' 'unsafe-inline'" : "'self'";
  const connectSrc = ["'self'", 'https://api.stripe.com', 'https://*.stripe.com', 'https://vitals.vercel-insights.com'];
  if (process.env.NEXT_PUBLIC_APP_URL) connectSrc.push(process.env.NEXT_PUBLIC_APP_URL);
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self' https://checkout.stripe.com",
    `img-src 'self' data: blob: https:`,
    `media-src 'self' data: blob: https:`,
    `font-src 'self' data:`,
    `${(process.env.CSP_STRICT_NO_UNSAFE_INLINE ?? 'false').toLowerCase() === 'true' ? "script-src 'self' 'strict-dynamic' https://js.stripe.com" : "script-src 'self' 'strict-dynamic' 'unsafe-inline' https://js.stripe.com"}`,
    `style-src ${styleSrc}`,
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com`,
    `report-uri ${cspReportUri}`,
    `report-to cineloom-csp`,
    'upgrade-insecure-requests'
  ].join('; ');

  return {
    'Content-Security-Policy': csp,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self)',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'Origin-Agent-Cluster': '?1',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'X-XSS-Protection': '0'
  };
}

export function applySecurityHeaders(response: NextResponse) {
  const headers = getSecurityHeaders();
  for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
  response.headers.set('Report-To', JSON.stringify({ group: 'cineloom-csp', max_age: 10886400, endpoints: [{ url: process.env.CSP_REPORT_URI ?? '/api/security/csp-report' }] }));
  response.headers.set('X-CineLoom-Security-Profile', securityProfile());
  return response;
}

export function secureJson(body: unknown, init?: ResponseInit) {
  return applySecurityHeaders(NextResponse.json(body, init));
}

export function secureRedirect(url: string | URL) {
  return applySecurityHeaders(NextResponse.redirect(url));
}

export function assertSuperAdminAccess(request: Request | NextRequest): SecurityDecision {
  if ((process.env.SUPER_ADMIN_ENABLED ?? 'true').toLowerCase() === 'false') {
    return { allowed: false, reason: 'Super Admin disabled.', status: 403 };
  }

  const safeConfig = assertProductionSafeConfiguration();
  if (!safeConfig.allowed && isProductionLike()) return safeConfig;

  const ipGate = assertIpAllowlist(request);
  if (!ipGate.allowed) return ipGate;

  const configuredSecret = process.env.SUPER_ADMIN_API_KEY ?? '';
  const sessionToken = process.env.SUPER_ADMIN_SESSION_TOKEN ?? '';
  const providedHeader = request.headers.get('x-cineloom-super-admin-key') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';

  if (configuredSecret && providedHeader && constantTimeEquals(providedHeader, configuredSecret)) {
    return { allowed: true, reason: 'Super Admin API key authorized.' };
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookieMatch = cookieHeader.match(/(?:^|;\s*)cineloom_super_admin_session=([^;]+)/);
  const providedCookie = decodeURIComponent(cookieMatch?.[1] ?? '');
  if (sessionToken && providedCookie && constantTimeEquals(providedCookie, sessionToken)) {
    return { allowed: true, reason: 'Super Admin signed browser session authorized.' };
  }

  if (!isProductionLike() && !configuredSecret) {
    return { allowed: false, reason: 'Super Admin demo access is now locked by default. Set SUPER_ADMIN_API_KEY or SECURITY_PROFILE=demo and SUPER_ADMIN_DEMO_UNLOCK=true.', status: 403 };
  }

  return { allowed: false, reason: 'Missing or invalid Super Admin credentials.', status: 403, remediation: ['Use x-cineloom-super-admin-key header for APIs', 'Create a hardened browser session through /studio/super-admin/access', 'Set SUPER_ADMIN_API_KEY and SUPER_ADMIN_SESSION_TOKEN in Vercel'] };
}

export function assertCsrf(request: Request | NextRequest): SecurityDecision {
  const enforce = (process.env.CSRF_PROTECTION_ENFORCE ?? (isProductionLike() ? 'true' : 'false')).toLowerCase() === 'true';
  if (!enforce || !isMutatingRequest(request.method)) return { allowed: true, reason: 'CSRF not required for this request.' };
  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookie = decodeURIComponent(cookieHeader.match(/(?:^|;\s*)cineloom_csrf=([^;]+)/)?.[1] ?? '');
  const header = request.headers.get('x-cineloom-csrf') ?? '';
  if (cookie && header && constantTimeEquals(cookie, header)) return { allowed: true, reason: 'CSRF token matched.' };
  return { allowed: false, reason: 'Missing or invalid CSRF token.', status: 403, remediation: ['Fetch /api/security/csrf before mutating requests', 'Send x-cineloom-csrf header matching cineloom_csrf cookie'] };
}

export function buildSecurityReadiness() {
  const requiredMilitaryEnv = [
    'AUTH_MODE', 'SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN', 'DATABASE_URL', 'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET', 'PRIVATE_STORAGE_BUCKET', 'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT', 'QUEUE_PROVIDER',
    'QUEUE_ENDPOINT_URL', 'REDIS_URL', 'OBSERVABILITY_WEBHOOK_URL', 'EMAIL_PROVIDER_API_KEY'
  ];
  const checks = requiredMilitaryEnv.map((key) => ({ key, configured: Boolean(process.env[key]) }));
  const configured = checks.filter((check) => check.configured).length;
  const safe = assertProductionSafeConfiguration();
  const score = Math.round((configured / checks.length) * 100);
  return {
    profile: securityProfile(),
    label: securityLevelLabel(),
    productionSafe: safe.allowed,
    productionSafeMessage: safe.reason,
    blockers: safe.remediation ?? [],
    score,
    checks,
    requiredControls: [
      'Zero-trust Super Admin access', 'No production demo auth', 'Strong security headers', 'CSP report endpoint',
      'CSRF enforcement for mutating requests', 'Distributed rate-limit contract', 'Private signed asset downloads',
      'Transactional token enforcement', 'Security event audit stream', 'Strict CI production gate', 'Secret rotation runbook',
      'Incident response runbook', 'Enterprise SSO/SAML-ready contract', 'Model training opt-out and IP rights controls'
    ]
  };
}
