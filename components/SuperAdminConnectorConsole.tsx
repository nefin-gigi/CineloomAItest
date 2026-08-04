'use client';

import { useMemo, useState } from 'react';
import { connectorCatalog, integrationCategories, productionBlockersClosed, featureFlagCatalog, scalabilityLayers } from '@/lib/integration-registry';

type TestResult = {
  ok?: boolean;
  status?: string;
  message?: string;
  missingEnv?: string[];
  displayName?: string;
  testedAt?: string;
};

const defaultEndpoint = {
  connectorId: 'image-router',
  endpointUrl: 'https://provider.example.com/v1/generate',
  authMode: 'bearer_env_secret',
  secretEnvName: 'IMAGE_PROVIDER_KEY',
  timeoutMs: '120000'
};

function groupByCategory() {
  return integrationCategories.map((category) => ({
    ...category,
    connectors: connectorCatalog.filter((connector) => connector.category === category.category)
  })).filter((group) => group.connectors.length > 0);
}

export function SuperAdminConnectorConsole() {
  const grouped = useMemo(groupByCategory, []);
  const [selectedId, setSelectedId] = useState(connectorCatalog[0]?.id ?? '');
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [saveMessage, setSaveMessage] = useState('No endpoint changes saved in this session.');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selected = connectorCatalog.find((connector) => connector.id === selectedId) ?? connectorCatalog[0];

  async function testConnector(id: string) {
    setTestResults((current) => ({ ...current, [id]: { status: 'testing', message: 'Testing connector contract...' } }));
    try {
      const response = await fetch(`/api/super-admin/connectors/test?connectorId=${encodeURIComponent(id)}`);
      const json = await response.json();
      setTestResults((current) => ({ ...current, [id]: json }));
    } catch (error) {
      setTestResults((current) => ({ ...current, [id]: { ok: false, status: 'error', message: error instanceof Error ? error.message : 'Unknown test failure' } }));
    }
  }

  async function saveEndpoint() {
    setSaveMessage('Saving connector configuration contract...');
    try {
      const response = await fetch('/api/super-admin/config/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endpoint)
      });
      const json = await response.json();
      setSaveMessage(json.message ?? 'Connector contract saved.');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Save failed.');
    }
  }

  return (
    <div className="super-admin-console">
      <section className="grid four">
        <div className="card rgb-card"><span className="badge premium">Super Admin</span><div className="kpi">{connectorCatalog.length}</div><div className="kpi-label">Plug-and-play connectors</div><p>Connect auth, DB, billing, storage, queues, AI providers, renderers, analytics, and support.</p></div>
        <div className="card rgb-card"><span className="badge green">Blockers</span><div className="kpi">{productionBlockersClosed.length}/10</div><div className="kpi-label">Production blockers mapped</div><p>Each blocker has a connector contract, environment keys, and implementation path.</p></div>
        <div className="card rgb-card"><span className="badge blue">Architecture</span><div className="kpi">8</div><div className="kpi-label">Scalable layers</div><p>Web, API, DB, storage, workers, provider router, billing, and observability.</p></div>
        <div className="card rgb-card"><span className="badge red">Control</span><div className="kpi">{featureFlagCatalog.length}</div><div className="kpi-label">Feature flags</div><p>Gate public launch, studio auth, token hard-stop, watermarks, providers, and enterprise mode.</p></div>
      </section>

      <section className="grid two">
        <div className="card featured">
          <span className="badge premium">Operator workflow</span>
          <h2>Plug-and-play production connectivity</h2>
          <p className="muted">Super admins can configure endpoint contracts, validate required environment variables, test connection readiness, and turn capabilities on without changing the customer-facing CineLoom workflow.</p>
          <div className="admin-flow">
            <span>Choose connector</span><b>→</b><span>Add env keys</span><b>→</b><span>Test</span><b>→</b><span>Enable flag</span><b>→</b><span>Go live</span>
          </div>
          <div className="v3-meter"><span style={{ width: '78%' }} /></div>
          <p className="rail-small">This console never stores raw secrets in the browser. Store secrets only in Vercel/Supabase/secret manager. The save action records connector metadata and expected env names.</p>
        </div>
        <div className="card">
          <h2>Production blocker closure matrix</h2>
          <div className="stage-checklist compact-list">
            {productionBlockersClosed.map((item) => (
              <div className="check" key={item.blocker}><span><strong>{item.blocker}</strong><small>{item.v3PlugPlayStatus}</small></span><span>{item.owner}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid two admin-main-grid">
        <div className="card">
          <div className="split-heading"><div><span className="badge blue">Connector registry</span><h2>Integration catalog</h2></div><button className="btn ghost" onClick={() => setShowAdvanced(!showAdvanced)}>{showAdvanced ? 'Hide advanced env' : 'Show advanced env'}</button></div>
          <div className="connector-groups">
            {grouped.map((group) => (
              <details key={group.category} className="connector-group" open={group.category === 'identity' || group.category === 'ai' || group.category === 'billing'}>
                <summary><strong>{group.label}</strong><span>{group.connectors.length} connectors</span></summary>
                <p className="rail-small">{group.description}</p>
                <div className="connector-list">
                  {group.connectors.map((connector) => {
                    const result = testResults[connector.id];
                    return (
                      <button key={connector.id} className={`connector-card ${selectedId === connector.id ? 'active' : ''}`} onClick={() => { setSelectedId(connector.id); setEndpoint((current) => ({ ...current, connectorId: connector.id, secretEnvName: connector.requiredEnv.find((env) => !env.includes('=')) ?? current.secretEnvName })); }}>
                        <span className={`status-dot ${result?.ok ? 'ready' : result?.status === 'testing' ? 'testing' : connector.recommended ? 'needs' : 'demo'}`} />
                        <strong>{connector.displayName}</strong>
                        <small>{connector.customerImpact}</small>
                        {showAdvanced && <code>{connector.requiredEnv.join(' · ')}</code>}
                      </button>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="card sticky-panel">
          <span className="badge premium">Selected connector</span>
          <h2>{selected.displayName}</h2>
          <p className="muted">{selected.purpose}</p>
          <div className="detail-grid">
            <div><strong>Production role</strong><span>{selected.productionRole}</span></div>
            <div><strong>Customer impact</strong><span>{selected.customerImpact}</span></div>
            <div><strong>Mode label</strong><span>{selected.connectedModeLabel}</span></div>
            <div><strong>Docs</strong><span>{selected.docsPath}</span></div>
          </div>
          <h3>Required environment variables</h3>
          <div className="env-list">{selected.requiredEnv.map((env) => <code key={env}>{env}</code>)}</div>
          {!!selected.optionalEnv?.length && <><h3>Optional environment variables</h3><div className="env-list">{selected.optionalEnv.map((env) => <code key={env}>{env}</code>)}</div></>}
          <div className="v2-command-row">
            <button className="btn" onClick={() => testConnector(selected.id)}>Test connector</button>
            <button className="btn secondary" onClick={() => setEndpoint((current) => ({ ...current, connectorId: selected.id }))}>Use in endpoint form</button>
          </div>
          {testResults[selected.id] && <div className="admin-result"><strong>{testResults[selected.id].status ?? 'result'}</strong><p>{testResults[selected.id].message}</p>{!!testResults[selected.id].missingEnv?.length && <code>Missing: {testResults[selected.id].missingEnv?.join(', ')}</code>}</div>}
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <span className="badge green">Endpoint connectivity interface</span>
          <h2>Register provider endpoint contract</h2>
          <p className="muted">Use this form to configure how CineLoom should call a provider. The production implementation should persist this metadata in the integration tables while secrets remain in environment variables.</p>
          <div className="form-grid">
            <label>Connector ID<input className="admin-input" value={endpoint.connectorId} onChange={(event) => setEndpoint({ ...endpoint, connectorId: event.target.value })} /></label>
            <label>Endpoint URL<input className="admin-input" value={endpoint.endpointUrl} onChange={(event) => setEndpoint({ ...endpoint, endpointUrl: event.target.value })} /></label>
            <label>Auth mode<select className="admin-input" value={endpoint.authMode} onChange={(event) => setEndpoint({ ...endpoint, authMode: event.target.value })}><option>bearer_env_secret</option><option>header_env_secret</option><option>signed_webhook</option><option>oauth_client_credentials</option><option>none_demo</option></select></label>
            <label>Secret env name<input className="admin-input" value={endpoint.secretEnvName} onChange={(event) => setEndpoint({ ...endpoint, secretEnvName: event.target.value })} /></label>
            <label>Timeout ms<input className="admin-input" value={endpoint.timeoutMs} onChange={(event) => setEndpoint({ ...endpoint, timeoutMs: event.target.value })} /></label>
          </div>
          <div className="v2-command-row"><button className="btn" onClick={saveEndpoint}>Save connector contract</button><button className="btn ghost" onClick={() => setEndpoint(defaultEndpoint)}>Reset</button></div>
          <p className="admin-result">{saveMessage}</p>
        </div>

        <div className="card">
          <span className="badge red">Feature flag console</span>
          <h2>Safe launch toggles</h2>
          <div className="table-wrap"><table><thead><tr><th>Flag</th><th>Current/demo</th><th>Production target</th></tr></thead><tbody>{featureFlagCatalog.map((flag) => <tr key={flag.key}><td><strong>{flag.key}</strong><br/><small>{flag.description}</small></td><td>{flag.current}</td><td>{flag.recommendedProduction}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section className="card">
        <span className="badge premium">Scalability</span>
        <h2>Flexible architecture layers</h2>
        <div className="grid four scalability-grid">{scalabilityLayers.map((layer) => <div className="card mini-proof" key={layer.layer}><h3>{layer.layer}</h3><p>{layer.design}</p><small>{layer.scaleMove}</small></div>)}</div>
      </section>
    </div>
  );
}
