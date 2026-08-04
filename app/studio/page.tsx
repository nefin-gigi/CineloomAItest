import Link from 'next/link';
import { AppShell } from '@/components/AppShell';

const quickActions = [
  ['Create storyboard', 'Paste a scene and generate a clean visual preview.', '/create-free-storyboard'],
  ['Open projects', 'Continue saved storyboards and exports.', '/studio/projects'],
  ['Review panels', 'Fix shots in plain English.', '/studio/storyboard-corrections'],
  ['Export package', 'Download PDF, shot list, prompts, and ZIP.', '/studio/export']
];

const projects = [
  ['Rainy Backlot', '6 panels', 'Ready for review'],
  ['Music Video Opening', '12 panels', 'In progress'],
  ['Producer Pitch Scene', 'Export package', 'Exported']
];

export default function StudioHomePage() {
  return (
    <AppShell active="Dashboard">
      <section className="catalyst-page-head">
        <div>
          <p className="catalyst-eyebrow">CineLoom Studio</p>
          <h1>What do you want to create today?</h1>
          <p>Simple product workspace for storyboards, reviews, projects, exports, and billing.</p>
        </div>
        <Link className="catalyst-primary" href="/create-free-storyboard">Create storyboard</Link>
      </section>

      <section className="catalyst-quick-grid" aria-label="Primary studio actions">
        {quickActions.map(([title, body, href]) => (
          <Link className="catalyst-action-card" href={href} key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </Link>
        ))}
      </section>

      <section className="catalyst-card">
        <div className="catalyst-card-head">
          <div>
            <p className="catalyst-eyebrow">Recent projects</p>
            <h2>Pick up where you left off</h2>
          </div>
          <Link href="/studio/projects">View all</Link>
        </div>
        <div className="catalyst-project-table">
          {projects.map(([title, detail, status]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{detail}</span>
              <b>{status}</b>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
