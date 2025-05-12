self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('leitor-cifras-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/script.js',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
        // inclua seus .txt e json se quiser funcionamento offline
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
