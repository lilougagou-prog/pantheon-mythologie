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
