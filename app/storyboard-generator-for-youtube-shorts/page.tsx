import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Vertical creator templates', 'Fast 10-sec preview', 'Music and voice planning', 'Shareable watermarked results'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="storyboard_generator_for_youtube_shorts" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">YouTube Shorts creators</span>
        <h1>Storyboard vertical shorts, hooks, reels, and serial scenes faster.</h1>
        <p>Create repeatable short-form storyboards with visual hooks, timing, voice/music notes, and watermarked sharing.</p>
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
