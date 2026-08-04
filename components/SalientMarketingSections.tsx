import Link from 'next/link';
import { CatalystWorkspacePreview } from './CatalystWorkspacePreview';

const workflow = [
  ['Paste', 'Add one scene or a short script idea.'],
  ['Generate', 'Receive storyboard panels and shot timing.'],
  ['Review', 'Fix shots in plain English.'],
  ['Export', 'Download the pitch-ready package.']
];

const audiences = [
  ['Creators', 'Plan Shorts, reels, and music videos faster.'],
  ['Filmmakers', 'Turn scenes into visual production plans.'],
  ['Producers', 'Prepare clean pitch packages for review.'],
  ['Studios', 'Keep scripts private with controlled exports.']
];

export function SalientMarketingSections() {
  return (
    <>
      <section className="scc-section" id="how-it-works">
        <div className="scc-section-head">
          <small>How it works</small>
          <h2>One clear workflow. No technical setup.</h2>
          <p>Designed for people who want a storyboard, not a complicated AI console.</p>
        </div>
        <div className="scc-workflow-grid">
          {workflow.map(([title, body], index) => (
            <article key={title}>
              <b>{index + 1}</b>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="scc-section scc-dashboard-section">
        <div className="scc-section-head left">
          <small>Product workspace</small>
          <h2>Catalyst-style studio dashboard for actual work.</h2>
          <p>Simple navigation, clean project states, visible exports, and a clear action path for non-technical users.</p>
        </div>
        <CatalystWorkspacePreview />
      </section>

      <section className="scc-section">
        <div className="scc-section-head">
          <small>Audience paths</small>
          <h2>Built for cinema creators and business buyers.</h2>
        </div>
        <div className="scc-audience-grid">
          {audiences.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="scc-cta-section">
        <small>Ready for staging</small>
        <h2>Create your first storyboard preview.</h2>
        <p>Use the clean marketing site now, then connect live AI, billing, storage, and production launch gates.</p>
        <div className="scc-actions centered">
          <Link href="/create-free-storyboard" className="scc-button primary">Create free storyboard</Link>
          <Link href="/pricing" className="scc-button secondary">See pricing</Link>
        </div>
      </section>
    </>
  );
}
