import { buildChatGPTAgentHarnessReadiness } from '@/lib/chatgpt-agent-harness';
import { buildLowTokenAgentReadiness } from '@/lib/agent-token-optimizer';
import { DirectorSingleBoardAgent } from './DirectorSingleBoardAgent';

export function AgentHarnessAdminConsole() {
  const readiness = buildChatGPTAgentHarnessReadiness();
  const tokenReadiness = buildLowTokenAgentReadiness();
  return (
    <section className="agent-admin-stack">
      <article className="agent-card agent-admin-hero">
        <div>
          <span className="agent-kicker">Super Admin · Plug-and-play backend</span>
          <h2>ChatGPT agent endpoint router for low-token board-level changes</h2>
          <p>Connect one ChatGPT-compatible agent endpoint and one storyboard correction endpoint. The frontend sends a compact context pack, requests a JSON patch only, and blocks stitching until the director approves.</p>
        </div>
        <div className="agent-score"><strong>{readiness.architectureScore}/10</strong><span>{readiness.mode}</span></div>
      </article>

      <div className="agent-admin-grid">
        <article className="agent-card">
          <h3>Required environment variables</h3>
          <div className="agent-env-list">
            {readiness.requiredEnv.map((key) => <div key={key}><code>{key}</code><span>{readiness.missingEnv.includes(key) ? 'Pending' : 'Configured'}</span></div>)}
          </div>
        </article>
        <article className="agent-card">
          <h3>Low-token policy</h3>
          <ol className="agent-pipeline-list">
            {tokenReadiness.policy.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </article>
      </div>

      <div className="agent-admin-grid">
        <article className="agent-card">
          <h3>Agent pipeline</h3>
          <ol className="agent-pipeline-list">
            {readiness.pipeline.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </article>
        <article className="agent-card">
          <h3>Endpoint contract</h3>
          <div className="agent-env-list">
            <div><code>POST /api/agent-harness/token-plan</code><span>Preview cost/context</span></div>
            <div><code>POST /api/agent-harness/change-board</code><span>Patch one board</span></div>
            <div><code>GET /api/agent-harness/readiness</code><span>Harness status</span></div>
            <div><code>POST /api/super-admin/agent-harness</code><span>Admin test</span></div>
          </div>
        </article>
      </div>

      <DirectorSingleBoardAgent adminMode />
    </section>
  );
}
