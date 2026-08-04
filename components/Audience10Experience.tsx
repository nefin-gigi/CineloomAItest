import Link from 'next/link';

const audienceScores = [
  {
    audience: 'Film enthusiasts',
    promise: 'A magical first storyboard in minutes',
    details: 'Start with any scene idea and see a cinematic visual plan with mood, emotion, and shot rhythm.',
    href: '/create-free-storyboard',
    accent: 'blue',
    proof: ['Instant try', 'Watermarked preview', 'Simple language']
  },
  {
    audience: 'YouTube / Reels creators',
    promise: 'Fast visual planning for shorts',
    details: 'Design story beats, vertical-friendly shots, music-video moments, devotional reels, and social video concepts.',
    href: '/storyboard-generator-for-youtube-shorts',
    accent: 'red',
    proof: ['Short-form ready', 'Mobile-first', 'Export prompts']
  },
  {
    audience: 'Film students',
    promise: 'Learn cinema by seeing structure',
    details: 'Understand beats, camera placement, continuity, 180° geography, panels, and animatic timing in one guided workflow.',
    href: '/film-school-storyboard-tool',
    accent: 'green',
    proof: ['Shot learning', 'Continuity cues', 'Review flow']
  },
  {
    audience: 'Indie filmmakers',
    promise: 'Turn script pages into production plans',
    details: 'Move from scene to shot list, panel notes, lens direction, blocking, and export-ready pitch files.',
    href: '/storyboard-generator-for-filmmakers',
    accent: 'blue',
    proof: ['Shot list CSV', 'Prompt package', 'Pitch exports']
  },
  {
    audience: 'Producers',
    promise: 'Better pitch packages before funding',
    details: 'Create visual proof for investors, actors, departments, and early budget conversations without waiting for full pre-production.',
    href: '/sample-package',
    accent: 'green',
    proof: ['PDF package', 'Animatic proof', 'Secure sharing']
  },
  {
    audience: 'Studios / enterprise',
    promise: 'Governed AI for private scripts',
    details: 'Route AI through secure endpoints, approval gates, provenance, audit controls, role access, and private asset policies.',
    href: '/enterprise',
    accent: 'red',
    proof: ['SSO contracts', 'Audit trails', 'Launch gates']
  }
];

const cinemaMoments = [
  ['Script', 'A scene is pasted or uploaded.'],
  ['Beats', 'The emotional structure is extracted.'],
  ['Shots', 'Camera, lens, movement, and blocking are planned.'],
  ['Panels', 'Storyboard cards are generated for review.'],
  ['Animatic', 'Timing, music, voice, and SFX direction are previewed.'],
  ['Export', 'A producer-ready package is downloaded.']
];

export function Audience10Experience() {
  return (
    <section className="audience-10-section" id="audience-10" aria-labelledby="audience-10-title">
      <div className="audience-10-header">
        <span className="section-kicker">Audience-ready experience</span>
        <h2 id="audience-10-title">Designed to feel 10/10 for every film audience.</h2>
        <p>
          The homepage now routes each visitor into a clear outcome: creators get speed, students get learning, filmmakers get production structure, producers get pitch proof, and studios get governance.
        </p>
      </div>

      <div className="audience-10-score-strip" aria-label="Audience ratings target">
        <strong>Target experience rating</strong>
        <span>10/10 clarity</span>
        <span>10/10 mobile flow</span>
        <span>10/10 cinema relevance</span>
        <span>10/10 SaaS trust</span>
      </div>

      <div className="cinema-moment-rail" aria-label="Script to export workflow">
        {cinemaMoments.map(([title, body], index) => (
          <article className="cinema-moment" key={title}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>

      <div className="audience-10-grid">
        {audienceScores.map((item) => (
          <Link href={item.href} className={`audience-10-card ${item.accent}`} key={item.audience}>
            <div className="audience-score-badge" aria-label={`${item.audience} target score`}>10/10</div>
            <h3>{item.audience}</h3>
            <strong>{item.promise}</strong>
            <p>{item.details}</p>
            <div className="audience-proof-tags">
              {item.proof.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <b className="audience-link-label">Open workflow →</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
