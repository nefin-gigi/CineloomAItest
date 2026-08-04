import fs from 'node:fs';

const requiredFiles = [
  'lib/chatgpt-agent-harness.ts',
  'components/AIHarnessIconLink.tsx',
  'components/DirectorSingleBoardAgent.tsx',
  'components/AgentHarnessAdminConsole.tsx',
  'app/studio/agent-harness/page.tsx',
  'app/studio/super-admin/agent-harness/page.tsx',
  'app/api/agent-harness/change-board/route.ts',
  'app/api/agent-harness/readiness/route.ts',
  'app/api/super-admin/agent-harness/route.ts',
  'app/v75-agent-harness.css',
  'database/025_chatgpt_agent_harness_single_board.sql',
  'docs/V7_5_CHATGPT_AGENT_HARNESS_SINGLE_BOARD.md'
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.scripts?.['chatgpt-agent-harness-check']) failures.push('package.json missing chatgpt-agent-harness-check script');

const harness = fs.readFileSync('lib/chatgpt-agent-harness.ts', 'utf8');
for (const token of ['single_board_only', 'CHATGPT_AGENT_ENDPOINT_URL', 'blocked_until_director_approval', 'totalBoards', 'boardIndex']) {
  if (!harness.includes(token)) failures.push(`Agent harness missing token: ${token}`);
}

const validation = fs.readFileSync('lib/input-validation.ts', 'utf8');
if (!validation.includes('/api/agent-harness/change-board')) failures.push('Input validation schema missing /api/agent-harness/change-board');
if (!validation.includes('boardIndex: num(1, 1000, true)')) failures.push('Input validation does not cap boardIndex to 1..1000');

const appShell = fs.readFileSync('components/AppShell.tsx', 'utf8');
if (!appShell.includes('AIHarnessIconLink') || !appShell.includes('/studio/agent-harness')) failures.push('Studio shell does not expose AI harness icon/link');

const registry = fs.readFileSync('lib/frontend-endpoint-registry.ts', 'utf8');
for (const action of ['studio_agent_harness', 'director_change_single_board', 'super_admin_agent_harness']) {
  if (!registry.includes(action)) failures.push(`Frontend action registry missing ${action}`);
}

const middleware = fs.readFileSync('middleware.ts', 'utf8');
if (!middleware.includes("pathname.startsWith('/api/agent-harness')")) failures.push('Middleware does not protect /api/agent-harness as Studio API surface');

if (failures.length) {
  console.error('ChatGPT agent harness check failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('ChatGPT agent harness check passed. Single-board director correction flow is installed.');
