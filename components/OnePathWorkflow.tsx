import Link from 'next/link';

const steps = [
  ['1', 'Paste your scene', 'Use a script page, a paragraph, or a short idea.'],
  ['2', 'Get storyboard panels', 'CineLoom creates visual panels with simple shot notes.'],
  ['3', 'Review and fix', 'Approve panels or ask for a plain-English change.'],
  ['4', 'Export and share', 'Download a package or send a review link.']
];

export function OnePathWorkflow() {
  return (
    <section className="simple-section one-path-workflow" id="how-it-works">
      <div className="simple-section-head">
        <span className="section-kicker">Clean workflow</span>
        <h2>One path. Four steps. No confusion.</h2>
        <p>The entire product is organized around the simplest possible journey: create, review, fix, export.</p>
      </div>
      <div className="one-path-grid">
        {steps.map(([num, title, body]) => (
          <article className="one-path-card" key={title}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="simple-center-actions">
        <Link className="btn primary" href="/create-free-storyboard">Create my first storyboard</Link>
        <Link className="btn" href="/examples">See sample outputs</Link>
      </div>
    </section>
  );
}
