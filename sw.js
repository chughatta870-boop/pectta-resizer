const CACHE_NAME = 'pecta-resizer-v2';
const BASE = '/pecta-resizer/'; // Repo naam yahan bhi
const FILES_TO_CACHE = [
  BASE,
  BASE+'index.html',
  BASE+'style.css',
  BASE+'script.js',
  BASE+'manifest.json',
  BASE+'icon-192.png',
  BASE+'icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
