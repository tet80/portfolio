const CACHE_NAME = "app-saudacao-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "manhã1.jpg",
  "tarde.jpg",
  "noite.jpg",
  "madrugada.jpg",
  "icon192.png",
  "icon-512.png"
];

// Instala e armazena os arquivos no cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o service worker e limpa caches antigos
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde com o cache se estiver offline
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});



