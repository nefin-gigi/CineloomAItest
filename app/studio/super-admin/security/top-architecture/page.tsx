import { buildTopSecurityArchitectureReadiness } from '@/lib/security-architecture';

export default function TopSecurityArchitecturePage() {
  const readiness = buildTopSecurityArchitectureReadiness();
  return (
    <main style={{ padding: 32, maxWidth: 1180, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ color: '#2563eb', fontWeight: 800, marginBottom: 8 }}>Super Admin Security</p>
      <h1 style={{ fontSize: 40, lineHeight: 1.05, margin: 0, color: '#0f172a' }}>Top security architecture</h1>
      <p style={{ color: '#475569', fontSize: 18, maxWidth: 780 }}>Defense-in-depth controls for CineLoom public pages, Studio actions, AI endpoints, billing, exports, tenant data, and Super Admin operations.</p>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 28 }}>
        {readiness.layers.map((layer) => (
          <article key={layer.id} style={{ background: '#fff', border: '1px solid #dbeafe', borderRadius: 18, padding: 20, boxShadow: '0 18px 45px rgba(15,23,42,.08)' }}>
            <h2 style={{ fontSize: 18, margin: '0 0 12px', color: '#0f172a' }}>{layer.name}</h2>
            <ul style={{ paddingLeft: 18, color: '#334155', margin: 0, lineHeight: 1.7 }}>
              {layer.controls.map((control) => <li key={control}>{control}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <section style={{ marginTop: 24, background: readiness.launchDecision.startsWith('ready') ? '#ecfdf5' : '#fff7ed', border: '1px solid #fed7aa', borderRadius: 18, padding: 20 }}>
        <strong>Launch decision:</strong> {readiness.launchDecision}
        <p style={{ marginBottom: 0, color: '#475569' }}>Input validation schemas: {readiness.validation.schemas}. Military security score: {readiness.military.score}%. Advanced security score: {readiness.advanced.score}%.</p>
      </section>
    </main>
  );
}
