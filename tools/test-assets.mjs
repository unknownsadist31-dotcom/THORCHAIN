import { readFileSync } from 'fs';

async function checkAssets() {
  const html = readFileSync('public/index.html', 'utf8');
  
  const links = [];
  const hrefMatches = html.matchAll(/href="([^"]+)"/g);
  for (const m of hrefMatches) links.push({ type: 'href', url: m[1] });

  const srcMatches = html.matchAll(/src="([^"]+)"/g);
  for (const m of srcMatches) links.push({ type: 'src', url: m[1] });

  const urlMatches = html.matchAll(/url\(([^)]+)\)/g);
  for (const m of urlMatches) links.push({ type: 'css-url', url: m[1].replace(/['"]/g, '') });

  console.log('Total references found:', links.length);

  const localAssets = links.filter(l => l.url.startsWith('/') && !l.url.startsWith('//'));
  const uniqueLocal = [...new Set(localAssets.map(l => l.url))];
  console.log('Unique local assets to test:', uniqueLocal.length);

  for (const asset of uniqueLocal) {
    if (asset === '/' || asset.startsWith('/swap') || asset.startsWith('/integrate') || asset.startsWith('/community') || asset.startsWith('/blog') || asset.startsWith('/rune') || asset.startsWith('/tcy') || asset.startsWith('/vision') || asset.startsWith('/faq')) continue;
    try {
      const res = await fetch('http://localhost:8081' + asset);
      if (res.status !== 200) {
        console.log('FAILED (' + res.status + '):', asset);
      } else {
        console.log('OK (200):', asset, res.headers.get('content-type'));
      }
    } catch (e) {
      console.log('ERROR:', asset, e.message);
    }
  }
}

checkAssets();
