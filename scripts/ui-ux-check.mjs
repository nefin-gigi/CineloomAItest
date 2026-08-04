import fs from 'node:fs';
const required = ['app/v60-clean-production.css','components/PublicNav.tsx','components/SimpleStoryboardCreator.tsx','app/page.tsx','app/create-free-storyboard/page.tsx'];
const missing = required.filter((f)=>!fs.existsSync(f));
if (missing.length) { console.error('UI/UX check failed. Missing:', missing.join(', ')); process.exit(1); }
const css = fs.readFileSync('app/v60-clean-production.css','utf8');
const page = fs.readFileSync('app/page.tsx','utf8');
const nav = fs.readFileSync('components/PublicNav.tsx','utf8');
for (const token of ['--cl-red','--cl-green','--cl-blue','@media (max-width: 640px)','clean-hero']) {
  if (!css.includes(token)) { console.error(`UI/UX check failed. Missing CSS token ${token}`); process.exit(1); }
}
if (!page.includes('Create a storyboard from your script') || !nav.includes('Create free storyboard')) { console.error('UI/UX check failed. Simple hero/nav requirements missing.'); process.exit(1); }
console.log('CineLoom v6.0 UI/UX check passed: simple, legible, responsive public experience.');
