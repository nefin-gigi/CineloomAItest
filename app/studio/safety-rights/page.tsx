import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { SafetyRightsPanel } from '@/components/SafetyRightsPanel';

export default function SafetyRightsPage() { return <AppShell active="Safety & Rights"><PageHeader eyebrow="Trust" title="Rights, safety, and commercial usage controls" description="A revenue-generating CineLoom must protect customer scripts, provider terms, likeness rights, copyrighted styles, and commercial-use boundaries." /><SafetyRightsPanel /></AppShell>; }
