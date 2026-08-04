'use client';

import Link from 'next/link';
import { AIHarnessIconLink } from './AIHarnessIconLink';

const mainLinks = [
  ['Dashboard', '/studio'],
  ['Create', '/create-free-storyboard'],
  ['Projects', '/studio/projects'],
  ['Review', '/studio/storyboard-corrections'],
  ['AI Harness', '/studio/agent-harness'],
  ['Exports', '/studio/export'],
  ['Billing', '/studio/billing'],
  ['Help', '/support']
];

export function AppShell({ children, active = 'Dashboard' }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="catalyst-shell">
      <aside className="catalyst-sidebar">
        <Link className="catalyst-brand" href="/">
          <img src="/brand/cineloom-app-icon.jpeg" alt="" />
          <span><strong>CineLoom.ai</strong><small>Studio</small></span>
        </Link>
        <nav aria-label="Studio navigation">
          {mainLinks.map(([label, href]) => (
            <Link key={label} href={href} className={active === label ? 'active' : ''}>{label}</Link>
          ))}
        </nav>
        <details className="catalyst-admin-drawer">
          <summary>Admin tools</summary>
          <Link href="/studio/super-admin">Super Admin</Link>
          <Link href="/studio/agent-harness">AI Harness</Link>
          <Link href="/studio/super-admin/agent-harness">Agent endpoint setup</Link>
          <Link href="/studio/security">Security</Link>
        </details>
      </aside>
      <main className="catalyst-main">
        <header className="catalyst-topbar">
          <div><span>Product workspace</span><strong>{active}</strong></div>
          <div className="catalyst-topbar-actions"><AIHarnessIconLink compact /><Link href="/create-free-storyboard">Create storyboard</Link></div>
        </header>
        {children}
      </main>
    </div>
  );
}
