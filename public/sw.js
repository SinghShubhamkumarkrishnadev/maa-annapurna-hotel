// Service Worker for Maa Annapurna Home Stay PWA
const CACHE_NAME = 'maa-annapurna-v2';
const STATIC_ASSETS = [
  '/',
  '/icon.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching fallback:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  let requestUrl;
  try {
    requestUrl = new URL(event.request.url);
  } catch {
    return;
  }

  // Only handle standard HTTP/HTTPS protocols (ignore chrome-extension:, data:, blob:, etc.)
  if (!requestUrl.protocol.startsWith('http')) return;

  // Do NOT intercept API calls, admin pages, or dev server sockets
  if (
    requestUrl.pathname.startsWith('/api/') ||
    requestUrl.pathname.startsWith('/admin') ||
    requestUrl.pathname.includes('_next/webpack-hmr') ||
    requestUrl.pathname.includes('__nextjs_') ||
    requestUrl.pathname.includes('__turbopack__')
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          requestUrl.origin === self.location.origin
        ) {
          // Cache successful responses for images, styles, scripts, fonts
          if (
            requestUrl.pathname.startsWith('/images/') ||
            requestUrl.pathname.startsWith('/_next/static/') ||
            /\.(svg|png|jpg|jpeg|webp|ico|css|js|woff2?)$/i.test(requestUrl.pathname)
          ) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
        }
        return networkResponse;
      } catch {
        // Network failed (offline / network error) -> attempt cache match
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // For page navigations when offline, fall back to cached homepage
        if (event.request.mode === 'navigate') {
          const homeFallback = await caches.match('/');
          if (homeFallback) {
            return homeFallback;
          }
        }

        // Return a valid Response object rather than undefined to prevent TypeError
        return new Response('Resource temporarily unavailable offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' }),
        });
      }
    })()
  );
});
