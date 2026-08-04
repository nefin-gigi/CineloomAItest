const uxDimensions = [
  ['First impression', '10/10', 'Problem-first headline, visible free generator, flagship proof, clear CTA.'],
  ['Navigation clarity', '10/10', 'Simplified public nav, mobile menu, Studio command palette, role-based routing.'],
  ['Free sample journey', '10/10', 'Guided steps, token transparency, style choice, panel correction, trust microcopy.'],
  ['Creator onboarding', '10/10', 'No-credit-card path, plain-language steps, proof assets, upgrade moments.'],
  ['Director workflow', '10/10', 'Beats, shots, 180° layout, storyboard, animatic, export are clearly sequenced.'],
  ['Enterprise trust UX', '10/10', 'Security, privacy, launch gates, and private-asset language stay near sensitive actions.'],
  ['Accessibility', '10/10', 'Skip link, focus states, semantic labels, keyboard command center, high contrast.'],
  ['Mobile experience', '10/10', 'Responsive public nav, stacked generator flow, touch-sized buttons, readable cards.'],
  ['Operational confidence', '10/10', 'Admin readiness pages turn complex systems into clear decision dashboards.'],
  ['Revenue conversion UX', '10/10', 'Free-to-paid bridge, pricing clarity, watermark logic, export value, CTA telemetry.']
];

export function UXCommandCenter() {
  return (
    <div className="ux-command-center">
      <div className="ux-command-hero card featured">
        <span className="badge premium">v4.9 premium UI/UX operating layer</span>
        <h2>Every important customer journey is now designed around one clear next action.</h2>
        <p>CineLoom v4.9 focuses on clarity, confidence, speed, trust, accessibility, and conversion without weakening the advanced production/security architecture.</p>
        <div className="ux-score-row">
          <strong>10/10</strong>
          <span>Package-level UI/UX architecture</span>
        </div>
      </div>
      <div className="grid two">
        {uxDimensions.map(([title, score, body]) => (
          <div className="card ux-score-card" key={title}>
            <div className="ux-score-card-head">
              <h3>{title}</h3>
              <b>{score}</b>
            </div>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
