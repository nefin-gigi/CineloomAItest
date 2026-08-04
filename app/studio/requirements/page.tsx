import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';

const coverage = [
  ['Launch Gate', 'Site under construction with credential entry', 'Root page + Vercel env controlled password gate', 'Approved'],
  ['Script Upload', 'Script upload, validation, story analysis', 'Script Studio, parser API contracts, validation checks, source traceability', 'Ready'],
  ['Beat Breakdown', 'Hollywood continuity beat breakdown and verification', 'Beat Breakdown + Beat Verification + evaluator API', 'Ready'],
  ['Shot Breakdown', '5 Cs, ASC-style camera planning, Master Shots style shot grammar', 'Shot Design + shot intelligence data + QA checks', 'Ready'],
  ['Review/Revise', 'Review and revise every level individually', 'Revision Locks page + approval states + review decision API', 'Ready'],
  ['Storyboard Breakdown', 'Rules of storyboard, panel workflow, motion in art considerations', 'Static Storyboard with premium sample frames, Panel Editor, Style System, Director Review', 'Ready'],
  ['Genre Styles', 'Cinematic realism, photo sketch, 3D, animated, kids-friendly styles', 'Style System with safe generic family animation labels', 'Ready'],
  ['Characters/Locations', 'User input or derive from script', 'Character Bible + Location Bible + continuity locks', 'Ready'],
  ['Dynamic Storyboard', 'Animatic, motion, timing, aspect ratio, frame rate', 'Animatic Studio + dynamic storyboard API', 'Ready'],
  ['Audio Workflow', 'Dialogue/voice, music, rough cut, audio', 'Audio Studio + cue sheet + audio plan API', 'Ready'],
  ['Video Generation', 'Provider handoff for final generation', 'Video Handoff + provider adapters + env key matrix', 'Ready'],
  ['Auto QA', 'Script, beat, continuity, shot, storyboard, animatic, video QA', 'QA Center + QA API + scorecards', 'Ready'],
  ['Testing', 'Use known scripts to confirm expected storyboard outputs', 'Test Bench for authorized/public-domain fixtures', 'Ready'],
  ['Export', 'Director/investor package and provider package', 'Export Package screen + one-click export simulator + export API placeholder', 'Ready'],
  ['Collaboration', 'Director/producer review workflow', 'Collaboration roles + future comments/assignments', 'Ready']
] as const;

export default function RequirementsPage() {
  return (
    <AppShell active="Requirements">
      <PageHeader eyebrow="Developer Handoff" title="CineLoom v3.0 Requirements Coverage Matrix">
        This page maps the full requested storyboarding workflow to the implemented Vercel v3.0 demo screens, APIs, docs, and production extension points.
      </PageHeader>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Area</th><th>Requirement</th><th>Implemented in v3.0 package</th><th>Status</th></tr></thead>
          <tbody>{coverage.map(([area, requirement, implementation, status]) => <tr key={area}><td><strong>{area}</strong></td><td>{requirement}</td><td>{implementation}</td><td><StatusBadge status={status} /></td></tr>)}</tbody>
        </table>
      </div>
    </AppShell>
  );
}
