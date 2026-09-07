const CACHE="pantheon-v11";
const ASSETS=["./","./index.html","./styles.css","./app.js","./manifest.json","./icon.svg","./icon-192.png","./icon-512.png","./icon-180.png"];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

// Réseau d'abord, cache seulement en secours hors-ligne — même stratégie et même raison que
// dans l'appli Tarot sœur : avec un cache-d'abord classique, un rechargement juste après un
// déploiement peut retomber sur l'ancien service worker encore actif le temps qu'il
// s'installe puis s'active. Le réseau d'abord garantit la dernière version dès que l'appareil
// est en ligne, tout en gardant un usage hors-ligne fonctionnel sur la dernière version vue.
self.addEventListener("fetch",event=>{
  if(event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(res=>{
        if(res && res.ok){
          const resClone = res.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request, resClone)).catch(()=>{});
        }
        return res;
      })
      .catch(()=>caches.match(event.request))
  );
});
