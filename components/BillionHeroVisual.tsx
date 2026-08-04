const panels = [
  ['01', 'Wide shot', '1.0s', '/storyboards/wide-shot.png', 'red'],
  ['02', 'Tracking shot', '2.0s', '/storyboards/tracking-shot.png', 'green'],
  ['03', 'Insert', '3.0s', '/storyboards/insert.png', 'blue'],
  ['04', 'Close-up', '4.0s', '/storyboards/close-up.png', 'red'],
  ['05', 'Reveal', '5.0s', '/storyboards/reveal.png', 'green'],
  ['06', 'Export', '6.0s', '/storyboards/export.png', 'blue']
];

export function BillionHeroVisual() {
  return (
    <div className="sl-product-window bd-product-window" aria-label="CineLoom product preview">
      <div className="sl-window-top bd-window-top">
        <span className="sl-dot bd-dot red" />
        <span className="sl-dot bd-dot yellow" />
        <span className="sl-dot bd-dot green" />
        <strong>CineLoom storyboard workspace</strong>
      </div>
      <div className="sl-window-body bd-window-body">
        <section className="sl-script-card bd-script-card">
          <div className="sl-mini-label bd-mini-label">Script input</div>
          <div className="sl-script-paper bd-script-paper">
            <p><strong>EXT. RAINY BACKLOT — NIGHT</strong></p>
            <p>A young filmmaker opens a glowing studio door. Inside, the script becomes a living movie world.</p>
          </div>
          <div className="sl-progress bd-progress"><span /></div>
          <small>Analyzing scene, camera beats, and emotional tone…</small>
        </section>
        <section className="sl-output-card bd-output-card">
          <div className="sl-mini-label bd-mini-label">Storyboard output</div>
          <div className="sl-storyboard-grid bd-storyboard-grid">
            {panels.map(([num, title, time, src, tone]) => (
              <article className="sl-story-card bd-story-card" key={num}>
                <img src={src} alt={`${title} storyboard frame`} />
                <div className="sl-story-meta bd-story-meta">
                  <span className={`sl-number bd-number ${tone}`}>{num}</span>
                  <strong>{title}</strong>
                  <small>{time}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div className="sl-window-footer bd-window-footer">
        <span>6 panels</span>
        <span>~18s timing</span>
        <span>Pitch-ready export</span>
      </div>
    </div>
  );
}
