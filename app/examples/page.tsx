import Link from 'next/link';
import { PublicPageShell } from '@/components/PublicPageShell';

const examples = [
  ['Rainy Backlot Reveal', 'A filmmaker opens a glowing studio door into a living movie world.', '/storyboards/wide-shot.png'],
  ['Music Video Opening', 'A singer walks through neon rain as memories appear as storyboard panels.', '/storyboards/tracking-shot.png'],
  ['Producer Pitch Scene', 'A proof-of-concept sequence for investor review and export.', '/storyboards/export.png']
];

export default function ExamplesPage() {
  return (
    <PublicPageShell eyebrow="Examples" title="See what CineLoom helps you create." subtitle="Clean sample outputs that explain the product quickly: script input, storyboard panels, and export-ready deliverables.">
      <section className="bd-section compact">
        <div className="bd-grid-3">
          {examples.map(([title, body, image]) => (
            <article className="bd-card" key={title}>
              <img src={image} alt="Storyboard example" style={{borderRadius: 16, marginBottom: 18, border: '1px solid #dbe5f0'}} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="bd-hero-actions" style={{marginTop: 28, justifyContent: 'center'}}>
          <Link className="bd-primary-button" href="/create-free-storyboard">Create your own storyboard</Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
