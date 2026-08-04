import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';
import { VerifiedProofCapture } from '@/components/VerifiedProofCapture';

export default function CustomerProofPage() {
  return (
    <main className="public-site-page">
      <ConversionAnalyticsTracker pageName="customer_proof" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Beta proof program</span>
        <h1>Collect verified customer proof for launch without fake testimonials.</h1>
        <p>Use this page with early filmmakers, creators, educators, and producers after real demos or pilot exports. Quotes stay in review until approved for public use.</p>
      </section>
      <section className="conversion-section">
        <VerifiedProofCapture />
      </section>
          <SimpleFooter />
    </main>
  );
}
