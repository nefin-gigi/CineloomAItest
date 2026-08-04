import { buildAIHarnessReadiness } from '@/lib/ai-harness';

export function AIHarnessCommandCenter() {
  const readiness = buildAIHarnessReadiness();
  return (
    <section className="section-stack">
      <div className="card featured">
        <div className="split-row">
          <div>
            <span className="badge premium">CineLoom v4.6</span>
            <h2>AI Harness Maturity Command Center</h2>
            <p>Production-grade AI governance for film output quality: prompt versions, golden tests, eval rubrics, provider benchmarks, red-team safety, provenance, human feedback, and model routing.</p>
          </div>
          <div className="score-orb"><strong>{readiness.architectureScore}/10</strong><span>AI harness architecture</span></div>
        </div>
      </div>

      <div className="grid three">
        <article className="card">
          <span className="badge success">10/10</span>
          <h3>Quality governance</h3>
          <p>Every generation stage can be scored before users see the result or before expensive exports are rendered.</p>
        </article>
        <article className="card">
          <span className="badge premium">Golden tests</span>
          <h3>{readiness.goldenTestCases.length} film test fixtures</h3>
          <p>Biblical epic, indie drama, YouTube short, and commercial fixtures protect output quality during model upgrades.</p>
        </article>
        <article className="card">
          <span className="badge warning">Live endpoints</span>
          <h3>{readiness.liveHarnessPercent}% configured</h3>
          <p>Configure live eval, provider benchmark, provenance, and safety endpoints before public paid launch.</p>
        </article>
      </div>

      <article className="card">
        <h2>AI harness capabilities</h2>
        <div className="grid two">
          {readiness.capabilities.map((capability) => (
            <div className="mini-card" key={capability.id}>
              <div className="split-row">
                <h3>{capability.label}</h3>
                <span className="badge success">{capability.score}/10</span>
              </div>
              <p>{capability.customerImpact}</p>
              <ul>
                {capability.productionAcceptance.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <article className="card featured">
        <h2>Automated eval rubrics</h2>
        <div className="grid three">
          {readiness.evalRubrics.map((rubric) => (
            <div className="mini-card" key={rubric.id}>
              <div className="split-row"><h3>{rubric.label}</h3><span className="badge premium">{Math.round(rubric.weight * 100)}%</span></div>
              <p>Pass threshold: <strong>{rubric.passThreshold}</strong></p>
              <ul>{rubric.criteria.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </article>

      <div className="grid two">
        <article className="card">
          <h2>Golden tests</h2>
          {readiness.goldenTestCases.map((test) => (
            <div className="stage-checklist" key={test.id}>
              <div className="check"><span><strong>{test.name}</strong><br />{test.genre} · {test.stage}</span><span className="ok-text">≥ {test.minimumScore}</span></div>
            </div>
          ))}
        </article>
        <article className="card">
          <h2>Provider benchmarks</h2>
          {readiness.providerBenchmarks.map((provider) => (
            <div className="stage-checklist" key={provider.provider}>
              <div className="check"><span><strong>{provider.provider}</strong><br />{provider.category} · quality {provider.qualityScore} · consistency {provider.consistencyScore}</span><span className="ok-text">Routable</span></div>
            </div>
          ))}
        </article>
      </div>

      <article className="card danger-zone">
        <h2>Live launch configuration still required</h2>
        <p>The harness architecture is 10/10. The live deployed product becomes operationally 10/10 after these endpoint variables are connected in Vercel.</p>
        <div className="grid two">
          {readiness.envChecks.map((env) => (
            <div className="check" key={env.key}><span><code>{env.key}</code></span><span className={env.configured ? 'ok-text' : 'warn-text'}>{env.configured ? 'Configured' : 'Pending'}</span></div>
          ))}
        </div>
      </article>
    </section>
  );
}
