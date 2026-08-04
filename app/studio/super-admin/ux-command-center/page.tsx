import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { UXCommandCenter } from '@/components/UXCommandCenter';

export default function SuperAdminUXCommandCenterPage() {
  return (
    <AppShell active="UX Command Center">
      <PageHeader eyebrow="Super Admin · v4.9" title="Production UX readiness">
        Validate customer journeys, UI clarity, conversion paths, accessibility, and launch confidence before the public beta or paid launch is enabled.
      </PageHeader>
      <UXCommandCenter />
    </AppShell>
  );
}
