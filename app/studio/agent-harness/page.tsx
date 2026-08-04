import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { LowTokenAgentWorkflow } from '@/components/LowTokenAgentWorkflow';

export default function StudioAgentHarnessPage() {
  return (
    <AppShell active="AI Harness">
      <PageHeader eyebrow="Lowest-token director agent" title="Change one board before dynamic stitching">
        Select one storyboard board, send only the smallest safe context to the AI agent, preview the JSON patch, and keep stitching blocked until the director approves.
      </PageHeader>
      <LowTokenAgentWorkflow />
    </AppShell>
  );
}
