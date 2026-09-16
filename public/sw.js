const CACHE_NAME = 'sanatana360-cache-v78';
const ASSETS = [
  '/',
  '/index.html?v=78',
  '/styles.css?v=78',
  '/app-prod.js?v=78',
  '/data.js?v=78',
  '/divya-data-prod.js?v=78',
  '/divya-data.js?v=78',
  '/games.js?v=78',
  '/flipbook.js?v=78',
  '/flipbook.css?v=78',
  '/images/hampi.jpg',
  '/images/ganesha.jpg',
  '/images/dashavatara.jpg',
  '/images/ajanta.jpg',
  '/images/chola.jpg',
  '/images/shivaji.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {});
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

// Network-First strategy for HTML, JS, JSON, and Images to guarantee immediate live updates
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Network-first for all app files and images
  if (
    url.origin === location.origin &&
    (url.pathname === '/' ||
     url.pathname.endsWith('.html') ||
     url.pathname.endsWith('.js') ||
     url.pathname.endsWith('.json') ||
     url.pathname.endsWith('.css') ||
     url.pathname.includes('/images/'))
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for other static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
