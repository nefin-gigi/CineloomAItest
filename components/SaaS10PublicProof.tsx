import Link from 'next/link';
import { customerSegments } from '@/lib/saas-10-platform';

export function SaaS10PublicProof() {
  return (
    <section className="grid">
      <div className="card featured">
        <div className="eyebrow">Built as a film SaaS platform</div>
        <h2>For creators, indie filmmakers, producers, agencies and studios</h2>
        <p>
          CineLoom is designed to sell through a simple customer journey: generate a free 10-second storyboard, revise with prompts, upgrade with tokens or subscription, and export a clean director package.
        </p>
        <div className="actions">
          <Link className="btn primary" href="/create-free-storyboard">Create free storyboard</Link>
          <Link className="btn" href="/pricing">View pricing</Link>
          <Link className="btn" href="/security">Security</Link>
        </div>
      </div>
      <div className="grid three">
        {customerSegments.slice(0, 6).map((segment) => (
          <div className="card" key={segment.segment}>
            <h3>{segment.segment}</h3>
            <p>{segment.promise}</p>
            <span className="status approved">{segment.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
