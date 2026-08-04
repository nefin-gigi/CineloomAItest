import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { ApiPlatformTable } from '@/components/BillionDollarPlatformConsole';

export default function ApiPlatformPage() {
  return (
    <main className="v3-marketing-page">
      <PublicNav />
      <section className="v3-marketing-hero">
        <span className="badge blue">Developer API platform</span>
        <h1 className="gradient-text">CineLoom APIs for apps, studios, and creative platforms.</h1>
        <p>Offer script-to-beat, script-to-shot, storyboard generation, continuity QA, animatic rendering, and export packages as metered APIs.</p>
      </section>
      <ApiPlatformTable />
      <section className="grid three">
        {['API keys', 'Usage metering', 'Webhook callbacks', 'SDK roadmap', 'Rate limits', 'Enterprise private endpoints'].map((item) => <div className="card" key={item}><span className="badge premium">API</span><h3>{item}</h3><p className="muted">Production endpoint contract and Super Admin controls included in v3.3.</p></div>)}
      </section>
          <SimpleFooter />
    </main>
  );
}
