const launchItems = [
  ['Real testimonials', 'Capture + approval workflow included; do not publish fake quotes.'],
  ['Cinematic flagship demo', '16 demo-safe frames, 60-second animatic, shot list, prompt package, ZIP bundle.'],
  ['Protected exports', 'Authenticated signed-download API pattern for customer files.'],
  ['Deployed build QA', 'Vercel preview workflow and launch QA script included.'],
  ['Global analytics', 'Page views and CTA clicks are tracked across public/studio routes.'],
  ['SEO polish', 'Metadata, Open Graph image, robots, sitemap, and structured data included.'],
  ['Mobile QA', 'Responsive funnel checklist and mobile CSS improvements included.'],
  ['Email provider', 'Pluggable outbound email route and onboarding/support email contracts included.']
];

export function FinalLaunchReadinessPanel() {
  return (
    <section className="conversion-section final-launch-panel">
      <div className="section-kicker">Final launch gap closure</div>
      <h2>High-priority launch gaps are now represented as product flows, APIs, assets, and checks.</h2>
      <div className="launch-gap-grid">
        {launchItems.map(([title, note]) => (
          <article className="launch-gap-card" key={title}>
            <strong>{title}</strong>
            <span>{note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
