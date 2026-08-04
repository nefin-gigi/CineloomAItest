import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { overheadLayout } from '@/lib/v1-data';

export default function SpatialLayoutPage() {
  return (
    <AppShell active="Spatial Layout">
      <PageHeader eyebrow="180-Degree Geography" title="Overhead Spatial Layout & Continuity Map">
        Creates a director-readable top-down map for each scene: character distance, camera positions, screen direction, eyelines, props, movement paths, and axis-crossing warnings.
      </PageHeader>
      <div className="split">
        <div className="overhead-map">
          <div className="axis-line" />
          <div className="camera-cone" style={{ left: '18%', top: '54%', transform: 'rotate(18deg)' }} />
          <div className="camera-cone" style={{ left: '42%', top: '58%', transform: 'rotate(8deg)' }} />
          <div className="map-chip character" style={{ left: '39%', top: '39%' }}>Moses — C4</div>
          <div className="map-chip" style={{ left: '66%', top: '34%' }}>Ridge marker — F4</div>
          <div className="map-chip camera" style={{ left: '12%', top: '72%' }}>Camera A / 24mm</div>
          <div className="map-chip camera" style={{ left: '36%', top: '75%' }}>Camera B / 50mm</div>
          <div className="map-chip camera" style={{ left: '58%', top: '66%' }}>Camera C / 85mm</div>
        </div>
        <div className="grid">
          <div className="card featured"><span className="badge premium">Scene</span><h3>{overheadLayout.scene}</h3><p>{overheadLayout.axis}</p></div>
          <div className="card"><h3>Continuity Warnings</h3><div className="checklist">{overheadLayout.warnings.map((w) => <div className="check" key={w}><span>{w}</span><StatusBadge status="Approved" /></div>)}</div></div>
        </div>
      </div>
      <div className="grid two" style={{ marginTop: 18 }}>
        <div className="card"><h3>Characters / Distances</h3><div className="feature-list">{overheadLayout.characters.map((c) => <div className="feature-row" key={c.name}><strong>{c.name}</strong><span>{c.position} · {c.distance} · {c.screenDirection}</span></div>)}</div></div>
        <div className="card"><h3>Camera Positions</h3><div className="feature-list">{overheadLayout.cameras.map((c) => <div className="feature-row" key={c.shot}><strong>Shot {c.shot}: {c.lens}</strong><span>{c.position} · {c.purpose} · Axis {c.axisStatus}</span></div>)}</div></div>
      </div>
    </AppShell>
  );
}
