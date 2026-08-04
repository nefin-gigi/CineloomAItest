import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ScaleReadinessConsole } from '@/components/ScaleReadinessConsole';

export default function ScaleReadinessPage() {
  return (
    <AppShell active="Scale Readiness">
      <PageHeader
        eyebrow="Super Admin · Scale"
        title="Production scale readiness for 2000 concurrent users"
        description="Plan-aware throttling, queue-first jobs, token transactions, private assets, provider failover, observability, and load-test artifacts for a film-industry SaaS launch."
      />
      <ScaleReadinessConsole />
    </AppShell>
  );
}
