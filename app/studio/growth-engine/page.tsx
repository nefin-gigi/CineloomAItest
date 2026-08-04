import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { GrowthLoopsGrid } from '@/components/BillionDollarPlatformConsole';

export default function GrowthEnginePage() {
  return <AppShell active="Growth Engine"><PageHeader eyebrow="Growth" title="Viral creator growth loops" description="Watermarked previews, public share pages, remix buttons, referrals, template marketplace, and SEO example galleries to drive repeat acquisition." /><GrowthLoopsGrid /></AppShell>;
}
