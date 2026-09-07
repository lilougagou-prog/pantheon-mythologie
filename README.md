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

- **253 figures mythologiques** (`DEITY_NOTES` + `DEITY_LORE`) — les 235 portées telles
  quelles depuis Tarot-mythologie (mêmes textes, mêmes portraits, même mécanisme de
  citations croisées `(voir la fiche « Nom »)` résolu par `linkifyLore()`), complétées par
  18 figures primordiales et Titans créées directement dans Panthéon (voir plus bas). Contrairement à l'appli
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

## Fiches des Titans et figures primordiales (préalable à la généalogie)

Avant de construire l'écran de généalogie proprement dit, l'utilisatrice a demandé de
d'abord compléter le corpus : « il faut que toutes les figures concernées soient citées ».
Or la racine même de la généalogie grecque manquait — la plupart des figures primordiales
et des Titans de la première génération n'avaient jamais eu de fiche dans le corpus porté
depuis Tarot-mythologie (celui-ci partait directement des douze Olympiens).

- **18 nouvelles figures créées** (235 → 253) : Chaos, Ouranos, Nyx, Érèbe, Tartare, Cronos,
  Océan, Téthys, Hypérion, Théia, Coéos, Phoebé, Crios, Japet, Mnémosyne, Épiméthée,
  Ménétios et Clymène — les primordiaux et les douze Titans de la première génération
  (Rhéa avait déjà sa fiche). Chacune reçoit une note biographique et 2 à 4 paragraphes de
  récit, systématiquement reliés à leurs parents/enfants/unions déjà présents dans le
  corpus via le mécanisme de citations `(voir la fiche « Nom »)`.
- **Une trentaine de citations rétro-ajoutées** dans des fiches déjà existantes, pour que la
  chaîne de parenté remonte sans interruption jusqu'à Chaos : les six premiers Olympiens
  (Zeus, Héra, Poséidon, Hadès, Déméter, Hestia) citent désormais Cronos et Rhéa ; Hélios,
  Séléné et Éos citent Hypérion et Théia ; Léto et Astéria citent Coéos et Phoebé ; Atlas et
  Prométhée citent Japet ; Rhéa, Gaïa, Aphrodite et Thémis citent leurs propres parents ;
  les Muses, Calliope, Clio, Hypnos, Thanatos, Éris, Apaté, les Hespérides, les Parques et
  Lethée citent Mnémosyne ou Nyx selon le cas.
- **Deux pièges d'homonymie traités sans créer de doublon** : le Titan marin Persès (fils de
  Crios) est mentionné en texte simple dans la fiche de Crios, sans être lié à la fiche
  existante « Persès » (le mortel, fils de Persée) — une phrase explicite lève l'ambiguïté.
  Même traitement pour l'Océanide Électre (mère d'Iris), mentionnée sans lien dans la fiche
  d'Océan pour ne pas se confondre avec la fiche existante « Électre » (fille d'Agamemnon).
- Testé par un script dédié (88 vérifications : présence des 18 figures, intégrité de la
  chaîne primordiale Chaos → Ouranos/Gaïa → Cronos/Rhéa → Olympiens, sécurité des deux
  pièges d'homonymie, chacune des rétro-citations, 0 citation résiduelle sur l'ensemble du
  corpus) + les deux suites précédentes (27 + 14 vérifications, remises au vert après mise à
  jour de leurs décomptes 235 → 253) : tout au vert.
- `service-worker.js` : `pantheon-v3` → `pantheon-v4`.

## Généalogie des dieux

La fonctionnalité phare annoncée pour Panthéon, construite en s'appuyant directement sur le
travail de fiches primordiales/Titans ci-dessus. Reprend la recommandation faite à
l'utilisatrice (Option A d'une comparaison à trois présentations) : une **fiche recentrée**
plutôt qu'un arbre graphique complexe à faire tenir sur un écran de téléphone.

- **Une seule source de vérité**, `GENEALOGY_PARENTS` (id → [parents]) : tout le reste —
  enfants, union(s), fratrie — s'en déduit automatiquement (`genealogyRelations()`), jamais
  saisi à la main, pour ne jamais désynchroniser les deux sens d'une même relation. Construite
  exclusivement à partir de liens déjà énoncés en toutes lettres dans `DEITY_LORE` (jamais un
  lien inventé pour l'occasion) : le socle primordiaux → Titans → Olympiens au complet, puis
  les lignées héroïques les mieux documentées du corpus — Persée et ses sept enfants, les
  Atrides, la famille royale de Troie, le cycle thébain, la famille d'Ulysse, Minos et Thésée,
  Nérée et sa descendance marine, Danaos/Égyptos, entre autres. Couverture volontairement
  partielle (une centaine de figures reliées sur 253) plutôt qu'une tentative hasardeuse sur
  l'ensemble du corpus, y compris pour des parentés mortelles sans fiche propre (un roi
  mentionné en passant sans jamais avoir son propre id, par exemple).
- **Écran d'exploration** (`renderGenealogy()`) : la figure choisie au centre, avec quatre
  groupes de chips tout autour — Parents, Union(s), Frères et sœurs, Enfants — chacun cliquable
  pour recentrer l'arbre à son tour (chaque clic empile un écran, si bien que « ← Retour »
  redéroule l'exploration pas à pas plutôt que de revenir directement à l'accueil). Un bouton
  « Voir la fiche complète » ouvre la fiche narrative habituelle sans quitter le fil.
- **Écran d'accueil dédié** (`renderGenealogyHome()`) : huit points d'entrée choisis plutôt
  qu'une liste des 253 figures — les origines du monde (Chaos), les Titans (Cronos), les douze
  Olympiens (Zeus), la lignée de Persée, la guerre de Troie (Priam), les Atrides (Agamemnon),
  le cycle thébain (Cadmos), la famille d'Ulysse — chacun menant à un pan bien documenté d'où
  l'exploration se poursuit ensuite de proche en proche.
- **Chips « Lignée » directement sur chaque fiche concernée** (`genealogyLineageHTML()`) :
  parents et enfants les plus proches affichés sans quitter la fiche narrative, plus un lien
  vers l'arbre complet — pour les cas simples, l'utilisatrice n'a jamais besoin de changer
  d'écran. Rien ne s'affiche sur les fiches sans aucune donnée de généalogie (la majorité des
  253, en particulier les figures mineures ou purement allégoriques).
- **Tuile d'accueil et onglet du menu du bas** : la mention « Bientôt » disparaît, remplacée
  par un vrai bouton menant à `genealogyHome` — la tuile affiche le nombre de figures reliées
  par au moins un lien de généalogie plutôt qu'un badge « Bientôt ».
- Un piège de calcul corrigé en cours de route : Gaïa étant à la fois mère d'Ouranos seule
  *et* mère des Titans avec lui, un calcul naïf de fratrie faisait apparaître Ouranos comme
  « frère » de Cronos alors qu'il est déjà son père — corrigé en excluant les propres
  parents/enfants d'une figure de son propre calcul de fratrie.
- Testé par un script dédié (34 vérifications : intégrité des données — clés/parents tous des
  figures existantes, aucune figure son propre parent, `GENEALOGY_CHILDREN` exact miroir de
  `GENEALOGY_PARENTS`, socle primordial correct —, chaînes de parenté connues, navigation
  complète — tuile, onglet, points d'entrée, recentrage, retour, fiche complète, absence de
  section Lignée sans donnée, message d'absence de parenté —, plus la non-régression des
  citations et du décompte de 253 figures) + les trois suites précédentes (27 + 14 + 88
  vérifications, dont une assertion mise à jour côté v2 pour refléter la tuile désormais
  cliquable) : tout au vert. Vérifié aussi visuellement par captures d'écran.
- `service-worker.js` : `pantheon-v4` → `pantheon-v5`.

## Ce qui n'est PAS encore construit

- Pas de suivi de progression, pas de compte, pas de mode hors-ligne au-delà du cache
  navigateur basique du service worker — volontairement minimal pour cette V1.
- Pas d'appel IA, pas de backend (`api/`) : contrairement à Tarot-mythologie, Panthéon est
  pour l'instant un site 100% statique.
- La généalogie ne couvre qu'une centaine de figures sur 253 (voir plus haut) — étendre la
  couverture à d'autres lignées bien documentées du corpus reste une piste de suite naturelle.

## Architecture

Un seul fichier `app.js` (~3300 lignes), sur le même principe que l'appli Tarot : les
données mythologiques d'abord (`SYMBOL_LIBRARY`, `DEITY_NOTES`, `DEITY_LORE`,
`DEITY_PORTRAITS`, `DEITY_PORTRAIT_WIDE`, `DEITY_INLINE_PORTRAITS`, `GENEALOGY_PARENTS`), puis
le mécanisme de citations (`LORE_LINK_TARGETS`, `linkifyLore()` — code strictement identique à
celui de Tarot-mythologie, porté sans modification), puis une petite couche applicative propre
à Panthéon : navigation par pile (`go()`/`back()`), sept écrans (accueil, liste des figures,
fiche figure, liste des symboles, fiche symbole, accueil généalogie, exploration généalogie),
recherche en direct sur chaque liste, délégation d'événements unique posée une fois sur `#app`
plutôt que ré-attachée à chaque rendu.

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

- Étendre la couverture de `GENEALOGY_PARENTS` à d'autres lignées bien documentées du corpus
  (voir plus haut) — la généalogie ne relie aujourd'hui qu'une centaine de figures sur 253.
- Suivi de progression (fiches consultées), sur le modèle de ce qui existe déjà côté Tarot.
- Lien croisé vers l'appli Tarot depuis une fiche figure quand celle-ci est aussi incarnée
  par une carte (utile dans les deux sens une fois les deux applis en ligne).
