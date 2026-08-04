import Image from 'next/image';
import { TrackedCTA } from '@/components/TrackedCTA';
import { TrustMicrocopy } from '@/components/TrustMicrocopy';

const flagshipPanels = Array.from({ length: 16 }, (_, index) => ({
  src: `/flagship/frames/flagship-panel-${String(index + 1).padStart(2, '0')}.png`,
  title: `Panel ${String(index + 1).padStart(2, '0')}`,
  note: ['Opening image', 'Script spark', 'Threshold', 'World opens', 'Character arrival', 'Axis lock', 'Close-up', 'Dolly push', 'Director note', 'Correction', 'Animatic', 'Audio cue', 'Export', 'Greenlight', 'Final image', 'End card'][index]
}));

export function FlagshipSceneShowcase({ compact = false }: { compact?: boolean }) {
  const visiblePanels = compact ? flagshipPanels.slice(0, 8) : flagshipPanels;
  return (
    <section className="conversion-section flagship-showcase">
      <div className="section-kicker">Flagship cinematic proof scene</div>
      <div className="flagship-headline-row">
        <div>
          <h2>A complete 60-second demo-safe storyboard and animatic package.</h2>
          <p>
            This sample gives directors, producers, and creators a full before-after story moment: 16 panels, 64-second animatic, shot list, prompt package, and public demo ZIP. In production, these files are generated through protected endpoints and signed downloads.
          </p>
        </div>
        <div className="flagship-actions">
          <TrackedCTA className="btn primary" href="/flagship/cineloom-flagship-60s-animatic.mp4" event="flagship_animatic_downloaded" label="Flagship animatic" stage="flagship" download>Download animatic MP4</TrackedCTA>
          <TrackedCTA className="btn" href="/flagship/cineloom-flagship-public-package.zip" event="flagship_package_downloaded" label="Flagship package" stage="flagship" download>Download flagship ZIP</TrackedCTA>
        </div>
      </div>
      <div className="flagship-video-frame">
        <video controls preload="metadata" poster="/flagship/frames/flagship-panel-01.png">
          <source src="/flagship/cineloom-flagship-60s-animatic.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flagship-panel-grid">
        {visiblePanels.map((panel) => (
          <article className="flagship-panel-card" key={panel.src}>
            <Image src={panel.src} alt={`${panel.title} - ${panel.note}`} width={960} height={540} />
            <div>
              <strong>{panel.title}</strong>
              <span>{panel.note}</span>
            </div>
          </article>
        ))}
      </div>
      <TrustMicrocopy />
    </section>
  );
}
