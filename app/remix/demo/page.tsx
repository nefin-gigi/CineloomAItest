import { PublicNav } from '@/components/PublicNav';
import { Sample10StoryboardGenerator } from '@/components/Sample10StoryboardGenerator';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';

export default function RemixDemoPage() {
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="remix_demo_v4_1" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Remix growth loop</span>
        <h1>Remix the shared storyboard into your own 10-second scene.</h1>
        <p>This page turns public watermarked shares into product-led growth. Visitors can modify the scene, generate a new preview, then sign up to export clean assets.</p>
        <TrustMicrocopy compact />
      </section>
      <Sample10StoryboardGenerator />
    </main>
  );
}
