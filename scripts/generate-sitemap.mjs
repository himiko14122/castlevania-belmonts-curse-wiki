import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://castlevania-belmonts-curse.wiki';
// Do NOT hardcode LOCALES — hardcoded arrays drift from routing.ts (doloc-town 2026-08-07 bug).
const routingSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'i18n', 'routing.ts'), 'utf-8');
const LOCALES = routingSrc.match(/locales:\s*\[([^\]]+)\]/)?.[1].replace(/'/g, '"').split(',').map(s => s.trim().replace(/"/g, '')) || ['en'];
const routing_defaultLocale = routingSrc.match(/defaultLocale:\s*'([^']+)'/)?.[1] || 'en';
const CONTENT_TYPES = ['guides', 'bosses', 'arcana', 'weapons', 'relics', 'maps-locations', 'characters', 'news-updates', 'secrets-collectibles', 'editions-preorder'];
const NAV_PAGES = [
  { path: '/', priority: 1, changefreq: 'daily' },
  { path: '/guides', priority: 0.9, changefreq: 'weekly' },
  { path: '/bosses', priority: 0.9, changefreq: 'weekly' },
  { path: '/arcana', priority: 0.9, changefreq: 'weekly' },
  { path: '/weapons', priority: 0.9, changefreq: 'weekly' },
  { path: '/relics', priority: 0.8, changefreq: 'weekly' },
  { path: '/maps-locations', priority: 0.8, changefreq: 'weekly' },
  { path: '/characters', priority: 0.8, changefreq: 'weekly' },
  { path: '/news-updates', priority: 0.7, changefreq: 'weekly' },
  { path: '/secrets-collectibles', priority: 0.8, changefreq: 'weekly' },
  { path: '/editions-preorder', priority: 0.7, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/sitemap', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.4, changefreq: 'yearly' },
];

function localizedPath(locale, p) {
  // With localePrefix: 'always', all locales get prefix
  // English root path "/" is served directly (mirror-en-to-root copies out/en/index.html → out/index.html)
  // All URLs must end with trailing slash (trailingSlash: true)
  if (p === '/') {
    return locale === 'en' ? '/' : `/${locale}/`;
  }
  return `/${locale}${p}/`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const manifestPath = path.join(process.cwd(), 'src', 'lib', 'content-manifest.json');
let contentPaths = [];
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  contentPaths = manifest.contentPaths || [];
}

const now = new Date().toISOString().split('T')[0];
const urls = [];

for (const page of NAV_PAGES) {
  for (const locale of LOCALES) {
    const lp = localizedPath(locale, page.path);
    const allAlternates = LOCALES.map((l) => {
      const alp = localizedPath(l, page.path);
      return `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${alp}" />`;
    }).join('\n');
    // Always add x-default pointing to default locale
    const defaultLp = localizedPath(routing_defaultLocale, page.path);
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${defaultLp}" />`;
    urls.push(`  <url>
    <loc>${SITE_URL}${lp}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${allAlternates}
${xDefault}
  </url>`);
  }
}

for (const item of contentPaths) {
  const contentPath = `/${item.contentType}/${item.slug}`;
  const lp = localizedPath(item.locale, contentPath);
  const allAlternates = LOCALES.map((l) => {
    const alp = localizedPath(l, contentPath);
    return `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${alp}" />`;
  }).join('\n');
  const defaultLp = localizedPath(routing_defaultLocale, contentPath);
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${defaultLp}" />`;
  urls.push(`  <url>
    <loc>${SITE_URL}${lp}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${allAlternates}
${xDefault}
  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml);
console.log(`Sitemap generated: ${urls.length} URLs`);
