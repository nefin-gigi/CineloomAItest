import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'app/mobile-saas.css',
  'components/MobileAppDock.tsx',
  'components/MobileStoryboardAppPreview.tsx',
  'docs/V5_2_MOBILE_SAAS_APP_UIUX.md',
  'database/019_mobile_saas_app_uiux.sql'
];

const requiredCssTokens = [
  '.mobile-app-dock',
  '.mobile-storyboard-app-preview',
  '@media (max-width: 860px)',
  'env(safe-area-inset-bottom)',
  '.mobile-dock-tabs',
  '.mobile-progress-steps',
  '.mobile-story-card-grid',
  'font-size: 16px'
];

const requiredComponentTokens = [
  'MobileAppDock',
  'MobileStoryboardAppPreview',
  'Create',
  'Examples'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing mobile SaaS UI files:', missing.join(', '));
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, 'app/mobile-saas.css'), 'utf8');
const cssMissing = requiredCssTokens.filter((token) => !css.includes(token));
if (cssMissing.length) {
  console.error('Missing mobile CSS tokens:', cssMissing.join(', '));
  process.exit(1);
}

const nav = fs.readFileSync(path.join(root, 'components/PublicNav.tsx'), 'utf8');
const hero = fs.readFileSync(path.join(root, 'components/SaaSCinemaHero.tsx'), 'utf8');
const componentText = nav + '\n' + hero + '\n' + fs.readFileSync(path.join(root, 'components/MobileAppDock.tsx'), 'utf8');
const componentMissing = requiredComponentTokens.filter((token) => !componentText.includes(token));
if (!componentText.includes('Pricing') && !componentText.includes('Projects')) componentMissing.push('Pricing or Projects');
if (!componentText.includes('Security') && !componentText.includes('Help')) componentMissing.push('Security or Help');
if (componentMissing.length) {
  console.error('Missing mobile component tokens:', componentMissing.join(', '));
  process.exit(1);
}

const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');
if (!layout.includes("./mobile-saas.css")) {
  console.error('layout.tsx does not import mobile-saas.css');
  process.exit(1);
}

console.log('Mobile SaaS application UI/UX check passed.');
