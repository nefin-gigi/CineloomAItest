'use client';

import { useState } from 'react';
import { demoUsers } from '@/lib/business-data';

const permissions = [
  ['Owner', 'Billing, users, exports, provider settings, all creative approvals'],
  ['Director', 'Approve/revise beats, shots, panels, animatics, and final handoff'],
  ['Producer', 'Review costs, export packages, QA readiness, and investor share links'],
  ['Editor', 'Create panels, corrections, animatic timing, and audio notes'],
  ['Viewer', 'Read-only preview with watermarked downloads']
];

export function UserManagementPanel() {
  const [invite, setInvite] = useState('director@production.com');
  const [role, setRole] = useState('Director');
  const [message, setMessage] = useState('');

  function sendInvite() {
    setMessage(`Demo invite prepared for ${invite} as ${role}. Connect Clerk/Auth.js/Supabase Auth to send real invitations.`);
  }

  return (
    <div className="grid" style={{ gap: 22 }}>
      <section className="grid three">
        <div className="card featured"><span className="badge premium">Studio plan</span><div className="kpi">8,420</div><div className="kpi-label">Tokens remaining</div></div>
        <div className="card"><div className="kpi">4 / 5</div><div className="kpi-label">Seats used</div></div>
        <div className="card"><div className="kpi">3</div><div className="kpi-label">Approval roles active</div></div>
      </section>

      <section className="grid two">
        <div className="card">
          <h2>Workspace members</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Token Activity</th></tr></thead>
              <tbody>
                {demoUsers.map((user) => <tr key={user.id}><td><strong>{user.name}</strong><br /><span className="muted">{user.email}</span></td><td>{user.role}</td><td><span className="status ready">{user.status}</span></td><td>{user.monthlyTokensUsed.toLocaleString()} this month</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card featured">
          <span className="badge premium">Invite reviewer</span>
          <h2>Give a director or producer private access</h2>
          <label className="field"><span>Email</span><input className="input" value={invite} onChange={(e) => setInvite(e.target.value)} /></label>
          <label className="field"><span>Role</span><select value={role} onChange={(e) => setRole(e.target.value)}>{permissions.map(([item]) => <option key={item}>{item}</option>)}</select></label>
          <button className="btn primary" onClick={sendInvite}>Prepare invite</button>
          {message && <div className="success">{message}</div>}
        </div>
      </section>

      <section className="card">
        <h2>Role permissions</h2>
        <div className="grid three">
          {permissions.map(([name, description]) => <div className="package-item" key={name}><strong>{name}</strong><span>{description}</span></div>)}
        </div>
      </section>
    </div>
  );
}
