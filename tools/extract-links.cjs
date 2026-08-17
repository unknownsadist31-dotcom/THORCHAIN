const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const links = [];
let match;
const regex = /<a [^>]*href="([^"]+)"[^>]*>/g;
while ((match = regex.exec(html)) !== null) {
  links.push(match[1]);
}
console.log('Unique Links:');
console.log([...new Set(links)].join('\n'));
