import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { beatVerificationRows } from '@/lib/v1-data';

export default function BeatVerificationPage() {
  return (
    <AppShell active="Beat Verification">
      <PageHeader eyebrow="Stage 1A Verification" title="Beat Breakdown QA & Iteration Engine">
        Verifies the Hollywood continuity beat breakdown before scene and shot design. The director can approve one beat, revise one beat, or regenerate one beat without disturbing the full project.
      </PageHeader>
      <div className="grid three">
        <div className="card featured"><span className="badge premium">Verifier Pass</span><h3>Save-the-Cat Coverage</h3><p>Checks whether the project contains the expected structural checkpoints and whether each one maps to scene evidence.</p></div>
        <div className="card"><span className="badge">AI second opinion</span><h3>Evaluator Agent</h3><p>A separate critique pass scores the first AI result and asks for targeted corrections where the beat is weak.</p></div>
        <div className="card"><span className="badge">Human approval gate</span><h3>Director Lock</h3><p>Approved beats become locked source of truth for scenes, shot design, storyboard panels, and animatic timing.</p></div>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead><tr><th>Beat</th><th>Expected Function</th><th>Detected CineLoom Result</th><th>Score</th><th>Director Action</th></tr></thead>
          <tbody>
            {beatVerificationRows.map((row) => (
              <tr key={row.beat}>
                <td><strong>{row.beat}</strong></td><td>{row.expected}</td><td>{row.detected}</td><td><strong>{row.score}%</strong></td><td><StatusBadge status={row.action === 'Approved' ? 'Approved' : 'Needs Review'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="workflow-actions"><div className="workflow-helper">Next action: revise Theme Stated and Catalyst only, then lock the beat map for Scene Breakdown.</div><div className="actions"><button className="btn">Regenerate selected beat</button><button className="btn primary">Approve verified beats</button></div></div>
    </AppShell>
  );
}
