import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { StatusBadge } from '@/components/StatusBadge';
import { shots } from '@/lib/demo-data';
import { shotIntelligence } from '@/lib/v1-data';

export default function ShotsPage() {
  return (
    <AppShell active="Shot Design">
      <PageHeader eyebrow="Stage 1D" title="Shot Breakdown & Cinematography Plan">
        Design shots with camera movement, lens, composition, screen direction, 180-degree axis, and emotional purpose before storyboard generation.
      </PageHeader>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Shot</th><th>Camera</th><th>Lens</th><th>Composition</th><th>Purpose</th><th>Continuity</th><th>Status</th></tr></thead>
          <tbody>{shots.map((shot) => <tr key={shot.id}><td>{shot.number}</td><td><strong>{shot.shotType}</strong><br />{shot.angle}</td><td>{shot.camera}<br />{shot.movement}</td><td>{shot.lens}</td><td>{shot.composition}</td><td>{shot.purpose}</td><td>{shot.continuity}</td><td><StatusBadge status={shot.status} /></td></tr>)}</tbody>
        </table>
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        <div className="card featured"><h3>180-degree geography</h3><p>Axis, screen direction, camera side, and subject path are tracked before panel generation.</p></div>
        <div className="card"><h3>5 Cs coverage</h3><p>Camera angle, continuity, cutting, close-ups, and composition are represented in the shot review.</p></div>
        <div className="card"><h3>Director revision</h3><p>Each shot can be regenerated, edited manually, or locked before static storyboard creation.</p></div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>5 Cs Shot Intelligence</h3>
        <div className="feature-list" style={{ marginTop: 12 }}>
          {shotIntelligence.map((row) => <div className="feature-row" key={row.layer}><strong>{row.layer}</strong><span>{row.rule}<br />Example: {row.example}</span></div>)}
        </div>
      </div>
      <WorkflowActions nextLabel="Approve Shot Design" />
    </AppShell>
  );
}
