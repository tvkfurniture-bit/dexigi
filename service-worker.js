
    const CACHE_NAME = 'titan-v50-cache';
    const urlsToCache = ['./index.html', './about.html', './contact.html', './product.html', './blog.html', './post.html'];
    
    self.addEventListener('install', (e) => { 
        e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))); 
        self.skipWaiting(); 
    });
    
    self.addEventListener('fetch', (e) => { 
        if (e.request.url.includes('google.com/spreadsheets')) {
            e.respondWith(fetch(e.request).then(res => {
                const resClone = res.clone(); 
                caches.open('titan-data').then(cache => cache.put(e.request, resClone)); 
                return res;
            }).catch(() => caches.match(e.request)));
        } else {
            e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
        }
    });
    