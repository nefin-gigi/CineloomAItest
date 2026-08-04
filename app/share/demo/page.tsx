import Image from 'next/image';
import { PublicNav } from '@/components/PublicNav';
import { TrackedCTA } from '@/components/TrackedCTA';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

const panels = Array.from({ length: 8 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0');
  return { src: `/sample-output/cineloom-sample-panel-${n}.png`, label: `Panel ${n}` };
});

export default function SharedDemoPage() {
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="share_demo_v4_1" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Shared watermarked storyboard</span>
        <h1>Review, remix, or upgrade this CineLoom storyboard package.</h1>
        <p>This public share page is a growth loop: viewers see watermarked output, open the storyboard package, remix the scene, or subscribe to export clean production assets.</p>
        <div className="actions hero-actions">
          <TrackedCTA href="/remix/demo" className="btn primary" event="share_remix_clicked" label="Share demo remix" stage="share">Remix this scene</TrackedCTA>
          <TrackedCTA href="/sample-output/cineloom-public-sample-package.zip" className="btn" event="share_package_downloaded" label="Share sample package" stage="share" download>Download sample package</TrackedCTA>
          <TrackedCTA href="/pricing" className="btn" event="share_remove_watermark_clicked" label="Remove watermark pricing" stage="share">Remove watermark</TrackedCTA>
        </div>
      </section>
      <section className="conversion-section">
        <div className="public-sample-panel-grid">
          {panels.map((panel) => (
            <article className="public-sample-card" key={panel.src}>
              <div className="public-sample-image-wrap">
                <Image src={panel.src} alt={`${panel.label} watermarked storyboard`} width={960} height={540} />
                <span className="watermark-chip">CineLoom.ai preview</span>
              </div>
              <div className="public-sample-meta"><strong>{panel.label}</strong><span>Watermarked public preview frame</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
