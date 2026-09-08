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

- **274 figures mythologiques** (`DEITY_NOTES` + `DEITY_LORE`) — les 235 portées telles
  quelles depuis Tarot-mythologie (mêmes textes, mêmes portraits, même mécanisme de
  citations croisées `(voir la fiche « Nom »)` résolu par `linkifyLore()`), complétées par
  39 figures créées directement dans Panthéon (18 primordiales et Titans, 11 pour étoffer les
  lignées de Cadmos et de Zeus/Europe, 10 pour affilier tous les enfants déjà recensés à leur
  mère ou leur père — voir plus bas). Contrairement à l'appli
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

## Généalogie des dieux (V1)

La fonctionnalité phare annoncée pour Panthéon, construite en s'appuyant directement sur le
travail de fiches primordiales/Titans ci-dessus. Reprend la recommandation faite à
l'utilisatrice (Option A d'une comparaison à trois présentations) : une fiche recentrée
plutôt qu'un arbre graphique complexe à faire tenir sur un écran de téléphone.

- `GENEALOGY_PARENTS` (id → [parents]) : source de vérité unique, construite exclusivement à
  partir de liens déjà énoncés en toutes lettres dans `DEITY_LORE`. Enfants, unions et fratrie
  s'en déduisent automatiquement (`genealogyRelations()`), jamais saisis à la main.
- Écran d'exploration centré sur une figure (`renderGenealogy()`), avec Parents/Union(s)/Frères
  et sœurs/Enfants en chips cliquables, plus un écran d'accueil à huit points d'entrée choisis.
- Chips « Lignée » directement sur chaque fiche concernée.
- Un piège de calcul corrigé : Gaïa étant à la fois mère d'Ouranos seule *et* mère des Titans
  avec lui, un calcul naïf de fratrie faisait apparaître Ouranos comme « frère » de Cronos.

Testé par 34 vérifications, tout au vert — **mais jugée nettement insuffisante par
l'utilisatrice dès le premier retour** (voir ci-dessous, retravaillée dans la foulée).

## Généalogie des dieux (V2 — retour et refonte)

Premier retour concret de l'utilisatrice sur la V1 : « c'est pas du tout assez complet [...] il
faut pas focaliser sur un seul dieu [...] il faut faire l'arbre généalogique avec les branches
[...] L'arbre de Cadmos n'est pas du tout assez développée [...] Fais l'arbre ascendant de
chaque olympien [...] Vas bien chercher tous les enfants [...] je veux pouvoir bien identifier
la mère à chaque fois. » Quatre chantiers distincts pour y répondre :

- **11 figures créées pour étoffer deux lignées sous-développées** (264 figures au total,
  253 → 264) : Épaphos (fils de Zeus et d'Io, souche des lignées d'Argos et de Thèbes via
  Libye), Ino, Autonoë, Agavé et Polydoros (les cinq enfants de Cadmos et Harmonie — jusque-là
  seule Sémélé avait sa fiche), Labdacos et Laïos (la lignée royale thébaine jusqu'à Œdipe),
  Amphion et Zéthos (fils de Zeus, fondateurs des murailles de Thèbes), Rhadamanthys et
  Sarpédon (fils de Zeus et d'Europe, frères de Minos). Piège d'homonymie traité comme pour les
  Titans : Polydoros (fils de Cadmos) reste distinct de Polydore (fils de Priam, déjà existant),
  jamais fusionnés malgré l'orthographe presque identique.
- **Les enfants de Zeus, bien plus complets** (16 → 36 recensés) : Minos/Rhadamanthys/Sarpédon
  (avec Europe), Épaphos (avec Io), Amphion/Zéthos (avec Antiope de Thèbes — volontairement
  non reliée à la fiche « Antiope », qui couvre aussi la reine amazone épouse de Thésée, pour ne
  pas laisser croire à tort qu'Amphion et Hippolyte sont demi-frères), les trois Charites et
  leurs membres nommés (avec Eurynomé, sans fiche propre), Aletheia et Tyché (traditions
  alternatives, rapportées telles quelles). Hermaphrodite et Priape, eux, sont bien enfants
  d'Aphrodite (avec Hermès, puis avec Dionysos) et non de Zeus — retrofit au passage.
- **L'arbre de Cadmos, cinq fois plus développé** : 1 → 5 enfants directs (Sémélé, Ino, Autonoë,
  Agavé, Polydoros), avec leurs propres branches — Autonoë → Actéon, Agavé → Penthée, Sémélé →
  Dionysos → Priape, et la lignée royale complète Polydoros → Labdacos → Laïos → Œdipe →
  Antigone, cinq générations en tout là où il n'y en avait qu'une seule avant ce round.
- **Refonte de l'écran d'exploration en véritable arbre à branches**, remplaçant les quatre
  groupes de chips plats de la V1 :
  - **Ascendance** (`buildGenealogyAncestorTree()` + `genealogyAncestorTreeHTML()`) : la chaîne
    complète des ancêtres au-dessus de la figure choisie, jusqu'à Chaos, toujours développée
    en entier (rarement plus de 3-4 générations).
  - **Descendance** (`buildGenealogyDescendantTree()` + `genealogyDescendantTreeHTML()`) : les
    enfants **groupés par union** — un bloc « avec {mère/père} » par partenaire connu, pour
    identifier de qui vient chaque enfant plutôt que de les mélanger en un seul bloc — puis
    développés récursivement sur plusieurs générations. Pour ne jamais surcharger l'écran, une
    branche s'arrête de se développer en ligne dès qu'elle atteint une figure ayant elle-même
    une « grosse généalogie » (`isGenealogyHub()`, seuil : au moins deux enfants propres) — elle
    devient alors un simple lien cliquable vers son propre arbre plutôt que redessinée ici.
  - **Déduplication** : deux frères et sœurs mariés ensemble (Océan et Téthys, Cronos et
    Rhéa...) partagent les mêmes enfants dans le mythe ; sans protection, chacun des deux,
    développé en ligne, aurait redessiné deux fois la même descendance. Toute réapparition
    d'un même enfant dans un même arbre est désormais marquée et rendue en renvoi discret
    (« *(même enfant que ci-dessus, union commune)* ») plutôt que redéveloppée.
  - Les chips « Lignée » sur chaque fiche affichent elles aussi désormais les enfants groupés
    par union, pour la même raison.
- **Les points d'entrée corrigés pour ne plus focaliser sur une seule figure** :
  - « Les Titans » part maintenant d'Ouranos (montre toute la génération des douze Titans
    d'un coup) plutôt que de Cronos seul.
  - **Nouvel écran dédié « Les douze Olympiens »** (`renderOlympiansOverview()`, douze cartes)
    remplace l'ancien point d'entrée qui menait directement à l'arbre de Zeus : chacun des
    douze (`OLYMPIAN_IDS`) affiche sa propre ligne d'ascendance directe (« Enfant de Cronos et
    Rhéa », « Enfant d'Héra seule » pour Héphaïstos, etc.), et cliquer dessus ouvre son arbre
    personnel complet — ascendance ET descendance — plutôt que de se concentrer sur Zeus.
  - Chaque tuile de l'accueil de la généalogie porte désormais un sous-titre qui promet
    explicitement la largeur de l'arbre plutôt qu'un seul nom (« Ouranos, Gaïa et toute leur
    descendance », « Cadmos, Harmonie et cinq générations de Thèbes »...).
- Testé par un script dédié (49 vérifications : intégrité des 11 nouvelles figures, arbre de
  Cadmos, complétude des enfants de Zeus, regroupement par union, seuil de collapse
  `isGenealogyHub`, déduplication des enfants partagés, ascendance jusqu'à Chaos, écran des
  douze Olympiens et navigation associée, points d'entrée corrigés, non-régression des
  citations et des décomptes) + les quatre suites précédentes (27 + 14 + 88 + 34 vérifications,
  décomptes 253 → 264 mis à jour) : tout au vert. Vérifié aussi visuellement par captures
  d'écran (dont un aller-retour pour confirmer que la déduplication fonctionnait réellement —
  un premier essai avait paru en échec à cause d'un cache de service worker resservant une
  ancienne version d'`app.js`, corrigé en désactivant les service workers pour la vérification).
- `service-worker.js` : `pantheon-v5` → `pantheon-v6`.

## Généalogie des dieux (V3 — deuxième retour)

Deuxième retour, immédiatement après la V2 : « Quand on clique sur douze olympien, je veux
déjà l'arbre généalogique, avec les douze olympiens présents [...] fais juste leurs parents à
chacun pour pas surcharger. Ensuite, pour Zeus, fais ses parents puis ses amantes et ses
enfants. Vérifie aussi les enfants que tu n'as pas affilié : Héraclès par exemple, pourquoi ne
pas l'avoir affilié à sa mère ? Aussi : quand tu as un portrait illustré, insère-le pour rendre
l'arbre plus visuel. » Quatre chantiers :

- **10 nouvelles figures pour affilier tous les enfants déjà recensés** (274 figures au total,
  264 → 274) : Alcmène et Amphitryon (mère et père légal d'Héraclès — Zeus reste son seul père
  biologique), Tyndare et Icarios (fils de Gorgophoné, respectivement père mortel de Castor et
  Clytemnestre, et père de Pénélope), Atrée et Thyeste (les Atrides retrouvent enfin leur
  ancêtre éponyme, jusque-là complètement absent malgré le nom de la lignée), Acrisios (père de
  Danaé, grand-père de Persée), Bélos et Agénor (les jumeaux fils de Libye, pères respectifs de
  Danaos/Égyptos et de Cadmos/Europe), Abas (fils de Lyncée et d'Hypermestre, père d'Acrisios).
  Toutes construites à partir de mentions déjà présentes dans le corpus mais jusque-là sans
  fiche propre ni citation.
- **Les grandes lignées remontent désormais jusqu'à Chaos.** Avant ce round, Cadmos, Europe,
  Danaos, Égyptos, Danaé et Héraclès étaient chacun des racines isolées dans l'arbre — aucun
  parent connu. Elles se rejoignent maintenant toutes à la même souche : Cadmos et Europe par
  Agénor, Danaos et Égyptos par Bélos, tous deux fils de Libye (déjà reliée à Épaphos, Io et
  Zeus depuis la V2) ; Danaé par Acrisios, lui-même par Abas, fils de Lyncée et Hypermestre —
  déjà les deux seuls Danaïdes épargnés — refermant ainsi la boucle jusqu'à Danaos. Conséquence
  concrète : les tuiles « Le cycle thébain » et « La lignée de Persée » affichent maintenant
  une section Ascendance complète, là où elles n'en avaient aucune.
- **« Les douze Olympiens » devient un vrai arbre, pas une liste de cartes.** L'écran de la V2
  affichait douze cartes séparées, chacune avec une ligne de texte résumant son ascendance —
  proche, en pratique, d'une liste plate. Il est remplacé par `buildOlympiansGroups()` +
  `renderOlympiansOverview()` : un arbre unique regroupant les douze par couple de parents
  (Cronos et Rhéa pour Zeus/Héra/Poséidon/Déméter, Zeus et Léto pour Apollon/Artémis, Héra
  seule pour Héphaïstos...), sciemment limité à ce seul niveau d'ascendance pour ne pas
  surcharger l'écran — cliquer sur un Olympien ou sur un parent ouvre son propre arbre complet.
- **Une section « Unions » explicite, restaurée dans l'ordre demandé.** L'écran d'exploration
  affiche maintenant Ascendance, puis Unions (tous les partenaires connus d'une figure, en
  chips — pour Zeus : Alcmène, Danaé, Déméter, Europe, Héra, Io, Léda, Léto, Métis, Mnémosyne,
  Pléiades, Sémélé, Thémis), puis Frères et sœurs, puis Descendance — la V2 avait fusionné cette
  information dans les seuls en-têtes « avec {mère} » de l'arbre des enfants, jugée pas assez
  visible en elle-même.
- **Portraits insérés dans l'arbre partout où ils existent** (`genealogyPortraitHTML()`) : une
  vignette de `DEITY_PORTRAITS` apparaît désormais devant chaque nom de l'arbre (ascendance,
  descendance, unions, chips « Lignée », écran des Olympiens) quand la figure en a un — l'arbre
  reste un simple nom nu pour les figures sans portrait (la majorité), mais devient nettement
  plus visuel pour les figures majeures.
- Testé par un script dédié (39 vérifications : les 10 nouvelles figures, chaque enfant
  désormais affilié — Héraclès/Alcmène, Castor-Clytemnestre/Tyndare, Danaé/Acrisios,
  Pénélope/Icarios, Agamemnon-Ménélas/Atrée, Égisthe/Thyeste, Cadmos-Europe/Agénor,
  Danaos-Égyptos/Bélos —, les grandes lignées remontant bien jusqu'à Chaos, le regroupement des
  douze Olympiens par couple de parents, l'arbre — pas la liste de cartes — sur cet écran, la
  section Unions présente et dans le bon ordre, les portraits insérés, non-régression des
  citations et des décomptes) + les cinq suites précédentes (27 + 14 + 88 + 34 + 49
  vérifications, décomptes 264 → 274 mis à jour, deux assertions de la V2 réécrites pour
  refléter le nouvel écran des Olympiens et l'ascendance désormais présente sur l'écran de
  Cadmos) : tout au vert. Vérifié aussi visuellement par captures d'écran.
- `service-worker.js` : `pantheon-v6` → `pantheon-v7`.

## Généalogie des dieux (V4 — troisième retour) et deux corrections indépendantes

Troisième retour sur la généalogie, plus deux signalements séparés au passage : « Dans les
frères et sœurs, ne mets que les « vrais » [...] pour Castor et Pollux [...] ils ont toute
leur importance » ; « tes arbres ne sont pas intuitifs [...] Mettre son père et sa mère, ses
deux grands-parents. Puis sa femme, ses enfants et c'est tout [...] Ne mets pas de texte
« ascendants » etc. [...] prends toute la page » ; « mettre Chronos + Rhéa en haut au centre,
puis en dessous Déméter, Hestia, Héra, Poséidon, Zeus, Hadès [...] partant d'une flèche de
Zeus [...] à côté [...] directement lié à Ouranos [...] la mer [...] Aphrodite » ; « Évite les
césures de mots » ; « la figure du jour change tout le temps, il faut que ce soit la même
pendant 24 heures. »

- **Fratrie filtrée aux « vrais » frères et sœurs** (`SIBLING_PARENT_MAX_PARTNERS = 3`,
  `siblingContributingChildren()`) : un parent ne contribue plus à la fratrie de ses enfants
  au-delà de ce nombre de partenaires différents. Zeus (une bonne douzaine de partenaires
  connues) ne fait donc plus apparaître à peu près tout le panthéon comme « frère » ou « sœur »
  de Persée — qui n'a désormais plus aucune fratrie affichée, comme demandé. Sous le seuil, les
  demi-frères et sœurs continuent de s'afficher normalement : Castor et Pollux (par leur mère
  commune Léda, deux partenaires seulement) restent bien listés l'un pour l'autre, avec Hélène
  et Clytemnestre.
- **La fiche familiale remplace l'arbre à branches multi-génération** (`buildFamilyCard()`) :
  toujours exactement deux générations en amont (grands-parents, parents), une seule en aval
  (les enfants directs, jamais leurs propres enfants) — jamais plus, jamais moins, quelle que
  soit la figure. L'exemple donné par l'utilisatrice, Persée, donne exactement : Cronos, Rhéa
  et Acrisios (grands-parents) ; Zeus et Danaé (parents) ; Andromède (femme) ; ses 7 enfants.
  Aucun texte de section (« Ascendance », « Descendance », « Union(s) »...) : la disposition en
  rangées empilées et centrées se lit d'elle-même. `isGenealogyHub`,
  `buildGenealogyDescendantTree`, `buildGenealogyAncestorTree` (le seuil de collapse et la
  récursion multi-génération de la V2/V3) ont été retirés — devenus inutiles, une fiche à
  profondeur fixe n'en a plus besoin. Pour aller plus loin, un clic sur n'importe quel nom
  recentre l'écran sur lui, comme avant.
- **« Les douze Olympiens » devient un vrai diagramme généalogique par génération**, dessiné
  à la main d'après le croquis fourni plutôt que déduit automatiquement (bien que chaque lien
  reste vérifié contre `GENEALOGY_PARENTS`, rien n'est inventé) : Cronos et Rhéa en tête,
  centrés ; leurs six enfants juste en dessous — Déméter, Hestia, Héra, Poséidon, Zeus et
  Hadès, y compris les deux qui ne comptent pas parmi les douze Olympiens canoniques mais
  restent bien de la même fratrie ; une rangée de branches partant spécifiquement de Zeus
  (`OLYMPIANS_ZEUS_BRANCHES`) vers Hermès (avec Pléiades), Artémis et Apollon (avec Léto),
  Athéna (avec Métis) ; et, à part, la branche d'Aphrodite reliée directement à Ouranos et
  « la mer » (avec un lien vers la fiche symbole correspondante).
- **Toute la largeur de la page pour les écrans de généalogie** (`#app.wide`, posée
  dynamiquement par `render()` selon l'écran courant) : ces deux écrans passent de 760px à
  1100px de large, pour que les rangées de la fiche familiale et du diagramme des Olympiens
  s'étalent plutôt que de rester comprimées dans la colonne de lecture étroite du reste de
  l'appli.
- **Portraits** : conservés partout où ils existaient déjà (voir V3), désormais aussi sur les
  nœuds de la fiche familiale et du diagramme des Olympiens.
- **Corrections indépendantes, signalées au même moment** :
  - Les paragraphes justifiés (`.lore-text`, `.detail .note`) ne coupent plus les mots en fin
    de ligne (`hyphens: none`, plutôt que `hyphens: auto`).
  - La « figure du jour » est désormais épinglée dans `localStorage` pour toute la journée
    (`figureOfTheDay()`) : sans ça, chaque mise à jour du corpus en cours de journée changeait
    la longueur de `FIGURE_ENTRIES`, donc le reste de la division `hash % longueur`, et donc la
    figure affichée — ce qui, avec les nombreux déploiements de cette session, avait pu donner
    l'impression qu'elle changeait sans cesse. Un choix épinglé pour une date donnée ne change
    plus avant le lendemain, quoi qu'il arrive au corpus entre-temps.
- Testé par un script dédié (33 vérifications : fratrie filtrée — Persée sans demi-frères
  fantômes, Castor/Pollux préservés —, fiche familiale à profondeur fixe sur Persée et sur une
  figure racine (Chaos), absence de tout texte de section, diagramme des Olympiens conforme au
  croquis et vérifié contre les données réelles, classe `wide` posée/retirée selon l'écran,
  absence de `hyphens: auto`, stabilité de la figure du jour même si la taille du corpus change
  en cours de journée, non-régression des citations et des décomptes) + les six suites
  précédentes (27 + 14 + 88 + 34 + 34 + 29 vérifications, plusieurs assertions devenues
  obsolètes par ce changement d'architecture — l'arbre à branches, le hub-collapse, les
  sections textuelles — retirées et remplacées par une note renvoyant à ce nouveau script) :
  tout au vert. Vérifié aussi visuellement par captures d'écran, à largeur mobile et large.
- `service-worker.js` : `pantheon-v7` → `pantheon-v8`.

## Généalogie des dieux (V5 — refonte en vrai pedigree avec connecteurs SVG)

Quatrième retour, portant cette fois uniquement sur la façon dont les liens de parenté sont
*dessinés*, pas sur leur contenu : « tes arbres ne sont pas intuitifs [...] Le principe
fondamental est : CONJOINT ─── CONJOINT, puis une ligne verticale, puis une ligne de fratrie
horizontale, puis une petite branche vers chaque enfant [...] Les lignes doivent être
calculées à partir de la position réelle des nodes (getBoundingClientRect()), pas approximées
avec des bordures CSS [...] Crée un système générique du type Person / Union / Children [...]
Ne code pas les lignes spécifiquement pour Cronos/Rhéa ou Zeus/Héra. »

Toute la mise en page en rangées (`.fam-*`, `.olytree-*`) construite pour la V4 a été retirée
et remplacée par un moteur générique unique, utilisé aussi bien par la fiche familiale que par
l'écran des douze Olympiens :

- **Personnes → Unions → Enfants → Connecteurs SVG** (`ftCardMarkup()`, `ftBranchHTML()`,
  `ftLeaf()`, `ftPersonBranchHTML()`, `ftAncestorBranchHTML()`) : chaque figure devient une
  carte (`.ft-card`) portant un identifiant de position unique (`data-slot`) ; chaque union,
  un couple (`.ft-couple`, une ou deux cartes) suivi, si elle a des enfants, d'une rangée de
  branches filles imbriquées récursivement — exactement le schéma demandé, sans jamais coder
  en dur la moindre relation Cronos/Rhéa ou Zeus/Héra dans le moteur lui-même : celui-ci ne
  sait dessiner qu'« un couple, puis ses enfants », rien de plus spécifique. Une figure ayant
  plusieurs unions (Zeus, Persée...) est dupliquée une fois par union plutôt que reliée par une
  ligne ambiguë vers plusieurs conjoints à la fois — la même carte, avec exactement la même
  apparence à chaque occurrence, comme demandé.
- **`drawFamTree()`** lit, après l'injection du HTML, la position RÉELLE de chaque carte
  (`getBoundingClientRect()`) dans le `<svg id="ftLinks">` superposé à `#ftTree`, et trace des
  connecteurs strictement orthogonaux (jamais de diagonale) : une ligne de mariage horizontale
  entre les deux conjoints avec un petit point de jonction en son milieu, une chute verticale
  depuis ce point, un bus de fratrie horizontal, puis une petite chute verticale vers chaque
  enfant. Recalculé automatiquement — jamais posé une fois pour toutes — à chaque
  redimensionnement de la fenêtre, à la fin du chargement des polices (`document.fonts.ready`,
  la police Cinzel décalant légèrement la largeur des cartes une fois chargée), et sur deux
  frames supplémentaires après le montage via un `ResizeObserver` posé sur `#ftTree` (qui ne
  réagit qu'aux changements de *taille* du conteneur, pas à un simple recentrage interne de ses
  rangées — d'où les frames de rattrapage).
- **Écran des douze Olympiens** reconstruit sur ce moteur : Cronos et Rhéa au centre, une
  vraie ligne de mariage entre eux, un bus de fratrie vers leurs six enfants ; Zeus, en plus
  d'apparaître dans cette fratrie, ouvre sa propre sous-rangée de branches
  (`OLYMPIANS_ZEUS_UNIONS`, chaque enfant vérifié contre `GENEALOGY_PARENTS`/`GENEALOGY_CHILDREN`
  — Zeus+Héra donne bien Arès, Hébé et Ilithyie, vérifiés au passage et non plus seulement
  mentionnés) ; Ouranos et « la mer », à part, mènent à Aphrodite.
- **Fiche familiale reconstruite en vrai pedigree** : les grands-parents paternels et maternels
  forment désormais deux branches ascendantes indépendantes, chacune reliée par sa propre ligne
  de mariage jusqu'au bon parent (celui qui est réellement le sien, jamais mélangé) ; les
  parents forment le couple central, relié par un bus à la fratrie et à la figure centrale
  elle-même (mise en évidence par un contour doré) ; celle-ci ouvre à son tour sa propre
  branche vers son ou ses conjoints et leurs enfants. Le texte descriptif (portrait, note,
  lien vers la fiche complète) vit désormais sous l'arbre plutôt que dans une carte à part —
  l'arbre reste un pur diagramme de parenté.
- **Défilement horizontal sur mobile** (`.ft-scroll`) sans jamais faire déborder la page
  elle-même (vérifié : 0px de débordement horizontal du document), les connecteurs restant
  toujours exactement rattachés à leurs cartes après défilement puisque tout est calculé en
  coordonnées relatives au conteneur de l'arbre, qui défile avec eux. L'arbre s'ouvre
  automatiquement centré sur la figure la plus pertinente (`centerFamTreeScroll()`) — la
  figure centrale sur une fiche familiale, la racine sur l'écran des Olympiens — plutôt que sur
  le bord gauche brut d'un arbre qui peut être bien plus large que l'écran.
- Testé par un script dédié (34 vérifications : structure HTML des deux écrans, unicité de
  tous les `data-slot`, `OLYMPIANS_ZEUS_UNIONS` vérifié contre les données réelles, pedigree de
  Persée avec ses deux branches ascendantes distinctes, cas racine sans parent (Chaos), cas
  d'une figure à parent unique, absence de tout texte de section, disparition complète des
  anciennes classes `.fam-*`/`.olytree-*`) + les huit suites précédentes, toutes remises au
  vert (quelques assertions structurelles obsolètes, propres à l'ancienne mise en page en
  rangées, corrigées ou remplacées par une note renvoyant à ce nouveau script). Vérifié aussi
  visuellement par captures d'écran (bureau et mobile) : lignes de mariage, bus de fratrie et
  chutes vers chaque enfant correctement rattachés aux bonnes cartes dans les deux cas.
- `service-worker.js` : `pantheon-v8` → `pantheon-v9`.

## Ce qui n'est PAS encore construit

- Pas de suivi de progression, pas de compte, pas de mode hors-ligne au-delà du cache
  navigateur basique du service worker — volontairement minimal pour cette V1.
- Pas d'appel IA, pas de backend (`api/`) : contrairement à Tarot-mythologie, Panthéon est
  pour l'instant un site 100% statique.
- La généalogie ne couvre encore qu'une partie du corpus (voir plus haut, `GENEALOGY_PARENTS`)
  — étendre la couverture à d'autres lignées bien documentées reste une piste de suite
  naturelle, désormais sur une base de données et d'interface bien plus solide.

## Architecture

Un seul fichier `app.js` (~3950 lignes), sur le même principe que l'appli Tarot : les
données mythologiques d'abord (`SYMBOL_LIBRARY`, `DEITY_NOTES`, `DEITY_LORE`,
`DEITY_PORTRAITS`, `DEITY_PORTRAIT_WIDE`, `DEITY_INLINE_PORTRAITS`, `GENEALOGY_PARENTS`), puis
le mécanisme de citations (`LORE_LINK_TARGETS`, `linkifyLore()` — code strictement identique à
celui de Tarot-mythologie, porté sans modification), puis une petite couche applicative propre
à Panthéon : navigation par pile (`go()`/`back()`), huit écrans (accueil, liste des figures,
fiche figure, liste des symboles, fiche symbole, accueil généalogie, douze Olympiens, fiche
familiale généalogique), recherche en direct sur chaque liste, délégation d'événements unique
posée une fois sur `#app` plutôt que ré-attachée à chaque rendu.

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

- Étendre encore la couverture de `GENEALOGY_PARENTS` à d'autres lignées du corpus.
- Suivi de progression (fiches consultées), sur le modèle de ce qui existe déjà côté Tarot.
- Lien croisé vers l'appli Tarot depuis une fiche figure quand celle-ci est aussi incarnée
  par une carte (utile dans les deux sens une fois les deux applis en ligne).

## Bibliothèque symbolique (refonte — sources, certitude et réseau)

Refonte complète de la Bibliothèque symbolique : passer d'un ensemble de courtes définitions
(« la chouette représente la sagesse ») à une véritable bibliothèque de référence, qui explique
*pourquoi* une association existe, d'où elle vient, dans quels mythes elle apparaît, et jusqu'à
quel point elle est effectivement attestée dans l'Antiquité plutôt que reconstituée après coup.

**Audit préalable.** Les 90 fiches existantes ont d'abord été relues intégralement (icône,
libellé, catégorie, description courte, `lore`, liens vers les figures) avant toute
modification — rien n'a été supprimé ; le travail déjà validé (notamment les six paragraphes de
`lore` par fiche, écrits lors d'un round précédent) a été conservé tel quel et complété.

**Nouveau schéma de données**, ajouté à chaque entrée de `SYMBOL_LIBRARY` en plus des champs
existants (`icon`, `label`, `category`, `desc`, `links`, `lore`) :
- `atGlance` — synthèse immédiate (« en un coup d'œil »).
- `why` — explique l'origine de l'association plutôt que de se contenter de l'énoncer :
  propriété naturelle de l'objet/l'animal/la plante, rôle concret dans la société grecque,
  épithète homérique, usage rituel, etc.
- `deities: [{id, role, certainty}]` — les figures associées, chacune avec la nature précise du
  lien et un niveau de certitude explicite plutôt qu'une liste plate de noms. **Peut être
  vide** : quand aucune association divine clairement attestée n'existe, la fiche l'affiche
  honnêtement (« Aucune association divine clairement attestée n'a été identifiée pour ce
  symbole. ») plutôt que d'en inventer une pour remplir la section.
- `dimensions: [{axis, text}]` — les différents axes symboliques quand ils coexistent
  (vie/mort, protection/menace, sagesse/ruse...), pour éviter d'aplatir un symbole ambivalent
  en une seule signification.
- `iconography`, `cult`, `history` — trois champs optionnels, affichés en sections repliables,
  renseignés seulement quand la matière le justifie réellement (attribut dans l'art antique,
  monnaie, sanctuaire, rituel, sacrifice, évolution archaïque → classique → hellénistique →
  romaine).
- `sources` — bibliographie associée à la fiche (auteurs antiques en priorité, puis sources
  archéologiques/épigraphiques, puis académiques) ; jamais de référence inventée.
- `relatedSymbols` — renvois vers d'autres fiches symbole, pour que la bibliothèque forme un
  réseau (ex. Laurier → Apollon → Daphné → métamorphose → Delphes → Pythie → divination) plutôt
  qu'une collection de fiches isolées.

**Niveaux de certitude.** Cinq niveaux définis dans `SYMBOL_CERTAINTY_LABELS` et appliqués à
chaque association `deities[]` : *attesté* (directement documenté dans les sources antiques),
*fortement établi* (plusieurs sources convergentes), *interprétation* (plausible mais non
explicitement attestée), *tardif* (issu surtout d'une tradition postérieure) et *moderne*
(symbolique principalement contemporaine). Affichés discrètement en italique à côté de chaque
divinité associée, sans alourdir la lecture.

**Chevauchements résolus sans rien supprimer.** Trois paires de fiches proches ont été
différenciées plutôt que fusionnées, chacune avec un angle distinct et un renvoi croisé via
`relatedSymbols` : *torches* (rite collectif, cortèges d'Hécate et Déméter) / *torche*
(relais individuel, lampadédromies, feu de Prométhée) ; *blé* (plante cultivée, diffusion par
Triptolème) / *épis* (épis isolés, révélation silencieuse d'Éleusis) ; *olivier* (mythe
fondateur, concours avec Poséidon) / *olive* (fruit concret, huile, athlètes).

**Huit symboles manquants ajoutés**, identifiés comme des lacunes réelles pendant l'audit :
sanglier, égide, lance, fil, carrefour, source, ouroboros, fleur de narcisse — chacun avec le
schéma complet ci-dessus. Cas particulier de l'**ouroboros** : la fiche précise explicitement
qu'il ne s'agit *pas* d'un symbole de la mythologie grecque classique mais d'un motif attesté
d'abord en Égypte ancienne (dès le Nouvel Empire), repris seulement plus tard par l'alchimie
hellénistique d'Alexandrie — `deities` y est délibérément vide, sans association grecque
forcée, et la fiche a sa propre catégorie neuve, « Motifs & concepts ».

**Vigilance contre les généralisations non fondées.** Les affirmations du type « les Grecs
considéraient toujours X comme Y » ont été évitées ; quand une pratique est propre à un lieu,
une période ou un culte particulier (Delphes, l'Acropole, les Panathénées...), la fiche le
précise plutôt que de généraliser à « les Grecs » sans nuance.

**Interface.** Nouvel enchaînement de lecture sur `renderSymbolDetail()` : icône → titre →
description courte → « En un coup d'œil » → « Pourquoi ? » → « Dans la mythologie » →
« Divinités associées » (avec certitude) → dimensions symboliques → sections repliables
(Iconographie / Culte et religion / Histoire et évolution, chacune affichée seulement si
renseignée) → Sources → Figures associées (existant) → Symboles associés (nouveau, réseau).
Palette et typographie inchangées (marbre, bronze, Cinzel/Source Serif 4) ; nouvelles classes
CSS ajoutées sans toucher au reste de la feuille de style : `.symbol-glance`, `.symbol-why`,
`.symbol-deities`/`.symbol-deity`/`.symbol-certainty`, `.symbol-dimensions`, `details.symbol-more`
(sections repliables avec marqueur `▸`/`▾` personnalisé), `.symbol-sources`, `.chip-inactive`
(pour une association citée mais non encore documentée comme fiche, ex. Daphné, Pélops — un
chip visible mais non cliquable plutôt qu'un lien mort).

**Résultat : 98 symboles** (90 existants enrichis + 8 nouveaux), 274 figures inchangées. Testé
par un script dédié (`smoke_pantheon_symbols.js`, 24 vérifications : comptes globaux, structure
complète de chaque fiche, validité des niveaux de certitude, cohérence du réseau
`relatedSymbols`, différenciation des trois paires résolues, présence et rigueur documentaire
de l'ouroboros, rendu HTML de la fiche Chouette avec toutes les nouvelles sections, message
honnête d'absence d'association sur l'ouroboros, classes CSS, et intégrité totale des citations
sur l'ensemble du corpus — 0 résiduelle) + les neuf suites précédentes, remises au vert
(quelques décomptes obsolètes de « 90 symboles » mis à jour vers 98).
- `service-worker.js` : `pantheon-v9` → `pantheon-v10`.

## Lieux mythologiques (nouvel onglet — carte Leaflet et tuiles réelles)

Nouveau cinquième onglet, « Lieux » : une carte géographique réelle (Leaflet + tuiles
OpenStreetMap, chargées depuis cdnjs avec intégrité SRI) plutôt qu'une simple liste de noms —
chaque lieu correspond à un site réel, aux coordonnées géographiques véritables, auquel une
tradition antique attache un épisode mythologique précis.

**34 lieux curatés**, dans `MAP_PLACES` (`app.js`), volontairement pas un compte rond arbitraire :
sanctuaires (Delphes, Olympie, Éleusis, Dodone, Délos, Épidaure), montagnes (Olympe, Ida en
Crète, Parnasse, Hélicon), cités et palais (Athènes/Acropole, Mycènes, Thèbes, Troie, Sparte,
Argos, Corinthe, Cnossos, Aulis, Éphèse), îles (Ithaque, Naxos, Lemnos, Samothrace, Rhodes,
Samos), détroits et passages maritimes (Hellespont, détroit de Messine, Colonnes d'Héraclès,
Bosphore), sources et fleuves (Castalie, Alphée), entrées du monde souterrain (Nekromanteion de
l'Achéron, cap Ténare). Chaque entrée porte `id`, `name`, `category`, `coords` (latitude/
longitude réelles), `desc`, `lore[]` (récit sourcé, avec citations antiques précises — Homère,
Hésiode, Apollodore, Pindare, Hérodote, Pausanias, Euripide, Ovide, Plutarque...), `links[]`
(figures associées) et `symbolLinks[]` (symboles associés, réutilisant la Bibliothèque
symbolique). Volontairement exclus : les lieux à la géographie mythique trop incertaine pour une
carte sérieuse (Atlantide, Jardin des Hespérides) — jamais de géographie inventée pour remplir
une case.

**Écran carte** (`renderPlaces()`) : carte Leaflet avec marqueurs stylés (disque de couleur +
icône de catégorie, cohérent avec la palette marbre/bronze/laurier plutôt que les épingles
bleues par défaut), chips de filtre par catégorie qui font aussi office de légende, recherche en
direct, liste complète en dessous (jamais uniquement la carte, pour rester utilisable sans JS
cartographique ou hors-ligne). Cliquer un marqueur ouvre un popup (nom, description, bouton
« Voir la fiche ») ; cliquer une ligne de la liste ouvre directement la fiche.

**Fiche lieu** (`renderPlaceDetail()`) : badge de catégorie, description, mini-carte centrée sur
le lieu (`#placeDetailMap`), récit complet (citations inter-fiches actives via `linkifyLore()`,
comme partout ailleurs), figures associées et symboles associés en chips — filtrés pour ne
jamais pointer vers une fiche inexistante (ex. Pélops et Pégase, cités dans le récit d'Olympie
et de l'Hélicon mais pas encore des fiches figure à part entière : simplement absents des chips,
jamais un lien mort).

**Cycle de vie de la carte** : comme `#ftTree` pour l'arbre généalogique, `#placesMap` et
`#placeDetailMap` ne sont jamais le même nœud DOM d'un `render()` à l'autre — l'instance Leaflet
précédente est donc toujours détruite (`.remove()`) avant d'en recréer une neuve, jamais
empilée. Un seul écouteur de redimensionnement, posé une fois pour toutes, appelle
`invalidateSize()` sur la carte effectivement présente. Si Leaflet n'a pas pu se charger (hors
ligne au tout premier chargement, CDN inaccessible), le reste de l'écran — recherche, filtres,
liste, fiches — continue de fonctionner normalement ; seul le conteneur de carte garde son
message de repli « Chargement de la carte… ».

**Textes mis à jour** : les décomptes de `index.html` (balise `<meta description>`) et
`manifest.json`, restés à « 235 figures et 90 symboles » depuis avant le round généalogie et le
round symboles de cette session, corrigés vers les chiffres réels (274 figures, 98 symboles) et
complétés avec les 34 lieux.

Testé par un script dédié (`smoke_pantheon_places.js`, 27 vérifications : décompte et unicité
des lieux, structure complète de chaque entrée, cohérence des catégories avec
`MAP_CATEGORY_META`, validité des coordonnées, absence de lien mort vers un symbole, présence du
nouvel onglet et de la tuile d'accueil, rendu de l'écran Lieux et d'une fiche complète, gestion
propre d'un lien vers une figure pas encore documentée, message honnête pour un lieu inconnu,
navigation, classes CSS) + la suite complète des dix scripts précédents, remise au vert (un
décompte d'onglets du menu fixe mis à jour de 4 à 5). Vérifié aussi visuellement par capture
d'écran (liste complète, fiche détaillée, recherche et filtres actifs, repli propre sans
Leaflet) : aucune erreur JavaScript, dégradation transparente lorsque le CDN Leaflet n'est pas
joignable.
- `service-worker.js` : `pantheon-v10` → `pantheon-v11`.

## Premium (achat unique App Store) — architecture de sécurité

Préparation d'un modèle FREE / PREMIUM débloqué par un achat unique Apple (StoreKit, produit
non-consommable `premium_full_access`, 39,99 €, sans abonnement). Voir l'audit de sécurité livré
en même temps que ce chantier pour le détail complet (failles identifiées, corrections,
architecture cible) ; ce qui suit résume ce qui a été construit.

**Modèle d'accès aux données.** `FREE_FIGURE_IDS` / `FREE_SYMBOL_IDS` / `FREE_GENEALOGY_KEYS`
(app.js) : listes explicites et nommées — jamais un `array.slice(0, 5)` ni un `index < 5` —
déterminant les 5 figures (Zeus, Héra, Poséidon, Athéna, Apollon), 5 symboles (Chouette,
Laurier, Foudre, Serpent, Olivier) et 1 généalogie (Les douze Olympiens) qui restent gratuites.
Tout le reste est premium par défaut (liste positive : impossible d'oublier de verrouiller une
nouvelle fiche ajoutée plus tard). Les lieux (`MAP_PLACES`) restent hors périmètre — pas dans la
demande initiale — et intégralement gratuits.

**Séparation réelle du bundle** (`scripts/export-premium-content.js`, lancé une fois manuellement
— voir son en-tête pour la procédure et ses préconditions) : le récit complet des 269 figures et
93 symboles premium a été retiré d'`app.js` (qui ne garde plus qu'un aperçu : icône, libellé,
catégorie, courte description) et déplacé vers `api/_data/content.json`, un fichier privé jamais
servi publiquement (`vercel.json` limite explicitement les fonctions routables à
`api/verify-purchase.js`, `api/entitlement.js`, `api/apple-notifications.js` et `api/content.js`
— rien d'autre sous `api/` n'est une route). `app.js` est passé de 739 Ko à 175 Ko après ce
retrait. Un utilisateur qui inspecterait le bundle public ne peut donc plus extraire le contenu
premium complet, contrairement à une simple fiche masquée par CSS ou par un `if(!isPremium)`
côté client.

**Backend serverless** (`api/`, Vercel + base de données Neon Postgres) :
- `verify-purchase.js` — reçoit la transaction StoreKit signée par Apple, la vérifie réellement
  (`@apple/app-store-server-library`, chaîne de certificats jusqu'aux autorités racines Apple —
  jamais un JWS décodé « à la main »), rejette tout ce qui n'est pas exactement l'achat non-
  consommable `premium_full_access`, puis persiste l'entitlement en base (ancré sur
  l'`originalTransactionId`, l'identifiant Apple stable qui survit à un changement d'appareil ou
  une réinstallation).
- `entitlement.js` — lecture rapide du droit déjà persisté, sans re-vérifier la signature à
  chaque appel.
- `apple-notifications.js` — webhook App Store Server Notifications V2 : réagit à `REFUND`/
  `REVOKE` en marquant l'entitlement correspondant révoqué, jamais l'inverse.
- `content.js` — sert le contenu premium complet uniquement après vérification serveur du droit
  d'accès (jamais une confiance dans ce que le client affirme) ; le mode liste ne renvoie jamais
  le contenu complet, entitled ou non (anti-énumération : récupérer toute la bibliothèque
  demande un appel par fiche, ralenti par la limitation de débit de `_lib/rate-limit.js`).

**Frontend** : badge 🔒 sur les fiches premium dans les listes (cartes visibles, jamais masquées) ;
`renderPaywall()` affiché à la place d'une fiche premium (nom, aperçu, prix — actuellement un
espace réservé, 39,99 €, à remplacer par le prix localisé StoreKit une fois branché — boutons
« Débloquer Premium » et « Restaurer mon achat ») ; `isPremiumUnlocked()` renvoie
délibérément `false` tant que StoreKit n'est pas intégré côté app — jamais un localStorage ou un
booléen local présenté comme une preuve d'achat.

**Ce qui reste à faire, et pourquoi ça dépend d'un Mac** : StoreKit n'est accessible que depuis
du code natif ou hybride (Capacitor) — impossible depuis une PWA pure. Décisions prises avec
l'utilisatrice : envelopper l'app existante avec **Capacitor**, backend sur **Vercel serverless +
Neon Postgres** (ci-dessus). Restent à faire, sur un Mac avec Xcode (non disponible dans
l'environnement de développement de cette session) : générer le projet Xcode
(`npx cap add ios`), brancher un plugin StoreKit pour l'achat non-consommable, remplacer
`isPremiumUnlocked()` par un vrai appel à `/api/entitlement`, protection capture d'écran/
multitâche (API publiques Apple uniquement), configuration du produit dans App Store Connect.

Tests : `smoke_pantheon_access_model.js` (16 vérifications, modèle de données), `smoke_pantheon_
backend.js` (18 vérifications, logique des 4 endpoints avec base de données et vérification
Apple simulées), `smoke_pantheon_premium.js` (19 vérifications, séparation du bundle + paywall
côté client) — 53 nouvelles vérifications, toutes au vert, en plus des onze suites précédentes
(remises au vert : le paywall est contourné dans les tests qui vérifient le moteur de rendu de
l'arbre généalogique ou la structure d'une fiche, pas la frontière Premium elle-même — voir les
commentaires ajoutés dans ces fichiers).

## Préparation App Store — ce qui ne dépend pas d'un Mac

Suite du chantier Premium : tout ce qui peut être préparé sans Xcode, en attendant l'accès à un
Mac pour la partie native (Capacitor, StoreKit, protections capture d'écran/multitâche — voir le
rapport de sécurité).

- **`politique-confidentialite.html`** — nouvelle page, même sobriété que celle de
  Tarot-mythologie (décrit ce que fait l'app *aujourd'hui*, pas une promesse pour plus tard) :
  absence de compte/IA/tracker, explique honnêtement la seule vraie nouveauté du modèle
  Premium (l'identifiant de transaction Apple et le statut d'achat conservés en base pour
  reconnaître le Premium), et la purge automatique des IP de rate-limiting sous une heure.
  Deux champs `[placeholder]` (identité de l'exploitant, e-mail de contact) restent à compléter
  avant soumission. Liée depuis le paywall et le pied de page de l'accueil ; précachée par le
  service worker.
- **`APP_STORE_CONNECT.md`** — document de préparation complet : nom/sous-titre/description/
  mots-clés proposés, configuration du produit In-App Purchase (`premium_full_access`,
  Non-Consumable, 39,99 €), réponses proposées au questionnaire App Privacy (achats, non liés à
  l'identité), avertissement sur la classification par âge (thèmes mythologiques adultes),
  notes aux relecteurs Apple, checklist des Guidelines déjà respectées (jamais le mot
  « abonnement », restauration visible, politique de confidentialité accessible) et de celles à
  garder en tête pour la suite native (4.2, apps qui ne sont qu'un habillage web).
- **`icon-1024-appstore.png`** — icône carrée 1024×1024 sans coins arrondis ni canal alpha
  (contrairement à `icon.svg`/`icon-512.png`, pensés pour le web et donc arrondis) : Apple
  rejette une icône pré-arrondie ou transparente, l'OS applique lui-même l'arrondi à
  l'affichage. Régénérée à l'identique du design existant (fond `--laurel-deep`, Pi grec en
  `--bronze-light`) avec Pillow plutôt qu'un rasterizer SVG, absent de l'environnement.
- **`app-store-screenshots/`** — 12 captures (6 écrans × iPhone 6.9"/iPad 13"), prises depuis
  l'app web elle-même à la taille logique réelle des appareils (pas directement à la résolution
  du fichier exporté, qui laisserait presque tout l'écran vide) puis mises à l'échelle au
  facteur attendu. Une limite connue est documentée dans le README du dossier : la capture de la
  carte des lieux n'affiche pas les tuiles (CDN externe inaccessible depuis cet environnement de
  développement) et doit être reprise depuis un navigateur avec un accès Internet normal.
- **`api/cleanup-rate-limits.js`** — nouvelle fonction, déclenchée quotidiennement par un Cron
  Vercel (`vercel.json`), qui purge les lignes `rate_limits` de plus d'une heure : sans ça, les
  adresses IP utilisées pour la limitation de débit resteraient en base indéfiniment, ce que la
  politique de confidentialité promet désormais explicitement de ne pas faire.

Tests : nouveau `smoke_pantheon_appstore_prep.js` (21 vérifications), plus deux vérifications
ajoutées à `smoke_pantheon_backend.js` (purge protégée par secret) et `smoke_pantheon_premium.js`
(vercel.json à jour) — 74 vérifications au total pour ce round, en plus des quatorze suites
précédentes, toutes au vert. `service-worker.js` : `pantheon-v12` → `pantheon-v13`.

## Identité visuelle — illustrations dédiées (accueil et menu du bas)

Remplace les emoji de l'écran d'accueil et du menu du bas par des illustrations générées et
retravaillées pour l'occasion (fournies par l'utilisatrice, retouchées pour l'intégration) :

- **Bannière d'accueil** (`assets/hero-olympians.jpg`) : remplace le petit éclair (⚡) au-dessus
  du titre « Panthéon » par une fresque des douze Olympiens, légendée en français directement
  dans l'image (Hestia, Déméter, Héra, Zeus, Poséidon, Apollon, Artémis, Athéna, Arès,
  Aphrodite, Héphaïstos, Hermès). Rognée de ses marges blanches d'origine pour remplir
  pleinement son cadre.
- **Quatre badges de tuile et d'onglet** (`assets/badge-*.webp`, détourés en cercle, fond
  transparent) : un portrait pour « Figures mythologiques », une lyre pour « Bibliothèque
  symbolique », une mère et son enfant pour « Généalogie des dieux », une carte-médaillon de la
  Méditerranée (relief doré, couronne d'olivier) pour « Lieux mythologiques ». Chaque badge
  remplace à la fois l'emoji de la tuile d'accueil et celui de l'onglet correspondant dans le
  menu du bas.
- **Badge « Accueil »** (`badge-home-temple.webp`, un temple grec) remplace l'emoji 🏠 du menu
  du bas.

Les cinq badges sont exportés en WebP avec canal alpha (fond transparent, cercle détouré au plus
près du cadre doré déjà présent dans l'image) — environ 10 fois plus léger qu'un PNG équivalent
pour un rendu identique. La bannière, elle, n'a pas besoin de transparence et reste en JPEG. Poids
total des six fichiers : ~490 Ko. Les six sont précachés par le service worker (disponibles
hors-ligne dès la première visite).

Testé par un script dédié (`smoke_pantheon_illustrations.js`, 14 vérifications : présence et
poids raisonnable des fichiers, références correctes dans `app.js`, absence de tout résidu de
l'ancien `hero-mark`, rendu correct de la bannière et des quatre badges, précache du service
worker) + deux assertions obsolètes corrigées dans `smoke_pantheon_v2.js` (l'ancien test
cherchait l'emoji 🏠/🏛️ littéral dans le menu du bas). `service-worker.js` : `pantheon-v13` →
`pantheon-v14`.

**Mise à jour ultérieure — badge « Lieux »** : illustration fournie après coup (une carte de la
Méditerranée en médaillon doré), ajoutée à l'identique du même traitement (`badge-places-map.webp`,
512×512, WebP + alpha). Remplace l'emoji 🗺️ resté en place jusque-là sur la tuile d'accueil et
l'onglet du bas — l'onglet « Lieux » est donc maintenant illustré comme les quatre autres, et la
classe CSS `.tile-icon` (plus utilisée nulle part) a été retirée. `smoke_pantheon_illustrations.js`
mis à jour en conséquence. `service-worker.js` : `pantheon-v15` → `pantheon-v16`.

## Aperçu propriétaire — voir tout le Premium sans achat StoreKit réel

Besoin distinct du chantier Premium ci-dessus, volontairement tenu à l'écart de sa logique
d'achat : en attendant l'accès à un Mac (Capacitor, StoreKit — voir plus haut), l'utilisatrice
doit pouvoir continuer à relire l'intégralité du contenu Premium elle-même, sans qu'aucun achat
réel ne soit possible pour l'instant. Ce mécanisme est construit comme un deuxième chemin de
déverrouillage, séparé de `isPremiumUnlocked()` à chaque niveau (nommage, emplacement de la
vérification côté serveur, commentaires) — pour ne jamais confondre « la propriétaire prévisualise
son contenu » avec « un client a payé ».

**Fonctionnement.** Une variable d'environnement Vercel, `OWNER_PREVIEW_KEY` (voir
`.env.example`), connue de la seule propriétaire, contient une longue valeur aléatoire choisie
par elle. Ouvrir l'app une fois avec `?preview=<cette-valeur>` dans l'URL mémorise la clé en
`localStorage` puis nettoie l'URL ; chaque fiche premium consultée ensuite envoie cette clé en
en-tête `x-owner-preview-key` à `/api/content`, qui la compare à `OWNER_PREVIEW_KEY` **avant même
de toucher la base de données** — le mécanisme fonctionne donc dès maintenant, sans attendre que
Neon Postgres soit configuré. `app.js` (public) ne connaît et ne compare jamais la vraie valeur :
il se contente de renvoyer ce que l'URL contenait, exactement comme un mot de passe qu'on retape
sans jamais le vérifier soi-même. Une clé absente ou refusée par le serveur retombe proprement
sur le paywall habituel — jamais un contenu à moitié affiché. La généalogie premium (dont les
données de parenté n'ont jamais quitté `app.js`, seul le récit détaillé des fiches a été exporté)
se débloque localement, sans appel réseau.

`isPremiumUnlocked()` reste inchangée et continue de renvoyer honnêtement `false` : l'aperçu
propriétaire ne l'affecte jamais, il ouvre un second chemin d'accès au contenu, il ne simule
jamais un achat.

Tests : `smoke_pantheon_owner_preview.js` (12 vérifications : capture et mémorisation de la clé
d'URL, `isPremiumUnlocked()` toujours honnêtement `false` même aperçu actif, état de chargement
puis contenu complet une fois `/api/content` répondu, en-tête envoyé correctement, repli sur le
paywall pour une clé refusée, généalogie débloquée sans appel réseau, absence de la valeur
secrète dans `app.js`). `service-worker.js` : `pantheon-v14` → `pantheon-v15`.

**Action requise, une seule fois, côté tableau de bord Vercel** : ajouter la variable
d'environnement `OWNER_PREVIEW_KEY` (Production) — la création par CLI a été bloquée pour cette
session. Voir `.env.example` pour le format attendu.

## Identité visuelle — illustrations de symboles (Abeille, Aigle)

Même principe que les badges de tuile/onglet ci-dessus, mais appliqué cette fois à deux entrées
de la Bibliothèque symbolique plutôt qu'à la navigation principale : `SYMBOL_ILLUSTRATIONS`
(`app.js`), une table `id → chemin d'asset` calquée sur `DEITY_PORTRAITS`, remplace l'emoji 🐝/🦅
par une illustration dédiée (fournie par l'utilisatrice) partout où ce symbole apparaît — icône
géante de sa propre fiche détail (`detailHeadingImageHTML()`, factorisée pour être partagée par
`renderSymbolDetail()`, `renderPaywall()` et `renderOwnerPreviewLoading()`, ces deux derniers déjà
premium pour l'Abeille et l'Aigle) et vignette dans les chips « Symboles associés » partout
ailleurs (`symbolChipIconHTML()`, pendant symbolique de `genealogyPortraitHTML()`). Un symbole
absent de la table retombe simplement sur son emoji d'origine, sans rien casser — la liste
grandira au fil des illustrations fournies.

**Retouche d'image nécessaire pour l'aigle.** L'illustration de l'abeille arrivait déjà avec un
vrai canal alpha (fond transparent). Celle de l'aigle, elle, avait son damier de transparence
aplati en pixels RGB opaques (aucun canal alpha) — reconstruit par un script dédié
(`scratchpad`, jamais commité) : détection du damier par saturation quasi nulle (`R≈G≈B`, teintes
claires) plutôt que par une couleur fixe, ne retenant que les régions connectées au bord de
l'image (`scipy.ndimage.label`) pour ne jamais toucher aux zones grisâtres internes du plumage,
légère dilatation du masque de fond puis flou gaussien pour manger le liseré anti-aliasé restant.
Les deux images sont ensuite recadrées au plus près du sujet, réduites à 520px sur leur plus
grand côté et exportées en WebP avec canal alpha (`assets/symbol-abeille.webp`,
`assets/symbol-aigle.webp`, ~100 Ko et ~62 Ko) — même format et même philosophie de poids que les
badges existants, adaptée ici à des illustrations isolées (pas de recadrage circulaire : `contain`
plutôt que `cover`, pour ne jamais rogner les ailes déployées).

Nouvelles classes CSS : `.symbol-illustration-big` (en-tête de fiche détail, `max-width: 220px`,
`drop-shadow` plutôt qu'un cadre puisque le fond est déjà transparent) et `.chip-symbol-icon`
(vignette 20×20 dans les chips). Les deux fichiers sont précachés par le service worker.

Testé par un script dédié (`scratchpad`, 18 vérifications : présence et poids raisonnable des deux
fichiers, références correctes dans `app.js` et `styles.css`, précache et version du service
worker, syntaxe JS valide) et vérifié visuellement par captures d'écran Playwright (fiche
« Abeille », fiche « Aigle », chip illustrée « Aigle » sur la fiche « Foudre »). `service-worker.js` :
`pantheon-v16` → `pantheon-v17`.

## Aperçu propriétaire — repli sûr, et deuxième point d'entrée pour l'écran d'accueil iOS

Signalement de l'utilisatrice : l'aperçu propriétaire (voir plus haut) fonctionnait de nouveau
après avoir rouvert `?preview=<clé>` dans Safari — mais restait bloqué sur le paywall dès
qu'elle ouvrait l'icône ajoutée à son écran d'accueil, alors même que celle-ci venait d'être
réinstallée. Deux problèmes distincts, l'un déjà corrigé en creusant le premier signalement, le
second propre à iOS :

- **Repli sûr côté serveur et client** (déjà en place avant ce round) : `api/content.js`
  renvoie désormais `{ locked: true }` plutôt qu'une erreur 500 brute quand la vérification
  échoue (ex. `DATABASE_URL` absente), et `fetchOwnerPreviewContent()` exige explicitement
  `{ locked: false, content }` avant d'afficher quoi que ce soit — toute réponse ambiguë retombe
  sur le paywall plutôt que d'être prise à tort pour un déverrouillage.
- **La vraie cause du blocage sur l'écran d'accueil** : une app ajoutée à l'écran d'accueil iOS
  (mode standalone) s'exécute dans un contexte de stockage **totalement séparé** de Safari — son
  propre `localStorage`, indépendant de celui du navigateur, même s'il s'agit exactement de la
  même origine. Elle s'ouvre en plus toujours sur le `start_url` fixe de `manifest.json` (`./`,
  sans paramètre), jamais sur l'URL affichée au moment de l'ajout à l'écran d'accueil : `?preview=`
  n'a donc structurellement aucun moyen d'atteindre ce contexte-là, quelle que soit la manière
  dont l'icône a été (ré)installée.

**Deuxième point d'entrée, indépendant de l'URL** (`promptOwnerPreviewKey()`) : un bouton
« Propriétaire : entrer la clé d'aperçu » sur l'écran paywall (`data-action="owner-preview"`,
même style discret que « Restaurer mon achat ») ouvre une invite native (`window.prompt()`,
fonctionne aussi bien en standalone que dans Safari) pré-remplie avec la clé déjà mémorisée s'il
y en a une, et l'enregistre dans le `localStorage` du contexte courant — exactement le même
effet que le paramètre d'URL, à faire une fois par contexte de stockage (une fois dans Safari,
une fois sur l'écran d'accueil, une fois par appareil si plusieurs sont utilisés). Une valeur
vide efface la clé mémorisée plutôt que d'enregistrer une chaîne vide.

Vérifié avec un script Playwright dédié (`scratchpad`) : clic sur le bouton, saisie simulée dans
l'invite, clé effectivement posée en `localStorage`. Vérifié aussi visuellement par capture
d'écran (bouton bien visible sur le paywall, entre « Restaurer mon achat » et le texte légal).

**Rappel important pour l'utilisatrice** : c'est bien un mécanisme *par contexte de stockage*,
pas par appareil — Safari et l'icône d'écran d'accueil sur le même iPhone comptent comme deux
contextes distincts, chacun nécessitant sa propre saisie une fois.

## Round « backlog nocturne » — symboles, généalogie, lieux, accueil

Long round mené de façon autonome sur une liste de retours envoyée d'un coup par l'utilisatrice
avant de se coucher (« relance tout ce que je t'ai demandé »). Sept chantiers distincts.

**Bibliothèque symbolique — retrait et dé-répétition.** Les quatre enseignes du Tarot Marseille
(bâton, coupe, épée, denier) — vestiges de la séparation d'avec Tarot-mythologie, sans rapport
avec la mythologie grecque — retirées de `SYMBOL_LIBRARY` et de `content.json` : 98 → 94
symboles. Signalement séparé : plusieurs fiches répétaient la même information deux ou trois
fois entre `atGlance`, `why` et `lore` (l'exemple donné, Aurore, répétait « aux doigts de rose »
trois fois) — un script de détection (n-grammes de 5 mots partagés entre champs d'une même
fiche, `scratchpad`, jamais commité) a fait ressortir 22 fiches nettement au-dessus du reste
(crocus, rose, aurore, pavot, abeille, feu, graine, torche, eau, éclipse, monde souterrain,
myrte, noix, temple, sceptre, voile, poisson, lierre, olive, lune, char solaire, arc-en-ciel) :
chacune retouchée à la main pour ne garder l'information qu'une fois, sans rien retirer au fond
(la phrase la plus vivante reste dans `atGlance`, le paragraphe de `lore` qui la répétait
verbatim est coupé ou recentré sur ce qu'il ajoutait de propre). Au passage, un bug de données
corrigé : `relatedSymbols` de l'abeille se citait elle-même.

**Vingt-six nouvelles illustrations détourées.** Même mécanisme que les badges/Abeille/Aigle
précédents, appliqué à dix-huit symboles (ailes, air, araignée, arc, arc-en-ciel, aurore,
balance, bélier, blé, caducée, carrefour, cerf, chaîne, char, char solaire, chemin, chêne,
cheval — `SYMBOL_ILLUSTRATIONS`), sept icônes de catégorie de la carte (sanctuaire, montagne,
cité, île, détroit/mers, source, monde souterrain — nouvelle table `MAP_CATEGORY_ILLUSTRATIONS`
+ helper `mapCategoryIconHTML()`, remplace l'emoji dans le marqueur Leaflet, les filtres, les
lignes de liste et le badge de fiche lieu), et un rameau d'olivier sous le slogan d'accueil.
Détourage par un script générique (`scratchpad`, jamais commité) plutôt que par la méthode
ad hoc de l'Aigle : palette des teintes du pourtour de l'image (dédupliquées après
quantification, pas seulement les plus fréquentes — un damier de transparence anti-aliasé forme
un dégradé continu entre ses deux teintes, un simple « top-k » laissait des trous non couverts),
recherche du plus proche voisin (`scipy.spatial.cKDTree`) plutôt qu'une distance à quelques
couleurs fixes, ne retenant que les régions connectées au bord de l'image. Un second garde-fou
ajouté en cours de route : exiger en plus une neutralité de teinte (R≈G≈B) avant d'effacer,
sans quoi un sujet peu saturé (la main enchaînée, peau et or ternes) se faisait effacer aux
trois quarts, sa luminosité étant proche de celle du damier malgré une teinte bien différente.

**Généalogie — un vrai défaut de conception corrigé partout.** Signalement : « tu aurais pu
mettre Persée à côté d'Andromède directement, pour pas avoir à remettre Andromède ». En cause,
`ftPersonBranchHTML()` : une figure avec une seule union était systématiquement dessinée deux
fois de suite (une fois seule comme « hub », une fois de plus à côté de son conjoint juste en
dessous) — un choix pertinent seulement quand il faut départager *plusieurs* conjoints (Zeus).
Corrigé pour ne garder le hub séparé qu'à partir de deux unions ; avec une seule, le couple
devient directement la branche. Comme cette fonction sert toutes les fiches familiales, le
correctif s'applique partout, pas seulement à Andromède (vérifié aussi sur Zeus : le cas
multi-union reste identique).

**Trois écrans de généalogie reconstruits, cinq points de départ réécrits en explication
globale.** « Il ne faut pas faire un focus sur un seul [...] Actuellement focus sur Chaos,
Ouranos, Persée, Priam, etc. » :
- **Les douze Titans** (`renderTitansOverview()`) : Ouranos et Gaïa en tête, leurs douze
  enfants (`TITAN_IDS`, vérifiés contre `GENEALOGY_PARENTS`) en rangée — même moteur que l'écran
  des Olympiens, remplace l'ancien focus sur Ouranos seul.
- **Les douze Olympiens** : Héphaïstos (enfant d'Héra seule) et Dionysos (avec Zeus et Sémélé)
  ajoutés au diagramme, qui ne montrait jusque-là que dix des douze. Les cartes des douze
  Olympiens (`OLYMPIAN_IDS`) ressortent désormais en teinte laurier distincte partout où elles
  apparaissent dans un arbre (`ftCardMarkup()`), pas seulement sur cet écran — demande explicite
  d'une couleur différente pour les repérer d'un coup d'œil.
- **La lignée de Persée** (`renderPerseeLineage()`) : nouvel écran par défaut dessiné à la main
  d'après le croquis fourni — Zeus/Danaé d'un côté, Cassiopée de l'autre, convergeant directement
  vers le couple Persée/Andromède et leurs sept enfants, sans jamais dessiner Persée ou Andromède
  deux fois (réutilise `ftAncestorBranchHTML()` pour faire pointer chaque ascendance vers la
  carte réelle du couple). Cliquer sur un nom retombe sur sa fiche familiale complète, toujours
  déroulable plus loin, comme demandé.
- **Origines du monde, cycle thébain, guerre de Troie, Atrides, famille d'Ulysse**
  (`renderGenealogyOverview()` + table `GENEALOGY_OVERVIEWS`) : un texte de deux à trois
  paragraphes qui raconte toute la lignée plutôt qu'une fiche centrée sur une seule figure
  (Chaos, Cadmos, Priam, Agamemnon, Ulysse), suivi de chips vers chaque figure citée pour
  continuer à explorer — chacune ouvre sa propre fiche familiale complète, comme avant. Textes
  liés via `linkifyLore()`, comme partout ailleurs dans l'appli.
- Les huit tuiles de l'écran d'accueil de la généalogie portent désormais les sous-titres exacts
  fournis par l'utilisatrice (« Découvrez la naissance du monde et des premières puissances »,
  etc.), remplaçant les anciens sous-titres qui nommaient une seule figure (« Ouranos, Gaïa et
  toute leur descendance »).

**Lieux — tuiles en graphie latine, deux lieux ajoutés.** La carte OpenStreetMap standard
affiche chaque lieu dans sa langue locale — en grec ici, illisible sans le connaître. Passage
aux tuiles Wikimedia « osm-intl » (`mapTileLayer()`, factorisé entre la carte principale et la
mini-carte de fiche lieu), qui appliquent une transcription internationale proche de l'anglais
(« Athens », « Delphi »...) sans nécessiter de clé d'API — une vraie traduction française des
libellés natifs demanderait un service payant (MapTiler et consorts) non configuré ici, mais au
moins la carte devient lisible sans connaître le grec. Deux lieux ajoutés à `MAP_PLACES` (34 →
36) : **Carthage** (fondation de Didon, où elle aima puis perdit Énée) et **Lavinium** (la cité
que fonde Énée en Italie après son départ de Carthage, berceau légendaire de Rome).

**Écran d'accueil.** Nouveau slogan sous le titre (« Apprends la mythologie grecque à travers
ses dieux, héros et symboles. ») avec un rameau d'olivier illustré juste en dessous. « Figure du
jour » renommée « À découvrir aujourd'hui » ; son portrait agrandi (72×90 → 112×140) ; quelques
étoiles scintillantes ajoutées en surimpression de la carte (`fotdStarsHTML()`, positions et
durées pseudo-aléatoires mais déterministes, `prefers-reduced-motion` respecté). Les quatre
tuiles de l'accueil portent désormais, sous leur décompte, la phrase descriptive exacte fournie
par l'utilisatrice (nouvelle classe `.tile-desc`).

Testé par un script dédié (`scratchpad`, 89 vérifications : décomptes 94 symboles/36 lieux,
absence des quatre enseignes tarot partout, non-répétition de l'épithète d'Aurore, existence de
tous les nouveaux fichiers d'assets référencés, structure des huit points de départ de
généalogie, présence des nouvelles fonctions et du correctif de dédoublonnage, version et
contenu du service worker, nouveaux textes d'accueil) et vérifié visuellement par captures
d'écran Playwright sur chaque écran touché (accueil, bibliothèque symbolique — dont un symbole
premium pour confirmer l'illustration sur l'écran payant —, les huit écrans de généalogie,
recherche et fiche « Carthage »). `service-worker.js` : `pantheon-v17` → `pantheon-v18`.

## Quatre retours du lendemain matin

Retours de l'utilisatrice après avoir essayé le round précédent en conditions réelles.

**« Figure du jour » : image coupée.** Le portrait s'affichait à côté du texte dans un cadre
fixe 112×140 en `object-fit: cover` — correct pour un portrait individuel, mais un portrait
« large » (`DEITY_PORTRAIT_WIDE`, une scène de groupe comme le jugement de Pâris, tombé
justement le jour du signalement) se faisait rogner par ce cadre étroit, parfois au point de
couper une des figures de la scène. Corrigé sur les deux points signalés : l'image passe
au-dessus du texte (`.fotd-card` en colonne plutôt qu'en ligne) et en `object-fit: contain`
plutôt que `cover`, pour ne plus jamais rogner quoi que ce soit, quel que soit le format
d'origine de l'image.

**Généalogie : les portraits chevauchaient les lignes.** Cause réelle : `.ft-couple` centrait
verticalement les deux cartes d'un mariage (`align-items: center`) — sans conséquence quand les
deux ont la même hauteur, mais quand une seule des deux a un portrait (donc une carte plus
haute), la ligne de mariage, calculée au milieu de la zone de recouvrement des deux cartes (voir
`drawFamTree()`), retombait alors en plein milieu du portrait plutôt qu'au niveau des noms.
Corrigé en alignant les cartes sur leur bas (`align-items: flex-end`) plutôt que sur leur
centre : les deux noms partagent désormais la même ligne de base, le portrait s'élève simplement
au-dessus, et la ligne de mariage retombe naturellement au niveau des textes. Comme `.ft-couple`
est une classe partagée par tous les arbres, le correctif s'applique partout d'un coup — vérifié
sur les douze Olympiens (Zeus/Héra) et la lignée de Persée (Persée/Andromède).

**La carte ne se chargeait plus.** Cause : le passage aux tuiles Wikimedia « osm-intl » du round
précédent, censé afficher les lieux en graphie latine plutôt qu'en grec, renvoie en réalité une
erreur 403 dès qu'on l'interroge depuis un domaine tiers — Wikimedia réserve ce service aux
domaines Wikimedia eux-mêmes, ce qui n'était pas apparu lors du test initial. Une seconde
alternative essayée avant de trancher, CARTO Voyager, affiche elle aussi des libellés en
graphie latine mais exige désormais une clé d'API sur ses tuiles gratuites (filigrane « API KEY
REQUIRED » sans elle). Aucune tuile multilingue gratuite et sans clé n'existe donc actuellement ;
retour aux tuiles OpenStreetMap standard (`mapTileLayer()`), le seul choix fiable et gratuit
vérifié à l'usage — les lieux de l'appli elle-même (marqueurs, popups, liste, fiches) restent de
toute façon intégralement en français, seuls les libellés génériques du fond de carte
(pays, grandes villes) redeviennent en grec.

**Cinq illustrations de symboles réutilisées depuis les icônes de carte.** Demande explicite :
« monde souterrain = enfers », c'est-à-dire réutiliser telles quelles les illustrations déjà
fournies pour les icônes de catégorie de la carte, plutôt que d'en redemander de nouvelles, pour
les symboles qui désignent le même sujet. Cinq correspondances directes ajoutées à
`SYMBOL_ILLUSTRATIONS` : sanctuaire → temple, montagne → montagne, détroit/mers → mer, source →
source, monde souterrain → monde souterrain — aucun nouveau détourage nécessaire, les fichiers
`map-icon-*.webp` existaient déjà, seulement cinq nouvelles entrées de table (20 → 25
illustrations de symboles au total).

Testé par un script dédié (`scratchpad`, 17 vérifications) + la suite de la veille remise à jour
et repassée au vert (99 vérifications, décompte des illustrations 20 → 25, tuiles de carte
osm-intl → OSM standard). Vérifié aussi visuellement par captures d'écran Playwright : la fiche
« Enfer / monde souterrain » affiche bien le château illustré, l'arbre des douze Olympiens et
celui de la lignée de Persée n'ont plus de ligne traversant un portrait, la figure du jour
(tombée sur Pâris) affiche l'intégralité de la scène du jugement au-dessus du texte.
`service-worker.js` : `pantheon-v18` → `pantheon-v19`.

## Incohérence « ailes », audit complet des divinités associées, second bouton retour

Signalement précis : la fiche « Ailes » évoque Niké, Éros et Hermès dans son texte
(desc/atGlance/lore), mais sa section « Divinités associées » ne listait plus que Hermès, Éros
et Dédale — Niké, pourtant citée en premier, avait disparu de la liste. Corrigée directement,
puis demande explicite d'étendre la vérification à toute la bibliothèque : « Fais un point sur
toutes les fiches pour bien vérifier que chaque divinité citée dans le texte se retrouve bien en
divinité associée. »

Un script d'audit (`scratchpad`) fusionne, pour chacun des 94 symboles, le texte (`desc` +
`atGlance` + `why` + les phrases de `lore` contenant « associé·e(s) ») et détecte tout nom de
figure connue (présente dans `DEITY_NOTES`) qui apparaît dans ce texte sans figurer dans le
tableau `deities` de la fiche. Premier passage : 47 fiches signalées. Chacune relue
individuellement plutôt que corrigée mécaniquement — un nom cité en exemple secondaire, en
contraste (« contrairement à Hermès... ») ou dans un mythe d'une fiche voisine ne justifie pas
un ajout, contrairement à un nom présenté comme un rôle propre au symbole ou explicitement
inclus dans sa phrase de clôture « associé(e) à ». Résultat : 29 fiches complétées (dont
« Ailes » + Icare, « Pomme » + Pâris — cité dans le titre même de sa description et pourtant
absent —, « Sanglier » + Adonis, « Narcisse (fleur) » + Déméter/Gaïa/Hadès/Zeus, le mythe fondateur
complet de la fleur) et une coquille corrigée dans « Chaîne », dont la phrase de clôture citait
« Pan » — jamais mentionné ailleurs dans la fiche — alors que le texte ne parle que de Prométhée
et d'Andromède. 17 signalements restants examinés et volontairement laissés en l'état : noms
cités en repoussoir ou en alternative (le pont « plutôt que » Charon/Hermès/Iris), exemples
incidents d'une liste plus large (les Danaïdes parmi « Tantale, Sisyphe... »), ou faux positifs
du détecteur de noms (« harmonie » employé comme nom commun, pas comme la déesse Harmonie).

Deux autres demandes traitées dans la foulée :

- **Second bouton « ← Retour » en bas de fiche.** Jusqu'ici, seul le haut de chaque fiche
  (figure, symbole, lieu) portait un bouton retour — sur une fiche longue, il fallait remonter
  tout en haut pour revenir en arrière. Nouvelle fonction partagée `backButtonFooterHTML()`,
  ajoutée en fin d'`<article>` dans les trois fonctions de rendu détail ; même comportement
  (`data-nav="back"`), capté par la délégation d'événements déjà en place — aucune logique de
  navigation nouvelle.
- **Suppression des mentions de certitude.** Chaque divinité associée affichait un texte en
  italique du type « attesté par les sources antiques », « interprétation », etc.
  (`SYMBOL_CERTAINTY_LABELS`). Jugé superflu et surchargeant la fiche sans réel intérêt pour la
  lecture : constante et rendu retirés (le champ `certainty` reste dans les données, simplement
  plus affiché).

Testé par un script dédié (`scratchpad`, 17 vérifications : boutons retour présents dans les
trois fonctions de rendu détail, constante et classe de certitude bien supprimées, Niké/Icare
présents dans « ailes », coquille « Chaîne » corrigée, échantillon des nouvelles associations) +
la suite de la veille remise à jour et repassée au vert (99 vérifications). Vérifié aussi
visuellement par captures d'écran Playwright sur une fiche symbole premium (« Ailes », avec
clé d'aperçu propriétaire) et une fiche figure gratuite (« Zeus ») : les deux boutons retour
s'affichent bien, en haut et en bas, aucun texte de certitude résiduel.
`service-worker.js` : `pantheon-v19` → `pantheon-v20`.

## Étoiles à 6 branches autour du titre, tuiles d'accueil sans compteurs

Deux retours sur l'écran d'accueil :

- **Étoiles.** Les petites étoiles rondes scintillant en fond de la carte « À découvrir
  aujourd'hui » (`fotdStarsHTML`, dispersées aléatoirement derrière le portrait) ne
  plaisaient pas. Retirées, et remplacées par une demande précise : des étoiles à 6 branches
  scintillantes de part et d'autre du titre « Panthéon », 3 de chaque côté. Nouvelle fonction
  `heroStarsHTML(side)`, un seul tracé SVG partagé (`HERO_STAR_PATH`, un dodécagone à rayons
  alternés — la forme classique de l'étincelle à 6 pointes) rejoué à des tailles, délais et
  durées pseudo-aléatoires mais déterministes (`HERO_STAR_SEEDS`), pour un scintillement qui
  ne se resynchronise jamais tout à fait. `<h1>` passe en flex pour aligner les deux groupes
  d'étoiles et le texte sur une même ligne.
- **Tuiles d'accueil.** Les compteurs (« 210 fiches », « 94 lieux »... `tile-count`)
  disparaissent des quatre tuiles, au profit du seul texte descriptif déjà présent
  (`tile-desc`, donné plus tôt dans le projet), qui perd son italique et prend la couleur
  terracotta (`--terracotta`, nouvelle variable) pour rester visible à la place du chiffre
  retiré.

Testé par un script dédié (`scratchpad`, 16 vérifications) + la suite complète de la veille
remise à jour et repassée au vert (99 + 17 vérifications). Vérifié aussi visuellement par
capture d'écran Playwright de l'écran d'accueil : les deux groupes de 3 étoiles encadrent bien
« Panthéon », les quatre tuiles n'affichent plus aucun chiffre, le texte descriptif est en
terracotta.
`service-worker.js` : `pantheon-v20` → `pantheon-v21`.

## Fusion "Figures associées" / "Divinités associées" sur les fiches symbole

Constat : sur la plupart des fiches symbole, la section « Figures associées » (chips simples,
issus de `s.links`) et « Divinités associées » (chips + rôle, issus de `s.deities`) affichaient
la même liste de noms sous deux formes différentes — un doublon pur sur 33 des 94 fiches
(`links` strictement égal à l'ensemble des `deities`), et un sous-ensemble sur 83 d'entre elles.

Fusionnées en une seule section, « Divinités associées » : nouvelle fonction
`mergedSymbolDeities(s)`, qui part de `s.deities` (avec leur rôle) et n'y ajoute que les
figures de `s.links` qui n'y figurent pas déjà, sous forme de chip sans texte de rôle
(`symbolDeitiesHTML` n'affiche plus la ligne de rôle quand elle est vide). Sur les 11 fiches où
`links` contenait un nom absent de `deities` (torche/hécate+déméter, laurier/éros, blé/perséphone,
air/borée+zéphyr...), ce nom rejoint désormais la liste unique plutôt que de doubler
l'information ailleurs. L'appel `relatedChipsHTML(related, "deity")` disparaît de
`renderSymbolDetail` (la fonction reste utilisée telle quelle pour "Symboles associés" et sur
les fiches figure/lieu).

Au passage, une coquille restée après la correction précédente : `chaîne.links` citait encore
« Pan » (déjà corrigé dans le texte de la fiche, mais pas dans ce champ séparé) — remplacé par
Andromède, la seconde figure réellement présente dans cette fiche.

Testé par un script dédié (`scratchpad`, 7 vérifications) + la suite complète remise à jour et
repassée au vert (99 + 17 + 16 vérifications). Vérifié aussi visuellement par capture d'écran
Playwright sur une fiche à recouvrement exact (« Chouette » : une seule section, un seul chip
Athéna) et une fiche avec noms supplémentaires (« Torche » : Prométhée/Héphaïstos/Athéna avec
rôle, Hécate/Déméter en simples chips, aucune section « Figures associées » séparée).
`service-worker.js` : `pantheon-v21` → `pantheon-v22`.

## Mode sombre, recherche unifiée, récemment consulté, recherche généalogie

Quatre des pistes d'amélioration proposées à l'utilisatrice (voir l'analyse globale de
l'application), validées telles quelles — la cinquième, un mode quiz, est explicitement
reportée à plus tard (« il faut déjà que je fasse les quiz »).

- **Mode sombre.** Tout `styles.css` n'utilisant que des variables CSS (aucune couleur en
  dur ailleurs qu'en `:root`), un bloc `@media (prefers-color-scheme: dark)` qui les redéfinit
  suffit à basculer l'appli entière : même palette marbre/laurier/bronze, inversée plutôt que
  vers un noir pur. `index.html` gagne deux balises `theme-color` (une par préférence système)
  pour que la barre du navigateur suive. Seule exception : les tuiles de carte OpenStreetMap,
  des images claires servies telles quelles (pas de variante sombre gratuite disponible, voir
  le round précédent sur la carte) — un filtre CSS (`invert(1) hue-rotate(180deg)`) appliqué
  uniquement à `.leaflet-tile-pane` (jamais aux marqueurs ni aux popups, qui suivent déjà les
  variables) les fait rentrer dans la palette sombre.
- **Recherche unifiée sur l'accueil.** Jusqu'ici, chercher un nom obligeait à deviner dans
  quelle section chercher (figures / symboles / lieux, chacune avec son propre champ).
  Nouveau champ `#homeSearch` sur l'écran d'accueil, qui interroge les trois listes à la fois
  (`renderHomeSearchResults`) et regroupe les résultats sous trois petits titres (Figures /
  Symboles / Lieux), en réutilisant telles quelles les lignes de résultat déjà existantes
  (`figureRowHTML`/`symbolRowHTML`/`placeRowHTML` — même style, même pastille 🔒 pour le
  contenu premium).
- **Récemment consulté.** Chaque visite d'une fiche (figure, symbole ou lieu) est
  discrètement enregistrée dans `localStorage` (`recordRecentlyViewed`, 8 entrées max, la plus
  récente en tête) et affichée sur l'accueil sous forme d'une rangée de cartes défilable
  (masquée tant qu'aucune fiche n'a été visitée). Les données affichées sont résolues à chaque
  rendu depuis les tables actuelles plutôt que mémorisées au moment de la visite, pour qu'un
  contenu retiré depuis disparaisse simplement de la liste au lieu de planter.
- **Recherche directe en généalogie.** Jusqu'ici, on ne pouvait entrer dans un arbre que par
  les 8 points de départ fixes (Origines, Titans, Olympiens...). Nouveau champ de recherche
  sur l'écran d'accueil de la généalogie, qui renvoie directement vers l'arbre de la figure
  choisie (même écran que le lien « Voir dans l'arbre généalogique » de chaque fiche figure).

**Bug trouvé et corrigé en cours de route** : les deux nouvelles recherches plafonnaient leurs
résultats (5 ou 8 lignes) après un simple filtre par sous-chaîne sur nom + note — sur une
recherche comme « Persée », les entrées alphabétiquement antérieures qui ne font que le
*mentionner* dans leur note (ses nombreux ancêtres et descendants : Acrisios, Alcée,
Andromède...) remplissaient le plafond avant même d'atteindre « Persée » lui-même, qui
disparaissait purement et simplement des résultats. Corrigé par un classement
(`searchRank`/`rankedSearch`) : nom identique à la requête d'abord, puis nom qui commence par
elle, puis nom qui la contient, puis note qui la contient seulement en dernier recours —
appliqué aux deux nouvelles recherches (accueil et généalogie).

Testé par un script dédié (`scratchpad`, 23 vérifications) + la suite complète remise à jour et
repassée au vert (99 + 17 + 16 + 7 vérifications). Vérifié aussi visuellement par capture
d'écran Playwright : accueil en clair et en sombre, recherche « zeus » (Zeus en tête des
figures, plus symboles et lieux liés), recherche généalogie « persée » (Persée en tête, clic
qui atterrit bien sur son arbre), carte des lieux en mode sombre.
`service-worker.js` : `pantheon-v22` → `pantheon-v23`.
