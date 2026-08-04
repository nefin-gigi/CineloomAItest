const panels = [
  ['01', 'Wide', '/storyboards/wide-shot.png'],
  ['02', 'Track', '/storyboards/tracking-shot.png'],
  ['03', 'Insert', '/storyboards/insert.png'],
  ['04', 'Close', '/storyboards/close-up.png'],
  ['05', 'Reveal', '/storyboards/reveal.png'],
  ['06', 'Export', '/storyboards/export.png']
];

export function SalientStoryboardHeroVisual() {
  return (
    <figure className="scc-hero-visual" aria-label="CineLoom script to storyboard product preview">
      <div className="scc-window-bar">
        <span className="scc-dot red" />
        <span className="scc-dot green" />
        <span className="scc-dot blue" />
        <strong>Storyboard Preview</strong>
      </div>

      <div className="scc-window-grid">
        <section className="scc-script-pane" aria-label="Script input preview">
          <div className="scc-pane-title">Script input</div>
          <div className="scc-script-paper">
            <p><strong>EXT. RAINY BACKLOT — NIGHT</strong></p>
            <p>A young filmmaker pushes open a studio door. Rain glows under a single sign.</p>
            <p>Inside, the script becomes a living visual plan.</p>
          </div>
          <div className="scc-progress"><span /></div>
          <small>Analyzing beats, camera, and tone</small>
        </section>

        <section className="scc-output-pane" aria-label="Storyboard output preview">
          <div className="scc-pane-title">Storyboard output</div>
          <div className="scc-panel-grid">
            {panels.map(([num, title, src]) => (
              <article className="scc-panel" key={num}>
                <img src={src} alt={`${title} storyboard panel`} />
                <div>
                  <span>{num}</span>
                  <strong>{title}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <figcaption className="scc-visual-footer">
        <span>6 panels</span>
        <span>Shot list</span>
        <span>Pitch export</span>
      </figcaption>
    </figure>
  );
}
