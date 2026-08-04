'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';

type EndpointAwareLinkProps = {
  actionKey: string;
  href: string;
  className?: string;
  children: ReactNode;
  source?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function EndpointAwareLink({ actionKey, href, className, children, source = 'frontend_link', onClick }: EndpointAwareLinkProps) {
  function track(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    try {
      const payload = JSON.stringify({ actionKey, href, source, path: window.location.pathname });
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon('/api/frontend-action', new Blob([payload], { type: 'application/json' }));
      } else {
        void fetch('/api/frontend-action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true });
      }
    } catch {
      // Navigation should never fail because tracking failed.
    }
  }

  return (
    <Link href={href} className={className} onClick={track} data-endpoint-action={actionKey} data-endpoint-href={href}>
      {children}
    </Link>
  );
}
