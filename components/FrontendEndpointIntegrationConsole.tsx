'use client';

import { useMemo, useState } from 'react';
import { frontendEndpointActions, frontendActionGroups } from '@/lib/frontend-endpoint-registry';

type RouterResponse = {
  ok?: boolean;
  status?: string;
  message?: string;
  router?: unknown;
  action?: unknown;
  statusSummary?: {
    status?: string;
    readinessPercent?: number;
    missingEnv?: string[];
  };
  endpointResults?: unknown[];
  savedContract?: unknown;
  envTemplate?: string;
  [key: string]: unknown;
};

function format(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function FrontendEndpointIntegrationConsole() {
  const [selectedKey, setSelectedKey] = useState('cta_create_free_storyboard');
  const selected = useMemo(() => frontendEndpointActions.find((action) => action.key === selectedKey) ?? frontendEndpointActions[0], [selectedKey]);
  const [payloadText, setPayloadText] = useState(format(selected.samplePayload));
  const [result, setResult] = useState<RouterResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [showEnv, setShowEnv] = useState(false);

  function chooseAction(key: string) {
    const action = frontendEndpointActions.find((item) => item.key === key) ?? frontendEndpointActions[0];
    setSelectedKey(action.key);
    setPayloadText(format(action.samplePayload));
    setResult(null);
  }

  function parsePayload() {
    try {
      return JSON.parse(payloadText);
    } catch {
      return selected.samplePayload;
    }
  }

  async function callApi(path: string, body?: Record<string, unknown>) {
    setBusy(true);
    setResult({ status: 'working', message: 'Checking frontend endpoint router...' });
    try {
      const response = await fetch(path, body ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      } : undefined);
      const isText = response.headers.get('content-type')?.includes('text/plain');
      setResult(isText ? { ok: response.ok, envTemplate: await response.text() } : await response.json());
    } catch (error) {
      setResult({ ok: false, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setBusy(false);
    }
  }

  const requiredLinks = frontendEndpointActions.filter((action) => action.mode === 'endpoint_required' || action.mode === 'admin_only').length;
  const publicLinks = frontendEndpointActions.filter((action) => action.surface === 'public_marketing' || action.surface === 'public_conversion').length;

  return (
    <div className="fer-console">
      <section className="fer-hero-card">
        <div>
          <span className="fer-pill blue">Frontend Endpoint Router</span>
          <h2>Connect every visible CineLoom link to a backend endpoint.</h2>
          <p>
            Keep the customer-facing UI simple while Super Admin controls the API route, backend execution chain,
            Vercel environment variables, test payload, fallback behavior, and launch readiness for each link.
          </p>
        </div>
        <div className="fer-stat-grid">
          <div><strong>{frontendEndpointActions.length}</strong><span>mapped actions</span></div>
          <div><strong>{publicLinks}</strong><span>public links</span></div>
          <div><strong>{requiredLinks}</strong><span>live-required actions</span></div>
        </div>
      </section>

      <section className="fer-layout">
        <div className="fer-panel">
          <div className="fer-panel-head">
            <div>
              <span className="fer-pill green">Simple UI map</span>
              <h3>Frontend action library</h3>
            </div>
            <button className="fer-button ghost" type="button" onClick={() => callApi('/api/super-admin/frontend-endpoints')} disabled={busy}>Refresh readiness</button>
          </div>
          <div className="fer-groups">
            {frontendActionGroups.map((group) => (
              <details key={group.label} open className="fer-group">
                <summary><strong>{group.label}</strong><span>{group.actions.length} actions</span></summary>
                <p>{group.description}</p>
                <div className="fer-action-list">
                  {group.actions.map((key) => {
                    const action = frontendEndpointActions.find((item) => item.key === key);
                    if (!action) return null;
                    return (
                      <button key={action.key} type="button" className={selected.key === action.key ? 'active' : ''} onClick={() => chooseAction(action.key)}>
                        <span><strong>{action.label}</strong><small>{action.href}</small></span>
                        <b>{action.mode.replace(/_/g, ' ')}</b>
                      </button>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>

        <aside className="fer-panel fer-sticky">
          <span className="fer-pill red">Selected link</span>
          <h3>{selected.label}</h3>
          <p>{selected.userIntent}</p>
          <div className="fer-detail-grid">
            <div><strong>Frontend URL</strong><span>{selected.href}</span></div>
            <div><strong>Frontend action key</strong><span>{selected.key}</span></div>
            <div><strong>API route</strong><span>{selected.method} {selected.apiRoute}</span></div>
            <div><strong>Mode</strong><span>{selected.mode.replace(/_/g, ' ')}</span></div>
          </div>
          <h4>Backend endpoint chain</h4>
          <div className="fer-chip-row">{selected.backendStages.map((stage) => <code key={stage}>{stage}</code>)}</div>
          <h4>Required Vercel env</h4>
          <div className="fer-chip-row">{selected.requiredEnv.map((key) => <code key={key}>{key}</code>)}</div>
          <div className="fer-result-note"><strong>Success:</strong> {selected.successResult}</div>
          <div className="fer-result-note"><strong>Fallback:</strong> {selected.fallbackBehavior}</div>
          <div className="fer-actions">
            <button className="fer-button" type="button" disabled={busy} onClick={() => callApi('/api/super-admin/frontend-endpoints/test', { actionKey: selected.key, dryRun: true, payload: parsePayload() })}>Dry-run action</button>
            <button className="fer-button secondary" type="button" disabled={busy} onClick={() => callApi('/api/super-admin/frontend-endpoints/test', { actionKey: selected.key, dryRun: false, payload: parsePayload() })}>Configured check</button>
            <button className="fer-button ghost" type="button" disabled={busy} onClick={() => callApi('/api/super-admin/frontend-endpoints/save', { actionKey: selected.key })}>Save contract</button>
          </div>
        </aside>
      </section>

      <section className="fer-layout two-equal">
        <div className="fer-panel">
          <span className="fer-pill blue">Payload</span>
          <h3>Sample frontend request</h3>
          <textarea value={payloadText} onChange={(event) => setPayloadText(event.target.value)} />
          <p className="fer-small">This payload is what your frontend action sends to the API route. Backend complexity remains behind the Super Admin endpoint contract.</p>
        </div>
        <div className="fer-panel">
          <div className="fer-panel-head">
            <div>
              <span className="fer-pill green">Result</span>
              <h3>Test and readiness output</h3>
            </div>
            <button className="fer-button ghost" type="button" onClick={() => { setShowEnv(true); void callApi('/api/super-admin/frontend-endpoints/env-template'); }} disabled={busy}>Env template</button>
          </div>
          {result ? <pre>{showEnv && result.envTemplate ? result.envTemplate : format(result)}</pre> : <div className="fer-empty">Select a link and run a dry test. Results will appear here.</div>}
        </div>
      </section>

      <section className="fer-panel">
        <span className="fer-pill blue">Frontend implementation pattern</span>
        <h3>How developers use this</h3>
        <div className="fer-step-grid">
          <div><strong>1. Add action key</strong><p>Every nav link, CTA, form, and dashboard action gets a stable <code>actionKey</code>.</p></div>
          <div><strong>2. Map API route</strong><p>Super Admin maps that action to the right route, such as storyboard generation, checkout, or export.</p></div>
          <div><strong>3. Add env vars</strong><p>Backend providers are connected in Vercel by URL and secret, not hardcoded in UI code.</p></div>
          <div><strong>4. Dry-run first</strong><p>Admin validates payloads and expected responses before turning on live execution.</p></div>
        </div>
      </section>
    </div>
  );
}
