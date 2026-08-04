import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Music cue planning', 'Visual motif boards', 'Timed animatics', 'Creative style presets'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="music_video_storyboard_generator" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Music video creators</span>
        <h1>Plan music videos, lyric scenes, and emotional visual sequences.</h1>
        <p>Convert song concepts into frames, rhythm beats, camera movement, and stylized visual packages.</p>
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
