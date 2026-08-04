import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { SaaS10CommandCenter } from '@/components/SaaS10CommandCenter';

export default function SaaSCommandCenterPage() {
  return (
    <AppShell active="SaaS Command Center">
      <PageHeader
        eyebrow="Super Admin · SaaS operations"
        title="10/10 SaaS platform operations"
        description="Control acquisition, activation, monetization, retention, support, security, enterprise trust, endpoint execution, and launch gates from one Super Admin view."
      />
      <SaaS10CommandCenter />
    </AppShell>
  );
}
