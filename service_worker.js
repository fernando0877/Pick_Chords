// service-worker.js
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("v1").then((cache) =>
      cache.addAll([
        "./",
        "./index.html",
        "./script.js",
        "./manifest.json",
        "./icones/pick_512.png",
        "./icones/pick_192.png",
        "./icones/pick_48.png",
        "./icones/pick_32.png", // adicione outros arquivos importantes
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
