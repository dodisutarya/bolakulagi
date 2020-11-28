const CACHE_NAME = "firstpwa-v2";
let urlsToCache = [
  "/",  
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/service-worker.js",
  "/manifest.json",
  "/team.html",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/standing.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/reg-sw.js",
  "/icon.png",
  "/icon-196.png",
  "/maskable_icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', function (event) {
  var body;
  //console.log(event.data);
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    // icon: 'img/notification.png',
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});


