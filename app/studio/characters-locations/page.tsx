import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { characterBible, locationBible } from '@/lib/v1-data';

export default function CharacterBiblePage() {
  return (
    <AppShell active="Character Bible">
      <PageHeader eyebrow="Continuity Bible" title="Character & Location Consistency Engine">
        Users can enter characters and locations manually or let CineLoom derive them from the script. The bible then locks visual identity, voice, wardrobe, props, geography, and lighting across every panel and clip.
      </PageHeader>
      <div className="grid three">
        {characterBible.map((character) => (
          <div className="card featured" key={character.name}>
            <span className="badge premium">{character.status}</span>
            <h3 style={{ marginTop: 12 }}>{character.name}</h3>
            <p><strong>Visual:</strong> {character.visual}</p>
            <p><strong>Voice:</strong> {character.voice}</p>
            <p><strong>Continuity:</strong> {character.continuity}</p>
            <div className="actions"><button className="btn">Upload ref</button><button className="btn">Generate look</button><button className="btn primary">Lock</button></div>
          </div>
        ))}
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        {locationBible.map((location) => (
          <div className="card" key={location.location}>
            <span className="badge">Location</span>
            <h3 style={{ marginTop: 12 }}>{location.location}</h3>
            <p><strong>Geography:</strong> {location.geography}</p>
            <p><strong>Lighting:</strong> {location.lighting}</p>
            <p><strong>Continuity:</strong> {location.continuity}</p>
          </div>
        ))}
      </div>
      <WorkflowActions nextLabel="Approve Character & Location Bible" />
    </AppShell>
  );
}
