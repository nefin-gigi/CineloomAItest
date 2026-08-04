import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'lib/ai-harness.ts',
  'components/AIHarnessCommandCenter.tsx',
  'app/studio/ai-harness/page.tsx',
  'app/studio/super-admin/ai-harness/page.tsx',
  'app/api/ai-harness/readiness/route.ts',
  'app/api/ai-harness/evaluate/route.ts',
  'app/api/ai-harness/golden-tests/route.ts',
  'app/api/ai-harness/provider-benchmark/route.ts',
  'app/api/ai-harness/provenance/route.ts',
  'app/api/super-admin/ai-harness/route.ts',
  'database/013_ai_harness_10_maturity.sql',
  'docs/V4_6_AI_HARNESS_10_MATURITY.md',
  'docs/AI_HARNESS_GOLDEN_TESTS_AND_EVALS.md',
  'docs/AI_PROVIDER_BENCHMARK_AND_ROUTING.md',
  'docs/AI_PROVENANCE_AND_SAFETY_GOVERNANCE.md'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missingFiles.length) {
  console.error('CineLoom v4.6 AI harness check failed. Missing files:', missingFiles.join(', '));
  process.exit(1);
}

const env = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
const requiredEnv = [
  'AI_HARNESS_MODE',
  'AI_EVAL_ENDPOINT_URL', 'AI_EVAL_ENDPOINT_SECRET',
  'AI_PROVIDER_BENCHMARK_ENDPOINT_URL', 'AI_PROVIDER_BENCHMARK_ENDPOINT_SECRET',
  'AI_PROVENANCE_ENDPOINT_URL', 'AI_PROVENANCE_ENDPOINT_SECRET',
  'AI_SAFETY_MODERATION_ENDPOINT_URL', 'AI_SAFETY_MODERATION_ENDPOINT_SECRET',
  'AI_QUALITY_GATE_FAIL_CLOSED', 'AI_REGRESSION_MAX_ALLOWED_DELTA', 'AI_MINIMUM_STORYBOARD_SCORE', 'AI_MINIMUM_SAFETY_SCORE'
];
const missingEnv = requiredEnv.filter((key) => !env.includes(`${key}=`));
if (missingEnv.length) {
  console.error('CineLoom v4.6 env template check failed. Missing keys:', missingEnv.join(', '));
  process.exit(1);
}

const harness = fs.readFileSync(path.join(root, 'lib/ai-harness.ts'), 'utf8');
for (const needle of [
  'aiHarnessCapabilities', 'goldenTestCases', 'evalRubrics', 'providerBenchmarks',
  'buildAIHarnessReadiness', 'scoreAIOutput', 'createAssetProvenance', 'runGoldenTestSuite',
  'prompt-injection defense', 'Asset provenance', 'Provider benchmarking'
]) {
  if (!harness.includes(needle)) {
    console.error(`CineLoom v4.6 AI harness missing ${needle}`);
    process.exit(1);
  }
}

const migration = fs.readFileSync(path.join(root, 'database/013_ai_harness_10_maturity.sql'), 'utf8');
for (const table of [
  'ai_prompt_versions', 'ai_golden_test_suites', 'ai_golden_test_cases', 'ai_eval_runs', 'ai_eval_scores',
  'ai_provider_benchmarks', 'ai_asset_provenance', 'ai_red_team_cases', 'ai_human_feedback_scorecards',
  'ai_model_router_decisions', 'ai_safety_events'
]) {
  if (!migration.includes(table)) {
    console.error(`CineLoom v4.6 migration missing table ${table}`);
    process.exit(1);
  }
}

const appShell = fs.readFileSync(path.join(root, 'components/AppShell.tsx'), 'utf8');
if (!appShell.includes('/studio/super-admin/ai-harness') || !appShell.includes('/studio/ai-harness')) {
  console.error('CineLoom v4.6 AI harness navigation links missing.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!pkg.scripts['ai-harness-check']) {
  console.error('ai-harness-check script missing from package.json');
  process.exit(1);
}

console.log('CineLoom v4.6 AI harness maturity check passed. Architecture is 10/10; configure live AI eval/provenance/safety endpoints before public paid launch.');
