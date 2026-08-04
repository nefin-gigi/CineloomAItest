import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ExecutionLaunchReadinessConsole } from '@/components/ExecutionLaunchReadinessConsole';

export default function ExecutionLaunchPage() {
  return (
    <AppShell active="Execution Launch">
      <PageHeader eyebrow="Super Admin" title="Execution launch core">
        Live storyboard endpoint, export endpoint, and Redis-backed rate limiting for paid SaaS launch.
      </PageHeader>
      <ExecutionLaunchReadinessConsole />
    </AppShell>
  );
}
