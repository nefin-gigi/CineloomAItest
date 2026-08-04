import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { MarketplaceGrid } from '@/components/BillionDollarPlatformConsole';

export default function StudioMarketplacePage() {
  return <AppShell active="Marketplace"><PageHeader eyebrow="Marketplace" title="Template, style, and production pack marketplace" description="A revenue-share ecosystem for storyboard templates, visual styles, shot packs, voices, music cues, and production export templates." /><MarketplaceGrid /></AppShell>;
}
