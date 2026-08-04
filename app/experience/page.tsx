import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';
import { PersonaJourneySelector } from '@/components/PersonaJourneySelector';
import { ProductionUXShowcase } from '@/components/ProductionUXShowcase';
import { FreeStoryboardGuidedFlow } from '@/components/FreeStoryboardGuidedFlow';

export default function ExperiencePage() {
  return (
    <main className="public-site-page premium-experience-page">
      <ConversionAnalyticsTracker pageName="experience_premium_v49" />
      <PublicNav />
      <section className="conversion-page-hero premium-experience-hero">
        <span className="badge premium">Premium UI/UX system</span>
        <h1>Designed so creators know what to do and studios know what to trust.</h1>
        <p>CineLoom v4.9 improves the full journey: landing, persona routing, free storyboard creation, director workflow, mobile navigation, accessibility, and production confidence.</p>
      </section>
      <PersonaJourneySelector />
      <ProductionUXShowcase />
      <FreeStoryboardGuidedFlow />
          <SimpleFooter />
    </main>
  );
}
