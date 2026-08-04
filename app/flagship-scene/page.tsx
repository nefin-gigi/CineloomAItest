import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';
import { FlagshipSceneShowcase } from '@/components/FlagshipSceneShowcase';
import { TrackedCTA } from '@/components/TrackedCTA';

export default function FlagshipScenePage() {
  return (
    <main className="public-site-page">
      <ConversionAnalyticsTracker pageName="flagship_scene" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Director proof scene</span>
        <h1>Watch the full CineLoom storyboard-to-animatic proof scene.</h1>
        <p>This demo-safe flagship scene shows the transformation from written moment to cinematic panels, animatic timing, prompt package, and director export bundle.</p>
        <div className="actions">
          <TrackedCTA className="btn primary" href="/create-free-storyboard" event="flagship_create_free_clicked" label="Create free storyboard" stage="flagship-page">Create my free storyboard</TrackedCTA>
          <TrackedCTA className="btn" href="/flagship/cineloom-flagship-public-package.zip" event="flagship_zip_from_page" label="Download flagship ZIP" stage="flagship-page" download>Download sample ZIP</TrackedCTA>
        </div>
      </section>
      <FlagshipSceneShowcase />
          <SimpleFooter />
    </main>
  );
}
