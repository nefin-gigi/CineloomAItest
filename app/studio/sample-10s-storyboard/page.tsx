import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { Sample10StoryboardGenerator } from '@/components/Sample10StoryboardGenerator';

export default function Sample10SecondStoryboardPage() {
  return (
    <AppShell active="10-Second Storyboard">
      <PageHeader eyebrow="Fast Try-Before-Subscribe Demo" title="Generate a 10-Second Storyboard Sample">
        Give a tiny story moment, pick a visual style, estimate token usage, generate 8 timed storyboard panels, and apply prompt-driven corrections without breaking continuity.
      </PageHeader>
      <Sample10StoryboardGenerator />
    </AppShell>
  );
}
