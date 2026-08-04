import { customerTenScorecards, getScaleReadiness, planRateLimits, productionScaleControls, scaleTargets } from '@/lib/production-scale';

export function ScaleReadinessConsole() {
  const readiness = getScaleReadiness();
  const plans = Object.entries(planRateLimits);
  return (
    <div className="scale-console">
      <section className="grid four">
        <div className="card rgb-card"><span className="badge premium">Concurrency Target</span><div className="kpi">{scaleTargets.concurrentUsers.toLocaleString()}</div><div className="kpi-label">concurrent users</div><p>Queue-first jobs, rate limits, signed downloads, and endpoint routing are designed for this launch target.</p></div>
        <div className="card rgb-card"><span className="badge blue">P95 Page</span><div className="kpi">{scaleTargets.p95PageMs}ms</div><div className="kpi-label">target latency</div><p>Marketing, dashboard, billing, and review pages stay fast while heavy jobs run on workers.</p></div>
        <div className="card rgb-card"><span className="badge green">Readiness</span><div className="kpi">{readiness.readinessPercent}%</div><div className="kpi-label">package score</div><p>{readiness.status.replaceAll('_', ' ')}</p></div>
        <div className="card rgb-card"><span className="badge red">SLO</span><div className="kpi">{scaleTargets.targetAvailability}</div><div className="kpi-label">availability target</div><p>Health checks, circuit breakers, audit events, and operational runbooks are included.</p></div>
      </section>

      <section className="grid two admin-main-grid">
        <div className="card">
          <span className="badge premium">Production scale controls</span>
          <h2>2000-user traffic protection layer</h2>
          <p className="muted">These controls make CineLoom safe to demo and launch with high traffic while real execution is plugged in through endpoints.</p>
          <div className="connector-groups">
            {productionScaleControls.map((control) => (
              <details className="connector-group" key={control.key} open={['edge_rate_limits','queue_worker_offload','token_transactions'].includes(control.key)}>
                <summary><strong>{control.label}</strong><span>{control.productionEndpoint}</span></summary>
                <div className="scale-control-body">
                  <p>{control.purpose}</p>
                  <div className="detail-grid">
                    <div><strong>Target</strong><span>{control.target}</span></div>
                    <div><strong>Super Admin Control</strong><span>{control.superAdminControl}</span></div>
                    <div><strong>Production Endpoint</strong><span>{control.productionEndpoint}</span></div>
                    <div><strong>10/10 Impact</strong><span>{control.rankImpact}</span></div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="card sticky-panel">
          <span className="badge green">Plan-aware limits</span>
          <h2>Fair-share SaaS capacity</h2>
          <p className="muted">Limits are intentionally higher for paid and enterprise plans. Back these with Redis or your edge platform in production.</p>
          <div className="scale-plan-list">
            {plans.map(([plan, limits]) => (
              <div className="scale-plan" key={plan}>
                <strong>{plan.replaceAll('_', ' ')}</strong>
                <span>{limits.rpm} rpm · {limits.concurrentJobs} concurrent jobs · {limits.dailyTokenCeiling.toLocaleString()} daily token ceiling</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <span className="badge blue">10/10 customer ranking targets</span>
        <h2>Every audience has a production promise</h2>
        <div className="grid four scalability-grid">
          {customerTenScorecards.map((item) => (
            <div className="card mini-proof" key={item.audience}>
              <h3>{item.audience}</h3>
              <div className="score-pill">{item.score}/10</div>
              <p>{item.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <span className="badge red">Configuration gap</span>
        <h2>Live services still required at deployment</h2>
        {readiness.missingEnv.length ? (
          <div className="env-list">{readiness.missingEnv.map((name) => <code key={name}>{name}</code>)}</div>
        ) : <p className="muted">All critical live-service environment variables are configured.</p>}
        <p className="rail-small">The package is production-structured. A real 10/10 live launch requires configuring these services in Vercel and connecting the Super Admin endpoint console.</p>
      </section>
    </div>
  );
}
