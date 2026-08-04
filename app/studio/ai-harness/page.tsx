import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { AIHarnessCommandCenter } from '@/components/AIHarnessCommandCenter';

export default function AIHarnessPage() {
  return (
    <AppShell active="AI Harness">
      <PageHeader eyebrow="Validate output quality" title="AI harness and film-quality scoring">
        Review how CineLoom protects film output quality across scripts, shots, storyboard panels, animatics, exports, and provider routing.
      </PageHeader>
      <AIHarnessCommandCenter />
    </AppShell>
  );
}
