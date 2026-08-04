import Link from 'next/link';

const improvements = [
  ['Guided first run', 'A step-by-step free storyboard journey removes confusion for first-time creators.'],
  ['Director-level clarity', 'Every workflow now explains the next decision: beats, shots, geography, panels, animatic, export.'],
  ['Mobile-first creation', 'Navigation, CTA placement, generator layout, and cards adapt cleanly for phone users.'],
  ['Trust near action', 'Security, token, watermark, and privacy notes are visible beside conversion moments.'],
  ['Command palette', 'Power users can jump across studio, examples, billing, security, and production screens with ⌘K.'],
  ['Accessible states', 'Focus rings, skip link, keyboard search, empty states, and ARIA labels improve usability.']
];

export function ProductionUXShowcase() {
  return (
    <section className="conversion-section production-ux-section" aria-labelledby="production-ux-heading">
      <div className="section-kicker">Premium product experience</div>
      <h2 id="production-ux-heading">Built to feel simple for creators and serious for studios.</h2>
      <div className="ux-showcase-grid">
        {improvements.map(([title, body]) => (
          <div className="ux-improvement-card" key={title}>
            <span aria-hidden="true">✦</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="ux-demo-panel">
        <div>
          <span className="badge premium">Experience scorecard</span>
          <h3>From landing page to paid export, every screen has one clear next action.</h3>
          <p>v4.9 adds journey routing, mobile nav, stronger empty states, CTA hierarchy, reduced cognitive load, and studio command shortcuts.</p>
        </div>
        <Link className="btn primary" href="/experience">Explore UX improvements</Link>
      </div>
    </section>
  );
}
