import Link from 'next/link';
import { PublicPageShell } from '@/components/PublicPageShell';

const plans = [
  ['Free Preview', '$0', 'Try one scene', ['Watermarked preview', '6 sample panels', 'No credit card']],
  ['Creator', '$29', 'For short-form creators', ['Clean exports', 'Monthly preview tokens', 'Project history']],
  ['Studio', '$149', 'For indie teams', ['Team workspace', 'Review links', 'Higher token limits']],
  ['Producer', '$399', 'For pitches and agencies', ['Branded exports', 'Priority processing', 'Client-ready packages']]
];

export default function PricingPage() {
  return (
    <PublicPageShell eyebrow="Pricing" title="Start free. Upgrade when the export is valuable." subtitle="Simple subscriptions plus token packs give creators control and keep AI costs predictable.">
      <section className="bd-section compact">
        <div className="bd-grid-4">
          {plans.map(([name, price, description, features], index) => (
            <article className={`bd-card ${index === 2 ? 'bd-featured-card' : ''}`} key={name as string}>
              <h3>{name}</h3>
              <div className="bd-price">{price}<small>{price === '$0' ? '' : '/mo'}</small></div>
              <p>{description}</p>
              <ul className="bd-simple-list" style={{marginTop: 18}}>
                {(features as string[]).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className={index === 0 ? 'bd-secondary-button' : 'bd-primary-button'} href="/create-free-storyboard" style={{marginTop: 22, width: '100%'}}>{index === 0 ? 'Try free' : 'Start plan'}</Link>
            </article>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
