import Link from 'next/link';

const coachSteps = [
  {
    number: '01',
    title: 'Play the guided demo',
    body: 'Start with the one-screen v2 experience that shows the complete script-to-export story.',
    href: '/studio/investor-demo',
    cta: 'Play demo'
  },
  {
    number: '02',
    title: 'Review the storyboard',
    body: 'Show premium cinematic frames with director-friendly approve, revise, and lock controls.',
    href: '/studio/storyboard/static',
    cta: 'Review frames'
  },
  {
    number: '03',
    title: 'Export the package',
    body: 'Generate the director package preview for producer, investor, and video-provider handoff.',
    href: '/studio/export',
    cta: 'Export package'
  }
];

export function DirectorWorkflowCoach() {
  return (
    <section className="director-launchpad">
      <div className="card featured next-action-card">
        <span className="badge premium">Director-friendly launchpad</span>
        <h2 style={{ fontSize: '2rem', letterSpacing: '-0.065em', margin: '12px 0 8px' }}>Three clear actions for a Hollywood demo</h2>
        <p>
          The v3.0 flow hides technical complexity and leads with outcomes: play the guided demo, review storyboard frames, and export the director package.
        </p>
        <div className="rgb-strip" aria-hidden="true"><span className="red" /><span className="green" /><span className="blue" /></div>
        <div className="launch-actions">
          <Link className="launch-action" href="/studio/investor-demo"><strong>Play guided demo</strong><span>Show script-to-screen value in one polished sequence.</span></Link>
          <Link className="launch-action" href="/studio/storyboard/static"><strong>Review storyboard</strong><span>Open frame-by-frame visual approval.</span></Link>
          <Link className="launch-action" href="/studio/export"><strong>Export package</strong><span>Create a director/investor handoff bundle.</span></Link>
        </div>
      </div>
      <div className="card">
        <span className="badge">No-training workflow</span>
        <h3>Next best steps</h3>
        <div className="workflow-coach">
          {coachSteps.map((step) => (
            <Link className="coach-step" href={step.href} key={step.number}>
              <span className="coach-step-num">{step.number}</span>
              <span><strong>{step.title}</strong><span>{step.body}</span></span>
              <span className="btn ghost">{step.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
