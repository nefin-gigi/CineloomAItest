import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { StatusBadge } from '@/components/StatusBadge';
import { beats } from '@/lib/demo-data';

export default function BeatsPage() {
  return (
    <AppShell active="Beat Breakdown">
      <PageHeader eyebrow="Stage 1B" title="Beat Breakdown — Hollywood Continuity Style">
        Review story beats individually. Each beat includes scene range, emotional purpose, continuity notes, confidence, and verification guidance.
      </PageHeader>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Beat</th><th>Scene Range</th><th>Summary</th><th>Purpose</th><th>Continuity</th><th>Verification</th><th>Status</th></tr></thead>
          <tbody>{beats.map((beat) => <tr key={beat.id}><td><strong>{beat.name}</strong><br />AI confidence: {beat.aiConfidence}</td><td>{beat.sceneRange}</td><td>{beat.summary}</td><td>{beat.emotionalPurpose}</td><td>{beat.continuityNotes}</td><td>{beat.verification}</td><td><StatusBadge status={beat.status} /></td></tr>)}</tbody>
        </table>
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        <div className="card"><h3>Verification option 1</h3><p>Direct prompting with director iterations: “strengthen the catalyst,” “clarify theme,” “reduce melodrama.”</p></div>
        <div className="card"><h3>Verification option 2</h3><p>AI tooling checks: compare beats against story arc, scene summaries, and runtime distribution.</p></div>
        <div className="card"><h3>Fallback option</h3><p>Use structured beat schema and evaluator prompts when direct prompting is not consistent enough.</p></div>
      </div>
      <WorkflowActions nextLabel="Approve Beats" />
    </AppShell>
  );
}
