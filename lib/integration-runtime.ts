import { connectorCatalog, featureFlagCatalog, type ConnectorDefinition } from './integration-registry';
import { assertSuperAdminAccess as assertMilitarySuperAdminAccess } from './military-security';

function normalizeEnvKey(raw: string) {
  return raw.includes('=') ? raw.split('=')[0] : raw;
}

function expectedEnvValue(raw: string) {
  return raw.includes('=') ? raw.split('=').slice(1).join('=') : undefined;
}

export function maskEnv(name: string) {
  const value = process.env[name];
  if (!value) return null;
  if (value.length <= 8) return `${value[0] ?? '*'}***`;
  return `${value.slice(0, 3)}••••${value.slice(-3)}`;
}

export function getConnectorEnvStatus(connector: ConnectorDefinition) {
  const checks = connector.requiredEnv.map((raw) => {
    const key = normalizeEnvKey(raw);
    const expected = expectedEnvValue(raw);
    const actual = process.env[key];
    const configured = expected ? actual === expected : Boolean(actual);
    return { key, expected: expected ?? 'configured value', configured, maskedValue: maskEnv(key) };
  });
  const optional = (connector.optionalEnv ?? []).map((raw) => {
    const key = normalizeEnvKey(raw);
    return { key, configured: Boolean(process.env[key]), maskedValue: maskEnv(key) };
  });
  const configuredRequired = checks.filter((item) => item.configured).length;
  const ready = configuredRequired === checks.length;
  return {
    connectorId: connector.id,
    ready,
    status: ready ? 'ready' : configuredRequired > 0 ? 'needs_env' : 'demo',
    configuredRequired,
    requiredCount: checks.length,
    checks,
    optional
  };
}

export function getAllConnectorHealth() {
  return connectorCatalog.map((connector) => ({
    ...connector,
    env: getConnectorEnvStatus(connector)
  }));
}

export function getOverallHealth() {
  const health = getAllConnectorHealth();
  const required = health.filter((item) => item.recommended);
  const ready = required.filter((item) => item.env.ready).length;
  const percent = Math.round((ready / Math.max(required.length, 1)) * 100);
  return {
    status: percent >= 90 ? 'production_ready' : percent >= 55 ? 'partially_configured' : 'demo_mode',
    readinessPercent: percent,
    recommendedReady: ready,
    recommendedTotal: required.length,
    connectors: health,
    missingCritical: required.filter((item) => !item.env.ready).map((item) => ({ id: item.id, displayName: item.displayName, missing: item.env.checks.filter((check) => !check.configured).map((check) => check.key) }))
  };
}

export function testConnector(connectorId: string) {
  const connector = connectorCatalog.find((item) => item.id === connectorId);
  if (!connector) {
    return { ok: false, connectorId, status: 'unknown', message: 'Connector not found.' };
  }
  const env = getConnectorEnvStatus(connector);
  const now = new Date().toISOString();
  if (!env.ready) {
    return {
      ok: false,
      connectorId,
      displayName: connector.displayName,
      status: env.status,
      testedAt: now,
      message: 'Connector is in demo or partial mode. Add required environment variables, redeploy, then run this test again.',
      missingEnv: env.checks.filter((check) => !check.configured).map((check) => check.key),
      docsPath: connector.docsPath
    };
  }
  return {
    ok: true,
    connectorId,
    displayName: connector.displayName,
    status: 'ready',
    testedAt: now,
    message: `${connector.connectedModeLabel} is configured. Replace this simulated ping with the provider SDK/API call in the adapter before public launch.`,
    docsPath: connector.docsPath
  };
}

export function getFeatureFlagStatus() {
  return featureFlagCatalog.map((flag) => ({
    ...flag,
    actual: process.env[flag.key] ?? flag.current,
    configured: Boolean(process.env[flag.key])
  }));
}

export function assertSuperAdminAccess(request: Request) {
  return assertMilitarySuperAdminAccess(request);
}
