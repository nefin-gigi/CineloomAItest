import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { BillionDollarPlatformConsole } from '@/components/BillionDollarPlatformConsole';

export default function BillionScalePage() {
  return (
    <AppShell active="Billion Scale">
      <PageHeader eyebrow="Platform Strategy" title="Billion-dollar platform readiness" description="Marketplace, API, enterprise trust, growth loops, and integration capabilities layered on top of CineLoom's story-to-screen engine." />
      <BillionDollarPlatformConsole />
    </AppShell>
  );
}
