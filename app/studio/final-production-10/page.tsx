import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { FinalProduction10CommandCenter } from '@/components/FinalProduction10CommandCenter';

export default function FinalProduction10Page() {
  return (
    <AppShell active="Final Production 10/10">
      <PageHeader eyebrow="CineLoom v4.7" title="Final production 10/10 package">
        Production architecture, launch gates, revenue controls, enterprise trust, marketplace/API platform, and multi-billion company operating system.
      </PageHeader>
      <FinalProduction10CommandCenter />
    </AppShell>
  );
}
