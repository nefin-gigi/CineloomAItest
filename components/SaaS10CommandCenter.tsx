import { customerSegments, launchGates, saas10Scores, saasOperatingPillars } from '@/lib/saas-10-platform';

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="badge premium">{children}</span>;
}

export function SaaS10CommandCenter() {
  return (
    <div className="grid">
      <section className="card featured">
        <div className="eyebrow">SaaS 10/10 operating system</div>
        <h2>Film-industry revenue platform scorecard</h2>
        <p>
          This console converts CineLoom from a feature demo into a SaaS operating model: acquisition, activation, subscriptions, tokens, secure exports, endpoint execution, support, enterprise trust and scale operations.
        </p>
        <div className="metrics-ribbon">
          <div className="metric-pill"><strong>10/10</strong><span>Demo UX target</span></div>
          <div className="metric-pill"><strong>2,000</strong><span>Concurrent-user launch target</span></div>
          <div className="metric-pill"><strong>12</strong><span>SaaS score areas</span></div>
          <div className="metric-pill"><strong>7</strong><span>Production launch gates</span></div>
        </div>
        <div className="hero-badges">
          <Pill>Free sample funnel</Pill>
          <Pill>Token economics</Pill>
          <Pill>Enterprise trust</Pill>
          <Pill>Endpoint execution</Pill>
          <Pill>Support ops</Pill>
          <Pill>Growth loops</Pill>
        </div>
      </section>

      <section className="grid three">
        {saasOperatingPillars.map((pillar) => {
          const [title, text] = pillar.split(': ');
          return (
            <div className="card" key={pillar}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          );
        })}
      </section>

      <section className="card">
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Rankings</div>
            <h2>Every customer-facing capability mapped to 10/10</h2>
          </div>
          <span className="status approved">Endpoint-ready</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Audience</th>
                <th>Score</th>
                <th>Production control</th>
                <th>Endpoint contract</th>
              </tr>
            </thead>
            <tbody>
              {saas10Scores.map((row) => (
                <tr key={row.area}>
                  <td><strong>{row.area}</strong><br /><span className="muted">{row.customerValue}</span></td>
                  <td>{row.audience}</td>
                  <td><span className="status approved">{row.score}</span><br /><span className="muted">{row.status}</span></td>
                  <td>{row.productionControl}</td>
                  <td>{row.endpointContract}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Customer perspective</div>
            <h2>Film audience readiness</h2>
          </div>
          <span className="status ready">Customer value mapped</span>
        </div>
        <div className="grid two">
          {customerSegments.map((segment) => (
            <div className="card" key={segment.segment}>
              <div className="pipeline-header">
                <h3>{segment.segment}</h3>
                <span className="status approved">{segment.score}</span>
              </div>
              <p><strong>Promise:</strong> {segment.promise}</p>
              <p><strong>Conversion:</strong> {segment.conversion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card featured">
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Launch gates</div>
            <h2>Production go/no-go gates</h2>
          </div>
          <span className="status needs-review">Must pass before public paid launch</span>
        </div>
        <div className="checklist">
          {launchGates.map((gate) => (
            <div className="check" key={gate.gate}>
              <span><strong>{gate.gate}</strong><br /><span className="muted">{gate.requirement}</span><br /><span className="muted">Pass: {gate.passCondition}</span></span>
              <span className="status draft">{gate.owner}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
