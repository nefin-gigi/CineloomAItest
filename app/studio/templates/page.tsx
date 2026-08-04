import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { TemplateMarketplacePanel } from '@/components/TemplateMarketplacePanel';

export default function TemplatesPage() { return <AppShell active="Templates"><PageHeader eyebrow="Templates" title="Revenue templates and creative presets" description="Templates reduce friction and create expansion revenue for creators, agencies, churches, educators, and indie filmmakers." /><TemplateMarketplacePanel /></AppShell>; }
