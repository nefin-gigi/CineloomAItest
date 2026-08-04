import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedExportCenter } from '@/components/ProtectedExportCenter';

export default function SecureExportsPage() { return <AppShell active="Secure Exports"><PageHeader eyebrow="Exports" title="Protected clean exports and watermarked previews" description="Revenue-ready exports require plan checks, token checks, role checks, and authenticated delivery. Preview users receive watermarked output." /><ProtectedExportCenter /></AppShell>; }
