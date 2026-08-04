'use client';

import { useMemo, useState } from 'react';
import { pricingPlans, tokenActions, tokenPacks, estimateTokens, type PlanId } from '@/lib/business-data';

export function PricingBillingPanel() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('studio');
  const [pages, setPages] = useState(12);
  const [scenes, setScenes] = useState(4);
  const [panels, setPanels] = useState(24);
  const [corrections, setCorrections] = useState(8);
  const [animaticSeconds, setAnimaticSeconds] = useState(30);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const estimate = useMemo(() => estimateTokens({ pages, scenes, panels, corrections, animaticSeconds, exports: 1 }), [pages, scenes, panels, corrections, animaticSeconds]);

  async function startCheckout(planId: string) {
    setCheckoutMessage('Creating secure checkout session...');
    const response = await fetch('/api/billing/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, successUrl: '/studio/billing?checkout=success', cancelUrl: '/studio/billing?checkout=cancelled' })
    });
    const data = await response.json();
    setCheckoutMessage(data.mode === 'demo' ? `Demo checkout ready for ${planId}. Add Stripe keys to enable live checkout.` : `Checkout ready: ${data.url}`);
  }

  return (
    <div className="grid" style={{ gap: 22 }}>
      <section className="grid four pricing-grid">
        {pricingPlans.map((plan) => (
          <article className={`card pricing-card ${plan.recommended ? 'featured' : ''}`} key={plan.id}>
            {plan.recommended && <span className="badge premium">Recommended</span>}
            <h3>{plan.name}</h3>
            <p>{plan.audience}</p>
            <div className="price-line">{typeof plan.monthlyPrice === 'number' ? `$${plan.monthlyPrice}` : plan.monthlyPrice}<span>{typeof plan.monthlyPrice === 'number' ? '/mo' : ''}</span></div>
            <div className="package-item"><strong>Included tokens</strong><span>{plan.includedTokens.toLocaleString?.() ?? plan.includedTokens} monthly tokens · {plan.seats} seat{plan.seats === 1 ? '' : 's'}</span></div>
            <ul className="clean-list">
              {plan.highlights.map((item) => <li key={item}>✅ {item}</li>)}
            </ul>
            <button className="btn primary" onClick={() => { setSelectedPlan(plan.id); void startCheckout(plan.id); }}>{plan.id === 'enterprise' ? 'Request access' : 'Start checkout'}</button>
          </article>
        ))}
      </section>

      <section className="grid two">
        <div className="card featured">
          <span className="badge premium">Token estimate calculator</span>
          <h2>Estimate storyboard production cost before generation</h2>
          <div className="grid two">
            <label className="field"><span>Script pages</span><input className="input" type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} /></label>
            <label className="field"><span>Scenes</span><input className="input" type="number" value={scenes} onChange={(e) => setScenes(Number(e.target.value))} /></label>
            <label className="field"><span>Storyboard panels</span><input className="input" type="number" value={panels} onChange={(e) => setPanels(Number(e.target.value))} /></label>
            <label className="field"><span>Corrections</span><input className="input" type="number" value={corrections} onChange={(e) => setCorrections(Number(e.target.value))} /></label>
            <label className="field"><span>Animatic seconds</span><input className="input" type="number" value={animaticSeconds} onChange={(e) => setAnimaticSeconds(Number(e.target.value))} /></label>
          </div>
          <div className="kpi">{estimate.toLocaleString()} tokens</div>
          <p className="muted">Selected plan: {selectedPlan}. The billing engine can hard-stop, warn, or auto-purchase token packs when a workspace runs low.</p>
        </div>
        <div className="card">
          <h2>Token packs</h2>
          <div className="stage-checklist">
            {tokenPacks.map((pack) => (
              <button className="package-item token-pack" key={pack.id} onClick={() => void startCheckout(pack.id)}>
                <strong>{pack.name} · ${pack.price}</strong>
                <span>{pack.bestFor}</span>
              </button>
            ))}
          </div>
          {checkoutMessage && <div className="success">{checkoutMessage}</div>}
        </div>
      </section>

      <section className="card">
        <h2>Token usage menu</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Action</th><th>Token Cost</th><th>Unit</th><th>Best For</th></tr></thead>
            <tbody>
              {tokenActions.map((action) => <tr key={action.id}><td><strong>{action.label}</strong><br /><span className="muted">{action.description}</span></td><td>{action.tokenCost}</td><td>{action.unit}</td><td>{action.bestFor}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
