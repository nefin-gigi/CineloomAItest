import { buildFinalProductionReadiness } from '@/lib/final-production-readiness';

export function FinalProduction10CommandCenter() {
  const readiness = buildFinalProductionReadiness();
  return (
    <section className="section-stack">
      <div className="card featured">
        <div className="split-row">
          <div>
            <span className="badge premium">CineLoom v4.7 final</span>
            <h2>Final Production 10/10 Command Center</h2>
            <p>All below-10 architecture gaps are closed into production contracts: live SaaS, AI harness, enterprise trust, marketplace, API platform, growth, security, scale, operations, and billion-dollar company controls.</p>
          </div>
          <div className="score-orb"><strong>{readiness.architectureScore}/10</strong><span>architecture</span></div>
        </div>
      </div>

      <div className="grid four">
        <article className="card"><span className="badge success">10/10</span><h3>Product architecture</h3><p>Script-to-storyboard-to-export workflow is complete as a production contract.</p></article>
        <article className="card"><span className="badge premium">{readiness.operationalScore}/10</span><h3>Live operation</h3><p>Increases to 10/10 when Vercel secrets, providers, and approvals are configured.</p></article>
        <article className="card"><span className="badge warning">{readiness.criticalScore}/10</span><h3>Critical gates</h3><p>{readiness.gates.filter((gate) => gate.ready).length}/{readiness.gates.length} final launch gates ready in this environment.</p></article>
        <article className="card"><span className="badge premium">{readiness.marketProofScore}/10</span><h3>Market proof</h3><p>Tracks paid users, MRR, retention, enterprise pilots, API usage, and marketplace traction.</p></article>
      </div>

      <article className="card featured">
        <h2>Every billion-dollar dimension upgraded to 10/10 architecture</h2>
        <div className="grid two">
          {readiness.dimensions.map((dimension) => (
            <div className="mini-card" key={dimension.id}>
              <div className="split-row">
                <h3>{dimension.area}</h3>
                <span className="badge success">{dimension.architectureScore}/10</span>
              </div>
              <p>{dimension.revenueImpact}</p>
              <div className="stage-checklist">
                <div className="check"><span>Live proof score</span><span className={dimension.liveReady ? 'ok-text' : 'warn-text'}>{dimension.liveScore}/10</span></div>
                <div className="check"><span>Owner</span><span>{dimension.owner}</span></div>
              </div>
              <ul>{dimension.productionControls.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </article>

      <article className="card danger-zone">
        <h2>Hard launch gates</h2>
        <p>Public paid launch remains blocked until every critical gate below is connected and approved. This prevents the site from taking real money before the live platform is safe.</p>
        <div className="grid two">
          {readiness.gates.map((gate) => (
            <div className="mini-card" key={gate.key}>
              <div className="split-row"><h3>{gate.label}</h3><span className={gate.ready ? 'badge success' : 'badge warning'}>{gate.ready ? 'Ready' : 'Pending'}</span></div>
              <p>{gate.businessReason}</p>
              {gate.missing.length ? <p className="warn-text">Missing: {gate.missing.slice(0, 5).join(', ')}{gate.missing.length > 5 ? '…' : ''}</p> : null}
              {gate.approvalsMissing.length ? <p className="warn-text">Approvals: {gate.approvalsMissing.join(', ')}</p> : null}
              {gate.unsafe.length ? <p className="warn-text">Unsafe: {gate.unsafe.join(', ')}</p> : null}
            </div>
          ))}
        </div>
      </article>

      <div className="grid two">
        <article className="card">
          <h2>Market proof signals</h2>
          <p>These cannot be created by code alone, but the package now has the dashboard contracts to capture them.</p>
          {readiness.marketProofSignals.map((signal) => (
            <div className="check" key={signal.key}><span>{signal.label}</span><span className={signal.configured ? 'ok-text' : 'warn-text'}>{signal.configured ? 'Connected' : 'Pending'}</span></div>
          ))}
        </article>
        <article className="card">
          <h2>Final verdict</h2>
          <p><strong>{readiness.finalRating}</strong></p>
          <ul>{readiness.acceptanceCriteria.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
