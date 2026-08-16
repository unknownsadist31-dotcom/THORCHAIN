import { readFileSync, writeFileSync } from 'fs';

async function deepCompare() {
  console.log('Fetching live https://thorchain.org/ ...');
  const res = await fetch('https://thorchain.org/');
  const remoteHtml = await res.text();
  const localHtml = readFileSync('public/index.html', 'utf8');

  // 1. Compare CSS stylesheets
  const remoteCssLinks = [...remoteHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
  const localCssLinks = [...localHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
  console.log('Remote CSS Links:', remoteCssLinks);
  console.log('Local CSS Links:', localCssLinks);

  // 2. Compare script tags
  const remoteScripts = [...remoteHtml.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  const localScripts = [...localHtml.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Remote Scripts count:', remoteScripts.length, remoteScripts);
  console.log('Local Scripts count:', localScripts.length, localScripts);

  // 3. Compare SVG icons
  const remoteSvgs = (remoteHtml.match(/<svg/gi) || []).length;
  const localSvgs = (localHtml.match(/<svg/gi) || []).length;
  console.log('Remote SVGs:', remoteSvgs, 'Local SVGs:', localSvgs);

  // 4. Compare inline styles
  const remoteStyles = (remoteHtml.match(/<style/gi) || []).length;
  const localStyles = (localHtml.match(/<style/gi) || []).length;
  console.log('Remote <style> tags:', remoteStyles, 'Local <style> tags:', localStyles);

  // 5. Check if remote CSS files are stored in public/_nuxt
  for (const link of remoteCssLinks) {
    const hrefMatch = link.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      console.log('Checking remote CSS:', hrefMatch[1]);
    }
  }
}

deepCompare();
