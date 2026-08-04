const policies = [
  ['Rights confirmation', 'User confirms they own or control uploaded script, references, likenesses, voices, and music inputs.'],
  ['Commercial usage gate', 'Paid plans grant commercial export rights subject to provider terms and user-owned content.'],
  ['Public figure guardrails', 'Blocks or reviews unauthorized likeness/persona usage for living people and protected identities.'],
  ['Style safety', 'Uses generic visual descriptions instead of copying protected show or artist styles.'],
  ['Private storage', 'Confidential scripts and assets should be stored outside /public and delivered through signed URLs.'],
  ['Deletion controls', 'Users can delete projects, scripts, generated assets, and workspace data.']
];

export function SafetyRightsPanel() {
  return <div className="grid two">{policies.map(([title, body]) => <article className="card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>;
}
