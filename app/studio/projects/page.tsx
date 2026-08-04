import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';

const projects = [
  ['Rainy Backlot Reveal', 'Review', '6 panels · last opened today'],
  ['Music Video Opening', 'Draft', '4 panels · needs storyboard'],
  ['Investor Pitch Scene', 'Exported', 'PDF + ZIP ready']
];

export default function StudioProjectsPage() {
  return (
    <main className="bd-page">
      <PublicNav />
      <section className="bd-page-hero">
        <div className="bd-section-eyebrow">My projects</div>
        <h1 className="bd-page-title">Find your storyboard quickly.</h1>
        <p className="bd-page-subtitle">Simple project status for drafts, reviews, exports, and shared pitch packages.</p>
      </section>
      <section className="bd-section compact">
        <div className="bd-card" style={{marginBottom: 18}}>
          <label className="bd-field"><span>Search projects</span><input placeholder="Search by title or status" /></label>
        </div>
        <div className="bd-grid-3">
          {projects.map(([title, status, meta]) => (
            <article className="bd-card" key={title}>
              <div className="bd-section-eyebrow">{status}</div>
              <h3>{title}</h3>
              <p>{meta}</p>
              <Link href="/create-free-storyboard" className="bd-secondary-button" style={{marginTop: 18}}>Open</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
