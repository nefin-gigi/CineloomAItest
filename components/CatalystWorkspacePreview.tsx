const projects = [
  ['Rainy Backlot', 'Storyboard draft', '6 panels', 'Ready'],
  ['Music Video Intro', 'Prompt package', '12 panels', 'Review'],
  ['Investor Pitch Scene', 'Export package', '8 files', 'Exported']
];

export function CatalystWorkspacePreview() {
  return (
    <section className="scc-dashboard-preview" aria-label="CineLoom studio dashboard preview">
      <aside className="scc-dashboard-sidebar">
        <div className="scc-side-brand">
          <img src="/brand/cineloom-app-icon.jpeg" alt="" />
          <strong>CineLoom Studio</strong>
        </div>
        {['Dashboard', 'Create', 'Projects', 'Exports', 'Billing'].map((item, index) => (
          <span className={index === 0 ? 'active' : ''} key={item}>{item}</span>
        ))}
      </aside>
      <div className="scc-dashboard-main">
        <div className="scc-dashboard-top">
          <div>
            <small>Welcome back</small>
            <h3>Continue your storyboard work</h3>
          </div>
          <button type="button">New project</button>
        </div>
        <div className="scc-stat-grid">
          <div><strong>12</strong><span>Projects</span></div>
          <div><strong>4</strong><span>In review</span></div>
          <div><strong>38</strong><span>Exports</span></div>
        </div>
        <div className="scc-project-list">
          {projects.map(([title, type, count, status]) => (
            <article key={title}>
              <div><strong>{title}</strong><span>{type}</span></div>
              <small>{count}</small>
              <b>{status}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
