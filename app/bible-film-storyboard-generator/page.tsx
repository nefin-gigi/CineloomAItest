import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Faith-friendly templates', 'Cinematic biblical scenes', 'Family-safe styles', 'Church media exports'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="bible_film_storyboard_generator" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Faith and Bible film creators</span>
        <h1>Create respectful cinematic storyboards for faith-based stories.</h1>
        <p>Storyboard Bible scenes, devotional shorts, sermon visuals, children’s stories, and church media projects.</p>
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
