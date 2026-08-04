import { TrackedCTA } from '@/components/TrackedCTA';

const examples = [
  { title: 'Biblical epic', shot: 'Wide desert reveal', style: 'Cinematic realism' },
  { title: 'Indie drama', shot: 'Emotional close-up', style: 'Photo sketch' },
  { title: 'YouTube short', shot: 'Fast hook frame', style: 'Vertical creator' },
  { title: 'Commercial pitch', shot: 'Product hero insert', style: 'Client deck' }
];

export function ExampleProofGallery() {
  return (
    <section className="conversion-section">
      <div className="section-kicker">Product proof</div>
      <h2>Show the transformation before the user signs up.</h2>
      <div className="proof-gallery-grid">
        {examples.map((example, index) => (
          <article className="proof-frame-card" key={example.title}>
            <div className="proof-frame-visual">
              <div className="mini-frame-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="proof-frame-horizon" />
              <strong>{example.shot}</strong>
            </div>
            <h3>{example.title}</h3>
            <p>{example.style} · beats, shots, panels, QA, and export package.</p>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <TrackedCTA className="btn" href="/sample-package" event="examples_sample_package_clicked" label="View sample package" stage="examples">View sample package</TrackedCTA>
        <TrackedCTA className="btn primary" href="/create-free-storyboard" event="examples_try_scene_clicked" label="Try your scene" stage="examples">Try your scene</TrackedCTA>
      </div>
    </section>
  );
}
