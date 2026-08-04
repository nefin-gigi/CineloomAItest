import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Timeline timing', 'Scratch audio cues', 'MP4 export pattern', 'Review and approve flow'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="ai_animatic_generator" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">AI animatic generator</span>
        <h1>Convert approved storyboard panels into timed animatics.</h1>
        <p>Plan pacing, transitions, dialogue, music, SFX, and video handoff before expensive generation.</p>
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
