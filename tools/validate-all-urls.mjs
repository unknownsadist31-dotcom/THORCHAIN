import { readFileSync } from 'fs';

const html = readFileSync('public/index.html', 'utf8');

const urls = [];
const srcMatches = html.matchAll(/(?:src|data-src|srcset|data-srcset)="([^"]+)"/gi);
for (const m of srcMatches) {
  urls.push(m[1]);
}
const bgMatches = html.matchAll(/url\(([^)]+)\)/gi);
for (const m of bgMatches) {
  urls.push(m[1].replace(/['"]/g, ''));
}

const suspicious = urls.filter(u => {
  const parts = u.split(/\s*,\s*|\s+/);
  return parts.some(p => p.includes('https:') && !p.startsWith('https://'));
});

console.log('Total URLs checked:', urls.length);
console.log('Suspicious URLs:', suspicious);
