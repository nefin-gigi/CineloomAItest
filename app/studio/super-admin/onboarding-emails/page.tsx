import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { OnboardingEmailFlow } from '@/components/OnboardingEmailFlow';

export default function SuperAdminOnboardingEmailsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Super Admin" title="Onboarding email flow" description="Connect lifecycle email providers and test the free-storyboard-to-paid-export onboarding journey." />
      <OnboardingEmailFlow />
    </AppShell>
  );
}
