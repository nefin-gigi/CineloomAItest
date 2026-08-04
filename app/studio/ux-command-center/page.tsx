import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { UXCommandCenter } from '@/components/UXCommandCenter';

export default function StudioUXCommandCenterPage() {
  return (
    <AppShell active="UX Command Center">
      <PageHeader eyebrow="CineLoom v4.9" title="Premium UI/UX command center">
        Track the product experience across creator onboarding, director workflows, enterprise trust, accessibility, mobile usability, and conversion clarity.
      </PageHeader>
      <UXCommandCenter />
    </AppShell>
  );
}
