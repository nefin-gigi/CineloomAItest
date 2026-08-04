import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';

const services = ['Website', 'Auth', 'Billing', 'Token ledger', 'Script analysis', 'Storyboard generation', 'Animatic rendering', 'Exports', 'Storage', 'Queue workers'];
export default function StatusPage() {
  return (
    <main className="public-page">
      <PublicNav />
      <section className="public-hero">
        <span className="badge premium">System status</span>
        <h1>CineLoom service health and generation readiness.</h1>
        <p>Status components are endpoint-ready and can be powered by your live observability system through Super Admin.</p>
      </section>
      <section className="card">
        <div className="table-wrap"><table><thead><tr><th>Service</th><th>Status</th><th>SLO target</th></tr></thead><tbody>{services.map((service) => <tr key={service}><td><strong>{service}</strong></td><td><span className="status approved">Operational</span></td><td>99.9% launch target</td></tr>)}</tbody></table></div>
      </section>
          <SimpleFooter />
    </main>
  );
}
