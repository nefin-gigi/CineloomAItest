import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'app/page.tsx',
  'app/v72-salient-catalyst-clean.css',
  'components/SalientStoryboardHeroVisual.tsx',
  'components/SalientMarketingSections.tsx',
  'components/CatalystWorkspacePreview.tsx',
  'components/AppShell.tsx',
  'app/studio/page.tsx',
  'public/storyboards/wide-shot.png',
  'public/storyboards/tracking-shot.png',
  'public/storyboards/insert.png',
  'public/storyboards/close-up.png',
  'public/storyboards/reveal.png',
  'public/storyboards/export.png',
  'public/hero/cineloom-simple-saas-hero-reference.png',
  'docs/V7_2_SALIENT_CATALYST_CLEAN_DEPLOY.md',
  'database/022_salient_catalyst_clean_deploy_ui.sql'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing v7.2 clean SaaS files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');
if (!layout.includes("./v72-salient-catalyst-clean.css")) {
  console.error('v72 CSS is not imported last in app/layout.tsx.');
  process.exit(1);
}

const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const requiredPageTokens = [
  'SalientStoryboardHeroVisual',
  'SalientMarketingSections',
  'Create cinematic storyboards from your script in minutes',
  'No credit card for preview',
  'Plain English workflow',
  'Private script controls'
];
const missingTokens = requiredPageTokens.filter((token) => !page.includes(token));
if (missingTokens.length) {
  console.error('Homepage missing clean SaaS content tokens:');
  for (const token of missingTokens) console.error(`- ${token}`);
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, 'app/v72-salient-catalyst-clean.css'), 'utf8');
const requiredCss = ['.scc-hero', '.scc-hero-visual', '.scc-window-grid', '.catalyst-shell', '@media (max-width: 720px)'];
const missingCss = requiredCss.filter((token) => !css.includes(token));
if (missingCss.length) {
  console.error('CSS missing responsive template classes:');
  for (const token of missingCss) console.error(`- ${token}`);
  process.exit(1);
}

console.log('CineLoom v7.2 Salient/Catalyst clean SaaS UI check passed.');
