import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StoryboardFrame } from '@/components/StoryboardFrame';
import { styleEnginePresets } from '@/lib/v1-data';

const tones = ['gold', 'cool', 'night', 'warm', 'cool'] as const;

export default function StylesPage() {
  return (
    <AppShell active="Style System">
      <PageHeader eyebrow="Visual Output" title="Genre-Based Storyboard Style Engine">
        Choose safe, production-ready visual styles by genre. CineLoom uses generic family-animation and cinematic style labels rather than imitating protected brands or copyrighted styles.
      </PageHeader>
      <div className="grid three">
        {styleEnginePresets.map((style, index) => (
          <div className="card" key={style.style}>
            <StoryboardFrame label={style.style} tone={tones[index] || 'gold'} />
            <h3 style={{ marginTop: 14 }}>{style.style}</h3>
            <p><strong>Best for:</strong> {style.genre}</p>
            <p>{style.visualRules}</p>
            <span className="badge premium">{style.risk}</span>
            <div className="actions" style={{ marginTop: 12 }}><button className="btn">Preview</button><button className="btn primary">Apply Style</button></div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
