import { EndpointAwareLink } from '@/components/EndpointAwareLink';
import { StandardSiteFooter } from '@/components/StandardSiteFooter';

const featureCards = [
  {
    icon: '⚡',
    title: 'Lowest token use',
    body: 'Smart context sends only the selected board, nearby continuity, and director prompt.'
  },
  {
    icon: '🤖',
    title: 'AI Harness',
    body: 'Change any single board with a precise prompt before stitching the final storyboard.'
  },
  {
    icon: '🔗',
    title: 'Plug-and-play',
    body: 'Map frontend actions to backend endpoints from Super Admin without changing the UI.'
  },
  {
    icon: '🛡️',
    title: 'Top security',
    body: 'Input validation, threat checks, penetration-test harness, and audit-ready controls.'
  },
  {
    icon: '👥',
    title: 'Team workflow',
    body: 'Review, lock continuity, export packages, and keep production decisions organized.'
  }
];

const workflow = [
  ['1. Upload Script', 'Add your script in PDF, DOCX, or plain text.', '📝'],
  ['2. AI Generates Boards', 'Creates panels, shots, and timing automatically.', '🤖'],
  ['3. Director Review & AI Harness', 'Change any board with low-token mode.', '🔗'],
  ['4. Stitch & Animate', 'Stitch approved boards into a dynamic storyboard.', '🛡️'],
  ['5. Export & Share', 'Export pitch decks, PDFs, shot lists, or share links.', '🎬'],
  ['Production Ready', 'Your story is ready for review, funding, and production.', '🎞️']
];

const trustLabels = ['Creators', 'Producers', 'Agencies', 'Film Schools', 'Studios', 'Production Teams'];
const boardNumbers = ['415', '416', '417', '418', '419'];

export function BillionHomeExperience() {
  return (
    <main className="v77-page v80-page" aria-label="CineLoom.ai cinematic premium home page">
      <header className="v77-nav-wrap">
        <nav className="v77-nav" aria-label="Main navigation">
          <EndpointAwareLink actionKey="nav_home" href="/" className="v77-brand">
            <img src="/brand/cineloom-app-icon.jpeg" alt="" />
            <span>
              <strong>CineLoom<span>.ai</span></strong>
              <small>From Script to Screen. Powered by AI.</small>
            </span>
          </EndpointAwareLink>

          <div className="v77-nav-links" aria-label="Public pages">
            <a href="#workflow">How it works</a>
            <a href="#features">Features</a>
            <EndpointAwareLink actionKey="nav_examples" href="/examples">Examples</EndpointAwareLink>
            <EndpointAwareLink actionKey="nav_pricing" href="/pricing">Pricing</EndpointAwareLink>
            <EndpointAwareLink actionKey="nav_security" href="/security">Security</EndpointAwareLink>
            <a href="#resources">Resources</a>
          </div>

          <div className="v77-nav-actions">
            <EndpointAwareLink actionKey="nav_login" href="/login" className="v77-signin">Sign in</EndpointAwareLink>
            <EndpointAwareLink actionKey="cta_create_free_storyboard" href="/create-free-storyboard" className="v77-primary small">Create free storyboard</EndpointAwareLink>
          </div>
        </nav>
      </header>

      <section className="v80-hero" aria-labelledby="v77-hero-title">
        <div className="v80-hero-copy">
          <div className="v80-eyebrow"><span>AI-powered pre-production</span><span>Director controlled</span></div>
          <h1 id="v77-hero-title">Turn scripts into <span>cinematic storyboards.</span></h1>
          <p className="v80-lede">CineLoom.ai helps creators, filmmakers, producers, and studios move from script to visual pitch package with clean storyboard panels, shot lists, AI Harness edits, and export-ready assets.</p>

          <div className="v80-actions">
            <EndpointAwareLink actionKey="cta_create_free_storyboard" href="/create-free-storyboard" className="v80-primary">Create free storyboard <span>→</span></EndpointAwareLink>
            <EndpointAwareLink actionKey="nav_examples" href="/examples" className="v80-secondary">View examples</EndpointAwareLink>
          </div>

          <div className="v80-trust-pills" aria-label="Preview guarantees">
            <span>✓ No credit card</span>
            <span>✓ Low-token AI Harness</span>
            <span>✓ Private script controls</span>
          </div>
        </div>

        <div className="v80-cinema-card" aria-label="CineLoom cinematic storyboard preview">
          <div className="v80-card-glow" aria-hidden="true" />
          <div className="v80-card-top">
            <div className="v80-window-dots" aria-hidden="true"><span /><span /><span /></div>
            <strong>CineLoom Storyboard Studio</strong>
            <div className="v80-card-badges">
              <span>Scene 12</span>
              <span className="hot">Board 417</span>
            </div>
          </div>

          <div className="v80-card-body">
            <aside className="v80-script-panel">
              <small>SCRIPT INPUT</small>
              <h3>EXT. PLAYGROUND — DAY</h3>
              <p>A little boy notices the ball rolling toward him. The moment slows as his eyes widen.</p>
              <div className="v80-context-meter"><span /></div>
              <p className="v80-meter-label">Only selected board + nearby context sent to AI</p>
            </aside>

            <section className="v80-storyboard-panel">
              <div className="v80-large-frame">
                <img src="/storyboards/close-up.png" alt="Cinematic storyboard close-up board" />
                <div className="v80-frame-meta"><span>04 Close-up</span><b>Approved ✓</b></div>
              </div>
              <div className="v80-frame-copy">
                <small>AI HARNESS PATCH</small>
                <p>Change only Board 417 before stitching. Other boards stay locked.</p>
                <EndpointAwareLink actionKey="studio_agent_harness" href="/studio/agent-harness" className="v80-ai-button">Open AI Harness</EndpointAwareLink>
              </div>
            </section>
          </div>

          <div className="v80-film-strip" aria-label="Storyboard panels">
            {['wide-shot.png','tracking-shot.png','insert.png','close-up.png','reveal.png','export.png'].map((img, index) => (
              <div key={img} className={index === 3 ? 'active' : ''}>
                <img src={`/storyboards/${img}`} alt="" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v77-trust-strip" aria-label="Audience trust strip">
        <p>BUILT FOR CREATIVE TEAMS WORLDWIDE</p>
        <div>
          {trustLabels.map((label) => <span key={label}>{label}</span>)}
        </div>
      </section>

      <section className="v77-feature-band" id="features" aria-label="CineLoom feature highlights">
        {featureCards.map((feature) => (
          <article key={feature.title}>
            <b>{feature.icon}</b>
            <h2>{feature.title}</h2>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>

      <section className="v77-workflow" id="workflow" aria-labelledby="workflow-title">
        <div className="v77-section-head">
          <h2 id="workflow-title">The complete storyboard workflow</h2>
          <p>AI speed. Director control. Production ready.</p>
        </div>
        <div className="v77-workflow-rail">
          {workflow.map(([title, body, icon], index) => (
            <article key={title}>
              <b>{icon}</b>
              <h3>{title}</h3>
              <p>{body}</p>
              {index < workflow.length - 1 && <span className="v77-arrow">→</span>}
            </article>
          ))}
        </div>
        <div className="v77-workflow-checks">
          <span>✓ Single board change</span>
          <span>✓ Continuity locks</span>
          <span>✓ Lowest token mode</span>
          <span>✓ Approval before stitch</span>
          <span>✓ 100% audit trail</span>
        </div>
      </section>

      <section className="v77-dual-panels" aria-label="AI Harness and Super Admin capabilities">
        <article className="v77-agent-panel">
          <div>
            <small>NEW</small>
            <h2>Change any board with AI Harness.</h2>
            <p>Select a board, describe the change, and let AI update only that board using low-token context.</p>
            <ul>
              <li>Change one board in a 1,000-board storyboard</li>
              <li>Lock characters, location, wardrobe, and screen direction</li>
              <li>Preview before apply</li>
              <li>Safe, controlled, and accurate</li>
            </ul>
            <EndpointAwareLink actionKey="studio_agent_harness" href="/studio/agent-harness" className="v77-white-button">Try AI Harness →</EndpointAwareLink>
          </div>
          <div className="v77-mini-form">
            <strong>AI Harness</strong>
            <label>Selected Board<input value="Board 417" readOnly /></label>
            <label>Scope<input value="This board only" readOnly /></label>
            <label>Director Prompt<textarea value="Make the boy look more surprised and move camera closer." readOnly /></label>
            <label>Token Mode<input value="Lowest Cost" readOnly /></label>
            <button>Preview Change ✨</button>
          </div>
        </article>

        <article className="v77-admin-panel">
          <div>
            <h2>Super Admin. Total control.</h2>
            <p>Connect every feature to your backend with simple endpoint mapping, validation, testing, and audit logs.</p>
            <ul>
              <li>Map frontend actions to backend endpoints</li>
              <li>Test, version, and monitor integrations</li>
              <li>Role-based access and audit logs</li>
              <li>Enterprise security by design</li>
            </ul>
            <EndpointAwareLink actionKey="super_admin_frontend_integrations" href="/studio/super-admin/frontend-integrations" className="v77-admin-link">Explore Admin Console →</EndpointAwareLink>
          </div>
          <div className="v77-router-card">
            <div><strong>Frontend Action Router</strong><span>Live</span></div>
            {['Create Storyboard', 'AI Harness Change Board', 'Export Pitch Package', 'Billing Checkout'].map((item) => (
              <p key={item}><span>{item}</span><b>Live</b></p>
            ))}
            <button>＋ Add New Action</button>
          </div>
        </article>
      </section>

      <section className="v77-final-cta">
        <div>
          <h2>Ready to bring your story to life?</h2>
          <p>Join creators, studios, and teams building visual story plans with CineLoom.ai.</p>
          <div className="v77-actions compact">
            <EndpointAwareLink actionKey="cta_create_free_storyboard" href="/create-free-storyboard" className="v77-primary">Create free storyboard</EndpointAwareLink>
            <EndpointAwareLink actionKey="cta_book_demo" href="/support" className="v77-dark-secondary">Book a demo</EndpointAwareLink>
          </div>
        </div>
        <div className="v77-metrics">
          <span><strong>1,000</strong> Board workflow</span>
          <span><strong>Low-token</strong> AI Harness</span>
          <span><strong>Secure</strong> Endpoint router</span>
          <span><strong>Export</strong> Pitch package</span>
        </div>
      </section>

      <StandardSiteFooter variant="full" />

    </main>
  );
}
