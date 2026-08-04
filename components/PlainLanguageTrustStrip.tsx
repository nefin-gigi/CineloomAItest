const items = [
  ['Private by default', 'Your script stays inside your workspace controls.'],
  ['No surprise charges', 'You see token estimates before paid work.'],
  ['Human friendly', 'No technical setup needed to create your first storyboard.'],
  ['Export ready', 'Download files producers, editors, and AI tools can use.']
];

export function PlainLanguageTrustStrip() {
  return (
    <section className="simple-trust-strip" aria-label="Plain language trust promises">
      {items.map(([title, body]) => (
        <article key={title}>
          <strong>{title}</strong>
          <span>{body}</span>
        </article>
      ))}
    </section>
  );
}
