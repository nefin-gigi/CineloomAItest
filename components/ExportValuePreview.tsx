const files = [
  ['Storyboard PDF', 'A readable storyboard deck for review meetings.'],
  ['Shot list CSV', 'Scene, shot, lens, movement, timing, and purpose.'],
  ['Prompt package JSON', 'Reusable AI prompts for panels, corrections, and exports.'],
  ['Animatic preview MP4', 'A quick timing preview for story rhythm.'],
  ['Producer ZIP', 'Everything bundled for sharing or funding conversations.'],
  ['Review link', 'A simple link for producers, clients, or collaborators.']
];

export function ExportValuePreview() {
  return (
    <section className="simple-section export-value-preview" aria-label="Export package value preview">
      <div className="simple-section-head compact">
        <span className="section-kicker">Export value</span>
        <h2>Show users exactly what they get.</h2>
        <p>Clear file previews make the paid upgrade feel obvious and trustworthy.</p>
      </div>
      <div className="export-value-grid">
        {files.map(([title, body], index) => (
          <article className="export-value-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
