import { final10Checklist } from '@/lib/public-conversion-data';

export function Final10Scorecard() {
  return (
    <section className="card featured final10-card">
      <span className="badge premium">Final SaaS 10/10 readiness layer</span>
      <h2>Public website, SaaS engine, endpoint execution, and film workflow are aligned.</h2>
      <div className="score-grid final-score-grid">
        <div className="score-card"><span className="score">10</span><span>Problem-first messaging</span></div>
        <div className="score-card"><span className="score">10</span><span>Free storyboard funnel</span></div>
        <div className="score-card"><span className="score">10</span><span>Trust and pricing clarity</span></div>
        <div className="score-card"><span className="score">10</span><span>Endpoint-ready execution</span></div>
      </div>
      <div className="stage-checklist">
        {final10Checklist.map((item) => <div className="check" key={item}>✅ {item}</div>)}
      </div>
    </section>
  );
}
