'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const commands = [
  { label: 'Create free storyboard', href: '/create-free-storyboard', group: 'Start' },
  { label: 'Watch flagship scene', href: '/flagship-scene', group: 'Proof' },
  { label: 'View examples', href: '/examples', group: 'Proof' },
  { label: 'Pricing', href: '/pricing', group: 'Business' },
  { label: 'Studio dashboard', href: '/studio', group: 'Studio' },
  { label: 'Storyboard review', href: '/studio/storyboard/static', group: 'Studio' },
  { label: 'AI harness', href: '/studio/ai-harness', group: 'Operations' },
  { label: 'Security command center', href: '/studio/security', group: 'Operations' },
  { label: 'Final production readiness', href: '/studio/final-production-10', group: 'Operations' }
];

export function ExperienceCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <>
      <button className="command-palette-launcher" onClick={() => setOpen(true)} aria-label="Open CineLoom command palette">
        <span>⌘K</span>
      </button>
      {open && (
        <div className="command-palette-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="command-palette" role="dialog" aria-modal="true" aria-label="CineLoom command palette" onMouseDown={(event) => event.stopPropagation()}>
            <div className="command-search-row">
              <span>⌘K</span>
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search journeys, examples, admin screens..." />
            </div>
            <div className="command-result-list">
              {filtered.map((item) => (
                <Link key={item.href} className="command-result" href={item.href} onClick={() => setOpen(false)}>
                  <small>{item.group}</small>
                  <strong>{item.label}</strong>
                </Link>
              ))}
              {!filtered.length && <div className="command-empty">No matching journeys found.</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
