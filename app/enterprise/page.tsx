import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { EnterpriseTrustGrid } from '@/components/BillionDollarPlatformConsole';

export default function EnterprisePage() {
  return (
    <main className="v3-marketing-page">
      <PublicNav />
      <section className="v3-marketing-hero">
        <span className="badge red">Studio trust layer</span>
        <h1 className="gradient-text">Enterprise controls for confidential scripts and production teams.</h1>
        <p>Studios need more than AI generation. They need identity, auditability, IP rights, model-training controls, private storage, retention controls, and contractual trust.</p>
      </section>
      <EnterpriseTrustGrid />
          <SimpleFooter />
    </main>
  );
}
