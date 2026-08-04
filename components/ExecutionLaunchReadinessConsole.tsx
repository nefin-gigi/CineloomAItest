import { buildExecutionLaunchReadiness } from '@/lib/execution-launch-readiness';

export function ExecutionLaunchReadinessConsole() {
  const readiness = buildExecutionLaunchReadiness();
  return (
    <section className="section-stack">
      <div className={`card ${readiness.allReady ? 'featured' : 'danger-zone'}`}>
        <div className="split-row">
          <div>
            <span className="badge premium">CineLoom v4.5</span>
            <h2>Execution, exports, and Redis launch core</h2>
            <p>Implements public paid launch blockers 7, 8, and 9: live storyboard generation, live export rendering, and distributed rate limiting.</p>
          </div>
          <div className="score-orb"><strong>{readiness.allReady ? '10/10' : `${readiness.readinessPercent}%`}</strong><span>{readiness.allReady ? 'Ready' : 'Config pending'}</span></div>
        </div>
      </div>

      <div className="grid three">
        {readiness.items.map((item) => (
          <article className="card" key={item.id}>
            <div className="split-row"><h3>{item.label}</h3><span className={`badge ${item.ready ? 'success' : 'warning'}`}>{item.ready ? 'Ready' : 'Missing'}</span></div>
            <p>{item.customerImpact}</p>
            {!item.ready && (
              <div className="warning-box">
                <strong>Configure before paid launch</strong>
                <ul>{item.missingEnv.map((env) => <li key={env}><code>{env}</code></li>)}</ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <article className="card featured">
        <h2>Acceptance criteria</h2>
        <div className="stage-checklist">
          {readiness.acceptanceCriteria.map((item) => <div className="check" key={item}><span><strong>{item}</strong></span><span className="ok-text">Implemented</span></div>)}
        </div>
      </article>
    </section>
  );
}
