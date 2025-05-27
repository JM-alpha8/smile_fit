const CACHE_NAME = 'smile-fit-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/index.html',
  '/pages/game_mode.html',
  '/pages/game_follow.html',
  '/pages/game_emotion.html',
  '/pages/game_feedback.html',
  '/pages/rehab_mode.html',
  '/pages/focus.html',
  '/pages/focus_fit.html',
  '/pages/complex.html',
  '/pages/complex_fit.html',
  '/pages/feedback.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
