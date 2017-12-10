self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'
    caches.open('wittr-static-v2').then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('sw activated');
  event.waitUntil(

      caches.keys().then(function(cacheNames) {
        console.log(cacheNames);
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName === 'wittr-static-v1' ) {
              console.log("[Service Worker] Removing Old Caches.", cacheName);
              return caches.delete(cacheName);
            }
            console.log(cacheNames);
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});