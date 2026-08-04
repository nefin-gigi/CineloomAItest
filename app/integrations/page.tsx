import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { FilmIntegrationsTable } from '@/components/BillionDollarPlatformConsole';

export default function IntegrationsPage() {
  return (
    <main className="v3-marketing-page">
      <PublicNav />
      <section className="v3-marketing-hero">
        <span className="badge premium">Film workflow integrations</span>
        <h1 className="gradient-text">Fit CineLoom into the tools film teams already use.</h1>
        <p>Final Draft, Fountain, Frame.io, Premiere, Resolve, ShotGrid, Monday.com, Slack, Drive, Dropbox, YouTube, and TikTok contracts are mapped for plug-and-play execution.</p>
      </section>
      <FilmIntegrationsTable />
          <SimpleFooter />
    </main>
  );
}
