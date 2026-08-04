import { TrackedCTA } from '@/components/TrackedCTA';
import { Sample10StoryboardGenerator } from '@/components/Sample10StoryboardGenerator';
import { MobileStoryboardAppPreview } from '@/components/MobileStoryboardAppPreview';
import { sample10Storyboard } from '@/lib/business-data';

const proofMetrics = [
  ['10 sec', 'free sample storyboard'],
  ['8 panels', 'timed director preview'],
  ['6 exports', 'PDF · CSV · JSON · MP4 · ZIP'],
  ['private', 'script-first workflow']
];

export function SaaSCinemaHero() {
  return (
    <section className="saas-cinema-hero" aria-labelledby="cineloom-hero-title">
      <div className="hero-copy-stack">
        <div className="hero-pill-row" aria-label="Product highlights">
          <span className="pill red">AI Storyboards</span>
          <span className="pill green">Director Review</span>
          <span className="pill blue">Producer Exports</span>
        </div>
        <h1 id="cineloom-hero-title">Create a cinematic storyboard from your script before the first shoot.</h1>
        <p className="hero-lede">
          CineLoom turns a scene into beats, shots, storyboard panels, animatic timing, and an export-ready pitch package for creators, filmmakers, and production teams.
        </p>
        <div className="hero-actions premium-action-row">
          <TrackedCTA className="btn primary big-cta" href="/create-free-storyboard" event="v51_hero_free_storyboard" label="Create a free storyboard" stage="homepage-hero">Create a free storyboard</TrackedCTA>
          <TrackedCTA className="btn" href="/flagship-scene" event="v51_hero_flagship_scene" label="View flagship scene" stage="homepage-hero">View flagship scene</TrackedCTA>
        </div>
        <div className="hero-confidence-row" role="list" aria-label="Launch trust points">
          <span role="listitem">No credit card</span>
          <span role="listitem">Watermarked preview</span>
          <span role="listitem">Private script controls</span>
          <span role="listitem">Upgrade only when useful</span>
        </div>
        <div className="hero-metric-row" aria-label="Product metrics">
          {proofMetrics.map(([value, label]) => (
            <div className="metric-tile" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-product-stack" aria-label="CineLoom product preview">
        <MobileStoryboardAppPreview />
        <div className="product-browser-card">
          <div className="browser-bar">
            <span className="dot red" />
            <span className="dot green" />
            <span className="dot blue" />
            <strong>CineLoom Studio Preview</strong>
          </div>
          <div className="browser-content-grid">
            <div className="script-pane">
              <span className="pane-label">Script input</span>
              <p><b>EXT. RAINY BACKLOT — NIGHT</b></p>
              <p>A young filmmaker opens a glowing studio door. Inside, the script becomes a living world.</p>
              <div className="script-progress"><span style={{ width: '82%' }} /></div>
            </div>
            <div className="storyboard-pane">
              <span className="pane-label">Storyboard output</span>
              <div className="mini-board-grid">
                {sample10Storyboard.panels.slice(0, 6).map((panel, index) => (
                  <div className="cinema-panel-thumb" key={panel.id}>
                    <b>{String(index + 1).padStart(2, '0')}</b>
                    <span>{panel.shot}</span>
                    <small>{panel.t}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="timeline-strip" aria-label="Animatic timing preview">
            {sample10Storyboard.panels.slice(0, 8).map((panel, index) => <span key={panel.id} style={{ animationDelay: `${index * 80}ms` }} />)}
          </div>
        </div>
        <Sample10StoryboardGenerator compactHero />
      </div>
    </section>
  );
}
