import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'lib/live-storyboard-runtime.ts',
  'lib/live-export-runtime.ts',
  'lib/rate-limit.ts',
  'lib/execution-launch-readiness.ts',
  'components/ExecutionLaunchReadinessConsole.tsx',
  'app/api/storyboard/generate-live/route.ts',
  'app/api/export/generate-live/route.ts',
  'app/api/super-admin/execution-launch/route.ts',
  'app/studio/super-admin/execution-launch/page.tsx',
  'docs/V4_5_EXECUTION_EXPORTS_REDIS.md',
  'database/012_live_execution_exports_redis.sql'
];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missingFiles.length) {
  console.error('CineLoom v4.5 execution launch check failed. Missing files:', missingFiles.join(', '));
  process.exit(1);
}

const env = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
const requiredEnv = [
  'EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET', 'EXEC_STORYBOARD_CORRECT_URL', 'EXEC_STORYBOARD_CORRECT_SECRET',
  'EXEC_EXPORT_PACKAGE_URL', 'EXEC_EXPORT_PACKAGE_SECRET', 'RATE_LIMIT_PROVIDER', 'RATE_LIMIT_FAIL_CLOSED', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN',
  'RATE_LIMIT_ENDPOINT_URL', 'RATE_LIMIT_ENDPOINT_SECRET'
];
const missingEnv = requiredEnv.filter((key) => !env.includes(`${key}=`));
if (missingEnv.length) {
  console.error('CineLoom v4.5 env template check failed. Missing keys:', missingEnv.join(', '));
  process.exit(1);
}

const rateLimit = fs.readFileSync(path.join(root, 'lib/rate-limit.ts'), 'utf8');
for (const needle of ['checkDistributedRateLimit', 'UPSTASH_REDIS_REST_URL', 'RATE_LIMIT_ENDPOINT_URL', 'RATE_LIMIT_FAIL_CLOSED']) {
  if (!rateLimit.includes(needle)) {
    console.error(`CineLoom v4.5 rate limiter missing ${needle}`);
    process.exit(1);
  }
}

const productionRuntime = fs.readFileSync(path.join(root, 'lib/production-runtime.ts'), 'utf8');
if (!productionRuntime.includes('await checkDistributedRateLimit')) {
  console.error('Production runtime must call distributed rate limiter before endpoint execution.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!pkg.scripts['execution-launch-check']) {
  console.error('execution-launch-check script missing from package.json');
  process.exit(1);
}

console.log('CineLoom v4.5 execution/export/Redis launch check passed. Configure live endpoints and Redis before public paid launch.');
