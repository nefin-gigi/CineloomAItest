import Link from 'next/link';
import { v2QaScoreCards, v2Readiness, v2SimpleStages } from '@/lib/v2-data';

export function ReviewRail() {
  return (
    <div className="review-rail-content">
      <div className="rail-card featured">
        <span className="badge premium">Version {v2Readiness.version}</span>
        <h3>Hollywood Demo Readiness</h3>
        <p>{v2Readiness.productPromise}</p>
        <div className="cinema-meter"><span style={{ width: `${v2Readiness.demoScore}%` }} /></div>
        <div className="rail-small">{v2Readiness.demoScore}% private demo score target</div>
      </div>
      <div className="rail-card next-action-card">
        <span className="badge">Next best action</span>
        <h3>Run one-click demo</h3>
        <p>Use the guided demo first. It hides complexity and shows the complete script-to-export story.</p>
        <Link className="btn primary" href="/studio/investor-demo">Start v3.0 demo</Link>
      </div>
      <div className="rail-section-title">8-stage director path</div>
      {v2SimpleStages.map((stage) => (
        <div className="rail-row" key={stage.id}>
          <span>{stage.label}</span>
          <strong>{stage.score}%</strong>
        </div>
      ))}
      <div className="rail-section-title">Customer score boosters</div>
      {v2QaScoreCards.slice(0, 4).map((item) => (
        <div className="rail-note" key={item.area}>
          <strong>{item.area}: {item.score}%</strong>
          <span>{item.finding}</span>
        </div>
      ))}
    </div>
  );
}
