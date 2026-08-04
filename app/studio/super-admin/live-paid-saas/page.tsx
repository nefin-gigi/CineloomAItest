import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { LivePaidSaaSReadinessConsole } from '@/components/LivePaidSaaSReadinessConsole';

export default function LivePaidSaaSPage() {
  return (
    <AppShell active="Live Paid SaaS">
      <PageHeader eyebrow="Super Admin" title="Live paid SaaS 10/10 readiness">
        Hard launch gate for subscriptions, tokens, private storage, queue workers, AI execution, exports, observability, support, and legal/IP controls.
      </PageHeader>
      <LivePaidSaaSReadinessConsole />
    </AppShell>
  );
}
