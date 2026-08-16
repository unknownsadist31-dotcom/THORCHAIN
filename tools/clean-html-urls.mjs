import { readFileSync, writeFileSync, existsSync } from 'fs';

function cleanHtmlFile(filePath) {
  if (!existsSync(filePath)) return;
  let html = readFileSync(filePath, 'utf8');

  // Fix all malformed variations of https://cdn.sanity.io
  // Examples to fix:
  // /https:/https:/cdn.sanity.io -> https://cdn.sanity.io
  // /https:/cdn.sanity.io -> https://cdn.sanity.io
  // https:/https:/cdn.sanity.io -> https://cdn.sanity.io
  // https:/cdn.sanity.io -> https://cdn.sanity.io
  // //cdn.sanity.io -> https://cdn.sanity.io
  // /cdn.sanity.io -> https://cdn.sanity.io
  
  // Use regex to catch all corrupted forms:
  html = html.replace(/(?:\/+https?:?)+\/+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');
  html = html.replace(/(?:https?:?\/*)+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');
  html = html.replace(/\/+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');

  // Also fix any other corrupted /https:/ patterns for any domain
  html = html.replace(/\/+https?:\/+(?!\/)/gi, 'https://');
  html = html.replace(/(?:https?:\/\/)+https?:\/\//gi, 'https://');

  writeFileSync(filePath, html, 'utf8');
  console.log(`Cleaned: ${filePath}`);
}

cleanHtmlFile('public/index.html');
cleanHtmlFile('public/homepage/index.html');

// Verify results
const content = readFileSync('public/index.html', 'utf8');
const badMatches = content.match(/\/https?:\/+/gi);
console.log('Remaining bad matches in index.html:', badMatches ? badMatches.length : 0);

const sampleMatches = [...content.matchAll(/https:\/\/cdn\.sanity\.io[^\s"'<>]+/gi)].map(m => m[0]);
console.log('Sample valid Sanity URLs (first 5):', sampleMatches.slice(0, 5));
