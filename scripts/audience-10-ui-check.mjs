import fs from 'node:fs';
const page = fs.readFileSync('app/page.tsx','utf8');
const requiredAudience = ['Creators','Filmmakers','Producers','Studios'];
const missing = requiredAudience.filter((x)=>!page.includes(x));
if (missing.length) { console.error('Audience UI check failed. Missing:', missing.join(', ')); process.exit(1); }
if (!page.includes('Simple enough for anyone. Useful enough for production teams.')) { console.error('Audience UI check failed. Missing audience positioning.'); process.exit(1); }
console.log('CineLoom v6.0 audience UX check passed.');
