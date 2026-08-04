import fs from 'node:fs';
const css = fs.readFileSync('app/v60-clean-production.css','utf8');
const page = fs.readFileSync('app/page.tsx','utf8');
const nav = fs.readFileSync('components/PublicNav.tsx','utf8');
const checks = [
  css.includes('#dc2626'), css.includes('#16a34a'), css.includes('#2563eb'), css.includes('.public-conversion-nav'), css.includes('.simple-footer'),
  page.includes('SimpleFooter'), page.includes('SimpleStoryboardCreator'), !nav.includes('Experience'), nav.includes('Create free storyboard')
];
if (checks.some((x)=>!x)) { console.error('Simple RGB UI check failed.'); process.exit(1); }
console.log('CineLoom v6.0 simple RGB UI check passed.');
