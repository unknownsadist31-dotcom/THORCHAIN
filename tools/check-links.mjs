import { readFileSync } from 'fs';

const html = readFileSync('public/index.html', 'utf8');

const logo = html.match(/<a[^>]+aria-label="Home"[^>]*>/i);
console.log('Logo link:', logo ? logo[0] : 'None');

const allLinks = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('Internal links:', allLinks.filter(l => l.startsWith('/')));
