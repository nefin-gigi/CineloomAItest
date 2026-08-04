import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const apiDir = path.join(root, 'app/api');
const missing = [];
const jsonUses = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name === 'route.ts') {
      const rel = path.relative(root, full);
      const text = fs.readFileSync(full, 'utf8');
      if (/request\.json\s*\(/.test(text)) jsonUses.push(rel);
      if (/validateApiRequest\s*\(/.test(text) && !text.includes("@/lib/input-validation")) missing.push(`${rel}: validateApiRequest used without import`);
    }
  }
}
walk(apiDir);
if (jsonUses.length || missing.length) {
  console.error('Input validation coverage failed.');
  for (const item of jsonUses) console.error(`Direct request.json usage: ${item}`);
  for (const item of missing) console.error(item);
  process.exit(1);
}
console.log('Input validation coverage passed: all JSON API bodies flow through validateApiRequest.');
