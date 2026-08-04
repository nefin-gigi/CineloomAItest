import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { SaaS10CommandCenter } from '@/components/SaaS10CommandCenter';

export default function SaaS10Page() {
  return (
    <AppShell active="SaaS 10/10">
      <PageHeader
        eyebrow="CineLoom SaaS 10/10"
        title="Customer, revenue, security and scale command center"
        description="A film-industry SaaS scorecard that maps every customer segment, production control, endpoint contract, and go-live gate needed for a 10/10 platform experience."
      />
      <SaaS10CommandCenter />
    </AppShell>
  );
}
