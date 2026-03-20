const CACHE = 'sucre-v2';
const ASSETS = [
  '/Sucre/',
  '/Sucre/index.html',
  '/Sucre/styles.css',
  '/Sucre/app.js',
  '/Sucre/manifest.json',
  '/Sucre/icon-192.png',
  '/Sucre/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request)).catch(() =>
      caches.match('/Sucre/index.html')
    )
  );
});
