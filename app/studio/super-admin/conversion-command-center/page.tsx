import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ConversionCommandCenter } from '@/components/ConversionCommandCenter';

export default function ConversionCommandCenterPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Super Admin" title="Conversion Command Center" description="Public SaaS website readiness, audience landing pages, CTA clarity, trust microcopy, pricing, and free-to-paid storyboard funnel controls." />
      <ConversionCommandCenter />
    </AppShell>
  );
}
