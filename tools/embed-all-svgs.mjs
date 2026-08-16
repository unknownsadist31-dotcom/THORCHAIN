import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';

// Load SVG templates from _nuxt
const nuxtDir = 'public/_nuxt';
const svgFiles = {};
for (const file of readdirSync(nuxtDir).filter(f => f.endsWith('.js'))) {
  const content = readFileSync(path.join(nuxtDir, file), 'utf8');
  const m = content.match(/<svg[\s\S]*?<\/svg>/i);
  if (m) {
    let clean = m[0]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    svgFiles[file] = clean;
  }
}

console.log(`Loaded ${Object.keys(svgFiles).length} SVGs from _nuxt`);

const THOR_ICON_SVG = svgFiles['QEnIrQxf.js'] || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 41"><path d="m0 41 28.507-12.054-9.018-9.187zm10.47-30.415 9.019 9.174L35.599 0z"/></svg>`;
const THOR_TEXT_SVG = svgFiles['S-2bFoTt.js'] || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 16"><path d="M4.463 2.5H0V.152h11.526v2.352H7.077V15.77H4.463zM17.113.152h2.594v6.755h6.55V.152h2.594V15.77h-2.594V9.259h-6.55V15.77h-2.594zM32.846 7.96c0-4.662 3.196-8.083 8.083-8.083s8.083 3.421 8.083 8.083-3.196 8.083-8.083 8.083-8.083-3.421-8.083-8.083zm13.572 0c0-3.32-2.222-5.731-5.489-5.731-3.267 0-5.489 2.411-5.489 5.731 0 3.32 2.222 5.731 5.489 5.731 3.267 0 5.489-2.411 5.489-5.731zM53.109.152h6.732c3.842 0 6.166 2.072 6.166 5.143 0 2.29-1.293 3.932-3.344 4.639l3.963 5.836h-3.075l-3.647-5.433h-4.202V15.77h-2.593zm6.489 7.827c2.316 0 3.819-1.128 3.819-2.88 0-1.752-1.503-2.594-3.819-2.594h-3.896v5.474zM70.076 7.96c0-4.662 3.376-8.083 8.309-8.083 3.692 0 6.241 1.774 7.218 4.639l-2.421 1.038c-.707-2.023-2.451-3.323-4.797-3.323-3.376 0-5.692 2.376-5.692 5.73 0 3.353 2.316 5.73 5.692 5.73 2.346 0 4.09-1.3 4.797-3.324l2.421 1.038c-.977 2.865-3.526 4.64-7.218 4.64-4.933 0-8.309-3.422-8.309-8.084zM89.702.152h2.594v6.755h6.55V.152h2.594V15.77h-2.594V9.259h-6.55V15.77h-2.594zM106.877 15.77l5.962-15.618h2.647l5.962 15.618h-2.737l-1.504-4.045h-6.082l-1.504 4.045zm4.985-6.398h4.571l-2.285-6.143zM126.388.152h2.594V15.77h-2.594zM133.56.152h2.444l7.248 10.978V.152h2.594V15.77h-2.444l-7.248-10.978V15.77h-2.594z"/></svg>`;
const ARROW_BUTTON_SVG = svgFiles['C2RCIDgo.js'] || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M11.945 11.055c0 .26-.14.4-.395.405l-.32.01c-.27.01-.41-.13-.405-.396L10.85 7.73l-6.574 6.574c-.19.19-.444.19-.634 0l-.497-.497c-.19-.19-.19-.444 0-.634L9.72 6.6l-3.344.025c-.265.005-.406-.135-.396-.405l.01-.32c.005-.255.145-.395.405-.395l5.55-.005z"/></svg>`;
const CHECK_SVG = svgFiles['BDvSLcm7.js'] || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.21 4.71 8.25 17.673 2.79 12.21l-1.08 1.078 6 6 .54.516.54-.516 13.5-13.5z"/></svg>`;
const PLUS_SVG = svgFiles['CCAe6Xc8.js'] || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.048 19.872v-6.368H4v-3.168h6.048V4h3.328v6.336h6.08v3.168h-6.08v6.368z"/></svg>`;

function processHtml(filePath) {
  let html = readFileSync(filePath, 'utf8');

  // 1. Inject Logo SVG into header logo span if empty
  html = html.replace(
    /(<a[^>]+aria-label="Home"[^>]*>[\s\S]*?<span[^>]+aspect-36\/41[^>]*>)(<\/span>)/gi,
    `$1${THOR_ICON_SVG}$2`
  );

  // 2. Inject Logo Wordmark SVG into header logo div
  html = html.replace(
    /(<a[^>]+aria-label="Home"[^>]*>[\s\S]*?<div class="h-16 w-145 max-tablet:hidden">)(<\/div>)/gi,
    `$1${THOR_TEXT_SVG}$2`
  );

  // 3. Inject arrow SVG into all rounded button action circles
  html = html.replace(
    /(<span aria-hidden="true" class="inline-flex items-center justify-center overflow-visible text-0 \[&>svg\]:size-full size-full fill-current transition-normal is-animated group-hover-focus:translate-x-full group-hover-focus:-translate-y-full">)(<\/span>)/gi,
    `$1${ARROW_BUTTON_SVG}$2`
  );
  html = html.replace(
    /(<span aria-hidden="true" class="inline-flex items-center justify-center overflow-visible text-0 \[&>svg\]:size-full absolute top-0 left-0 size-full -translate-x-full translate-y-full fill-white transition-normal is-animated group-hover-focus:translate-0">)(<\/span>)/gi,
    `$1${ARROW_BUTTON_SVG}$2`
  );

  // 4. Inject checkmark into table check spans
  html = html.replace(
    /(<span[^>]*class="[^"]*aspect-112\/133[^"]*fill-white[^"]*">)(<\/span>)/gi,
    `$1${THOR_ICON_SVG}$2`
  );

  // 5. Ensure styles for hover animations, icons, and transitions
  const additionalStyles = `
<style id="rich-clone-styles">
  /* Force all SVG icons to scale and display */
  svg {
    display: inline-block;
    vertical-align: middle;
  }
  .aspect-36\\/41 svg {
    width: 100%;
    height: 100%;
  }
  .w-145 svg {
    width: 145px;
    height: 16px;
    fill: currentColor;
  }
  /* Button animated icon circle */
  .size-17 {
    width: 1.0625rem;
    height: 1.0625rem;
  }
  .size-17 svg {
    width: 100%;
    height: 100%;
  }
  /* FAQ Accordion Transitions */
  .faq-open {
    height: auto !important;
    opacity: 1 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  /* Table styling */
  table {
    border-collapse: collapse;
    width: 100%;
  }
</style>
`;
  if (!html.includes('rich-clone-styles')) {
    html = html.replace('</head>', `${additionalStyles}</head>`);
  }

  writeFileSync(filePath, html, 'utf8');
  console.log(`Embedded SVGs & rich styling in: ${filePath}`);
}

processHtml('public/index.html');
processHtml('public/homepage/index.html');
