import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { audioCueSheet, animaticTimeline } from '@/lib/v1-data';

export default function AudioStudioPage() {
  return (
    <AppShell active="Audio Studio">
      <PageHeader eyebrow="Dialogue / Voice / Music / Rough Cut" title="Audio Studio & Rough-Cut Cue Builder">
        Converts screenplay dialogue into character voice notes, scratch narration, music cues, sound effects, and rough-cut audio timing for the animatic and video handoff.
      </PageHeader>
      <div className="grid four">
        <div className="card featured"><span className="badge premium">Dialogue</span><h3>Screenplay extraction</h3><p>Character lines are mapped to scenes, panels, and timeline positions.</p></div>
        <div className="card"><span className="badge">Voice</span><h3>Scratch casting</h3><p>Assign a voice profile to each character for review-ready playback.</p></div>
        <div className="card"><span className="badge">Music</span><h3>Cue sheet</h3><p>Generates mood, tempo, instrumentation, and emotional transitions.</p></div>
        <div className="card"><span className="badge">SFX</span><h3>Sound design</h3><p>Exports scene ambience and Foley cues for rough-cut assembly.</p></div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Animatic Audio Timeline</h3>
        <div className="audio-track" style={{ marginTop: 12 }}>
          <div className="audio-cell"><strong>Track</strong>Storyboard timing</div>
          {animaticTimeline.map((item) => <div className="audio-cell" key={item.item}><strong>{item.item}</strong>{item.duration}<br />{item.motion}</div>)}
          <div className="audio-cell"><strong>Dialogue</strong>Screenplay</div>
          {animaticTimeline.map((item) => <div className="audio-cell" key={`${item.item}-dialogue`}>{item.dialogue}</div>)}
          <div className="audio-cell"><strong>Music</strong>Score</div>
          {animaticTimeline.map((item) => <div className="audio-cell" key={`${item.item}-music`}>{item.music}</div>)}
          <div className="audio-cell"><strong>SFX</strong>Sound</div>
          {animaticTimeline.map((item) => <div className="audio-cell" key={`${item.item}-sfx`}>{item.sfx}</div>)}
        </div>
      </div>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead><tr><th>Scene</th><th>Dialogue</th><th>Voice</th><th>Music</th><th>SFX</th></tr></thead>
          <tbody>{audioCueSheet.map((row) => <tr key={row.scene}><td><strong>{row.scene}</strong></td><td>{row.dialogue}</td><td>{row.voice}</td><td>{row.music}</td><td>{row.sfx}</td></tr>)}</tbody>
        </table>
      </div>
    </AppShell>
  );
}
