import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Scene parsing', 'Shot design', 'Panel prompts', 'Director package exports'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="script_to_storyboard_generator" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Script-to-storyboard generator</span>
        <h1>Turn screenplay pages into visual storyboard panels.</h1>
        <p>CineLoom maps dialogue, action, locations, shots, and continuity so each panel has cinematic purpose.</p>
        <div className="actions hero-actions"><Link className="btn primary" href="/create-free-storyboard">Create my free storyboard</Link><Link className="btn" href="/examples">View examples</Link></div>
        <TrustMicrocopy compact />
      </section>
      <section className="conversion-section">
        <h2>Why this workflow helps</h2>
        <div className="proof-card-grid">
          {benefits.map((item) => <article className="proof-card" key={item}><h3>{item}</h3><p>CineLoom keeps the workflow visual, reviewable, prompt-correctable, and export-ready so users can move faster from story idea to production plan.</p></article>)}
        </div>
      </section>
          <SimpleFooter />
    </main>
  );
}
