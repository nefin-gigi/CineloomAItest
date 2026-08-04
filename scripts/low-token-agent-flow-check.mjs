import fs from 'node:fs';

const required = [
  'components/LowTokenAgentWorkflow.tsx',
  'lib/agent-token-optimizer.ts',
  'app/api/agent-harness/token-plan/route.ts',
  'app/v76-low-token-agent.css',
  'docs/V7_6_LOW_TOKEN_AGENT_WORKFLOW.md',
  'database/026_low_token_agent_workflow.sql'
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing low-token agent workflow files:', missing.join(', '));
  process.exit(1);
}

const page = fs.readFileSync('app/studio/agent-harness/page.tsx', 'utf8');
const optimizer = fs.readFileSync('lib/agent-token-optimizer.ts', 'utf8');
const validation = fs.readFileSync('lib/input-validation.ts', 'utf8');
const registry = fs.readFileSync('lib/frontend-endpoint-registry.ts', 'utf8');
const pkg = fs.readFileSync('package.json', 'utf8');

const checks = [
  ['studio page uses low-token workflow', page.includes('LowTokenAgentWorkflow')],
  ['optimizer blocks full storyboard context', optimizer.includes('sendFullStoryboard: false') && optimizer.includes('Never send all boards')],
  ['token plan API is validated', validation.includes('/api/agent-harness/token-plan')],
  ['change board validates tokenMode', validation.includes('agentTokenModeValues') && validation.includes('tokenMode')],
  ['frontend router exposes token preview action', registry.includes('preview_low_token_board_patch')],
  ['script registered', pkg.includes('low-token-agent-flow-check')]
];

const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error('Low-token agent workflow check failed:', failed.join('; '));
  process.exit(1);
}

console.log('Low-token agent workflow check passed.');
