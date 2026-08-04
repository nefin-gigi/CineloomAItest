const trust = [
  ['Private by design', 'Script privacy, signed exports, workspace ownership, and no-training controls are placed close to conversion moments.'],
  ['Production controls', 'Launch gates, endpoint readiness, token governance, and Super Admin operations are designed for serious SaaS execution.'],
  ['Cinema-aware AI', 'AI harness, golden tests, provenance, safety checks, and director feedback loops support high-quality creative output.']
];

export function SaaSCinemaTrust() {
  return (
    <section className="saas-section trust-operating-layer" id="trust">
      <div>
        <span className="section-kicker">Trust layer</span>
        <h2>Premium design must also feel safe.</h2>
        <p className="section-lede">For scripts, pitches, and original film IP, the interface has to make privacy and control obvious without overwhelming the creative user.</p>
      </div>
      <div className="trust-stack">
        {trust.map(([title, body]) => (
          <article className="trust-stack-card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
