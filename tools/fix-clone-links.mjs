import { readFileSync, writeFileSync } from 'fs';

function fixCloneLinks(filePath) {
  let html = readFileSync(filePath, 'utf8');

  // Fix Home logo link
  html = html.replace(/<a\s+href="https:\/\/thorchain\.org\/"([^>]*aria-label="Home"[^>]*)>/gi, '<a href="/"$1>');
  html = html.replace(/<a\s+href="https:\/\/thorchain\.org"[^>]*aria-label="Home"/gi, '<a href="/" aria-label="Home"');

  // Fix any remaining Launch App links pointing to external swap
  html = html.replace(/href="https:\/\/swap\.thorchain\.org\/?"/gi, 'href="/swap"');

  writeFileSync(filePath, html, 'utf8');
}

fixCloneLinks('public/index.html');
fixCloneLinks('public/homepage/index.html');
console.log('Fixed clone navigation links');
