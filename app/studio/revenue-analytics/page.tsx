import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { revenueMetrics } from '@/lib/v3-production-data';

export default function RevenueAnalyticsPage() { return <AppShell active="Revenue Analytics"><PageHeader eyebrow="Analytics" title="Conversion, MRR, tokens, and margin analytics" description="Track the business health of CineLoom from visitor to free sample to subscription to repeat token usage." /><section className="grid three">{revenueMetrics.map((metric) => <article className="card" key={metric.label}><div className="kpi">{metric.value}</div><div className="kpi-label">{metric.label}</div><p>{metric.detail}</p></article>)}</section></AppShell>; }
