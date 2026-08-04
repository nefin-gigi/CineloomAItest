import { Sample10StoryboardGenerator } from '@/components/Sample10StoryboardGenerator';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';

const steps = [
  ['01', 'Paste a scene', 'One short paragraph or screenplay beat is enough to begin.'],
  ['02', 'Choose a visual style', 'Pick realism, sketch, 3D blocking, animation, or pitch moodboard.'],
  ['03', 'Generate panels', 'CineLoom returns timed panels, shot intent, and prompt-ready details.'],
  ['04', 'Correct with direction', 'Ask for lens, lighting, emotion, blocking, or continuity changes.']
];

export function FreeStoryboardGuidedFlow() {
  return (
    <section className="conversion-section free-guided-flow-section">
      <div className="free-guided-layout">
        <aside className="free-guided-rail" aria-label="Free storyboard steps">
          <span className="badge premium">Guided mode</span>
          <h2>Make the first storyboard feel effortless.</h2>
          <p>Clear steps, visible trust notes, token transparency, and a single primary action help a new visitor finish the free sample.</p>
          <div className="free-guided-steps">
            {steps.map(([num, title, body]) => (
              <div className="free-guided-step" key={title}>
                <b>{num}</b>
                <span><strong>{title}</strong><small>{body}</small></span>
              </div>
            ))}
          </div>
          <TrustMicrocopy compact />
        </aside>
        <div className="free-guided-generator">
          <Sample10StoryboardGenerator />
        </div>
      </div>
    </section>
  );
}
