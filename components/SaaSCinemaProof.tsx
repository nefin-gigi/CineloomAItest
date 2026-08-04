import Link from 'next/link';

const proof = [
  { title: 'Storyboard panels', body: 'Visualize camera angle, lighting, blocking, and emotion in panel-ready cards.' },
  { title: 'Shot list', body: 'Move from creative idea to production-friendly CSV with lenses, motion, and timing.' },
  { title: 'Prompt package', body: 'Keep a reproducible prompt trail for image, video, animatic, and export generation.' },
  { title: 'Animatic preview', body: 'Convert approved panels into pacing, music, scratch voice, and SFX direction.' }
];

export function SaaSCinemaProof() {
  return (
    <section className="saas-section proof-studio" id="examples">
      <div className="section-center">
        <span className="section-kicker">Product proof</span>
        <h2>Show the output before asking users to believe.</h2>
        <p className="section-lede">A modern SaaS homepage should demonstrate the product immediately. CineLoom now shows the storyboard transformation in the hero and again in a clean proof section.</p>
      </div>
      <div className="proof-studio-grid">
        {proof.map((item, index) => (
          <article className="proof-output-card" key={item.title}>
            <div className="proof-output-visual">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div />
              <div />
              <div />
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <Link className="btn primary" href="/sample-package">Download sample package</Link>
        <Link className="btn" href="/examples">Browse examples</Link>
      </div>
    </section>
  );
}
