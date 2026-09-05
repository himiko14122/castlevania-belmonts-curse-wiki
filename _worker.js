// Cloudflare Worker entry for Castlevania: Belmont's Curse Wiki
// Migrated from Pages Functions (functions/[[path]].js + functions/api/indexnow.js)
// Static assets served from ./out via ASSETS binding.
// Locale routing mirrors Pages behavior:
//   - /en/... and /{es,pt,de}/... served directly
//   - only "/" rewritten to /en/ (localePrefix 'always': bare content paths 404)
//   - trailing-slash index.html fallback

const LOCALES = ['es', 'pt', 'de'];

function hasLocalePrefix(pathname) {
  for (const loc of LOCALES) {
    if (pathname === '/' + loc || pathname.startsWith('/' + loc + '/')) return true;
  }
  return false;
}

function isEnPrefixed(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/');
}

function isStaticAsset(pathname) {
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/') || pathname.startsWith('/images/') || pathname.startsWith('/ads/')) return true;
  if (pathname.startsWith('/favicon')) return true;
  return /\.(js|css|json|xml|txt|webp|png|jpg|jpeg|svg|ico|woff2?|ttf|map)$/i.test(pathname);
}

async function fetchWithIndexFallback(request, env) {
  let response = await env.ASSETS.fetch(request);

  if (response.status === 404) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    let indexPath;
    if (pathname.endsWith('/')) {
      indexPath = pathname + 'index.html';
    } else {
      indexPath = pathname + '/index.html';
    }
    const indexUrl = new URL(indexPath, url.origin);
    response = await env.ASSETS.fetch(new Request(indexUrl, request));
  }

  return response;
}

// ---- /api/indexnow (migrated from functions/api/indexnow.js) ----
// IndexNow key (project-specific, castlevania-belmonts-curse.wiki): 3545781c5afd93dca73d9c34914fa3d8
// D7-5b: key MUST be identical across public/{key}.txt + _worker.js + functions/api/indexnow.js
const INDEXNOW_KEY = '3545781c5afd93dca73d9c34914fa3d8';
const HOST = 'www.castlevania-belmonts-curse.wiki';
const SEARCH_ENGINES = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
];

async function submitIndexNow(urlList) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  };
  return Promise.allSettled(
    SEARCH_ENGINES.map((engine) =>
      fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    )
  );
}

function indexNowJson(summary) {
  return new Response(JSON.stringify({ ok: true, results: summary }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleIndexNow(request) {
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const urls = body.urls;
      if (!Array.isArray(urls) || urls.length === 0) {
        return new Response(JSON.stringify({ error: 'Provide a non-empty "urls" array' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      if (urls.length > 10000) {
        return new Response(JSON.stringify({ error: 'Maximum 10,000 URLs per request' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      const results = await submitIndexNow(urls);
      const summary = results.map((r, i) => ({
        engine: SEARCH_ENGINES[i],
        status: r.status === 'fulfilled' ? r.value.status : 'failed',
      }));
      return indexNowJson(summary);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (request.method === 'GET') {
    const baseUrl = `https://${HOST}`;
    const locales = ['en', 'es', 'pt', 'de'];
    const categories = [
      'guides', 'bosses', 'arcana', 'weapons', 'relics',
      'maps-locations', 'characters', 'news-updates', 'secrets-collectibles', 'editions-preorder',
    ];
    const allUrls = [];
    for (const locale of locales) {
      const prefix = locale === 'en' ? '' : `${locale}/`;
      allUrls.push(`${baseUrl}/${prefix}`);
      for (const cat of categories) {
        allUrls.push(`${baseUrl}/${prefix}${cat}`);
      }
    }
    const result = await submitIndexNow(allUrls);
    const summary = result.map((r, i) => ({
      engine: SEARCH_ENGINES[i],
      status: r.status === 'fulfilled' ? r.value.status : 'failed',
    }));
    return new Response(JSON.stringify({ ok: true, submitted: allUrls.length, results: summary }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // /api/indexnow endpoint
    if (pathname === '/api/indexnow' || pathname.startsWith('/api/indexnow')) {
      return handleIndexNow(request);
    }

    // Locale-aware static serving (migrated from functions/[[path]].js)
    if (hasLocalePrefix(pathname) || isEnPrefixed(pathname) || isStaticAsset(pathname)) {
      const response = await fetchWithIndexFallback(request, env);
      if (response.status !== 404) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=3600');
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
      return response;
    }

    // Only the bare root "/" is rewritten to the English homepage. With
    // localePrefix 'always' every content URL must live under a locale prefix
    // (/en/, /es/, /pt/, /de/); rewriting bare content paths such as /guides/
    // would re-create locale-less duplicate URLs of the /en/ canonical pages
    // (see knowledge L1 build-mirror-en-to-root-scope). Any other bare path
    // is a 404.
    if (pathname !== '/') {
      return new Response('Not Found', { status: 404 });
    }

    const enUrl = new URL('/en/', url.origin);
    const response = await fetchWithIndexFallback(new Request(enUrl, request), env);

    if (response.status === 404) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=3600');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
