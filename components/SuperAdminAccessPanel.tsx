'use client';

import { useState } from 'react';

export function SuperAdminAccessPanel() {
  const [apiKey, setApiKey] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [message, setMessage] = useState('Super Admin is locked by zero-trust policy.');

  async function unlock() {
    setMessage('Validating hardened Super Admin access...');
    const response = await fetch('/api/super-admin/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-cineloom-super-admin-key': apiKey },
      body: JSON.stringify({ sessionToken, mfaToken })
    });
    const data = await response.json().catch(() => ({}));
    setMessage(data.message ?? (response.ok ? 'Authorized.' : 'Access denied.'));
    if (response.ok) window.location.href = '/studio/super-admin/security';
  }

  return (
    <section className="section hero-card">
      <p className="eyebrow">Zero-trust Super Admin access</p>
      <h1>Military-level control plane lock</h1>
      <p className="muted">Use a high-entropy API key, signed browser session token, optional MFA token, and IP allowlist before opening any Super Admin console.</p>
      <div className="grid two">
        <label>Super Admin API key<input className="admin-input" type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="x-cineloom-super-admin-key" /></label>
        <label>Browser session token<input className="admin-input" type="password" value={sessionToken} onChange={(event) => setSessionToken(event.target.value)} placeholder="SUPER_ADMIN_SESSION_TOKEN" /></label>
        <label>Optional MFA / break-glass token<input className="admin-input" type="password" value={mfaToken} onChange={(event) => setMfaToken(event.target.value)} placeholder="SUPER_ADMIN_MFA_BYPASS_TOKEN" /></label>
      </div>
      <button className="primary" onClick={unlock}>Unlock Super Admin</button>
      <p className="admin-result">{message}</p>
      <div className="trust-row"><span>IP allowlist ready</span><span>CSRF enforced</span><span>Audit-required</span><span>Demo auth blocked in production</span></div>
    </section>
  );
}
