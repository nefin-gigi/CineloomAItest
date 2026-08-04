import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { FirstTimeOnboarding } from '@/components/FirstTimeOnboarding';
import { OnePathWorkflow } from '@/components/OnePathWorkflow';
import { PlainLanguageTrustStrip } from '@/components/PlainLanguageTrustStrip';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function StartPage() {
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="start_simple_v54" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Simple start</span>
        <h1>What do you want CineLoom to create for you?</h1>
        <p>Pick one option. You do not need to understand AI, film software, prompts, tokens, or production systems.</p>
      </section>
      <PlainLanguageTrustStrip />
      <FirstTimeOnboarding />
      <OnePathWorkflow />
      <SimpleFooter />
    </main>
  );
}
