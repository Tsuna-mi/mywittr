import { Promise } from 'es6-promise';
var staticCacheName = 'wittr-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'
    caches.open(staticCacheName).then(function(cache) {
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
      //get all the caches exists
      caches.keys().then(function(cacheNames) {
        console.log(cacheNames);
        //filtramos y nos quedamos solo con las que empiezar por wittr- 
        //y son distintas de la actual
        //las ponemos en un array y las borramos.
        return Promise.all(
          cacheNames.filter(function(cacheName){
            return cacheName.startsWith('wittr-') &&
            cacheName != staticCacheName;
          }).map(function(cacheName){
            return cache.delete(cacheName);
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