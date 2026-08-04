import { EndpointAwareLink } from '@/components/EndpointAwareLink';

type FooterVariant = 'full' | 'compact' | 'minimal';

type FooterSection = {
  title: string;
  links: Array<{ label: string; href: string; actionKey: string }>;
};

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/how-it-works', actionKey: 'nav_how_it_works' },
      { label: 'Examples', href: '/examples', actionKey: 'nav_examples' },
      { label: 'Pricing', href: '/pricing', actionKey: 'nav_pricing' },
      { label: 'Create storyboard', href: '/create-free-storyboard', actionKey: 'cta_create_free_storyboard' }
    ]
  },
  {
    title: 'Studio',
    links: [
      { label: 'My Studio', href: '/studio', actionKey: 'studio_dashboard' },
      { label: 'AI Harness', href: '/studio/agent-harness', actionKey: 'studio_agent_harness' },
      { label: 'Exports', href: '/sample-package', actionKey: 'export_pitch_package' },
      { label: 'Status', href: '/status', actionKey: 'nav_status' }
    ]
  },
  {
    title: 'Trust',
    links: [
      { label: 'Security', href: '/security', actionKey: 'nav_security' },
      { label: 'Commercial use', href: '/commercial-use', actionKey: 'nav_commercial_use' },
      { label: 'Support', href: '/support', actionKey: 'nav_support' },
      { label: 'Enterprise', href: '/enterprise', actionKey: 'nav_enterprise' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy', actionKey: 'nav_privacy' },
      { label: 'Terms', href: '/terms', actionKey: 'nav_terms' },
      { label: 'Refund policy', href: '/refund-policy', actionKey: 'nav_refund' },
      { label: 'Contact', href: '/support', actionKey: 'nav_support' }
    ]
  }
];

const trustBadges = ['Private script controls', 'Low-token AI Harness', 'Plug-and-play endpoints', 'Security-first architecture'];

export function StandardSiteFooter({ variant = 'full', showNewsletter = true }: { variant?: FooterVariant; showNewsletter?: boolean }) {
  const compact = variant === 'compact';
  const minimal = variant === 'minimal';

  return (
    <footer className={`standard-footer standard-footer--${variant}`} id="resources" aria-label="CineLoom site footer">
      {!minimal ? (
        <section className="standard-footer-cta" aria-label="Start creating with CineLoom">
          <div>
            <p className="standard-eyebrow">Ready when your script is</p>
            <h2>Create your first storyboard preview.</h2>
            <p>Paste a scene, review the panels, change one board with AI Harness, then export a pitch-ready package.</p>
          </div>
          <div className="standard-footer-actions">
            <EndpointAwareLink actionKey="cta_create_free_storyboard" href="/create-free-storyboard" className="standard-footer-primary">
              Create free storyboard
            </EndpointAwareLink>
            <EndpointAwareLink actionKey="studio_agent_harness" href="/studio/agent-harness" className="standard-footer-secondary">
              Open AI Harness
            </EndpointAwareLink>
          </div>
        </section>
      ) : null}

      <section className="standard-footer-main">
        <div className="standard-footer-brand-block">
          <EndpointAwareLink actionKey="nav_home" href="/" className="standard-footer-brand" aria-label="CineLoom.ai home">
            <img src="/brand/cineloom-app-icon.jpeg" alt="" />
            <span>
              <strong>CineLoom<span>.ai</span></strong>
              <small>Script to storyboard</small>
            </span>
          </EndpointAwareLink>
          <p>Simple AI storyboarding for creators, filmmakers, producers, and production teams.</p>
          <div className="standard-footer-badges" aria-label="Trust markers">
            {trustBadges.map((badge) => <span key={badge}>✓ {badge}</span>)}
          </div>
        </div>

        <div className="standard-footer-link-grid">
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={`${section.title} links`}>
              <h3>{section.title}</h3>
              {section.links.map((link) => (
                <EndpointAwareLink key={link.href + link.label} actionKey={link.actionKey} href={link.href}>
                  {link.label}
                </EndpointAwareLink>
              ))}
            </nav>
          ))}
        </div>

        {showNewsletter && !compact && !minimal ? (
          <div className="standard-footer-updates" aria-label="Product updates">
            <h3>Product updates</h3>
            <p>Get release notes for storyboarding, AI Harness, security, and export workflows.</p>
            <EndpointAwareLink actionKey="nav_support" href="/support" className="standard-footer-update-link">
              Request updates
            </EndpointAwareLink>
          </div>
        ) : null}
      </section>

      <section className="standard-footer-bottom" aria-label="Footer legal and trust information">
        <span>© 2026 CineLoom.ai. All rights reserved.</span>
        <span>Built for creative teams</span>
        <span>Encrypted workflows</span>
        <span>Audit-ready architecture</span>
      </section>
    </footer>
  );
}
