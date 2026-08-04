import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { reviewWorkflow } from '@/lib/v1-data';

export default function RevisionControlPage() {
  return (
    <AppShell active="Revision Locks">
      <PageHeader eyebrow="Review & Revision" title="Stage-by-Stage Approval, Versioning, and Locking">
        CineLoom v3.0 treats every creative level as reviewable: script, analysis, beat, scene, shot, panel, animatic, and video handoff. Approved work is locked and downstream changes show impact warnings.
      </PageHeader>
      <div className="grid three">
        <div className="card featured"><span className="badge premium">Director-safe</span><h3>Approve one item at a time</h3><p>Directors can approve a single beat, scene, shot, or panel without losing other approved decisions.</p></div>
        <div className="card"><span className="badge">Audit trail</span><h3>Who changed what</h3><p>Every approval, rejection, and regeneration request is designed to become an auditable project event.</p></div>
        <div className="card"><span className="badge">Impact warning</span><h3>Change propagation</h3><p>Changing a beat warns which scenes, shots, panels, and animatic timings may be affected.</p></div>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead><tr><th>Level</th><th>Director Decisions</th><th>Lock Rule</th></tr></thead>
          <tbody>{reviewWorkflow.map((row) => <tr key={row.level}><td><strong>{row.level}</strong></td><td>{row.decisions}</td><td>{row.lockRule}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="workflow-actions"><div className="workflow-helper">Recommended implementation: persist review events in Supabase/Postgres and never overwrite approved outputs. Create new versions instead.</div><button className="btn primary">Create Version v3.0.1</button></div>
    </AppShell>
  );
}
