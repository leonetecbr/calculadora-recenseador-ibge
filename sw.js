const prefix = 'ibge'
const version = '1.0.2'
const staticCacheName = prefix + '-v' + version
const filesToCache = [
    '/apps/ibge',
    '/apps/ibge/',
    '/apps/ibge/?utm_source=homescreen',
    '/apps/ibge/index.html',
    '/apps/ibge/css/style.min.css',
    '/apps/ibge/css/bootstrap.min.css',
    '/apps/ibge/css/bootstrap-icons.css',
    '/apps/ibge/js/app.min.js',
    '/apps/ibge/js/bootstrap.bundle.min.js',
    '/apps/ibge/js/jquery.min.js',
    '/apps/ibge/manifest.json',
    '/apps/ibge/img/48.png',
    '/apps/ibge/img/72.png',
    '/apps/ibge/img/96.png',
    '/apps/ibge/img/144.png',
    '/apps/ibge/img/168.png',
    '/apps/ibge/img/192.png',
    '/apps/ibge/img/512.png',
    '/apps/ibge/img/x48.png',
    '/apps/ibge/img/x72.png',
    '/apps/ibge/img/x96.png',
    '/apps/ibge/img/x144.png',
    '/apps/ibge/img/x168.png',
    '/apps/ibge/img/x192.png',
    '/apps/ibge/img/x512.png',
    '/apps/ibge/favicon.ico',
    '/apps/ibge/css/fonts/bootstrap-icons.woff?8d200481aa7f02a2d63a331fc782cfaf',
    '/apps/ibge/css/fonts/bootstrap-icons.woff2?8d200481aa7f02a2d63a331fc782cfaf',
]

self.addEventListener('install', event => {
    self.skipWaiting()

    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache)
            })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith(prefix)))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request)
            })
    )
})