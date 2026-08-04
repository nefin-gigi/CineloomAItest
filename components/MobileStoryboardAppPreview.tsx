import { sample10Storyboard } from '@/lib/business-data';

export function MobileStoryboardAppPreview() {
  const panels = sample10Storyboard.panels.slice(0, 4);
  return (
    <div className="mobile-storyboard-app-preview" aria-label="Mobile CineLoom storyboard app preview">
      <div className="phone-status-row">
        <span>9:41</span>
        <strong>CineLoom</strong>
        <span>●●●</span>
      </div>
      <div className="mobile-app-header-card">
        <span className="mobile-app-kicker">Scene to storyboard</span>
        <h3>Rainy backlot discovery</h3>
        <p>8 panels · 10 sec · export-ready</p>
      </div>
      <div className="mobile-progress-steps" aria-label="Storyboard workflow progress">
        <span className="done">Script</span>
        <span className="done">Shots</span>
        <span className="active">Panels</span>
        <span>Export</span>
      </div>
      <div className="mobile-story-card-grid">
        {panels.map((panel, index) => (
          <div className="mobile-story-card" key={panel.id}>
            <div className="mobile-panel-visual"><b>{String(index + 1).padStart(2, '0')}</b></div>
            <strong>{panel.shot}</strong>
            <span>{panel.t}</span>
          </div>
        ))}
      </div>
      <div className="mobile-cta-strip">
        <button type="button">Correct panel</button>
        <button type="button" className="primary">Export pack</button>
      </div>
    </div>
  );
}
