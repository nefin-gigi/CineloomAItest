import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { v2QaScoreCards } from '@/lib/v2-data';

export default function QaPage() {
  const average = Math.round(v2QaScoreCards.reduce((sum, item) => sum + item.score, 0) / v2QaScoreCards.length);
  return (
    <AppShell active="QA Center">
      <PageHeader eyebrow="Auto QA" title="v2 Customer Experience & Production QA">
        Scores the experience from a film customer angle: ease of use, film credibility, storyboard proof, animatic readiness, producer export value, and investor confidence.
      </PageHeader>
      <div className="hero-card card featured">
        <div>
          <span className="badge premium">v2 Quality Score</span>
          <h2 style={{ fontSize: '4rem', letterSpacing: '-0.08em', margin: '10px 0' }}>{average}/100</h2>
          <p>The v2 demo is tuned to cross the 9.5/10 customer-experience target for private demonstrations. Production readiness still depends on connecting real providers, storage, and database persistence.</p>
          <div className="confidence-meter"><span style={{ width: `${average}%` }} /></div>
        </div>
        <div className="approval-stack">
          {v2QaScoreCards.slice(0, 4).map((item) => <div className="approval-card" key={item.area}><span>{item.area}</span><strong>{item.score}%</strong></div>)}
        </div>
      </div>
      <div className="score-grid" style={{ marginTop: 18 }}>
        {v2QaScoreCards.map((item) => <div className="score-card" key={item.area}><span className="badge">{item.area}</span><div className="score">{item.score}%</div><p className="muted">{item.finding}</p></div>)}
      </div>
    </AppShell>
  );
}
