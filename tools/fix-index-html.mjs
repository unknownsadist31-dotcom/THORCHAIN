import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

function fixHtml(filePath) {
  let html = readFileSync(filePath, 'utf8');

  // 1. Remove page loader and transition overlays
  html = html.replace(/<div class="[^"]*z-page-loader[^"]*"><\/div>/g, '');
  html = html.replace(/<div class="[^"]*z-page-transition[^"]*"><\/div>/g, '');

  // 2. Add style fixes to head
  const styleFix = `
<style id="page-display-fixes">
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
  if (!html.includes('id="page-display-fixes"')) {
    html = html.replace('</head>', `${styleFix}</head>`);
  }

  // 3. Make all lazy loaded images visible and assign src from data-src
  html = html.replace(/<img([^>]*?)>/g, (match, attrs) => {
    let newAttrs = attrs;
    const dataSrcMatch = attrs.match(/data-src="([^"]+)"/);
    if (dataSrcMatch && !attrs.includes(' src="')) {
      newAttrs = ` src="${dataSrcMatch[1]}"` + newAttrs;
    }
    const dataSrcsetMatch = attrs.match(/data-srcset="([^"]+)"/);
    if (dataSrcsetMatch && !attrs.includes(' srcset="')) {
      newAttrs = ` srcset="${dataSrcsetMatch[1]}"` + newAttrs;
    }
    newAttrs = newAttrs.replace(/opacity-0/g, 'opacity-100');
    return `<img${newAttrs}>`;
  });

  // 4. Interactive Vanilla JS for Menu, FAQ, and Navigation
  const interactiveScript = `
<script id="homepage-interactive-script">
  document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuBtn = document.querySelector('button[aria-controls="menu"]');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = menu.classList.contains('menu-open');
        if (isOpen) {
          menu.classList.remove('menu-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        } else {
          menu.classList.add('menu-open');
          menuBtn.setAttribute('aria-expanded', 'true');
        }
      });
      // Close menu on link click
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('menu-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // FAQ Accordion
    document.querySelectorAll('#faq button').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (content) {
          const isOpened = content.classList.contains('faq-open');
          // Close all FAQ items
          document.querySelectorAll('#faq .faq-open').forEach(el => el.classList.remove('faq-open'));
          if (!isOpened) {
            content.classList.add('faq-open');
          }
        }
      });
    });

    // Ensure all images are loaded
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.src || img.src === window.location.href) {
        img.src = img.getAttribute('data-src');
      }
      if (img.getAttribute('data-srcset') && !img.srcset) {
        img.srcset = img.getAttribute('data-srcset');
      }
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    });
  });
</script>
`;

  if (!html.includes('id="homepage-interactive-script"')) {
    html = html.replace('</body>', `${interactiveScript}</body>`);
  }

  writeFileSync(filePath, html, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

fixHtml(path.join(process.cwd(), 'public', 'index.html'));
fixHtml(path.join(process.cwd(), 'public', 'homepage', 'index.html'));
