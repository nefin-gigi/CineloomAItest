export const GATE_COOKIE = 'cineloom_launch_gate';

export function gateEnabled() {
  return (process.env.LAUNCH_GATE_ENABLED ?? 'false').toLowerCase() === 'true';
}

export function expectedUsername() {
  return process.env.LAUNCH_USERNAME ?? 'cineloom';
}

export function expectedPassword() {
  return process.env.LAUNCH_PASSWORD ?? '';
}

export function gateToken() {
  return process.env.LAUNCH_GATE_TOKEN ?? '';
}

export function gateConfigured() {
  return Boolean(expectedPassword() && gateToken());
}
