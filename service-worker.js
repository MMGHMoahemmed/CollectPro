const CACHE_NAME = 'data-collection-cache-v1';
const urlsToCache = [
    './', // Cache the index.html
    './index.html', // Explicitly cache index.html again for some browsers
    './style.css', // If you have a separate CSS file
    './script.js'  // If you have a separate JS file, otherwise remove this
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});