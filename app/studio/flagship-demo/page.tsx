import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { flagshipDemoScenes } from '@/lib/billion-platform-data';

export default function FlagshipDemoPage() {
  return (
    <AppShell active="Flagship Demo">
      <PageHeader eyebrow="Spielberg-level proof" title="One unforgettable 60-second flagship demo" description="A finished sample scene designed to sell the platform: emotional storyboard, animatic, audio, export package, rights receipt, and share/remix flow." />
      <section className="grid two">
        <div className="card featured"><span className="badge red">Demo arc</span><h2>60-second director presentation</h2><div className="stage-checklist">{flagshipDemoScenes.map((item) => <div className="check" key={item.scene}><span><strong>{item.scene}</strong><small>{item.time} · {item.output}</small></span><span>Locked</span></div>)}</div></div>
        <div className="card"><span className="badge green">Conversion goal</span><h2>Make the viewer ask for access</h2><p className="muted">The flagship demo is not another screen. It is the emotional proof that turns CineLoom from an app into a must-have film platform.</p><div className="feature-list"><div className="feature-row"><strong>Director proof</strong><span>Shot design, 180-degree geography, revised panels, and approved animatic.</span></div><div className="feature-row"><strong>Investor proof</strong><span>One export package with monetization, API, and enterprise trust story.</span></div><div className="feature-row"><strong>Creator proof</strong><span>Free sample can be shared, remixed, upgraded, and exported.</span></div><div className="feature-row"><strong>Enterprise proof</strong><span>Private workspace, IP controls, audit events, and storage contracts.</span></div></div></div>
      </section>
    </AppShell>
  );
}
