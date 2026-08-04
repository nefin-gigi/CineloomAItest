import Link from 'next/link';

const productSteps = [
  { accent: 'red', title: 'Paste the scene', body: 'Start with a screenplay page, short scene, commercial concept, devotional idea, or YouTube short.' },
  { accent: 'green', title: 'Review director choices', body: 'See beats, lens ideas, 180° geography, blocking, emotion, and shot timing in a readable flow.' },
  { accent: 'blue', title: 'Export the package', body: 'Download storyboard PDF, shot CSV, prompt JSON, animatic preview, and producer-ready ZIP.' }
];

const audiences = [
  ['Creators', 'Plan Shorts, reels, music videos, and faith-based stories before editing.', '/storyboard-generator-for-youtube-shorts'],
  ['Filmmakers', 'Turn scripts into shot-ready visual plans with continuity and timing.', '/storyboard-generator-for-filmmakers'],
  ['Producers', 'Create pitch packages, budget conversations, and funding visuals faster.', '/examples'],
  ['Studios', 'Protect scripts, enforce approvals, and route AI generation through governed endpoints.', '/enterprise']
];

export function SaaSCinemaShowcase() {
  return (
    <>
      <section className="saas-section split-showcase" id="how-it-works">
        <div>
          <span className="section-kicker">Product experience</span>
          <h2>One clean path from script to storyboard proof.</h2>
          <p className="section-lede">The interface is designed like a modern SaaS product, but the workflow speaks the language of cinema: beats, shots, panels, timing, exports, and review.</p>
        </div>
        <div className="workflow-ladder">
          {productSteps.map((step, index) => (
            <article className={`workflow-ladder-card ${step.accent}`} key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="saas-section audience-routes" id="audiences">
        <div className="section-center">
          <span className="section-kicker">Built for cinema audiences</span>
          <h2>Simple for creators. Serious enough for production teams.</h2>
          <p className="section-lede">Each visitor gets a clear reason to try the product and a direct path into the right workflow.</p>
        </div>
        <div className="audience-route-grid">
          {audiences.map(([title, body, href], index) => (
            <Link href={href} className="audience-route-card" key={title}>
              <span>{['●', '◆', '■', '▲'][index]}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <b>Explore workflow →</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
