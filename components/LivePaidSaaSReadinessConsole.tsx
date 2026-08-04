import { buildLivePaidSaasReadiness } from '@/lib/live-paid-saas';

const categoryLabels: Record<string, string> = {
  identity: 'Identity',
  data: 'Database',
  billing: 'Billing',
  tokens: 'Tokens',
  storage: 'Storage',
  queue: 'Queues',
  ai: 'AI Execution',
  exports: 'Exports',
  analytics: 'Analytics',
  security: 'Security',
  support: 'Support',
  legal: 'Legal/IP'
};

export function LivePaidSaaSReadinessConsole() {
  const readiness = buildLivePaidSaasReadiness();
  const grouped = readiness.checks.reduce<Record<string, typeof readiness.checks>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="section-stack">
      <div className={`card ${readiness.liveReady ? 'featured' : 'danger-zone'}`}>
        <div className="split-row">
          <div>
            <span className="badge premium">CineLoom v4.4</span>
            <h2>Live paid SaaS readiness command center</h2>
            <p>{readiness.rating}</p>
          </div>
          <div className="score-orb">
            <strong>{readiness.liveReady ? '10/10' : `${readiness.score}%`}</strong>
            <span>{readiness.liveReady ? 'Launch-ready' : 'Needs live config'}</span>
          </div>
        </div>
        <div className="grid four compact-grid">
          <div className="metric-card"><strong>{readiness.criticalReady}/{readiness.criticalTotal}</strong><span>critical systems</span></div>
          <div className="metric-card"><strong>{readiness.totalReady}/{readiness.totalChecks}</strong><span>total services</span></div>
          <div className="metric-card"><strong>{readiness.publicPaymentsEnabled ? 'On' : 'Off'}</strong><span>public checkout</span></div>
          <div className="metric-card"><strong>{readiness.paidLaunchEnabled ? 'On' : 'Off'}</strong><span>paid launch gate</span></div>
        </div>
        {!readiness.liveReady && (
          <div className="warning-box">
            <strong>Launch protection is active.</strong>
            <p>Paid checkout, token-consuming generation, and public launch actions should stay blocked until every critical live service is configured and the launch gate passes.</p>
          </div>
        )}
      </div>

      <section className="grid two">
        {Object.entries(grouped).map(([category, items]) => {
          const ready = items.filter((item) => item.configured).length;
          return (
            <article className="card" key={category}>
              <div className="split-row">
                <h3>{categoryLabels[category] ?? category}</h3>
                <span className={`badge ${ready === items.length ? 'success' : 'warning'}`}>{ready}/{items.length}</span>
              </div>
              <div className="stage-checklist">
                {items.map((item) => (
                  <div className="check" key={item.id}>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.customerImpact}</small>
                    </span>
                    <span className={item.configured ? 'ok-text' : 'danger-text'}>{item.configured ? 'Ready' : item.status}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="card featured">
        <h2>10/10 paid SaaS acceptance criteria</h2>
        <div className="grid two">
          {readiness.acceptanceCriteria.map((item) => (
            <div className="package-item" key={item}><strong>{item}</strong><span>Required for live paid launch</span></div>
          ))}
        </div>
      </section>
    </section>
  );
}
