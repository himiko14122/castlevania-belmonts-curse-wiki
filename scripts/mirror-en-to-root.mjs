import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'out');
const EN_DIR = path.join(OUT_DIR, 'en');

if (!fs.existsSync(EN_DIR)) {
  console.log('No en/ directory found, skipping mirror.');
  process.exit(0);
}

// localePrefix: 'always' site — the ONLY root-level page is index.html.
// Root-level serving of the English homepage is handled by mirroring exactly
// one file: out/en/index.html -> out/index.html.
//
// DO NOT copy the whole en/ tree to the root (recursive mirror). With
// localePrefix 'always' every content URL must live under a locale prefix
// (/en/, /es/, /pt/, /de/); a full-tree mirror creates locale-less duplicate
// URLs (out/guides/ vs out/en/guides/, same md5) that conflict with canonical
// and sitemap signals. See knowledge L1 build-mirror-en-to-root-scope
// (10 recurrences across template generations).

const enIndexHtml = path.join(EN_DIR, 'index.html');
const rootIndexHtml = path.join(OUT_DIR, 'index.html');

if (!fs.existsSync(enIndexHtml)) {
  console.log('No en/index.html found, skipping mirror.');
  process.exit(0);
}

fs.copyFileSync(enIndexHtml, rootIndexHtml);

console.log('Mirrored en/index.html to out/index.html (index-only mirror).');
