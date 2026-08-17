import fs from 'fs';

const html = fs.readFileSync('public/index.html', 'utf-8');

// Count proper https://cdn.sanity.io refs
const good = html.match(/https:\/\/cdn\.sanity\.io/g);
console.log('Good absolute https://cdn.sanity.io refs:', good ? good.length : 0);

// Count broken /cdn.sanity.io or /https:/cdn.sanity.io refs
const broken1 = html.match(/["'(]\/cdn\.sanity/g);
console.log('Broken /cdn.sanity refs:', broken1 ? broken1.length : 0);

const broken2 = html.match(/["'(]\/https?:\/cdn\.sanity/g);
console.log('Broken /https:/cdn.sanity refs:', broken2 ? broken2.length : 0);

// Check _nuxt JS files for image URLs
const nuxtDir = 'public/_nuxt';
const jsFiles = fs.readdirSync(nuxtDir).filter(f => f.endsWith('.js'));
let nuxtSanityRefs = 0;
let nuxtBrokenRefs = 0;
for (const f of jsFiles) {
  const content = fs.readFileSync(`${nuxtDir}/${f}`, 'utf-8');
  const m = content.match(/cdn\.sanity/g);
  if (m) {
    nuxtSanityRefs += m.length;
    console.log(`  _nuxt/${f}: ${m.length} sanity refs`);
  }
  const b = content.match(/\/cdn\.sanity/g);
  if (b) {
    nuxtBrokenRefs += b.length;
    console.log(`  _nuxt/${f}: ${b.length} BROKEN /cdn.sanity refs`);
  }
}
console.log('Total _nuxt JS sanity refs:', nuxtSanityRefs);
console.log('Total _nuxt JS broken refs:', nuxtBrokenRefs);

// Check if there are any _payload.json refs
const payloads = fs.readdirSync('public').filter(f => f.startsWith('_payload'));
for (const f of payloads) {
  const content = fs.readFileSync(`public/${f}`, 'utf-8');
  const m = content.match(/cdn\.sanity/g);
  if (m) {
    console.log(`${f}: ${m.length} sanity refs`);
    // Check the format
    const good = content.match(/https:\/\/cdn\.sanity/g);
    const bad = content.match(/[^:]\/\/cdn\.sanity|[^s:]\/cdn\.sanity/g);
    console.log(`  good: ${good ? good.length : 0}, potentially bad: ${bad ? bad.length : 0}`);
  }
}

// Check the _nuxt CSS file
const cssFiles = fs.readdirSync(nuxtDir).filter(f => f.endsWith('.css'));
for (const f of cssFiles) {
  const content = fs.readFileSync(`${nuxtDir}/${f}`, 'utf-8');
  const m = content.match(/cdn\.sanity/g);
  if (m) {
    console.log(`_nuxt/${f}: ${m.length} sanity refs`);
  }
}
