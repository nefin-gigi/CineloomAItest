import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { PublicSampleOutputGallery } from '@/components/PublicSampleOutputGallery';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';
import { TrackedCTA } from '@/components/TrackedCTA';

export default function SamplePackagePage() {
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="sample_package_v4_1" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Downloadable proof</span>
        <h1>Open a real CineLoom sample storyboard package before signup.</h1>
        <p>Use this page to show customers exactly what a free watermarked package can include: storyboard PDF, shot list CSV, prompt JSON, preview frames, and a bundled ZIP export.</p>
        <div className="actions hero-actions">
          <TrackedCTA href="/sample-output/cineloom-public-sample-package.zip" className="btn primary" event="sample_package_page_zip_downloaded" label="Sample package page ZIP" stage="sample-package" download>Download ZIP package</TrackedCTA>
          <TrackedCTA href="/create-free-storyboard" className="btn" event="sample_package_create_clicked" label="Sample package create CTA" stage="sample-package">Create my free storyboard</TrackedCTA>
        </div>
        <TrustMicrocopy compact />
      </section>
      <PublicSampleOutputGallery />
          <SimpleFooter />
    </main>
  );
}
