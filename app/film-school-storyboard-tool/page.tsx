import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Classroom demos', '5 Cs teaching aids', '180-degree layout', 'Exportable assignments'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="film_school_storyboard_tool" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Film schools and educators</span>
        <h1>Teach storyboarding, shot grammar, and 180-degree continuity with AI-assisted examples.</h1>
        <p>Students can paste scenes, compare beat/shot choices, review panel timing, and learn cinematic blocking.</p>
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
