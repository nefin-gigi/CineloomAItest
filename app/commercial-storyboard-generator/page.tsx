import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function AudiencePage() {
  const benefits = ['Client pitch boards', 'Product insert shots', 'Brand-safe templates', 'Clean paid exports'];
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="commercial_storyboard_generator" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Ad agencies</span>
        <h1>Create client-ready commercial storyboards and pitch boards.</h1>
        <p>Turn a product idea or ad script into polished visual boards, shot lists, and branded export packages.</p>
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
