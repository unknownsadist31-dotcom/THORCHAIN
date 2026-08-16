import { readFileSync } from 'fs';

function extractSections(html) {
  const sections = [];
  const sectionMatches = html.matchAll(/<section([^>]*?)>([\s\S]*?)<\/section>/g);
  for (const match of sectionMatches) {
    const attrs = match[1];
    const content = match[2];
    const idMatch = attrs.match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : 'no-id';
    
    // Extract headings
    const h2s = [...content.matchAll(/<h2[^>]*?>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h3s = [...content.matchAll(/<h3[^>]*?>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    
    sections.push({ id, h2s, h3s });
  }
  return sections;
}

const remoteHtml = readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/80011f0b-8a61-4477-a5a6-04e45a16a569/.system_generated/steps/1197/content.md', 'utf8');
const localHtml = readFileSync('public/index.html', 'utf8');

console.log('=== REMOTE (thorchain.org) SECTIONS ===');
const remoteSec = extractSections(remoteHtml);
console.log(JSON.stringify(remoteSec, null, 2));

console.log('\n=== LOCAL (index.html) SECTIONS ===');
const localSec = extractSections(localHtml);
console.log(JSON.stringify(localSec, null, 2));
