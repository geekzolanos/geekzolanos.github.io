const CacheName = 'precache-v1';
const Runtime = 'runtime';

const PRECACHE_URLS = [
    'index.html',
    'scripts/lib.min.js',
    'scripts/main.min.js',
    'scripts/modernizr.min.js',
    'scripts/vendor.min.js',
    'styles/main.min.css',
    'styles/vendor.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CacheName)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [CacheName, Runtime];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.url.startsWith(self.location.origin)) {
        e.respondWith(
            caches.match(e.request).then(res => {
                if (res) return res;

                return caches.open(Runtime).then(cache => {
                    return fetch(e.request).then(response => {
                        return cache.put(e.request, response.clone())
                            .then(() => response);
                    });
                });
            })
        );
    }
});