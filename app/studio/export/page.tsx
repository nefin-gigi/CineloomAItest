import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ExportPackageSimulator } from '@/components/ExportPackageSimulator';
import { ExportValuePreview } from '@/components/ExportValuePreview';
import { ShareReviewPanel } from '@/components/ShareReviewPanel';
import { MobileStepProgress } from '@/components/MobileStepProgress';

export default function ExportPackagePage() {
  return (
    <AppShell active="Export Package">
      <MobileStepProgress active="Export" />
      <PageHeader eyebrow="Export Package" title="Download everything needed to share the storyboard." description="The export page makes the paid value obvious: storyboard PDF, shot list, prompt package, animatic preview, producer ZIP, and a review link." />
      <ExportValuePreview />
      <ExportPackageSimulator />
      <ShareReviewPanel />
    </AppShell>
  );
}
