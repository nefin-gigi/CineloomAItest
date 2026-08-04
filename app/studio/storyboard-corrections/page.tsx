import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { PromptCorrectionStudio } from '@/components/PromptCorrectionStudio';

export default function StoryboardCorrectionsPage() {
  return (
    <AppShell active="Storyboard Corrections">
      <PageHeader eyebrow="Director Prompt Controls" title="Prompt-Driven Storyboard Corrections">
        Revise a single storyboard frame with plain-English direction while locking character continuity, location, style, aspect ratio, and 180-degree screen geography.
      </PageHeader>
      <PromptCorrectionStudio />
    </AppShell>
  );
}
