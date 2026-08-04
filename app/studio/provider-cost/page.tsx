import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { providerMatrix } from '@/lib/v1-data';

const costRows = [
  { mode: 'Storyboard only', output: '45 panels', estimate: '$3–$25', bestFor: 'Director approval and pitch package' },
  { mode: 'Storyboard + animatic', output: '90 sec rough animatic', estimate: '$10–$75', bestFor: 'Investor demo and producer review' },
  { mode: 'Premium video test', output: '5–8 generated clips', estimate: '$40–$300+', bestFor: 'Hollywood-style proof of concept' },
  { mode: 'Full short pilot', output: '8–15 minute packaged short', estimate: 'Provider-dependent', bestFor: 'Funded pilot after investment' }
];

export default function ProviderCostPage() {
  return (
    <AppShell active="Providers & Cost">
      <PageHeader eyebrow="Scale Plan" title="Provider Routing, Cost Tracking, and Runtime Estimate">
        Shows how CineLoom can switch between lower-cost storyboard mode, premium video generation, voice, music, storage, and queue workers while tracking cost per scene and per minute.
      </PageHeader>
      <div className="grid four">
        <div className="card featured"><span className="badge premium">Provider router</span><h3>Not locked in</h3><p>Adapters are designed for fal/Hunyuan, Kling, Runway, Flux/SDXL, and custom GPU workers.</p></div>
        <div className="card"><span className="badge">Cost guardrail</span><h3>Budget modes</h3><p>Low-cost, standard, and premium modes help keep demos financially controlled.</p></div>
        <div className="card"><span className="badge">Queue ready</span><h3>Async jobs</h3><p>Long-running generation should run through worker queues, not browser requests.</p></div>
        <div className="card"><span className="badge">Tracking</span><h3>Unit economics</h3><p>Estimate cost per panel, clip, scene, and finished minute for investors.</p></div>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table><thead><tr><th>Provider Layer</th><th>Mode</th><th>Use</th><th>Env Key</th><th>Status</th></tr></thead><tbody>{providerMatrix.map((row) => <tr key={row.provider}><td><strong>{row.provider}</strong></td><td>{row.mode}</td><td>{row.use}</td><td><span className="kbd">{row.env}</span></td><td>{row.status}</td></tr>)}</tbody></table>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table><thead><tr><th>Generation Mode</th><th>Output</th><th>Rough Estimate</th><th>Best For</th></tr></thead><tbody>{costRows.map((row) => <tr key={row.mode}><td><strong>{row.mode}</strong></td><td>{row.output}</td><td>{row.estimate}</td><td>{row.bestFor}</td></tr>)}</tbody></table>
      </div>
    </AppShell>
  );
}
