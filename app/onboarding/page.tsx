import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { OnboardingEmailFlow } from '@/components/OnboardingEmailFlow';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

export default function OnboardingPage() {
  return (
    <main className="public-site-page compact-public-page">
      <ConversionAnalyticsTracker pageName="onboarding_email_flow_v4_1" />
      <PublicNav />
      <section className="conversion-page-hero">
        <span className="badge premium">Customer activation</span>
        <h1>Onboarding emails for the free-to-paid storyboard journey.</h1>
        <p>Move users from their first watermarked storyboard to prompt correction, clean export, subscription, and repeat projects.</p>
      </section>
      <OnboardingEmailFlow />
          <SimpleFooter />
    </main>
  );
}
