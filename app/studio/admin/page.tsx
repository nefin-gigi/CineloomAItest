import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ProductionAdminDashboard } from '@/components/ProductionAdminDashboard';

export default function AdminPage() {
  return <AppShell active="Admin Dashboard"><PageHeader eyebrow="Admin" title="Revenue and production command center" description="Monitor MRR, conversion, tokens, provider cost, failed jobs, refunds, exports, and readiness before opening CineLoom to paying users." /><ProductionAdminDashboard /></AppShell>;
}
