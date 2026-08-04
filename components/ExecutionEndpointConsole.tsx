'use client';

import { useMemo, useState } from 'react';
import { endpointWorkflowMap, executionEndpointCatalog, tenOutOfTenCustomerTargets } from '@/lib/execution-endpoints';

type ApiResult = {
  ok?: boolean;
  status?: string;
  message?: string;
  missingEnv?: string[];
  missingResponseKeys?: string[];
  sampleResponse?: unknown;
  payloadPreview?: unknown;
  response?: unknown;
  savedContract?: unknown;
};

function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function ExecutionEndpointConsole() {
  const [selectedStage, setSelectedStage] = useState('storyboard_generate');
  const selected = useMemo(() => executionEndpointCatalog.find((item) => item.key === selectedStage) ?? executionEndpointCatalog[0], [selectedStage]);
  const [payloadText, setPayloadText] = useState(pretty(selected.samplePayload));
  const [result, setResult] = useState<ApiResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  function chooseStage(stage: string) {
    const endpoint = executionEndpointCatalog.find((item) => item.key === stage) ?? executionEndpointCatalog[0];
    setSelectedStage(endpoint.key);
    setPayloadText(pretty(endpoint.samplePayload));
    setResult(null);
  }

  function parsePayload() {
    try {
      return JSON.parse(payloadText);
    } catch {
      return selected.samplePayload;
    }
  }

  async function dryRun() {
    setRunning(true);
    setResult({ status: 'testing', message: 'Running endpoint contract dry run...' });
    try {
      const response = await fetch('/api/super-admin/execution-endpoints/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: selected.key, payload: parsePayload(), dryRun: true })
      });
      setResult(await response.json());
    } catch (error) {
      setResult({ ok: false, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setRunning(false);
    }
  }

  async function liveReadyCheck() {
    setRunning(true);
    setResult({ status: 'checking', message: 'Checking whether this stage has endpoint URL and secret configured...' });
    try {
      const response = await fetch('/api/super-admin/execution-endpoints/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: selected.key, payload: parsePayload(), dryRun: false })
      });
      setResult(await response.json());
    } catch (error) {
      setResult({ ok: false, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setRunning(false);
    }
  }

  async function saveContract() {
    setSaving(true);
    setResult({ status: 'saving', message: 'Saving execution endpoint contract...' });
    try {
      const response = await fetch('/api/super-admin/execution-endpoints/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: selected.key,
          endpointUrlEnv: selected.defaultUrlEnv,
          secretEnvName: selected.defaultSecretEnv,
          authMode: selected.defaultAuthMode,
          timeoutMs: selected.timeoutMs,
          tokenPolicy: selected.tokenPolicy,
          requiredResponseKeys: selected.requiredResponseKeys
        })
      });
      setResult(await response.json());
    } catch (error) {
      setResult({ ok: false, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setSaving(false);
    }
  }

  const grouped = useMemo(() => endpointWorkflowMap.map((workflow) => ({
    ...workflow,
    endpointDetails: workflow.endpoints.map((key) => executionEndpointCatalog.find((endpoint) => endpoint.key === key)).filter(Boolean)
  })), []);

  return (
    <div className="execution-console">
      <section className="grid four">
        <div className="card rgb-card"><span className="badge premium">Execution Layer</span><div className="kpi">{executionEndpointCatalog.length}</div><div className="kpi-label">UI-to-endpoint contracts</div><p>Every major customer action can be fulfilled by a configurable endpoint.</p></div>
        <div className="card rgb-card"><span className="badge green">Plug & Play</span><div className="kpi">100%</div><div className="kpi-label">endpoint-driven backend</div><p>Script parsing, storyboard generation, corrections, exports, billing, tokens, and storage can be connected without changing the UI flow.</p></div>
        <div className="card rgb-card"><span className="badge blue">Safety</span><div className="kpi">3-step</div><div className="kpi-label">token protection</div><p>Reserve tokens before jobs, commit on success, refund on failure.</p></div>
        <div className="card rgb-card"><span className="badge red">Quality</span><div className="kpi">10/10</div><div className="kpi-label">target controls</div><p>Each endpoint lists the customer impact needed to reach top-tier SaaS expectations.</p></div>
      </section>

      <section className="grid two admin-main-grid">
        <div className="card">
          <div className="split-heading"><div><span className="badge blue">UI execution map</span><h2>Customer action → endpoint chain</h2></div><button className="btn ghost" onClick={() => setAdvanced(!advanced)}>{advanced ? 'Hide payload detail' : 'Show payload detail'}</button></div>
          <div className="endpoint-workflows">
            {grouped.map((workflow) => (
              <details key={workflow.uiStage} className="connector-group" open={workflow.uiStage.includes('Full script') || workflow.uiStage.includes('Prompt')}>
                <summary><strong>{workflow.uiStage}</strong><span>{workflow.endpoints.length} endpoints</span></summary>
                <div className="endpoint-chip-row">
                  {workflow.endpointDetails.map((endpoint) => endpoint && (
                    <button className={`endpoint-chip ${selected.key === endpoint.key ? 'active' : ''}`} key={endpoint.key} onClick={() => chooseStage(endpoint.key)}>
                      <strong>{endpoint.label}</strong>
                      <small>{endpoint.tokenPolicy}</small>
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="card sticky-panel">
          <span className="badge premium">Selected execution endpoint</span>
          <h2>{selected.label}</h2>
          <p className="muted">{selected.customerPromise}</p>
          <div className="detail-grid">
            <div><strong>Stage key</strong><span>{selected.key}</span></div>
            <div><strong>Token policy</strong><span>{selected.tokenPolicy}</span></div>
            <div><strong>Auth mode</strong><span>{selected.defaultAuthMode}</span></div>
            <div><strong>Timeout</strong><span>{selected.timeoutMs.toLocaleString()} ms</span></div>
          </div>
          <h3>Required Vercel environment variables</h3>
          <div className="env-list"><code>{selected.defaultUrlEnv}</code><code>{selected.defaultSecretEnv}</code></div>
          <h3>Required response keys</h3>
          <div className="env-list">{selected.requiredResponseKeys.map((key) => <code key={key}>{key}</code>)}</div>
          <p className="admin-result"><strong>10/10 impact</strong><br />{selected.tenOutOfTenImpact}</p>
          <div className="v2-command-row"><button className="btn" onClick={dryRun} disabled={running}>Dry-run test</button><button className="btn secondary" onClick={liveReadyCheck} disabled={running}>Configured/live check</button><button className="btn ghost" onClick={saveContract} disabled={saving}>Save contract</button></div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <span className="badge green">Endpoint payload tester</span>
          <h2>Sample request payload</h2>
          <textarea className="admin-textarea" value={payloadText} onChange={(event) => setPayloadText(event.target.value)} />
          <p className="rail-small">Use dry-run to validate payload shape without calling any provider. Set <code>EXECUTION_ENDPOINT_TEST_MODE=live</code> only after your endpoint is secure, rate-limited, and ready.</p>
        </div>
        <div className="card">
          <span className="badge red">Result / contract response</span>
          <h2>Endpoint test output</h2>
          {result ? <pre className="admin-json">{pretty(result)}</pre> : <p className="muted">Select an endpoint and run a dry-run test to see the contract response.</p>}
        </div>
      </section>

      <section className="card">
        <span className="badge premium">Customer-ranking closure</span>
        <h2>What makes every segment target 10/10</h2>
        <div className="grid four scalability-grid">
          {tenOutOfTenCustomerTargets.map((target) => (
            <div className="card mini-proof" key={target.area}>
              <h3>{target.area}</h3>
              <p>{target.target}</p>
              <small>Primary endpoint: {target.executionEndpoint}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
