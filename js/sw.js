const VERSION = "v1";
const CACHE_NAME = `PWA-CLOCK-${VERSION}`

// Install
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

// Activate
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');                                           // Immediately Invoked Function Expression   ✅
    e.waitUntil(                                                                        // e.waitUntil()                             ✅
        (async () => {                                                                  // await keyword = unknown length process    ✅
            const names = await caches.keys();                                          // caches.keys()                             ✅
            await Promise.all(                                                          // Promise.all !!
                names.map((name) => {                                                   // map() method = "for every name in names"  ✅
                    if (name !== CACHE_NAME) {                                          
                        console.log('Service Worker: Clearing old cache.'); 
                        return caches.delete(name);                                     // caches.delete() -- what is it returning?
                    }
                }),
            );
            await clients.claim();
        })(),
    );
});

// Fetch
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching...');                                           
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                const resClone = res;
                caches
                    .open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(e.request, resClone)
                    });
                return res;
            }).catch((err) => caches.match(e.request).then((res) => res))
    );
});