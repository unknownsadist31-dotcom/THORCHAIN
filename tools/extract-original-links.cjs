const fs = require('fs');
const html = fs.readFileSync('public/index_original.html', 'utf8');
const swapLinks = html.match(/href="[^"]*swap[^"]*"/g);
console.log('Original Swap links:', swapLinks);
const homeLinks = html.match(/<a[^>]*aria-label="Home"[^>]*href="[^"]*"/i);
console.log('Original Home links:', homeLinks ? homeLinks[0] : 'none');
