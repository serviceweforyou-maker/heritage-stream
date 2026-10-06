const CACHE_NAME = 'sanatana360-cache-v109';

// Top critical assets to pre-cache on install for instant loading
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles.css?v=108.0',
  '/app-prod.js?v=108.0',
  '/divya-data-prod.js?v=108.0',
  '/blog-data-prod.js?v=108.0',
  '/data.js?v=108.0',
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
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('Deleting legacy cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // Network-first for dynamic live temple / darshan / panchang data and error logs
  if (url.pathname.startsWith('/api/') || url.pathname === '/db.json') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Stale-while-revalidate for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
