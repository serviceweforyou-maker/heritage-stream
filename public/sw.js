const CACHE_NAME = 'sanatana360-cache-v105';

// Top critical assets to pre-cache on install for instant loading
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles.css?v=105.0',
  '/app-prod.js?v=105.0',
  '/divya-data-prod.js?v=105.0',
  '/blog-data-prod.js?v=105.0',
  '/data.js?v=105.0',
  '/images/hampi.jpg',
  '/images/ganesha.jpg',
  '/images/krishna_cover.jpg',
  '/images/shiva.jpg',
  '/images/dashavatara.jpg',
  '/images/ellora_kailasa.jpg',
  '/images/ajanta.jpg',
  '/images/chola.jpg',
  '/images/divya_darshana_banner.jpg',
  '/images/mahishasura_battle.jpg',
  '/images/venkateswara_tirumala.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS).catch((err) => {
        console.warn('Pre-caching non-fatal warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Stale-While-Revalidate caching strategy for Images, Fonts, CSS & JS (sub-20ms instant loads)
// Network-First for HTML documents to guarantee live updates
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // HTML Documents: Network-first with cache fallback
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkRes;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Static Assets (Images, JS, CSS, Fonts): Stale-While-Revalidate (Instant response + background refresh)
  if (
    url.origin === location.origin &&
    (url.pathname.startsWith('/images/') ||
     url.pathname.endsWith('.css') ||
     url.pathname.endsWith('.js') ||
     url.pathname.endsWith('.woff2') ||
     url.pathname.endsWith('.jpg') ||
     url.pathname.endsWith('.png') ||
     url.pathname.endsWith('.webp') ||
     url.pathname.endsWith('.json'))
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default fetch
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
