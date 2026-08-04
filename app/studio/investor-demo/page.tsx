import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { DirectorDemoExperience } from '@/components/DirectorDemoExperience';

export default function InvestorDemoPage() {
  return (
    <AppShell active="Guided Demo">
      <PageHeader eyebrow="CineLoom v3.0" title="Hollywood Director Experience">
        A single guided demo designed to feel premium, simple, and credible for directors, producers, investors, indie filmmakers, and film enthusiasts.
      </PageHeader>
      <DirectorDemoExperience />
    </AppShell>
  );
}
