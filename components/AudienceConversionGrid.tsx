import Link from 'next/link';
import { useCases } from '@/lib/public-conversion-data';

export function AudienceConversionGrid() {
  return (
    <section className="conversion-section">
      <div className="section-kicker">Built for film creators</div>
      <h2>Start with the workflow that matches your production.</h2>
      <div className="audience-grid">
        {useCases.map((item) => (
          <Link className="audience-card" href={item.slug} key={item.slug}>
            <h3>{item.title}</h3>
            <p>{item.promise}</p>
            <span>{item.cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
