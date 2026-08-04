import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { productionReadiness } from '@/lib/v3-production-data';

export default function LaunchReadinessPage() { return <AppShell active="Launch Readiness"><PageHeader eyebrow="Production" title="Launch readiness checklist" description="Use this page as the final checklist before connecting cineloom.ai to public signup and payment." /><section className="card"><div className="table-wrap"><table><thead><tr><th>Area</th><th>Status</th><th>Requirement</th></tr></thead><tbody>{productionReadiness.map((item) => <tr key={item.area}><td><strong>{item.area}</strong></td><td>{item.status}</td><td>{item.requirement}</td></tr>)}</tbody></table></div></section></AppShell>; }
