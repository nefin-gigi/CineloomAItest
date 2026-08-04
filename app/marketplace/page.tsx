import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { MarketplaceGrid, GrowthLoopsGrid } from '@/components/BillionDollarPlatformConsole';

export default function MarketplacePage() {
  return (
    <main className="v3-marketing-page">
      <PublicNav />
      <section className="v3-marketing-hero">
        <span className="badge green">Template marketplace</span>
        <h1 className="gradient-text">Buy, sell, and remix cinematic production packs.</h1>
        <p>Templates turn CineLoom into a repeat-use platform: genre packs, shot packs, visual styles, music cues, voices, and export packages.</p>
      </section>
      <MarketplaceGrid />
      <section className="card featured"><h2>Marketplace revenue model</h2><p className="muted">Seller tools, review workflows, revenue-share contracts, marketplace payouts, and usage analytics are endpoint-ready for production implementation.</p></section>
      <GrowthLoopsGrid />
          <SimpleFooter />
    </main>
  );
}
