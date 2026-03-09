const CACHE_NAME = 'villain-type-v1';
const ASSETS = [
  '/villain-type/',
  '/villain-type/index.html',
  '/villain-type/css/style.css',
  '/villain-type/js/app.js',
  '/villain-type/js/i18n.js',
  '/villain-type/js/locales/ko.json',
  '/villain-type/js/locales/en.json',
  '/villain-type/js/locales/ja.json',
  '/villain-type/js/locales/zh.json',
  '/villain-type/js/locales/hi.json',
  '/villain-type/js/locales/ru.json',
  '/villain-type/js/locales/es.json',
  '/villain-type/js/locales/pt.json',
  '/villain-type/js/locales/id.json',
  '/villain-type/js/locales/tr.json',
  '/villain-type/js/locales/de.json',
  '/villain-type/js/locales/fr.json',
  '/villain-type/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetched = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
