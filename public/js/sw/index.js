// self.addEventListener('fetch', function(event) {
//   // TODO: only respond to requests with a
//   // url ending in ".jpg"
//   console.log(event.request);
//   if (event.request.url.endsWith('.jpg')) {
//     event.respondWith(
//       fetch('/imgs/dr-evil.gif')
//     );
//   };
// });
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status == 404) {
        return new Response ("Whoops, not found");
      }
      return response;
    }).catch(function(){
      return new Response ("Uh oh, that totally failed!");
    })
  );
});