import { NextResponse, type NextRequest } from 'next/server';
import { GATE_COOKIE, gateEnabled, gateToken } from './lib/auth';
import {
  applySecurityHeaders,
  assertCsrf,
  assertProductionSafeConfiguration,
  assertSuperAdminAccess,
  isMutatingRequest,
  isProductionLike,
  secureRedirect
} from './lib/military-security';
import { assertRequestSurface } from './lib/request-surface-security';

const PUBLIC_FILE = /\.(.*)$/;
const publicMarketingPaths = new Set([
  '/', '/pricing', '/examples', '/how-it-works', '/create-free-storyboard', '/login', '/signup',
  '/terms', '/privacy', '/refund-policy', '/commercial-use', '/platform', '/marketplace', '/api-platform', '/enterprise', '/integrations', '/share/demo',
  '/customers', '/security', '/support', '/status', '/case-studies',
  '/ai-storyboard-generator', '/script-to-storyboard-generator', '/ai-animatic-generator',
  '/storyboard-generator-for-youtube-shorts', '/storyboard-generator-for-filmmakers',
  '/commercial-storyboard-generator', '/bible-film-storyboard-generator', '/film-school-storyboard-tool',
  '/music-video-storyboard-generator', '/sample-package', '/flagship-scene', '/customer-proof', '/remix/demo'
]);

const publicApiPrefixes = [
  '/api/gate', '/api/auth', '/api/billing/webhook', '/api/storyboard/free-sample', '/api/analytics/funnel',
  '/api/support/ticket', '/api/email/send', '/api/proof/submit-quote', '/api/security/csp-report', '/api/security/csrf',
  '/api/status/service', '/api/health/live', '/api/health/ready'
];

function next() {
  return applySecurityHeaders(NextResponse.next());
}

function json(message: string, status = 403, extra: Record<string, unknown> = {}) {
  return applySecurityHeaders(NextResponse.json({ ok: false, message, ...extra }, { status }));
}

function isPublicApi(pathname: string) {
  return publicApiPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function isPublicAsset(pathname: string) {
  return pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/brand') || pathname.startsWith('/og') || pathname.startsWith('/favicon') || PUBLIC_FILE.test(pathname);
}

function isHighRiskPublicApi(pathname: string) {
  return pathname.startsWith('/api/email/send') || pathname.startsWith('/api/proof/submit-quote') || pathname.startsWith('/api/support/ticket') || pathname.startsWith('/api/storyboard/free-sample');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const safeConfig = assertProductionSafeConfiguration();
  const surface = assertRequestSurface(request);
  if (!surface.allowed) return json(surface.reason, surface.status ?? 400);


  if (isProductionLike() && !safeConfig.allowed && pathname.startsWith('/studio/super-admin')) {
    const accessUrl = new URL('/studio/super-admin/access', request.url);
    accessUrl.searchParams.set('reason', safeConfig.reason);
    return secureRedirect(accessUrl);
  }

  if (pathname === '/api/super-admin/auth/login') return next();

  if (pathname.startsWith('/api/super-admin')) {
    const access = assertSuperAdminAccess(request);
    if (!access.allowed) return json(access.reason, access.status ?? 403, { remediation: access.remediation ?? [] });
    if (isMutatingRequest(request.method)) {
      const csrf = assertCsrf(request);
      if (!csrf.allowed) return json(csrf.reason, csrf.status ?? 403, { remediation: csrf.remediation ?? [] });
    }
    return next();
  }

  if (pathname === '/studio/super-admin/access') return next();

  if (pathname.startsWith('/studio/super-admin')) {
    const access = assertSuperAdminAccess(request);
    if (!access.allowed) {
      const accessUrl = new URL('/studio/super-admin/access', request.url);
      accessUrl.searchParams.set('next', pathname);
      accessUrl.searchParams.set('reason', access.reason);
      return secureRedirect(accessUrl);
    }
    return next();
  }

  if (isPublicAsset(pathname)) return next();

  if (isProductionLike() && pathname.startsWith('/api/auth') && (process.env.AUTH_MODE ?? 'demo').toLowerCase() === 'demo' && (process.env.ALLOW_DEMO_AUTH_IN_PRODUCTION ?? 'false').toLowerCase() !== 'true') {
    return json('Demo authentication is disabled in production. Configure a real auth provider before public launch.', 503);
  }

  if (isProductionLike() && isHighRiskPublicApi(pathname)) {
    const publicApiEnabled = (process.env.PUBLIC_GENERATION_ENDPOINTS_ENABLED ?? 'false').toLowerCase() === 'true';
    const emailEnabled = (process.env.PUBLIC_EMAIL_ENDPOINT_ENABLED ?? 'false').toLowerCase() === 'true';
    const isEmail = pathname.startsWith('/api/email/send');
    if (isEmail && !emailEnabled) return json('Public email endpoint is locked until EMAIL provider and anti-abuse controls are configured.', 503);
    if (!isEmail && !publicApiEnabled) return json('Public generation/intake endpoint is locked until anti-abuse and rate-limit services are configured.', 503);
  }

  if (isPublicApi(pathname)) return next();

  // Public marketing pages must always remain browsable on staging/production.
  // Earlier packages redirected /examples and /pricing to /?next=..., which made the site feel broken.
  if (publicMarketingPaths.has(pathname)) return next();

  if (gateEnabled()) {
    const isPublicPath = pathname === '/' || pathname.startsWith('/api/gate');
    if (isPublicPath) return next();
    const token = gateToken();
    const cookie = request.cookies.get(GATE_COOKIE)?.value;
    if (token && cookie === token) return next();
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return secureRedirect(loginUrl);
  }

  const requireAuth = (process.env.REQUIRE_AUTH_FOR_STUDIO ?? 'true').toLowerCase() !== 'false';
  const isStudio = pathname.startsWith('/studio') || pathname.startsWith('/dashboard') || pathname.startsWith('/api/projects') || pathname.startsWith('/api/tokens') || pathname.startsWith('/api/export') || pathname.startsWith('/api/admin') || pathname.startsWith('/api/jobs') || pathname.startsWith('/api/agent-harness');
  if (requireAuth && isStudio && !request.cookies.get('cineloom_user_session')?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return secureRedirect(loginUrl);
  }

  if (isMutatingRequest(request.method) && (pathname.startsWith('/api/tokens') || pathname.startsWith('/api/export') || pathname.startsWith('/api/jobs') || pathname.startsWith('/api/agent-harness'))) {
    const csrf = assertCsrf(request);
    if (!csrf.allowed) return json(csrf.reason, csrf.status ?? 403, { remediation: csrf.remediation ?? [] });
  }

  return next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
