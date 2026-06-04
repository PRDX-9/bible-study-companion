/* Offline support: cache the app shell so it opens with no internet.
 * Notes are not cached here. They live in IndexedDB on the device. */

const CACHE = 'bsc-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=5',
  './app.js?v=5',
  './db.js?v=5',
  './books.js?v=5',
  './strongs.js?v=5',
  './data/strongs-hebrew.json?v=5',
  './data/strongs-greek.json?v=5',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Page loads: try the network first so updates land, fall back to cache offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Other assets: cache first for speed, fall back to network.
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => undefined))
  );
});
