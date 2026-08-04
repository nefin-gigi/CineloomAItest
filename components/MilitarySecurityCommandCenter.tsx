import { buildSecurityReadiness } from '@/lib/military-security';

export function MilitarySecurityCommandCenter() {
  const readiness = buildSecurityReadiness();
  const blockers = readiness.blockers.length ? readiness.blockers : ['No production configuration blockers detected by package policy.'];
  return (
    <div className="stack">
      <section className="hero-card">
        <p className="eyebrow">Military-level security posture</p>
        <h1>CineLoom Zero-Trust Security Command Center</h1>
        <p className="muted">A hardened control plane for film-industry IP: private scripts, provider credentials, token ledgers, exports, and Super Admin actions.</p>
        <div className="score-grid">
          <div><strong>{readiness.score}%</strong><span>Configured env score</span></div>
          <div><strong>{readiness.productionSafe ? 'PASS' : 'BLOCKED'}</strong><span>Production safety gate</span></div>
          <div><strong>{readiness.profile}</strong><span>Security profile</span></div>
        </div>
      </section>
      <section className="grid two">
        <div className="panel-card">
          <h2>Required controls</h2>
          <ul className="check-list">{readiness.requiredControls.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="panel-card">
          <h2>Current blockers</h2>
          <ul className="warning-list">{blockers.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section className="panel-card">
        <h2>Environment hardening matrix</h2>
        <div className="admin-table">
          {readiness.checks.map((check) => <div key={check.key} className="admin-row"><span>{check.key}</span><strong>{check.configured ? 'configured' : 'missing'}</strong></div>)}
        </div>
      </section>
    </div>
  );
}
