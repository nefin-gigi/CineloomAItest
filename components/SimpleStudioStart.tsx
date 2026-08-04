import Link from 'next/link';

const actions = [
  ['Create', 'Start a storyboard from a scene or idea.', '/create-free-storyboard'],
  ['My Projects', 'Open, continue, or share previous storyboards.', '/studio/projects'],
  ['Review', 'Approve panels or request simple changes.', '/studio/storyboard-corrections'],
  ['Export', 'Download the storyboard package.', '/studio/export']
];

export function SimpleStudioStart() {
  return (
    <section className="simple-section studio-start-panel">
      <div className="simple-section-head compact">
        <span className="section-kicker">Studio home</span>
        <h2>What do you want to do today?</h2>
        <p>All advanced production, admin, and AI settings stay hidden unless needed.</p>
      </div>
      <div className="simple-choice-grid">
        {actions.map(([title, body, href]) => (
          <Link className="simple-choice-card blue" href={href} key={title}>
            <span className="simple-choice-icon" aria-hidden="true">→</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <b>Open {title}</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
