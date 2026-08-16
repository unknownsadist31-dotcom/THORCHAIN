import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

async function syncAllNuxtAssets() {
  console.log('Fetching live index.html from https://thorchain.org/ ...');
  const res = await fetch('https://thorchain.org/');
  const remoteHtml = await res.text();

  // Extract all _nuxt scripts and CSS
  const nuxtAssets = [...remoteHtml.matchAll(/(?:\/|_nuxt\/)[a-zA-Z0-9_\-\.]+\.(?:js|css|woff2|woff|json)/gi)].map(m => m[0]);
  console.log('Found Nuxt assets:', nuxtAssets);

  for (const asset of new Set(nuxtAssets)) {
    const cleanPath = asset.startsWith('/') ? asset : `/${asset}`;
    const url = `https://thorchain.org${cleanPath}`;
    const localFile = path.join('public', cleanPath.replace(/\//g, path.sep));
    const dir = path.dirname(localFile);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    if (!existsSync(localFile)) {
      try {
        console.log(`Downloading ${url} -> ${localFile} ...`);
        const r = await fetch(url);
        if (r.ok) {
          const buf = Buffer.from(await r.arrayBuffer());
          writeFileSync(localFile, buf);
          console.log(`Saved: ${localFile} (${buf.length} bytes)`);
        } else {
          console.error(`Failed ${url}: status ${r.status}`);
        }
      } catch (err) {
        console.error(`Error downloading ${url}:`, err.message);
      }
    } else {
      console.log(`Already exists: ${localFile}`);
    }
  }

  // Also fetch _payload.json with buildId
  const buildIdMatch = remoteHtml.match(/buildId:"([^"]+)"/);
  if (buildIdMatch) {
    const buildId = buildIdMatch[1];
    console.log(`Build ID: ${buildId}`);
    const payloadUrl = `https://thorchain.org/_payload.json?${buildId}`;
    try {
      const pr = await fetch(payloadUrl);
      if (pr.ok) {
        const text = await pr.text();
        writeFileSync('public/_payload.json', text, 'utf8');
        console.log(`Saved: public/_payload.json (${text.length} bytes)`);
      }
    } catch (e) {
      console.error('Failed payload:', e);
    }
  }

  // Now create the exact perfect public/index.html and public/homepage/index.html
  // that includes the clean Sanity URLs and full Nuxt scripts!
  let fixedHtml = remoteHtml;
  
  // Clean all Sanity and CDN URLs cleanly
  fixedHtml = fixedHtml.replace(/(?:\/+https?:?)+\/+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');
  fixedHtml = fixedHtml.replace(/(?:https?:?\/*)+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');
  fixedHtml = fixedHtml.replace(/\/+cdn\.sanity\.io/gi, 'https://cdn.sanity.io');
  fixedHtml = fixedHtml.replace(/https:https:\/\//gi, 'https://');
  fixedHtml = fixedHtml.replace(/\/https:\//gi, 'https://');

  // Add our clean fallback style and safety script
  const safetyScript = `
<style id="custom-display-fixes">
  .z-page-loader, .z-page-transition { display: none !important; }
  .gsap-hidden { opacity: 1 !important; visibility: visible !important; }
  img { opacity: 1 !important; }
  #menu.menu-open {
    pointer-events: auto !important;
    opacity: 1 !important;
  }
  .faq-open {
    height: auto !important;
    opacity: 1 !important;
  }
</style>
`;
  if (!fixedHtml.includes('custom-display-fixes')) {
    fixedHtml = fixedHtml.replace('</head>', `${safetyScript}</head>`);
  }

  writeFileSync('public/index.html', fixedHtml, 'utf8');
  writeFileSync('public/homepage/index.html', fixedHtml, 'utf8');
  console.log('Updated public/index.html and public/homepage/index.html successfully!');
}

syncAllNuxtAssets();
