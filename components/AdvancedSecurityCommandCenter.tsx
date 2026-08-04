import { buildAdvancedSecurityReadiness } from '@/lib/advanced-security';

const categoryLabels: Record<string, string> = {
  identity: 'Identity & Access',
  network: 'Network / Edge',
  data: 'Data Protection',
  application: 'Application Security',
  ai: 'AI Security',
  operations: 'Security Operations',
  compliance: 'Compliance Evidence'
};

export function AdvancedSecurityCommandCenter() {
  const readiness = buildAdvancedSecurityReadiness();
  const grouped = readiness.controls.reduce<Record<string, typeof readiness.controls>>((acc, control) => {
    acc[control.category] = acc[control.category] ?? [];
    acc[control.category].push(control);
    return acc;
  }, {});

  return (
    <div className="stack">
      <section className="hero-card">
        <p className="eyebrow">v4.8 defense-in-depth upgrade</p>
        <h1>Advanced Security Command Center</h1>
        <p className="muted">
          A stricter production security layer for private film IP, paid AI generation, enterprise studios, marketplace payouts,
          developer APIs, and Super Admin operations.
        </p>
        <div className="score-grid">
          <div><strong>{readiness.score}%</strong><span>Advanced controls configured</span></div>
          <div><strong>{readiness.ok ? 'PASS' : 'BLOCKED'}</strong><span>Production security decision</span></div>
          <div><strong>{readiness.total}</strong><span>Defense layers tracked</span></div>
        </div>
      </section>

      <section className="grid two">
        <div className="panel-card">
          <h2>Required before public paid launch</h2>
          <ul className="check-list">
            {readiness.requiredBeforePublicPaidLaunch.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="panel-card">
          <h2>Current production blockers</h2>
          {readiness.blockers.length ? (
            <ul className="warning-list">
              {readiness.blockers.map((blocker) => <li key={blocker.id}>{blocker.name}: {blocker.env.join(', ')}</li>)}
            </ul>
          ) : <p className="muted">No advanced-security blockers detected.</p>}
        </div>
      </section>

      {Object.entries(grouped).map(([category, controls]) => (
        <section className="panel-card" key={category}>
          <h2>{categoryLabels[category] ?? category}</h2>
          <div className="admin-table">
            {controls.map((control) => (
              <div className="admin-row" key={control.id}>
                <span>
                  <strong>{control.name}</strong><br />
                  <small className="muted">{control.detail}</small>
                </span>
                <strong>{control.configured ? 'configured' : 'missing'}</strong>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
