# Captures d'écran — préparation App Store Connect

Générées directement depuis l'app web (`shot_appstore.js`, script de session — pas commité),
avec les tailles logiques réelles des appareils Apple visés, agrandies au facteur d'échelle
correspondant pour obtenir exactement les dimensions de fichier attendues :

| Appareil | Taille logique | Échelle | Fichier obtenu |
|---|---|---|---|
| iPhone 6.9" (16/15 Pro Max) | 440 × 956 | ×3 | 1320 × 2868 px |
| iPad Pro 13" | 1032 × 1376 | ×2 | 2064 × 2752 px |

**Vérifie les tailles exactes exigées au moment de la soumission** dans App Store Connect
(Monetization/Media Manager) — Apple fait évoluer ces exigences de temps à autre, et peut
proposer d'autres tailles intermédiaires optionnelles.

## Limite connue : la capture « 04-lieux » n'affiche pas les tuiles de la carte

Ces captures ont été générées depuis un environnement de développement dont l'accès réseau
sortant vers les CDN externes (dont celui de Leaflet/OpenStreetMap) est restreint — la carte
affiche donc son message de repli (« Chargement de la carte… ») plutôt que les tuiles réelles.
**Refais cette capture précise** (`04-lieux-*.png`) depuis un navigateur avec un accès Internet
normal avant de la déposer dans App Store Connect — les cinq autres captures ne dépendent
d'aucune ressource externe et sont fidèles à ce qu'un utilisateur verra réellement.

## Écrans couverts

1. Accueil
2. Fiche figure gratuite (Zeus)
3. Fiche symbole gratuite et enrichie (Chouette)
4. Carte des lieux mythologiques (voir la limite ci-dessus)
5. Généalogie des douze Olympiens
6. Paywall (fiche premium — Arès), utile aussi pour la capture exigée par App Store Connect lors
   de la configuration du produit In-App Purchase (voir `APP_STORE_CONNECT.md`, §3)
