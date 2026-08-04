'use client';

import { useState } from 'react';
import { revenuePlans, tokenPricing } from '@/lib/v3-production-data';

export function RevenuePricingTable() {
  const [message, setMessage] = useState('Choose a plan. Checkout opens when Stripe is configured; preview mode stays safe for demos.');

  async function checkout(planId: string) {
    setMessage('Creating checkout session...');
    const response = await fetch('/api/billing/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, successUrl: '/studio/billing?success=true', cancelUrl: '/pricing?cancelled=true' })
    });
    const data = await response.json();
    if (data.url && data.mode === 'stripe') window.location.href = data.url;
    setMessage(data.message ?? `Checkout ready for ${planId}.`);
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="grid five v3-plan-grid simple-pricing-grid">
        {revenuePlans.map((plan) => (
          <article key={plan.id} className={`card pricing-card ${plan.popular ? 'featured' : ''}`}>
            {plan.popular && <span className="badge premium">Best revenue fit</span>}
            <h3>{plan.name}</h3>
            <p>{plan.audience}</p>
            <div className="price-line">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}<span>{typeof plan.price === 'number' ? '/mo' : ''}</span></div>
            <div className="package-item"><strong>{typeof plan.monthlyTokens === 'number' ? plan.monthlyTokens.toLocaleString() : plan.monthlyTokens} tokens</strong><span>{String(plan.seats)} seat(s) · {String(plan.projects)} projects · {plan.priority} queue</span></div>
            <ul className="clean-list">{plan.features.map((f) => <li key={f}>✅ {f}</li>)}</ul>
            <button className="btn primary" onClick={() => void checkout(plan.id)}>{plan.cta}</button>
          </article>
        ))}
      </section>
      <div className="success">{message}</div>
      <section className="card">
        <h2>Token revenue controls</h2>
        <div className="table-wrap"><table><thead><tr><th>Feature</th><th>Tokens</th><th>Margin Guard</th><th>Revenue Moment</th></tr></thead><tbody>{tokenPricing.map((row) => <tr key={row.feature}><td><strong>{row.feature}</strong></td><td>{row.tokens}</td><td>{row.marginGuard}</td><td>{row.revenueMoment}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
