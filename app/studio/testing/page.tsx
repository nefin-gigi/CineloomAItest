import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { hollywoodTestBench } from '@/lib/v1-data';

export default function TestingPage() {
  return (
    <AppShell active="Test Bench">
      <PageHeader eyebrow="Verification" title="Hollywood Storyboard Regression Test Bench">
        Tests CineLoom outputs against expected storyboard behavior using authorized/public-domain style fixtures, not unauthorized copyrighted uploads. This protects quality while keeping the demo legally safer.
      </PageHeader>
      <div className="grid three">
        <div className="card featured"><span className="badge premium">Golden fixtures</span><h3>Expected outputs</h3><p>Each script test has expected beats, scenes, shot grammar, storyboard panels, and QA scores.</p></div>
        <div className="card"><span className="badge">Regression</span><h3>No quality drift</h3><p>Every workflow change can be measured against a known-good director-approved output.</p></div>
        <div className="card"><span className="badge">Human scorecard</span><h3>Director rating</h3><p>Creative outputs receive human review scores in addition to AI evaluator scores.</p></div>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead><tr><th>Test Fixture</th><th>Expected Storyboard Behavior</th><th>Result</th><th>Score</th></tr></thead>
          <tbody>{hollywoodTestBench.map((row) => <tr key={row.test}><td><strong>{row.test}</strong></td><td>{row.expected}</td><td>{row.result}</td><td><strong>{row.score}%</strong></td></tr>)}</tbody>
        </table>
      </div>
      <div className="workflow-actions"><div className="workflow-helper">Production rule: only store and process scripts the user owns or has permission to use. Keep investor demos based on original CineLoom scripts.</div><button className="btn primary">Run Test Bench</button></div>
    </AppShell>
  );
}
