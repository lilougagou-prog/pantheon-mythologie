const CACHE="pantheon-v57";
const ASSETS=["./","./index.html","./styles.css","./app.js","./manifest.json","./icon.svg","./icon-192.png","./icon-512.png","./icon-180.png","./politique-confidentialite.html","./assets/hero-olympians.jpg","./assets/badge-home-temple.webp","./assets/badge-figures-portrait.webp","./assets/badge-symbols-lyre.webp","./assets/badge-genealogy-mother.webp","./assets/badge-places-map.webp","./assets/home-olive-branch.webp","./assets/symbol-abeille.webp","./assets/symbol-aigle.webp","./assets/symbol-ailes.webp","./assets/symbol-air.webp","./assets/symbol-araignee.webp","./assets/symbol-arc.webp","./assets/symbol-arc-en-ciel.webp","./assets/symbol-aurore.webp","./assets/symbol-balance.webp","./assets/symbol-belier.webp","./assets/symbol-ble.webp","./assets/symbol-caduceus.webp","./assets/symbol-carrefour.webp","./assets/symbol-cerf.webp","./assets/symbol-chaine.webp","./assets/symbol-char.webp","./assets/symbol-char-solaire.webp","./assets/symbol-chemin.webp","./assets/symbol-chene.webp","./assets/symbol-cheval.webp","./assets/symbol-chevre.webp","./assets/symbol-chien.webp","./assets/symbol-chouette.webp","./assets/symbol-cle.webp","./assets/symbol-colombe.webp","./assets/symbol-corbeau.webp","./assets/symbol-couronne.webp","./assets/symbol-crabe.webp","./assets/symbol-cygne.webp","./assets/symbol-corne-abondance.webp","./assets/symbol-eau.webp","./assets/symbol-dauphin.webp","./assets/symbol-cypres.webp","./assets/symbol-egide.webp","./assets/symbol-eclair.webp","./assets/symbol-eclipse.webp","./assets/symbol-etoile.webp","./assets/symbol-feu.webp","./assets/symbol-figue.webp","./assets/symbol-fil.webp","./assets/symbol-fleche.webp","./assets/symbol-crocus.webp","./assets/symbol-narcisse-fleur.webp","./assets/symbol-flute.webp","./assets/symbol-foret.webp","./assets/symbol-graine.webp","./assets/symbol-grenade.webp","./assets/symbol-grotte.webp","./assets/symbol-labyrinthe.webp","./assets/symbol-lance.webp","./assets/symbol-lanterne.webp","./assets/symbol-foudre.webp","./assets/symbol-laurier.webp","./assets/symbol-lierre.webp","./assets/symbol-lion.webp","./assets/symbol-lotus.webp","./assets/symbol-lune.webp","./assets/symbol-lyre.webp","./assets/symbol-miroir.webp","./assets/symbol-myrte.webp","./assets/symbol-noix.webp","./assets/symbol-olive.webp","./assets/symbol-olivier.webp","./assets/symbol-ouroboros.webp","./assets/symbol-paon.webp","./assets/symbol-papillon.webp","./assets/symbol-pavot.webp","./assets/symbol-pegase.webp","./assets/symbol-poisson.webp","./assets/symbol-pomme.webp","./assets/symbol-pont.webp","./assets/symbol-porte.webp","./assets/symbol-raisin.webp","./assets/symbol-riviere.webp","./assets/symbol-rose.webp","./assets/symbol-roue.webp","./assets/symbol-sanglier.webp","./assets/symbol-sceptre.webp","./assets/symbol-scorpion.webp","./assets/symbol-serpent.webp","./assets/symbol-soleil.webp","./assets/symbol-taureau.webp","./assets/symbol-temple.webp","./assets/symbol-terre.webp","./assets/symbol-torche.webp","./assets/symbol-torches.webp","./assets/symbol-trident.webp","./assets/symbol-vigne.webp","./assets/symbol-voile.webp","./assets/map-icon-sanctuaire.webp","./assets/map-icon-montagne.webp","./assets/map-icon-cite.webp","./assets/map-icon-ile.webp","./assets/map-icon-detroit.webp","./assets/map-icon-source.webp","./assets/map-icon-souterrain.webp"];

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
