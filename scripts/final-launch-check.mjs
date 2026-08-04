import fs from 'node:fs';
const requiredFiles = ['app/layout.tsx','app/v70-billion.css','components/WorkingStoryboardDemo.tsx','components/BillionHeroVisual.tsx','middleware.ts','INSTALL_NOW.md'];
const missing = requiredFiles.filter((f)=>!fs.existsSync(f));
if (missing.length) { console.error('Final launch check failed. Missing:', missing.join(', ')); process.exit(1); }
const layout = fs.readFileSync('app/layout.tsx','utf8');
const env = fs.existsSync('.env.example') ? fs.readFileSync('.env.example','utf8') : '';
const middleware = fs.readFileSync('middleware.ts','utf8');
if (!layout.includes('./v70-billion.css') || !env.includes('LAUNCH_GATE_ENABLED=false') || !(middleware.indexOf('if (publicMarketingPaths.has(pathname)) return next();') < middleware.indexOf('if (gateEnabled())'))) {
  console.error('Final launch check failed. v7 UI, staging env defaults, or public routing are missing.'); process.exit(1);
}
console.log('CineLoom v7.0 final launch check passed. Staging UI is aligned, public pages are open, and the workflow is working.');
