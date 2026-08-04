'use client';

import { useMemo, useState } from 'react';

type UserType = 'creator' | 'filmmaker' | 'producer' | 'studio';

const plans: Record<UserType, { title: string; price: string; reason: string; bullets: string[] }> = {
  creator: {
    title: 'Creator',
    price: '$29/mo',
    reason: 'Best for YouTube Shorts, reels, music videos, and small personal projects.',
    bullets: ['Create quick storyboard previews', 'Export clean packages', 'Enough tokens for regular short-form planning']
  },
  filmmaker: {
    title: 'Studio',
    price: '$149/mo',
    reason: 'Best for indie filmmakers and small teams making multiple scenes.',
    bullets: ['Team seats', 'More monthly tokens', 'Storyboard, animatic, and export workflow']
  },
  producer: {
    title: 'Producer',
    price: '$399/mo',
    reason: 'Best for pitch packages, investor previews, and agency/client presentations.',
    bullets: ['Large token allowance', 'Unlimited projects pattern', 'Pitch-ready exports and priority queue']
  },
  studio: {
    title: 'Enterprise',
    price: 'Custom',
    reason: 'Best for secure studio workflows, private endpoints, approvals, and governance.',
    bullets: ['Private workspace', 'SSO/SAML path', 'Audit logs, data retention, and security controls']
  }
};

const options: Array<[UserType, string]> = [
  ['creator', 'Creator'],
  ['filmmaker', 'Filmmaker'],
  ['producer', 'Producer'],
  ['studio', 'Studio / Enterprise']
];

export function PlanAdvisor() {
  const [type, setType] = useState<UserType>('creator');
  const plan = useMemo(() => plans[type], [type]);

  return (
    <section className="simple-section plan-advisor" aria-label="Plan advisor">
      <div className="simple-section-head compact">
        <span className="section-kicker">Plan helper</span>
        <h2>Not sure which plan to pick?</h2>
        <p>Choose who you are. CineLoom will point you to the simplest starting plan.</p>
      </div>
      <div className="plan-advisor-shell">
        <div className="plan-advisor-tabs" role="tablist" aria-label="User type">
          {options.map(([value, label]) => (
            <button key={value} className={type === value ? 'active' : ''} onClick={() => setType(value)} type="button">{label}</button>
          ))}
        </div>
        <article className="plan-advisor-result">
          <span className="badge premium">Recommended</span>
          <h3>{plan.title}</h3>
          <strong>{plan.price}</strong>
          <p>{plan.reason}</p>
          <ul className="clean-list">{plan.bullets.map((item) => <li key={item}>✅ {item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
