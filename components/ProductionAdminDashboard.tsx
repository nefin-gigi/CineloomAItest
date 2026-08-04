'use client';

import { revenueMetrics, productionReadiness } from '@/lib/v3-production-data';

export function ProductionAdminDashboard() {
  return (
    <div className="grid" style={{ gap: 22 }}>
      <section className="grid three">
        {revenueMetrics.map((metric) => <div className="card" key={metric.label}><div className="kpi">{metric.value}</div><div className="kpi-label">{metric.label}</div><p>{metric.detail}</p></div>)}
      </section>
      <section className="grid two">
        <div className="card featured">
          <span className="badge premium">Admin command center</span>
          <h2>Revenue operations dashboard</h2>
          <p className="muted">Track the key monetization events: free sample completion, signup conversion, paid upgrades, token purchases, generation cost, failed jobs, refunds, and export downloads.</p>
          <div className="v3-meter"><span style={{ width: '82%' }} /></div>
          <p className="rail-small">Demo values included. Wire this panel to Stripe, Postgres/Supabase, provider cost logs, and analytics events before production launch.</p>
        </div>
        <div className="card">
          <h2>Live controls to protect margin</h2>
          <div className="stage-checklist">
            <div className="check"><span>Hard-stop generation when token wallet is insufficient</span><span>On</span></div>
            <div className="check"><span>Refund tokens only when provider job fails</span><span>On</span></div>
            <div className="check"><span>Watermark all preview exports</span><span>On</span></div>
            <div className="check"><span>Require paid plan for commercial use</span><span>On</span></div>
          </div>
        </div>
      </section>
      <section className="card">
        <h2>Production readiness board</h2>
        <div className="table-wrap"><table><thead><tr><th>Area</th><th>Status</th><th>Launch Requirement</th></tr></thead><tbody>{productionReadiness.map((item) => <tr key={item.area}><td><strong>{item.area}</strong></td><td>{item.status}</td><td>{item.requirement}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
