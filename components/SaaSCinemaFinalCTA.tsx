import Link from 'next/link';

export function SaaSCinemaFinalCTA() {
  return (
    <section className="saas-final-cta">
      <div>
        <span className="section-kicker">Start with one scene</span>
        <h2>Make the first storyboard free. Upgrade when it becomes useful.</h2>
        <p>Designed for the same clarity expected from top SaaS products, with a cinema-specific experience for creators, producers, and studios.</p>
      </div>
      <div className="final-cta-actions">
        <Link className="btn primary big-cta" href="/create-free-storyboard">Create free storyboard</Link>
        <Link className="btn" href="/pricing">View pricing</Link>
      </div>
    </section>
  );
}
