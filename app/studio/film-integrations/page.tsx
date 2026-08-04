import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { FilmIntegrationsTable } from '@/components/BillionDollarPlatformConsole';

export default function FilmIntegrationsPage() {
  return <AppShell active="Film Integrations"><PageHeader eyebrow="Film Integrations" title="Production workflow integration hub" description="Endpoint contracts for Final Draft, Fountain, Frame.io, Premiere, Resolve, ShotGrid, Monday.com, Slack, Drive, Dropbox, YouTube, and TikTok." /><FilmIntegrationsTable /></AppShell>;
}
