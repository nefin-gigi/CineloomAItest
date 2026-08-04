import { buildAdvancedSecurityReadiness } from './advanced-security';
import { buildSecurityReadiness } from './military-security';
import { buildInputValidationReadiness } from './input-validation';

export function buildTopSecurityArchitectureReadiness() {
  const military = buildSecurityReadiness();
  const advanced = buildAdvancedSecurityReadiness();
  const validation = buildInputValidationReadiness();
  return {
    ok: Boolean(validation.ok),
    version: 'v7.4-top-security-architecture',
    posture: 'zero-trust-defense-in-depth-secure-by-default',
    layers: [
      { id: 'edge', name: 'Edge/WAF/Bot', controls: ['WAF provider contract', 'bot protection gate', 'rate-limit fail-closed mode', 'origin and method policy'] },
      { id: 'identity', name: 'Identity/RBAC/MFA', controls: ['demo auth blocked in production', 'Super Admin token/session gate', 'IP allowlist', 'step-up MFA contract', 'SSO/SAML readiness'] },
      { id: 'application', name: 'Application/API', controls: ['route-specific input validation', 'CSRF for mutating APIs', 'signed internal requests', 'strict content-type policy', 'safe JSON errors'] },
      { id: 'data', name: 'Data/IP protection', controls: ['tenant isolation policy', 'private signed downloads', 'DLP scanning', 'malware quarantine contract', 'KMS envelope encryption contract'] },
      { id: 'ai', name: 'AI security boundary', controls: ['prompt-injection firewall contract', 'moderation contract', 'provenance ledger', 'provider allowlist', 'rights checks'] },
      { id: 'supply-chain', name: 'Supply chain', controls: ['SAST', 'DAST/ZAP baseline', 'SCA/dependency audit', 'SBOM', 'secret scanning'] },
      { id: 'operations', name: 'Audit/IR/DR', controls: ['immutable signed audit events', 'SIEM forwarding', 'kill switch', 'key rotation runbook', 'backup/restore evidence'] }
    ],
    military,
    advanced,
    validation,
    launchDecision: advanced.ok && military.productionSafe ? 'ready_when_live_services_and_security_evidence_are_configured' : 'blocked_until_security_controls_and_env_are_configured'
  };
}
