// service_worker.js
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("v1").then((cache) =>
      cache.addAll([
        "./",
        "./index.html",
        "./script.js",
        "./style.css",
        "./manifest.json",
        "./lista_musicas.json",
        "./musicas_extraidas/musica1.txt", // exemplo
        "./icones/pick_512.png",
        "./icones/pick_192.png",
        "./icones/pick_48.png",
        "./icones/pick_32.png"
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});
