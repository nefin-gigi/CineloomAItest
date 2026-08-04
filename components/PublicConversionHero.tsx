import { TrackedCTA } from '@/components/TrackedCTA';
import { Sample10StoryboardGenerator } from '@/components/Sample10StoryboardGenerator';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { publicStats } from '@/lib/public-conversion-data';

export function PublicConversionHero() {
  return (
    <section className="conversion-hero premium-hero">
      <div className="conversion-hero-copy premium-hero-copy">
        <span className="badge premium">AI storyboard generator</span>
        <h1>Turn a scene into a clear storyboard in minutes.</h1>
        <p className="hero-subtitle">
          Paste a script scene. CineLoom creates story beats, shot direction, timed storyboard panels, and an export-ready production package.
        </p>
        <div className="rgb-accent-bar" aria-hidden="true"><span className="red" /><span className="green" /><span className="blue" /></div>
        <div className="premium-hero-command">
          <span>Best first step</span>
          <strong>Create a free 10-second storyboard</strong>
          <small>No credit card. Watermarked preview. Upgrade only when the result is useful.</small>
        </div>
        <div className="actions hero-actions">
          <TrackedCTA className="btn primary big-cta" href="/create-free-storyboard" event="hero_cta_clicked" label="Create my free storyboard" stage="homepage-hero">Create my free storyboard</TrackedCTA>
          <TrackedCTA className="btn" href="/examples" event="hero_examples_clicked" label="See examples" stage="homepage-hero">See examples</TrackedCTA>
        </div>
        <TrustMicrocopy compact />
        <div className="public-stats-grid premium-stats-grid">
          {publicStats.slice(0, 4).map((stat) => (
            <div className="stat-tile" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.note}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-generator-panel premium-generator-panel" id="free-storyboard-generator">
        <Sample10StoryboardGenerator compactHero />
      </div>
    </section>
  );
}
