import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Director review mode', '5 Cs shot design', '180-degree geography', 'Investor pitch package'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="storyboard_generator_for_filmmakers" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Indie filmmakers</span>
        <h1>Build shot-ready storyboards and pitch packages before production.</h1>
        <p>Go from script to beat, scene, shot, 180-degree layout, storyboard, animatic, and producer export.</p>
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
