import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { AgentHarnessAdminConsole } from '@/components/AgentHarnessAdminConsole';

export default function SuperAdminAgentHarnessPage() {
  return (
    <AppShell active="AI Harness">
      <PageHeader eyebrow="Super Admin" title="ChatGPT Agent Harness endpoint integration">
        Configure and test plug-and-play backend endpoints for director-controlled single-board storyboard corrections.
      </PageHeader>
      <AgentHarnessAdminConsole />
    </AppShell>
  );
}
