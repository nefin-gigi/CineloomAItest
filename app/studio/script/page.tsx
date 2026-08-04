import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { ScriptValidatorDemo } from '@/components/ScriptValidatorDemo';
import { scriptParserFeatures } from '@/lib/v1-data';

export default function ScriptPage() {
  return (
    <AppShell active="Script Studio">
      <PageHeader eyebrow="Stage 0" title="Script Upload, Parsing & Validation" action={<Link className="btn" href="/studio/story-analysis">View Analysis</Link>}>
        Upload or paste a screenplay, then validate whether it can become beats, scenes, shots, storyboards, animatics, voice/music cues, and video provider packages.
      </PageHeader>
      <ScriptValidatorDemo />
      <div className="card" style={{ marginTop: 18 }}>
        <h3>v3.0 Parser + Token Capabilities</h3>
        <div className="feature-list" style={{ marginTop: 12 }}>
          {scriptParserFeatures.map((feature) => <div className="feature-row" key={feature.name}><strong>{feature.name}</strong><span>{feature.detail}</span></div>)}
        </div>
      </div>
    </AppShell>
  );
}
