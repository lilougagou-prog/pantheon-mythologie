# Panthéon — apprendre la mythologie grecque

PWA statique (HTML/CSS/JS vanilla, aucune dépendance) née de la séparation du contenu
mythologique hors de l'appli sœur **Tarot-mythologie** ("Delphes"). Voir cette appli-là pour
le contexte complet de la décision et son historique de développement — ce dépôt ne
documente que ce qui est spécifique à Panthéon.

## Pourquoi deux applis

L'appli Tarot mélangeait deux publics différents dans son onglet « Apprendre » : les gens
venus pour le tirage de cartes, et ceux venus creuser la mythologie grecque pour
elle-même. Retour direct de l'utilisatrice : séparer les deux en deux produits distincts,
chacun avec son propre positionnement — le Tarot reste centré sur le tirage/rêves/profil
astral, Panthéon devient la vraie encyclopédie mythologique, avec pour ambition d'y ajouter
une **généalogie des dieux** navigable (pas encore construite, voir plus bas).

## Contenu

- **235 figures mythologiques** (`DEITY_NOTES` + `DEITY_LORE`) — portées telles quelles
  depuis Tarot-mythologie (mêmes textes, mêmes portraits, même mécanisme de citations
  croisées `(voir la fiche « Nom »)` résolu par `linkifyLore()`). Contrairement à l'appli
  Tarot, qui ne garde localement que les 78 figures directement incarnées par une carte,
  Panthéon garde l'intégralité du corpus : c'est la collection complète, du premier Titan
  au dernier héros mineur.
- **90 symboles** (`SYMBOL_LIBRARY`) — bibliothèque complète, également dupliquée à
  l'identique depuis Tarot-mythologie (l'appli Tarot garde elle aussi sa propre copie des 90,
  puisqu'ils servent à la lecture des cartes ; décision explicite de dupliquer plutôt que de
  couper, pour que chaque appli reste autonome et complète dans son domaine).
- **86 portraits + 20 configurations d'illustrations intégrées au texte**
  (`DEITY_PORTRAITS`/`DEITY_INLINE_PORTRAITS`), copiés depuis `assets/deity-*.jpg` de
  Tarot-mythologie (101 fichiers, ~13 Mo). Aucune image de carte de tarot n'a été copiée —
  seuls les portraits de figures mythologiques.

## Retouches demandées après la V1

Premier retour de l'utilisatrice après avoir testé la V1 en ligne — quatre ajustements :
- **Texte justifié** : les paragraphes de récit (`.lore-text`) et la note d'introduction de
  chaque fiche (`.detail .note`) passent en `text-align: justify` (avec `hyphens: auto` et
  `text-align-last: left` pour éviter les trous disgracieux en fin de dernière ligne).
- **Listes plutôt que cartes à icônes** : les écrans « Figures mythologiques » et
  « Bibliothèque symbolique » abandonnent la grille de cartes (icône + titre + résumé
  tronqué) pour une liste verticale simple — nom en gras, résumé en italique juste en
  dessous, aucune icône. Les icônes des symboles restent visibles uniquement sur leur
  propre fiche détaillée (`symbol-icon-big`), pas dans la liste.
- **Figure du jour** : nouvelle section en haut de l'accueil, tirée au hasard mais de façon
  déterministe à partir de la date du jour (hash djb2 sur `AAAA-M-J`) — la même figure pour
  tout le monde, stable toute la journée, qui change automatiquement le lendemain, sans
  rien stocker ni interroger de serveur.
- **Menu fixe en bas** (comme dans l'appli Tarot) : Accueil / Figures / Symboles, plus une
  tuile Généalogie non cliquable marquée « Bientôt », en écho à la tuile du même nom sur
  l'accueil. Reste visible sur tous les écrans, y compris les fiches détaillées, et met en
  évidence l'onglet actif (une fiche de figure garde l'onglet « Figures » actif, etc.).
  Les onglets Figures/Symboles réinitialisent la pile de navigation (`goToTab()`) plutôt que
  de l'empiler indéfiniment — chaque onglet est une racine, pas une étape de plus dans une
  chaîne de « ← Retour », qui ne reste utile que pour naviguer *à l'intérieur* d'une section
  (d'une fiche à l'autre via une citation, par exemple).

Testé par un script dédié (27 vérifications) : décompte des lignes de liste (235/90, sans
icônes), présence et déterminisme de la figure du jour, menu fixe rendu et onglet actif
correct sur tous les écrans, justification effective en CSS, plus les garanties déjà en
place (0 citation résiduelle sur les 235 figures + 90 symboles, tous les fichiers d'images
référencés existent). Vérifié aussi visuellement par captures d'écran.

## Retouches supplémentaires

- **Recherche insensible aux accents** : `normalizeSearch()` (décomposition Unicode NFD +
  retrait des marques diacritiques + minuscules) — chercher « Acteon » trouve désormais
  « Actéon », que la requête ou le contenu porte l'accent ou non, sur les deux écrans de
  recherche (figures et symboles).
- **Purge complète des références au Tarot** : au-delà des 80 paragraphes qui commençaient
  littéralement par « Dans le Tarot » (une convention systématique héritée de
  Tarot-mythologie, un paragraphe de ce type par figure ayant sa propre carte), une
  recherche plus large a débusqué 9 mentions isolées, disséminées au milieu d'autres
  phrases plutôt qu'en tête de paragraphe : la mer associée « dans le Tarot » à Ulysse, la
  lyre à Orphée, l'arc à Éros (deux fois, dont une dans le `desc` du symbole lui-même), le
  temple de Delphes (« pour ce tarot »), les symboles bâton/coupe/épée/denier — les quatre
  enseignes du Tarot Marseille — dont trois phrases expliquaient leur sens spécifiquement
  « dans le Tarot », et un paragraphe entier chez Léto bâti autour d'un pont vers « la
  carte VII — Le Chariot ». Chacune corrigée au cas par cas : simple retrait de la
  formule quand le reste de la phrase tient seul (ex. « associée à Poséidon, à Nérée et à
  Ulysse » sans la mention du Tarot), ou suppression complète du paragraphe quand son seul
  objet était la correspondance avec une carte (Léto — son contenu réel, déjà raconté par
  ailleurs dans sa fiche, n'en souffre pas).
- Testé par un script dédié (14 vérifications : recherche accents-insensible sur figures et
  symboles, absence totale du mot « tarot » après l'en-tête du fichier, aucune fiche vidée
  par la suppression, intégrité de la fiche de Léto) + la suite précédente (27
  vérifications) : tout au vert.
- `service-worker.js` : `pantheon-v2` → `pantheon-v3`.

## Ce qui n'est PAS encore construit

- **Généalogie des dieux** : la fonctionnalité phare annoncée pour Panthéon, pas encore
  développée. La page d'accueil affiche déjà la tuile correspondante, marquée « Bientôt »
  et non cliquable, pour poser le repère sans survendre une fonctionnalité absente.
  Nécessitera de modéliser les relations de parenté (parent/enfant, fratrie, union) pour les
  235 figures — un chantier de données à part entière, distinct du simple portage de
  contenu effectué dans cette première version.
- Pas de suivi de progression, pas de compte, pas de mode hors-ligne au-delà du cache
  navigateur basique du service worker — volontairement minimal pour cette V1.
- Pas d'appel IA, pas de backend (`api/`) : contrairement à Tarot-mythologie, Panthéon est
  pour l'instant un site 100% statique.

## Architecture

Un seul fichier `app.js` (~2900 lignes), sur le même principe que l'appli Tarot : les
données mythologiques d'abord (`SYMBOL_LIBRARY`, `DEITY_NOTES`, `DEITY_LORE`,
`DEITY_PORTRAITS`, `DEITY_PORTRAIT_WIDE`, `DEITY_INLINE_PORTRAITS`), puis le mécanisme de
citations (`LORE_LINK_TARGETS`, `linkifyLore()` — code strictement identique à celui de
Tarot-mythologie, porté sans modification), puis une petite couche applicative propre à
Panthéon : navigation par pile (`go()`/`back()`), cinq écrans (accueil, liste des figures,
fiche figure, liste des symboles, fiche symbole), recherche en direct sur chaque liste,
délégation d'événements unique posée une fois sur `#app` plutôt que ré-attachée à chaque
rendu.

Palette visuelle volontairement distincte de l'identité nocturne de Tarot ("Delphes") :
marbre et bronze plutôt que ciel étoilé, polices Cinzel (titres) et Source Serif 4 (corps),
pour une ambiance de musée plutôt que d'oracle.

## Tests

`smoke_pantheon_v1.js` (scratchpad de la session) : charge `app.js` dans un DOM simulé,
vérifie les comptes (235 figures, 90 symboles), simule des clics de navigation à travers
tous les écrans (accueil → figures → fiche → retour → retour, accueil → symboles → fiche),
vérifie l'intégrité totale des citations sur le corpus complet (0 résiduelle, comme côté
Tarot) et l'existence sur disque de tous les fichiers d'images référencés. 18
vérifications, tout au vert.

## Déploiement

Même principe que Tarot-mythologie : PWA statique déployable sur Vercel (ou tout hébergeur
de fichiers statiques), sans configuration particulière — connecter ce dépôt à un nouveau
projet Vercel suffit. Pas de variable d'environnement nécessaire pour cette V1 (aucun appel
API).

## Pistes de suite possibles

- Généalogie des dieux (voir plus haut) — la prochaine grosse pièce.
- Suivi de progression (fiches consultées), sur le modèle de ce qui existe déjà côté Tarot.
- Lien croisé vers l'appli Tarot depuis une fiche figure quand celle-ci est aussi incarnée
  par une carte (utile dans les deux sens une fois les deux applis en ligne).
