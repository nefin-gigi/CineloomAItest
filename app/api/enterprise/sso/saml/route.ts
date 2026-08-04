import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  return secureJson({
    ok: true,
    service: 'enterprise_sso_saml',
    configured: Boolean(process.env.SAML_METADATA_URL && process.env.ENTERPRISE_SSO_PROVIDER),
    provider: process.env.ENTERPRISE_SSO_PROVIDER ?? 'not_configured',
    metadataUrl: process.env.SAML_METADATA_URL ?? '',
    requiredFor10: ['ENTERPRISE_SSO_PROVIDER', 'SAML_METADATA_URL', 'AUTH_REQUIRE_WORKSPACE_RBAC']
  });
}
