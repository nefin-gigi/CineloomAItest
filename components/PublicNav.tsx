'use client';

import { EndpointAwareLink } from '@/components/EndpointAwareLink';
import { useState } from 'react';

const links = [
  ['How it works', '/how-it-works', 'nav_how_it_works'],
  ['Examples', '/examples', 'nav_examples'],
  ['Pricing', '/pricing', 'nav_pricing'],
  ['Security', '/security', 'nav_security'],
  ['Help', '/support', 'nav_support']
];

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sl-nav-shell bd-nav-shell">
      <nav className="sl-nav bd-nav" aria-label="Main navigation">
        <EndpointAwareLink actionKey="nav_home" className="sl-brand bd-brand" href="/" onClick={() => setOpen(false)}>
          <img src="/brand/cineloom-app-icon.jpeg" alt="" />
          <span>
            <strong>CineLoom.ai</strong>
            <small>Script to storyboard</small>
          </span>
        </EndpointAwareLink>

        <button className="sl-menu-button bd-menu-button" type="button" aria-expanded={open} aria-controls="sl-mobile-panel" onClick={() => setOpen((value) => !value)}>
          {open ? 'Close' : 'Menu'}
        </button>

        <div className="sl-nav-links bd-nav-links" aria-label="Public pages">
          {links.map(([label, href, actionKey]) => <EndpointAwareLink key={href} href={href} actionKey={actionKey}>{label}</EndpointAwareLink>)}
        </div>

        <div className="sl-nav-actions bd-nav-actions">
          <EndpointAwareLink actionKey="nav_login" className="sl-link-button bd-link-button" href="/login">Sign in</EndpointAwareLink>
          <EndpointAwareLink actionKey="cta_create_free_storyboard" className="sl-primary-button bd-primary-button small" href="/create-free-storyboard">Create free storyboard</EndpointAwareLink>
        </div>
      </nav>
      {open && (
        <div id="sl-mobile-panel" className="sl-mobile-panel bd-mobile-panel">
          {links.map(([label, href, actionKey]) => <EndpointAwareLink key={href} href={href} actionKey={actionKey} onClick={() => setOpen(false)}>{label}</EndpointAwareLink>)}
          <EndpointAwareLink actionKey="nav_login" href="/login" onClick={() => setOpen(false)}>Sign in</EndpointAwareLink>
          <EndpointAwareLink actionKey="cta_create_free_storyboard" className="sl-primary-button bd-primary-button" href="/create-free-storyboard" onClick={() => setOpen(false)}>Create free storyboard</EndpointAwareLink>
        </div>
      )}
    </header>
  );
}
