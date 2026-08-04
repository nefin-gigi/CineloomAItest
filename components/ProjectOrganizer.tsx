'use client';

import { useMemo, useState } from 'react';

const projects = [
  { name: 'The Door Opens', status: 'Review', type: 'Storyboard approved', updated: 'Today', tokens: '12,840' },
  { name: 'The Silent Path', status: 'Exported', type: 'Animatic ready', updated: 'Yesterday', tokens: '8,420' },
  { name: 'Rainy Melody Short', status: 'Draft', type: 'Script validation', updated: 'This week', tokens: '1,120' },
  { name: 'Bible Story Short', status: 'Shared', type: 'Producer review', updated: 'This week', tokens: '6,300' }
];

const tabs = ['All', 'Draft', 'Review', 'Exported', 'Shared'];

export function ProjectOrganizer() {
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => projects.filter((project) => {
    const matchesTab = tab === 'All' || project.status === tab;
    const matchesQuery = project.name.toLowerCase().includes(query.toLowerCase()) || project.type.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  }), [tab, query]);

  return (
    <section className="project-organizer" aria-label="Project organizer">
      <div className="project-toolbar">
        <input aria-label="Search projects" className="input" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="project-tabs" role="tablist" aria-label="Project filters">
          {tabs.map((item) => <button key={item} type="button" className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}
        </div>
      </div>
      <div className="grid two project-card-grid">
        {visible.map((project) => (
          <article className="card simple-project-card" key={project.name}>
            <div className="project-card-head"><span className="badge premium">{project.status}</span><small>{project.updated}</small></div>
            <h3>{project.name}</h3>
            <p>{project.type}</p>
            <div className="package-item"><strong>{project.tokens} tokens</strong><span>Available for this workspace</span></div>
            <div className="actions"><button className="btn primary">Open</button><button className="btn">Share</button><button className="btn ghost">Export</button></div>
          </article>
        ))}
      </div>
      {visible.length === 0 && <div className="card empty-state"><h3>No projects found</h3><p>Clear your search or start a new storyboard.</p></div>}
    </section>
  );
}
