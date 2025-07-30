const CACHE_NAME = 'allaf-bakery-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.jpg',
  '/manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// التعامل مع طلبات الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إرجاع الملف من الكاش إذا وُجد
        if (response) {
          return response;
        }

        // إذا لم يوجد في الكاش، جلبه من الشبكة
        return fetch(event.request);
      }
    )
  );
});

