import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { BillionDollarPlatformConsole } from '@/components/BillionDollarPlatformConsole';

export default function PlatformPage() {
  return (
    <main className="v3-marketing-page">
      <PublicNav />
      <section className="v3-marketing-hero">
        <span className="badge premium">AI film creation platform</span>
        <h1 className="gradient-text">From script to storyboard, animatic, pitch package, API, and marketplace.</h1>
        <p>CineLoom v3.3 adds the billion-dollar platform layer: viral free samples, API products, marketplace economics, enterprise trust, and film pipeline integrations.</p>
      </section>
      <BillionDollarPlatformConsole />
          <SimpleFooter />
    </main>
  );
}
