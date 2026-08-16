import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = 'C:/Users/HP/Desktop/newproject--main';
const DEST_DIR = 'C:/Users/HP/Documents/GitHub/THORCHAIN';

const IGNORE_NAMES = new Set([
  '.git',
  'node_modules',
  '.next',
  'data',
  '.env.local',
  '.env.production',
  '.env.development'
]);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (IGNORE_NAMES.has(entry) || entry.startsWith('.env.')) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.relative(SRC_DIR, src)} -> ${dest}`);
  }
}

console.log(`Syncing from ${SRC_DIR} to ${DEST_DIR}...`);
copyRecursive(SRC_DIR, DEST_DIR);
console.log('Sync completed successfully!');
