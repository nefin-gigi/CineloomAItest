'use client';

import { useState } from 'react';
import {
  apiProducts,
  billionDollarRoadmap,
  billionReadinessScores,
  enterpriseTrustControls,
  filmIntegrations,
  flagshipDemoScenes,
  growthLoops,
  marketplaceCatalog,
  platformMoats,
  revenueStreams
} from '@/lib/billion-platform-data';

export function BillionDollarPlatformConsole() {
  const [active, setActive] = useState('magic');
  const [actionLog, setActionLog] = useState('Ready to run platform-scale demo action.');

  async function runDemoAction(action: string) {
    setActionLog(`Running ${action} through endpoint-ready platform layer...`);
    try {
      const response = await fetch('/api/platform/billion-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const json = await response.json();
      setActionLog(json.message ?? `${action} completed.`);
    } catch (error) {
      setActionLog(error instanceof Error ? error.message : 'Demo action failed.');
    }
  }

  return (
    <div className="billion-console">
      <section className="card featured billion-hero">
        <div>
          <span className="badge premium">CineLoom v3.3</span>
          <h2>Billion-dollar platform command center</h2>
          <p className="muted">This layer turns CineLoom from a storyboard SaaS into a platform: marketplace, API, enterprise trust, film integrations, viral share/remix loops, and endpoint-driven execution.</p>
          <div className="launch-actions">
            <button className="btn primary" onClick={() => runDemoAction('free-to-paid magic moment')}>Run magic moment</button>
            <button className="btn" onClick={() => runDemoAction('marketplace revenue check')}>Check marketplace</button>
            <button className="btn" onClick={() => runDemoAction('enterprise trust pack')}>Generate trust pack</button>
          </div>
          <p className="success">{actionLog}</p>
        </div>
        <div className="score-grid">
          {billionReadinessScores.slice(0, 4).map((score) => (
            <div className="score-card" key={score.area}>
              <span className="badge green">10/10</span>
              <strong>{score.area}</strong>
              <div className="cinema-meter"><span style={{ width: `${score.score * 10}%` }} /></div>
              <small>{score.proof}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="tab-row platform-tabs">
        {[
          ['magic', 'Magic moment'],
          ['revenue', 'Revenue stack'],
          ['marketplace', 'Marketplace'],
          ['api', 'API platform'],
          ['enterprise', 'Trust'],
          ['integrations', 'Film integrations'],
          ['growth', 'Growth loops'],
          ['roadmap', 'Roadmap']
        ].map(([key, label]) => (
          <button key={key} className={`btn ${active === key ? 'primary' : 'ghost'}`} onClick={() => setActive(key)}>{label}</button>
        ))}
      </section>

      {active === 'magic' && (
        <section className="grid two">
          <div className="card">
            <span className="badge red">Flagship demo</span>
            <h2>One unforgettable 60-second proof scene</h2>
            <p className="muted">The demo standard: paste a scene and create a complete storyboard, animatic, and pitch package that feels production-worthy.</p>
            <div className="stage-checklist">
              {flagshipDemoScenes.map((item) => <div className="check" key={item.scene}><span><strong>{item.scene}</strong><small>{item.time} · {item.output}</small></span><span>Ready</span></div>)}
            </div>
          </div>
          <div className="card">
            <span className="badge blue">Defensibility</span>
            <h2>Platform moats</h2>
            {platformMoats.map((moat) => <div className="feature-row" key={moat.title}><strong>{moat.title}</strong><span>{moat.detail}</span><small>{moat.owner}</small></div>)}
          </div>
        </section>
      )}

      {active === 'revenue' && <RevenueStreamsTable />}
      {active === 'marketplace' && <MarketplaceGrid />}
      {active === 'api' && <ApiPlatformTable />}
      {active === 'enterprise' && <EnterpriseTrustGrid />}
      {active === 'integrations' && <FilmIntegrationsTable />}
      {active === 'growth' && <GrowthLoopsGrid />}
      {active === 'roadmap' && <RoadmapTimeline />}
    </div>
  );
}

export function RevenueStreamsTable() {
  return (
    <section className="card">
      <span className="badge green">Revenue architecture</span>
      <h2>Blended revenue model</h2>
      <div className="table-wrap"><table><thead><tr><th>Stream</th><th>Buyer</th><th>Pricing</th><th>Revenue lever</th></tr></thead><tbody>{revenueStreams.map((row) => <tr key={row.stream}><td><strong>{row.stream}</strong></td><td>{row.buyer}</td><td>{row.pricing}</td><td>{row.lever}</td></tr>)}</tbody></table></div>
    </section>
  );
}

export function MarketplaceGrid() {
  return (
    <section className="grid three">
      {marketplaceCatalog.map((item) => <div className="card mini-proof" key={item.name}><span className="badge premium">{item.type}</span><h3>{item.name}</h3><p>{item.usage}</p><div className="rail-row"><span>{item.seller}</span><strong>{item.price}</strong></div><small>Rating {item.rating} · Revenue-share ready</small></div>)}
    </section>
  );
}

export function ApiPlatformTable() {
  return (
    <section className="card">
      <span className="badge blue">Developer platform</span>
      <h2>Paid CineLoom APIs</h2>
      <div className="table-wrap"><table><thead><tr><th>API</th><th>Buyer</th><th>Unit</th><th>Status</th><th>Endpoint</th></tr></thead><tbody>{apiProducts.map((api) => <tr key={api.api}><td><strong>{api.api}</strong></td><td>{api.customer}</td><td>{api.unit}</td><td>{api.status}</td><td><code>{api.endpoint}</code></td></tr>)}</tbody></table></div>
    </section>
  );
}

export function EnterpriseTrustGrid() {
  return (
    <section className="grid two">
      {enterpriseTrustControls.map((control) => <div className="card" key={control.control}><span className="badge green">{control.level}</span><h3>{control.control}</h3><p className="muted">{control.description}</p></div>)}
    </section>
  );
}

export function FilmIntegrationsTable() {
  return (
    <section className="card">
      <span className="badge premium">Film pipeline integrations</span>
      <h2>Production ecosystem contracts</h2>
      <div className="table-wrap"><table><thead><tr><th>Integration</th><th>Use</th><th>Phase</th><th>Endpoint env</th></tr></thead><tbody>{filmIntegrations.map((item) => <tr key={item.name}><td><strong>{item.name}</strong></td><td>{item.use}</td><td>{item.phase}</td><td><code>{item.endpoint}</code></td></tr>)}</tbody></table></div>
    </section>
  );
}

export function GrowthLoopsGrid() {
  return (
    <section className="grid three">
      {growthLoops.map((loop) => <div className="card mini-proof" key={loop.loop}><span className="badge red">Growth loop</span><h3>{loop.loop}</h3><p>{loop.trigger}</p><small>{loop.conversion}</small></div>)}
    </section>
  );
}

export function RoadmapTimeline() {
  return (
    <section className="card">
      <span className="badge blue">Platform roadmap</span>
      <h2>Revenue scale path</h2>
      <div className="timeline big-timeline">{billionDollarRoadmap.map((item) => <div className="timeline-card" key={item.phase}><strong>{item.phase}</strong><span>{item.goal}</span><small>{item.items}</small></div>)}</div>
    </section>
  );
}
