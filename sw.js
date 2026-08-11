const CACHE_NAME = "MovieHub";

const STATIC_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  // Icons
  "/icons/icon-16x16.png",
  "/icons/icon-32x32.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",

  // Main Assets
  "/index-Cz0yYddx.js",
  "/assets/index-IR_QqjGN.css"
];

// INSTALL
self.addEventListener("install", event => {
  console.log("[SW] Installing...");

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[SW] Caching app shell");
        return cache.addAll(STATIC_CACHE);
      })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("[SW] Activated");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {

        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then(networkResponse => {

            // Ignore invalid responses
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            // Clone response
            const responseClone = networkResponse.clone();

            // Save to cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return networkResponse;
          })
          .catch(() => {

            // Offline fallback for navigation requests
            if (event.request.mode === "navigate") {
              return caches.match("/index.html");
            }

          });

      })
  );
});

// BACKGROUND UPDATE
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
