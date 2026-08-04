import fs from 'node:fs';
const page = fs.readFileSync('app/page.tsx','utf8');
const css = fs.readFileSync('app/v60-clean-production.css','utf8');
const creator = fs.readFileSync('components/SimpleStoryboardCreator.tsx','utf8');
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
if (pkg.version !== '6.0.0') { console.error('Expected v6.0.0 clean SaaS cinema release.'); process.exit(1); }
for (const token of ['Create a storyboard from your script','Storyboard Preview','Paste. Generate. Review. Export.']) {
  if (!page.includes(token)) { console.error(`SaaS cinema UI check failed. Missing ${token}`); process.exit(1); }
}
for (const token of ['clean-demo-card','cinema-panel-thumb','--cl-red','--cl-green','--cl-blue']) {
  if (!css.includes(token)) { console.error(`SaaS cinema UI check failed. Missing CSS ${token}`); process.exit(1); }
}
if (!creator.includes('Cinematic Realism') || !creator.includes('Storyboard Sketch')) { console.error('SaaS cinema UI check failed. Cinema styles missing.'); process.exit(1); }
console.log('CineLoom v6.0 SaaS/cinema UI check passed.');
