const appName = "mws-restaurant-stage-1";
const staticCacheName = appName + "-v1.0";

const contentImgsCache = appName + "-images";

/// Place all the caches in an array ///
var allCaches = [
  staticCacheName,
  contentImgsCache
];


/** At Service Worker Install time, cache all static assets */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/', // this caches index.html
        '/restaurant.html',
        '/css/styles.css',
        '/css/styles-medium.css',,
        '/css/styles-large.css',
        '/js/dbhelper.js',
        '/js/secret.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/register-sw.js',
        'data/restaurants.json'
      ]);
    })
  );
});

/** At Service Worker Activation, Delete previous caches, if any */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith(appName) &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});