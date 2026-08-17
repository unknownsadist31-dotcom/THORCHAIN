const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
const script = `
<script id="app-error-guard">
  window.addEventListener("error", function(e) {
    if (e.message && (e.message.includes("Cannot redefine property") || e.message.includes("ethereum"))) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return true;
    }
  }, true);
  window.addEventListener("unhandledrejection", function(e) {
    if (e.reason && e.reason.message && (e.reason.message.includes("Cannot redefine property") || e.reason.message.includes("ethereum"))) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
</script>
`;
if (!html.includes('app-error-guard')) {
  html = html.replace('<head>', '<head>' + script);
  fs.writeFileSync('public/index.html', html);
  console.log('Injected error guard into public/index.html');
}

// Also check and fix _payload.json files for cdn.sanity.io
const dir = 'public';
const files = fs.readdirSync(dir);
for (const f of files) {
  if (f.startsWith('_payload')) {
    let payload = fs.readFileSync(dir + '/' + f, 'utf8');
    let changed = false;
    if (payload.includes('/https://cdn.sanity.io')) {
      payload = payload.replace(/\/https:\/\/cdn\.sanity\.io/g, '/api/proxy/cdn-sanity');
      changed = true;
    }
    if (payload.includes('https://cdn.sanity.io')) {
      payload = payload.replace(/https:\/\/cdn\.sanity\.io/g, '/api/proxy/cdn-sanity');
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(dir + '/' + f, payload);
      console.log('Fixed payload file:', f);
    }
  }
}
