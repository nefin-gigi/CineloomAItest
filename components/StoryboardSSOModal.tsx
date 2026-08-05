import Link from 'next/link';

const nextPath = '/create-free-storyboard';

export function StoryboardSSOModal() {
  return (
    <div
      className="storyboard-sso-modal"
      id="storyboard-sso-modal"
      popover="auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="storyboard-sso-title"
      aria-describedby="storyboard-sso-description"
    >
      <div className="storyboard-sso-head">
        <div>
          <span className="bd-section-eyebrow">Secure sign in</span>
          <h2 id="storyboard-sso-title">Create your storyboard</h2>
        </div>
        <button
          className="storyboard-sso-close"
          type="button"
          popoverTarget="storyboard-sso-modal"
          popoverTargetAction="hide"
          aria-label="Close sign-in window"
        >
          ×
        </button>
      </div>

      <p id="storyboard-sso-description">
        Sign in to generate your preview, save your shots, and continue editing from any device.
      </p>

      <div className="storyboard-sso-providers">
        <Link href={`/login?provider=google&next=${encodeURIComponent(nextPath)}`}>
          <span className="storyboard-sso-provider-icon google" aria-hidden="true">G</span>
          Continue with Google
        </Link>
        <Link href={`/login?provider=microsoft&next=${encodeURIComponent(nextPath)}`}>
          <span className="storyboard-sso-provider-icon microsoft" aria-hidden="true">M</span>
          Continue with Microsoft
        </Link>
        <Link href={`/login?provider=saml&next=${encodeURIComponent(nextPath)}`}>
          <span className="storyboard-sso-provider-icon enterprise" aria-hidden="true">S</span>
          Continue with Enterprise SSO
        </Link>
      </div>

      <div className="storyboard-sso-divider"><span>or continue with email</span></div>

      <form className="storyboard-sso-email" action="/login" method="get">
        <input type="hidden" name="next" value={nextPath} />
        <label htmlFor="storyboard-sso-email">Work email</label>
        <div>
          <input id="storyboard-sso-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          <button type="submit">Continue</button>
        </div>
      </form>

      <p className="storyboard-sso-terms">
        By continuing, you agree to CineLoom’s <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </div>
  );
}
