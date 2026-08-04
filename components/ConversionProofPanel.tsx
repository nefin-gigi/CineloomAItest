import Link from 'next/link';
import { proofCards } from '@/lib/public-conversion-data';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';

export function ConversionProofPanel() {
  return (
    <section className="conversion-section final-proof-section">
      <div className="section-kicker">Designed for conversion and trust</div>
      <h2>Every page moves users toward the first storyboard, first export, and first paid project.</h2>
      <div className="proof-card-grid">
        {proofCards.map((card) => (
          <article className="proof-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
      <TrustMicrocopy />
      <div className="center-actions">
        <Link className="btn primary" href="/pricing">View plans and tokens</Link>
        <Link className="btn" href="/security">Review trust controls</Link>
      </div>
    </section>
  );
}
