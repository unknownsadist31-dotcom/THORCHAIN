const fs = require('fs');
const html = fs.readFileSync('public/index_original.html', 'utf8');
const match = html.match(/<a[^>]*href="([^"]*)"[^>]*>.*?<svg/i);
console.log('First link with SVG:', match ? match[1] : 'none');
