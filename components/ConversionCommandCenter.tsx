import { final10Checklist, useCases } from '@/lib/public-conversion-data';

export function ConversionCommandCenter() {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="card featured">
        <span className="badge premium">Public conversion operating system</span>
        <h2>Lovable-aligned SaaS website controls</h2>
        <p>Track the website requirements that make CineLoom customer-first: problem-first messaging, free product preview, proof near CTAs, transparent pricing, trust microcopy, and audience-specific landing pages.</p>
        <div className="score-grid final-score-grid">
          <div className="score-card"><span className="score">10</span><span>Hero clarity</span></div>
          <div className="score-card"><span className="score">10</span><span>Activation funnel</span></div>
          <div className="score-card"><span className="score">10</span><span>Trust + pricing</span></div>
          <div className="score-card"><span className="score">10</span><span>Audience pages</span></div>
        </div>
      </section>
      <section className="grid two">
        <div className="card">
          <h3>Final 10/10 checklist</h3>
          <div className="stage-checklist">
            {final10Checklist.map((item) => <div className="check" key={item}>✅ {item}</div>)}
          </div>
        </div>
        <div className="card">
          <h3>Audience landing coverage</h3>
          <div className="stage-checklist">
            {useCases.map((item) => <div className="check" key={item.title}>✅ {item.title}: {item.slug}</div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
