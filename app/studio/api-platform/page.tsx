import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ApiPlatformTable } from '@/components/BillionDollarPlatformConsole';

export default function StudioApiPlatformPage() {
  return <AppShell active="API Platform"><PageHeader eyebrow="Developer Platform" title="CineLoom API products" description="Metered APIs for script analysis, shot design, storyboard generation, animatic rendering, continuity QA, and export packages." /><ApiPlatformTable /></AppShell>;
}
