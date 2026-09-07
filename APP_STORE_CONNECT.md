# Préparation App Store Connect — Panthéon

Ce document rassemble tout ce qui peut être préparé **sans Mac ni Xcode** : les textes, choix de
configuration et informations que tu recopieras dans App Store Connect une fois le projet natif
(Capacitor) construit sur un Mac. Rien ici n'engage définitivement — App Store Connect permet de
modifier la plupart de ces champs à tout moment avant et après publication.

## 1. Informations générales de l'app

| Champ | Valeur proposée |
|---|---|
| Nom (30 caractères max) | **Panthéon** |
| Sous-titre (30 caractères max) | **Mythologie grecque** |
| Bundle ID | `com.<tondomaine>.pantheon` — à choisir, doit être unique, ne change plus jamais après création. Doit correspondre à `APPLE_BUNDLE_ID` (voir `.env.example`) et à la config Capacitor. |
| SKU (interne, jamais visible publiquement) | `pantheon-mythologie` |
| Catégorie principale | Référence (Reference) |
| Catégorie secondaire | Éducation |
| Copyright | `<année> <ton nom ou ta structure>` |

## 2. Description et mots-clés (à affiner, base de départ)

**Texte promotionnel** (170 caractères, modifiable sans nouvelle version) :
> 274 figures, 98 symboles et 34 lieux réels de la mythologie grecque, avec leurs récits, leurs
> liens croisés et une carte interactive.

**Description** (4000 caractères max — voici un point de départ à enrichir) :
> Panthéon est une bibliothèque de référence sur la mythologie grecque : dieux, héros, créatures
> et figures secondaires, symboles chargés de sens, lieux réels où se sont ancrés les mythes, et
> les liens de parenté qui les unissent sur plusieurs générations.
>
> — 274 figures mythologiques, chacune avec son récit complet et ses liens vers les personnages
> qui l'entourent.
> — 98 symboles (animaux, plantes, objets, astres...) expliqués en profondeur : pourquoi telle
> association existe, ce qu'elle signifie, dans quels mythes elle apparaît.
> — 34 lieux réels (sanctuaires, montagnes, cités, îles...) sur une carte interactive, chacun relié
> à un épisode mythologique précis.
> — Un arbre généalogique interactif pour explorer les liens de parenté entre les dieux, des
> origines du monde jusqu'aux héros.
>
> Les 5 premières figures, 5 premiers symboles et la généalogie des douze Olympiens sont
> entièrement gratuits. Le reste de la bibliothèque se débloque avec un unique achat, sans
> abonnement ni renouvellement automatique.

**Mots-clés** (100 caractères max, séparés par des virgules, jamais de nom de marque déposée) :
> mythologie,grecque,dieux,zeus,olympe,héros,mythes,antiquité,grèce,symboles

**URL support** : `https://pantheon-mythologie.vercel.app` (ou un domaine personnalisé si tu en as
un) — Apple exige une page joignable, même simple.
**URL marketing** : idem, optionnel.
**URL politique de confidentialité** : `https://pantheon-mythologie.vercel.app/politique-confidentialite.html`
— à mettre à jour dans ce fichier même (remplacer les deux `[placeholders]`) avant soumission.

## 3. Configuration du produit In-App Purchase

App Store Connect → ton app → **Monetization → In-App Purchases → +**

| Champ | Valeur |
|---|---|
| Type | **Non-Consumable** (pas Auto-Renewable Subscription, pas Consumable) |
| Reference Name (interne) | Accès Premium complet |
| Product ID | `premium_full_access` — **doit correspondre exactement** à `PREMIUM_PRODUCT_ID` dans `api/_lib/apple.js` |
| Prix | Choisir le palier le plus proche de **39,99 €** (App Store Connect affiche directement les montants dans chaque devise) |
| Nom affiché (localisation FR) | Accès Premium |
| Description (localisation FR) | Débloque l'intégralité de la bibliothèque : toutes les figures, tous les symboles et toutes les généalogies, définitivement. |
| Capture d'écran de review | Une capture du paywall (voir dossier `app-store-screenshots/`, ou en refaire une une fois l'app native buildée) — **obligatoire**, Apple rejette sinon la soumission de l'IAP. |

Une fois créé, ce produit doit être **soumis avec la première version de l'app** (les IAP ne
peuvent pas être review-és seuls avant qu'une version d'app existe).

## 4. App Privacy (questionnaire de confidentialité)

App Store Connect → ton app → **App Privacy**. Réponds en te basant sur `politique-confidentialite.html`,
qui doit rester la source de vérité. Proposition de réponses selon ce que fait le code aujourd'hui :

| Type de donnée | Collectée ? | Liée à l'identité ? | Utilisée pour le suivi (tracking) ? |
|---|---|---|---|
| Achats (Purchases) | Oui — l'identifiant de transaction Apple et le statut d'achat, persistés dans la base pour reconnaître le Premium | **Non liée** à l'identité (aucun nom, e-mail, ni identifiant de compte associé) | Non |
| Tout autre type (contacts, localisation, contenu utilisateur, identifiants publicitaires, diagnostics...) | Non | — | — |

Cette table reflète l'architecture actuelle (voir `api/_lib/db.js`) — si tu ajoutes un jour des
comptes, des statistiques d'usage ou un SDK tiers, ces réponses (et la politique de
confidentialité) devront être mises à jour **avant** la nouvelle soumission.

## 5. Classification par âge (Age Rating)

Le questionnaire d'App Store Connect a été refondu (International Age Rating Coalition) : réponds-y
toi-même plutôt que de te fier à une estimation figée ici, mais garde en tête que le corpus
mythologique aborde des thèmes adultes classiques (violence guerrière, morts, enlèvements,
unions contraintes comme celles de Perséphone ou d'Europe) présentés en contexte historique et
littéraire, sans image ni description graphique — le champ le plus probable à cocher est
« Fantasy Violence » ou « Mature/Suggestive Themes » à un niveau modéré, ce qui correspond en
général à un classement **12+**. Vérifie chaque question du questionnaire avec ce contexte en
tête plutôt que de cocher « aucun contenu sensible » par défaut.

## 6. Notes aux relecteurs Apple (App Review Information)

À coller dans le champ « Notes » lors de la soumission :

> Panthéon ne demande aucun compte ni connexion. Les 5 premières figures, 5 premiers symboles et
> la généalogie des douze Olympiens sont entièrement gratuits et explorables sans achat. Le reste
> de la bibliothèque se débloque via l'achat non-consommable « Accès Premium » (premium_full_access),
> un achat unique sans abonnement. Un bouton « Restaurer mon achat » est disponible sur l'écran de
> paywall pour retrouver l'accès après une réinstallation ou sur un nouvel appareil. Aucun identifiant
> de connexion n'est nécessaire pour tester l'app ou l'achat (un identifiant Apple de bac à sable
> suffit).

Pas de compte de démonstration à fournir : il n'en existe pas.

## 7. Points de vigilance Guidelines App Store (déjà respectés dans le code actuel)

- **3.1.1 (In-App Purchase)** : achat non-consommable correctement typé côté StoreKit (une fois
  branché), prix affiché avant achat, aucun moyen de paiement externe proposé.
- **Jamais le mot « abonnement »** dans les textes visibles : le paywall dit explicitement « achat
  unique... sans abonnement ni renouvellement automatique ».
- **Restauration d'achat visible et fonctionnelle** : bouton présent sur le paywall (la vraie
  logique StoreKit reste à brancher, voir le rapport de sécurité).
- **Politique de confidentialité accessible depuis l'app** (paywall + accueil) et son URL doit
  aussi être renseignée dans les métadonnées App Store Connect (champ dédié), pas seulement dans
  l'app.
- **Guideline 4.2 (Minimum Functionality)** : Apple examine avec attention les apps qui ne sont
  qu'un simple habillage d'un site web. Une intégration StoreKit native réelle, une navigation
  qui ne ressemble pas à un navigateur, et l'usage d'au moins quelques capacités natives
  (idéalement la protection multitâche/capture d'écran prévue dans le rapport de sécurité) aident
  à démontrer qu'il ne s'agit pas d'un simple wrapper — à garder en tête pour la suite du
  développement natif.

## 8. Reste à faire (nécessite un Mac/Xcode — voir le rapport de sécurité)

Ce document couvre uniquement la préparation textuelle et de configuration. La création réelle du
produit IAP (§3), sa capture d'écran de review, et la soumission elle-même ne peuvent se faire
qu'une fois l'app buildée et un compte développeur Apple actif — mais tous les champs ci-dessus
peuvent être préparés, discutés et affinés dès maintenant.
