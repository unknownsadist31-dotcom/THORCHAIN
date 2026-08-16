import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const nuxtDir = 'public/_nuxt';
const files = readdirSync(nuxtDir).filter(f => f.endsWith('.js'));

const iconMap = [];

for (const file of files) {
  const content = readFileSync(path.join(nuxtDir, file), 'utf8');
  const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
  if (svgMatch) {
    let cleanSvg = svgMatch[0]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    
    // Look for identifier or component name in the JS file
    iconMap.push({
      file,
      svg: cleanSvg
    });
  }
}

console.log(`Extracted ${iconMap.length} SVG icons.`);
for (const item of iconMap) {
  console.log(`--- ${item.file} ---`);
  console.log(item.svg.slice(0, 150));
}
