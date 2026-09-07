/* =====================================================================================
   PANTHÉON — Apprendre la mythologie grecque
   =====================================================================================
   Application sœur de l'appli Tarot (delphes) : née de la séparation du contenu
   mythologique (figures + symboles) hors de l'onglet « Apprendre » du Tarot, pour devenir
   sa propre expérience dédiée, centrée sur l'exploration du panthéon grec et — bientôt —
   sa généalogie.

   235 figures mythologiques et 90 symboles, portés tels quels depuis Tarot-mythologie
   (mêmes textes, mêmes portraits, même mécanisme de citations croisées). Contrairement à
   l'appli Tarot, qui ne garde localement que les 78 figures directement incarnées par une
   carte, Panthéon conserve l'intégralité du corpus : c'est la vraie encyclopédie complète.
   ===================================================================================== */

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

const SYMBOL_LIBRARY = {
  // Lieux & passages
  "porte":{icon:"🚪",label:"Porte",category:"Lieux & passages",desc:"Seuil, choix à faire, passage d'un état à un autre.",links:[],lore:[
    "Dans la mythologie grecque, les portes ne sont jamais anodines : elles séparent deux mondes et marquent le moment où un choix devient irréversible.",
    "Homère décrit dans l'Odyssée deux portes du sommeil, l'une de corne, l'autre d'ivoire : les rêves qui passent par la porte de corne se réalisent, ceux qui passent par la porte d'ivoire ne sont que des illusions trompeuses. Franchir une porte n'est donc jamais un geste neutre — encore faut-il savoir laquelle on choisit.",
    "La porte la plus chargée de sens de toute l'Iliade est sans doute la porte Scée de Troie : c'est là qu'Hector fait ses adieux à Andromaque avant son dernier combat contre Achille, et c'est par elle que le vieux roi Priam sortira plus tard, seul et sans escorte, supplier le meurtrier de son fils de lui rendre son corps (voir les fiches « Hector », « Andromaque » et « Priam »).",
    "Les portes des Enfers, elles, gardées par Cerbère, ne se franchissent que dans un sens pour les mortels ordinaires : entrer y est possible, en ressortir exige une faveur exceptionnelle.",
    "La porte est ainsi devenue un symbole de seuil, de choix décisif, de passage d'un état à un autre et de ce qui sépare l'illusion de la vérité.",
  ]},
  "chemin":{icon:"🛤",label:"Chemin",category:"Lieux & passages",desc:"Évolution en cours, quête, direction prise plutôt qu'imposée.",links:[],lore:[
    "Le chemin est l'un des symboles les plus anciens du choix humain, et la mythologie grecque en a fait une véritable scène philosophique.",
    "Selon un récit rapporté par le sophiste Prodicos, le jeune Héraclès, arrivé à un carrefour, vit apparaître deux figures : la Vertu, qui lui promettait une vie difficile mais glorieuse, et le Vice, qui lui promettait une vie facile mais sans grandeur. Héraclès dut choisir sa route avant même d'avoir accompli le moindre exploit.",
    "Le chemin que suivit Thésée (voir la fiche « Thésée ») pour rejoindre Athènes illustre la même idée sous un tout autre angle : plutôt que la route maritime, plus sûre, le jeune héros choisit délibérément la voie terrestre, infestée de brigands, et les vainquit un à un en chemin — Périphétès, Sinis, Sciron, Cercyon, Procruste — arrivant à la cour de son père déjà couvert de gloire, avant même d'y être reconnu.",
    "Le chemin qu'on choisit à ce carrefour engage tout ce qui suivra — non pas un simple décor, mais une direction qui façonne le reste de l'histoire.",
    "Le chemin est devenu un symbole de choix, de direction assumée, de quête et d'évolution en cours plutôt qu'imposée.",
  ]},
  "pont":{icon:"🌉",label:"Pont",category:"Lieux & passages",desc:"Transition, lien construit entre deux états qui semblaient séparés.",links:[],lore:[
    "Le pont est un symbole plus discret dans la mythologie grecque que la porte ou le chemin : les récits antiques franchissent plus souvent les frontières par un passeur (Charon sur le Styx) ou par les airs (Hermès, Iris) que par une construction humaine.",
    "C'est peut-être ce qui rend le pont particulier : contrairement au passeur qu'il faut payer ou au messager qu'il faut attendre, le pont est un lien qu'on peut bâtir soi-même entre deux rives qui semblaient séparées pour toujours.",
    "La tradition en offre malgré tout un exemple concret et rituel : lors de la procession sacrée qui menait chaque année les futurs initiés d'Athènes à Éleusis pour les Mystères, un homme masqué, posté sur le pont franchissant le Céphise, couvrait les passants de moqueries et d'insultes — un rite appelé les gephyrismoi (« railleries du pont »), comme si le pont exigeait qu'on y dépose son orgueil avant d'accéder au sacré.",
    "Il est ainsi devenu un symbole de transition choisie, de lien construit et de réconciliation entre deux états qui semblaient incompatibles.",
  ]},
  "grotte":{icon:"🕳",label:"Grotte",category:"Lieux & passages",desc:"Inconscient, retrait nécessaire, initiation loin du regard des autres.",links:["rhéa"],lore:[
    "La grotte occupe une place à part dans la mythologie grecque : c'est un lieu caché, à l'écart du regard des dieux comme des hommes, où peuvent se produire des événements décisifs.",
    "Le mythe le plus célèbre est celui de la naissance de Zeus lui-même : pour le soustraire à son père Cronos, qui dévorait ses enfants, sa mère Rhéa (voir la fiche « Rhéa ») le cacha dans une grotte du mont Ida, en Crète, où il fut élevé en secret jusqu'à pouvoir renverser son père.",
    "Les grottes abritent aussi des figures oraculaires, comme celle de Trophonios, où l'on descendait consulter un oracle si redoutable que ceux qui en ressortaient étaient dits ne plus jamais sourire.",
    "Homère en décrit une autre, plus paisible, dans l'Odyssée : la grotte des Nymphes sur l'île d'Ithaque, où les marins déposaient leurs offrandes. Elle possédait deux entrées, l'une réservée aux mortels, l'autre — tournée vers le nord — réservée aux seuls dieux, preuve qu'un même lieu caché peut ouvrir sur deux mondes selon la porte qu'on choisit d'emprunter.",
    "La grotte est devenue un symbole de retrait nécessaire, d'initiation loin du regard des autres et de protection avant de pouvoir affronter le monde.",
  ]},
  "montagne":{icon:"⛰",label:"Montagne",category:"Lieux & passages",desc:"Épreuve, élévation progressive, objectif qui se mérite.",links:[],lore:[
    "La montagne la plus importante de la mythologie grecque est bien sûr l'Olympe, demeure des dieux, si haute que son sommet touchait, croyait-on, le domaine céleste lui-même.",
    "Le mont Parnasse, non loin de Delphes, était quant à lui consacré à Apollon et aux Muses : c'est sur ses pentes que résonnait l'inspiration poétique et prophétique.",
    "Gravir une montagne dans l'imaginaire grec n'est donc jamais seulement un effort physique : c'est se rapprocher d'un savoir ou d'une présence qui ne se donne pas au niveau du sol.",
    "Le mont Pélion, en Thessalie, complète ce paysage sacré d'une autre manière : loin du faste de l'Olympe, c'est sur ses pentes boisées que le centaure Chiron éleva et forma les plus grands héros grecs — Achille, Jason, Asclépios — preuve qu'une montagne n'élève pas seulement vers les dieux, elle peut aussi façonner, à l'écart du monde, ceux qui deviendront des légendes.",
    "La montagne est devenue un symbole d'épreuve, d'élévation progressive et d'objectif qui se mérite à chaque pas.",
  ]},
  "forêt":{icon:"🌲",label:"Forêt",category:"Lieux & passages",desc:"Inconnu, instinct, risque de s'égarer avant de retrouver son chemin.",links:[],lore:[
    "La forêt appartient au domaine d'Artémis, déesse de la chasse et des espaces sauvages, qui y règne avec ses nymphes loin des cités et de leurs lois.",
    "C'est aussi le territoire de Pan, dieu à moitié bouc, dont la présence dans les bois profonds pouvait saisir le voyageur d'une terreur soudaine et irraisonnée — la « panique » lui doit d'ailleurs son nom.",
    "La forêt grecque n'est donc pas un simple décor : c'est un lieu où les repères de la civilisation s'effacent, où l'instinct reprend le dessus sur la raison.",
    "C'est aussi dans une forêt, celle du mont Érymanthe, qu'Héraclès dut traquer le sanglier monstrueux qui ravageait la région lors de son quatrième travail — une poursuite qui l'entraîna loin des sentiers connus, dans la neige et les broussailles, avant qu'il ne parvienne à capturer la bête vivante.",
    "Elle est devenue un symbole d'inconnu, d'instinct, de risque de s'égarer avant de retrouver son chemin — et de nature qui échappe à tout contrôle.",
  ]},
  "mer":{icon:"🌊",label:"Mer",category:"Lieux & passages",desc:"Inconscient, immensité, départ vers un ailleurs incertain.",links:["poséidon","nérée","ulysse"],lore:[
    "La mer appartient avant tout à Poséidon, dieu des océans et des tremblements de terre, dont l'humeur changeante pouvait aussi bien porter les navires que les briser.",
    "Elle abrite aussi des figures plus anciennes et plus paisibles, comme Nérée, le « Vieillard de la mer », doué de sagesse et de don de prophétie, père des cinquante Néréides.",
    "La mer réunit ainsi deux visages : la puissance instable de Poséidon et la sagesse discrète de Nérée — la même immensité peut engloutir ou révéler.",
    "Elle abrite aussi des dangers d'une tout autre nature : les Sirènes, dont le chant était si envoûtant qu'aucun marin ne pouvait y résister sans se jeter par-dessus bord, guettaient les navires près de leur île. Ulysse n'y échappa qu'en se faisant attacher au mât pendant que ses compagnons, les oreilles bouchées de cire, ramaient sans rien entendre.",
    "Elle est devenue un symbole d'inconscient, d'immensité, de départ vers un ailleurs incertain et de puissance qu'on ne maîtrise jamais complètement.",
    "La mer est particulièrement associée à Poséidon, à Nérée et à Ulysse.",
  ]},
  "rivière":{icon:"🏞",label:"Rivière",category:"Lieux & passages",desc:"Passage, changement continu, ce qui circule sans jamais s'arrêter.",links:[],lore:[
    "Les fleuves occupent une place à part dans la mythologie grecque : ce sont des divinités à part entière, et certains d'entre eux marquent la frontière entre le monde des vivants et celui des morts.",
    "Le Styx, fleuve des Enfers, est si sacré que les dieux eux-mêmes prêtaient sur ses eaux leurs serments les plus solennels — un serment fait sur le Styx ne pouvait jamais être rompu. Le Léthé, lui, faisait oublier aux âmes leur vie passée à celles qui buvaient de ses eaux avant de renaître.",
    "C'est aussi dans les eaux du Styx que Thétis plongea son fils Achille encore nourrisson, pour le rendre invulnérable — le tenant par le talon, seul point de son corps que le fleuve ne put jamais atteindre, et qui devait plus tard causer sa mort.",
    "Une rivière, dans cet imaginaire, n'est donc jamais un simple obstacle : elle engage, elle efface, elle fait passer d'un état à un autre sans retour possible.",
    "La rivière est devenue un symbole de passage, de changement continu et de ce qui circule sans jamais s'arrêter — parfois au prix d'un serment ou d'un oubli.",
  ]},
  "temple":{icon:"🏛",label:"Temple",category:"Lieux & passages",desc:"Connaissance sacrée, initiation, seuil entre le profane et le sacré.",links:[],lore:[
    "Le temple est le lieu où le sacré se rend accessible aux mortels, sans jamais leur appartenir tout à fait.",
    "Le plus célèbre d'entre eux est sans doute le temple d'Apollon à Delphes, où la Pythie, assise sur son trépied, rendait des oracles réputés infaillibles — et où était gravée la maxime « Connais-toi toi-même ».",
    "Franchir le seuil d'un temple, c'était donc quitter le monde profane pour entrer dans un espace où la parole divine pouvait se faire entendre, à condition de savoir l'écouter.",
    "Le temple d'Artémis à Éphèse comptait, lui, parmi les Sept Merveilles du monde antique : reconstruit plusieurs fois après avoir été détruit, notamment par un incendie volontaire resté tristement célèbre, il attirait des pèlerins de toute l'Asie Mineure — preuve qu'un temple, une fois consacré, peut renaître de ses propres cendres aussi souvent qu'il le faut.",
    "Le temple est devenu un symbole de savoir sacré, d'initiation et de seuil entre le monde profane et ce qui le dépasse.",
  ]},
  "monde souterrain":{icon:"⚱",label:"Enfer / monde souterrain",category:"Lieux & passages",desc:"Transformation profonde, mort symbolique, vérité qui ne peut plus rester cachée.",links:["hadès","perséphone","orphée"],lore:[
    "Le monde souterrain est le royaume d'Hadès, frère de Zeus et de Poséidon, qui en hérita lors du partage du cosmos entre les trois dieux.",
    "Perséphone y règne à ses côtés une partie de l'année, après avoir été enlevée par Hadès et liée aux Enfers pour avoir mangé quelques grains de grenade (voir la fiche « Grenade »). Son passage entre les deux mondes rythme les saisons.",
    "Contrairement à une idée reçue, ce monde souterrain n'est pas un lieu de punition pour tous : c'est avant tout le domaine de ce qui a été transformé, de ce qui ne peut plus revenir en arrière — un passage plus qu'un châtiment.",
    "Trois juges y président le sort de chaque âme : Minos (voir la fiche « Minos »), Rhadamanthe et Éaque, tous trois anciens rois mortels choisis pour leur réputation de justice absolue de leur vivant — preuve que même aux Enfers, le jugement reste une affaire humaine avant d'être divine.",
    "Rares sont les vivants qui y sont descendus puis en sont ressortis : Orphée fut de ceux-là, sa lyre à la main, venu réclamer Eurydice à Hadès et Perséphone eux-mêmes (voir la fiche « Orphée ») — la preuve que ce royaume peut, à de très rares exceptions, entendre une supplique vivante.",
    "Il est devenu un symbole de transformation profonde, de mort symbolique et de vérité qui ne peut plus rester cachée une fois qu'on y est descendu.",
    "Le monde souterrain est particulièrement associé à Hadès et à Perséphone — et, par sa propre descente, à Orphée.",
  ]},
  "labyrinthe":{icon:"🌀",label:"Labyrinthe",category:"Lieux & passages",desc:"Épreuve complexe, chemin qui s'égare avant de se retrouver — à condition d'avoir un fil à suivre.",links:["minos","ariane","dédale","thésée"],lore:[
    "Le labyrinthe fut construit en Crète par l'architecte Dédale (voir la fiche « Dédale »), sur l'ordre du roi Minos (voir la fiche « Minos »), pour y enfermer le Minotaure : une créature à tête de taureau et corps d'homme, née de l'union contre nature de la reine Pasiphaé (voir la fiche « Pasiphaé ») et d'un taureau envoyé par Poséidon.",
    "Chaque année, Athènes devait envoyer sept jeunes gens et sept jeunes filles en offrande au monstre, jusqu'à ce que le héros Thésée se porte volontaire pour l'affronter (voir la fiche « Thésée »). Ariane, fille de Minos, tomba amoureuse de lui et lui offrit un fil à dérouler en avançant, afin de pouvoir retrouver la sortie une fois le Minotaure vaincu (voir la fiche « Ariane »).",
    "Thésée tua le monstre au cœur du dédale et en ressortit en suivant le fil à rebours — mais le labyrinthe garda une dernière victime : son propre architecte. Dédale, enfermé par Minos avec son fils Icare pour avoir aidé Ariane, ne put s'en échapper qu'en fabriquant des ailes de plumes et de cire, un vol dont Icare, monté trop près du soleil, ne revint jamais.",
    "Le labyrinthe est ainsi devenu un symbole d'épreuve complexe, de chemin qui s'égare avant de se retrouver, de piège qu'on peut créer soi-même sans pouvoir toujours s'en libérer, et de guidage indispensable — le fil — pour traverser ce qu'on ne peut affronter seul.",
    "Le labyrinthe est particulièrement associé à Minos, à Ariane et à Dédale, son architecte.",
  ]},

  // Mythologie — attributs et divinités
  "caducée":{icon:"⚕",label:"Caducée",category:"Mythologie",desc:"Attribut d'Hermès : médiation, circulation, communication entre des mondes séparés.",links:["hermès","cadmos","harmonie"],lore:[
    "Le caducée est le bâton d'Hermès, reconnaissable à ses deux serpents entrelacés et à ses ailes.",
    "Hermès est le messager des dieux. Il circule constamment entre les différents mondes : Olympe, monde humain et monde souterrain.",
    "Son bâton correspond donc parfaitement à sa fonction : il accompagne celui qui franchit les frontières et transporte les messages d'un monde à l'autre.",
    "Une tradition antique raconte même comment les deux serpents en vinrent à s'y enrouler : Hermès, tombant sur deux serpents en plein combat, aurait jeté son bâton entre eux pour les séparer — au lieu de continuer à se battre, les deux animaux s'enroulèrent alors autour du bois, changeant l'affrontement en une figure d'équilibre parfait.",
    "Ce même motif de deux serpents unis plutôt qu'ennemis se retrouve, de façon frappante, dans un tout autre mythe : devenus vieux, Cadmos et son épouse Harmonie furent changés ensemble en serpents et menés côte à côte vers les Champs Élysées plutôt que vers une fin funeste (voir les fiches « Cadmos » et « Harmonie »). Rien ne prouve que les Anciens aient eux-mêmes établi ce rapprochement entre les deux récits, mais certains y voient un écho : les deux serpents du caducée pourraient être lus, par extension poétique, comme le souvenir de ce couple réconcilié jusque dans la métamorphose.",
    "Le caducée est ainsi devenu un symbole de médiation, de communication, de circulation, de commerce, de passage et de lien entre les mondes.",
    "Le caducée est particulièrement associé à Hermès — et, par ce rapprochement plus tardif entre ses deux serpents, à Cadmos et Harmonie.",
    "Le caducée d'Hermès ne doit pas être confondu avec le bâton d'Asclépios, qui ne possède qu'un seul serpent et qui est le véritable symbole traditionnel de la médecine.",
  ]},
  "chouette":{icon:"🦉",label:"Chouette",category:"Mythologie",desc:"Attribut d'Athéna : sagesse, observation, vision claire dans l'obscurité.",links:["athéna"],lore:[
    "La chouette accompagne Athéna et devient l'un des animaux les plus immédiatement reconnaissables de la déesse.",
    "Les Grecs lui attribuaient une capacité à voir dans l'obscurité. Cette particularité en faisait une image naturelle de la clairvoyance : là où les autres ne voient rien, la chouette voit.",
    "Elle correspond donc parfaitement à Athéna, dont la sagesse consiste non seulement à accumuler des connaissances, mais surtout à observer, comprendre et discerner avant d'agir.",
    "Homère donne d'ailleurs à Athéna l'épithète de « Glaukôpis », qu'on traduit par « aux yeux pers » ou « au regard de chouette » — un lien si ancien entre la déesse et l'oiseau qu'il remonte peut-être à des cultes antérieurs à l'époque classique. Les Athéniens frappèrent plus tard leur monnaie d'argent, la fameuse tétradrachme, à l'effigie de la chouette : une pièce si répandue dans tout le bassin méditerranéen qu'on la surnommait simplement « la chouette ».",
    "La chouette est devenue un symbole de sagesse, d'observation, de discernement, de connaissance et de clairvoyance.",
    "La chouette est particulièrement associée à Athéna.",
  ]},
  "paon":{icon:"🦚",label:"Paon",category:"Mythologie",desc:"Attribut d'Héra : beauté, vigilance, souveraineté légitime.",links:["héra"],lore:[
    "Le paon est devenu l'un des animaux emblématiques d'Héra.",
    "Selon le récit le plus célèbre, Héra plaça les nombreux yeux d'Argos Panoptès, son fidèle gardien, sur la queue du paon après la mort de celui-ci. Les motifs en forme d'yeux devinrent ainsi le souvenir éternel d'Argos.",
    "Argos Panoptès, « celui qui voit tout », devait son nom à son corps couvert de cent yeux, dont une partie restait toujours éveillée pendant que les autres dormaient. Héra l'avait chargé de surveiller Io (voir la fiche « Io »), une jeune femme aimée de Zeus qu'elle avait changée en génisse par jalousie — c'est en la délivrant de cette garde, sur ordre de Zeus, qu'Hermès endormit puis tua Argos, avant qu'Héra ne recueille ses cent yeux sur la queue de son oiseau favori.",
    "Le paon semble donc toujours regarder autour de lui. Son plumage magnifique rappelle également le rang d'Héra, reine des dieux, déesse du mariage et de la souveraineté.",
    "Le paon est devenu un symbole de beauté, de vigilance, de dignité, de souveraineté et de regard protecteur.",
    "Le paon est particulièrement associé à Héra.",
  ]},
  "foudre":{icon:"⚡",label:"Foudre",category:"Mythologie",desc:"Attribut de Zeus : autorité, révélation soudaine, jugement qui s'impose de lui-même.",links:["zeus"],lore:[
    "La foudre est l'arme et l'emblème de Zeus.",
    "Après avoir vaincu les Titans, Zeus reçoit des Cyclopes la foudre comme arme divine. Elle devient ensuite l'instrument grâce auquel il impose son autorité et punit ceux qui défient l'ordre des dieux.",
    "Mais la foudre possède également une dimension de révélation : elle surgit brutalement dans le ciel et transforme la nuit en un éclair de lumière.",
    "Zeus l'utilisa un jour malgré lui contre celle qu'il aimait : Sémélé, désireuse de voir son amant divin sous sa forme véritable, l'exigea de lui — et fut instantanément réduite en cendres par l'éclat de la foudre, que nul mortel ne peut contempler sans en mourir (voir la fiche « Sémélé »).",
    "Elle est donc devenue un symbole de puissance divine, d'autorité, de révélation soudaine, de destruction et de transformation brutale.",
    "La foudre est particulièrement associée à Zeus.",
  ]},
  "trident":{icon:"🔱",label:"Trident",category:"Mythologie",desc:"Attribut de Poséidon : puissance sur les forces naturelles instables — mer, séismes, émotions profondes.",links:["poséidon"],lore:[
    "Le trident est l'attribut le plus reconnaissable de Poséidon.",
    "Le dieu de la mer le porte comme une arme et comme un instrument de domination sur les forces naturelles. Avec lui, il peut agiter la mer et provoquer les tremblements de terre.",
    "Le trident possède donc trois pointes comme si le pouvoir du dieu se déployait dans plusieurs directions à la fois, mais sa signification fondamentale reste celle de la puissance de Poséidon sur les éléments.",
    "Pendant la Gigantomachie, la guerre entre les dieux et les Géants, Poséidon aurait poursuivi le géant Polybotès à travers la mer Égée et, d'un coup de trident, arraché un morceau de l'île de Cos qu'il lui lança dessus — le fragment, retombé dans la mer, serait devenu l'île de Nisyros, écrasant le géant dessous pour l'éternité.",
    "Il est devenu un symbole de puissance, de maîtrise des forces naturelles, de mer, de profondeur et de force indomptable.",
    "Le trident est particulièrement associé à Poséidon.",
  ]},
  "lyre":{icon:"🎵",label:"Lyre",category:"Mythologie",desc:"Attribut d'Apollon : harmonie, vérité transmise par la beauté plutôt qu'imposée.",links:["apollon","orphée"],lore:[
    "La lyre est l'instrument d'Apollon, dieu de la musique, de la poésie et de la lumière — mais elle ne fut pas inventée par lui.",
    "Selon le mythe, c'est Hermès, encore enfant, qui façonna la première lyre à partir d'une carapace de tortue et de cordes tendues, avant de l'offrir à Apollon en échange du troupeau de bœufs qu'il lui avait dérobé. L'instrument de la beauté naît ainsi d'un geste de ruse réparé par un cadeau.",
    "Entre les mains d'Apollon, la lyre devient l'instrument d'une vérité qui persuade par l'harmonie plutôt que par la force — à l'opposé de l'arc, autre attribut du dieu, qui frappe à distance.",
    "C'est aussi une lyre, offerte par Apollon lui-même, qu'Orphée emporta jusqu'aux Enfers pour tenter de ramener son épouse Eurydice parmi les vivants : son chant, dit-on, faisait taire jusqu'aux tourments des damnés et adoucissait le cœur inflexible d'Hadès — la preuve que cet instrument peut atteindre ce que ni la force ni la prière ordinaire ne peuvent obtenir.",
    "La lyre est devenue un symbole d'harmonie, d'inspiration et de vérité transmise par la beauté plutôt qu'imposée.",
    "La lyre est particulièrement associée à Apollon et à Orphée.",
  ]},
  "arc":{icon:"🏹",label:"Arc",category:"Mythologie",desc:"Attribut d'Artémis la chasseresse et d'Éros : intention, concentration, désir qui vise juste sans toujours consulter la raison.",links:["artémis","éros"],lore:[
    "L'arc est l'instrument du chasseur : il permet d'atteindre sa cible à distance.",
    "Il est particulièrement associé à Artémis, déesse de la chasse et des espaces sauvages. Dans l'Hymne homérique qui lui est consacré, elle est explicitement décrite comme une chasseuse qui porte son arc et ses flèches.",
    "Son arc représente donc une puissance maîtrisée : la chasse n'est pas un geste désordonné, mais une concentration de l'attention sur une cible.",
    "L'arc d'Ulysse, dans l'Odyssée, illustre à lui seul cette maîtrise : à son retour, aucun des prétendants venus envahir son palais ne parvient même à le bander, tant sa tension exige une force et une habileté hors du commun — seul Ulysse, révélant enfin sa véritable identité, réussit à la fois à le tendre et à tirer une flèche à travers douze anneaux alignés, avant de se retourner contre les prétendants eux-mêmes.",
    "L'arc est devenu un symbole de volonté, d'intention, de concentration, de maîtrise de soi et de désir dirigé vers un objectif.",
    "L'arc est particulièrement associé à Artémis, mais également à Apollon et à Éros : trois façons différentes de viser juste.",
  ]},
  "torches":{icon:"🔥",label:"Torches",category:"Mythologie",desc:"Attribut d'Hécate : illumination, guidance dans l'obscurité sans jamais imposer le chemin.",links:["hécate","hyménée"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "Les torches accompagnent aussi un tout autre passage : lors des mariages grecs, un cortège nocturne conduisait la mariée jusqu'à la maison de son époux à la lueur de flambeaux, sous la protection d'Hyménée, dieu du mariage — la même lumière qui aide à chercher ce qui est perdu sert alors à célébrer ce qui vient de commencer.",
    "Les torches sont donc devenues un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "Les torches sont particulièrement associées à Hécate et, dans le mythe de Perséphone, à Déméter — et, lors des noces, à Hyménée.",
  ]},
  "vigne":{icon:"🍇",label:"Vigne",category:"Mythologie",desc:"Attribut de Dionysos : plaisir, transformation, abondance instinctive.",links:["dionysos"],lore:[
    "La vigne est indissociable de Dionysos, dieu du vin, de l'ivresse, de la fête, mais aussi de la transformation et de l'extase.",
    "Dans les mythes, Dionysos voyage avec son cortège de satyres, de ménades et de divinités liées à la nature sauvage. La vigne et le vin deviennent les moyens par lesquels l'être humain quitte momentanément son état ordinaire et entre dans un autre état de conscience.",
    "La vigne porte également l'idée de cycle : elle pousse, fleurit, produit ses grappes, puis perd ses feuilles avant de renaître au printemps. Elle rassemble donc la fécondité de la terre et la transformation.",
    "Le mythe d'Icarios rappelle que ce don comportait aussi un risque : Dionysos lui enseigna le premier l'art de faire du vin, mais les bergers auxquels il en fit goûter, ivres pour la première fois de leur vie, crurent avoir été empoisonnés et le tuèrent. Sa fille Érigone, désespérée de le retrouver mort, se pendit à son tour — un rappel que l'ivresse dionysiaque, aussi joyeuse soit-elle, n'est jamais totalement sans danger pour qui ne sait pas encore ce qu'elle est.",
    "Elle est devenue un symbole de plaisir, d'abondance, de transformation, d'extase, de fête et de vitalité.",
    "La vigne est particulièrement associée à Dionysos.",
  ]},
  "grenade":{icon:"🔴",label:"Grenade",category:"Mythologie",desc:"Le fruit aux innombrables graines : fertilité, abondance, cycle, attachement, ce qui relie au monde souterrain — associée à Perséphone et Hadès.",links:["perséphone","hadès","ascalaphos"],lore:[
    "Lorsque Perséphone fut enlevée par Hadès et conduite aux Enfers, elle y mangea quelques grains de grenade. Dans la mythologie grecque, manger la nourriture des morts crée un lien avec le monde souterrain. Perséphone ne pouvait donc plus simplement quitter les Enfers pour toujours.",
    "C'est Ascalaphos, gardien du jardin des Enfers, qui la vit cueillir ce fruit et le rapporta aux autres dieux — un témoignage qui scella son sort, et qui lui valut d'être changé en chouette une fois sa vengeance venue (voir la fiche « Ascalaphos »).",
    "Elle fut finalement autorisée à retourner auprès de sa mère Déméter pendant une partie de l'année, mais devait revenir auprès d'Hadès pour l'autre partie. Son départ vers les Enfers correspond à l'automne, tandis que son retour sur terre accompagne le renouveau du printemps.",
    "Au-delà de ce mythe, la grenade était aussi offerte lors des mariages grecs comme symbole de fécondité : ses innombrables graines rassemblées sous une même écorce évoquaient la promesse d'une descendance abondante.",
    "Elle est ainsi devenue un symbole de fertilité, d'abondance, de cycle, d'attachement et de ce qui relie irréversiblement au monde souterrain.",
    "La grenade est particulièrement associée à Perséphone.",
  ]},
  "épis":{icon:"🌾",label:"Épis de blé",category:"Mythologie",desc:"Attribut de Déméter : récolte, travail, nourriture, cycle des saisons.",links:["déméter"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "Au terme des Mystères d'Éleusis, dont Déméter était la divinité tutélaire, le point culminant de l'initiation consistait, dit-on, à montrer aux initiés un simple épi de blé moissonné, présenté en silence — un geste si dépouillé qu'il concentrait à lui seul tout ce que le mystère avait à révéler sur la vie, la mort et ce qui renaît.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "char solaire":{icon:"☀",label:"Char solaire",category:"Mythologie",desc:"Attribut d'Hélios (et repris par Apollon) : clarté, trajectoire réglée, rien ne peut rester caché sous cette lumière.",links:["hélios","apollon"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Le fils d'Hélios, Phaéton, obtint un jour de le conduire à la place de son père — et, incapable d'en maîtriser les chevaux, faillit embraser la terre entière avant que Zeus ne soit contraint de l'abattre d'un éclair pour l'arrêter. Le mythe rappelle qu'un tel char ne se laisse conduire que par celui qui en a vraiment la maîtrise.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},
  "arc-en-ciel":{icon:"🌈",label:"Arc-en-ciel",category:"Mythologie",desc:"Attribut d'Iris : médiation, passage, réconciliation entre deux états.",links:["iris"],lore:[
    "L'arc-en-ciel est le corps même d'Iris, déesse messagère qui relie l'Olympe à la terre et à la mer en empruntant ce pont de couleurs.",
    "Iris tient un rôle proche de celui d'Hermès, mais tourné vers les dieux plutôt que vers les hommes : elle porte leurs messages et, selon certaines traditions, va puiser l'eau sacrée du Styx sur laquelle les dieux prêtent leurs serments les plus solennels.",
    "Apparaître après l'orage, relier le ciel et la terre en un instant fragile : l'arc-en-ciel condense en une image la fonction même d'Iris, messagère et médiatrice.",
    "Dans l'Iliade, c'est elle que Zeus envoie porter à Priam l'ordre d'aller récupérer, sans crainte, le corps de son fils Hector auprès d'Achille — un message si périlleux qu'aucun mortel n'aurait osé le porter, mais qu'elle traverse en un instant, sans jamais risquer d'être elle-même retenue.",
    "Il est devenu un symbole de médiation, de passage et de réconciliation entre deux états qui semblaient incompatibles.",
    "L'arc-en-ciel est particulièrement associé à Iris.",
  ]},
  "flûte":{icon:"🎶",label:"Flûte",category:"Mythologie",desc:"Attribut de Pan : instinct non policé par la raison, appel de la nature brute.",links:["pan"],lore:[
    "La flûte de Pan, ou syrinx, naît d'une histoire de fuite et de métamorphose.",
    "Pan, dieu à moitié bouc, poursuivait de son désir la nymphe Syrinx. Pour lui échapper, elle se réfugia au bord d'un fleuve et fut changée en roseaux au moment même où Pan croyait enfin la saisir. Ne serrant dans ses bras que des tiges creuses, il en assembla plusieurs de longueurs différentes pour en tirer un instrument — et lui donna le nom de la nymphe.",
    "La flûte de Pan porte ainsi la trace d'un désir qui n'a pas obtenu ce qu'il cherchait, mais qui en a fait naître autre chose : une musique instinctive, non policée par la raison, à l'image du dieu qui la joue.",
    "Un autre joueur de flûte osa un jour défier Apollon lui-même : le satyre Marsyas, qui avait ramassé l'instrument après qu'Athéna l'eut rejeté en voyant combien il déformait son visage en soufflant dedans. Vaincu au concours, Marsyas fut écorché vif par le dieu en punition de son insolence — un rappel brutal que l'instinct de la flûte, aussi séduisant soit-il, ne l'emporte jamais impunément sur l'harmonie mesurée de la lyre.",
    "Elle est devenue un symbole d'instinct, d'appel de la nature brute et de désir transformé plutôt qu'assouvi.",
    "La flûte est particulièrement associée à Pan.",
  ]},
  "balance":{icon:"⚖",label:"Balance",category:"Mythologie",desc:"Attribut de Thémis (et de Minos au Jugement) : équilibre, justice, mesure exacte avant toute décision.",links:["thémis","minos"],lore:[
    "La balance représente ce qui doit être pesé et comparé avant qu'un jugement soit rendu.",
    "Cette idée existe déjà dans la mythologie grecque : Zeus est représenté pesant le destin des guerriers sur une balance, notamment dans les scènes de psychostasie, où le sort des combattants est mis en balance.",
    "Homère met en scène ce geste au moment le plus tendu de l'Iliade : avant le combat final entre Achille et Hector, Zeus place sur sa balance d'or les deux destins en jeu — celui d'Hector s'enfonce, signe que son heure est venue, et Apollon, qui le protégeait jusque-là, doit alors l'abandonner à son sort.",
    "La justice apparaît ainsi comme une force qui ne choisit pas selon les émotions, mais qui mesure et attribue à chacun ce qui lui revient.",
    "La balance est donc devenue un symbole de justice, d'équilibre, de mesure, de jugement et d'impartialité.",
    "Elle peut être associée à Thémis et à Dikè, personnifications de l'ordre divin et de la justice.",
  ]},
  "ailes":{icon:"🕊",label:"Ailes",category:"Mythologie",desc:"Selon le contexte : Niké (victoire), Hermès (rapidité, message) ou Éros (désir qui s'envole). Toujours un mouvement qui échappe à la pesanteur ordinaire.",links:["hermès","éros"],lore:[
    "Les ailes, dans la mythologie grecque, distinguent ceux qui échappent à la pesanteur ordinaire du monde.",
    "Hermès porte des sandales ailées qui lui permettent de voyager entre l'Olympe, le monde des hommes et celui des morts à une vitesse que rien ne peut freiner. Éros, lui, est représenté avec des ailes qui traduisent la rapidité et l'imprévisibilité du désir amoureux, qui se pose où il veut sans qu'on puisse le retenir. Niké, déesse de la victoire, vole vers celui ou celle qu'elle choisit de couronner, et sa venue ne se commande pas.",
    "Trois figures, trois façons d'échapper au sol : le message, le désir, la victoire — chacun a ses propres ailes.",
    "Les ailes ne garantissent pourtant pas toujours la maîtrise : celles que Dédale fabriqua pour lui et son fils Icare, en plumes et en cire, leur permirent de fuir le labyrinthe crétois par les airs (voir la fiche « Labyrinthe ») — mais Icare, grisé par cette liberté nouvelle, s'éleva trop près du soleil, dont la chaleur fit fondre la cire, et il périt englouti par la mer.",
    "Elles sont devenues un symbole de mouvement qui échappe à la pesanteur ordinaire, de rapidité et de ce qui ne peut être ni retenu ni forcé.",
    "Les ailes sont particulièrement associées à Hermès et à Éros.",
  ]},

  // Objets classiques : bâton, coupe, épée, denier
  "bâton":{icon:"🪄",label:"Bâton",category:"Objets",desc:"Enseigne liée au feu : volonté, énergie, croissance par l'action.",links:[],lore:[
    "Le bâton est avant tout un objet de mouvement et d'action. Dans les représentations anciennes, il peut être le bâton du voyageur, du berger, du pèlerin ou de celui qui avance à travers le monde.",
    "Il est l'emblème de l'énergie qui pousse à agir.",
    "Il évoque aussi directement la branche vivante : quelque chose qui pousse à partir de la terre et qui cherche la lumière.",
    "Le bâton le plus chargé de sens dans les cortèges dionysiaques est le thyrse : une tige de fenouil couronnée d'une pomme de pin et entourée de feuilles de lierre et de vigne (voir les fiches « Lierre » et « Vigne »), que Dionysos et ses suivants brandissaient comme une arme rituelle, capable, dit-on, de faire jaillir le vin ou le miel du sol d'un simple coup.",
    "Le bâton représente donc la volonté, l'énergie, l'action, l'ambition, la croissance, la créativité et la force vitale.",
  ]},
  "coupe":{icon:"🍷",label:"Coupe",category:"Objets",desc:"Enseigne liée à l'eau : émotion, réceptivité, relation qui se reçoit et se partage.",links:[],lore:[
    "La coupe est un récipient : elle reçoit, contient et conserve.",
    "Là où le bâton agit vers l'extérieur, la coupe accueille ce qui vient de l'extérieur. Elle devient donc l'image de l'univers intérieur : émotions, sentiments, intuition, imagination et relations.",
    "La coupe évoque également les récipients sacrés utilisés dans les cultes antiques pour contenir le vin, l'eau, le lait ou les offrandes faites aux dieux.",
    "Une coupe extraordinaire intervient dans le dixième travail d'Héraclès : pour traverser l'océan et atteindre le troupeau du géant Géryon, il emprunte la coupe d'or dans laquelle Hélios traverse chaque nuit le ciel d'ouest en est pour retrouver son point de départ — un récipient assez vaste, pour une fois, non pour contenir un breuvage mais pour porter un dieu, et cette fois un héros, d'un bout du monde à l'autre.",
    "La coupe est un symbole de l'émotion, de la réceptivité, de l'intuition, de l'amour, de la relation, de l'offrande et de ce que l'on porte intérieurement.",
  ]},
  "épée":{icon:"⚔",label:"Épée",category:"Objets",desc:"Enseigne liée à l'air : pensée, décision, conflit — et la vérité qui en découle.",links:[],lore:[
    "L'épée est l'arme qui tranche.",
    "Cette caractéristique physique explique une grande partie de sa symbolique : elle sépare, coupe, distingue et met fin à ce qui doit être terminé.",
    "Mais l'épée est également une arme associée au pouvoir et à l'autorité. Elle peut protéger la justice, défendre une cause ou imposer une décision.",
    "Dans les traditions symboliques européennes, l'épée est donc devenue associée à l'intelligence capable de distinguer le vrai du faux, mais aussi au conflit qui naît lorsque deux volontés s'opposent.",
    "La harpé, épée recourbée que Persée reçut d'Hermès, tranche l'un des mythes les plus célèbres de toute la mythologie grecque : c'est elle qui décapite la Gorgone Méduse, dont le seul regard pétrifiait quiconque le croisait — un exploit que Persée n'accomplit qu'en évitant de la regarder directement, guidé par son reflet dans un bouclier poli.",
    "Sa lame droite évoque également une pensée qui va directement à l'essentiel.",
    "L'épée est ainsi devenue un symbole de pensée, de vérité, de discernement, de décision, de justice, de conflit, de rupture et de pouvoir : l'esprit qui tranche et révèle ce qui est vrai.",
  ]},
  "denier":{icon:"🪙",label:"Denier",category:"Objets",desc:"Enseigne liée à la terre : matière, travail, ressource, valeur concrète.",links:[],lore:[
    "Le denier est une pièce de monnaie, associée directement à quelque chose de matériel et de tangible.",
    "La monnaie représente ce qui possède une valeur mesurable : richesse, ressources, travail, échange et possession — mais le denier ne se limite pas à l'argent. Il représente plus largement le monde concret : le corps, la matière, la maison, le travail, les ressources et tout ce que l'on construit dans le monde réel.",
    "Une seule pièce, minuscule, franchit pourtant la frontière entre les deux mondes : l'obole que l'on plaçait dans la bouche du défunt pour payer Charon, le passeur qui faisait traverser la rivière du Styx aux âmes des morts (voir la fiche « Rivière ») — sans cette pièce, disait-on, l'âme restait errante sur la rive, incapable de payer son dernier voyage.",
    "Sa forme ronde peut également évoquer le cycle, la terre, le soleil et ce qui se matérialise.",
    "Le denier est ainsi devenu un symbole de matière, de richesse, de travail, de ressources, de sécurité, de prospérité, de corps et d'ancrage : ce qui prend forme dans la matière.",
  ]},

  // Objets mythologiques
  "couronne":{icon:"👑",label:"Couronne",category:"Objets mythologiques",desc:"Autorité légitime, accomplissement, souveraineté assumée avec dignité.",links:["héra","apollon"],lore:[
    "La couronne est l'objet qui rend visible le rang de celui ou celle qui la porte. Dans la mythologie grecque, les dieux souverains sont représentés avec des attributs qui manifestent leur autorité, et les couronnes végétales servent également à distinguer les vainqueurs, les héros et ceux qui ont reçu une reconnaissance divine.",
    "Héra, reine de l'Olympe, porte la sienne comme signe visible d'une souveraineté qui ne se discute pas — une autorité de naissance, non conquise (voir la fiche « Héra »).",
    "La couronne de laurier d'Apollon, elle, se mérite : elle devient le signe d'une victoire et d'un accomplissement après la transformation de Daphné en laurier.",
    "La couronne réunit donc deux idées : celui qui règne de droit et celui qui a accompli quelque chose qui mérite d'être reconnu.",
    "Une autre couronne, offerte par Dionysos à son épouse Ariane (voir la fiche « Ariane »), fut plus tard placée parmi les étoiles sous le nom de Couronne boréale — preuve qu'une couronne peut aussi être un don d'amour plutôt qu'un simple insigne de pouvoir.",
    "Elle est devenue un symbole de souveraineté, d'autorité, de victoire, d'accomplissement et de reconnaissance.",
    "La couronne est particulièrement associée à Héra et à Apollon — deux légitimités différentes, l'une de rang, l'autre de mérite.",
  ]},
  "sceptre":{icon:"🔱",label:"Sceptre",category:"Objets mythologiques",desc:"Pouvoir stable, commandement exercé avec constance plutôt qu'imposé par la force.",links:["zeus","héra","héphaïstos"],lore:[
    "Le sceptre est le signe du pouvoir exercé par celui qui gouverne.",
    "Dans les récits homériques, Zeus tient le sceptre comme signe de sa souveraineté sur les dieux et les hommes. Le sceptre n'est donc pas seulement une arme : il représente l'autorité légitime et le droit de commander.",
    "Héra, reine de l'Olympe, porte elle aussi un sceptre — signe d'une autorité qui n'a besoin d'aucune démonstration de force pour s'imposer, à la différence de celle, plus spectaculaire, de Zeus (voir la fiche « Héra »).",
    "Dans l'Iliade, le sceptre d'Agamemnon porte le poids de plusieurs générations : forgé par Héphaïstos, offert par Zeus à Pélops, il se transmet ensuite de père en fils jusqu'à Agamemnon, qui le brandit comme la preuve que son autorité ne sort pas de nulle part mais d'une lignée ininterrompue depuis les dieux eux-mêmes.",
    "Il est également utilisé par les rois et les magistrats comme marque de leur fonction.",
    "Le sceptre est ainsi devenu un symbole de pouvoir, de commandement, d'autorité, de gouvernement et de responsabilité.",
    "Le sceptre est particulièrement associé à Zeus et à Héra, ainsi qu'aux figures souveraines en général.",
  ]},
  "clé":{icon:"🗝",label:"Clé",category:"Objets mythologiques",desc:"Accès, connaissance réservée, passage qui ne s'ouvre qu'à qui sait où chercher.",links:["hécate"],lore:[
    "La clé est littéralement ce qui permet de franchir une porte normalement fermée.",
    "Dans les traditions liées à Hécate, celle-ci est appelée « porteuse des clés » et Kleidouchos, « celle qui tient les clés ». Elle règne sur les carrefours, les seuils et les frontières entre différents espaces.",
    "La clé devient alors l'objet qui permet d'accéder à ce qui était caché.",
    "Cette fonction n'était pas seulement symbolique : dans plusieurs sanctuaires grecs, la clé du temple était matériellement confiée à une prêtresse, dont la charge consistait précisément à ouvrir et fermer l'accès au lieu sacré — un pouvoir concret sur le seuil, à l'image de celui qu'Hécate exerce sur les passages entre les mondes.",
    "Elle est devenue un symbole de passage, d'accès, de connaissance secrète, de pouvoir sur les seuils et d'ouverture vers un autre monde.",
    "La clé est particulièrement associée à Hécate.",
  ]},
  "lanterne":{icon:"🏮",label:"Lanterne",category:"Objets mythologiques",desc:"Recherche, lumière intérieure portée dans l'obscurité plutôt que réponse immédiate.",links:["déméter","hécate"],lore:[
    "La lanterne est plus tardive que la torche et ne possède pas, dans la mythologie grecque, un récit fondateur comparable au trident de Poséidon ou à la foudre de Zeus.",
    "Mais sa symbolique découle directement de l'idée ancienne de la lumière portée dans l'obscurité.",
    "Elle peut être reliée à Hécate et à sa fonction de guide nocturne : la déesse porte des torches lorsqu'elle accompagne Déméter dans sa recherche de Perséphone.",
    "La lanterne représente donc une lumière plus intime que la foudre : elle n'éclaire pas le monde entier, elle permet simplement de continuer à avancer lorsque l'on ne voit plus son chemin.",
    "L'anecdote la plus célèbre liée à une lanterne reste peut-être celle du philosophe Diogène de Sinope, qui aurait parcouru les rues d'Athènes en plein jour, une lanterne allumée à la main, en affirmant chercher « un homme » — un geste provocateur pour dénoncer, lanterne en plein soleil, combien l'honnêteté véritable restait introuvable même à la lumière du jour.",
    "Elle est devenue un symbole de recherche, de lumière intérieure, d'espoir, d'orientation et de découverte de ce qui était caché.",
  ]},
  "torche":{icon:"🔦",label:"Torche",category:"Objets mythologiques",desc:"Illumination, connaissance transmise, guidance dans l'incertitude.",links:["hécate","déméter","prométhée"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "À Athènes, des courses de relais nocturnes appelées lampadédromies opposaient des équipes de jeunes gens qui se transmettaient une torche allumée sans jamais la laisser s'éteindre, en l'honneur de Prométhée, d'Héphaïstos ou d'Athéna (voir la fiche « Prométhée ») — une manière de rejouer, dans la course, le don du feu qui avait fondé la civilisation elle-même.",
    "La torche est donc devenue un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "La torche est particulièrement associée à Hécate et, dans le mythe de Perséphone, à Déméter.",
  ]},
  "flèche":{icon:"🎯",label:"Flèche",category:"Objets mythologiques",desc:"Direction précise, volonté qui vise, conséquence qui suit le tir.",links:["éros"],lore:[
    "La flèche prolonge l'intention de l'archer : une fois tirée, elle ne peut plus revenir en arrière.",
    "Elle possède donc une symbolique différente de l'arc. L'arc représente la préparation et la tension ; la flèche représente le moment où l'intention devient action.",
    "Chez Artémis et Apollon, les flèches peuvent donner la mort à distance. Chez Éros, elles prennent une dimension différente : elles atteignent directement le cœur et provoquent l'amour ou le désir.",
    "Les flèches d'Héraclès, trempées dans le sang empoisonné de l'Hydre de Lerne, se révélèrent indispensables bien après sa mort : léguées au héros Philoctète, elles seules, selon un oracle, pouvaient permettre aux Grecs de vaincre Troie — obligeant ses compagnons à aller chercher Philoctète, qu'ils avaient pourtant abandonné blessé et hurlant de douleur sur l'île de Lemnos des années plus tôt.",
    "La flèche est ainsi devenue un symbole de direction, de volonté, d'action, de conséquence, de désir et d'atteinte d'un objectif.",
    "La flèche peut être associée à Artémis, Apollon et Éros selon le contexte.",
  ]},
  "miroir":{icon:"🪞",label:"Miroir",category:"Objets mythologiques",desc:"Introspection, vérité renvoyée, perception de soi parfois inconfortable.",links:["aphrodite"],lore:[
    "Le miroir est naturellement associé à Aphrodite parce qu'il renvoie à la beauté et à la perception de son propre visage.",
    "Dans l'imaginaire mythologique, Aphrodite est la déesse dont la beauté peut provoquer le désir, la rivalité et même la guerre. Le miroir devient alors l'objet qui permet de contempler cette beauté mais aussi de prendre conscience de l'image que l'on renvoie aux autres.",
    "Il possède donc une double dimension : il montre ce qui est visible, mais il peut également révéler notre rapport à nous-mêmes.",
    "Le miroir rejoint aussi un tout autre mythe, plus sombre : Narcisse, épris de son propre reflet dans l'eau d'une source, ne put jamais s'en détacher et dépérit à force de le contempler sans fin (voir la fiche « Narcisse ») — la preuve que la même surface qui révèle peut aussi retenir prisonnier celui qui s'y regarde trop longtemps.",
    "Le miroir est devenu un symbole de beauté, de perception, d'introspection, d'identité, de désir et de connaissance de soi.",
    "Le miroir est particulièrement associé à Aphrodite.",
  ]},
  "voile":{icon:"🧣",label:"Voile",category:"Objets mythologiques",desc:"Secret, connaissance cachée, frontière entre ce qui se montre et ce qui se protège.",links:["métis"],lore:[
    "Le voile possède une symbolique particulièrement forte dans les rites grecs, notamment autour des femmes, du mariage et des mystères religieux.",
    "Couvrir le visage ou le corps signifie cacher quelque chose au regard ordinaire. Le voile crée donc une frontière entre ce qui peut être vu et ce qui doit rester secret.",
    "Cette symbolique convient particulièrement aux divinités et aux rites liés aux mystères : le sacré n'est pas entièrement accessible au regard profane.",
    "Le voile peut également représenter le passage d'un état à un autre, notamment dans le mariage, où la jeune femme change de statut.",
    "Ce même voile trouvait une place précise dans le rituel du mariage grec : lors de la cérémonie appelée anakalyptêria, littéralement le « dévoilement », l'épouse retirait son voile devant son époux pour la première fois — un geste qui rendait le mariage visible et effectif aux yeux de tous.",
    "Il est ainsi devenu un symbole de secret, de connaissance cachée, de mystère, de frontière, de transformation et de passage — ce qui existe derrière le monde visible mais qui n'est pas encore révélé.",
  ]},
  "chaîne":{icon:"⛓",label:"Chaîne",category:"Objets mythologiques",desc:"Attachement, dépendance, lien — la question est toujours de savoir s'il enferme ou s'il peut être dénoué.",links:["pan","prométhée"],lore:[
    "La chaîne la plus célèbre de la mythologie grecque est celle qui retint Prométhée sur un rocher du Caucase, en punition d'avoir donné le feu aux hommes contre la volonté de Zeus.",
    "Chaque jour, un aigle venait dévorer son foie, qui repoussait chaque nuit, prolongeant son supplice sans fin — jusqu'à ce que Chiron accepte de mourir à sa place et qu'Héraclès mette fin au calvaire de Prométhée (voir la fiche « Prométhée »).",
    "La chaîne de Prométhée dit quelque chose de plus large que la simple punition : elle montre qu'un don fait sans autorisation a toujours un prix, et que l'attachement qui en résulte peut aussi bien enfermer que devenir, avec le temps, la preuve de ce qu'on a osé offrir.",
    "Une autre chaîne, tout aussi célèbre, retint Andromède à un rocher battu par les flots, livrée en sacrifice à un monstre marin pour expier l'orgueil de sa mère Cassiopée — jusqu'à ce que Persée, de retour avec la tête de Méduse, la délivre et l'épouse — tous deux changés plus tard en étoiles (voir la fiche « Étoile »). Contrairement à celle de Prométhée, cette chaîne-là ne punit aucune faute : elle ne fait que retenir une victime innocente, en attendant qu'un sauveur se présente.",
    "Elle est devenue un symbole d'attachement, de dépendance et de lien — la question étant toujours de savoir s'il enferme ou s'il peut être dénoué.",
    "La chaîne est particulièrement associée à Prométhée et à Pan — deux attachements de nature très différente.",
  ]},
  "roue":{icon:"☸",label:"Roue",category:"Objets mythologiques",desc:"Cycle, changement, destin qui tourne sans considération pour le mérite.",links:["tyché"],lore:[
    "La roue est l'attribut de Tyché, déesse du hasard et de la fortune, souvent représentée les yeux bandés, un gouvernail à la main pour rappeler qu'elle dirige le destin des hommes sans qu'ils puissent l'influencer.",
    "Sa roue tourne sans considération pour le mérite : elle peut élever un inconnu au sommet ou faire chuter un roi, dans un mouvement que ni la vertu ni la faute ne peuvent arrêter.",
    "Contrairement à une punition ou une récompense méritée, ce que fait tourner la roue de Tyché échappe à toute logique morale — c'est précisément ce qui en fait un symbole aussi redouté que fascinant.",
    "Une autre roue, châtiment cette fois, retient Ixion pour l'éternité : ayant tenté de séduire Héra, il fut attaché à une roue enflammée tournant sans fin dans les Enfers — un tourment qui, contrairement à celui de Tyché, ne doit rien au hasard : c'est une punition méritée, non un coup du sort imprévisible.",
    "Elle est devenue un symbole de cycle, de changement et de destin qui tourne sans considération pour le mérite.",
    "La roue est particulièrement associée à Tyché.",
  ]},
  "char":{icon:"🏇",label:"Char",category:"Objets mythologiques",desc:"Direction, maîtrise, progression réglée vers un but choisi.",links:["apollon","hélios"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Un tout autre char porte, lui, la marque d'une malédiction familiale plutôt que celle du ciel : pour épouser Hippodamie, Pélops dut affronter son père en une course de chars à l'issue mortelle pour tous les prétendants précédents — il ne l'emporta qu'en sabotant secrètement l'essieu du char de son adversaire, un geste de tricherie qui pèsera sur toute sa descendance, jusqu'à la maison d'Atrée.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},
  "corne d'abondance":{icon:"🐐",label:"Corne d'abondance",category:"Objets mythologiques",desc:"La corne de la chèvre Amalthée : abondance intarissable, don généreux qui ne s'épuise jamais.",links:["zeus"],lore:[
    "La corne d'abondance provient du mythe de la naissance de Zeus : caché dans une grotte du mont Ida, en Crète, pour échapper à son père Cronos, qui dévorait ses enfants (voir la fiche « Grotte »), le nourrisson fut nourri du lait de la chèvre Amalthée — ou, selon d'autres versions, d'une nymphe portant ce nom.",
    "En jouant avec elle, Zeus enfant aurait brisé accidentellement l'une de ses cornes. Pour se faire pardonner, il la dota d'un pouvoir merveilleux : produire indéfiniment tout ce que son propriétaire pouvait désirer — nourriture, fruits, richesses — sans jamais se vider.",
    "Devenu roi des dieux, Zeus plaça plus tard Amalthée elle-même parmi les étoiles, sous la forme de la constellation du Capricorne, en remerciement pour ces années passées à le nourrir en secret.",
    "La corne d'abondance est ainsi devenue un symbole de générosité, de prospérité intarissable, de nourriture toujours disponible et de gratitude qui répare un tort involontaire.",
    "La corne d'abondance est particulièrement associée à Zeus, par l'intermédiaire d'Amalthée.",
  ]},

  // Animaux
  "aigle":{icon:"🦅",label:"Aigle",category:"Animaux",desc:"Hauteur de vue, pouvoir, vision d'ensemble — lié à Zeus.",links:["zeus"],lore:[
    "L'aigle est l'oiseau de Zeus et l'un de ses attributs les plus reconnaissables. Dans les récits mythologiques, Zeus peut lui-même prendre la forme d'un aigle, notamment lorsqu'il enlève Ganymède pour l'amener auprès des dieux.",
    "Devenu l'échanson des dieux sur l'Olympe, Ganymède est à son tour placé parmi les étoiles par Zeus : il devient la constellation, puis le signe, du Verseau — l'aigle qui l'a porté jusque-là reste associé à ce voyage entre le ciel et la terre.",
    "L'aigle est aussi celui qui s'élève plus haut que les autres oiseaux et qui semble pouvoir regarder le monde depuis les hauteurs du ciel. Il devient ainsi l'image parfaite de Zeus, maître de l'Olympe et dieu du ciel.",
    "Dans une autre tradition, l'aigle apparaît comme un signe favorable envoyé par Zeus. Il peut alors être interprété comme un messager venu du ciel.",
    "L'aigle est aussi l'instrument de la punition de Zeus : c'est un aigle qu'il envoie chaque jour dévorer le foie de Prométhée, retenu par une chaîne sur son rocher, un foie qui repousse chaque nuit pour que le châtiment ne s'achève jamais (voir la fiche « Chaîne ») — preuve que l'oiseau qui élève peut aussi, sur ordre du même dieu, devenir l'instrument d'un tourment sans fin.",
    "L'aigle est donc devenu un symbole de pouvoir, de souveraineté, de hauteur, de vision, de force et de message divin.",
    "L'aigle est particulièrement associé à Zeus.",
  ]},
  "serpent":{icon:"🐍",label:"Serpent",category:"Animaux",desc:"Transformation, connaissance, guérison, lien avec le monde souterrain.",links:["hygie"],lore:[
    "Le serpent possède une symbolique beaucoup plus ancienne et plus complexe que celle d'un simple animal associé au mal.",
    "Il change de peau et semble ainsi mourir puis renaître. Cette capacité a nourri son association avec la transformation et le renouvellement.",
    "Il vit également dans les fissures du sol, les grottes et les lieux cachés. Il appartient donc symboliquement à ce qui se trouve sous la surface : la terre, les profondeurs et le monde souterrain.",
    "Le serpent est aussi associé à Asclépios, dieu de la médecine. Son image enroulée autour du bâton du dieu est devenue un symbole de guérison — sa fille Hygie (voir la fiche « Hygie ») en tient elle aussi un, enroulé autour d'une coupe plutôt qu'un bâton : cette variante précise est restée le symbole international de la pharmacie.",
    "À Delphes, c'est un serpent, Python, gardien de l'ancien oracle de la Terre, qu'Apollon dut vaincre pour s'emparer du sanctuaire et y installer le sien — la prêtresse qui y rendait ensuite les oracles, la Pythie, tenait son nom de ce combat fondateur.",
    "Enfin, dans de nombreux mythes grecs, les serpents gardent des lieux ou des secrets : ils deviennent ainsi des créatures placées entre le monde visible et ce qui est caché.",
    "Le serpent est donc devenu un symbole de transformation, de guérison, de connaissance cachée, de régénération et du monde souterrain.",
    "Le serpent est associé à plusieurs divinités, notamment Asclépios et sa fille Hygie, Athéna, Apollon et les puissances chthoniennes.",
  ]},
  "chien":{icon:"🐕",label:"Chien",category:"Animaux",desc:"Gardien des seuils, protection, instinct fidèle — lié à Hécate.",links:["hécate"],lore:[
    "Le chien est particulièrement lié à Hécate.",
    "Hécate est une déesse des carrefours, de la nuit, de la magie et du monde des morts. Dans les récits antiques, son arrivée est annoncée par les aboiements des chiens et elle est accompagnée de chiens infernaux.",
    "Un récit raconte également qu'Hécube (voir la fiche « Hécube »), reine de Troie, fut transformée en chienne après la chute de Troie et devint ensuite la compagne d'Hécate.",
    "Le chien le plus redoutable de la mythologie grecque reste toutefois Cerbère, monstre à trois têtes qui garde l'entrée des Enfers et empêche quiconque d'en ressortir sans autorisation — seul Héraclès parvint à le maîtriser à mains nues, lors de son douzième et dernier travail, avant de le ramener brièvement sur terre pour prouver son exploit.",
    "Le chien garde ainsi les frontières : il veille sur la maison, sur les chemins, sur les portes et, dans l'imaginaire d'Hécate, sur la frontière entre les vivants et les morts.",
    "Il est devenu un symbole de protection, de vigilance, d'instinct, de seuil et de passage entre les mondes.",
    "Le chien est particulièrement associé à Hécate.",
  ]},
  "cheval":{icon:"🐎",label:"Cheval",category:"Animaux",desc:"Mouvement, liberté, puissance mise en marche.",links:["poséidon"],lore:[
    "Le cheval est avant tout lié à Poséidon.",
    "Lorsque les dieux se disputèrent la protection d'Athènes, Poséidon fit apparaître un cheval dans certaines traditions du mythe. Il devint ensuite le dieu des chevaux autant que celui de la mer et des tremblements de terre.",
    "Le cheval représente une force difficile à contenir : il court, franchit les distances et transporte l'être humain au-delà de ses propres limites.",
    "Dans la mythologie grecque, les chevaux divins peuvent également tirer les chars des dieux et parcourir le ciel, la mer ou les domaines surnaturels.",
    "Le cheval le plus célèbre de la guerre de Troie n'en était pourtant pas un vivant : c'est un cheval de bois, conçu par Ulysse et empli de guerriers grecs cachés, qui permit de faire tomber la ville après dix années de siège infructueux — les Troyens, croyant recevoir une offrande de paix, l'introduisirent eux-mêmes derrière leurs propres murailles.",
    "Le cheval est donc devenu un symbole de mouvement, de liberté, de puissance, de vitesse et de force indomptée.",
    "Le cheval est particulièrement associé à Poséidon.",
  ]},
  "pégase":{icon:"🦄",label:"Pégase",category:"Animaux",desc:"Inspiration, élévation, maîtrise d'une force extraordinaire — monture de Bellérophon.",links:["bellérophon"],lore:[
    "Pégase naît du sang de Méduse lorsqu'elle est décapitée par Persée.",
    "Créature extraordinaire, cheval ailé capable de s'élever dans le ciel, il devient ensuite le compagnon du héros Bellérophon, qui tente de le maîtriser pour combattre la Chimère.",
    "Pégase représente donc quelque chose de plus subtil que le simple cheval : c'est la force qui s'élève au-dessus de la matière.",
    "Dans la tradition ultérieure, il est également associé aux Muses et à la source Hippocrène, ce qui renforce son association avec l'inspiration poétique.",
    "Grisé par ses exploits, Bellérophon tenta un jour de s'élever sur Pégase jusqu'à l'Olympe lui-même, comme s'il pouvait rejoindre le rang des dieux (voir la fiche « Bellérophon ») — Zeus envoya un simple taon piquer la monture, qui se cabra et désarçonna le héros, le laissant retomber sur terre boiteux et solitaire pour le reste de sa vie, tandis que Pégase, lui, poursuivait seul son ascension.",
    "Pégase est ainsi devenu un symbole de l'inspiration, de l'imagination, de l'élévation, de la liberté et de la maîtrise d'une force exceptionnelle.",
    "Pégase est particulièrement associé à Bellérophon et, dans les traditions ultérieures, aux Muses.",
  ]},
  "dauphin":{icon:"🐬",label:"Dauphin",category:"Animaux",desc:"Guidance, mer, protection pendant la traversée.",links:["poséidon","dionysos","apollon"],lore:[
    "Le dauphin appartient au monde de Poséidon et de la mer.",
    "Dans un célèbre récit, Poséidon cherchait Amphitrite, qui s'était enfuie. Un dauphin la retrouva et la conduisit auprès du dieu. Pour le remercier, Poséidon plaça ensuite le dauphin dans le ciel sous la forme de la constellation Delphinus.",
    "Le dauphin apparaît aussi dans plusieurs récits comme un animal qui vient au secours des hommes et les guide à travers la mer.",
    "Il est aussi lié à Dionysos par un mythe plus inattendu : des pirates l'ayant capturé sans reconnaître sa nature divine, le dieu fit surgir de la vigne sur le pont du navire et se changea lui-même en lion, semant une telle terreur que les marins se jetèrent à l'eau — où ils furent aussitôt changés en dauphins, condamnés à porter secours aux marins en perdition pour le reste des temps.",
    "Il est donc devenu un symbole de guidance, de navigation, de protection, de mer et d'intervention bienveillante du monde marin.",
    "Le dauphin est particulièrement associé à Poséidon, mais également à Apollon dans certains mythes.",
  ]},
  "colombe":{icon:"🕊",label:"Colombe",category:"Animaux",desc:"Amour, paix — liée à Aphrodite.",links:["aphrodite"],lore:[
    "La colombe est l'un des oiseaux d'Aphrodite.",
    "Elle représente l'amour doux et l'attachement amoureux. Contrairement aux animaux puissants ou menaçants, elle évoque quelque chose de tendre, intime et pacifique.",
    "Son association avec Aphrodite s'est renforcée par sa présence dans l'iconographie de la déesse et dans la symbolique amoureuse antique.",
    "Les colombes jouent aussi un rôle décisif dans l'expédition des Argonautes : pour franchir les Symplégades, deux rochers mobiles qui se refermaient sur tout ce qui tentait de passer entre eux, Jason envoya d'abord une colombe en éclaireur — l'oiseau ne perdit que quelques plumes de sa queue au moment où les rochers se refermèrent, leur indiquant l'instant exact où le navire pourrait s'y risquer à son tour.",
    "Elle est ainsi devenue un symbole de l'amour, de la tendresse, de la paix, de l'union et de la beauté.",
    "La colombe est particulièrement associée à Aphrodite.",
  ]},
  "corbeau":{icon:"🐦‍⬛",label:"Corbeau",category:"Animaux",desc:"Présage, connaissance du monde invisible.",links:["apollon","athéna"],lore:[
    "Le corbeau est particulièrement lié à Apollon et à la divination.",
    "Dans un récit, Apollon envoie un corbeau chercher de l'eau pour accomplir un sacrifice. Mais l'oiseau s'attarde auprès d'un figuier, mange les figues et revient trop tard. Pour se justifier, il accuse un serpent d'avoir empêché sa mission.",
    "Apollon comprend le mensonge et punit le corbeau. Il aurait alors noirci son plumage et placé le corbeau, le serpent et la coupe dans le ciel sous forme de constellations.",
    "Cette histoire explique mythiquement certaines caractéristiques de l'oiseau tout en renforçant son association avec les présages et le savoir caché.",
    "Le corbeau — ou la corneille, selon les versions — aurait autrefois été l'oiseau d'Athéna, avant d'être banni de sa suite : c'est lui qui vint lui rapporter qu'Érichthonios, l'enfant né du désir déçu d'Héphaïstos, avait été découvert malgré son interdiction de regarder le coffre où elle l'avait caché (voir les fiches « Héphaïstos » et « Érichthonios ») — furieuse d'une nouvelle qu'elle n'avait pas demandée, la déesse chassa l'oiseau bavard et lui préféra désormais la chouette, plus silencieuse.",
    "Le corbeau est donc devenu un symbole de présage, de connaissance, d'observation, de vérité cachée et du monde invisible.",
    "Le corbeau est particulièrement associé à Apollon.",
  ]},
  "abeille":{icon:"🐝",label:"Abeille",category:"Animaux",desc:"Travail, organisation collective, abondance construite patiemment.",links:[],lore:[
    "L'abeille possède une symbolique ancienne liée au travail, à l'organisation et à l'abondance.",
    "Dans la mythologie grecque, les abeilles apparaissent notamment dans les traditions liées à Dionysos et à certaines figures de prêtresses et de nymphes. Le miel était également une offrande précieuse aux divinités.",
    "L'abeille forme une société organisée où chaque individu participe à une œuvre collective. Elle transforme les fleurs en miel et rassemble ainsi les richesses dispersées de la nature.",
    "À Delphes même, les prêtresses de l'oracle étaient parfois appelées Mélissai, « les abeilles » — un nom qui renvoyait à leur pureté et à leur discrétion, à l'image de l'insecte qui butine sans jamais rien gaspiller de ce qu'il recueille.",
    "Elle est devenue une image de travail, d'organisation, de fécondité, d'abondance, de coopération et de transformation de la matière.",
    "L'abeille peut être associée à plusieurs traditions grecques, notamment à Dionysos et aux cultes initiatiques.",
  ]},
  "papillon":{icon:"🦋",label:"Papillon",category:"Animaux",desc:"Transformation, âme, métamorphose accomplie.",links:[],lore:[
    "Le papillon possède une association particulièrement forte avec Psyché.",
    "En grec ancien, psychê signifie à la fois « âme » et « souffle de vie ». Dans l'Antiquité, l'âme humaine pouvait être représentée sous la forme d'un papillon.",
    "Le mythe de Psyché raconte l'histoire d'une mortelle dont les épreuves la conduisent finalement à devenir immortelle et à rejoindre Éros parmi les dieux.",
    "La transformation du papillon — de la chenille enfermée dans sa chrysalide jusqu'à l'être ailé qui en sort — correspond parfaitement à cette idée : quelque chose change de forme pour accéder à une nouvelle existence.",
    "Sur certains vases funéraires grecs, l'âme du défunt est représentée s'échappant du corps sous la forme d'un minuscule papillon ailé — une image qui unit, dans un même souffle, la mort du corps et l'envol de ce qui lui survit.",
    "Le papillon est donc devenu un symbole de transformation, d'âme, de renaissance, d'évolution et de passage vers un nouvel état.",
    "Le papillon est particulièrement associé à Psyché.",
  ]},
  "cerf":{icon:"🦌",label:"Cerf",category:"Animaux",desc:"Nature, intuition, passage entre deux mondes.",links:["artémis","héraclès"],lore:[
    "Le cerf est profondément lié à Artémis, déesse de la chasse, des forêts et des animaux sauvages.",
    "Dans plusieurs récits, les cerfs sont placés sous sa protection. Le plus célèbre est celui du cerf de Cérynie, une bête extraordinaire aux bois d'or et aux sabots d'airain qu'Héraclès doit capturer lors de son troisième travail. Mais le cerf apparaît également dans les récits qui rappellent le pouvoir d'Artémis sur la nature sauvage.",
    "Le mythe d'Actéon montre d'ailleurs l'autre aspect de cette relation : le chasseur surprend Artémis alors qu'elle se baigne. Furieuse, la déesse le transforme en cerf et ses propres chiens le dévorent sans le reconnaître.",
    "La poursuite de la biche de Cérynie dura, dit-on, une année entière avant qu'Héraclès ne parvienne à la capturer vivante et intacte, comme l'exigeait l'oracle — il dut ensuite s'expliquer directement auprès d'Artémis et d'Apollon, furieux qu'on ait touché à un animal qui leur était consacré, avant d'être autorisé à repartir avec elle.",
    "Le cerf devient ainsi une créature située à la frontière entre l'homme et la nature sauvage. Il représente une nature belle et libre, mais qui ne peut être possédée sans conséquences.",
    "Le cerf est devenu un symbole de nature sauvage, d'instinct, d'intuition, de vigilance, de sensibilité et de passage entre le monde humain et le monde naturel.",
    "Le cerf est particulièrement associé à Artémis.",
  ]},
  "taureau":{icon:"🐂",label:"Taureau",category:"Animaux",desc:"Puissance brute, désir irrésistible — et, parfois, ce qu'elle engendre de monstrueux.",links:["zeus","poséidon","minos","pasiphaé"],lore:[
    "Le taureau intervient dans plusieurs métamorphoses parmi les plus célèbres de la mythologie grecque. Zeus, épris de la princesse phénicienne Europe, se changea en taureau d'une blancheur et d'une douceur telles qu'elle grimpa sur son dos sans crainte — avant qu'il ne s'élance dans la mer et l'emporte jusqu'en Crète, où elle lui donna plusieurs fils, dont Minos (voir la fiche « Minos »).",
    "Un autre taureau, offert par Poséidon à ce même Minos devenu roi de Crète pour qu'il le lui sacrifie, était si beau que Minos, incapable de s'en séparer, le garda pour lui et sacrifia un animal ordinaire à la place. En punition, Poséidon rendit folle d'amour pour ce taureau l'épouse de Minos, Pasiphaé (voir la fiche « Pasiphaé ») — de leur union naquit le Minotaure, tête de taureau et corps d'homme, enfermé plus tard dans le Labyrinthe (voir la fiche « Labyrinthe »).",
    "Ce même taureau, devenu incontrôlable, ravagea ensuite la campagne crétoise jusqu'à ce qu'Héraclès le capture vivant lors de son septième travail et le ramène en Grèce continentale — où, relâché, il finira par causer la mort du prince Androgée, déclenchant la guerre entre Athènes et la Crète qui est à l'origine du tribut envoyé au Minotaure.",
    "Le taureau est ainsi devenu un symbole de puissance brute, de désir irrésistible, de fécondité et, selon le contexte, de ce que cette puissance peut engendrer de monstrueux lorsqu'elle échappe à tout contrôle.",
    "Le taureau est particulièrement associé à Zeus, à Poséidon et, par le Minotaure, à Minos et à Pasiphaé.",
  ]},
  "cygne":{icon:"🦢",label:"Cygne",category:"Animaux",desc:"Métamorphose séduisante, beauté qui dissimule un dessein — lié à Zeus.",links:["zeus"],lore:[
    "Le cygne est la forme que prend Zeus pour séduire Léda (voir la fiche « Léda »), reine de Sparte : sous cette apparence trompeusement paisible, il s'unit à elle le même jour que son propre époux, Tyndare.",
    "De cette double union naquirent, selon les traditions les plus répandues, Hélène (voir la fiche « Hélène ») — dont la beauté déclenchera plus tard la guerre de Troie — et les Dioscures Castor et Pollux (voir les fiches « Castor » et « Pollux »), l'un mortel par son père humain, l'autre immortel par Zeus, unis au point de partager leur immortalité à parts égales après la mort de l'un d'eux.",
    "Le cygne est ainsi devenu un symbole de métamorphose séduisante, de beauté qui dissimule un dessein, et d'une naissance double où se mêlent l'humain et le divin.",
    "Le cygne est particulièrement associé à Zeus, par le mythe de Léda.",
  ]},
  "araignée":{icon:"🕷",label:"Araignée",category:"Animaux",desc:"Habileté sans limite, orgueil qui défie trop haut — la punition d'Arachné.",links:["athéna"],lore:[
    "Arachné était une jeune tisserande d'une habileté si extraordinaire qu'elle osa prétendre surpasser Athéna elle-même, déesse du tissage autant que de la sagesse.",
    "Athéna, déguisée en vieille femme, la mit d'abord en garde — en vain. Les deux rivales tissèrent alors chacune une tapisserie : celle d'Athéna glorifiait les dieux de l'Olympe, celle d'Arachné représentait sans détour leurs tromperies et leurs scandales, dont les métamorphoses de Zeus lui-même — changé en taureau ou sous d'autres formes — pour séduire des mortelles (voir la fiche « Taureau »).",
    "Le travail d'Arachné, techniquement parfait, ne laissait rien à reprocher — ce qui rendit la déesse plus furieuse encore. Athéna déchira la tapisserie et frappa la jeune femme, qui, de honte, tenta de se pendre. Prise de pitié au dernier instant, Athéna la sauva de la mort mais la changea en araignée, la condamnant à tisser sans fin, suspendue à son propre fil.",
    "L'araignée est ainsi devenue un symbole d'habileté sans limite, de création patiente, mais aussi d'orgueil qui défie trop haut et de talent qui, pour n'avoir pas su se taire, se retrouve puni jusque dans sa propre perfection.",
    "L'araignée est particulièrement associée à Athéna, par le mythe d'Arachné.",
  ]},
  // Les six animaux qui suivent ont été écrits pour l'Animal représentatif, retiré depuis
  // (voir plus haut, "En fait on va carrément l'enlever" — les fiches elles-mêmes restent,
  // "garde bien les textes écrit sur les animaux") : chaque signe du zodiaque qui EST
  // littéralement un animal dans son mythe fondateur (plutôt qu'une simple association
  // thématique) a sa propre fiche ici.
  "bélier":{icon:"🐏",label:"Bélier",category:"Animaux",desc:"Le bélier à la Toison d'or : sacrifice salvateur, guide céleste, quête à accomplir.",links:["hermès"],lore:[
    "Phrixos et Hellé, les enfants de la reine Néphélé, sont promis au sacrifice par leur belle-mère Ino, qui a fait mentir un oracle pour s'en débarrasser. Pour les sauver, leur mère obtient d'Hermès un bélier extraordinaire à la toison d'or, capable de voler et de parler.",
    "Le bélier emporte les deux enfants dans les airs, loin du danger. En chemin, Hellé, prise de vertige, tombe dans le détroit qui portera désormais son nom, l'Hellespont — seul Phrixos achève le voyage, jusqu'en Colchide, à l'autre bout du monde connu.",
    "En remerciement d'avoir eu la vie sauve, Phrixos sacrifie le bélier à Zeus et suspend sa toison, devenue d'or, à un arbre sacré gardé par un dragon qui ne dort jamais.",
    "C'est cette même Toison d'or que Jason ira chercher des générations plus tard à la tête des Argonautes, avec l'aide décisive de la magicienne Médée (voir la fiche « Jason »).",
    "En mémoire du sacrifice, Zeus place le bélier parmi les étoiles : il devient la constellation, puis le signe, du Bélier.",
    "Le bélier est ainsi devenu un symbole de sacrifice salvateur, de protection accordée aux plus faibles, de voyage périlleux et de quête à mener jusqu'au bout.",
    "Le bélier est particulièrement associé à Hermès, qui offre l'animal salvateur, et à Zeus, qui le place parmi les étoiles.",
  ]},
  "crabe":{icon:"🦀",label:"Crabe",category:"Animaux",desc:"Envoyé par Héra contre Héraclès : loyauté obstinée, sacrifice sans éclat.",links:["héra","héraclès"],lore:[
    "Le crabe apparaît dans le deuxième des douze travaux d'Héraclès, lorsque le héros affronte l'hydre de Lerne, un monstre à plusieurs têtes dont deux repoussent à chaque fois qu'une seule est tranchée (voir la fiche « Héraclès »).",
    "Héra, qui poursuit Héraclès d'une haine implacable depuis sa naissance, envoie alors un crabe géant lui pincer le pied pour le distraire pendant le combat.",
    "Héraclès, sans même interrompre son geste, écrase le crabe sous son talon — un détail presque anecdotique au milieu d'un combat autrement titanesque, mais qui n'échappe pas à la reconnaissance d'Héra.",
    "En remerciement de cette loyauté, même vaine, la déesse place le crabe parmi les étoiles : il devient la constellation, puis le signe, du Cancer.",
    "Le crabe est ainsi devenu un symbole de loyauté obstinée, de sacrifice sans éclat au service d'une cause plus grande que soi, et de protection têtue même quand l'issue est perdue d'avance.",
    "Le crabe est particulièrement associé à Héra, qui l'envoie contre Héraclès et le récompense malgré son échec.",
  ]},
  "lion":{icon:"🦁",label:"Lion",category:"Animaux",desc:"Lié à Héraclès : courage, force domptée sans violence gratuite.",links:["héraclès"],lore:[
    "Le lion est lié à Héraclès à travers son premier grand exploit : le lion de Némée.",
    "Cette créature monstrueuse ravageait la région de Némée et possédait une peau que les armes ordinaires ne pouvaient transpercer. Héraclès dut finalement l'affronter à mains nues et l'étouffa.",
    "Après avoir vaincu le lion, il utilisa ses propres griffes pour découper sa peau, qu'il porta ensuite comme une armure. La dépouille du monstre devint ainsi le signe visible de sa force et de son triomphe.",
    "Zeus aurait ensuite placé le lion de Némée parmi les étoiles, où il devint la constellation, puis le signe, du Lion — un rappel céleste, comme pour le corbeau ou le dauphin, que certains exploits méritent d'être fixés dans le ciel pour ne jamais être oubliés.",
    "Le lion est devenu un symbole de courage, de puissance, de force, de victoire et de dépassement de l'impossible.",
    "Le lion est particulièrement associé à Héraclès.",
  ]},
  "scorpion":{icon:"🦂",label:"Scorpion",category:"Animaux",desc:"Envoyé par Apollon contre Orion : jalousie protectrice, mise à distance éternelle.",links:["apollon","artémis"],lore:[
    "Le scorpion apparaît dans le mythe d'Orion, le chasseur géant devenu le compagnon de chasse d'Artémis — une complicité si grande qu'Apollon, craignant de voir sa sœur s'éprendre d'un mortel, décide d'y mettre fin (voir la fiche « Orion »).",
    "Apollon lance un scorpion géant à la poursuite d'Orion, qui ne parvient à lui échapper qu'en se jetant à la mer.",
    "Désignant alors à Artémis une forme sombre qui nage au loin sans lui révéler qui elle est, Apollon met sa sœur au défi de l'atteindre de ses flèches — elle vise juste, sans jamais savoir qu'elle vient de tuer celui qu'elle aimait.",
    "Bouleversée, Artémis obtient qu'Orion soit placé parmi les étoiles ; le scorpion y est envoyé lui aussi, mais assez loin pour que les deux constellations ne se lèvent jamais ensemble dans le ciel.",
    "Le scorpion est ainsi devenu un symbole de jalousie protectrice, de piège tendu par ruse plutôt que par force, et de mise à distance qui dure jusque dans le ciel.",
    "Le scorpion est particulièrement associé à Apollon, qui l'envoie contre Orion, et à Artémis, malgré elle.",
  ]},
  "chèvre":{icon:"🐐",label:"Chèvre",category:"Animaux",desc:"Amalthée, qui nourrit Zeus enfant en secret : dévouement discret, protection généreuse.",links:["zeus"],lore:[
    "La chèvre est liée à Amalthée, qui nourrit Zeus de son lait alors qu'il est encore nourrisson, caché dans une grotte du mont Ida en Crète pour échapper à son père Cronos, qui dévore ses propres enfants (voir la fiche « Grotte »).",
    "En jouant avec elle, le jeune Zeus lui brise accidentellement une corne. Pour se faire pardonner, il la dote d'un pouvoir merveilleux : produire indéfiniment tout ce que son propriétaire peut désirer — c'est la naissance de la corne d'abondance (voir la fiche « Corne d'abondance »).",
    "Devenu roi des dieux, Zeus n'oublie pas ce dévouement discret : il place Amalthée elle-même parmi les étoiles, sous la forme de la constellation, puis du signe, du Capricorne.",
    "La chèvre est ainsi devenue un symbole de dévouement discret, de protection généreuse offerte sans rien attendre en retour, et de tendresse qui traverse même l'enfance d'un dieu.",
    "La chèvre est particulièrement associée à Zeus, par l'intermédiaire d'Amalthée.",
  ]},
  "poisson":{icon:"🐟",label:"Poisson",category:"Animaux",desc:"Aphrodite et Éros changés en poissons pour fuir Typhon : fuite salvatrice, lien qui ne se rompt pas.",links:["aphrodite","éros"],lore:[
    "Le mythe des poissons du zodiaque met en scène Aphrodite et son fils Éros, surpris par l'arrivée soudaine de Typhon, le monstre le plus terrifiant jamais enfanté par Gaïa, capable de faire fuir jusqu'aux dieux de l'Olympe.",
    "Pour lui échapper, Aphrodite et Éros se jettent dans l'Euphrate et se changent en poissons — certaines versions racontent qu'ils s'attachent l'un à l'autre par une corde, pour ne jamais se perdre dans la fuite.",
    "Les deux poissons, unis par ce lien, sont ensuite placés parmi les étoiles : ils deviennent la constellation, puis le signe, des Poissons.",
    "Le poisson est ainsi devenu un symbole de fuite salvatrice devant un danger qui dépasse même les dieux, et de lien qui résiste à la panique et ne se rompt jamais.",
    "Le poisson est particulièrement associé à Aphrodite et à Éros, unis dans cette fuite commune.",
  ]},

  // Plantes & végétaux
  "laurier":{icon:"🌿",label:"Laurier",category:"Plantes",desc:"Victoire, gloire, accomplissement mérité après l'effort.",links:["apollon","éros"],lore:[
    "Le laurier est intimement lié à Apollon. Selon le mythe, Apollon, frappé d'une flèche d'or par Éros après l'avoir raillé sur son habileté à l'arc (voir la fiche « Éros »), tomba éperdument amoureux de la nymphe Daphné — elle-même atteinte d'une flèche de plomb qui la rendit incapable de l'aimer en retour. Daphné, refusant ses avances, demanda à être sauvée et fut transformée en laurier par son père, le dieu-fleuve Pénée.",
    "Apollon, comprenant qu'il ne pourrait jamais l'avoir, déclara alors que le laurier lui serait désormais consacré. Il en porta une couronne et en fit un arbre sacré.",
    "Les Grecs offrirent ensuite des couronnes de laurier aux vainqueurs, aux poètes et à ceux qui avaient accompli de grandes choses. À Delphes, le laurier était également associé aux pratiques prophétiques d'Apollon.",
    "Les jeux Pythiques, célébrés tous les quatre ans à Delphes en l'honneur d'Apollon, récompensaient ainsi leurs vainqueurs — musiciens, poètes et athlètes — d'une couronne de laurier coupé dans la vallée voisine de Tempé, là où, selon la légende, Apollon lui-même s'était purifié après avoir tué le serpent Python (voir la fiche « Serpent »).",
    "Le laurier est ainsi devenu un symbole de victoire, de gloire, d'accomplissement, de poésie, de prophétie et de reconnaissance.",
    "Le laurier est particulièrement associé à Apollon et à Daphné.",
  ]},
  "olivier":{icon:"🫒",label:"Olivier",category:"Plantes",desc:"Paix, sagesse, prospérité durable.",links:["athéna","poséidon"],lore:[
    "L'olivier est lié à Athéna et à la naissance symbolique d'Athènes. Lorsque Poséidon et Athéna se disputèrent la protection de la cité, les deux divinités offrirent un présent aux habitants.",
    "Poséidon fit jaillir une source d'eau salée. Athéna planta quant à elle le premier olivier. Les habitants considérèrent ce cadeau comme plus précieux, car l'arbre pouvait leur donner de la nourriture, de l'huile, du bois et de la lumière.",
    "Athéna devint ainsi la protectrice de la cité, qui prit son nom : Athènes.",
    "Les oliviers sacrés d'Athènes, descendants directs de celui planté par Athéna, étaient protégés par une loi si stricte que déraciner l'un d'eux, même sur son propre terrain, pouvait valoir l'exil à son propriétaire — preuve que ce don, des siècles après le mythe, restait toujours traité comme un bien appartenant à la cité entière plutôt qu'à un seul homme.",
    "L'olivier est devenu le symbole de la paix, de la sagesse, de la prospérité, de la civilisation et de la protection divine.",
    "L'olivier est particulièrement associé à Athéna.",
  ]},
  "blé":{icon:"🌾",label:"Blé",category:"Plantes",desc:"Récolte, travail, nourriture, cycle des saisons.",links:["déméter","perséphone","triptolème"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "Déméter choisit un jour un jeune prince éleusinien, Triptolème, pour répandre ce savoir à travers le monde : elle lui offrit un char tiré par des dragons ailés et des graines de blé, avec pour mission d'enseigner aux hommes, où qu'ils se trouvent, l'art de cultiver la terre — un don qui fit de lui l'un des personnages centraux des Mystères d'Éleusis.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "cyprès":{icon:"🌲",label:"Cyprès",category:"Plantes",desc:"Mort, mémoire, passage — arbre funéraire qui reste vert toute l'année.",links:["hadès","apollon"],lore:[
    "Le cyprès possède une association très forte avec la mort et le monde funéraire dans l'Antiquité grecque : planté aux abords des tombeaux, son feuillage qui ne tombe jamais en fit l'arbre de la permanence du deuil, dressé à la frontière entre le monde des vivants et celui d'Hadès (voir la fiche « Hadès »).",
    "Un des récits les plus célèbres est celui de Cyparisse, un jeune homme aimé d'Apollon. Il possédait un cerf qu'il aimait profondément. Après avoir tué accidentellement l'animal, Cyparisse fut inconsolable et demanda à pouvoir pleurer éternellement.",
    "Apollon le transforma alors en cyprès.",
    "Le cyprès devint ainsi l'arbre du deuil et du souvenir. Son feuillage persistant et sa silhouette qui s'élève vers le ciel renforcèrent encore cette association avec la mort, la mémoire et le passage vers l'au-delà.",
    "Le bois de cyprès, réputé quasiment imputrescible, était d'ailleurs concrètement utilisé pour fabriquer cercueils et sarcophages dans l'Antiquité — une propriété bien réelle qui renforçait encore, très concrètement, son lien avec la mort et la permanence au-delà du corps.",
    "Le cyprès est devenu un symbole de mort, de deuil, de mémoire, de passage et de permanence du souvenir.",
    "Le cyprès est particulièrement associé à Hadès et au monde funéraire, ainsi qu'à Apollon à travers le mythe de Cyparisse.",
  ]},
  "rose":{icon:"🌹",label:"Rose",category:"Plantes",desc:"Amour, beauté, désir — et la vulnérabilité qui va avec.",links:["aphrodite"],lore:[
    "La rose est principalement associée à Aphrodite, déesse de l'amour et de la beauté.",
    "Dans certaines traditions mythologiques, les roses seraient apparues à travers les histoires liées à Aphrodite et à ceux qu'elle aimait. Leur beauté, leur parfum et leurs épines correspondent parfaitement à la double nature de l'amour : attirant et merveilleux, mais capable aussi de blesser.",
    "La couleur rouge a progressivement renforcé l'association entre la rose et le désir, le sang, la passion et l'amour charnel.",
    "Un mythe précis explique même cette couleur : en courant pieds nus porter secours à Adonis mortellement blessé par un sanglier, Aphrodite se serait blessée sur les épines d'un rosier jusque-là blanc — son sang aurait alors teint les fleurs d'un rouge qu'elles n'ont plus jamais perdu.",
    "La rose est donc devenue un symbole de l'amour, de la beauté, du désir, de la passion mais aussi de la vulnérabilité et de la douleur qui peuvent accompagner l'amour.",
    "La rose est particulièrement associée à Aphrodite.",
  ]},
  "myrte":{icon:"🌸",label:"Myrte",category:"Plantes",desc:"Amour, mariage — liée à Aphrodite.",links:["aphrodite"],lore:[
    "Le myrte est une plante sacrée d'Aphrodite.",
    "Selon une tradition, lorsqu'Aphrodite sortit de la mer, elle aurait cherché à dissimuler sa nudité derrière des branches de myrte. L'arbuste devint alors l'un de ses végétaux sacrés.",
    "Le myrte était également utilisé lors des mariages et des cérémonies liées à l'amour. Il représentait une union durable et la fécondité du couple.",
    "Une tradition raconte même qu'un satyre l'aurait un jour épiée alors qu'elle se baignait, cachée derrière des branches de myrte insuffisamment épaisses pour la dissimuler tout à fait — une pudeur trahie qui n'a jamais empêché l'arbuste de rester associé à elle depuis.",
    "Il est ainsi devenu un symbole de l'amour, du mariage, de la beauté, de la fécondité et de l'union.",
    "Le myrte est particulièrement associé à Aphrodite.",
  ]},
  "lierre":{icon:"🍃",label:"Lierre",category:"Plantes",desc:"Attachement, immortalité — lié à Dionysos.",links:["dionysos"],lore:[
    "Le lierre est l'une des plantes les plus fortement liées à Dionysos.",
    "Contrairement à la vigne, qui disparaît pendant l'hiver avant de renaître, le lierre reste vert et continue de s'accrocher aux arbres et aux pierres. Cette résistance lui a donné une dimension d'immortalité et de permanence.",
    "Les cortèges de Dionysos sont souvent représentés avec du lierre, porté en couronne ou utilisé pour orner les thyrses et les objets rituels.",
    "Selon une tradition, le lierre aurait protégé Dionysos enfant en poussant si vite autour de son berceau qu'il le dissimula entièrement aux yeux d'Héra, furieuse de la naissance de ce fils illégitime de Zeus — un geste de protection végétale qui explique pourquoi la plante lui reste depuis indéfectiblement attachée.",
    "Le lierre est ainsi devenu un symbole de Dionysos, de l'attachement, de la vitalité, de l'immortalité et de ce qui survit au passage du temps.",
    "Le lierre est particulièrement associé à Dionysos.",
  ]},
  "lotus":{icon:"🪷",label:"Lotus",category:"Plantes",desc:"Émergence, purification, renaissance depuis les eaux troubles.",links:[],lore:[
    "Le lotus possède une symbolique particulière parce qu'il pousse dans la boue et l'eau avant de faire apparaître une fleur à la surface.",
    "Dans l'imaginaire antique, cette capacité à émerger d'un milieu sombre pour s'ouvrir à la lumière pouvait évoquer la purification et la renaissance.",
    "Il faut toutefois être prudent avec l'association directe entre le lotus et une divinité grecque précise : le « lotus » des textes grecs ne correspond pas nécessairement à la fleur de lotus telle qu'on la représente aujourd'hui. Chez Homère, les Lotophages sont notamment un peuple dont la nourriture provoque l'oubli et le désir de ne plus retourner chez soi.",
    "Homère précise que ce fruit était si doux que quiconque y goûtait perdait aussitôt tout désir de rentrer chez soi et tout souvenir du chemin du retour — les compagnons d'Ulysse qui en mangèrent durent être ramenés de force, en pleurs, jusqu'aux navires.",
    "Il peut ainsi représenter émergence, purification, renaissance, oubli et transformation.",
  ]},
  "pavot":{icon:"🌺",label:"Pavot",category:"Plantes",desc:"Sommeil, oubli, rêve — ce qui apaise mais peut aussi endormir la vigilance.",links:["hypnos","morphée"],lore:[
    "Le pavot est lié à plusieurs divinités, notamment Déméter et Perséphone, et à l'univers du sommeil et de l'oubli.",
    "Ses propriétés soporifiques étaient connues dans l'Antiquité. La fleur pouvait donc symboliser le sommeil, l'apaisement et l'oubli.",
    "Dans le contexte du mythe de Déméter et de Perséphone, le pavot est également associé à la fertilité et aux mystères liés à la terre. Il peut ainsi relier le sommeil de l'être humain au repos de la nature avant son réveil.",
    "Le pavot est aussi l'attribut d'Hypnos, dieu du Sommeil, et de son fils Morphée (voir la fiche « Morphée »), qu'on représente parfois une tige de pavot à la main ou une couronne de ces mêmes fleurs sur la tête — un lien si étroit entre la plante et le sommeil qu'il a traversé les siècles jusque dans le vocabulaire médical de l'opium et de la morphine.",
    "Le pavot est devenu un symbole de sommeil, d'oubli, de rêve, d'apaisement et de passage entre deux états.",
    "Le pavot peut être particulièrement associé à Déméter et Perséphone — et, par son usage le plus direct, à Hypnos et à son fils Morphée.",
  ]},
  "crocus":{icon:"🌼",label:"Fleur de crocus",category:"Plantes",desc:"Renouveau, printemps, transformation qui recommence.",links:[],lore:[
    "Le crocus est lié à une histoire de transformation particulièrement tragique.",
    "Selon le mythe, Crocos était un jeune homme associé à Hermès. Après sa mort accidentelle, il fut transformé en fleur. Dans certaines traditions, la fleur apparaît également dans les récits liés à Perséphone et à son retour saisonnier.",
    "Le crocus fleurit très tôt, parfois alors que l'hiver n'est pas encore totalement terminé. Il est donc naturellement devenu une image du retour de la vie après une période de froid et d'immobilité.",
    "Dans l'Iliade, Homère décrit le sol se couvrant spontanément de crocus, de lotus et de jacinthe tendre au moment où Zeus et Héra s'unissent sur le mont Ida — comme si la terre elle-même célébrait, par ses fleurs les plus fragiles, l'union du roi et de la reine des dieux.",
    "Sa floraison précoce permet d'en faire un symbole de renouveau, de printemps, de transformation et de renaissance après une période sombre.",
    "Le crocus est particulièrement intéressant pour représenter la transformation : quelque chose meurt ou disparaît, puis réapparaît sous une autre forme.",
  ]},
  "chêne":{icon:"🌳",label:"Chêne",category:"Plantes",desc:"Arbre sacré de Zeus : force tranquille, sagesse qui parle par le vent plutôt que par des mots clairs.",links:["zeus"],lore:[
    "Le chêne est l'arbre sacré de Zeus, et le plus ancien oracle de toute la Grèce, celui de Dodone, en Épire, lui était entièrement consacré.",
    "Contrairement à Delphes, où la Pythie prononçait des paroles, l'oracle de Dodone rendait ses réponses par le simple bruissement des feuilles d'un chêne sacré planté au cœur du sanctuaire — des prêtres appelés Selloi interprétaient ensuite ce murmure pour en tirer un sens destiné aux pèlerins venus consulter le dieu.",
    "Sa solidité, sa longévité et ses racines profondément ancrées dans le sol en ont naturellement fait l'image d'une force tranquille, capable de résister aux tempêtes les plus violentes sans jamais rompre.",
    "Le chêne est ainsi devenu un symbole de force stable, de sagesse ancienne, de protection divine et d'une vérité qui se murmure plutôt qu'elle ne s'impose.",
    "Le chêne est particulièrement associé à Zeus.",
  ]},

  // Fruits & graines
  "raisin":{icon:"🍇",label:"Raisin",category:"Fruits & graines",desc:"Abondance, plaisir partagé, transformation par la fermentation.",links:["dionysos"],lore:[
    "Le raisin est le fruit de Dionysos. Il concentre tout ce que représente la vigne : abondance, plaisir et transformation.",
    "Le raisin fraîchement cueilli devient du vin après fermentation. Ce changement physique fascinait les anciens et correspond parfaitement à l'univers de Dionysos : quelque chose de naturel se transforme en une substance capable de modifier profondément l'état de celui qui la consomme.",
    "Un vin resté célèbre dans l'Odyssée est celui que le prêtre Maron offre à Ulysse : si fort qu'il fallait le couper avec vingt parts d'eau, c'est lui qu'Ulysse utilise pour enivrer le Cyclope Polyphème avant de lui crever son unique œil et de s'échapper de sa caverne.",
    "Le raisin symbolise donc l'abondance, le plaisir, la transformation, la fête et l'ivresse.",
    "Le raisin est particulièrement associé à Dionysos.",
  ]},
  "olive":{icon:"🫒",label:"Olive",category:"Fruits & graines",desc:"Le fruit concret du don d'Athéna : nourriture, huile, paix, prospérité.",links:["athéna"],lore:[
    "L'olive est le fruit de l'arbre offert par Athéna à la cité d'Athènes.",
    "Elle représente donc la partie concrète du don d'Athéna : une nourriture, une huile précieuse, une source de lumière et un produit essentiel à la vie quotidienne.",
    "Elle porte la symbolique de l'olivier mais de manière plus directement liée à la prospérité, à la nourriture, à la paix et aux bienfaits de la civilisation.",
    "Lors des Jeux panathénaïques d'Athènes, les vainqueurs des épreuves sportives recevaient comme récompense de grandes amphores remplies d'huile d'olive sacrée, pressée des oliviers issus directement de celui planté par Athéna — un prix aussi précieux que pratique, puisque cette huile pouvait ensuite être vendue ou échangée dans tout le monde grec.",
    "L'olive est particulièrement associée à Athéna.",
  ]},
  "figue":{icon:"🫐",label:"Figue",category:"Fruits & graines",desc:"Fécondité douce, plaisir simple, maturité assumée.",links:[],lore:[
    "La figue était un fruit important dans le monde grec et était liée à la fertilité et à l'abondance.",
    "Son apparence est elle-même particulière : ce que nous appelons une « figue » est en réalité une structure remplie de nombreuses petites fleurs devenues fruits. Elle contient donc une multitude de graines cachées à l'intérieur.",
    "Cette richesse intérieure en a fait un fruit naturellement associé à la fécondité, à l'abondance et à la prospérité.",
    "Le figuier était aussi associé à Dionysos : lors des processions rituelles en son honneur, on portait des représentations en bois de figuier taillées en forme phallique, symboles explicites de la fécondité que le dieu était censé répandre sur la terre et les hommes.",
    "La figue peut donc représenter fertilité, abondance, nourriture, richesse cachée et fécondité de la terre.",
  ]},
  "pomme":{icon:"🍎",label:"Pomme",category:"Fruits & graines",desc:"Beauté, désir et rivalité — le fruit du jugement de Pâris.",links:["aphrodite","héraclès"],lore:[
    "La pomme possède plusieurs associations mythologiques grecques.",
    "La plus célèbre est sans doute la pomme d'or offerte par Eris lors du mariage de Pélée et Thétis. La déesse de la Discorde lança la pomme portant l'inscription destinée « à la plus belle », ce qui déclencha la rivalité entre Héra, Athéna et Aphrodite et conduisit finalement au jugement de Pâris (voir la fiche « Pâris »).",
    "La pomme devient alors le fruit de la beauté, du désir, de la rivalité et du choix.",
    "Les pommes d'or du jardin des Hespérides sont également liées à Héraclès et à l'immortalité.",
    "Ces mêmes pommes d'or jouent aussi un rôle décisif dans la course d'Atalante (voir la fiche « Atalante ») : pour la ralentir, Hippomène en laisse tomber trois devant elle, empruntées au jardin des Hespérides, et c'est en s'arrêtant chaque fois pour les ramasser qu'elle finit par perdre la course — et gagner, du même geste, un mari à sa mesure.",
    "La pomme peut donc représenter beauté, désir, tentation, rivalité, choix et immortalité.",
  ]},
  "noix":{icon:"🌰",label:"Noix",category:"Fruits & graines",desc:"Ce qui reste protégé, caché, réservé à qui sait ouvrir la coque.",links:[],lore:[
    "La noix est particulièrement intéressante parce qu'elle possède une coque dure qui protège une nourriture cachée à l'intérieur.",
    "Dans le symbolisme antique, cette structure pouvait naturellement évoquer ce qui est dissimulé, protégé ou réservé à celui qui sait ouvrir la coque.",
    "Le noyer porte en réalité un mythe précis, moins connu que celui de la grenade ou du laurier : Carya, princesse de Laconie aimée de Dionysos, mourut et fut changée par le dieu en noyer. Les Dioscures, informés par Artémis, en avertirent les Spartiates, qui lui élevèrent un temple et sculptèrent en son honneur des colonnes en forme de jeunes femmes — les caryatides, dont le nom vient directement du grec karya, « noyer ».",
    "Elle reste ainsi un symbole de ce qui est dissimulé, protégé, réservé à celui qui sait ouvrir la coque — et, par Carya, d'un amour que même la mort n'a pas empêché de rester visible.",
  ]},
  "graine":{icon:"🌱",label:"Graine",category:"Fruits & graines",desc:"Potentiel pur, ce qui n'a pas encore germé mais porte déjà toute la forme à venir.",links:[],lore:[
    "Elle semble morte lorsqu'elle est enfouie dans la terre. Pourtant, elle contient déjà la possibilité d'une nouvelle plante. Elle disparaît donc temporairement pour réapparaître sous une autre forme.",
    "Cette idée rejoint parfaitement les grands cycles de la mythologie grecque : Perséphone descend sous la terre puis revient, les champs meurent en hiver puis renaissent au printemps, et la terre recommence chaque année son œuvre.",
    "Une tradition précise même le nombre de ces graines : selon certaines versions du mythe, Perséphone en aurait avalé six, ce qui explique pourquoi elle doit passer six mois de l'année aux Enfers avant de remonter passer les six autres auprès de sa mère — un compte exact pour un mythe qui explique, graine par graine, le rythme même des saisons.",
    "La graine peut ainsi représenter le potentiel, le commencement, la gestation, la transformation, la mort apparente et la renaissance.",
  ]},

  // Éléments
  "feu":{icon:"🔥",label:"Feu",category:"Éléments",desc:"Flamme, étincelle, soleil, fumée : action, volonté, élan.",links:["prométhée","hestia"],lore:[
    "Le feu occupe une place unique dans la mythologie grecque : c'est le seul élément que les dieux ont d'abord refusé aux hommes.",
    "Prométhée le déroba à l'Olympe, caché dans une tige de fenouil, pour l'offrir à l'humanité — un geste qui lui valut d'être retenu par une chaîne pour l'éternité (voir la fiche « Chaîne »). Le feu devint ainsi le premier outil véritablement humain, celui qui permit la technique, la cuisson, la métallurgie et la civilisation elle-même.",
    "Le philosophe Empédocle en fit plus tard l'une des quatre racines de toute matière, aux côtés de l'eau, de l'air et de la terre — une théorie qui a nourri toute la pensée grecque sur la nature du monde, bien après les mythes qui l'avaient d'abord racontée.",
    "Ce feu volé devait aussi être entretenu sans jamais s'éteindre : dans chaque cité grecque, une flamme perpétuelle brûlait au prytanée, sous la garde d'Hestia (voir la fiche « Hestia »), et les colons qui partaient fonder une nouvelle ville emportaient toujours un peu de cette braise pour allumer le premier feu de leur nouveau foyer.",
    "Le feu est devenu un symbole d'action, de volonté, d'élan — et du prix qu'il faut parfois payer pour ce qu'on ose transmettre.",
  ]},
  "eau":{icon:"💧",label:"Eau",category:"Éléments",desc:"Source, rivière, vague, pluie, miroir : émotion, relation, ce qui circule.",links:[],lore:[
    "L'eau est, dans la mythologie grecque, l'élément qui traverse aussi bien le monde des vivants que celui des morts : les fleuves des Enfers (Styx, Léthé, Achéron) sont tous des cours d'eau, et c'est sur l'eau du Styx que les dieux prêtaient leurs serments les plus sacrés.",
    "Elle est aussi le domaine de Poséidon et de tout un peuple de divinités marines et fluviales, des Néréides aux dieux-fleuves, qui montrent que l'eau n'est jamais un simple décor mais un ensemble de forces vivantes.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'air et de la terre — l'élément de ce qui coule, se mêle et jamais ne reste immobile.",
    "À Delphes, les pèlerins venus consulter l'oracle devaient d'abord se purifier dans les eaux de la source Castalie, au pied du mont Parnasse — un geste rituel qui rappelle qu'aucune parole divine ne pouvait être reçue sans être, au préalable, purifiée par l'eau.",
    "L'eau est devenue un symbole d'émotion, de relation et de ce qui circule sans jamais s'arrêter tout à fait.",
  ]},
  "air":{icon:"🌬",label:"Air",category:"Éléments",desc:"Vent, souffle, plume, nuage : pensée, décision, clarté mentale.",links:["hermès","iris","borée","zéphyr"],lore:[
    "L'air, dans la mythologie grecque, est le domaine où circulent les messages : c'est par les airs qu'Hermès porte ses nouvelles et qu'Iris tend son arc-en-ciel entre le ciel et la terre.",
    "C'est aussi le souffle (pneuma) que les Anciens associaient à la vie elle-même et, plus tard, à la pensée et à l'inspiration — respirer et penser relevaient d'un même principe invisible.",
    "Les quatre vents cardinaux, les Anémoi, personnifient directement cet air en mouvement : Borée au nord (voir la fiche « Borée »), Notos au sud, Euros à l'est et Zéphyr à l'ouest (voir la fiche « Zéphyr »), chacun soufflant avec un caractère bien distinct, du plus brutal au plus doux.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de la terre — l'élément qu'on ne voit jamais directement, mais dont les effets se sentent partout.",
    "L'air est devenu un symbole de pensée, de décision et de clarté mentale — ce qui circule sans jamais se laisser saisir.",
  ]},
  "terre":{icon:"🌿",label:"Terre",category:"Éléments",desc:"Racine, pierre, sol, montagne : matière, croissance, incarnation concrète.",links:["gaïa","déméter"],lore:[
    "La terre est, dans la mythologie grecque, une puissance primordiale : Gaïa, la Terre elle-même, engendre en premier le Ciel (Ouranos) et donne naissance à toutes les générations divines qui suivront, y compris les Titans et, à travers eux, les dieux de l'Olympe.",
    "Elle est aussi le domaine de Déméter, déesse des moissons, dont le chagrin après l'enlèvement de Perséphone rend la terre stérile chaque année, avant que son retour ne la fasse à nouveau produire.",
    "Le géant Antée, fils de Gaïa et de Poséidon, tirait toute sa force du contact avec sa mère la Terre : invincible tant qu'il restait au sol, il ne fut vaincu par Héraclès que lorsque celui-ci comprit qu'il fallait le soulever à bout de bras, le coupant ainsi de la source même de sa puissance, pour pouvoir enfin l'étouffer.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de l'air — l'élément le plus stable, celui qui porte et nourrit tous les autres.",
    "La terre est devenue un symbole de matière, de croissance et d'incarnation concrète — ce qui accueille, porte et fait pousser.",
  ]},

  // Astres & phénomènes
  "soleil":{icon:"☀",label:"Soleil",category:"Astres & phénomènes",desc:"Clarté, conscience, vitalité, vérité qui n'a plus besoin de se cacher.",links:["hélios"],lore:[
    "Le soleil est le corps même d'Hélios, qui traverse chaque jour le ciel sur son char de feu, voyant tout ce qui se passe sur terre sans qu'aucun secret ne puisse lui échapper.",
    "Son fils Phaéton, voulant un jour conduire le char à sa place, en perdit le contrôle et faillit embraser la terre entière — un rappel que la lumière qui révèle tout est aussi une force qu'il faut savoir maîtriser.",
    "Le soleil ne se cache jamais : c'est précisément ce qui en fait, dans cette mythologie, le témoin par excellence, celui devant qui rien ne reste dans l'ombre.",
    "C'est lui, dit-on, qui surprit un jour Arès et Aphrodite dans les bras l'un de l'autre et le rapporta aussitôt à Héphaïstos, l'époux trompé (voir les fiches « Arès » et « Aphrodite ») — une preuve concrète que rien, dans cette mythologie, n'échappe longtemps au regard du Soleil.",
    "Il est devenu un symbole de clarté, de conscience, de vitalité et de vérité qui n'a plus besoin de se cacher.",
    "Le soleil est particulièrement associé à Hélios.",
  ]},
  "lune":{icon:"🌙",label:"Lune",category:"Astres & phénomènes",desc:"Inconscient, intuition, cycles, incertitude qui n'empêche pas d'avancer.",links:["séléné","métis"],lore:[
    "La lune est le corps de Séléné, qui traverse le ciel nocturne comme son frère Hélios traverse le ciel diurne.",
    "Son mythe le plus connu est celui d'Endymion, berger d'une beauté si parfaite que Séléné, tombée amoureuse, obtint pour lui un sommeil éternel plutôt que la mort — afin de pouvoir continuer, chaque nuit, à venir le contempler.",
    "La lune porte aussi la trace de Métis, titanide de la ruse et de la sagesse cachée : un savoir qui, comme la lune elle-même, ne se montre jamais tout entier d'un coup, mais se dévoile par phases.",
    "Un mythe plus étrange lui prête aussi une autre conquête : le dieu Pan, désireux de la séduire, se serait déguisé en bélier à la toison d'un blanc éclatant pour l'attirer dans les bois et gagner ses faveurs — preuve que même la lune, réputée insaisissable, pouvait se laisser surprendre par la ruse.",
    "Elle est devenue un symbole d'inconscient, d'intuition, de cycles et d'incertitude qui n'empêche pas d'avancer.",
    "La lune est particulièrement associée à Séléné et à Métis.",
  ]},
  "étoiles":{icon:"✦",label:"Étoile",category:"Astres & phénomènes",desc:"Orientation, espoir, inspiration retrouvée après l'épreuve.",links:["hécate","astéria","éos","cassiopée"],lore:[
    "Les étoiles se rattachent à Hécate par sa mère, Astéria, titanide dont le nom signifie littéralement « étoilée ».",
    "Pour échapper aux avances de Zeus, Astéria se jeta dans la mer et fut changée en île — Délos, selon certaines traditions — après avoir été un temps assimilée aux étoiles filantes. Sa fille Hécate hérita de cette proximité avec le ciel nocturne et l'orientation qu'il offre à qui sait le lire.",
    "Contrairement au soleil qui révèle tout d'un coup, les étoiles n'éclairent que faiblement — mais elles suffisent à orienter celui qui a perdu son chemin dans l'obscurité.",
    "Le chasseur Orion, aimé un temps par Éos (voir la fiche « Éos »), fut lui aussi placé parmi les étoiles après sa mort, sous la forme d'une des constellations les plus reconnaissables du ciel nocturne — un ceinturon de trois étoiles alignées que l'on retrouve, presque inchangé, sur toutes les cartes du ciel depuis l'Antiquité.",
    "Toutes les constellations ne sont pas des récompenses : la reine Cassiopée, punie pour s'être vantée d'une beauté supérieure à celle des Néréides, fut elle aussi placée parmi les étoiles, mais condamnée à y tourner la tête en bas une bonne partie de l'année (voir la fiche « Cassiopée »).",
    "Elles sont devenues un symbole d'orientation, d'espoir et d'inspiration retrouvée après l'épreuve — mais aussi, parfois, de mémoire durable d'une faute qu'on continue de porter.",
    "Les étoiles sont particulièrement associées à Hécate, par sa mère Astéria, et servent aussi de sanction éternelle à Cassiopée.",
  ]},
  "aurore":{icon:"🌅",label:"Aurore",category:"Astres & phénomènes",desc:"Commencement, renaissance, ce qui redémarre après l'obscurité.",links:["éos","hélios"],lore:[
    "L'aurore est le corps d'Éos, déesse aux doigts de rose qui ouvre chaque jour les portes du ciel pour annoncer le passage d'Hélios.",
    "Éos est aussi connue pour ses amours mortelles, comme Tithonos, à qui elle obtint l'immortalité sans penser à demander aussi l'éternelle jeunesse — un rappel que même un don des dieux peut se retourner si l'on ne pense pas à tout.",
    "Elle pleure aussi un fils tombé à la guerre de Troie, Memnon, roi des Éthiopiens tué par Achille : chaque matin, dit-on, la rosée qui couvre l'herbe n'est autre que les larmes qu'elle continue de verser sur lui, inlassablement, depuis sa mort.",
    "Chaque aurore répète ainsi un même geste : ouvrir à nouveau ce qui semblait clos, redonner une chance après la nuit la plus sombre.",
    "Elle est devenue un symbole de commencement, de renaissance et de ce qui redémarre après l'obscurité.",
  ]},
  "éclipse":{icon:"🌑",label:"Éclipse",category:"Astres & phénomènes",desc:"Obscurcissement temporaire, transition, révélation qui attend son heure.",links:[],lore:[
    "Longtemps, une éclipse fut perçue comme un présage redoutable : le soleil ou la lune s'éteignant sans explication ne pouvait, croyait-on, qu'annoncer un désordre plus grand encore.",
    "C'est un Grec, le philosophe Anaxagore, qui proposa au Ve siècle avant notre ère l'une des premières explications naturelles de ce phénomène : l'éclipse ne serait pas un signe des dieux mais l'ombre portée d'un astre sur un autre — une idée si audacieuse pour son temps qu'elle lui valut d'être accusé d'impiété.",
    "Hérodote raconte qu'une éclipse survenue en pleine bataille entre Lydiens et Mèdes, prédite à l'avance par le philosophe Thalès de Milet, terrifia les deux armées au point de les pousser à conclure la paix sur-le-champ — la première éclipse de l'histoire dont la date peut être calculée avec précision aujourd'hui, à partir de ce seul récit.",
    "L'éclipse raconte ainsi, mieux qu'aucun autre phénomène céleste, le moment où le mythe cède la place à l'explication — sans que le sentiment de mystère ne disparaisse tout à fait.",
    "Elle est devenue un symbole d'obscurcissement temporaire, de transition et de révélation qui attend son heure pour se manifester.",
  ]},
  "éclair":{icon:"⚡",label:"Éclair",category:"Astres & phénomènes",desc:"Révélation brutale, rupture soudaine, énergie qui ne prévient pas.",links:["zeus","poséidon"],lore:[
    "L'éclair partage son origine avec la foudre (voir cette fiche) : c'est l'arme que les Cyclopes forgèrent pour Zeus après sa victoire sur les Titans.",
    "Mais l'éclair est aussi ce qui rend visible, l'espace d'un instant, ce que l'obscurité cachait — une déchirure brève dans la nuit, plutôt que le coup qui suit. Poséidon, de son côté, produit une violence tout aussi soudaine mais depuis le sol : ses coups de trident font trembler la terre avec la même absence totale de préavis.",
    "Zeus dans le ciel, Poséidon sous la terre : à eux deux, ils montrent qu'aucun des deux royaumes, ni le plus haut ni le plus profond, n'est à l'abri d'une violence instantanée.",
    "Un roi mortel, Salmonée, poussa un jour l'orgueil jusqu'à vouloir imiter cette arme : il traînait des chaudrons de bronze derrière son char pour en imiter le tonnerre et lançait des torches enflammées en se proclamant l'égal de Zeus — le vrai dieu, furieux de cette imposture, le foudroya sur-le-champ d'un authentique éclair.",
    "L'éclair est devenu un symbole de révélation brutale, de rupture soudaine et d'énergie qui ne prévient pas.",
    "L'éclair est particulièrement associé à Zeus et à Poséidon.",
  ]},
};
const DEITY_NOTES = {
  "dionysos":"Dieu de la vigne, de l'ivresse sacrée et de la métamorphose.",
  "hermès":"Messager des dieux, passeur rusé entre les mondes.",
  "métis":"Titanide de la ruse et de la sagesse pratique.",
  "héra":"Reine des dieux, protectrice du mariage et de la souveraineté légitime.",
  "zeus":"Roi des dieux, maître de la foudre et garant de l'ordre cosmique.",
  "chiron":"Centaure sage, précepteur de nombreux héros malgré une blessure incurable.",
  "éros":"Dieu du désir et de l'attraction irrésistible.",
  "apollon":"Dieu de la lumière, des arts et de la vérité, maître des oracles de Delphes.",
  "thémis":"Titanide de la loi divine et de la justice, antérieure aux dieux de l'Olympe.",
  "déméter":"Déesse des moissons, mère de Perséphone, à l'origine des saisons.",
  "tyché":"Déesse de la fortune et du hasard.",
  "héraclès":"Héros de la force maîtrisée à travers ses douze travaux.",
  "prométhée":"Titan qui donna le feu aux hommes et fut puni pour ce don.",
  "hadès":"Dieu du monde souterrain, gardien du passage vers une autre existence.",
  "perséphone":"Reine des Enfers une partie de l'année, fille de Déméter.",
  "iris":"Messagère arc-en-ciel entre l'Olympe et la Terre.",
  "pan":"Dieu à moitié bouc, incarnation de l'instinct non policé.",
  "poséidon":"Dieu de la mer et des séismes, capable de rupture soudaine.",
  "hécate":"Déesse des carrefours, de la magie et des passages.",
  "séléné":"Déesse de la lune.",
  "hélios":"Dieu du soleil, conducteur du char céleste.",
  "minos":"Juge des morts aux Enfers, connu pour son impartialité.",
  "gaïa":"Déesse primordiale de la Terre, mère de toutes choses.",
  "chaos":"Le vide originel d'où émergèrent les toutes premières puissances du monde, avant même les dieux.",
  "ouranos":"Le Ciel primordial, époux de Gaïa et père des douze Titans, castré et détrôné par son propre fils Cronos.",
  "nyx":"La Nuit primordiale, mère redoutée d'une lignée de forces sombres — dont le Sommeil, la Mort et la Discorde.",
  "érèbe":"Les Ténèbres primordiales, frère et époux de Nyx, avec qui il engendra le Jour et la lumière céleste.",
  "tartare":"L'abîme le plus profond du monde, aussi loin sous la terre que le ciel l'est d'elle — prison des Titans vaincus.",
  "cronos":"Le plus jeune des Titans, qui détrôna son père Ouranos avant d'être à son tour détrôné par son fils Zeus.",
  "océan":"Titan du fleuve qui encercle le monde entier, père de trois mille fleuves et d'autant d'Océanides.",
  "téthys":"Titanide des eaux douces, épouse d'Océan et mère des fleuves et des Océanides.",
  "hypérion":"Titan de la lumière céleste, père d'Hélios, Séléné et Éos — le Soleil, la Lune et l'Aurore.",
  "théia":"Titanide de l'éclat lumineux, mère d'Hélios, Séléné et Éos.",
  "coéos":"Titan de l'intelligence et de l'axe céleste, père de Léto et d'Astéria.",
  "phoebé":"Titanide de l'éclat prophétique, mère de Léto et d'Astéria.",
  "crios":"Le plus effacé des douze Titans, père d'Astréos, de Pallas et d'un troisième fils resté dans son ombre.",
  "japet":"Titan père d'Atlas, de Prométhée, d'Épiméthée et de Ménétios — une lignée à la mesure toujours excessive.",
  "mnémosyne":"Titanide de la Mémoire, unie neuf nuits de suite à Zeus pour donner naissance aux neuf Muses.",
  "épiméthée":"Titan étourdi, frère de Prométhée, qui accepta malgré les mises en garde le présent empoisonné de Pandore.",
  "ménétios":"Titan à la démesure orgueilleuse, foudroyé par Zeus et précipité au loin lors de la guerre contre les Titans.",
  "clymène":"Océanide, épouse du Titan Japet et mère d'Atlas, de Prométhée, d'Épiméthée et de Ménétios.",
  "athéna":"Déesse de la sagesse stratégique.",
  "aphrodite":"Déesse de l'amour et de la beauté.",
  "nérée":"Vieillard de la mer, dieu marin sage et bienveillant.",
  "amphitrite":"Néréide devenue reine des mers, épouse de Poséidon, mère de Triton.",
  "bellérophon":"Héros dompteur de Pégase, vainqueur de la Chimère.",

  /* ----- Figures de cour supplémentaires ----- */
  "éos":"Déesse de l'aurore aux doigts de rose, elle ouvre chaque matin les portes du ciel au passage du soleil.",
  "niké":"Déesse ailée de la victoire, elle accompagne les vainqueurs sans jamais combattre elle-même.",
  "hestia":"Déesse du foyer, gardienne de la flamme sacrée au centre de chaque maison.",
  "héphaïstos":"Dieu forgeron, créateur ingénieux des armes et merveilles de l'Olympe malgré son rejet initial.",
  "himeros":"Dieu ailé du désir soudain, compagnon d'Éros.",
  "énée":"Héros troyen, fils d'Aphrodite, fidèle jusque dans la ruine de sa cité.",
  "zéphyr":"Dieu du vent d'ouest, le plus doux mais aussi le plus changeant des vents.",
  "éole":"Gardien des vents, il les enferme et n'en libère que ce qui est nécessaire.",
  "chloris":"Déesse des fleurs, elle transforme en jardin chaque lieu qu'elle traverse.",
  "triptolème":"Héros formé par Déméter, messager de l'agriculture porté de terre en terre.",
  "ploutos":"Dieu de la richesse, rendu aveugle par Zeus pour la distribuer sans favoritisme.",

  /* ----- Autres figures mentionnées dans les lectures des cartes numérales ----- */
  "jason":"Chef des Argonautes, parti à la conquête de la Toison d'or à bord de l'Argo.",
  "achille":"Le plus grand guerrier de la guerre de Troie, chef des Myrmidons, vulnérable au seul talon que le Styx n'avait jamais pu atteindre.",
  "thétis":"Néréide insaisissable, mère d'Achille, dont la ténacité et le don de métamorphose défièrent le destin annoncé pour son fils.",
  "atlas":"Titan condamné à porter le poids du ciel sur ses épaules pour l'éternité.",
  "psyché":"Mortelle aimée d'Éros, unie à lui après avoir traversé de nombreuses épreuves.",
  "charites":"Trois déesses de la grâce et de la joie, toujours représentées ensemble, jamais seules.",
  "narcisse":"Jeune homme épris de son propre reflet, incapable de voir l'amour qu'on lui offrait.",
  "écho":"Nymphe condamnée à ne répéter que les derniers mots des autres, éprise en vain de Narcisse.",
  "circé":"Magicienne capable de transformer les hommes en animaux à l'aide de breuvages trompeurs.",
  "pythie":"Prêtresse d'Apollon à Delphes, elle rendait des oracles dans une clarté parfois brutale.",
  "endymion":"Berger plongé par Séléné dans un sommeil éternel pour rester à jamais jeune.",
  "charon":"Passeur des Enfers, il conduit les âmes à travers le Styx vers l'autre monde.",
  "ulysse":"Héros rusé de l'Odyssée, inventeur du stratagème du cheval de Troie.",
  "pénélope":"Épouse fidèle d'Ulysse, qui tint vingt ans les prétendants à distance en défaisant chaque nuit le linceul qu'elle tissait le jour.",
  "télégonos":"Fils d'Ulysse et de Circé, qui tua son père sans le reconnaître avec une arme empoisonnée, accomplissant malgré lui une vieille prophétie.",
  "télémaque":"Fils d'Ulysse et de Pénélope, parti en quête de nouvelles de son père avant de l'aider à châtier les prétendants à son retour.",
  "andromède":"Princesse enchaînée à un rocher en offrande à un monstre marin, sauvée par Persée.",
  "hécube":"Reine de Troie, épouse de Priam et mère d'un très grand nombre de leurs enfants, dont Hector et Pâris.",
  "priam":"Dernier roi de Troie, père d'Hector, Pâris et Cassandre, tué par Néoptolème à la chute de la ville.",
  "hector":"Plus grand héros troyen, fils de Priam et époux d'Andromaque, tué en duel par Achille.",
  "andromaque":"Épouse d'Hector, réduite en esclavage après la mort de son mari et de leur fils à la chute de Troie.",
  "pâris":"Prince troyen dont l'enlèvement d'Hélène, promise par Aphrodite, déclencha la guerre de Troie.",
  "hélène":"Fille de Zeus et de Léda, dont la beauté et l'enlèvement par Pâris déclenchèrent la guerre de Troie.",
  "castor":"Le mortel des jumeaux Dioscures, fils de Tyndare et de Léda, frère de Pollux.",
  "pollux":"L'immortel des jumeaux Dioscures, fils de Zeus et de Léda, qui partagea son immortalité avec Castor.",
  "léda":"Reine de Sparte séduite par Zeus sous la forme d'un cygne, mère d'Hélène et des Dioscures.",
  "clytemnestre":"Reine de Mycènes, épouse d'Agamemnon qu'elle fit assassiner à son retour de Troie.",
  "persée":"Héros vainqueur de la Gorgone Méduse, sauveur d'Andromède.",
  "persès":"Fils de Persée et Andromède, laissé en Éthiopie chez son grand-père Céphée ; les Perses tiendraient de lui, selon Hérodote, le nom de leur peuple.",
  "électryon":"Roi de Mycènes, fils de Persée et père d'Alcmène, tué par accident par son propre gendre Amphitryon.",
  "sthénélos":"Roi de Mycènes, fils de Persée et père d'Eurysthée, qui imposa ses douze travaux à Héraclès.",
  "gorgophoné":"Fille de Persée et Andromède, dont les deux mariages font d'elle l'ancêtre de Tyndare, d'Icarios et des fils d'Aphareus.",
  "alcée":"Roi de Tirynthe, fils de Persée et père d'Amphitryon, dont le nom fut donné à Héraclès enfant.",
  "mestor":"Fils de Persée et Andromède, dont la descendance par sa fille Hippothoé donnera les Ptérélaïdes.",
  "héléos":"Fils de Persée et Andromède, qui aurait donné son nom à la cité laconienne d'Hélos.",
  "érinyes":"Divinités vengeresses qui poursuivent les coupables sans relâche, jusque dans leurs rêves.",
  "actéon":"Chasseur changé en cerf par Artémis pour l'avoir surprise au bain, puis déchiré par ses propres chiens.",
  "artémis":"Déesse de la chasse et de la nature sauvage, farouchement protectrice de son intimité.",
  "orion":"Géant chasseur aimé d'Éos puis compagnon de chasse d'Artémis, changé en étoiles après une mort injuste.",
  "iphigénie":"Fille d'Agamemnon, sauvée in extremis du sacrifice par Artémis, qui la fit prêtresse de son temple.",
  "agamemnon":"Roi de Mycènes, chef de la coalition grecque à Troie, assassiné à son retour par son épouse Clytemnestre et son amant Égisthe.",
  "oreste":"Fils d'Agamemnon et de Clytemnestre, il vengea son père en tuant sa propre mère, avant d'être jugé et acquitté sur l'Aréopage.",
  "asclépios":"Dieu de la médecine, fils d'Apollon et de Coronis, formé par Chiron, si habile qu'il ressuscitait les morts.",
  "néoptolème":"Fils d'Achille, appelé à Troie après la mort de son père, il tua Priam et sacrifia Polyxène sur le tombeau d'Achille.",
  "cassandre":"Princesse troyenne, fille de Priam, dotée par Apollon du don de prophétie mais condamnée à n'être jamais crue.",
  "ménélas":"Roi de Sparte, frère d'Agamemnon et époux d'Hélène, dont l'enlèvement par Pâris déclencha la guerre de Troie.",
  "europe":"Princesse phénicienne enlevée par Zeus changé en taureau, mère de Minos ; le continent européen tient d'elle son nom.",
  "phèdre":"Fille de Minos, seconde épouse de Thésée, dont la passion interdite pour son beau-fils Hippolyte causa la mort des deux.",
  "égisthe":"Fils de Thyeste, cousin et amant de Clytemnestre, complice du meurtre d'Agamemnon avant d'être tué à son tour par Oreste.",
  "polyxène":"Plus jeune fille de Priam et d'Hécube, aimée d'Achille, sacrifiée sur son tombeau après la chute de Troie.",
  "hyacinthe":"Prince spartiate aimé d'Apollon, tué accidentellement par un disque dévié par le vent jaloux Zéphyr, changé en fleur.",
  "coronis":"Princesse thessalienne aimée d'Apollon, mère d'Asclépios, tuée pour son infidélité avant que son fils ne soit arraché du bûcher.",
  "œnone":"Nymphe du mont Ida, première épouse de Pâris, dont le refus de le guérir causa sa mort et son propre suicide de remords.",
  "polydore":"Plus jeune fils de Priam et d'Hécube, envoyé enfant en Thrace avec un trésor, assassiné par le roi Polymestor pour s'en emparer.",
  "polymestor":"Roi de Thrace chargé de protéger le jeune Polydore, il l'assassina pour s'emparer de son trésor et fut aveuglé par Hécube en représailles.",
  "astyanax":"Fils d'Hector et d'Andromaque, seul héritier du trône de Troie, précipité du haut des remparts par les Grecs à la chute de la ville.",
  "icare":"Fils de Dédale, il s'envola de Crète sur des ailes de cire et de plumes, mais périt en mer pour s'être approché trop près du soleil.",
  "penthée":"Roi de Thèbes, cousin de Dionysos, déchiré par sa propre mère et les Ménades pour avoir nié la divinité du dieu.",
  "niobé":"Reine de Thèbes, mère de quatorze enfants tous tués par Apollon et Artémis pour s'être vantée d'être supérieure à Léto.",
  "otrera":"Première reine des Amazones, épouse mortelle d'Arès, fondatrice du sanctuaire d'Artémis à Éphèse.",
  "ariane":"Fille de Minos, elle guide Thésée hors du Labyrinthe grâce à un fil, puis devient l'épouse immortelle de Dionysos.",
  "sémélé":"Mère mortelle de Dionysos, morte en voyant Zeus dans sa splendeur, puis ramenée de l'Olympe par son fils et déifiée.",
  "hébé":"Déesse de la jeunesse, échanson des dieux sur l'Olympe, devenue l'épouse d'Héraclès après sa divinisation.",
  "ilithyie":"Déesse de l'accouchement, capable aussi bien de faciliter une naissance que de la retenir sur ordre d'Héra.",
  "léto":"Titanide aimée de Zeus, elle ne put accoucher d'Apollon et d'Artémis qu'après avoir trouvé refuge sur l'île de sa sœur Astéria.",
  "astéria":"Titanide changée en île pour fuir Zeus, devenue Délos — refuge plus tard offert à sa sœur Léto.",
  "cadmos":"Fondateur et premier roi de Thèbes, vainqueur d'un dragon et époux d'Harmonie.",
  "harmonie":"Fille d'Arès et d'Aphrodite, personnification de la concorde, épouse de Cadmos.",
  "atalante":"Chasseresse invaincue à la course, première à blesser le sanglier de Calydon.",
  "protée":"Dieu marin insaisissable, capable de changer sans cesse de forme.",
  "cyclopes":"Artisans géants à l'œil unique, forgerons associés à Héphaïstos dans les grandes œuvres divines.",
  "cybèle":"Déesse de la terre nourricière, souveraine d'une abondance sauvage.",

  /* ----- Personnifications des cartes numérales illustrées d'Épées ----- */
  "aletheia":"Personnification de la Vérité, dont le nom signifie littéralement « ce qui échappe à l'oubli ».",
  "ananké":"Déesse primordiale de la Nécessité, à laquelle même les dieux ne peuvent se soustraire.",
  "éris":"Déesse de la Discorde, dont la pomme d'or jetée aux noces de Thétis déclencha le jugement de Pâris.",
  "lethée":"Fleuve des Enfers, personnification de l'Oubli — son eau efface jusqu'au souvenir d'avoir vécu.",
  "némésis":"Déesse de la rétribution, qui rétablit l'équilibre chaque fois que la démesure dépasse sa juste limite.",
  "palioxis":"Personnification du reflux d'une armée en déroute, du cortège d'Arès — le repli, non la défaite.",
  "apaté":"Personnification de la Tromperie, fille de la Nuit, rivale d'Aletheia la Vérité.",
  "phobos":"Personnification de la Peur, fils d'Arès et d'Aphrodite, jumeau de Deimos — il escorte les guerriers avant le combat.",
  "morphée":"Dieu des songes, fils d'Hypnos, capable de prendre dans le rêve la forme parfaite de n'importe quel mortel.",
  "thanatos":"Personnification de la mort paisible, frère jumeau d'Hypnos le Sommeil — inévitable, jamais cruelle.",
  "hormos":"Personnification de l'élan qui précède toute action, honoré à Athènes à côté de la Pitié.",
  "arès":"Dieu de la guerre dans sa forme la plus brute, fils de Zeus et d'Héra, amant d'Aphrodite.",
  "thalia":"L'une des trois Charites, personnifiant la fête, l'abondance et tout ce qui s'épanouit sans nécessité.",
  "zelos":"Personnification du Zèle et de l'émulation rivale, frère de Niké, compagnon permanent du trône de Zeus.",
  "bia":"Personnification de la Force brute qui exécute sans jamais discuter, sœur de Niké.",
  "agon":"Personnification de la Compétition codifiée, honoré à Olympie aux côtés des concours sportifs.",
  "borée":"Dieu du vent du Nord, l'un des quatre Anémoi, fils d'Astréos et d'Éos — ravisseur de la princesse athénienne Orithye.",
  "alké":"Personnification de la Vaillance martiale, la fermeté qui tient bon dans l'épreuve — figure mineure, peu documentée.",
  "kratos":"Personnification de la Puissance souveraine, frère de Niké, de Bia et de Zelos, exécuteur des ordres de Zeus.",
  "philotès":"Personnification de l'affection, de l'amitié et du désir partagé, fille de la Nuit — sœur d'Éris, d'Apaté et de Némésis, mais tournée vers ce qui unit plutôt que ce qui sépare.",
  "euphrosyne":"L'une des trois Charites, personnifiant la joie et la gaieté partagée — jamais représentée seule.",
  "hypnos":"Dieu du Sommeil, frère jumeau de Thanatos et père de Morphée — un pouvoir assez redoutable pour tromper Zeus lui-même.",
  "orphée":"Musicien légendaire dont le chant charmait bêtes, arbres et jusqu'aux Enfers — descendu chercher son épouse Eurydice, il la perdit une seconde fois.",
  "hyménée":"Dieu du mariage, fils d'Apollon et d'une Muse selon la tradition la plus répandue — les Grecs l'invoquaient à voix haute à chaque noce, persuadés qu'une fête sans lui tournerait au malheur.",

  /* ----- Personnifications des cartes numérales illustrées de Deniers ----- */
  "rhéa":"Titanide, mère des six premiers Olympiens — elle sauva seule Zeus de son père Cronos, qui dévorait ses propres enfants.",
  "kairos":"Personnification du moment opportun — jeune, ailé, une seule mèche de cheveux à saisir avant qu'il ne soit passé.",
  "dédale":"Architecte et inventeur légendaire, bâtisseur du Labyrinthe crétois — et seul homme à s'en être échappé par les airs.",
  "ctésios":"Épiclèse de Zeus protecteur du foyer et des biens amassés, honoré dans chaque maison sous la forme d'une jarre bien gardée.",
  "penia":"Personnification de la Pauvreté, mère d'Éros selon Platon — l'union d'un manque et d'une ressource, née un soir de fête.",
  "éléos":"Personnification de la Pitié et de la Compassion, honorée à Athènes sur un autel unique en son genre, refuge des suppliants.",
  "aristée":"Héros divinisé, fils d'Apollon, qui enseigna aux hommes l'art de l'élevage des abeilles, de l'olivier et du fromage.",
  "techné":"Personnification du savoir-faire artisanal — figure mineure et tardive, jamais dotée d'un mythe propre comme les grands Olympiens.",
  "aglaé":"La plus jeune des trois Charites, personnifiant l'éclat et la splendeur — selon certaines traditions, l'épouse d'Héphaïstos.",
  "euthénie":"Personnification de la Prospérité et de l'Abondance durable — figure tardive et allégorique, jamais dotée d'un mythe propre comme les grands Olympiens.",

  /* ----- Figures ajoutées à la demande directe de l'utilisatrice ----- */
  "hygie":"Déesse de la santé et de l'hygiène, fille d'Asclépios.",
  "médée":"Magicienne petite-fille d'Hélios, alliée puis ennemie jurée de Jason.",
  "calliope":"Muse de la poésie épique, la plus vénérée des neuf Muses.",
  "cassiopée":"Reine vaniteuse d'Éthiopie, mère d'Andromède, changée en constellation.",
  "mélinoé":"Déesse des fantômes et des terreurs nocturnes, fille de Perséphone.",
  "ascalaphos":"Gardien des Enfers changé en chouette pour avoir trahi le secret de Perséphone.",
  "pasiphaé":"Reine de Crète, épouse de Minos et mère du Minotaure.",
  "hermaphrodite":"Enfant d'Hermès et d'Aphrodite, fondu avec la nymphe Salmacis en un seul être à la fois homme et femme.",
  "priape":"Fils de Dionysos et d'Aphrodite, petit dieu rustique de la fertilité, frappé de laideur par la jalousie d'Héra.",
  "antiope":"Reine amazone unie à Thésée, morte en défendant Athènes contre sa propre nation venue l'attaquer.",
  "thésée":"Héros fondateur d'Athènes, vainqueur du Minotaure, dont chaque grand amour tourna finalement au malheur.",
  "hippolyté":"Reine des Amazones, dont Héraclès obtint la ceinture pour son neuvième travail — peut-être la même reine que Thésée épousa sous le nom d'Antiope.",
  "hippolyte":"Fils de Thésée et d'Antiope, dévot exclusif d'Artémis, tué par ses propres chevaux après une fausse accusation de Phèdre — sans lien de parenté avec la reine amazone Hippolyté.",
  "didon":"Reine fondatrice de Carthage, unie un temps à Énée, morte par le fer après son départ.",
  "érichthonios":"Enfant né de la terre, mi-homme mi-serpent, élevé en secret par Athéna et devenu roi d'Athènes.",
  "alcippé":"Fille d'Arès dont l'agression subie provoqua le tout premier procès jugé par les dieux entre eux.",
  "enyo":"Déesse de la frénésie et du vacarme de la bataille, compagne de combat d'Arès, identifiée à Bellone par les Romains.",
  "hespérides":"Nymphes gardiennes du jardin aux pommes d'or, aux confins occidentaux du monde.",
  "hersé":"Fille de Cécrops aimée d'Hermès, dont la sœur Aglauros fut changée en pierre par jalousie.",
  "cécrops":"Premier roi d'Athènes, mi-homme mi-serpent, né de la terre elle-même, père d'Aglauros, Hersé et Pandrosos.",
  "aglauros":"Fille de Cécrops, mère d'Alcippé par Arès, changée en pierre par Hermès après avoir cédé à la jalousie envers sa sœur Hersé.",
  "pandrosos":"Fille de Cécrops, seule des trois sœurs à n'avoir jamais ouvert le coffre confié par Athéna.",
  "électre":"Fille d'Agamemnon et de Clytemnestre, elle aida son frère Oreste à venger leur père en tuant leur mère.",
  "chrysothémis":"Fille d'Agamemnon et de Clytemnestre, plus prudente que sa sœur Électre, elle refusa de se joindre à la vengeance contre leur mère.",
  "arachné":"Tisserande lydienne devenue araignée pour avoir défié Athéna en tissage.",
  "leucothoé":"Princesse aimée d'Hélios, enterrée vivante par son propre père et changée en arbuste à encens.",
  "clytie":"Nymphe éprise d'Hélios, changée en fleur qui tourne son visage vers le soleil tout au long du jour.",
  "danaé":"Princesse d'Argos, mère de Persée conçu par Zeus changé en pluie d'or.",
  "adonis":"Jeune homme d'une beauté extraordinaire, aimé d'Aphrodite, tué par un sanglier à la chasse.",
  "myrrha":"Princesse changée en arbre à myrrhe après une faute funeste envers son propre père, mère d'Adonis.",
  "œagre":"Roi de Thrace, père d'Orphée selon la tradition la plus répandue.",
  "crotos":"Fils de Pan et d'Euphémé, nourrice des Muses, inventeur de l'applaudissement, changé en constellation du Sagittaire.",
  "deucalion":"Fils de Prométhée, seul survivant avec son épouse Pyrrha du déluge envoyé par Zeus.",
  "pyrrha":"Fille d'Épiméthée et de Pandore, seule survivante avec son époux Deucalion du déluge envoyé par Zeus.",
  "pléiades":"Sept nymphes filles d'Atlas, changées en étoiles pour échapper à Orion.",
  "hyas":"Frère des Hyades, dont la mort à la chasse causa des larmes changées en étoiles.",
  "grées":"Trois sœurs nées vieilles, ne partageant qu'un œil et une dent, contraintes de révéler à Persée le chemin vers leurs sœurs les Gorgones.",
  "méduse":"La seule mortelle des trois Gorgones, changée en monstre par Athéna, décapitée par Persée.",
  "gorgones":"Trois sœurs monstrueuses au regard pétrifiant, dont Méduse était la seule mortelle.",
  "ganymède":"Prince troyen d'une beauté si parfaite que Zeus l'enleva pour en faire l'échanson des dieux.",
  "myrina":"Reine guerrière des Amazones libyennes, conquérante avant de mourir au combat.",
  "penthésilée":"Reine des Amazones, fille d'Arès, tuée en duel par Achille qui pleura sa beauté après coup.",
  "amazones":"Peuple de femmes guerrières gouverné par des reines successives, sans hommes en son sein.",
  "néréides":"Cinquante nymphes marines filles de Nérée, dont Amphitrite et Thétis, souvent représentées avec une queue de poisson.",
  "harpyes":"Sœurs d'Iris, esprits ailés au visage de femme et au corps d'oiseau, semant la faim sur leur passage.",
  "io":"Prêtresse d'Héra aimée de Zeus, changée en génisse et pourchassée par un taon jusqu'en Égypte.",
  "libye":"Princesse égyptienne, fille d'Épaphos, qui donna son nom au continent africain.",
  "égyptos":"Roi jumeau de Danaos, père de cinquante fils tous massacrés sauf un la nuit de leurs noces.",
  "danaos":"Roi jumeau d'Égyptos, père des cinquante Danaïdes, fondateur légendaire de la lignée royale d'Argos.",
  "danaïdes":"Les cinquante filles de Danaos, condamnées aux Enfers à remplir un tonneau percé pour avoir tué leurs époux.",
  "hypermestre":"Seule des cinquante Danaïdes à épargner son époux Lyncée, par amour plutôt que par obéissance.",
  "lyncée":"Seul époux des cinquante fils d'Égyptos épargné par sa femme Hypermestre, ancêtre de Persée.",
  "byzas":"Fils de Poséidon, fondateur légendaire de Byzance.",
  "phidaléia":"Figure féminine associée à une fondation antérieure sur le site de Byzance, peu documentée.",
  "admète":"Roi de Phères que servit Apollon comme berger, époux d'Alceste.",
  "alceste":"Fille de Pélias, elle accepta de mourir à la place de son époux Admète.",
  "pélias":"Roi usurpateur d'Iolcos, oncle de Jason, tué par ses propres filles sur les conseils de Médée.",
  "clito":"Mortelle aimée de Poséidon, mère d'Atlas et ancêtre légendaire des Atlantes.",
  "sidé":"Première épouse d'Orion, tuée par Héra pour avoir rivalisé de beauté avec elle.",
  "picus":"Roi légendaire du Latium, changé en pivert par Circé pour avoir refusé ses avances.",
  "ixion":"Roi thessalien, père des Centaures, condamné à tourner pour l'éternité sur une roue enflammée.",
  "pirithoos":"Roi des Lapithes, fils d'Ixion, dont les noces avec Hippodamie déclenchèrent la guerre contre les Centaures.",
  "hippodamie":"Épouse de Pirithoos, dont l'enlèvement tenté par un Centaure ivre déclencha la Centauromachie.",
  "calchas":"Devin grec de la guerre de Troie, qui exigea le sacrifice d'Iphigénie à Aulis.",
  "cyllaros":"Centaure d'une grande beauté, tué aux côtés de son épouse Hylonome durant la Centauromachie.",
  "hylonome":"Centauresse éprise de Cyllaros, morte à ses côtés durant la Centauromachie.",
  "hyperboréens":"Peuple légendaire vivant au-delà du vent du Nord, dans un pays sans hiver cher à Apollon.",
  "abaris":"Prêtre hyperboréen d'Apollon, capable de voyager à travers les airs sur une flèche d'or devenue, dit-on, celle du Sagittaire.",
  "hypsipyle":"Reine de Lemnos qui accueillit les Argonautes, eut des jumeaux avec Jason.",
  "œdipe":"Roi de Thèbes qui tua son père et épousa sa mère sans le savoir, accomplissant malgré lui une prophétie.",
  "jocaste":"Reine de Thèbes, mère et épouse d'Œdipe sans le savoir, elle se donna la mort en découvrant la vérité.",
  "antigone":"Fille d'Œdipe, condamnée à mort pour avoir enterré son frère envers et contre l'interdit royal.",
  "halia":"Nymphe rhodienne aimée de Poséidon, punie par Aphrodite avant de devenir déesse marine locale.",
  "hermione":"Fille de Ménélas et d'Hélène, disputée entre Oreste et Néoptolème ; à la mort de ce dernier, elle épouse finalement Oreste.",
  "chryséis":"Fille du prêtre d'Apollon Chrysès, captive d'Agamemnon dont le retour forcé déclencha la colère du dieu contre les Grecs.",
  "briséis":"Captive d'Achille disputée à Agamemnon, dont l'enlèvement déclencha la colère du héros au cœur de l'Iliade.",
  "menthé":"Naïade aimée d'Hadès, changée par une Perséphone jalouse en la plante odorante qui porte son nom.",
  "pyrame":"Jeune Babylonien épris de Thisbé malgré l'interdit de leurs familles, mort par erreur à ses côtés sous un mûrier.",
  "thisbé":"Jeune Babylonienne éprise de Pyrame, dont la fuite devant une lionne provoqua leur double mort tragique.",
  "muses":"Neuf déesses des arts et de la mémoire, filles de Zeus et de Mnémosyne, jamais représentées séparément.",
  "clio":"Muse de l'Histoire, celle qui proclame la gloire des actes dignes d'être retenus.",
  "euterpe":"Muse de la musique et de l'aulos, dont le nom signifie « celle qui réjouit ».",
  "thalie":"Muse de la comédie et de la poésie pastorale, représentée avec un masque comique et une houlette de berger.",
  "melpomène":"Muse de la tragédie, représentée avec un masque tragique.",
  "terpsichore":"Muse de la danse et du chant choral, parfois dite mère des Sirènes.",
  "érato":"Muse de la poésie lyrique et amoureuse, invoquée par Virgile pour chanter la guerre.",
  "polymnie":"Muse des hymnes sacrés, au domaine élargi avec le temps à la pantomime et à la géométrie.",
  "uranie":"Muse de l'astronomie, homonyme d'une épiclèse d'Aphrodite sans lien de parenté.",
  "heures":"Trois déesses filles de Zeus et de Thémis, gardiennes de l'ordre saisonnier et moral du monde.",
  "parques":"Trois déesses du destin qui filent, mesurent et tranchent le fil de chaque existence.",
};
const DEITY_LORE = {
  "dionysos": [
    "Dionysos est le fils de Zeus et d'une mortelle, Sémélé, morte foudroyée en voulant contempler son amant divin dans toute sa splendeur — Zeus dut alors coudre l'enfant à naître dans sa propre cuisse pour le mener à terme, d'où son surnom de « deux fois né » (voir la fiche « Sémélé »).",
    "Contrairement aux autres Olympiens, il parcourut le monde des mortels, leur enseignant la culture de la vigne et provoquant sur son passage des scènes de folie collective chez ceux qui refusaient de le reconnaître comme dieu — comme le roi Penthée (voir la fiche « Penthée »), déchiré par sa propre mère en plein délire bachique.",
    "Où qu'il aille, il ne voyage jamais seul : son cortège, le thiase, rassemble les Ménades, femmes prises d'une transe sacrée qui dansent échevelées au son des tambourins et des flûtes, les satyres mi-hommes mi-boucs toujours en quête de vin et de plaisir, et le vieux Silène, son précepteur ivre porté à dos d'âne faute de pouvoir tenir debout — une procession bruyante et débridée, char tiré par des panthères, qui incarne à elle seule la libération que le dieu apporte partout où il passe.",
    "Sur l'île de Naxos, il trouva Ariane abandonnée par Thésée et l'épousa, lui offrant l'immortalité (voir les fiches « Ariane » et « Thésée ») — et, une fois adulte, il n'oublia jamais sa mère : il descendit jusqu'aux Enfers pour la ramener parmi les dieux de l'Olympe.",
    "Une réconciliation passagère avec Aphrodite, après qu'elle se fut un temps éprise d'Adonis, lui donna aussi un fils, Priape — un enfant que la jalousie d'Héra frappa dès sa naissance d'une laideur difforme (voir les fiches « Aphrodite » et « Priape »).",
    "Dieu de la métamorphose autant que de l'ivresse, il incarne ce qui échappe à la raison et à l'ordre établi.",
    "Bacchos, son autre nom presque interchangeable, est resté le plus connu de tous ; Lysios, « le Libérateur », l'honorait comme celui qui délivre des soucis par le vin — le poète latin Virgile lui donnera plutôt le nom de Lyaios pour ce même rôle. Eleuthereus, du nom de sa ville d'origine supposée, Eleuthères, le rattachait à la grande fête des Dionysies à Athènes. La tradition orphique, enfin, distingue parfois un Dionysos plus ancien et mystique, Zagreus, fils de Zeus et de Perséphone (voir la fiche « Perséphone »), déchiré encore enfant par les Titans avant de renaître, dit-on, en la personne du Dionysos que tout le monde connaît — une figure que les cultes à mystères associaient volontiers à lui, sans que les récits s'accordent toujours sur les détails exacts de cette double naissance.",
  ],
  "hermès": [
    "Fils de Zeus et de Maïa, l'aînée des Pléiades (voir la fiche « Pléiades »), Hermès naquit dans une grotte du mont Cyllène (voir la fiche « Grotte ») et manifesta son astuce dès le jour de sa naissance : il déroba le troupeau de son frère Apollon, puis inventa la lyre à partir d'une carapace de tortue et la lui offrit en échange de son pardon (voir la fiche « Lyre »).",
    "Messager officiel de Zeus et guide des âmes des morts vers l'autre monde, Hermès franchit sans entrave les frontières entre l'Olympe, la terre et les Enfers — un privilège qu'on lui prête souvent, à tort, comme exclusif : Iris relie elle aussi le ciel et la terre, et va jusqu'aux portes du Styx lorsqu'il faut y puiser l'eau du serment sacré (voir la fiche « Iris »), tandis qu'Hécate, de par sa nature triple, circule tout aussi librement entre les trois royaumes (voir la fiche « Hécate »). Ce qui distingue Hermès n'est donc pas l'exclusivité du passage, mais la diversité des rôles qu'il y joue : messager, psychopompe, patron des voyageurs, des marchands et des voleurs.",
    "Sa vie amoureuse est aussi mouvementée que ses voyages. D'Aphrodite (voir la fiche « Aphrodite »), il eut un fils à la double nature, Hermaphrodite, fusionné plus tard avec la nymphe Salmacis en un seul être aux deux sexes (voir la fiche « Hermaphrodite »). De la nymphe Dryope, il eut Pan (voir la fiche « Pan »), né avec des cornes et des sabots de bouc, que sa propre mère fuit à sa naissance. D'une troisième union, avec Chioné, naquit Autolycos, voleur si habile qu'il pouvait changer à volonté la forme et la couleur de tout ce qu'il dérobait — un don hérité directement de son père, et qui fera de lui, plus tard, le grand-père maternel d'Ulysse (voir la fiche « Ulysse »). Une quatrième liaison, avec Hersé, fille de Cécrops, l'entraîna un jour jusqu'au seuil de sa maison même, où sa sœur Aglauros tenta de lui barrer le passage (voir la fiche « Hersé »).",
    "On l'honorait aussi sous des noms plus spécifiques : Agoraios, sur l'agora même où se négociait tout commerce ; et surtout Kriophoros, « le Porteur de bélier », à Tanagra — une légende locale raconte qu'Hermès, pour écarter une épidémie de la ville, en fit le tour portant un bélier sur ses épaules ; en souvenir de ce geste, le plus bel éphèbe de la cité refaisait chaque année le même tour, un agneau sur le dos.",
  ],
  "métis": [
    "Titanide de la ruse, Métis fut la première épouse de Zeus. Une prophétie annonçait qu'elle enfanterait un fils plus puissant que son père : Zeus, pour l'empêcher, l'avala tout entière alors qu'elle était enceinte.",
    "Loin de disparaître, Métis continua d'agir depuis l'intérieur de Zeus, forgeant en secret l'armure de leur fille : le moment venu, Athéna jaillit tout armée du crâne de son père, portant en elle la ruse de sa mère autant que la puissance de Zeus.",
  ],
  "héra": [
    "Fille de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), sœur et épouse de Zeus, Héra règne sur l'Olympe comme protectrice du mariage et garante de l'ordre légitime — un rôle qu'elle défend avec une fermeté que la mythologie associe souvent à la jalousie, tant les infidélités de son époux sont nombreuses.",
    "Elle ne se contente jamais d'observer : elle pousse Sémélé à sa perte par ruse (voir la fiche « Sémélé »), poursuit Héraclès de sa colère toute sa vie durant simplement parce qu'il est le fruit d'une liaison de Zeus (voir la fiche « Héraclès »), et impose à Léto l'interdiction de mettre au monde ses enfants sur la moindre terre ferme, retardant ainsi la naissance d'Apollon et d'Artémis (voir la fiche « Léto »).",
    "Reine avant d'être épouse, elle incarne la légitimité et l'autorité plus que la douceur.",
    "À Argos, son principal foyer de culte, on l'honorait comme Héra Argienne ; mais c'est à Stymphale qu'elle recevait l'hommage le plus original, avec trois sanctuaires distincts dédiés à Héra Pais (l'enfant), Héra Teleia (l'épouse accomplie) et Héra Khéra (la veuve), comme les trois âges d'un même mariage. Une légende argienne ajoutait qu'elle retrouvait chaque année sa virginité en se baignant dans la source de Canathos à Nauplie — un secret réservé à ses mystères, et un renouveau que sa propre réputation de jalousie perpétuelle semble pourtant démentir sans cesse.",
  ],
  "zeus": [
    "Plus jeune fils de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), Zeus échappa au sort de ses frères et sœurs — avalés à la naissance par un père craignant d'être détrôné — grâce à sa mère, qui le cacha dans une grotte du mont Ida en Crète et fit avaler à Cronos une pierre emmaillotée à sa place.",
    "Devenu adulte, il libéra ses frères et sœurs et mena la guerre contre les Titans, dont il sortit vainqueur pour établir un nouvel ordre cosmique sur l'Olympe, dont il devint le souverain incontesté, maître de la foudre.",
    "Garant de l'ordre du monde, il reste pourtant l'un des dieux aux liaisons et aux colères les plus nombreuses de toute la mythologie.",
    "On l'invoquait aussi sous des noms précis, selon la part de sa protection sollicitée : Xénios veillait sur les hôtes et les étrangers, vengeant lui-même toute entorse aux devoirs de l'hospitalité ; Herkeios protégeait l'autel dressé dans la cour de chaque maison, marque d'une famille reconnue comme telle ; et Horkios, le plus redouté, gardait la sincérité des serments — sa statue à Olympie, brandissant la foudre, était si terrifiante qu'aucun athlète ni juge ne s'y serait parjuré de sang-froid. Une facette plus modeste, Zeus Ctésios, veillait quant à elle sur les provisions de chaque foyer (voir la fiche « Ctésios »).",
  ],
  "chiron": [
    "Contrairement aux autres centaures, réputés violents et incontrôlés, Chiron était réputé pour sa sagesse et sa maîtrise de la médecine, de la musique et du tir à l'arc — il forma parmi ses élèves Achille, Jason et Asclépios.",
    "Immortel, il fut pourtant blessé accidentellement par une flèche empoisonnée d'Héraclès et, ne pouvant ni guérir ni mourir, souffrit sans fin jusqu'à ce qu'il accepte d'échanger son immortalité contre la libération de Prométhée enchaîné (voir la fiche « Prométhée »).",
    "Sa blessure incurable en fait le symbole du guérisseur qui ne peut se soigner lui-même — celui qui transmet un savoir né de sa propre douleur.",
  ],
  "éros": [
    "Aux origines les plus anciennes du mythe, Éros est une force primordiale née dès l'origine du monde, avant même les dieux de l'Olympe — une puissance d'attraction qui met en mouvement toute chose.",
    "Les récits plus tardifs en font le fils d'Aphrodite, armé d'un arc dont les flèches font naître l'amour chez quiconque elles atteignent, y compris les dieux eux-mêmes. Son propre amour pour la mortelle Psyché (voir la fiche « Psyché ») ne fut possible qu'au prix d'épreuves redoutables imposées par Aphrodite, jalouse de sa belle-fille.",
    "Un jour où Apollon venait de terrasser le serpent Python, il railla le jeune Éros, jugeant son arc d'enfant indigne d'un dieu de la guerre. Vexé, Éros lui prouva le contraire : il lui décocha une flèche d'or, qui embrase le désir chez qui elle touche, et visa la nymphe Daphné d'une flèche de plomb, qui provoque au contraire un rejet total. Apollon, foudroyé de désir, se lança à la poursuite de Daphné, qui le fuyait avec la même intensité — jusqu'à ce qu'elle obtienne d'être changée en laurier plutôt que rattrapée (voir la fiche « Laurier »). Ce concours improvisé, où le plus jeune des deux prouva qu'il visait plus juste que le plus grand, resta la meilleure démonstration qu'aucune flèche, fût-elle celle d'un dieu de la lumière, ne vaut celle d'Éros.",
  ],
  "apollon": [
    "Fils de Zeus et de Léto (voir la fiche « Léto »), Apollon naquit avec sa sœur jumelle Artémis sur l'île flottante de Délos, seul lieu qui accepta de les accueillir après qu'Héra eut interdit à toute terre ferme de recevoir l'accouchement de sa rivale.",
    "Dieu de la lumière, de la musique et de la vérité — un rôle solaire parfois confondu avec celui d'Hélios (voir la fiche « Hélios »), qui seul conduit réellement le char du soleil —, Apollon rend depuis son temple de Delphes (voir la fiche « Temple ») des oracles par la voix de la Pythie : sa devise gravée sur le fronton du temple, « Connais-toi toi-même », résume son exigence de clarté.",
    "Chef de chœur des Muses (voir la fiche « Muses »), qu'il conduit sous le nom d'Apollon Musagète, « guide des Muses », il partage avec elles le mont Parnasse et sa source Castalie, non loin de son propre sanctuaire de Delphes.",
    "Plusieurs surnoms rappellent ses différents visages : Pythien, en souvenir du serpent Python vaincu à Delphes ; Phoibos, « le Brillant », pour son éclat solaire ; et Loxias, « l'Ambigu », pour la nature volontairement obscure de ses oracles, qu'il fallait savoir interpréter plutôt que prendre au pied de la lettre. Un autre surnom, Lycien, reste débattu depuis l'Antiquité même : lié au loup, à la lumière ou à la région de Lycie, sans qu'aucune des trois explications ne l'emporte vraiment sur les autres.",
    "Il connut aussi un amour resté sans retour : ayant un jour raillé le petit arc d'Éros (voir la fiche « Éros »), jugé indigne d'un dieu de son rang, il s'attira la vengeance du dieu vexé — frappé à son tour d'une flèche d'or, il s'éprit aussitôt de la nymphe Daphné, elle-même atteinte d'une flèche de plomb qui la rendit incapable de l'aimer en retour. Il la poursuivit sans relâche jusqu'aux rives de son père, le dieu-fleuve Pénée, qui la changea en laurier pour la soustraire à ses avances — Apollon en fit dès lors son arbre sacré, et la couronne de laurier devint le symbole même de la victoire qu'il n'avait pas obtenue ce jour-là (voir la fiche « Laurier »).",
    "Éprise de la princesse thessalienne Coronis (voir la fiche « Coronis »), il apprit d'un corbeau — blanc jusqu'alors — qu'elle lui préférait un mortel alors même qu'elle portait déjà son enfant : furieux, il la fit tuer par Artémis, mais arracha l'enfant du bûcher funéraire in extremis pour le confier à Chiron (voir la fiche « Chiron »). Cet enfant, Asclépios (voir la fiche « Asclépios »), devint un guérisseur si habile qu'il ressuscitait les morts, jusqu'à ce que Zeus, inquiet de le voir bouleverser l'ordre naturel, le foudroie. Fou de chagrin, Apollon se vengea sur les Cyclopes qui avaient forgé cette foudre — un crime qui lui valut d'être condamné à servir un an durant comme simple berger mortel auprès du roi Admète (voir la fiche « Admète »), corvée qu'il transforma en amitié si sincère qu'il obtint plus tard des Parques la grâce de prolonger sa vie. Quant au corbeau messager, resté blanc jusque-là, Apollon le noircit pour toujours en punition de sa nouvelle funeste.",
    "Il aima aussi le jeune prince spartiate Hyacinthe (voir la fiche « Hyacinthe »), avec qui il partageait le goût du disque — jusqu'à ce qu'un disque qu'il lança dévie de sa trajectoire, détourné par le vent jaloux Zéphyr (voir la fiche « Zéphyr »), et frappe mortellement le jeune homme en pleine tempe. Incapable de le sauver, Apollon changea son sang versé en une fleur nouvelle, la jacinthe, sur les pétales de laquelle on croyait pouvoir lire les lettres grecques de son deuil.",
    "Son dernier grand amour resta, lui, sans aucune réciprocité : à la princesse troyenne Cassandre (voir la fiche « Cassandre »), fille de Priam (voir la fiche « Priam »), il offrit le don de prophétie en échange de ses faveurs — mais elle refusa de tenir sa promesse une fois le don reçu. Ne pouvant le lui reprendre, Apollon la frappa d'une malédiction plus cruelle encore : ses prédictions, toujours exactes, ne seraient plus jamais crues par personne — pas même son avertissement, resté sans écho, contre le cheval de bois conçu par Ulysse (voir la fiche « Ulysse »), qui allait livrer Troie aux Grecs.",
  ],
  "thémis": [
    "Titanide fille d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), antérieure aux dieux de l'Olympe, Thémis personnifie la loi divine et l'ordre juste du monde — non pas la justice humaine, changeante et discutée, mais un principe plus ancien que les dieux eux-mêmes.",
    "Elle rendit elle-même des oracles à Delphes avant qu'Apollon n'y installe son propre sanctuaire, et resta la conseillère de Zeus, assise à ses côtés sur l'Olympe pour veiller à ce qu'aucune décision divine ne s'écarte de l'ordre juste.",
    "Unie à Zeus, elle mit au monde les Heures (voir la fiche « Heures »), gardiennes de l'ordre saisonnier et moral du monde, et, selon une tradition parallèle à celle qui les dit plutôt filles de Nyx, la Nuit (voir la fiche « Nyx »), les Parques elles-mêmes (voir la fiche « Parques »), qui filent le destin de chaque mortel.",
  ],
  "déméter": [
    "Fille de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), Déméter, déesse des moissons, enseigna aux hommes l'art de l'agriculture — un don qu'elle retira au monde entier de rage et de chagrin lorsque sa fille Perséphone fut enlevée par Hadès (voir la fiche « Hadès »).",
    "La terre entière resta stérile jusqu'à ce que Zeus négocie un compromis : Perséphone passerait une partie de l'année aux Enfers et l'autre auprès de sa mère — un partage qui, depuis, rythme les saisons, l'hiver au deuil de Déméter et le printemps à ses retrouvailles.",
    "À Athènes et dans une grande partie de la Grèce, on la fêtait sous le nom de Thesmophoros, « celle qui apporte les lois », lors des Thesmophories réservées aux femmes mariées ; son titre le plus solennel restait Éleusinia, en l'honneur d'Éleusis et des Mystères qui portent son nom. Un mythe arcadien plus sombre, propre à la ville de Thelpusa, raconte comment Poséidon la poursuivit alors qu'elle errait à la recherche de sa fille disparue : changée en jument pour lui échapper, elle ne put empêcher le dieu de prendre lui-même la forme d'un étalon pour s'unir à elle malgré tout — de cette union naquirent le cheval Arion et une fille que la tradition plus tardive a fini par identifier à Perséphone elle-même (voir la fiche « Perséphone »), bien que son nom véritable, sur ce seul lieu, ne se révélât qu'aux initiés. L'épisode valut par ailleurs à Déméter, sur ce seul lieu, les surnoms d'Erinys, « la Furieuse », et de Lousia, « la Baigneuse », pour le bain purificateur qu'elle prit ensuite dans le fleuve Ladon.",
  ],
  "tyché": [
    "Déesse de la fortune et du hasard, Tyché échappe à toute généalogie fixe selon les auteurs — tantôt fille de Zeus, tantôt de l'Océan — comme si le hasard lui-même refusait de se laisser enfermer dans une origine unique.",
    "Représentée portant une corne d'abondance et un gouvernail, parfois les yeux bandés, elle peut combler de richesses comme ruiner en un instant, sans qu'aucun mérite ni aucune faute n'entre en compte — la roue qu'on lui associe (voir la fiche « Roue ») tourne sans se soucier de qui elle élève ou abaisse.",
  ],
  "héraclès": [
    "Fils de Zeus et d'une mortelle, Alcmène, l'enfant fut d'abord nommé Alcide, du nom de son grand-père Alcée (voir la fiche « Alcée »). Il fut la cible de la jalousie d'Héra avant même sa naissance : elle chargea Ilithyie de retenir l'accouchement par magie, une ruse à peine déjouée (voir la fiche « Ilithyie »), puis, une fois l'enfant né, envoya deux serpents l'étrangler dans son sommeil — qu'il étrangla lui-même de ses propres mains encore enfant.",
    "Zeus, voulant offrir à son fils mortel une part d'immortalité, le fit un jour approcher du sein d'Héra endormie, espérant qu'il tète son lait divin sans qu'elle le sache. L'enfant tira si fort qu'elle se réveilla en sursaut et l'écarta d'un geste brusque : le lait jaillit à travers le ciel nocturne et y forma la traînée blanche que l'on nomme depuis la Voie lactée.",
    "Rendu fou par Héra à l'âge adulte, il tua sa propre famille dans un accès de délire. Pour s'en purifier, l'oracle de Delphes lui ordonna de se mettre au service du roi Eurysthée pendant douze ans et de prendre un nouveau nom, Héraclès — « la gloire d'Héra » — comme pour retourner contre elle-même la persécution qu'elle lui infligeait : chaque exploit accompli sous ce nom deviendrait, malgré elle, un hommage à la déesse.",
    "Avant même de se mettre au service d'Eurysthée, il séjourna cinquante nuits chez le roi Thespios, désireux d'obtenir de nombreux descendants d'un héros d'une telle force : chacune de ses cinquante filles vint ainsi, une nuit après l'autre, partager la couche d'Héraclès, qui les crut toutes, dit-on, n'être qu'une seule et même femme. De cette hospitalité peu commune naquirent cinquante fils, les Thespiades, qui essaimèrent ensuite dans toute la Grèce et jusqu'en Sardaigne.",
    "Eurysthée lui imposa alors douze travaux jugés impossibles. Héraclès étouffa d'abord à mains nues le lion de Némée, dont la peau devint son armure, puis affronta l'hydre de Lerne, dont il fallait cautériser chaque cou pour empêcher deux têtes de repousser à la place d'une — son neveu Iolaos l'y aida, geste qui coûtera à ce travail d'être invalidé plus tard, faute d'avoir agi seul. Il captura ensuite vivante la biche de Cérynie, consacrée à Artémis, après une année entière de poursuite sans jamais la blesser, puis ramena vivant le sanglier d'Érymanthe en le forçant dans la neige profonde.",
    "Vinrent ensuite les écuries d'Augias, nettoyées en une seule journée en détournant le cours de deux fleuves — un travail lui aussi invalidé, cette fois pour avoir réclamé un salaire — puis les oiseaux du lac Stymphale, chassés à l'aide de castagnettes de bronze offertes par Athéna, le taureau de Crète maîtrisé à mains nues, et les juments de Diomède, dressées en leur faisant dévorer leur propre maître.",
    "Il obtint ensuite la ceinture d'Hippolyté, reine des Amazones (voir la fiche « Hippolyté »), d'abord prête à la lui offrir de bon cœur — jusqu'à ce qu'Héra, semant la discorde parmi les Amazones, ne transforme la rencontre en bataille. Il ramena seul le troupeau de Géryon depuis les confins du monde connu, cueillit les pommes d'or des Hespérides (voir la fiche « Hespérides ») en soulageant un temps Atlas de son fardeau céleste par la ruse — délivrant au passage Prométhée enchaîné, en abattant d'une flèche l'aigle qui lui dévorait le foie (voir la fiche « Prométhée ») —, et descendit enfin aux Enfers pour en ramener vivant, à mains nues, le chien Cerbère, avant de le rendre à Hadès.",
    "Deux travaux ayant été invalidés par Eurysthée, Héraclès dut en accomplir deux de plus pour atteindre le compte requis — quatorze épreuves au total pour douze travaux officiellement reconnus.",
    "Après sa mort, consumé par une tunique empoisonnée, il fut accueilli parmi les dieux de l'Olympe. C'est Héra elle-même, désormais réconciliée avec celui dont le nom entier célébrait sa gloire, qui lui donna pour épouse sa propre fille Hébé, déesse de la jeunesse éternelle (voir la fiche « Hébé ») — le pardon le plus complet qu'elle pouvait lui offrir, en l'accueillant dans sa propre famille.",
  ],
  "prométhée": [
    "Fils du Titan Japet (voir la fiche « Japet »), Prométhée resta aux côtés de Zeus pendant la guerre contre les autres Titans, et façonna aussi, selon certains récits, les premiers hommes à partir d'argile.",
    "Voyant l'humanité livrée au froid et à l'ignorance, il déroba le feu aux dieux et l'offrit aux mortels (voir la fiche « Feu ») — un don qui lui valut d'être traîné jusqu'à un rocher du Caucase par Bia et Kratos, la Force et la Puissance (voir les fiches « Bia » et « Kratos »), sur ordre de Zeus, puis enchaîné là où un aigle venait chaque jour dévorer son foie, qui repoussait chaque nuit — un supplice qu'Héraclès, de passage lors de sa quête des pommes des Hespérides, interrompit en abattant l'aigle d'une flèche (voir la fiche « Héraclès »), avant que Chiron n'accepte à son tour de mourir à sa place pour achever sa libération, une immortalité qu'il fallait bien qu'un immortel consente à céder (voir la fiche « Chiron »).",
    "Son nom reste attaché à tout affranchissement payé au prix fort — le savoir arraché plutôt que donné.",
  ],
  "hadès": [
    "Fils de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), Hadès hérita du monde souterrain lors du partage du cosmos entre lui et ses frères Zeus et Poséidon — un lot que la tradition présente souvent comme le moins enviable, mais qu'il gouverne avec une rigueur incorruptible plutôt qu'avec cruauté.",
    "Sa part dans la victoire des Olympiens sur les Titans fut pourtant décisive : les Cyclopes, libérés du Tartare par Zeus en échange de leur aide, forgèrent à chacun des trois frères un présent capable de renverser le combat — la foudre pour Zeus, le trident pour Poséidon, et pour Hadès un casque qui rend invisible celui qui le porte. Coiffé de ce casque, il put s'approcher sans être vu pour dérober les armes des Titans ou frapper sans jamais être repéré — une contribution aussi discrète que déterminante.",
    "Il quitte rarement son royaume, à l'exception notable de l'enlèvement de Perséphone (voir la fiche « Perséphone »), dont il tombe amoureux et qu'il installe à ses côtés comme reine des Enfers.",
    "Avant elle, ou selon d'autres versions alors même qu'il en était déjà l'époux, Hadès s'était épris de la naïade Menthé (voir la fiche « Menthé »), que Perséphone, découvrant cette liaison, changea de rage en la plante odorante qui porte encore son nom.",
    "Contrairement à une image tardive qui en fait un dieu maléfique, Hadès reste dans les mythes grecs un juge impartial, gardien d'un ordre auquel nul, pas même les dieux, ne peut se soustraire.",
    "Son nom le plus durable reste pourtant un autre : Plouton, « le Riche », euphémisme destiné à adoucir la crainte qu'inspirait son nom véritable, en insistant sur les richesses enfouies dans la terre plutôt que sur la mort elle-même — Euripide est le premier à l'employer comme un nom à part entière plutôt qu'un simple qualificatif. À Hermione, où l'on situait la fissure par laquelle Héraclès aurait ramené Cerbère à la surface (voir la fiche « Héraclès »), on l'honorait sous le nom de Klymenos, « le Renommé » ; Homère et les tragiques le disent aussi Polydegmon, « celui qui accueille tant de monde » — un titre qui ne laisse aucun doute sur l'unique destination que tous, tôt ou tard, finissent par emprunter.",
  ],
  "perséphone": [
    "Fille de Zeus et de Déméter, Perséphone cueillait des fleurs dans un pré lorsque la terre s'ouvrit sous elle et qu'Hadès l'emporta sur son char vers son royaume souterrain.",
    "Ayant mangé quelques grains de grenade offerts par Hadès (voir la fiche « Grenade »), elle se lia irrévocablement aux Enfers et dut, par un accord négocié par Zeus, y passer une partie de chaque année, devenant reine des morts autant que fille de la déesse des moissons.",
    "C'est Ascalaphos, gardien du jardin des Enfers, qui rapporta l'avoir vue manger ce fruit — un témoignage qu'elle ne lui pardonna jamais, et qui lui valut, une fois devenue reine, d'être changé en chouette (voir la fiche « Ascalaphos »).",
    "Un acte d'amour put pourtant fléchir cette rigueur : touchée par le sacrifice d'Alceste (voir la fiche « Alceste »), morte de son plein gré à la place de son époux, elle la renvoya elle-même auprès des vivants — une clémence rare chez une reine par ailleurs si peu encline au pardon.",
    "Son passage entre les deux mondes en fait la figure même de la transformation qui n'efface jamais totalement ce qu'on était avant.",
    "Son autre nom, Coré, « la Jeune Fille », reste si employé qu'il finit par se substituer presque entièrement au sien dans l'usage courant — Pausanias doit lui-même préciser que son vrai nom est bien Perséphone. En Arcadie, à Lycosoura, on vénérait par ailleurs une Despoina, « la Maîtresse », présentée comme la fille de Poséidon et de Déméter née de leur union à Thelpusa (voir la fiche « Déméter ») — une déesse à l'origine distincte, dont le nom véritable ne se révélait qu'aux seuls initiés de ses mystères, mais que la tradition plus tardive a fini par confondre avec Perséphone elle-même. À Andanie, enfin, on l'honorait sous le nom de Hagné, « la Pure ».",
  ],
  "iris": [
    "Fille du Titan Thaumas et de l'Océanide Électre, Iris personnifie l'arc-en-ciel (voir la fiche « Arc-en-ciel »), pont visible entre le ciel et la terre qu'elle emprunte pour porter les messages des dieux aux mortels comme aux autres divinités.",
    "Contrairement à Hermès, dont les missions relèvent souvent de la ruse ou du commerce, Iris est associée à la fidélité du message transmis sans détour — une messagère de confiance, jamais rusée ni trompeuse. Son rôle ne s'arrête d'ailleurs pas au seul lien entre le ciel et la terre : lorsqu'un dieu doit prêter le serment le plus sacré qui soit, c'est elle qui va puiser, aux portes des Enfers, l'eau du Styx dans laquelle jurer un tel serment (voir la fiche « Hermès »).",
    "Ses propres sœurs, les Harpyes (voir la fiche « Harpyes »), lui durent un jour la vie sauve : poursuivies par les fils ailés de Borée (voir la fiche « Borée »), Zétès et Calaïs, décidés à les tuer pour libérer le devin Phinée de leurs tourments, elles ne durent leur salut qu'à l'intervention personnelle d'Iris, venue en plein vol obtenir des deux frères la promesse de les épargner.",
  ],
  "pan": [
    "Fils d'Hermès et de la nymphe Dryope (voir la fiche « Hermès »), Pan naquit avec des cornes, des sabots de bouc et un visage si étrange que sa propre mère fuit à sa vue — les autres dieux, eux, s'amusèrent de son apparence et l'adoptèrent comme l'un des leurs.",
    "Il règne sur les forêts et les troupeaux (voir la fiche « Forêt ») et peut, d'un simple cri, saisir les voyageurs d'une terreur irraisonnée dans les bois profonds — la « panique » lui doit d'ailleurs son nom.",
  ],
  "poséidon": [
    "Fils de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), frère de Zeus et d'Hadès, Poséidon reçut la mer en partage lors de la division du cosmos (voir la fiche « Mer »). D'humeur aussi changeante que les flots qu'il gouverne, il peut aussi bien porter les navires que déchaîner tempêtes et tremblements de terre d'un coup de son trident.",
    "Sa rivalité avec Athéna pour devenir le patron d'Athènes — il fit jaillir une source d'eau salée du rocher, elle offrit un olivier — illustre bien son tempérament : la force spectaculaire face à la sagesse durable, et c'est cette dernière que la ville choisit.",
    "Trois épithètes résument ses domaines mieux que tout autre : Hippios, pour son lien avec les chevaux qu'il aurait lui-même inventés ; Asphaleios, le « sécurisant », invoqué contre les tremblements de terre qu'il pouvait tout aussi bien provoquer que prévenir ; et Pélagios, pour la haute mer elle-même. Homère l'invoque aussi comme Gaieokhos et Ennosigaios, celui qui « tient » et « secoue » la terre — deux noms qui résument à eux seuls un tempérament capable de porter comme de renverser.",
  ],
  "hécate": [
    "Fille de la titanide Astéria (voir la fiche « Astéria »), Hécate hérita de sa mère une proximité particulière avec le ciel nocturne. Déesse des carrefours et des passages, elle est représentée sous une triple forme, tournée à la fois vers le ciel, la terre et les Enfers — l'une des seules divinités, avec Perséphone, à circuler librement entre les trois royaumes.",
    "Lorsque Zeus renversa les Titans et redistribua les pouvoirs de l'univers, il réserva à Hécate un traitement à part : seule parmi les divinités de l'ancienne génération, elle conserva l'intégralité de ses privilèges sur la terre, la mer et le ciel. Hésiode raconte que Zeus l'honora plus qu'aucune autre, lui laissant le pouvoir d'accorder ou de refuser son aide aux marins, aux chasseurs, aux athlètes en compétition et à quiconque l'invoque — sans jamais lui retirer la moindre part de ce qu'elle possédait avant lui.",
    "Elle fut la seule à entendre les cris de Perséphone lors de son enlèvement et l'aida ensuite à retrouver sa mère Déméter ; depuis, elle veille sur les carrefours nocturnes, la magie et tout ce qui exige de choisir une direction dans l'obscurité.",
    "Trioditis, « des trois chemins », est resté son surnom le plus emblématique, en écho direct à son association avec les carrefours — les Romains la reprendront presque telle quelle sous le nom de Trivia. Phosphoros, « celle qui porte la lumière », désigne cette même torche qu'elle tient dans la nuit ; Chthonia la rattache plus largement aux puissances souterraines, aux côtés de Déméter et de Perséphone. Un titre plus tardif, Sotira, « la Salvatrice », se retrouve surtout dans les Hymnes orphiques et des textes bien postérieurs à l'époque classique — un ajout plus récent à un culte déjà ancien plutôt qu'une caractéristique d'origine.",
  ],
  "séléné": [
    "Fille des Titans Hypérion et Théia (voir les fiches « Hypérion » et « Théia »), Séléné, déesse de la lune, traverse le ciel nocturne sur un char tiré par des chevaux ailés, tandis que son frère Hélios conduit celui du soleil le jour (voir la fiche « Lune »).",
    "Éprise du berger Endymion (voir la fiche « Endymion »), elle obtint de Zeus qu'il reste éternellement jeune et endormi, afin de pouvoir le contempler chaque nuit sans jamais le voir vieillir ni mourir.",
  ],
  "hélios": [
    "Fils des Titans Hypérion et Théia (voir les fiches « Hypérion » et « Théia »), Hélios, dieu du soleil, traverse chaque jour le ciel sur un char de feu, de l'orient à l'occident, avant de regagner l'Océan pendant la nuit pour reprendre sa course au matin suivant (voir la fiche « Soleil »). Voyant tout depuis cette hauteur, rien ne lui échappe jamais tout à fait — c'est lui qui révélera un jour à Héphaïstos les amours cachées d'Aphrodite (voir la fiche « Aphrodite »).",
    "Son fils Phaéton, voulant prouver sa filiation, obtint un jour de conduire le char à sa place — incapable d'en maîtriser les chevaux, il faillit embraser la terre entière avant que Zeus ne le foudroie pour l'arrêter. Ses sœurs, les Héliades, le pleurèrent si longtemps sur les rives du fleuve où il était tombé qu'elles furent changées en peupliers, leurs larmes durcissant en gouttes d'ambre.",
    "De l'Océanide Persé, Hélios eut plusieurs autres enfants restés célèbres : Aiétès, roi de Colchide, la magicienne Circé (voir la fiche « Circé »), et Pasiphaé, épouse du roi Minos et mère du Minotaure (voir les fiches « Minos » et « Pasiphaé ») — trois destins bien différents, mais tous marqués par une même maîtrise redoutable de la magie ou du pouvoir.",
    "Sa petite-fille Médée, fille d'Aiétès, hérita elle aussi de ce sang — et de bien plus qu'un simple don pour les sortilèges : lorsqu'elle dut fuir Corinthe après s'être vengée de Jason, c'est un char ailé tiré par des dragons, prêté par Hélios lui-même, qui l'emporta hors d'atteinte (voir la fiche « Médée »).",
    "Il aima aussi la mortelle Leucothoé, changée en arbuste à encens après avoir été enterrée vivante par son propre père, et la nymphe Clytie, qui se consuma de jalousie à l'idée de l'avoir perdu : restée à le fixer sans relâche, elle finit par s'enraciner et devenir cette fleur qui, encore aujourd'hui, tourne son visage vers le soleil tout au long du jour.",
  ],
  "minos": [
    "Roi légendaire de Crète de son vivant, Minos devint après sa mort l'un des trois juges des Enfers, réputé pour la rigueur impartiale de ses jugements — une réputation acquise du temps où il régnait déjà avec une justice sans complaisance.",
    "Sur terre, il fit construire par Dédale le Labyrinthe pour y enfermer le Minotaure, fruit d'une union contre nature de son épouse Pasiphaé (voir la fiche « Pasiphaé ») — un épisode qui n'entacha jamais, dans les Enfers, la légitimité de son jugement sur les autres âmes. C'est sa propre fille Ariane qui, en secret, permit à Thésée d'en ressortir vivant (voir la fiche « Ariane »).",
  ],
  "gaïa": [
    "Déesse primordiale, Gaïa est la Terre elle-même, apparue au tout début du monde depuis le Chaos originel (voir la fiche « Chaos ») — mère de toutes choses, des Titans aux Cyclopes en passant par les monstres les plus redoutables.",
    "C'est elle qui, lassée de la tyrannie de son époux Ouranos (voir la fiche « Ouranos »), poussa leur fils Cronos (voir la fiche « Cronos ») à le renverser, puis, plus tard, encouragea Zeus à faire de même contre les Titans devenus à leur tour trop puissants — la Terre choisissant toujours, en dernier recours, l'équilibre plutôt que la démesure d'un seul.",
  ],
  "chaos": [
    "Avant toute chose, avant même les dieux, il y eut Chaos — non pas le désordre au sens moderne, mais un vide béant, un abîme originel d'où tout allait naître. Aucun culte ne lui fut jamais rendu : Chaos n'est pas une divinité qu'on prie, mais l'origine même à partir de laquelle toute prière devient possible.",
    "De lui naquirent, sans union ni parent, les toutes premières puissances du monde : Gaïa, la Terre (voir la fiche « Gaïa »), Tartare, l'abîme le plus profond (voir la fiche « Tartare »), Érèbe, les Ténèbres (voir la fiche « Érèbe »), et Nyx, la Nuit (voir la fiche « Nyx ») — quatre forces surgies du vide, à partir desquelles s'engendra ensuite tout le reste de la généalogie divine.",
    "Chaos reste ainsi le point zéro de toute généalogie grecque : ni mâle ni femelle, ni bon ni mauvais, simplement l'espace nécessaire pour que quelque chose, un jour, commence à exister.",
  ],
  "ouranos": [
    "Fils et époux de Gaïa, la Terre (voir la fiche « Gaïa »), Ouranos est le Ciel lui-même, qui s'unit à elle pour engendrer les douze Titans, les trois Cyclopes aux yeux uniques, et les trois Hécatonchires aux cent bras — une descendance si redoutable qu'il refusa de la laisser naître, repoussant chacun de ses enfants dans les profondeurs de Gaïa dès leur venue au monde.",
    "Excédée par ce poids et par cette tyrannie, Gaïa forgea une faucille de silex et convainquit son plus jeune fils Cronos (voir la fiche « Cronos ») de l'aider à se venger. Caché en embuscade, Cronos surprit son père et le mutila au moment où celui-ci s'unissait de nouveau à la Terre, le séparant à jamais de son pouvoir.",
    "Du sang qui tomba sur la Terre naquirent les Érinyes, les Géants et les Nymphes des frênes ; jeté à la mer, le membre tranché fit naître, dans l'écume qui se forma autour de lui, la déesse Aphrodite elle-même (voir la fiche « Aphrodite »). Ouranos, détrôné, laissa place à ses fils les Titans — jusqu'à ce que l'un d'eux, à son tour, subisse le même sort.",
  ],
  "nyx": [
    "Née de Chaos (voir la fiche « Chaos »), Nyx, la Nuit, est l'une des toutes premières puissances du monde — si redoutable qu'Hésiode raconte que Zeus lui-même hésite à la contrarier (voir la fiche « Zeus »).",
    "Unie à son frère Érèbe, les Ténèbres (voir la fiche « Érèbe »), elle engendra Éther, la lumière céleste, et Héméra, le Jour — la lumière naissant ainsi, paradoxalement, de l'union de la nuit et de l'ombre.",
    "Seule, sans aucun compagnon, elle mit aussi au monde une lignée entière de forces redoutées : Thanatos, la Mort, et son frère jumeau Hypnos, le Sommeil (voir les fiches « Thanatos » et « Hypnos »), Apaté, la Tromperie (voir la fiche « Apaté »), Némésis, la vengeance qui rétablit la juste mesure (voir la fiche « Némésis »), et Éris, la Discorde (voir la fiche « Éris »).",
  ],
  "érèbe": [
    "Né de Chaos (voir la fiche « Chaos ») comme sa sœur Nyx (voir la fiche « Nyx »), Érèbe personnifie les Ténèbres — l'obscurité la plus profonde, celle qui règne sous la terre autant que dans le ciel avant l'aube.",
    "Uni à Nyx, il engendra Éther, la lumière pure qui baigne les hauteurs du ciel, et Héméra, le Jour lui-même — un couple de ténèbres dont naît, paradoxalement, la lumière du monde.",
    "Son nom finit par désigner, chez les auteurs plus tardifs, une région des Enfers à part entière : un passage obscur que les âmes devaient traverser avant d'atteindre le royaume d'Hadès (voir la fiche « Hadès »).",
  ],
  "tartare": [
    "Né de Chaos (voir la fiche « Chaos ») aux tout premiers instants du monde, Tartare est à la fois un lieu et une puissance : le gouffre le plus profond de l'univers, si loin sous la terre qu'une enclume de bronze mettrait, dit Hésiode, neuf jours entiers à y tomber depuis la surface.",
    "C'est là que Zeus enferma les Titans vaincus après la Titanomachie (voir la fiche « Zeus »), gardés par les redoutables Hécatonchires aux cent bras — un cachot d'où nul ne peut s'échapper sans l'accord du maître de l'Olympe.",
    "Uni à Gaïa (voir la fiche « Gaïa »), Tartare engendra aussi Typhon, le monstre aux cent têtes de serpent que Zeus ne put vaincre qu'au prix du combat le plus terrible de tout son règne.",
  ],
  "cronos": [
    "Plus jeune fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Cronos répondit à l'appel de sa mère et mutila son père d'un coup de faucille pour mettre fin à sa tyrannie — devenant ainsi le maître du monde à la tête des Titans.",
    "Uni à sa sœur Rhéa (voir la fiche « Rhéa »), il engendra les six premiers Olympiens : Hestia, Déméter, Héra, Hadès, Poséidon et Zeus (voir les fiches correspondantes). Mais averti qu'un de ses propres enfants le détrônerait à son tour, comme il avait lui-même détrôné son père, il avala chacun d'eux dès la naissance.",
    "Rhéa parvint à soustraire Zeus à ce sort en lui substituant une pierre emmaillotée. Devenu adulte, celui-ci contraignit son père à rendre tous les enfants engloutis, puis le vainquit à la tête des Olympiens lors de la Titanomachie, mettant fin au règne des Titans.",
    "Une tradition plus douce, surtout répandue chez les Romains sous le nom de Saturne, en fait aussi le souverain d'un Âge d'or révolu — un temps d'abondance et de paix, avant même la naissance de la démesure qui causera sa propre chute.",
  ],
  "océan": [
    "Fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Océan n'est pas la mer telle qu'on l'entend aujourd'hui, mais un fleuve immense qui encercle le disque du monde tout entier, source de toutes les eaux douces de la terre.",
    "Uni à sa sœur Téthys (voir la fiche « Téthys »), il engendra trois mille fils, les dieux-fleuves, et autant de filles, les Océanides — parmi elles Clymène, épouse du Titan Japet (voir la fiche « Clymène »), et Électre, mère d'Iris (voir la fiche « Iris »).",
    "Resté en retrait pendant la guerre des Titans, il ne prit jamais les armes contre Zeus — une neutralité qui lui valut de conserver son domaine intact quand la plupart de ses frères furent enfermés au Tartare (voir la fiche « Tartare »).",
  ],
  "téthys": [
    "Fille d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Téthys épousa son frère Océan (voir la fiche « Océan ») et mit au monde avec lui l'ensemble des fleuves et des Océanides — une descendance si nombreuse qu'Hésiode renonce lui-même à toutes les nommer.",
    "Selon une tradition rapportée par Homère, elle éleva Héra en secret durant la guerre contre les Titans (voir la fiche « Héra »), la mettant à l'abri du conflit qui opposait alors leurs deux générations.",
  ],
  "hypérion": [
    "Fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Hypérion personnifie la lumière qui vient d'en haut — son nom signifie littéralement « celui qui va au-dessus ».",
    "Uni à sa sœur Théia (voir la fiche « Théia »), il engendra trois enfants qui, à eux seuls, rythment le ciel tout entier : Hélios, le Soleil, Séléné, la Lune, et Éos, l'Aurore (voir les fiches « Hélios », « Séléné » et « Éos ») — une lignée entièrement vouée à la lumière, comme en écho direct au nom de leur père.",
  ],
  "théia": [
    "Fille d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Théia personnifie l'éclat lumineux qui permet de voir — selon certains auteurs, c'est elle qui donne à l'or, à l'argent et aux pierres précieuses leur éclat particulier, comme si sa propre nature rejaillissait sur tout ce qu'elle touche.",
    "Unie à son frère Hypérion (voir la fiche « Hypérion »), elle mit au monde Hélios, Séléné et Éos (voir les fiches « Hélios », « Séléné » et « Éos ») — le Soleil, la Lune et l'Aurore, trois enfants qui portent chacun à leur manière l'éclat de leur mère à travers le ciel.",
  ],
  "coéos": [
    "Fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Coéos personnifie, selon certains auteurs, l'intelligence questionneuse ou l'axe autour duquel tourne la voûte céleste — un domaine resté flou, Hésiode ne lui prêtant aucun exploit propre.",
    "Uni à sa sœur Phoebé (voir la fiche « Phoebé »), il engendra deux filles restées bien plus célèbres que lui : Léto, future mère d'Apollon et d'Artémis, et Astéria, mère d'Hécate (voir les fiches « Léto » et « Astéria »).",
  ],
  "phoebé": [
    "Fille d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Phoebé personnifie un éclat radieux souvent associé à la lune et au don de prophétie — un héritage qu'elle transmet à sa petite-fille Hécate (voir la fiche « Hécate »), et jusqu'au nom même d'Apollon Phoebos, son propre petit-fils.",
    "Unie à son frère Coéos (voir la fiche « Coéos »), elle mit au monde Léto et Astéria (voir les fiches « Léto » et « Astéria ») — devenant ainsi, par leurs descendants, l'arrière-grand-mère d'Apollon, d'Artémis et d'Hécate.",
  ],
  "crios": [
    "Fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Crios reste le plus effacé des douze Titans : Hésiode ne lui prête aucun domaine ni aucun exploit propre, seulement une descendance.",
    "Uni à l'Océanide Eurybie, il engendra Astréos, dieu des étoiles et père des Vents avec Éos (voir la fiche « Éos »), Pallas, dont l'union avec Styx donna Niké, Kratos, Bia et Zelos (voir les fiches « Niké », « Kratos », « Bia » et « Zelos »), et un troisième fils, Persès, un Titan marin resté largement en retrait des grands récits — à ne pas confondre avec l'homonyme mortel, fils de Persée et d'Andromède, déjà présent dans cette bibliothèque sous ce même nom.",
  ],
  "japet": [
    "Fils d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Japet est, selon Hésiode, l'ancêtre de l'humanité tout entière à travers ses fils — une lignée de Titans à la mesure toujours excessive, que ce soit dans la force, la ruse, l'étourderie ou l'orgueil.",
    "Uni à l'Océanide Clymène (voir la fiche « Clymène »), il engendra quatre fils aux destins bien distincts : Atlas, condamné à porter le ciel, Prométhée, le bienfaiteur rusé de l'humanité, Épiméthée, son frère étourdi, et Ménétios, foudroyé par Zeus pour son orgueil démesuré (voir les fiches « Atlas », « Prométhée », « Épiméthée » et « Ménétios »).",
    "Aucun de ses fils ne prit le parti de Zeus lors de la Titanomachie — Atlas y combattit même en première ligne contre lui — de sorte que la lignée entière de Japet paya, d'une manière ou d'une autre, le prix de cette défaite.",
  ],
  "mnémosyne": [
    "Fille d'Ouranos et de Gaïa (voir les fiches « Ouranos » et « Gaïa »), Mnémosyne personnifie la Mémoire — une puissance essentielle dans une civilisation où la poésie et le savoir se transmettaient d'abord de bouche à oreille, sans jamais s'écrire.",
    "Unie à Zeus (voir la fiche « Zeus ») neuf nuits consécutives, elle mit au monde les neuf Muses (voir la fiche « Muses »), chacune présidant à un art différent — comme si chaque nuit passée avec elle avait fait naître une façon distincte de se souvenir.",
    "Dans les Enfers, une source portant son nom offre aux initiés des mystères orphiques de quoi contrer l'oubli de la source de Lethée (voir la fiche « Lethée ») — boire à la fontaine de Mnémosyne, disait-on, permettait à l'âme de rester fidèle à ce qu'elle avait été, même après la mort.",
  ],
  "épiméthée": [
    "Fils du Titan Japet (voir la fiche « Japet ») et frère de Prométhée, d'Atlas et de Ménétios (voir les fiches « Prométhée », « Atlas » et « Ménétios »), Épiméthée — dont le nom signifie littéralement « celui qui réfléchit après coup » — incarne à lui seul l'inverse de son frère Prométhée, « celui qui réfléchit avant ».",
    "Prométhée l'avait pourtant averti de ne jamais accepter le moindre présent venu de Zeus. Mais lorsque Pandore, la première femme, lui fut offerte en épouse par les dieux pour punir l'humanité du feu dérobé par son frère, Épiméthée l'accueillit sans méfiance — et avec elle, la jarre scellée qu'elle portait, dont Pandore finit par soulever le couvercle malgré l'interdit, répandant sur le monde tous les maux qu'elle contenait.",
    "Seul l'Espoir resta prisonnier au fond de la jarre, refermée juste à temps — la seule consolation qu'Épiméthée, par sa confiance mal placée, ait malgré lui laissée à l'humanité.",
  ],
  "ménétios": [
    "Fils du Titan Japet (voir la fiche « Japet ») et frère d'Atlas, de Prométhée et d'Épiméthée (voir les fiches « Atlas », « Prométhée » et « Épiméthée »), Ménétios personnifie, selon Hésiode, une violence orgueilleuse et sans mesure.",
    "Lors de la guerre contre les Titans, sa démesure lui valut d'être frappé par la foudre de Zeus et précipité dans l'Érèbe, aux confins du monde (voir la fiche « Érèbe ») — le seul de la lignée de Japet à subir un châtiment aussi direct, plutôt qu'une peine éternelle comme celle réservée à son frère Atlas.",
  ],
  "clymène": [
    "Fille d'Océan et de Téthys (voir les fiches « Océan » et « Téthys »), Clymène épousa le Titan Japet (voir la fiche « Japet ») et mit au monde avec lui quatre fils aux destins hors du commun : Atlas, Prométhée, Épiméthée et Ménétios (voir les fiches « Atlas », « Prométhée », « Épiméthée » et « Ménétios »).",
    "Son nom, qui signifie « la Renommée », se retrouve porté par plusieurs autres figures de la mythologie grecque — dont l'Océanide qui donna à Hélios plusieurs enfants prestigieux (voir la fiche « Hélios ») — sans qu'aucun lien de parenté ne les unisse.",
  ],
  "athéna": [
    "Née tout armée du crâne de Zeus, après qu'il eut avalé sa mère Métis enceinte (voir la fiche « Métis »), Athéna hérita à la fois de la puissance de son père et de la ruse de sa mère.",
    "Déesse de la sagesse stratégique plutôt que de la guerre brutale, elle protège les héros rusés — Ulysse, Persée, Bellérophon — en leur offrant conseils et objets plutôt qu'en combattant à leur place, et devint la patronne d'Athènes après avoir offert à la ville l'olivier, symbole de paix durable.",
    "Il lui arrive aussi d'endosser un rôle plus maternel malgré elle : lorsque Héphaïstos, épris d'elle, la poursuit et se voit repoussé, Gaïa recueille de cette rencontre manquée l'enfant Érichthonios et le confie à Athéna pour qu'elle l'élève (voir les fiches « Héphaïstos » et « Érichthonios ») — un enfant qu'elle n'a pas conçu, mais qu'elle protège avec la même rigueur qu'elle réserve à ses héros favoris.",
    "On l'honorait sous plusieurs noms selon la part de sa protection invoquée : Parthénos, « la Vierge », a donné son nom au Parthénon qui la représente sur l'Acropole ; Polias, « gardienne de la cité », désignait son rôle de protectrice d'Athènes elle-même ; et Ergané, « l'Ouvrière », présidait aux travaux des artisans et des tisserandes — un titre qui résonne particulièrement face au destin d'Arachné, changée en araignée pour son insolence (voir la fiche « Araignée »).",
  ],
  "aphrodite": [
    "Déesse de l'amour et de la beauté, Aphrodite naquit, selon le récit le plus ancien, de l'écume de mer formée autour des membres tranchés d'Ouranos (voir la fiche « Ouranos ») — un mythe plus ancien que la naissance de la plupart des autres Olympiens. Accueillie sur le rivage de Chypre par les Heures (voir la fiche « Heures »), elle en fut parée avant d'être conduite devant les autres dieux.",
    "Sa beauté suscite jalousies et rivalités jusque parmi les dieux : c'est elle qui remporte le jugement de Pâris (voir la fiche « Pâris ») en lui promettant l'amour de la plus belle femme du monde, Hélène (voir la fiche « Hélène ») — une promesse qui déclenchera la guerre de Troie.",
    "Mariée par Zeus à Héphaïstos, le forgeron boiteux de l'Olympe, elle ne l'aima jamais vraiment : son cœur allait à Arès, dieu de la guerre (voir la fiche « Arès »). Hélios, qui voit tout depuis son char (voir la fiche « Hélios »), surprit leur liaison et la révéla à Héphaïstos, qui tendit à sa femme et son amant un filet d'or invisible et incassable, les piégeant nus devant tous les dieux assemblés, plus amusés que scandalisés. De cette union naquirent Harmonie (voir la fiche « Harmonie ») et, selon les récits les plus tardifs, Éros lui-même (voir la fiche « Éros »).",
    "Elle aima aussi le jeune Adonis, né d'un arbre à myrrhe après une naissance elle-même née d'une faute funeste. Confié encore enfant à Perséphone pour être élevé en secret, il grandit si beau que les deux déesses se le disputèrent, jusqu'à ce que Zeus tranche : Adonis partagerait son temps entre l'une et l'autre. Il choisit de passer le plus clair de ses jours auprès d'Aphrodite — jusqu'à ce qu'un sanglier, lancé sur ses traces par la jalousie d'Arès selon certains récits, le blesse mortellement à la chasse. Accourue trop tard, Aphrodite se blessa elle-même à une épine en se précipitant vers lui ; là où leurs sangs mêlés touchèrent la terre, des anémones rouges jaillirent aussitôt.",
    "Deux liaisons plus brèves lui donnèrent chacune un enfant au destin singulier : unie à Hermès (voir la fiche « Hermès »), elle enfanta Hermaphrodite, promis à une tout autre métamorphose que la sienne (voir la fiche « Hermaphrodite ») ; unie à Dionysos (voir la fiche « Dionysos »), lors d'une réconciliation passagère après cette même passion pour Adonis, elle enfanta Priape, que la jalousie d'Héra frappa dès sa naissance d'une laideur difforme (voir la fiche « Priape »).",
    "Éprise plus tard du prince troyen Anchise, elle se présenta à lui déguisée en simple mortelle et lui interdit, sous peine de la foudre de Zeus, de jamais révéler qui l'avait aimé. De leur union naquit Énée (voir la fiche « Énée ») — mais Anchise, un jour ivre, se vanta malgré tout de sa conquête divine, et la foudre promise s'abattit sur lui, l'estropiant pour le reste de sa vie.",
    "Devenue mère, elle ne cessa jamais de veiller sur Énée, jusque sur le champ de bataille de Troie : le voyant blessé par le héros grec Diomède, elle se précipita pour le soustraire aux coups en l'enveloppant de son propre voile. Diomède, encouragé par Athéna à ne pas craindre une déesse étrangère à la guerre, la blessa elle-même au poignet de sa lance, faisant jaillir l'ichor, le sang immortel des dieux, plutôt que du sang mortel. Blessée, Aphrodite dut laisser son fils aux mains d'Apollon qui le soustrait aussitôt aux Grecs en l'enveloppant d'un nuage, puis l'emporte jusqu'à son propre sanctuaire de Pergame. Léto et Artémis le soignent alors, et le couvrent de gloire, tandis qu'un fantôme à son image se bat à sa place pour tromper les assaillants (voir la fiche « Apollon »).",
    "Deux épithètes résument à elles seules la tension entre ses visages : Ourania, « la Céleste », désignait selon Platon un amour plus spirituel, né d'Ouranos sans mère et honoré sans vin dans ses libations ; Pandémos, « de tout le peuple », son exact opposé, l'amour commun et partagé — un contraste que Platon développe dans son Banquet. Une autre facette, plus inattendue, l'associait directement à son amant : à Sparte, on la représentait en armes sous le nom d'Aphrodite Areia, « la Guerrière », semblable en tout point à Arès lui-même (voir la fiche « Arès »).",
  ],
  "nérée": [
    "Surnommé le « Vieillard de la mer », Nérée est un dieu marin plus ancien que Poséidon, réputé pour sa sagesse, sa bienveillance et son don de prophétie, contrairement à d'autres divinités marines plus tumultueuses.",
    "Père de cinquante Néréides dont Thétis (voir la fiche « Thétis »), mère d'Achille, il incarne un versant plus paisible de la mer (voir la fiche « Mer ») — la sagesse plutôt que la tempête.",
  ],
  "bellérophon": [
    "Héros grec, Bellérophon parvint à dompter Pégase, le cheval ailé né du sang de la Gorgone Méduse, grâce à un mors d'or offert par Athéna en songe.",
    "Monté sur Pégase, il vainquit la Chimère, monstre crachant le feu — mais voulut ensuite s'élever jusqu'à l'Olympe lui-même, un excès de démesure que Zeus punit en envoyant un taon piquer Pégase, précipitant Bellérophon à terre pour le reste de sa vie.",
  ],
  "éos": [
    "Fille des Titans Hypérion et Théia (voir les fiches « Hypérion » et « Théia »), Éos, déesse de l'aurore, ouvre chaque matin les portes du ciel pour annoncer le passage du char d'Hélios, son frère — ses doigts de rose colorent le ciel juste avant le lever du jour (voir la fiche « Aurore »).",
    "Éprise de plusieurs mortels, dont Tithonos, elle obtint pour lui l'immortalité mais oublia de demander aussi l'éternelle jeunesse : il vieillit sans jamais pouvoir mourir, jusqu'à se réduire à une simple voix — changé, selon une tradition plus tardive, en cigale, dont le chant strident perpétue encore aujourd'hui cette plainte sans fin.",
    "Elle aima aussi le chasseur Orion, qu'elle emporta à Délos pour vivre à ses côtés, avant qu'il ne devienne le compagnon de chasse d'Artémis (voir la fiche « Orion »).",
    "Unie à Astréos, dieu des étoiles, elle mit aussi au monde les quatre vents, dont Borée, le vent du Nord (voir la fiche « Borée ») — une aurore qui n'ouvre pas seulement le ciel au soleil, mais engendre aussi les souffles qui le traversent.",
  ],
  "niké": [
    "Déesse ailée de la victoire, Niké accompagne indifféremment les vainqueurs, sans jamais prendre elle-même part au combat — elle couronne l'issue plutôt que de la déterminer.",
    "Fille du Titan Pallas et de Styx, elle se rangea aux côtés de Zeus dès la guerre contre les Titans, et resta depuis une fidèle compagne de son char, symbole d'un triomphe qui se mérite sans jamais se garantir d'avance.",
    "Trois de ses frères et sœurs firent le même choix qu'elle et reçurent la même récompense : Kratos, la Puissance (voir la fiche « Kratos »), Bia, la Force (voir la fiche « Bia »), et Zelos, le Zèle rival (voir la fiche « Zelos »), devinrent eux aussi des compagnons permanents du trône de Zeus.",
  ],
  "hestia": [
    "Fille de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), sœur aînée de Zeus, Hestia est la déesse du foyer et gardienne de la flamme sacrée qui brûle au centre de chaque maison comme de chaque cité.",
    "Courtisée par Apollon et Poséidon, elle refusa tout mariage et obtint de Zeus de rester à jamais vierge, s'installant définitivement au cœur de l'Olympe plutôt que de suivre l'un ou l'autre — une place discrète mais essentielle, puisque aucun foyer ne peut exister sans elle.",
    "Hestia se distingue par l'absence presque totale de titres de culte qui lui soient propres : sa place n'est jamais celle d'un sanctuaire précis, mais celle, rituelle, du tout premier et du tout dernier geste — on ne pouvait, disait-on, verser dignement une libation sans l'invoquer à la fois en ouverture et en clôture de toute cérémonie. Chaque prytanée, le foyer commun de chaque cité, faisait ainsi office de temple, sans qu'elle ait jamais eu besoin d'un nom particulier pour se le voir dédié.",
  ],
  "héphaïstos": [
    "Fils d'Héra, Héphaïstos naquit si chétif ou si laid, selon les versions, que sa mère le rejeta du haut de l'Olympe — une chute qui le laissa boiteux pour le restant de son existence.",
    "Devenu le forgeron des dieux malgré ce rejet initial, il créa les armes et merveilles les plus admirées de l'Olympe, du bouclier d'Achille aux flèches d'Éros, prouvant par son art ce que sa naissance semblait lui interdire.",
    "Parmi ses créations les plus prisées, il façonna pour sa propre épouse Aphrodite (voir la fiche « Aphrodite ») une ceinture magique capable de rendre irrésistible quiconque la porte — un bijou si redouté qu'Héra elle-même (voir la fiche « Héra ») l'emprunta un jour en secret pour mieux détourner l'attention de Zeus, le temps que Poséidon vienne en aide aux Grecs sur le champ de bataille de Troie.",
    "Épris d'Athéna (voir la fiche « Athéna »), qui refusait pourtant tout mariage, il tenta un jour de s'unir à elle de force. Elle se déroba, et sa semence tomba sur la terre lorsqu'elle l'essuya avec un morceau de laine — de ce contact naquit Érichthonios, mi-enfant mi-serpent, que Gaïa, mère de toutes choses, remit alors à Athéna elle-même pour qu'elle l'élève. N'étant fils d'Athéna que par cette adoption, Érichthonios grandit sous sa seule protection avant de devenir, une fois adulte, l'un des premiers rois légendaires d'Athènes (voir la fiche « Érichthonios »).",
    "Homère le désigne souvent par l'épithète purement descriptive d'Amphigyeis, « boiteux des deux jambes » — un surnom qui rappelle son infirmité plutôt qu'un véritable titre de culte. Un lien plus incertain le rattache aux Cabires, ces divinités mineures d'un culte à mystères sur l'île de Lemnos et à Samothrace, parfois présentées comme ses propres fils — une parenté que les sources anciennes n'établissent jamais aussi clairement qu'on pourrait le croire.",
  ],
  "himeros": [
    "Dieu ailé du désir soudain, Himeros accompagne Éros et Aphrodite dans leur cortège, incarnant cette part du désir qui surgit sans prévenir, avant même que la raison n'ait le temps d'intervenir.",
    "Moins connu qu'Éros, il en partage le même registre — le désir irrésistible — mais dans sa forme la plus immédiate : l'élan plutôt que la flèche qui vise.",
  ],
  "énée": [
    "Fils d'Aphrodite et du mortel Anchise, Énée combattit du côté troyen pendant la guerre de Troie, protégé à plusieurs reprises par sa mère au cœur des combats — jusqu'à ce qu'elle soit elle-même blessée par le héros grec Diomède en tentant de le soustraire aux coups (voir la fiche « Aphrodite »).",
    "À la chute de Troie, il porta sur son dos son père âgé et mena son fils par la main hors de la ville en flammes, fidèle jusque dans la ruine de sa cité — un périple qui, selon la légende romaine, le mènera à fonder la lignée dont naîtra Rome.",
    "Après des années d'errance en mer, sa flotte échoue à Carthage, où règne la reine Didon (voir la fiche « Didon »). Elle s'éprend de lui — un amour qu'Aphrodite favorise elle-même en secret, en envoyant son fils Éros attiser leur passion (voir la fiche « Éros ») — et Énée s'attarde à ses côtés, prêt à oublier sa mission pour y rester. Zeus, inquiet de le voir s'égarer de son destin, envoie Hermès (voir la fiche « Hermès ») lui rappeler qu'il ne lui appartient pas de choisir : il doit repartir fonder en Italie la lignée d'où naîtra Rome. Énée s'exécute et quitte Carthage sans un dernier adieu ; Didon, désespérée, se donne la mort sur un bûcher, non sans avoir maudit sa descendance — une malédiction que la tradition romaine lira plus tard comme l'origine mythique des guerres puniques entre Rome et Carthage.",
  ],
  "zéphyr": [
    "Dieu du vent d'ouest, Zéphyr est réputé le plus doux des vents, celui qui annonce le printemps et fait éclore les fleurs sur son passage.",
    "Il n'en reste pas moins capable de jalousie brutale : amoureux éconduit de Chloris (voir la fiche « Chloris »), il détourna par dépit un disque lancé par Apollon, tuant accidentellement le jeune Hyacinthe (voir la fiche « Hyacinthe ») que le dieu aimait — preuve que même le plus doux des vents peut tourner à la tempête.",
  ],
  "éole": [
    "Gardien des vents, Éole les tient enfermés dans une outre ou une caverne selon les récits, ne les libérant qu'au compte-goutte pour ne pas déchaîner le chaos sur terre et sur mer.",
    "Il offrit un jour à Ulysse une outre contenant tous les vents contraires, ne laissant souffler que celui qui le ramènerait chez lui — un cadeau que l'équipage du héros, croyant y trouver un trésor, ouvrit par curiosité, relâchant la tempête qui les ramena au point de départ.",
  ],
  "chloris": [
    "Déesse des fleurs, Chloris transforme en jardin chaque lieu qu'elle traverse — son simple souffle suffit, dit-on, à faire éclore les plantes sur son passage.",
    "Enlevée par Zéphyr, le vent d'ouest, qui l'épousa ensuite en réparation, elle devint la déesse romaine Flora sous une autre identité — l'un des rares mythes grecs où la déesse enlevée obtient en retour un domaine et un pouvoir propres.",
  ],
  "triptolème": [
    "Jeune prince formé par Déméter elle-même, en reconnaissance de l'hospitalité que sa famille lui offrit alors qu'elle cherchait sa fille Perséphone à travers le monde, Triptolème reçut de la déesse l'art de cultiver le blé.",
    "Monté sur un char ailé tiré par des dragons, il parcourut la terre entière pour enseigner l'agriculture à tous les peuples, devenant ainsi le messager du plus grand don de Déméter aux hommes.",
  ],
  "ploutos": [
    "Dieu de la richesse et de l'abondance des récoltes, Ploutos est le fils de Déméter — un lien qui rattache la richesse à la fertilité de la terre plutôt qu'à l'or amassé.",
    "Zeus le rendit aveugle pour qu'il distribue ses faveurs sans favoritisme, sans distinguer les bons des mauvais — une richesse qui, depuis, tombe autant sur le mérite que sur le hasard.",
  ],
  "jason": [
    "Héritier légitime du trône d'Iolcos, écarté par son oncle Pélias, Jason fut confié encore enfant au centaure Chiron (voir la fiche « Chiron »), sur le mont Pélion, aux côtés d'Achille et d'Asclépios. Devenu adulte, il vint réclamer son trône ; Pélias, feignant d'accepter, lui imposa en échange une mission jugée impossible : ramener des confins du monde connu la Toison d'or, gardée en Colchide par un dragon ne dormant jamais.",
    "Il rassembla pour ce voyage les plus grands héros grecs de sa génération à bord du navire Argo, les Argonautes — parmi eux Castor et Pollux (voir les fiches « Castor » et « Pollux »), qui prirent part à l'expédition avant leurs propres exploits les plus célèbres.",
    "Le roi Aiétès, père de Médée (voir la fiche « Médée »), ne consentit à lui céder la Toison qu'à condition de réussir seul trois épreuves : atteler deux taureaux aux sabots de bronze crachant le feu, labourer avec eux un champ entier, puis y semer des dents de dragon d'où surgirent aussitôt des guerriers tout armés — un même motif que celui qui fondera plus tard Thèbes sous les mains de Cadmos (voir la fiche « Cadmos »), Jason jetant une pierre au milieu d'eux pour qu'ils se prennent les uns pour les autres et s'entretuent. Seule l'aide secrète de Médée, déjà experte en sortilèges et éprise de lui, lui permit de survivre à chacune, avant qu'elle n'endorme elle-même, d'un chant et d'un philtre, le dragon qui gardait la Toison.",
    "Leur fuite ne fut pas sans prix : pour retarder Aiétès lancé à leur poursuite, Médée découpa en morceaux son propre frère Absyrtos et les jeta un à un à la mer, le temps que leur père s'arrête pour les recueillir (voir la fiche « Médée »).",
    "De retour à Iolcos, Jason trouva Pélias toujours sur le trône, sa promesse oubliée. Médée se chargea seule de la vengeance : elle convainquit les propres filles du roi de le rajeunir en le découpant et en le faisant bouillir dans un chaudron magique, leur en faisant d'abord la démonstration sur un vieux bélier qui en ressortit agneau — mais le sortilège ne joua jamais pour leur père, et Pélias mourut de leurs mains sans jamais renaître. Bannis d'Iolcos pour ce meurtre, Jason et Médée se réfugièrent à Corinthe, où le couple devait connaître, des années plus tard, la fin la plus amère de tous (voir la fiche « Médée »).",
    "Séparé de Médée et de toute descendance après sa trahison, Jason vécut ses derniers jours diminué, sans gloire ni royaume. Une tradition tardive raconte qu'il mourut assis à l'ombre de son propre navire, échoué et pourrissant sur le rivage depuis des années : la proue vermoulue de l'Argo se détacha soudain et s'abattit sur lui, mettant fin à ses jours sous les restes du navire même qui avait fait sa gloire.",
  ],
  "achille": [
    "Fils de la Néréide Thétis et du roi mortel Pélée (voir la fiche « Thétis »), Achille fut plongé enfant dans le Styx, la rivière infernale (voir la fiche « Rivière »), par une mère qui espérait ainsi le rendre invulnérable — seul son talon, par lequel elle le tenait, échappa aux eaux, et devait bien plus tard causer sa perte.",
    "Confié au centaure Chiron (voir la fiche « Chiron ») sur le mont Pélion pour y apprendre la médecine, la musique et le maniement des armes, Achille grandit sous une prophétie sans appel : une vie longue mais sans gloire, ou une vie brève mais immortalisée par l'exploit. Pour tenter d'échapper à ce second destin, Thétis le déguisa en jeune fille à la cour du roi Lycomède, sur l'île de Skyros — où il devint pourtant l'amant de la princesse Déidamie, avec qui il eut un fils, Néoptolème, avant qu'Ulysse (voir la fiche « Ulysse ») ne le démasque en dissimulant une épée parmi des présents destinés aux jeunes filles du palais : seule la nouvelle venue s'en saisit aussitôt.",
    "Une fois recruté pour la guerre de Troie, Achille y mena son propre peuple, les Myrmidons de Phthie — selon la légende, d'anciennes fourmis changées en hommes par Zeus pour repeupler l'île d'Égine, au service de son grand-père Éaque. Le plus fameux conflit de l'Iliade éclate pourtant loin du champ de bataille : contraint de rendre sa propre captive Chryséis (voir la fiche « Chryséis ») pour apaiser la colère d'Apollon, Agamemnon (voir la fiche « Agamemnon ») s'empare en représailles de Briséis (voir la fiche « Briséis »), la captive d'Achille — une humiliation qui le pousse à se retirer des combats et laisse les Grecs perdre du terrain.",
    "Seule la mort de Patrocle, son compagnon le plus cher, tombé sous les coups d'Hector alors qu'il portait les propres armes d'Achille pour rallier les Grecs en déroute, le fait reprendre les armes. Fou de chagrin, Achille tue Hector en duel sous les murs de Troie puis traîne son corps derrière son char plusieurs jours durant, jusqu'à ce que le vieux roi Priam vienne en personne, de nuit et sans escorte, franchir la porte Scée (voir la fiche « Porte ») pour le supplier de lui rendre la dépouille de son fils.",
    "Peu après, une reine des Amazones venue prêter main-forte à Troie, Penthésilée (voir la fiche « Penthésilée »), l'affronte à son tour : Achille la tue en duel et, dit-on, pleure en découvrant la beauté de celle qu'il vient d'abattre — seule Amazone reconnue par les textes anciens comme véritable fille d'Arès (voir la fiche « Arès »).",
    "Invincible en apparence, Achille tombe pourtant devant cette même porte Scée, tué d'une flèche que Pâris (voir la fiche « Pâris ») décoche mais qu'Apollon guide lui-même jusqu'à son unique point faible, le talon. Son fils Néoptolème (voir la fiche « Néoptolème »), resté caché sur Skyros pendant toute la guerre, est appelé à Troie après cette mort — un oracle affirme que la ville ne peut tomber sans lui —, où il se révèle aussi impitoyable que farouche, jusqu'à tuer le vieux Priam (voir la fiche « Priam ») au pied même d'un autel lors de la prise de la ville.",
  ],
  "atlas": [
    "Fils du Titan Japet (voir la fiche « Japet »), Atlas combattit aux côtés de ses frères contre Zeus et fut condamné, à leur défaite, à porter la voûte céleste sur ses épaules pour l'éternité — non la Terre, comme on le croit souvent, mais le ciel lui-même.",
    "Héraclès, venu chercher les pommes d'or du jardin des Hespérides (voir la fiche « Hespérides »), proposa un temps de porter le ciel à sa place pendant qu'Atlas allait chercher les pommes — un répit que le Titan dut abandonner, ruse d'Héraclès à l'appui, pour reprendre son fardeau.",
    "Une tradition plus tardive raconte aussi comment Atlas devint la chaîne de montagnes qui porte aujourd'hui son nom : ayant refusé l'hospitalité à Persée de passage, il fut pétrifié d'un seul regard par la tête de la Gorgone Méduse que le héros rapportait (voir la fiche « Persée »).",
  ],
  "psyché": [
    "Mortelle d'une beauté si extraordinaire qu'elle suscita la jalousie d'Aphrodite (voir la fiche « Aphrodite »), Psyché fut aimée en secret par Éros, qui lui interdit de jamais chercher à voir son visage.",
    "Rongée par la curiosité, elle finit par l'éclairer une nuit à la lueur d'une lampe et le perdit aussitôt. Pour le retrouver, elle dut se soumettre à Aphrodite, qui lui imposa quatre épreuves conçues pour être impossibles à surmonter par une simple mortelle.",
    "La première consistait à trier avant la nuit tombée un immense tas de graines mélangées — blé, orge, millet, pavot, pois chiches — grain par grain. Des fourmis, prises de pitié devant tant de patience désespérée, achevèrent le tri à sa place pendant qu'elle pleurait, épuisée.",
    "La deuxième l'envoyait récolter la toison d'or de béliers du soleil, si redoutables qu'ils encornaient quiconque les approchait en plein jour. Un roseau du fleuve, ému par sa détresse, lui conseilla d'attendre le soir, quand les bêtes se reposaient à l'ombre : elle put alors simplement cueillir la laine restée accrochée aux buissons, sans jamais affronter les béliers eux-mêmes.",
    "La troisième la menait remplir un vase de cristal à une source glacée jaillissant d'une paroi à pic, gardée par des dragons et alimentant le Styx — un lieu littéralement inaccessible à un être humain. L'aigle de Zeus, redevable envers Éros, s'en chargea lui-même en s'envolant remplir le vase à sa place.",
    "La dernière exigeait de descendre aux Enfers demander à Perséphone un peu de sa beauté, enfermée dans une boîte à ne jamais ouvrir. Guidée par les conseils précis d'une tour, elle apprit à refuser toute pitié en chemin — un vieillard, un tisserand, une main tendue hors d'un fleuve, autant de pièges destinés à lui faire perdre les deux pièces réservées à Charon et les deux gâteaux d'orge destinés à apaiser Cerbère. Elle traversa ainsi les Enfers sans encombre — mais, cédant une dernière fois à la même curiosité qui l'avait déjà perdue avec la lampe, elle ouvrit la boîte sur le chemin du retour et sombra aussitôt dans un sommeil semblable à la mort, dont seul Éros parvint à la réveiller.",
    "Touché par tant d'épreuves traversées pour lui, Éros obtint de Zeus que Psyché soit rendue immortelle et officiellement mariée à ses côtés sur l'Olympe.",
    "Chacune de ces épreuves se résout non par la force, mais par la patience, l'humilité à accepter une aide extérieure et, à l'inverse, la rechute dans l'impulsivité qui l'avait perdue une première fois : le nom même de Psyché signifie « âme » en grec, et son parcours est resté la figure même de l'âme qui doit traverser l'épreuve et la tentation pour atteindre l'union complète.",
  ],
  "charites": [
    "Trois déesses de la grâce et de la joie — le plus souvent nommées Aglaé (voir la fiche « Aglaé »), Euphrosyne et Thalia —, les Charites ne sont jamais représentées seules : elles dansent toujours ensemble, indissociables les unes des autres.",
    "Compagnes d'Aphrodite et des Muses, elles président à tout ce qui rend la vie belle sans nécessité — la beauté, la fête, la reconnaissance — plutôt qu'à ce qui est simplement utile. Les Heures (voir la fiche « Heures ») se joignent souvent à elles dans les cortèges divins, deux groupes de déesses toujours dansantes qu'on associe volontiers l'un à l'autre.",
    "Leur habileté ne se limite pas à la danse : elles tissèrent de leurs propres mains la robe de noces d'Harmonie (voir la fiche « Harmonie »), le jour de son mariage avec Cadmos — un vêtement d'une beauté si rare qu'il resta, aux côtés du collier forgé par Héphaïstos pour la même occasion, l'un des présents les plus légendaires jamais offerts à une mortelle.",
  ],
  "narcisse": [
    "Jeune homme d'une beauté remarquable, Narcisse repoussait sans exception tous ceux qui l'aimaient, dont la nymphe Écho (voir la fiche « Écho »), inconsolable de son rejet.",
    "Puni par Némésis (voir la fiche « Némésis ») pour son indifférence, il aperçut un jour son propre reflet dans une source et en tomba éperdument amoureux, incapable de s'en détacher jusqu'à en mourir sur place — incapable de voir qu'aucun amour, pas même le sien, ne pouvait lui être rendu par une image.",
  ],
  "écho": [
    "Nymphe bavarde, Écho fut punie par Héra, qui découvrit qu'elle la distrayait volontairement pour couvrir les infidélités de Zeus : elle perdit dès lors la capacité de parler la première, condamnée à ne répéter que les derniers mots d'autrui.",
    "Éprise de Narcisse, elle ne put jamais lui déclarer son amour autrement qu'en répétant ses propres paroles, et se consuma de chagrin après son rejet jusqu'à ne plus laisser d'elle qu'une voix, dit-on, résonnant encore dans les montagnes.",
  ],
  "circé": [
    "Fille d'Hélios (voir la fiche « Hélios ») et magicienne experte en herbes et en breuvages, Circé vit sur une île isolée où elle transforme en animaux les voyageurs qui s'y aventurent sans méfiance — c'est ainsi qu'elle changea en pourceaux une partie de l'équipage d'Ulysse. Sa nièce Médée, fille de son frère Aiétès, hérita d'un don comparable pour la magie, mais tourné vers un tout autre destin (voir la fiche « Médée »).",
    "Des années plus tard, cette même nièce vint jusqu'à son île implorer d'être purifiée du sang de son propre frère, versé en fuyant la Colchide avec Jason (voir la fiche « Jason »). Circé accepta le rite — mais seulement par égard pour le lien de sang qui l'unissait à Médée, jamais pour Jason lui-même, resté pour elle un étranger qu'elle ne chercha jamais à connaître davantage.",
    "Ulysse, protégé par une plante magique offerte par Hermès, résista à son sortilège et la contraignit à rendre à ses hommes leur forme humaine. Il resta ensuite une année entière sur son île, dont naquit un fils, Télégonos (voir la fiche « Télégonos ») — qui, des années plus tard et sans le reconnaître, tuera son propre père, achevant malgré lui une prophétie qui pesait sur Ulysse depuis son retour à Ithaque. Certaines traditions plus tardives lui donnent aussi une fille de cette même union, Cassiphoné.",
    "Sa magie ne sert pas qu'à punir les intrus : par jalousie, elle change aussi la nymphe Scylla en monstre. Éprise du dieu marin Glaucos, lui-même épris de Scylla, Circé empoisonne la source où celle-ci se baigne — la nymphe en ressort affublée d'une ceinture de têtes de chiens hurlants, condamnée à hanter pour toujours un détroit périlleux de la mer, face au tourbillon de Charybde (voir la fiche « Mer »).",
    "Elle inflige un sort semblable à Picus (voir la fiche « Picus »), roi du Latium déjà marié à la nymphe Canens : le voyant refuser ses avances par fidélité, elle le change en pic — l'oiseau porte encore aujourd'hui son nom latin, picus. Deux amours contrariés, deux métamorphoses : la magie de Circé transforme aussi souvent qu'elle punit.",
  ],
  "thétis": [
    "Fille de Nérée (voir la fiche « Nérée »), Thétis est une Néréide capable de se métamorphoser à volonté — feu, eau, lion, serpent — pour échapper à qui cherche à la retenir. Zeus et Poséidon la convoitèrent tous deux, jusqu'à ce qu'une prophétie annonce que le fils de Thétis surpasserait son père : par prudence, les deux dieux renoncèrent et la marièrent à un simple mortel, Pélée.",
    "Pélée ne put l'épouser qu'en la maintenant de force à travers toutes ses métamorphoses, sur les conseils de Chiron (voir la fiche « Chiron ») — une lutte que Thétis finit par accepter sans jamais renoncer à sa propre nature changeante. Leurs noces, auxquelles Éris, déesse de la Discorde, ne fut pas conviée (voir la fiche « Éris »), déclenchèrent l'épisode de la pomme d'or qui mènera plus tard au jugement de Pâris (voir la fiche « Pâris »).",
    "De cette union naquit Achille (voir la fiche « Achille »), qu'elle tenta de rendre invulnérable en le plongeant dans le Styx, la rivière infernale (voir la fiche « Rivière »), puis de soustraire à son destin en le déguisant en jeune fille à la cour du roi Lycomède — une ruse qu'Ulysse finit par déjouer. Jusqu'au bout, Thétis lutta avec une ténacité sans faille contre une prophétie qu'elle savait pourtant ne jamais pouvoir empêcher.",
  ],
  "amphitrite": [
    "Fille de Nérée et de l'Océanide Doris (voir la fiche « Nérée »), Amphitrite était l'une des cinquante Néréides — mais c'est elle seule que Poséidon choisit pour épouse, reine à ses côtés de tout le royaume des mers.",
    "Réticente à l'idée du mariage, elle s'enfuit se réfugier auprès du Titan Atlas plutôt que de céder à ses avances. Poséidon envoya plusieurs messagers à sa recherche, mais c'est un simple dauphin qui finit par la retrouver et la convainquit de revenir — en récompense, le dieu plaça l'animal parmi les étoiles, où brille encore aujourd'hui la constellation du Dauphin.",
    "Devenue reine des mers, elle mit au monde Triton, messager marin mi-homme mi-poisson qui soufflait dans une conque pour apaiser ou déchaîner les flots sur l'ordre de son père, ainsi que Rhodé, nymphe qui donna plus tard son nom à l'île de Rhodes.",
    "Une tradition plus rare, rapportée par Apollodore, lui attribue aussi la transformation de la nymphe Scylla en monstre, par jalousie envers Poséidon épris d'elle — une version bien moins suivie que celle, popularisée par Ovide, où c'est Circé qui s'en charge par dépit amoureux (voir la fiche « Circé »).",
  ],
  "pythie": [
    "Prêtresse d'Apollon au temple de Delphes (voir la fiche « Temple »), la Pythie rendait ses oracles assise sur un trépied placé au-dessus d'une faille d'où s'échappaient, croyait-on, des vapeurs inspirant ses transes prophétiques.",
    "Ses réponses, données dans un état second, étaient réputées ambiguës autant qu'infaillibles — c'est elle qui annonça au roi Crésus que, s'il attaquait la Perse, il détruirait un grand empire, sans préciser lequel des deux ce serait.",
  ],
  "endymion": [
    "Berger — ou, selon d'autres versions, roi ou chasseur — d'une beauté remarquable, Endymion fut aperçu et aimé par Séléné, déesse de la lune (voir la fiche « Séléné »), alors qu'il dormait sur le mont Latmos.",
    "Pour pouvoir le contempler chaque nuit sans jamais le voir vieillir ni mourir, elle obtint de Zeus qu'il reste plongé dans un sommeil éternel — un amour figé dans l'instant, préservé au prix de tout le reste.",
  ],
  "charon": [
    "Passeur des Enfers, Charon fait traverser aux âmes des morts la rivière infernale du Styx (voir la fiche « Rivière ») à bord de sa barque, à condition qu'elles puissent lui payer l'obole traditionnellement placée sous la langue des défunts.",
    "Les âmes qui n'ont pas reçu de sépulture ni de pièce pour le passeur restent condamnées à errer sur la rive sans jamais pouvoir traverser — un détail qui rappelle que, dans la Grèce antique, le rite funéraire compte autant que la mort elle-même.",
  ],
  "ulysse": [
    "Roi d'Ithaque réputé pour sa ruse plus que pour sa force — une ruse qu'on dit héritée de son grand-père maternel Autolycos, fils d'Hermès et voleur incomparable (voir la fiche « Hermès ») —, Ulysse conçut le stratagème du cheval de bois qui permit enfin aux Grecs de s'emparer de Troie après dix années de siège infructueux.",
    "Son retour chez lui prit dix années supplémentaires, semées d'épreuves — le Cyclope Polyphème, les sirènes, Circé, Charybde et Scylla — durant lesquelles son intelligence lui permit chaque fois d'échapper à des périls que la seule force n'aurait pas surmontés.",
  ],
  "pénélope": [
    "Fille du roi Icarios et cousine d'Hélène et de Clytemnestre (voir les fiches « Hélène » et « Clytemnestre »), Pénélope épousa Ulysse (voir la fiche « Ulysse »), roi d'Ithaque, peu avant que celui-ci ne parte combattre à Troie — laissant derrière lui une épouse enceinte de leur fils Télémaque (voir la fiche « Télémaque ») et un royaume qu'elle dut gouverner seule pendant vingt années.",
    "Durant l'absence prolongée de son mari, présumé mort par beaucoup, une foule de prétendants envahit le palais d'Ithaque pour la contraindre à un nouveau mariage. Pénélope les tint à distance par la ruse : elle promit de choisir un époux dès qu'elle aurait terminé de tisser le linceul funéraire de son beau-père Laërte, mais défaisait chaque nuit, en secret, l'ouvrage du jour — un stratagème qui dura trois ans, jusqu'à ce qu'une servante infidèle la trahisse.",
    "À son retour, Ulysse, déguisé en mendiant pour ne pas être reconnu, retrouva son palais livré aux prétendants ; Pénélope organisa alors l'épreuve de l'arc (voir la fiche « Arc ») — nul ne pouvant prétendre à sa main sans réussir à le bander et à tirer une flèche à travers douze anneaux alignés —, épreuve qu'aucun des prétendants ne put surmonter, et que le mendiant inconnu accomplit sans effort avant de révéler sa véritable identité et de massacrer les prétendants avec l'aide de son fils.",
    "Même alors, Pénélope hésita à reconnaître son époux après vingt ans d'absence, et le mit à l'épreuve : elle ordonna qu'on déplace leur lit nuptial, construit autour du tronc d'un olivier vivant et donc impossible à déplacer sans le briser — un secret que seuls eux deux connaissaient. La réaction indignée d'Ulysse, découvrant le piège, lui apporta la preuve qu'elle cherchait, et les deux époux furent enfin réunis.",
  ],
  "télégonos": [
    "Fils d'Ulysse et de la magicienne Circé (voir les fiches « Ulysse » et « Circé »), conçu durant l'année que son père passa sur l'île d'Aiaié avant de reprendre la mer vers Ithaque, Télégonos grandit seul auprès de sa mère, sans jamais connaître ce père reparti avant même sa naissance.",
    "Devenu adulte, il partit à sa recherche, armé d'une lance dont la pointe avait été trempée par Circé dans le venin d'une raie — un choix guidé par une prophétie voulant que la mort d'Ulysse vienne un jour de la mer. Une tempête le jeta sur une île qu'il ne reconnut pas pour Ithaque, et qu'il se mit à piller pour ravitailler son équipage.",
    "Ulysse et son fils Télémaque (voir la fiche « Télémaque ») accoururent défendre leurs terres contre cet inconnu ; dans l'affrontement qui suivit, Télégonos blessa mortellement son propre père sans le savoir, accomplissant malgré lui la vieille prophétie qui pesait sur Ulysse depuis son retour de Troie. Ce n'est qu'en découvrant l'identité du mourant qu'il comprit l'ampleur de son geste.",
    "Fou de chagrin, il ramena le corps d'Ulysse jusqu'à Aiaié, avec Pénélope (voir la fiche « Pénélope ») et Télémaque : Circé rendit alors les trois mortels immortels. Une tradition plus tardive, l'ancienne Télégonie, referme le cycle par un double mariage inattendu — Télégonos épousant Pénélope, veuve de son propre père, tandis que Télémaque épousait Circé elle-même.",
  ],
  "télémaque": [
    "Fils unique d'Ulysse et de Pénélope (voir les fiches « Ulysse » et « Pénélope »), Télémaque n'était qu'un nourrisson quand son père partit combattre à Troie ; il grandit à Ithaque sans jamais l'avoir connu, entouré des prétendants qui, profitant de cette absence prolongée, envahissaient le palais et dilapidaient ses biens en attendant d'épouser sa mère.",
    "Devenu jeune homme, encouragé par la déesse Athéna (voir la fiche « Athéna »), qui prit pour l'occasion les traits du vieux Mentor, il partit en quête de nouvelles de son père — un voyage qui le mena d'abord chez le sage Nestor à Pylos, puis à Sparte auprès de Ménélas et d'Hélène (voir les fiches « Ménélas » et « Hélène »), sans jamais obtenir de certitude sur le sort d'Ulysse.",
    "À son retour à Ithaque, il retrouva son père rentré en secret, déguisé en mendiant pour échapper aux prétendants ; c'est à lui seul, avant tout autre, qu'Ulysse révéla sa véritable identité. Télémaque l'aida à préparer leur vengeance — retirant discrètement les armes de la grande salle pour désarmer les prétendants — puis combattit à ses côtés lors du massacre qui suivit l'épreuve de l'arc (voir la fiche « Arc »).",
    "Une tradition plus tardive, l'ancienne Télégonie, prolonge son histoire au-delà de l'Odyssée : après la mort accidentelle d'Ulysse, tué par son demi-frère Télégonos (voir la fiche « Télégonos »), Télémaque épousa la magicienne Circé (voir la fiche « Circé »), mère de Télégonos, tandis que ce dernier épousait Pénélope, veuve de son propre père.",
  ],
  "andromède": [
    "Princesse éthiopienne, Andromède fut enchaînée à un rocher au bord de la mer en offrande expiatoire à un monstre marin, envoyé par Poséidon pour punir sa mère Cassiopée de s'être vantée d'une beauté supérieure à celle des Néréides (voir la fiche « Cassiopée »).",
    "Persée (voir la fiche « Persée »), revenant de sa victoire sur la Gorgone Méduse, la découvrit ainsi exposée et la sauva du monstre avant de l'épouser — porté par ses seules sandales ailées, et non par Pégase, né du sang de Méduse à sa mort seulement et donc encore inexistant à cet instant, malgré une image plus tardive qui les associe volontiers. Les Grecs placèrent ensuite ce couple parmi les étoiles (voir la fiche « Étoile »).",
  ],
  "hécube": [
    "Reine de Troie, épouse du roi Priam (voir la fiche « Priam »), Hécube mit au monde un très grand nombre d'enfants, parmi lesquels Hector, Pâris et Cassandre (voir les fiches « Hector » et « Pâris »). Enceinte de ce dernier de ses fils, elle rêva qu'elle donnait naissance à un tison enflammé qui embrasait toute la ville — un devin y lut la ruine de Troie à venir, et Priam fit exposer l'enfant sur le mont Ida pour échapper à ce destin ; recueilli et élevé par des bergers, Pâris survécut malgré tout, et la prophétie finit par s'accomplir.",
    "À la chute de Troie, elle vit son fils Hector, tué des années plus tôt par Achille (voir la fiche « Achille »), son mari Priam égorgé par Néoptolème au pied même de l'autel de Zeus (voir la fiche « Néoptolème »), sa fille Cassandre (voir la fiche « Cassandre ») emmenée captive par Agamemnon (voir la fiche « Agamemnon »), et sa fille Polyxène (voir la fiche « Polyxène ») sacrifiée par ce même Néoptolème sur le tombeau de son père. Réduite en esclavage, elle découvrit ensuite le corps de son plus jeune fils, Polydore (voir la fiche « Polydore »), envoyé enfant en Thrace avec un trésor pour le mettre à l'abri : le roi chargé de le protéger, Polymestor (voir la fiche « Polymestor »), l'avait assassiné pour s'emparer de cet or dès la ville tombée.",
    "Folle de douleur, Hécube attira Polymestor sous un prétexte, avec la complicité des autres captives troyennes, et lui creva les yeux avant de tuer ses propres fils sous ses yeux aveuglés — sa dernière vengeance, la seule qu'il lui restait à accomplir. Selon la légende, les dieux la changèrent alors en chienne, et elle devint depuis la compagne d'Hécate (voir la fiche « Hécate »), déesse des carrefours nocturnes — un destin qui acheva de la transformer, de reine déchue, en créature errant aux marges du monde des vivants.",
  ],
  "priam": [
    "Dernier roi de Troie, Priam régna sur une cité prospère jusqu'à ce que l'enlèvement d'Hélène par son fils Pâris (voir la fiche « Pâris ») n'attire sur elle, dix années durant, le siège des armées grecques. Avec son épouse Hécube (voir la fiche « Hécube »), il eut un très grand nombre d'enfants, parmi lesquels Hector, le plus valeureux (voir la fiche « Hector »), et Cassandre (voir la fiche « Cassandre »), dont les prophéties, condamnées à n'être jamais crues, annonçaient déjà la ruine de sa cité.",
    "Le geste qui l'a le plus rendu célèbre reste sa supplication nocturne : après qu'Achille eut traîné le corps de son fils Hector derrière son char, Priam se rendit seul et sans escorte, de nuit, jusqu'à la tente de son ennemi pour lui baiser les mains et le supplier de lui rendre la dépouille — un geste qui émut Achille aux larmes et le poussa à accepter, franchissant pour cela la porte Scée de la ville (voir les fiches « Achille » et « Porte »).",
    "À la chute de Troie, le vieux roi périt sous les coups de Néoptolème (voir la fiche « Néoptolème »), le propre fils d'Achille, qui le tua au pied même de l'autel de Zeus où il s'était réfugié — une fin que même les Grecs jugèrent après coup comme un sacrilège, tant elle bafouait la protection due à un suppliant.",
  ],
  "hector": [
    "Fils aîné de Priam et d'Hécube (voir les fiches « Priam » et « Hécube »), Hector fut le plus vaillant défenseur de Troie durant tout le siège, respecté par ses ennemis eux-mêmes pour son courage et son sens de l'honneur — contrairement à son frère Pâris (voir la fiche « Pâris »), dont l'enlèvement d'Hélène avait pourtant causé toute la guerre.",
    "Marié à Andromaque (voir la fiche « Andromaque »), dont il eut un fils, Astyanax, il lui fit ses adieux les plus déchirants à la porte Scée de Troie (voir la fiche « Porte »), avant un dernier combat qu'il pressentait déjà perdu.",
    "Il tua Patrocle, le compagnon le plus cher d'Achille, en lui arrachant les propres armes du héros grec — un geste qui scella son propre destin : fou de chagrin, Achille le pourchassa jusqu'à le tuer en duel sous les murs de la ville, puis traîna son corps derrière son char (voir la fiche « Achille »).",
    "Son corps ne fut rendu à son père qu'après la supplication nocturne de Priam ; il reçut des funérailles dignes de son rang, dont l'Iliade elle-même s'achève sur le récit. Son fils Astyanax, seul héritier du trône de Troie, fut précipité du haut des remparts par les Grecs à la chute de la ville, pour qu'aucune descendance d'Hector ne puisse jamais venger sa cité.",
  ],
  "andromaque": [
    "Épouse d'Hector (voir la fiche « Hector »), le plus valeureux défenseur de Troie, Andromaque lui donna un fils, Astyanax, avant de lui faire les adieux les plus poignants de toute l'Iliade à la porte Scée de la ville (voir la fiche « Porte »), pressentant déjà qu'elle ne le reverrait pas vivant.",
    "À la chute de Troie, elle vit son fils précipité du haut des remparts par les Grecs, pour qu'aucun héritier d'Hector ne puisse jamais menacer leur victoire, puis fut elle-même emmenée captive par Néoptolème, le propre fils d'Achille, qui avait tué son mari (voir la fiche « Achille »).",
    "Devenue malgré elle la compagne de Néoptolème (voir la fiche « Néoptolème »), elle lui donna un fils, Molossos, qui laissera son nom à toute une région d'Épire. Lorsque Néoptolème choisit d'épouser Hermione (voir la fiche « Hermione »), fille de Ménélas (voir la fiche « Ménélas »), il céda Andromaque à Hélénos, l'un des derniers fils survivants de Priam (voir la fiche « Priam ») — en récompense, dit-on, des prophéties que ce devin troyen avait livrées aux Grecs pour prendre Troie.",
    "Elle n'oublia pourtant jamais Hector : avec Hélénos, elle recréa en terre d'exil une Troie miniature, un fleuve rebaptisé Xanthe, une porte Scée reconstruite à l'identique (voir la fiche « Porte ») — et, devenue reine d'un royaume qui n'était pourtant jamais tout à fait le sien, continua d'y porter le deuil de son premier mari devant un tombeau vide élevé en son honneur, une vie entièrement redéfinie par la guerre mais jamais réconciliée avec elle.",
  ],
  "pâris": [
    "Fils de Priam et d'Hécube (voir les fiches « Priam » et « Hécube »), Pâris fut exposé enfant sur le mont Ida après qu'un songe de sa mère eut annoncé qu'il causerait la perte de Troie — recueilli par des bergers, il grandit ignorant tout de sa naissance royale, jusqu'à ce que les dieux eux-mêmes viennent le chercher.",
    "C'est à lui que Zeus confia le soin de désigner la plus belle entre Héra, Athéna et Aphrodite, lors du jugement resté célèbre sous son nom, une pomme d'or à offrir à la plus méritante (voir la fiche « Pomme »). Séduit par la promesse d'Aphrodite de lui offrir l'amour de la plus belle femme du monde, il la désigna vainqueur plutôt que le pouvoir promis par Héra ou la sagesse promise par Athéna — un choix qui lui vaudra Hélène (voir la fiche « Hélène »), déjà mariée au roi grec Ménélas (voir la fiche « Ménélas »), et l'inimitié éternelle des deux déesses éconduites.",
    "Son enlèvement d'Hélène, qu'elle l'ait suivi de son plein gré ou non selon les versions, déclencha la guerre de Troie tout entière. Combattant peu habile comparé à son frère Hector (voir la fiche « Hector »), Pâris se distingua pourtant par un tir d'arc resté décisif : guidé par Apollon, il abattit Achille lui-même d'une flèche au talon, son unique point faible (voir la fiche « Achille »).",
    "Blessé mortellement à son tour par une flèche empoisonnée durant le siège, il implora l'aide de sa première épouse, la nymphe Œnone (voir la fiche « Œnone »), qu'il avait abandonnée pour Hélène et qui seule savait le guérir — elle la lui refusa par dépit, puis, prise de remords après sa mort, se donna elle-même la mort à ses côtés.",
  ],
  "hélène": [
    "Fille de Zeus et de Léda (voir la fiche « Léda »), Hélène naquit d'un œuf après que le dieu, changé en cygne, se fut uni à la reine de Sparte — sa beauté, restée proverbiale dans toute l'Antiquité, en fit la femme la plus disputée du monde grec dès l'adolescence.",
    "Déjà mariée au roi Ménélas de Sparte (voir la fiche « Ménélas »), elle fut promise par Aphrodite au prince troyen Pâris (voir la fiche « Pâris »), vainqueur du jugement rendu sur le mont Ida pour prix d'une pomme d'or (voir la fiche « Pomme »). Qu'elle l'ait suivi de son plein gré, séduite, ou enlevée contre sa volonté selon les versions, son départ pour Troie donna le prétexte à la guerre qui allait durer dix ans et coûter la vie à toute une génération de héros.",
    "Une tradition parallèle, rapportée par le poète Stésichore puis reprise par Euripide, prétend qu'Hélène ne se rendit en réalité jamais à Troie : les dieux en auraient formé un double illusoire à partir de nuages, envoyant la véritable reine attendre en toute innocence la fin de la guerre en Égypte — une manière de la laver de toute faute dans la ruine qu'on lui attribuait.",
    "Après la chute de Troie, elle retourna à Sparte auprès de Ménélas, qui lui pardonna sa beauté retrouvée plutôt que de la punir comme les Grecs l'avaient juré pendant tout le siège — preuve, une dernière fois, du pouvoir qu'elle exerçait sur quiconque la regardait.",
  ],
  "castor": [
    "Fils mortel du roi Tyndare et de Léda (voir la fiche « Léda »), Castor forme avec son frère Pollux (voir la fiche « Pollux »), lui engendré par Zeus la même nuit sous la forme d'un cygne, les jumeaux Dioscures — l'un mortel, l'autre immortel, unis toute leur vie par un attachement que rien ne parvint à rompre.",
    "Dompteur de chevaux réputé, il participa avec son frère à l'expédition des Argonautes menée par Jason (voir la fiche « Jason ») et à la chasse du sanglier de Calydon, avant qu'un différend avec leurs cousins Idas et Lyncée, pour le partage d'un butin de bétail, ne tourne à l'affrontement mortel : Castor y trouva la mort, tué par Idas.",
    "Fou de douleur, Pollux refusa l'immortalité qui l'aurait séparé pour toujours de son frère et supplia Zeus de partager son propre sort avec lui : Zeus accorda que les deux frères ne soient plus jamais séparés, mais au prix d'une vie à cheval entre deux mondes — une journée ensemble parmi les vivants sur l'Olympe, la suivante ensemble parmi les morts aux Enfers, et ainsi de suite, sans fin. Marins et voyageurs leur rendaient un culte particulier, les tenant pour responsables du feu follet qui apparaît parfois au sommet des mâts par gros temps, signe de leur protection.",
  ],
  "pollux": [
    "Fils de Zeus et de Léda (voir la fiche « Léda »), conçu la même nuit où son frère Castor (voir la fiche « Castor ») fut engendré par le roi Tyndare, Pollux forme avec lui les jumeaux Dioscures — inséparables depuis l'enfance, malgré la différence de nature qui les séparait déjà, l'un mortel, l'autre non.",
    "Pugiliste redouté, il combattit aux côtés de son frère lors de l'expédition des Argonautes menée par Jason (voir la fiche « Jason »), où il triompha en un combat de boxe du roi Amycos. Un différend avec leurs cousins Idas et Lyncée pour un partage de butin tourna à l'affrontement : Castor y fut tué, laissant Pollux seul survivant d'un lien qu'il refusait d'accepter rompu.",
    "Plutôt que de vivre éternellement séparé de son frère, il supplia Zeus de lui laisser partager son immortalité avec lui : Zeus leur accorda de ne plus jamais se quitter, mais au prix d'une existence partagée entre deux mondes — un jour ensemble parmi les vivants sur l'Olympe, le jour suivant ensemble parmi les morts aux Enfers, en alternance perpétuelle. Élevés parmi les étoiles sous la forme de la constellation des Gémeaux (voir la fiche « Étoile »), ils restent depuis l'image même de la fraternité plus forte que la mort.",
  ],
  "léda": [
    "Reine de Sparte, épouse du roi Tyndare, Léda fut séduite par Zeus qui prit la forme d'un cygne pour s'unir à elle — la même nuit, dit-on, où elle s'unissait aussi à son propre époux, mêlant ainsi en une seule nuit une descendance mortelle et une descendance divine.",
    "De cette double union naquirent, selon les traditions les plus répandues, deux œufs : l'un donna naissance à Hélène (voir la fiche « Hélène »), dont la beauté allait plus tard déclencher la guerre de Troie, et à Pollux, l'immortel des Dioscures (voir la fiche « Pollux ») ; l'autre à Castor, son frère mortel (voir la fiche « Castor »), et à Clytemnestre (voir la fiche « Clytemnestre »), promise à un destin tout aussi tragique.",
    "Léda reste, dans l'art comme dans le mythe, la figure même de la rencontre improbable entre le monde divin et le monde mortel — une seule nuit d'où naquirent à la fois la plus belle femme du monde grec et les deux frères les plus fidèles de toute la mythologie.",
  ],
  "clytemnestre": [
    "Fille de Léda et du roi Tyndare (voir la fiche « Léda »), sœur d'Hélène (voir la fiche « Hélène »), Clytemnestre épousa Agamemnon (voir la fiche « Agamemnon »), roi de Mycènes, avec qui elle eut plusieurs enfants, dont Iphigénie et Oreste (voir les fiches « Iphigénie » et « Oreste »).",
    "Lorsque la flotte grecque, immobilisée par un vent contraire à Aulis, ne put appareiller pour Troie qu'au prix du sacrifice de leur fille Iphigénie, Agamemnon s'y résolut malgré tout — un geste que Clytemnestre ne lui pardonna jamais, même après qu'Artémis eut secrètement sauvé la jeune fille au dernier instant (voir la fiche « Artémis »), une pitié divine dont la reine, restée à Mycènes, ignora longtemps jusqu'à l'existence.",
    "Durant les dix années du siège de Troie, elle prit pour amant Égisthe (voir la fiche « Égisthe »), cousin d'Agamemnon déjà porteur d'une haine ancienne envers sa famille. À son retour, elle accueillit son époux en épouse fidèle en apparence, avant de le piéger dans un filet au sortir du bain et de le tuer avec Égisthe — vengeance de mère autant que trahison conjugale, selon l'interprétation qu'on en fait.",
    "Elle mourut à son tour des années plus tard, tuée par son propre fils Oreste (voir la fiche « Oreste ») venu venger son père — un matricide qui déchaîna sur lui la fureur des Érinyes (voir la fiche « Érinyes »), jusqu'à ce qu'un tribunal institué par Athéna vienne, pour la première fois, remplacer leur vengeance sans fin par un jugement.",
  ],
  "persée": [
    "Fils de Zeus et de la mortelle Danaé, Persée naquit d'une pluie d'or : le roi Acrisios, son grand-père, avait enfermé sa fille dans une chambre de bronze après qu'un oracle lui eut prédit la mort de sa propre main par un futur petit-fils — mais Zeus s'unit à elle sous cette forme, déjouant sans effort la précaution. Acrisios, découvrant l'enfant, jeta mère et fils à la mer dans un coffre de bois, que les flots portèrent jusqu'à l'île de Sériphos, où un pêcheur nommé Dictys les recueillit et les éleva.",
    "Devenu adulte, Persée dut affronter le frère de Dictys, le roi Polydectès, épris de Danaé et désireux de se débarrasser de son fils encombrant : il le mit au défi de lui rapporter la tête de la Gorgone Méduse, dont le seul regard pétrifiait quiconque le croisait — une mission pensée comme un aller sans retour.",
    "Guidé par Athéna et Hermès, il commença par arracher aux Grées, trois sœurs nées vieilles et ne partageant à elles trois qu'un seul œil, le secret du repaire des Nymphes en subtilisant cet œil unique le temps qu'elles le lui échangent contre sa restitution. Les Nymphes lui remirent alors des sandales ailées, un casque d'invisibilité emprunté à Hadès lui-même, et une besace magique, tandis qu'Hermès lui offrit une serpe et Athéna un bouclier poli comme un miroir : ainsi équipé, il put trancher la tête de Méduse sans jamais la regarder directement, se guidant sur son seul reflet.",
    "Du sang jailli de la blessure naquirent d'un coup Pégase, le cheval ailé que domptera plus tard le héros Bellérophon (voir la fiche « Bellérophon »), et le géant Chrysaor — tous deux déjà conçus en elle par Poséidon avant sa mise à mort. Sur le chemin du retour, Persée se servit une première fois de sa terrible prise pour punir le Titan Atlas, qui lui avait refusé l'hospitalité : pétrifié d'un seul regard, celui-ci devint la chaîne de montagnes qui porte encore son nom (voir la fiche « Atlas »).",
    "C'est là qu'il découvrit Andromède enchaînée à un rocher, offerte à un monstre marin, et la sauva avant de l'épouser (voir la fiche « Andromède »). De retour à Sériphos, il trouva sa mère persécutée par Polydectès et le pétrifia à son tour, lui et toute sa cour, d'un dernier geste de la tête de Méduse — qu'il remit ensuite à Athéna, qui la fixa pour toujours sur son égide.",
    "La prophétie qu'Acrisios avait cru déjouer se réalisa pourtant sans que Persée ne le veuille jamais : de passage à des jeux funéraires, un disque qu'il lança dévia de sa trajectoire et frappa mortellement un vieillard dans la foule — son propre grand-père, venu incognito. Trop marqué par ce meurtre involontaire pour régner sur son royaume, Persée l'échangea contre celui de Tirynthe, où il fonda plus tard la cité de Mycènes.",
    "De cette union naquirent sept enfants, bien moins célèbres que leur père : Persès (voir la fiche « Persès »), laissé en Éthiopie chez son grand-père Céphée, puis, une fois la famille installée à Mycènes, Électryon (voir la fiche « Électryon »), Sthénélos (voir la fiche « Sthénélos »), Gorgophoné (voir la fiche « Gorgophoné »), Alcée (voir la fiche « Alcée »), Mestor (voir la fiche « Mestor ») et Héléos (voir la fiche « Héléos ») — une descendance dont le fil, de génération en génération, mène jusqu'à Héraclès (voir la fiche « Héraclès ») lui-même.",
  ],
  "persès": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), né alors que ses parents résidaient encore en Éthiopie chez le roi Céphée, père d'Andromède, Persès fut laissé sur place à sa naissance : comme Céphée n'avait pas d'héritier mâle, l'enfant resta pour lui succéder, tandis que le reste de la famille repartait vers la Grèce.",
    "Selon Hérodote, les Perses tiendraient leur nom de ce fils resté en Orient : l'historien rapporte même qu'au moment des guerres médiques, le roi de Perse Xerxès invoqua cette parenté mythique avec Argos, patrie de Persée, pour tenter d'obtenir la neutralité des Argiens.",
    "Ce Persès ne doit pas être confondu avec un autre dieu du même nom, le Titan marin époux d'Astéria (voir la fiche « Astéria ») et père d'Hécate (voir la fiche « Hécate ») — un homonyme fréquent dans la mythologie grecque, où plusieurs figures sans aucun lien de parenté portent parfois un nom identique.",
  ],
  "électryon": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Électryon succéda à son père sur le trône de Mycènes. De son épouse Anaxo, il eut plusieurs fils et une fille, Alcmène, promise dès l'enfance à son cousin Amphitryon, fils de son frère Alcée (voir la fiche « Alcée »).",
    "Ses fils trouvèrent la mort presque tous ensemble dans un même raid : les Téléboens, menés par les descendants de son propre frère Mestor (voir la fiche « Mestor »), envahirent Mycènes pour réclamer un droit ancien sur le bétail royal et massacrèrent tous les fils d'Électryon, à l'exception d'un seul, Licymnios.",
    "Amphitryon partit venger ses beaux-frères et recouvra le bétail volé, mais en le ramenant, un coup de bâton destiné à calmer une bête récalcitrante dévia et frappa Électryon lui-même, le tuant sur le coup. Ce meurtre involontaire contraignit Amphitryon à l'exil et à la purification, retardant d'autant son mariage avec Alcmène et, par ricochet, la naissance d'Héraclès (voir la fiche « Héraclès »).",
  ],
  "sthénélos": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Sthénélos monta sur le trône de Mycènes après le départ en exil de son neveu Amphitryon, fils de son frère Alcée (voir la fiche « Alcée »), contraint de fuir après avoir tué par accident leur autre frère Électryon (voir la fiche « Électryon »).",
    "Il épousa Nicippé, fille de Pélops, dont il eut un fils, Eurysthée. Selon l'Iliade, Zeus proclama un jour qu'un descendant de Persée né ce jour-là régnerait sur tous ses voisins, pensant assurer ainsi la domination de son propre fils Héraclès (voir la fiche « Héraclès »), encore à naître ; mais Héra, jalouse, précipita la naissance d'Eurysthée de deux mois tout en retardant celle d'Héraclès, faisant de son neveu prématuré, plutôt que d'Héraclès, le roi promis par cette prophétie.",
    "C'est ainsi qu'Eurysthée put plus tard légitimement imposer à Héraclès ses douze travaux : un simple accident de calendrier, orchestré par la rancune d'Héra, avait suffi à inverser les deux destins.",
  ],
  "gorgophoné": [
    "Fille de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Gorgophoné épousa d'abord Périérès, roi de Messénie, dont elle eut deux fils, Aphareus et Leucippe — le premier devenu à son tour père des jumeaux Idas et Lyncée, cousins et rivaux de Castor et Pollux (voir les fiches « Castor » et « Pollux ») dans la querelle qui coûtera la vie à Castor.",
    "Selon Pausanias, elle fut la première veuve de toute la mythologie grecque à se remarier : devenue l'épouse du roi de Sparte Œbalos, elle lui donna trois autres enfants — Tyndare, futur époux de Léda (voir la fiche « Léda ») et père légal de Castor et Pollux, Icarios, futur père de Pénélope (voir la fiche « Pénélope »), et Hippocoon, qui usurpera un temps le trône de Sparte avant d'être tué par Héraclès (voir la fiche « Héraclès »).",
    "Par ses deux mariages, Gorgophoné se retrouve ainsi à la racine de presque toute la génération héroïque qui précède la guerre de Troie — grand-mère à la fois des Dioscures, par alliance des Atrides, et de la propre épouse d'Ulysse (voir la fiche « Ulysse »).",
  ],
  "alcée": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Alcée régna sur Tirynthe. De son mariage naquit un fils, Amphitryon, promis dès l'enfance à sa cousine Alcmène, fille de leur oncle Électryon (voir la fiche « Électryon »).",
    "Après avoir tué par accident son propre beau-père Électryon (voir la fiche « Électryon »), Amphitryon dut fuir Tirynthe et se réfugier à Thèbes, où le roi Créon le purifia de ce meurtre involontaire.",
    "Quand Héraclès naquit, on le nomma d'abord Alcide, du nom de son grand-père Alcée — un nom qu'il ne troqua contre celui d'Héraclès, « la gloire d'Héra », que plus tard, sur l'ordre de l'oracle de Delphes (voir la fiche « Héraclès »).",
  ],
  "mestor": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Mestor reste l'un des enfants du couple dont la mythologie a le moins retenu la vie propre — seule sa descendance a traversé les siècles.",
    "Sa fille Hippothoé fut aimée de Poséidon, qui l'enleva jusqu'aux îles Échinades pour s'unir à elle : de cette union naquit Taphios, qui donna son nom à l'île de Taphos et fonda le peuple des Téléboens.",
    "Le petit-fils de Taphios, Ptérélas, rendu invincible par Poséidon grâce à un unique cheveu d'or, mena plus tard ses Téléboens attaquer Mycènes et tuer presque tous les fils du roi Électryon (voir la fiche « Électryon ») — la lignée de Mestor, deux générations plus tard, se retournant ainsi contre celle de son propre frère.",
  ],
  "héléos": [
    "Fils de Persée et Andromède (voir les fiches « Persée » et « Andromède »), Héléos est le plus discret de toute la fratrie : les sources anciennes se limitent presque toutes à le nommer parmi les enfants du couple, sans lui prêter le moindre exploit propre.",
    "Selon une tradition rapportée par Pausanias, il aurait donné son nom à la cité côtière d'Hélos, en Laconie — un rattachement bien plus modeste que celui de la plupart de ses frères et sœurs, mais qui suffit à laisser une trace de son passage dans le paysage grec.",
  ],
  "érinyes": [
    "Divinités vengeresses nées, selon un récit, du sang d'Ouranos mutilé, les Érinyes poursuivent sans relâche ceux qui ont commis des crimes contre leur propre famille — matricide, parricide, parjure envers les siens.",
    "Elles pourchassèrent ainsi Oreste après qu'il eut tué sa mère pour venger son père, jusqu'à ce qu'un tribunal institué par Athéna elle-même vienne, pour la première fois, remplacer leur vengeance sans fin par un jugement.",
  ],
  "actéon": [
    "Chasseur habile, Actéon surprit un jour par mégarde la déesse Artémis se baignant nue dans une source avec ses nymphes.",
    "Furieuse d'avoir été vue, la déesse le changea sur-le-champ en cerf ; ses propres chiens de chasse, ne le reconnaissant plus, le poursuivirent et le déchirèrent — puni non pour une faute voulue, mais pour avoir simplement vu ce qui ne devait pas l'être.",
  ],
  "artémis": [
    "Sœur jumelle d'Apollon, Artémis naquit la première et, dit-on, aida elle-même sa mère Léto (voir la fiche « Léto ») à accoucher de son frère peu après — elle devint ainsi protectrice des accouchements autant que déesse de la chasse.",
    "Encore enfant, assise sur les genoux de Zeus, elle choisit elle-même la voie qu'elle voulait suivre plutôt que d'attendre qu'on la lui impose : un arc et des flèches, une meute de chiennes, les montagnes sauvages pour domaine, et la promesse de n'avoir jamais à se marier — tout ce qu'il fallait pour ne dépendre de personne.",
    "Farouchement attachée à sa virginité et à son intimité, elle règne sur les forêts sauvages (voir la fiche « Forêt ») et punit sans hésiter quiconque, comme Actéon (voir la fiche « Actéon »), s'aventure à la surprendre.",
    "Elle fit pourtant une exception pour le chasseur Orion, devenu son compagnon de chasse le plus proche — jusqu'à ce que la jalousie de son frère mette fin à cette amitié (voir la fiche « Orion »).",
    "Sa colère peut se muer en pitié tout aussi soudainement : sur le point de laisser sacrifier Iphigénie à Aulis, elle la sauva au dernier instant en substituant une biche sur l'autel (voir la fiche « Iphigénie »).",
    "La chasseresse Atalante, élevée à l'écart des hommes comme elle, partage avec elle ce même mode de vie farouche et indépendant (voir la fiche « Atalante »).",
    "Ses épithètes traduisent bien ce double visage. Potnia Théron, « Maîtresse des animaux sauvages », est son titre le plus ancien, déjà présent chez Homère ; Agrotéra, « la Chasseresse », l'invoque dans son domaine le plus attendu ; et Locheia, « celle qui aide à l'accouchement », rappelle ce paradoxe assumé d'une déesse à jamais vierge devenue protectrice des naissances. À Sparte, sous le nom d'Artémis Orthia, son culte prenait un tour plus rude : selon la légende, une querelle sanglante autour de sa statue, dérobée en Tauride par Oreste, ne s'apaisa qu'après qu'un oracle eut exigé que son autel soit un jour taché de sang humain — un sacrifice que Lycurgue transforma en un rituel moins mortel, la flagellation cérémonielle de jeunes Spartiates devant elle.",
  ],
  "orion": [
    "Orion est un chasseur géant, réputé pour sa beauté autant que pour son habileté à la chasse — au point qu'Éos, déesse de l'aurore, tomba amoureuse de lui et l'emporta à Délos pour vivre à ses côtés (voir la fiche « Éos »).",
    "Il devint plus tard le compagnon de chasse d'Artémis, partageant avec elle de longues journées dans les forêts sauvages (voir la fiche « Forêt ») — une complicité si grande que la déesse, pourtant farouchement attachée à son indépendance, s'attacha à lui plus qu'à quiconque.",
    "Apollon, craignant de voir sa sœur s'éprendre d'un mortel, lança un scorpion géant à la poursuite d'Orion, qui ne put lui échapper qu'en se jetant à la mer. Désignant alors à Artémis une forme sombre qui nageait au loin sans lui dire qui elle était, il la mit au défi de l'atteindre de ses flèches — elle visa juste, sans jamais savoir qu'elle venait de tuer celui qu'elle aimait.",
    "Bouleversée, elle obtint que le corps d'Orion soit placé parmi les étoiles ; le scorpion y fut envoyé lui aussi, mais assez loin pour que les deux constellations ne se lèvent jamais ensemble dans le ciel.",
    "Orion est particulièrement associé à Éos et à Artémis.",
  ],
  "iphigénie": [
    "Fille du roi Agamemnon (voir la fiche « Agamemnon »), Iphigénie fut promise au sacrifice à Aulis, où la flotte grecque en partance pour Troie restait immobilisée par l'absence de vent — une punition d'Artémis, que le roi avait offensée.",
    "Pour l'attirer à Aulis sans éveiller ses soupçons, Agamemnon et Ulysse (voir la fiche « Ulysse ») prétendirent vouloir la marier au héros Achille (voir la fiche « Achille ») — un mensonge que découvrit sa mère Clytemnestre (voir la fiche « Clytemnestre »), venue l'accompagner jusqu'à l'autel sans jamais lui pardonner ce geste, une blessure qui pèsera longtemps sur tout leur foyer.",
    "Un devin annonça que seul le sacrifice d'Iphigénie apaiserait la déesse. Mais au moment même où la lame allait s'abattre, Artémis, prise de pitié, substitua une biche sur l'autel et emporta la jeune fille, restée invisible à tous, jusqu'en Tauride (voir la fiche « Artémis »).",
    "Elle y devint prêtresse du temple d'Artémis, chargée des rites du sanctuaire — loin de la mort qu'on lui promettait, une seconde vie entièrement consacrée à la déesse qui l'avait sauvée.",
    "Des années plus tard, poursuivi par les Érinyes pour avoir tué leur propre mère Clytemnestre (voir la fiche « Clytemnestre »), son frère Oreste (voir la fiche « Oreste ») échoua en Tauride sur ordre d'un oracle, chargé d'en rapporter la statue sacrée d'Artémis. Capturé pour être sacrifié selon la coutume locale par la prêtresse du temple — sans que ni l'un ni l'autre ne se reconnaisse d'abord —, le frère et la sœur se découvrirent juste à temps : ensemble, ils s'enfuirent en emportant la statue, échappant enfin l'un et l'autre au sort que les dieux semblaient s'acharner à leur réserver.",
    "Iphigénie est particulièrement associée à Artémis.",
  ],
  "agamemnon": [
    "Fils d'Atrée, roi de Mycènes, Agamemnon hérita avec son frère Ménélas (voir la fiche « Ménélas ») d'une lignée déjà lourde d'un crime ancien — son propre père avait un jour servi aux dieux la chair des fils de son frère Thyeste, en pleine querelle pour le trône. Il épousa Clytemnestre (voir la fiche « Clytemnestre »), fille du roi Tyndare, tandis que Ménélas épousait sa sœur Hélène (voir la fiche « Hélène ») — deux mariages qui allaient bientôt lier leur maison au sort de Troie tout entière.",
    "Désigné chef de la coalition grecque après l'enlèvement d'Hélène par Pâris (voir la fiche « Pâris »), il vit sa flotte immobilisée à Aulis par un vent contraire, punition d'Artémis qu'il avait offensée : seul le sacrifice de sa propre fille Iphigénie (voir la fiche « Iphigénie ») pouvait, selon le devin Calchas, apaiser la déesse — un geste qu'il accepta, sans savoir qu'Artémis substituerait au dernier instant une biche sur l'autel.",
    "Devant Troie, sa querelle avec Achille (voir la fiche « Achille ») faillit coûter la guerre aux Grecs : contraint de rendre sa propre captive Chryséis (voir la fiche « Chryséis ») pour calmer la colère d'Apollon, il s'empara par dépit de Briséis (voir la fiche « Briséis »), celle d'Achille, qui se retira aussitôt du combat et laissa les Troyens reprendre l'avantage.",
    "À la chute de la ville, il reçut pour part de butin la prophétesse Cassandre (voir la fiche « Cassandre »), fille de Priam (voir la fiche « Priam ») — sans jamais croire ses avertissements sur le sort funeste qui les attendait tous deux à leur retour.",
    "De retour à Mycènes après dix années d'absence, il fut accueilli en apparence en héros par Clytemnestre, restée fidèle en rien : elle le piégea dans un filet au sortir du bain et le tua avec la complicité de son amant Égisthe (voir la fiche « Égisthe ») — un meurtre que leur fils Oreste (voir la fiche « Oreste ») vengerait des années plus tard en les tuant tous les deux à son tour.",
  ],
  "oreste": [
    "Fils d'Agamemnon et de Clytemnestre (voir les fiches « Agamemnon » et « Clytemnestre »), Oreste était encore enfant lorsque sa mère et son amant Égisthe (voir la fiche « Égisthe ») assassinèrent son père à son retour de Troie ; sa sœur aînée le fit fuir à temps pour échapper au même sort.",
    "Devenu adulte, un oracle d'Apollon lui ordonna de venger son père en tuant les meurtriers, quels qu'ils fussent — il exécuta Égisthe puis, sans plus d'hésitation, sa propre mère Clytemnestre, un matricide que même l'ordre du dieu ne suffit pas à effacer.",
    "Les Érinyes (voir la fiche « Érinyes »), déesses vengeresses du sang versé entre proches, le poursuivirent alors sans relâche jusqu'à la folie ; un oracle l'envoya en Tauride récupérer la statue sacrée d'Artémis, où il retrouva par le plus grand des hasards sa sœur Iphigénie (voir la fiche « Iphigénie »), qu'il croyait morte depuis Aulis, et s'enfuit avec elle et la statue.",
    "Ramené à Athènes, il fut enfin jugé sur la colline de l'Aréopage — le même tribunal qui avait autrefois acquitté Arès (voir la fiche « Arès ») — devant un jury humain plutôt que face à la seule vengeance sans fin des Érinyes : les voix se partagèrent à égalité, et c'est Athéna elle-même, en ajoutant la sienne, qui fit pencher la balance vers l'acquittement.",
    "Libéré de sa malédiction, il obtint enfin la main d'Hermione (voir la fiche « Hermione »), fille de Ménélas et d'Hélène (voir les fiches « Ménélas » et « Hélène »), déjà promise ailleurs — un rival de taille se dressait sur son chemin : Néoptolème (voir la fiche « Néoptolème »), qui la revendiquait aussi, et que les traditions font mourir de la main d'Oreste ou de celle des prêtres de Delphes, selon les versions, avant que ce dernier mariage ne puisse enfin avoir lieu.",
  ],
  "asclépios": [
    "Fils d'Apollon et de la princesse thessalienne Coronis (voir les fiches « Apollon » et « Coronis »), Asclépios fut arraché du bûcher funéraire de sa mère par son propre père et confié au centaure Chiron (voir la fiche « Chiron »), qui lui enseigna l'art de la médecine dès l'enfance.",
    "Il devint si habile qu'il apprit à ressusciter les morts — parmi eux, selon une tradition romaine plus tardive, le jeune Hippolyte (voir la fiche « Hippolyte ») lui-même, tué par ses propres chevaux emballés, qu'Asclépios aurait ramené à la vie sous un nouveau nom, Virbius, loin de son père Thésée.",
    "Ce pouvoir, en bouleversant l'ordre naturel entre les vivants et les morts, inquiéta Zeus au plus haut point : craignant que les hommes n'échappent bientôt à la mort elle-même, il foudroya Asclépios — un geste qui plongea Apollon dans une rage inconsolable, vengée sur les Cyclopes forgerons de cette foudre (voir la fiche « Apollon »).",
    "Divinisé après sa mort, il fut honoré dans tout le monde grec sous la forme d'un serpent unique enroulé à son bâton — à ne jamais confondre avec le double serpent du caducée d'Hermès (voir la fiche « Serpent ») —, notamment dans le grand sanctuaire de guérison d'Épidaure. Il laissa deux fils médecins, Machaon et Podalire, soigneurs de l'armée grecque à Troie, et une fille, Hygie, qui personnifie la santé elle-même (voir la fiche « Hygie »).",
  ],
  "néoptolème": [
    "Fils d'Achille et de la princesse Déidamie, conçu alors que son père se cachait déguisé à la cour de Skyros pour échapper à la guerre de Troie (voir la fiche « Achille »), Néoptolème grandit loin du conflit jusqu'à la mort de son père, tué par une flèche de Pâris guidée par Apollon.",
    "Un oracle affirma alors que Troie ne pourrait tomber sans lui : Ulysse (voir la fiche « Ulysse ») vint le chercher sur son île et lui remit les armes mêmes de son père, forgées par Héphaïstos.",
    "À la chute de la ville, il se montra aussi impitoyable que farouche : il tua le vieux roi Priam (voir la fiche « Priam ») au pied même de l'autel de Zeus où celui-ci s'était réfugié, sacrifia Polyxène (voir la fiche « Polyxène ») sur le tombeau de son propre père pour apaiser son ombre, et prit pour captive Andromaque (voir la fiche « Andromaque »), veuve d'Hector, dont il eut un fils, Molossos, avant de la céder plus tard à Hélénos, l'un des propres frères d'Hector, en récompense des prophéties que ce dernier avait livrées aux Grecs pour prendre Troie.",
    "De retour en Grèce, il épousa Hermione (voir la fiche « Hermione »), fille de Ménélas et d'Hélène (voir les fiches « Ménélas » et « Hélène »), déjà promise à Oreste (voir la fiche « Oreste ») — une rivalité qui lui coûta la vie à Delphes, tué selon les versions par Oreste lui-même ou par les prêtres du sanctuaire d'Apollon, lors d'une querelle sur les honneurs qui lui étaient dus.",
  ],
  "cassandre": [
    "Fille de Priam et d'Hécube (voir les fiches « Priam » et « Hécube »), Cassandre reçut d'Apollon le don de prophétie en échange de ses faveurs — une promesse qu'elle rompit une fois le don obtenu, et que le dieu, ne pouvant le lui reprendre, punit d'une malédiction plus cruelle encore : ses prédictions, toujours exactes, ne seraient plus jamais crues par personne (voir la fiche « Apollon »).",
    "Elle annonça ainsi en vain le malheur que porterait le retour de son frère Pâris avec Hélène (voir les fiches « Pâris » et « Hélène »), puis, des années plus tard, le piège caché dans le cheval de bois conçu par Ulysse — chaque avertissement se heurtant au même mur d'incrédulité qui scellait le destin de toute sa ville.",
    "À la chute de Troie, elle se réfugia en suppliante auprès de la statue d'Athéna, mais fut arrachée de force par Ajax, fils d'Oïlée, qui la viola au pied même de l'autel — un sacrilège qui attira sur toute la flotte grecque, au retour, la colère de la déesse profanée.",
    "Donnée en butin à Agamemnon (voir la fiche « Agamemnon »), elle prédit à Mycènes, sans être crue une dernière fois, leur propre assassinat à tous deux par Clytemnestre (voir la fiche « Clytemnestre ») — une mort qu'elle vit venir avec une parfaite lucidité, incapable, comme toujours, de la détourner.",
  ],
  "ménélas": [
    "Fils d'Atrée et frère d'Agamemnon (voir la fiche « Agamemnon »), Ménélas obtint la main d'Hélène (voir la fiche « Hélène ») parmi une foule de prétendants venus de toute la Grèce, chacun ayant dû jurer par avance de défendre le mariage du vainqueur, quel qu'il soit — un serment qui allait, des années plus tard, contraindre chacun d'eux à rejoindre la guerre de Troie.",
    "Lorsque le prince troyen Pâris (voir la fiche « Pâris »), reçu comme hôte dans son propre palais, lui enleva Hélène en partant, Ménélas invoqua ce serment pour lever contre Troie la coalition grecque tout entière, et affronta même Pâris en duel singulier — un combat qu'Aphrodite interrompit en dérobant son protégé aux yeux de tous, au moment où Ménélas allait l'emporter.",
    "À la chute de la ville, il retrouva Hélène et leva son épée pour la tuer, comme il l'avait juré durant tout le siège — mais laissa retomber son bras, désarmé par sa seule beauté retrouvée, et la ramena avec lui à Sparte.",
    "Le retour ne fut pourtant pas immédiat : détourné par les vents pendant des années le long des côtes d'Égypte, il ne put reprendre la mer qu'après avoir surpris et interrogé de force le devin marin Protée (voir la fiche « Protée »), seul capable de lui révéler le chemin du retour. Le même oracle lui annonça un destin que nul autre mortel ne connaîtrait : épargné par la mort elle-même, gendre de Zeus par son mariage avec Hélène, il serait un jour conduit vivant aux Champs Élysées plutôt qu'au royaume ordinaire des morts.",
  ],
  "europe": [
    "Princesse phénicienne, fille du roi Agénor et sœur de Cadmos (voir la fiche « Cadmos »), Europe fut un jour abordée sur une plage par un taureau d'une blancheur et d'une douceur telles qu'elle osa grimper sur son dos sans la moindre crainte — c'était Zeus lui-même, épris d'elle, qui s'élança aussitôt dans les flots et l'emporta jusqu'en Crète, loin de tout secours.",
    "De cette traversée naquirent trois fils : Minos (voir la fiche « Minos »), futur roi de Crète et juge des Enfers ; Rhadamanthe, réputé pour sa droiture incorruptible ; et Sarpédon, qui régna plus tard sur la Lycie. Devenue reine de l'île par son mariage avec le roi Astérion, sans enfant lui-même, elle vit ses trois fils élevés comme les siens et destinés à régner en son nom.",
    "Son frère Cadmos, envoyé par leur père à sa recherche avec l'ordre de ne jamais revenir sans elle, ne la retrouva jamais — mais l'oracle de Delphes qui l'orienta vers une quête différente le mena, sans qu'il s'y attende, à fonder Thèbes à sa place (voir la fiche « Cadmos »).",
    "Le nom d'Europe, donné plus tard à tout le continent, reste depuis attaché à cette seule traversée — la mémoire d'un enlèvement devenue, avec le temps, le nom même d'un monde.",
  ],
  "phèdre": [
    "Fille de Minos et de Pasiphaé (voir les fiches « Minos » et « Pasiphaé »), sœur d'Ariane (voir la fiche « Ariane »), Phèdre épousa Thésée (voir la fiche « Thésée ») après qu'il eut abandonné sa sœur endormie sur l'île de Naxos — un mariage qui n'échappa pas, lui non plus, au sort funeste qui semblait s'attacher à chacun des grands amours du roi d'Athènes.",
    "Aphrodite, méprisée par Hippolyte (voir la fiche « Hippolyte »), fils que Thésée avait eu d'une reine amazone et dévot exclusif d'Artémis, choisit Phèdre pour se venger : elle lui inspira une passion irrépressible et honteuse pour son propre beau-fils, un amour qu'elle tenta d'abord d'étouffer en se laissant dépérir en silence.",
    "Trahie par sa propre nourrice, qui révéla son secret à Hippolyte pour tenter de l'aider, elle se vit repoussée avec un dégoût qu'elle ne put supporter : plutôt que d'affronter la honte, elle se donna la mort, laissant derrière elle une lettre accusant faussement le jeune homme de l'avoir agressée.",
    "Thésée, y croyant sans hésiter, appela sur son propre fils l'une des trois malédictions que lui devait Poséidon (voir la fiche « Poséidon ») — une vengeance qui coûta la vie à Hippolyte et ne révéla la vérité qu'une fois la tragédie déjà accomplie.",
  ],
  "égisthe": [
    "Fils de Thyeste, Égisthe naquit d'une union que son propre père avait contractée avec sa fille sur l'ordre d'un oracle, seul moyen annoncé de venger un jour l'outrage que lui avait fait subir son frère Atrée, le propre père d'Agamemnon (voir la fiche « Agamemnon ») : celui-ci avait un jour servi à Thyeste, en un festin de réconciliation feinte, la chair de ses propres enfants.",
    "Élevé sans connaître ses origines, Égisthe finit par apprendre la vérité et tua Atrée pour rétablir son père sur le trône — mais la haine ancienne entre les deux branches de la famille ne s'éteignit pas pour autant, et se reporta tout entière sur Agamemnon, fils du bourreau de Thyeste.",
    "Pendant que celui-ci guerroyait dix ans à Troie, Égisthe séduisit son épouse Clytemnestre (voir la fiche « Clytemnestre »), déjà rongée par la colère du sacrifice de leur fille Iphigénie (voir la fiche « Iphigénie ») — une complicité qui se mua en conspiration à son retour : ensemble, ils le piégèrent et le tuèrent.",
    "Il régna plusieurs années aux côtés de Clytemnestre sur Mycènes, jusqu'à ce qu'Oreste (voir la fiche « Oreste »), le propre fils d'Agamemnon, revienne venger son père en les tuant tous les deux à leur tour — la vengeance d'une génération refermant, dans le sang, celle de la génération précédente.",
  ],
  "polyxène": [
    "Plus jeune fille de Priam et d'Hécube (voir les fiches « Priam » et « Hécube »), Polyxène inspira à Achille (voir la fiche « Achille ») un amour resté célèbre chez les auteurs tardifs : selon une tradition parallèle à celle de sa mort par flèche au talon, il aurait été attiré par elle jusqu'au temple d'Apollon Thymbréen sous prétexte de négocier leur mariage, et c'est là que Pâris, guidé par le dieu, l'aurait frappé mortellement.",
    "À la chute de Troie, l'ombre d'Achille apparut aux Grecs et exigea, avant que leur flotte ne puisse rentrer, qu'on lui sacrifie Polyxène sur son propre tombeau — un écho funeste au sacrifice d'Iphigénie (voir la fiche « Iphigénie ») qui avait permis, dix ans plus tôt, à cette même flotte de partir pour Troie. Néoptolème (voir la fiche « Néoptolème »), le propre fils d'Achille, s'en chargea lui-même.",
    "Sa mort, la dernière d'une longue série pour Hécube, acheva de faire de la vieille reine une figure de deuil absolu — après ses fils, son mari et sa fille Cassandre emmenée captive, il ne lui restait plus, de tous ses enfants, que le souvenir.",
  ],
  "hyacinthe": [
    "Jeune prince spartiate d'une grande beauté, Hyacinthe était aimé d'Apollon (voir la fiche « Apollon »), qui délaissait pour lui son char et son arc, préférant partager avec lui la chasse et surtout le lancer de disque sur les rives de l'Eurotas.",
    "Zéphyr, le vent d'ouest, l'aimait lui aussi en secret et ne supportait pas de le voir préféré à un dieu de son rang (voir la fiche « Zéphyr ») : un jour qu'Apollon lançait un disque, Zéphyr en dévia la trajectoire par un souffle jaloux, et la pierre frappa Hyacinthe en pleine tempe.",
    "Apollon, dieu de la médecine autant que de la lumière, ne put rien faire pour le sauver — une impuissance amère pour celui qui, ailleurs, avait pourtant transmis à son propre fils Asclépios (voir la fiche « Asclépios ») l'art de guérir. Il changea le sang répandu en une fleur nouvelle, la jacinthe, sur les pétales de laquelle on croyait pouvoir lire les lettres grecques de son deuil.",
    "Sparte lui rendait chaque été un culte particulier, les Hyacinthies, fête à la fois funèbre et joyeuse qui mêlait le deuil du jeune homme et la célébration du renouveau qu'annonçait sa fleur.",
  ],
  "coronis": [
    "Princesse thessalienne aimée d'Apollon (voir la fiche « Apollon »), Coronis portait déjà son enfant lorsqu'elle se laissa séduire, en son absence, par un mortel nommé Ischys — un choix que le dieu, prévenu par un corbeau alors tout blanc, découvrit avec fureur.",
    "Incapable de lui pardonner cette trahison, il la fit tuer par les flèches d'Artémis (voir la fiche « Artémis ») ; le corbeau messager, resté blanc jusque-là, fut noirci pour toujours en punition de sa nouvelle funeste — un oiseau puni pour avoir simplement dit la vérité.",
    "Alors qu'elle brûlait déjà sur son bûcher funéraire, Apollon arracha in extremis l'enfant qu'elle portait, Asclépios (voir la fiche « Asclépios »), et le confia au centaure Chiron (voir la fiche « Chiron ») pour qu'il l'élève — un sauvetage in extremis qui devait, bien plus tard, faire de cet enfant le plus grand guérisseur jamais connu.",
  ],
  "œnone": [
    "Nymphe du mont Ida, fille du dieu-fleuve Cébren, Œnone épousa Pâris (voir la fiche « Pâris ») alors qu'il grandissait encore, ignorant tout de sa naissance royale, parmi les bergers qui l'avaient recueilli — initiée aux plantes médicinales par Apollon lui-même selon certains récits, elle possédait un don de guérison rare.",
    "Abandonnée par Pâris pour Hélène (voir la fiche « Hélène ») une fois son identité de prince troyen révélée, elle vécut seule sur la montagne le reste de la guerre de Troie, rongée d'un chagrin qu'elle ne parvint jamais à dépasser.",
    "Blessé mortellement par une flèche empoisonnée durant le siège, Pâris revint la supplier de le soigner, seule capable de le sauver — elle la lui refusa par dépit, se souvenant trop bien de son abandon. Il mourut peu après ; prise de remords, Œnone se donna la mort à son tour, ne pouvant survivre à celui qu'elle avait aimé le premier.",
  ],
  "polydore": [
    "Plus jeune fils de Priam et d'Hécube (voir les fiches « Priam » et « Hécube »), Polydore fut envoyé enfant en Thrace, loin du siège de Troie, avec un trésor destiné à assurer son avenir si la ville venait à tomber — confié à la garde du roi Polymestor (voir la fiche « Polymestor »), allié de la famille royale.",
    "Dès que Troie fut prise, Polymestor, cédant à la tentation de cet or plutôt qu'à la loyauté promise, assassina l'enfant et jeta son corps à la mer — un geste que seule sa mère Hécube, découvrant la dépouille échouée sur le rivage, découvrit et vengea (voir la fiche « Hécube »).",
  ],
  "polymestor": [
    "Roi de Thrace, allié de Priam (voir la fiche « Priam »), Polymestor avait accepté de protéger le jeune Polydore (voir la fiche « Polydore ») et le trésor envoyé avec lui pour le mettre à l'abri du siège de Troie.",
    "Dès la ville tombée, il trahit cette confiance par pure cupidité : il tua l'enfant pour s'emparer de son or et jeta son corps à la mer, croyant son crime à jamais dissimulé.",
    "Hécube (voir la fiche « Hécube »), découvrant le corps de son fils, l'attira sous un prétexte avec la complicité d'autres captives troyennes et lui creva les yeux avant de tuer ses propres fils sous ses yeux aveuglés. Rendu aveugle et fou de douleur, il prédit, dit-on, avant d'être abandonné sur une île déserte, les morts prochaines d'Agamemnon et de Cassandre (voir les fiches « Agamemnon » et « Cassandre ») — une dernière vérité arrachée à un homme que plus personne, désormais, n'avait de raison de croire.",
  ],
  "astyanax": [
    "Fils d'Hector et d'Andromaque (voir les fiches « Hector » et « Andromaque »), Astyanax — un surnom signifiant « seigneur de la cité », donné par les Troyens en hommage à son père, seul rempart de Troie — reçut de son grand-père Priam (voir la fiche « Priam ») le nom véritable de Scamandrios, du fleuve qui coulait près des remparts.",
    "Encore enfant lors des adieux les plus déchirants de l'Iliade, à la porte Scée où son père, casque au poing, l'effraya un instant avant de le faire rire (voir la fiche « Porte »), il resta le seul héritier légitime du trône de Troie après la mort d'Hector.",
    "C'est précisément cette légitimité qui causa sa perte : à la chute de la ville, craignant qu'il ne grandisse un jour pour venger sa cité, les Grecs — sur un conseil qu'on attribue le plus souvent à Ulysse (voir la fiche « Ulysse ») — le précipitèrent du haut des remparts, afin qu'aucune descendance d'Hector ne puisse jamais menacer leur victoire.",
  ],
  "icare": [
    "Fils de l'architecte Dédale (voir la fiche « Dédale »), Icare fut enfermé avec son père par le roi Minos (voir la fiche « Minos ») dans le Labyrinthe même que celui-ci avait construit, de peur qu'il ne révèle à quiconque le secret de sa conception.",
    "Pour s'en échapper par les airs, Dédale fabriqua pour tous deux des ailes de plumes assemblées à la cire, avec un seul avertissement : ne jamais voler trop bas, où l'humidité de la mer alourdirait les plumes, ni trop haut, où la chaleur du soleil ferait fondre la cire.",
    "Grisé par le vol et la liberté nouvelle qu'il découvrait, Icare grimpa toujours plus haut sans écouter son père : la cire fondit, les plumes se détachèrent une à une, et il tomba dans la mer qui porte depuis son nom, la mer Icarienne. Une tradition rapporte qu'Héraclès (voir la fiche « Héraclès »), retrouvant plus tard son corps échoué sur une île voisine, lui offrit une sépulture — l'île prit elle aussi, en mémoire de lui, le nom d'Icarie.",
  ],
  "penthée": [
    "Roi de Thèbes, petit-fils de Cadmos (voir la fiche « Cadmos ») par sa mère Agavé, Penthée était le cousin mortel de Dionysos (voir la fiche « Dionysos ») — mais refusa obstinément de reconnaître sa divinité, interdisant son culte nouveau et faisant emprisonner ses fidèles.",
    "Pour le punir de cet aveuglement, Dionysos l'attira lui-même, déguisé en femme, à espionner en secret les rites des Ménades sur le mont Cithéron — un piège qui devait le pousser à voir de ses propres yeux ce qu'il avait toujours nié.",
    "Repéré par les Ménades en pleine transe bachique, il fut pris pour un lion par sa propre mère Agavé, qui le déchira de ses mains avec les autres fidèles avant de brandir sa tête en triomphe, croyant tenir un trophée de chasse — elle ne reconnut le visage de son fils qu'une fois la folie dissipée.",
  ],
  "niobé": [
    "Reine de Thèbes, épouse d'Amphion — fils de la première Antiope, celle que persécuta sa propre tante Dircé (voir la fiche « Antiope ») —, Niobé se vantait avec orgueil d'avoir mis au monde quatorze enfants, sept fils et sept filles, quand Léto (voir la fiche « Léto ») n'en avait eu que deux.",
    "Blessée par cette insulte faite à sa propre maternité, Léto envoya Apollon et Artémis (voir les fiches « Apollon » et « Artémis ») venger l'affront : l'un abattit à l'arc tous les fils de Niobé, l'autre toutes ses filles, sans qu'aucune supplication ne parvienne à arrêter leurs flèches.",
    "Pétrifiée de chagrin, Niobé se changea en rocher sur le mont Sipyle, d'où continue, dit-on, de suinter une eau semblable à des larmes sans fin — un deuil si absolu qu'il ne s'exprime même plus par des mots, seulement par une pierre qui pleure encore.",
  ],
  "otrera": [
    "Première reine des Amazones, Otrera fut, selon la tradition la plus répandue, l'unique épouse mortelle d'Arès (voir la fiche « Arès ») — une union que le dieu de la guerre honora en fondant avec elle, dit-on, le sanctuaire d'Artémis à Éphèse, l'un des lieux sacrés les plus vénérés du monde antique.",
    "Elle devint ainsi, à travers cette seule union, la mère spirituelle de la nation amazone tout entière plutôt que la mère littérale de chacune de ses reines : Antiope et Hippolyté (voir les fiches « Antiope » et « Hippolyté »), qui lui succédèrent, sont ainsi comptées parmi ses héritières sans que les textes anciens ne précisent jamais un lien de sang direct.",
    "Son nom reste attaché à cette fondation plutôt qu'à des exploits qui lui seraient propres — une reine fondatrice, dont l'histoire se raconte surtout à travers celle du peuple qu'elle a mis au monde.",
  ],
  "ariane": [
    "Fille de Minos, roi de Crète (voir la fiche « Minos »), et de Pasiphaé (voir la fiche « Pasiphaé »), Ariane tomba amoureuse de Thésée (voir la fiche « Thésée ») le jour où il arriva parmi les jeunes gens envoyés en tribut au Minotaure, enfermé au cœur du Labyrinthe.",
    "Pour lui permettre d'en ressortir vivant après avoir affronté le monstre, elle lui confia une pelote de fil à dérouler en avançant — le fameux « fil d'Ariane », resté depuis l'expression même de ce qui permet de retrouver son chemin dans ce qui semblait inextricable.",
    "Thésée l'emmena avec lui en fuyant la Crète, mais l'abandonna endormie sur l'île de Naxos. C'est là que Dionysos la trouva, en tomba amoureux et l'épousa, lui offrant l'immortalité et une couronne d'or que l'on retrouve, dit-on, parmi les étoiles sous la forme d'une constellation (voir la fiche « Dionysos »).",
    "Une tradition tardive veut que ce mariage n'ait pas été sans conséquence pour tout le monde : le jeune dieu Hyménée, invité à chanter pour l'occasion avec une voix aussi belle que celle de son père Apollon, l'y aurait perdue (voir la fiche « Hyménée ») — la plus heureuse des fêtes coûtant cher à quelqu'un d'autre.",
    "Ariane est particulièrement associée à Dionysos.",
  ],
  "sémélé": [
    "Fille de Cadmos, roi de Thèbes (voir la fiche « Cadmos »), Sémélé fut aimée de Zeus — une liaison qui attira aussitôt la jalousie d'Héra, toujours prompte à se venger d'une rivale mortelle.",
    "Déguisée en vieille nourrice, Héra convainquit Sémélé de demander à son amant de se montrer à elle dans toute sa splendeur divine. Zeus, lié par une promesse qu'il ne pouvait rompre, dut s'exécuter — et la vision foudroya Sémélé sur-le-champ. Il sauva l'enfant qu'elle portait, le futur Dionysos, en le cousant dans sa propre cuisse jusqu'à son terme (voir la fiche « Dionysos »).",
    "Devenu adulte, Dionysos n'oublia jamais sa mère : il descendit jusqu'aux Enfers pour l'en faire remonter, et obtint qu'elle soit accueillie parmi les dieux de l'Olympe sous un nouveau nom, Thyoné — la seule mortelle jamais divinisée pour avoir simplement été aimée d'un dieu.",
    "Sémélé est particulièrement associée à Dionysos.",
  ],
  "hébé": [
    "Fille de Zeus et d'Héra, Hébé personnifie la jeunesse éternelle qui règne sur l'Olympe. C'est elle qui, avant d'être remplacée par le jeune Ganymède, servait le nectar et l'ambroisie aux dieux lors de leurs banquets — la boisson même de l'immortalité.",
    "Lorsque Héraclès mourut de ses souffrances et fut accueilli parmi les dieux en récompense de ses travaux (voir la fiche « Héraclès »), c'est Hébé qui devint son épouse sur l'Olympe — un mariage qui scella sa victoire finale sur la mortalité elle-même.",
    "Hébé est particulièrement associée à Héraclès.",
  ],
  "ilithyie": [
    "Fille de Zeus et d'Héra, Ilithyie préside aux accouchements : c'est elle qui, dit-on, permet à l'enfant de venir au monde — ou qui, si elle le choisit, peut retenir une naissance presque indéfiniment.",
    "Lorsque Héraclès dut naître, Héra, jalouse comme toujours d'un enfant de Zeus né d'une mortelle, envoya Ilithyie s'asseoir devant la porte d'Alcmène, jambes et doigts croisés, pour empêcher l'accouchement de se conclure (voir la fiche « Héraclès »).",
    "Une servante d'Alcmène, comprenant la ruse, annonça faussement que l'enfant venait de naître : surprise, Ilithyie décroisa un instant les mains — juste assez pour que la naissance, enfin libérée, puisse avoir lieu.",
    "Ilithyie est particulièrement associée à Héraclès et à Héra.",
  ],
  "léto": [
    "Titanide, fille de Coéos et de Phoebé (voir les fiches « Coéos » et « Phoebé »), Léto est la sœur d'Astéria (voir la fiche « Astéria »). Aimée de Zeus, elle devint aussitôt la cible de la jalousie d'Héra, qui interdit à toute terre ferme de l'accueillir pour son accouchement (voir la fiche « Héra »).",
    "Léto erra ainsi de rivage en rivage, refusée partout, jusqu'à atteindre Délos — l'île errante en laquelle sa propre sœur Astéria s'était autrefois changée pour échapper à Zeus. N'étant plus à proprement parler une « terre ferme » ancrée nulle part, Délos put l'accueillir sans enfreindre l'interdit d'Héra.",
    "C'est là que Léto mit au monde ses jumeaux, Apollon et Artémis (voir les fiches « Apollon » et « Artémis ») — un accouchement rendu possible, au bout du compte, par la solidarité d'une sœur devenue elle-même un refuge.",
    "Toujours poursuivie par la colère d'Héra alors même que ses jumeaux n'étaient encore que des nourrissons, elle s'arrêta un jour en Lycie pour boire à un étang et y baigner ses enfants. Des paysans du lieu, par pure méchanceté, troublèrent l'eau à coups de pied pour l'empêcher de se désaltérer et la chassèrent en l'insultant. Léto, épuisée, les changea sur-le-champ en grenouilles, condamnées depuis à barboter pour toujours dans la vase de cet étang qu'ils lui avaient interdit.",
    "Devenue mère comblée, elle ne tolère pourtant aucun outrage fait à ses enfants. Niobé (voir la fiche « Niobé »), reine de Thèbes et mère de quatorze enfants, se vanta un jour d'être plus digne d'admiration que Léto, qui n'en avait mis au monde que deux. Léto, blessée dans son orgueil de mère, envoya Apollon et Artémis venger l'insulte : l'un abattit à l'arc tous les fils de Niobé, l'autre toutes ses filles, sans qu'aucune supplication n'arrête leurs flèches. Pétrifiée de chagrin, Niobé se changea en rocher sur le mont Sipyle, d'où continue, dit-on, de suinter une eau semblable à des larmes sans fin.",
    "Léto est particulièrement associée à Apollon, à Artémis et à Astéria.",
  ],
  "astéria": [
    "Titanide, fille de Coéos et de Phoebé (voir les fiches « Coéos » et « Phoebé »), Astéria — dont le nom signifie littéralement « étoilée », en écho au mot étoile lui-même (voir la fiche « Étoile ») — est la sœur de Léto (voir la fiche « Léto »).",
    "Poursuivie par les avances de Zeus, elle refusa de se laisser posséder et se jeta dans la mer plutôt que de céder, se changeant en île errante, un temps assimilée aux étoiles filantes avant de se fixer sous le nom de Délos.",
    "C'est sur cette même île qu'elle offrit, sans le savoir encore, un refuge à sa sœur Léto, venue y accoucher d'Apollon et d'Artémis après avoir été rejetée de partout ailleurs. Avec le dieu marin Persès, Astéria est aussi mère d'Hécate (voir la fiche « Hécate »), qui hérita de sa proximité avec le ciel nocturne.",
    "Astéria est particulièrement associée à Léto et à Hécate.",
  ],
  "cadmos": [
    "Fils du roi Agénor de Phénicie et frère d'Europe (voir la fiche « Europe ») — enlevée par Zeus changé en taureau —, Cadmos partit à la recherche de sa sœur sans jamais la retrouver. L'oracle du temple de Delphes (voir la fiche « Temple ») lui conseilla d'abandonner cette quête et de suivre à la place une vache marquée d'un croissant de lune jusqu'à ce qu'elle s'arrête d'elle-même : à cet endroit précis, il devrait fonder une ville.",
    "La vache s'arrêta sur le site de la future Thèbes. Pour un sacrifice, Cadmos envoya ses compagnons chercher de l'eau à une source voisine, gardée par un dragon consacré à Arès (voir la fiche « Arès »), qui les tua tous. Cadmos vainquit à son tour le dragon puis, sur les conseils d'Athéna, sema ses dents dans le sol : des guerriers tout armés en surgirent aussitôt et s'entretuèrent jusqu'à ce qu'il n'en reste que cinq, devenus les ancêtres des plus grandes familles de Thèbes.",
    "Pour avoir tué un être consacré à Arès, Cadmos dut servir le dieu pendant huit années. Sa peine achevée, il fut réconcilié avec lui et reçut pour épouse Harmonie, fille d'Arès et d'Aphrodite (voir la fiche « Harmonie ») — des noces où tous les dieux de l'Olympe vinrent en personne, chose presque jamais accordée à des mortels.",
    "Devenus vieux, Cadmos et Harmonie furent changés ensemble en serpents et menés vers les Champs Élysées plutôt que vers une fin funeste — une métamorphose vécue comme une grâce plutôt qu'une punition, pour avoir traversé côte à côte tant d'épreuves. La tradition grecque attribue aussi à Cadmos l'introduction de l'alphabet en Grèce.",
    "Cadmos est particulièrement associé à Harmonie.",
  ],
  "harmonie": [
    "Fille d'Arès (voir la fiche « Arès »), dieu de la guerre, et d'Aphrodite (voir la fiche « Aphrodite »), Harmonie naît de l'union la plus improbable qui soit — la guerre et l'amour — et en personnifie pourtant l'issue la plus apaisée : la concorde qui succède au conflit.",
    "Son mariage avec Cadmos, fondateur de Thèbes (voir la fiche « Cadmos »), fut célébré en présence de tous les dieux de l'Olympe, venus lui offrir des présents — dont un collier forgé par Héphaïstos et une robe de noces tissée par les Charites elles-mêmes (voir la fiche « Charites »), d'une beauté si rare qu'ils restèrent légendaires pour les générations suivantes.",
    "Devenue vieille aux côtés de Cadmos, elle fut changée avec lui en serpent et rejoignit les Champs Élysées — refusant, jusque dans la métamorphose, de se séparer de celui qu'elle avait épousé.",
    "Harmonie est particulièrement associée à Cadmos.",
  ],
  "atalante": [
    "Abandonnée à sa naissance par un père qui espérait un fils, Atalante fut allaitée par une ourse puis recueillie par des chasseurs — une enfance sauvage qui en fit une coureuse et une archère hors pair, proche par son mode de vie de la déesse Artémis (voir la fiche « Artémis »).",
    "Lors de la grande chasse au sanglier de Calydon, elle fut la première à toucher la bête de sa flèche, avant même les héros les plus renommés présents ce jour-là ; le meneur de la chasse, Méléagre, insista pour qu'elle reçoive la dépouille en récompense, malgré les protestations de certains chasseurs de ne pas voir ce prix revenir à une femme.",
    "Refusant le mariage, elle ne consentit à épouser que celui qui la vaincrait à la course — les prétendants battus payaient leur défaite de leur vie, et aucun n'y était jamais parvenu. Hippomène, aidé par Aphrodite, laissa tomber trois pommes d'or du jardin des Hespérides tout au long de la course : chaque fois qu'Atalante s'arrêtait pour en ramasser une, il regagnait du terrain, jusqu'à finir par la devancer.",
    "Atalante est particulièrement associée à Artémis.",
  ],
  "protée": [
    "Dieu marin au service de Poséidon, Protée connaît l'avenir mais refuse de le révéler à quiconque le lui demande directement.",
    "Pour lui arracher une prophétie, il faut le surprendre pendant son sommeil et le maintenir de force malgré les métamorphoses qu'il enchaîne pour échapper à toute prise — lion, serpent, flamme, eau — jusqu'à ce qu'épuisé, il reprenne sa forme véritable et consente enfin à répondre.",
  ],
  "cyclopes": [
    "Géants à l'œil unique, les Cyclopes forgent pour les dieux leurs armes les plus redoutables — la foudre de Zeus, le trident de Poséidon, le casque d'invisibilité d'Hadès — dans les forges d'Héphaïstos.",
    "L'un d'eux, Polyphème, rendu tristement célèbre par l'Odyssée, est d'une nature bien différente : berger solitaire et brutal, il enferme Ulysse et ses compagnons dans sa grotte avant d'être aveuglé par la ruse du héros pour leur permettre de s'échapper.",
  ],
  "cybèle": [
    "Déesse originaire d'Asie Mineure assimilée par les Grecs à leur propre panthéon, Cybèle personnifie la terre nourricière dans toute sa puissance sauvage, bien au-delà de la douceur cultivée qu'incarne Déméter.",
    "Son culte, marqué par une musique frénétique et des rites d'une intensité rare, traversa la Méditerranée jusqu'à Rome, où elle fut officiellement adoptée comme protectrice de la cité en des temps de crise.",
  ],

  /* ----- Personnifications des cartes numérales illustrées d'Épées (voir NUMBER_CARD_DEITY) ----- */
  "aletheia": [
    "Aletheia personnifie la Vérité elle-même. Les traditions varient sur son origine : fille de Zeus pour les uns, née de Chronos, le temps primordial, pour les autres — un lien qui a donné naissance à l'adage selon lequel le temps finit toujours par révéler ce qui a été caché.",
    "Son nom grec, alètheia, signifie littéralement « ce qui n'est plus caché » — la négation de lèthè, l'oubli, qui donne aussi son nom au fleuve Lethée (voir la fiche « Lethée »). Les deux figures se répondent ainsi comme deux pôles opposés : l'une dévoile, l'autre efface.",
    "Elle a pour rivale Apaté (voir la fiche « Apaté »), l'esprit de la tromperie. Lassée de voir sa parole détournée et travestie par les hommes, Aletheia se serait retirée au fond d'un puits, loin de la surface où la vérité se déforme si facilement — origine de l'adage antique selon lequel « la vérité est au fond du puits ».",
  ],
  "ananké": [
    "Ananké personnifie la Nécessité — non pas un simple besoin, mais la contrainte absolue à laquelle rien, pas même les dieux, ne peut se soustraire.",
    "Les récits orphiques la font naître aux tout premiers instants du monde, enlacée à Chronos, le temps primordial, autour de l'œuf cosmique dont naîtra l'univers entier : ensemble, ils mettent la création en mouvement selon un ordre qu'aucune volonté ne peut ensuite défaire.",
    "De cette union naissent, selon certains récits, les Parques elles-mêmes (voir la fiche « Parques »), filant le fil de chaque destinée sur le fuseau que Platon décrit tournant sur les genoux d'Ananké — l'axe même autour duquel tourne le monde. Zeus lui-même, dit-on, s'incline devant ses décrets : la nécessité gouverne jusqu'au roi des dieux.",
  ],
  "éris": [
    "Éris personnifie la Discorde. Homère en fait une sœur d'Arès, sa fidèle compagne sur le champ de bataille ; Hésiode, dans sa Théogonie, la dit plutôt fille de Nyx, la Nuit, seule (voir la fiche « Nyx »), née sans père aux côtés d'Apaté et de Némésis (voir les fiches « Apaté » et « Némésis ») — deux traditions parallèles pour une même puissance de rupture qui, une fois déclenchée, ne peut plus être désamorcée.",
    "Non invitée aux noces de Thétis et Pélée (voir la fiche « Thétis »), par crainte qu'elle n'y sème le trouble, elle se présenta malgré tout et jeta parmi les déesses assemblées une pomme d'or portant une seule inscription : « à la plus belle ». Héra, Athéna et Aphrodite se la disputèrent aussitôt, jusqu'à ce que Zeus confie à Pâris (voir la fiche « Pâris ») le soin de trancher — un jugement qui déclenchera la guerre de Troie.",
    "Hésiode distingue pourtant deux Éris bien différentes : l'une pousse au conflit destructeur, l'autre à une rivalité plus saine, celle qui incite le voisin paresseux à travailler autant que celui qui prospère à côté de lui. La discorde n'est donc pas toujours la même force — seule la première porte le nom que la légende a retenu.",
  ],
  "lethée": [
    "Lethée est le fleuve de l'Oubli, l'un des cours d'eau qui traversent les Enfers — boire à ses eaux efface, dit-on, jusqu'au souvenir d'avoir vécu.",
    "Les âmes des morts s'y désaltéraient traditionnellement avant de renaître, pour ne rien garder de leur existence précédente. Mais une tradition plus tardive, orphique, conseillait l'inverse à ses initiés : sur des tablettes d'or déposées dans leurs tombes, on leur enjoignait d'éviter la source de Lethée et de chercher plutôt celle de Mnémosyne, la Mémoire (voir la fiche « Mnémosyne ») — pour rester, même dans la mort, fidèles à ce qu'ils avaient été.",
    "Son nom même s'oppose à celui d'Aletheia, la Vérité (voir la fiche « Aletheia ») : alètheia signifie littéralement « ce qui échappe à Lethée » — l'un dévoile ce que l'autre recouvre, deux forces jumelles et contraires.",
  ],
  "némésis": [
    "Némésis personnifie l'indignation légitime et la rétribution qui rétablit l'équilibre chaque fois que la démesure — l'orgueil, la chance excessive, le mépris d'autrui — dépasse une limite qu'aucun mortel ne devrait franchir.",
    "C'est elle, selon la tradition la plus répandue, qui punit Narcisse (voir la fiche « Narcisse ») pour avoir repoussé sans pitié tous ceux qui l'aimaient : elle le condamna à tomber amoureux de son propre reflet, un amour qu'il ne pourrait jamais obtenir en retour — la faute retournée contre celui qui l'avait commise.",
    "On la représente ailée, tenant parfois une roue — celle de la fortune, qui n'épargne personne indéfiniment — ou un instrument de mesure, rappelant que rien ne doit dépasser sa juste proportion, le fameux « rien de trop » gravé au temple de Delphes.",
  ],
  "palioxis": [
    "Palioxis personnifie la débandade — le reflux chaotique d'une armée qui rompt les rangs et fuit, à l'opposé exact de la charge conquérante.",
    "Elle appartient au cortège d'Arès, aux côtés de figures comme Phobos (voir la fiche « Phobos ») et son jumeau Deimos, la Terreur, ou Kydoimos, la Confusion du combat : une escorte de forces qui n'affrontent jamais l'ennemi elles-mêmes, mais décident souvent de l'issue d'une bataille en s'emparant d'un camp ou de l'autre.",
    "Contrairement à Ioké, sa contrepartie qui personnifie la poursuite acharnée du vainqueur, Palioxis n'est pas la défaite elle-même : elle est ce moment où continuer le combat cesserait d'avoir un sens, et où seul reculer permet de préserver ce qui peut encore l'être.",
  ],
  "apaté": [
    "Apaté personnifie la Tromperie. Hésiode en fait une fille de Nyx, la Nuit (voir la fiche « Nyx »), née sans père — au côté d'autres forces sombres comme Éris, la Discorde (voir la fiche « Éris »), ou Géras, la Vieillesse : des puissances qui agissent sur le monde sans jamais avoir besoin d'être invoquées.",
    "Des traditions plus tardives l'associent aussi aux maux répandus sur le monde lorsque Pandore souleva le couvercle du vase qui lui avait été confié — la tromperie comptant, dans cette lecture, parmi les premières épreuves faites aux hommes.",
    "Elle a pour rivale Aletheia, la Vérité (voir la fiche « Aletheia ») : l'une dévoile ce que l'autre travestit, et aucune des deux ne l'emporte jamais tout à fait sur l'autre.",
  ],
  "phobos": [
    "Phobos personnifie la Peur qui saisit avant tout raisonnement — fils d'Arès (voir la fiche « Arès ») et d'Aphrodite, jumeau de Deimos, la Terreur, avec qui il escorte son père au combat, aux côtés de Palioxis, qui incarne le repli de ce même cortège (voir la fiche « Palioxis »).",
    "Homère le place, aux côtés de la tête de la Gorgone, sur le bouclier d'Agamemnon comme sur l'égide d'Athéna : son image seule, brandie face à l'ennemi, suffisait à faire vaciller des rangs entiers avant qu'une seule lame ne soit levée.",
    "Les Spartiates lui vouaient un culte à part, non pour la bannir, mais pour l'apprivoiser : une peur reconnue et maîtrisée, croyaient-ils, forge une discipline plus sûre qu'une bravoure aveugle qui ignore le danger.",
  ],
  "morphée": [
    "Morphée est le dieu des songes, fils d'Hypnos, le Sommeil — il façonne dans le rêve des silhouettes humaines si parfaites qu'elles se confondent avec la réalité, message des dieux glissé dans le repos des mortels.",
    "Ovide raconte comment Junon, voulant révéler à Alcyone la mort de son époux Céyx en mer, envoya Morphée prendre les traits exacts du disparu pour la lui annoncer en songe — une vérité que la déesse jugeait trop cruelle à dire éveillée, mais qu'il fallait pourtant transmettre.",
  ],
  "thanatos": [
    "Thanatos personnifie la mort paisible, sans violence ni souffrance — fils de Nyx (voir la fiche « Nyx ») comme Apaté (voir la fiche « Apaté »), et frère jumeau d'Hypnos, le Sommeil, tant les deux se ressemblent.",
    "Sisyphe parvint un jour à l'enchaîner par ruse, empêchant plus personne de mourir sur terre — jusqu'à ce qu'Arès, furieux de voir la guerre perdre tout enjeu sans la mort pour la trancher, ne vienne le libérer de force.",
    "Selon une tradition popularisée par la tragédie d'Euripide, Héraclès (voir la fiche « Héraclès ») l'aurait un jour défié corps à corps pour arracher la reine Alceste (voir la fiche « Alceste ») des Enfers — une version plus rare que celle suivie ici, où c'est Perséphone elle-même, touchée par l'amour d'Alceste pour son époux, qui la renvoya sans qu'aucun combat ne soit nécessaire.",
  ],
  "hormos": [
    "Hormos personnifie l'élan qui précède toute action — l'impulsion brute, avant même qu'un but précis ne soit choisi.",
    "Les Athéniens lui vouaient un autel, tout près de celui dédié à Éléos, la Pitié (voir la fiche « Éléos »), comme s'il fallait honorer côte à côte la force qui pousse à agir et la retenue qui sait, parfois, la tempérer.",
    "Figure mineure et peu documentée, Hormos n'a jamais eu de mythe développé qui lui soit propre — comme si l'élan qu'il personnifie ne s'attardait jamais assez longtemps sur un seul récit pour s'y fixer.",
  ],
  "arès": [
    "Fils de Zeus et d'Héra (voir les fiches « Zeus » et « Héra »), Arès personnifie la guerre dans sa forme la plus brute — la violence du combat lui-même, plutôt que la stratégie qui l'encadre. Même ses propres parents le tenaient à distance : Zeus le qualifie, dans l'Iliade, du plus détestable de tous ses enfants.",
    "Son opposée naturelle est Athéna (voir la fiche « Athéna »), déesse d'une guerre pensée et disciplinée : les deux s'affrontent directement sur le champ de bataille de Troie, où Athéna prend systématiquement le dessus sur lui.",
    "Deux géants jumeaux, Otos et Éphialtès, parvinrent un jour à le capturer et à l'enfermer treize mois durant dans une jarre de bronze — une humiliation dont seul Hermès (voir la fiche « Hermès ») réussit à le délivrer. Même le dieu de la guerre, apprit-on ce jour-là, pouvait être réduit à l'impuissance.",
    "Son amour pour Aphrodite (voir la fiche « Aphrodite »), mariée à Héphaïstos, leur valut d'être surpris nus dans un filet d'or tissé par l'époux trompé — mais leur union donna aussi naissance à Harmonie (voir la fiche « Harmonie ») et aux jumeaux Phobos et Deimos (voir la fiche « Phobos »), qui l'escortent au combat.",
    "Sa figure inspire aussi tout un peuple : les Amazones voient dans leur première reine, Otrera (voir la fiche « Otrera »), une épouse mortelle d'Arès, qui aurait fondé en son honneur le sanctuaire d'Artémis à Éphèse — il devient ainsi, à travers elle, le père spirituel de la nation guerrière tout entière plutôt que le père littéral de chacune de ses reines, Antiope et Hippolyté parmi elles (voir les fiches « Antiope » et « Hippolyté »). Une seule d'entre elles porte pourtant, dans les textes anciens, le titre exact de « fille d'Arès » : Penthésilée (voir la fiche « Penthésilée »), venue prêter main-forte à Troie après la mort d'Hector, tuée en duel par Achille qui, dit-on, pleura en découvrant la beauté de celle qu'il venait d'abattre.",
    "Une autre de ses filles, mortelle celle-là, marqua durablement Athènes : Alcippé, née d'une liaison avec la princesse Aglauros, fut agressée par Halirrhothios, fils de Poséidon, qu'Arès tua sur-le-champ pour la défendre — un geste qui lui valut son tout premier procès, jugé par les autres dieux eux-mêmes sur une colline d'Athènes qui garda depuis son nom (voir la fiche « Alcippé »).",
    "Chez Homère, il porte aussi le nom d'Enyalios, employé comme un simple équivalent du sien — Brotoloigos, « fléau des mortels », et Miaiphonos, « souillé de sang », en résument le tempérament plus brutalement encore. Une tradition plus tardive fit toutefois d'Enyalios une figure distincte, devenue le fils d'Arès et d'Enyo (voir la fiche « Enyo »). À Tégée, en Arcadie, on l'honorait sous un nom plus surprenant, Gynaikothoinas, « celui que festoient les femmes » : les Tégéates, leur garnison masculine absente, auraient repoussé seuls un assaut spartiate mené en réalité par leurs propres femmes armées en secret — celles-ci célébrèrent leur victoire par un banquet dont les hommes furent exclus, un rite rendu depuis à Arès en souvenir du jour où la guerre échappa entièrement aux hommes.",
  ],
  "thalia": [
    "Thalia, dont le nom signifie « celle qui fleurit », est l'une des trois Charites — les déesses de la grâce et de la joie que la tradition ne représente jamais seules, toujours dansant ensemble (voir la fiche « Charites »).",
    "Parmi ses deux sœurs, elle personnifie plus particulièrement la fête, l'abondance et tout ce qui s'épanouit sans nécessité — les banquets, la parure, la beauté qui n'a besoin de rien justifier d'autre qu'elle-même.",
    "Une autre Thalie existe dans la mythologie grecque, l'une des neuf Muses, protectrice de la comédie et de la poésie pastorale (voir la fiche « Thalie ») : les deux Thalia restent distinctes, même si leur nom commun — et leur joie partagée — les rapproche.",
  ],
  "zelos": [
    "Zelos personnifie le Zèle et l'émulation rivale — l'ardeur qui pousse à se mesurer aux autres, jusqu'à la compétition la plus âpre.",
    "Fils du Titan Pallas et de Styx, comme Niké, la Victoire (voir la fiche « Niké »), il se rangea avec ses frères et sœurs aux côtés de Zeus pendant la guerre contre les Titans, et resta depuis un compagnon permanent de son trône, en récompense de cette fidélité.",
  ],
  "bia": [
    "Bia personnifie la Force brute — non la force qui combat pour elle-même, mais celle qui exécute sans jamais discuter ce qu'on lui ordonne.",
    "Fille du Titan Pallas et de Styx, sœur de Niké, de Kratos (voir les fiches « Niké » et « Kratos ») et de Zelos (voir la fiche « Zelos »), elle rallia elle aussi Zeus pendant la guerre contre les Titans et fut récompensée d'une place permanente à ses côtés, jamais quittée depuis.",
    "Elle et Kratos, sur ordre de Zeus, traînèrent un jour Prométhée jusqu'au rocher du Caucase où il fut enchaîné (voir la fiche « Prométhée ») — dans le récit qui la met en scène, Bia ne prononce jamais un mot, contrairement à Kratos : sa seule fonction est d'agir, jamais de justifier.",
  ],
  "agon": [
    "Agon personnifie la Compétition elle-même — non l'affrontement guerrier, mais l'épreuve codifiée où l'on se mesure aux autres selon des règles communes à tous.",
    "Le voyageur Pausanias décrit avoir vu, à Olympie, une statue lui étant consacrée, tenant les haltères des sauteurs — Agon présidait aussi bien les concours sportifs que les concours dramatiques donnés lors des grandes fêtes religieuses.",
  ],
  "borée": [
    "Borée est le dieu du vent du Nord, le plus violent des quatre Anémoi — ses frères Notos (le vent du Sud), Euros (le vent d'Est) et Zéphyr (voir la fiche « Zéphyr »), le vent d'Ouest, soufflent chacun avec une force bien moindre que la sienne.",
    "Fils d'Astréos et d'Éos, l'Aurore (voir la fiche « Éos »), il s'éprit de la princesse athénienne Orithye et, après avoir essuyé un refus, l'enleva en pleine tempête pour l'emmener régner à ses côtés en Thrace — un rapt brutal que les Athéniens finirent par honorer comme une alliance : Borée devint ainsi, par ce mariage, un beau-frère de leur cité.",
    "Lors des guerres médiques, les Athéniens, se souvenant de ce lien, adressèrent des prières à Borée pour qu'il vienne à leur secours contre la flotte perse — Hérodote raconte que ses vents se levèrent alors et fracassèrent une partie des navires ennemis au large de l'Eubée, un secours que la cité lui attribua par la suite comme un dû entre parents.",
  ],
  "alké": [
    "Alké personnifie la Vaillance martiale — la fermeté qui tient la ligne dans l'épreuve, plus proche de l'endurance du combattant que de la fureur guerrière.",
    "C'est une figure mineure, très peu documentée dans les sources qui nous restent : ni généalogie développée ni récit propre ne lui sont attachés, seulement son nom, invoqué comme une qualité que l'on souhaite à qui affronte une épreuve longue.",
  ],
  "kratos": [
    "Kratos personnifie la Puissance souveraine — non la force qui agit d'elle-même, comme sa sœur Bia (voir la fiche « Bia »), mais l'autorité qui commande et fait exécuter.",
    "Fils du Titan Pallas et de Styx, frère de Niké, de Bia et de Zelos (voir les fiches « Niké », « Bia » et « Zelos »), il se rangea comme eux aux côtés de Zeus pendant la guerre contre les Titans et resta depuis un compagnon permanent de son trône, chargé d'en faire respecter les volontés.",
    "Dans la pièce Prométhée enchaîné d'Eschyle, c'est lui qui ouvre la scène : sur ordre de Zeus, il escorte Héphaïstos jusqu'au rocher du Caucase et lui ordonne d'y enchaîner Prométhée, pendant que Bia, silencieuse à ses côtés, se contente d'exécuter (voir la fiche « Prométhée »). Seul parmi les quatre enfants de Styx à recevoir une réplique dans les textes qui nous restent, il incarne le pouvoir qui se justifie en parlant, là où Bia agit sans un mot.",
  ],
  "philotès": [
    "Philotès personnifie l'affection, l'amitié et le désir partagé — la force qui rapproche. Hésiode en fait une fille de la Nuit, née sans père, aux côtés de sœurs bien plus sombres : Apaté la Tromperie, Némésis la Rétribution et Éris la Discorde (voir les fiches « Apaté », « Némésis » et « Éris ») — une même origine nocturne, mais un tempérament qui prend le chemin inverse du leur.",
    "Le philosophe Empédocle en fait l'une des deux grandes forces qui gouvernent l'univers : Philotès unit les éléments là où Éris, sa sœur, les sépare — l'amour et la discorde alternant sans fin pour façonner puis défaire le monde. Il va jusqu'à l'identifier à Aphrodite elle-même, sous son nom archaïque de Kypris.",
    "Un détail rare mais frappant lui est attaché : Empédocle la dit blessée et offensée par les sacrifices d'animaux, dont elle réclamerait l'abstention en son honneur — une divinité de l'union qui refuse jusqu'à la violence faite pour la célébrer.",
  ],
  "euphrosyne": [
    "Euphrosyne, dont le nom signifie « joie » ou « bonne humeur », est l'une des trois Charites — les déesses de la grâce que la tradition ne représente jamais seules, toujours dansant ensemble aux côtés d'Aglaé et de Thalia (voir les fiches « Charites », « Aglaé » et « Thalia »).",
    "Selon Hésiode, elle est fille de Zeus et de l'Océanide Eurynomé, même si les sources antiques varient sur le nombre exact et la généalogie des Charites. Compagnes d'Aphrodite et des Muses, les trois sœurs président aux fêtes et aux banquets de l'Olympe — tout ce qui rend la vie belle sans nécessité.",
    "Parmi ses sœurs, elle personnifie plus particulièrement la joie elle-même — non l'abondance ou la fête que représente Thalia (voir la fiche « Thalia »), mais l'allégresse qui ne naît que du partage, le plaisir simple d'être ensemble.",
  ],
  "hypnos": [
    "Hypnos personnifie le Sommeil, fils de Nyx, la Nuit (voir la fiche « Nyx ») — frère jumeau de Thanatos, la Mort paisible (voir la fiche « Thanatos »), avec qui il partage une ressemblance si troublante que les Anciens les disaient inséparables, l'un menant doucement là où l'autre mène pour toujours.",
    "Il habite, dit-on, une grotte silencieuse aux confins du monde, là où naît le fleuve Lethée, l'Oubli (voir la fiche « Lethée »), et où se rencontrent le jour et la nuit : des pavots poussent à son entrée, et c'est là qu'il engendra Morphée, le dieu des songes, capable de prendre en rêve les traits de n'importe quel mortel (voir la fiche « Morphée »).",
    "Dans l'Iliade, Héra le convainc d'endormir Zeus lui-même le temps de favoriser les Grecs sur le champ de bataille de Troie — l'un des rares récits où même le maître de l'Olympe cède à un pouvoir plus discret que le sien. Une autre tradition le dit épris du berger Endymion (voir la fiche « Endymion »), à qui il laissa les yeux entrouverts durant son sommeil éternel, pour ne jamais cesser de le contempler.",
  ],
  "orphée": [
    "Orphée fut le plus grand musicien jamais né, fils du roi thrace Œagre (voir la fiche « Œagre ») et de la Muse Calliope (voir la fiche « Calliope ») — certaines traditions le disent plutôt fils d'Apollon lui-même, qui lui offrit une lyre d'or et lui enseigna à en jouer (voir la fiche « Lyre »). Son chant, dit-on, charmait aussi bien les bêtes sauvages que les arbres et les rochers, qui se déplaçaient pour venir l'entendre.",
    "Le jour de son mariage avec la nymphe Eurydice — cérémonie que le dieu Hyménée lui-même présida, sa torche ne cessant de fumer sans jamais prendre flamme, mauvais présage resté sans réponse (voir la fiche « Hyménée ») —, celle-ci fut mordue par un serpent en fuyant un satyr et mourut sur le coup : la joie des noces basculant en un instant dans le deuil.",
    "Fou de chagrin, Orphée descendit aux Enfers avec sa seule lyre : son chant adoucit le cœur inflexible d'Hadès et de Perséphone (voir les fiches « Hadès » et « Perséphone »), qui consentirent à lui rendre Eurydice, à une condition — marcher devant elle sans se retourner avant d'avoir atteint la lumière du jour. Presque arrivé, incapable de résister au doute, il se retourna un instant trop tôt : elle disparut une seconde fois, cette fois pour toujours.",
    "Retiré du monde après cette seconde perte, Orphée se détourna de tout nouvel amour et, selon certains récits, du culte de Dionysos lui-même, ne jurant plus que par Apollon et le soleil levant — un dédain que les Ménades thraces, fidèles bacchantes du dieu qu'il négligeait, ne lui pardonnèrent pas. Elles le mirent en pièces lors de l'une de leurs transes, dispersant ses membres que les Muses, ses tantes, recueillirent ensuite pour lui offrir une sépulture (voir la fiche « Muses »).",
    "Sa tête, jetée dans le fleuve Hèbre, continua de chanter le nom d'Eurydice tout au long de sa dérive jusqu'à la mer, avant d'échouer sur l'île de Lesbos, où elle rendit, dit-on, des oracles pendant des siècles — la voix du plus grand musicien du monde restée vivante bien après la mort de son corps.",
  ],
  "hyménée": [
    "Hyménée personnifie le chant et le rite du mariage. La tradition la plus répandue en fait le fils d'Apollon et d'une Muse — Clio, Calliope, Uranie ou Terpsichore selon les versions —, même si d'autres récits le disent plutôt fils de Dionysos, ou de Dionysos et d'Aphrodite. On le représente jeune, une couronne de fleurs sur la tête et une torche allumée à la main, celle-là même qui éclaire, avec les autres torches du cortège nocturne, le passage de la mariée jusqu'à son nouvel époux (voir la fiche « Torches »).",
    "Les Grecs croyaient sa présence indispensable à toute noce : sans lui, le mariage était voué au malheur — on l'invoquait donc à voix haute pendant la cérémonie, dans un chant qui portait justement son nom, l'hyménée, entonné tout au long du cortège menant l'épousée à sa nouvelle maison.",
    "Sa présence, pourtant, ne garantit pas toujours un présage favorable. Ovide raconte qu'appelé aux noces d'Orphée et Eurydice, Hyménée s'y rendit bien, mais sans prononcer les paroles rituelles ni afficher son visage joyeux : sa torche ne fit que fumer sans jamais vouloir prendre, quels que soient les efforts pour l'agiter — un présage qui, dans les faits, se révéla en dessous de la vérité (voir la fiche « Orphée »).",
    "Une tradition plus tardive veut aussi qu'il ait perdu, aux noces de Dionysos et d'Ariane sur l'île de Naxos, une voix pourtant réputée aussi belle que celle de son père Apollon (voir la fiche « Ariane ») — comme si présider aux noces des autres avait, plus d'une fois, un prix pour lui-même.",
  ],

  /* ----- Personnifications des cartes numérales illustrées de Deniers (voir NUMBER_CARD_DEITY) ----- */
  "rhéa": [
    "Rhéa, fille du Ciel et de la Terre (Ouranos et Gaïa, voir les fiches « Ouranos » et « Gaïa »), épousa son frère Cronos (voir la fiche « Cronos ») et mit au monde les six premiers dieux de l'Olympe : Hestia, Déméter, Héra, Hadès, Poséidon et Zeus. Mais Cronos, averti qu'un de ses enfants le détrônerait un jour comme il avait lui-même détrôné son père, avalait chacun d'eux dès sa naissance.",
    "Lorsque vint le tour de Zeus, Rhéa refusa de le perdre comme les autres : elle se retira secrètement en Crète pour accoucher, cacha le nouveau-né dans une grotte du mont Ida, confié aux nymphes et à la chèvre Amalthée, et tendit à Cronos une pierre emmaillotée qu'il avala sans se douter de la substitution (voir la fiche « Grotte »).",
    "Zeus, une fois adulte, revint forcer son père à rendre tous les enfants qu'il avait engloutis — ses propres frères et sœurs, désormais adultes eux aussi — avant de le renverser à son tour lors de la Titanomachie. Rhéa, par cette seule ruse, avait rendu possible la naissance de l'Olympe tel qu'on le connaît.",
  ],
  "kairos": [
    "Kairos personnifie l'instant favorable — non pas le temps qui s'écoule (Chronos), mais l'occasion précise qui se présente une fois et ne se répète pas.",
    "La tradition le représente jeune et ailé, souvent muni de sandales ailées et d'une balance en équilibre sur le fil d'un rasoir : une longue mèche pend sur son front, tandis que l'arrière de son crâne reste chauve — on ne peut le saisir qu'en face, au moment même où il passe, jamais après qu'il s'est éloigné.",
    "Le sculpteur Lysippe en fit l'une de ses œuvres les plus célèbres, une statue tant admirée dans l'Antiquité qu'elle inspira des épigrammes entières consacrées à en décrire l'allégorie : la fortune ne se refuse jamais, mais elle ne prévient pas non plus de son passage.",
  ],
  "dédale": [
    "Dédale est l'archétype grec de l'ingéniosité technique : architecte, sculpteur et inventeur, on lui attribue tout autant des statues si vivantes qu'on les croyait animées que des outils devenus indispensables aux artisans de son temps.",
    "Sur l'ordre du roi Minos, il construisit en Crète le Labyrinthe — un dédale de couloirs si complexe que son propre créateur y aurait presque pu se perdre — pour y enfermer le Minotaure (voir la fiche « Labyrinthe »).",
    "Minos, craignant qu'il ne révèle le secret de sa construction, l'enferma lui-même dans le Labyrinthe avec son fils Icare. Dédale, refusant d'y rester prisonnier de sa propre œuvre, fabriqua pour tous deux des ailes de plumes assemblées à la cire — une évasion par les airs qui coûta la vie à Icare (voir la fiche « Icare »), monté trop près du soleil, mais que Dédale, lui, mena à son terme.",
  ],
  "ctésios": [
    "Zeus Ctésios (« Zeus des biens ») est l'aspect du roi des dieux tourné vers l'intérieur du foyer plutôt que vers le ciel ou l'Olympe : le gardien discret des réserves, des provisions et de tout ce qu'une maisonnée met de côté pour durer.",
    "Son culte domestique se pratiquait sans temple ni grande cérémonie : chaque maison entretenait dans son cellier une simple jarre à deux anses, remplie d'eau pure, d'huile et de fruits, couronnée de laine — un autel miniature dédié à la prospérité accumulée plutôt qu'à la richesse soudaine.",
    "Contrairement aux grandes figures de l'abondance comme Ploutos, qui incarne la richesse elle-même, Ctésios personnifie moins l'avoir que le fait de le préserver : une vigilance patiente, plus proche de l'économie domestique que de la fortune éclatante.",
  ],
  "penia": [
    "Penia personnifie le dénuement — non pas la misère absolue, mais le manque permanent qui pousse sans cesse à chercher, jamais tout à fait comblé.",
    "Platon raconte, dans le Banquet, comment elle se présenta au festin donné pour la naissance d'Aphrodite, mendiant à la porte pendant que les dieux festoyaient à l'intérieur. Apercevant Poros, personnification de l'Abondance et de la Ressource, ivre du nectar servi ce soir-là, elle s'unit à lui pour concevoir un enfant : Éros, le désir amoureux.",
    "De cette union naît, selon Platon, la nature même de l'amour : toujours en quête, jamais rassasié, tenant à la fois de sa mère un dénuement perpétuel et de son père l'ingéniosité à toujours trouver un moyen d'obtenir ce qui lui manque.",
  ],
  "éléos": [
    "Éléos personnifie la Pitié et la compassion envers le malheur d'autrui — un sentiment si estimé par les Athéniens qu'ils lui élevèrent, sur l'Agora, un autel unique en son genre : dédié non à un dieu de l'Olympe, mais à cette seule vertu.",
    "Selon Pausanias, cet autel servait de refuge aux suppliants — esclaves en fuite, exilés, vaincus de toute origine — car nulle part ailleurs en Grèce une cité n'honorait ainsi la clémence elle-même plutôt qu'un dieu censé l'accorder. Hormos avait lui aussi son autel tout près, sur cette même Agora (voir la fiche « Hormos »).",
    "Contrairement à Némésis, qui rétablit un équilibre par la sanction (voir la fiche « Némésis »), Éléos agit dans l'autre sens : elle ne punit jamais, elle épargne — un geste que même les puissants pouvaient recevoir sans y perdre leur rang.",
  ],
  "aristée": [
    "Aristée, fils d'Apollon et de la nymphe Cyrène, fut élevé par les Nymphes et les Muses, qui lui enseignèrent l'art de cultiver la terre et d'élever les abeilles — des savoirs qu'il transmit ensuite lui-même aux hommes, comme Triptolème avant lui pour le blé (voir la fiche « Triptolème »).",
    "Virgile raconte comment, ayant perdu toutes ses abeilles après la mort accidentelle d'Eurydice — la nymphe s'était noyée en le fuyant —, Aristée dut consulter le devin marin Protée pour apprendre comment en faire renaître un essaim entier de la carcasse d'un taureau sacrifié : un long rite, patient et minutieux, pour retrouver ce qu'il avait perdu.",
    "Sa légende en fait le patron discret de tous les savoirs agricoles qui demandent du temps avant de porter leurs fruits — l'olivier, l'abeille, le fromage — plutôt que les récoltes rapides que président d'autres figures.",
  ],
  "techné": [
    "Techné personnifie l'habileté manuelle et le savoir-faire acquis par la pratique — le mot grec technē a d'ailleurs donné notre propre mot « technique ».",
    "Contrairement à Athéna ou Héphaïstos (voir les fiches « Athéna » et « Héphaïstos »), dont le patronage sur les métiers et l'artisanat repose sur un mythe développé, Techné reste une figure tardive et allégorique, apparue surtout dans l'art et la littérature gréco-romaines pour représenter cette qualité elle-même plutôt qu'un personnage aux exploits racontés.",
    "Elle incarne ainsi moins un pouvoir divin qu'une valeur : la maîtrise patiente d'un geste répété, jusqu'à ce que la main sache ce que l'esprit n'a plus besoin de lui rappeler.",
  ],
  "aglaé": [
    "Aglaé, dont le nom signifie « splendeur » ou « éclat », est la plus jeune des trois Charites — les déesses de la grâce que la tradition ne représente jamais seules, toujours dansant aux côtés d'Euphrosyne et de Thalia (voir les fiches « Charites », « Euphrosyne » et « Thalia »).",
    "Homère, dans l'Iliade, en fait l'épouse d'Héphaïstos (voir la fiche « Héphaïstos ») — une union surprenante entre le dieu forgeron, boiteux et disgracié par les autres Olympiens, et celle qui personnifie justement l'éclat et la beauté rayonnante.",
    "Parmi ses sœurs, elle incarne plus particulièrement la splendeur qui couronne un accomplissement déjà réussi — non plus l'effort ou le partage, mais le rayonnement tranquille de ce qui n'a plus rien à prouver.",
  ],
  "euthénie": [
    "Euthénie personnifie la Prospérité et l'Abondance durable — moins un personnage aux exploits racontés qu'une qualité incarnée, apparue surtout dans l'art et la pensée grecques tardives pour donner un visage au fruit visible d'une terre bien cultivée et d'une maison bien tenue.",
    "Elle appartient à cette même famille de figures allégoriques que Techné ou Éléos (voir les fiches « Techné » et « Éléos ») : des personnifications sans mythe développé, honorées pour la qualité qu'elles incarnent plutôt que pour des exploits qui leur seraient propres.",
    "Elle partage avec Ctésios, gardien du garde-manger domestique (voir la fiche « Ctésios »), ce même terrain : non la richesse conquise ou héritée d'un seul coup, mais celle qui s'accumule patiemment, génération après génération, jusqu'à devenir un bien commun plutôt qu'individuel.",
  ],

  /* ----- Figures ajoutées à la demande directe de l'utilisatrice ----- */
  "hygie": [
    "Fille d'Asclépios, dieu de la médecine, Hygie personnifie la santé elle-même — non pas le remède qui traite un mal déjà présent, mais la propreté et les bonnes pratiques qui l'empêchent de survenir.",
    "On la représente tenant un serpent (voir la fiche « Serpent ») qui boit dans une coupe qu'elle tient à la main : cette image, la « coupe d'Hygie », reste aujourd'hui encore le symbole international de la pharmacie dans de nombreux pays.",
    "Son nom grec, hugieia, a donné directement le mot français « hygiène » — rare privilège pour une figure mythologique secondaire, dont le souvenir survit ainsi jusque dans le langage courant, bien au-delà de son propre culte antique.",
  ],
  "médée": [
    "Petite-fille d'Hélios (voir la fiche « Hélios ») et nièce de la magicienne Circé (voir la fiche « Circé »), Médée maîtrisait déjà les herbes et les sortilèges lorsque Jason arriva en Colchide à la recherche de la Toison d'or.",
    "Selon L'Argonautique d'Apollonios de Rhodes, cet amour ne naquit pas seul : inquiètes du sort de Jason, Héra et Athéna (voir les fiches « Héra » et « Athéna ») demandèrent secours à Aphrodite (voir la fiche « Aphrodite »), qui chargea son fils Éros (voir la fiche « Éros ») de décocher une flèche d'or dans le cœur de Médée dès qu'elle poserait les yeux sur Jason — un trait si soudain qu'elle en resta sans voix, foudroyée d'un amour qu'elle n'avait jamais cherché.",
    "Éprise de lui, elle trahit son propre père le roi Aiétès pour l'aider à accomplir les épreuves jugées impossibles qu'il lui avait fixées, puis découpa même son frère Absyrtos en morceaux jetés à la mer pour retarder leurs poursuivants, le temps que Jason s'échappe avec la Toison (voir la fiche « Jason »).",
    "Des années plus tard, installés à Corinthe et parents de deux fils, Jason l'abandonna pour épouser la fille du roi Créon. Médée se vengea en offrant à sa rivale une robe empoisonnée qui la consuma vivante, puis, selon la version la plus sombre du mythe — celle d'Euripide —, tua ses propres enfants pour priver Jason de toute descendance.",
    "Elle s'échappa de Corinthe sur un char ailé tiré par des dragons, prêté par son grand-père Hélios (voir la fiche « Hélios ») — le même astre qui, chaque jour, traverse le ciel sans jamais se soucier de ce qui se passe en dessous.",
  ],
  "calliope": [
    "Fille de Zeus et de la Titanide Mnémosyne (voir les fiches « Zeus » et « Mnémosyne »), la Mémoire elle-même, Calliope est l'aînée et la plus vénérée des neuf Muses : celle qui préside à la poésie épique, le grand récit des exploits héroïques que les aèdes chantaient de génération en génération.",
    "On la représente une tablette et un stylet à la main, prête à consigner ce qui mérite de ne jamais être oublié — un rôle qui prolonge directement l'origine de sa mère, la Mémoire.",
    "Unie à Apollon ou, selon d'autres traditions, au roi thrace Œagre, elle mit au monde Orphée, dont le chant devait plus tard surpasser celui de tous les mortels (voir la fiche « Orphée »).",
    "Lorsque les neuf filles de Piéros osèrent défier les Muses en un concours de chant, ce fut Calliope qui répondit en leur nom par le récit du rapt de Perséphone par Hadès — un chant qui l'emporta sans appel et valut aux Piérides d'être changées en pies bavardes pour avoir refusé leur défaite (voir la fiche « Muses »).",
  ],
  "cassiopée": [
    "Reine d'Éthiopie, épouse du roi Céphée, Cassiopée commit l'erreur de se vanter que sa propre beauté — ou, selon d'autres versions, celle de sa fille Andromède — surpassait celle des Néréides, les nymphes de la mer.",
    "Offensées, celles-ci obtinrent de Poséidon qu'il envoie un monstre marin ravager les côtes du royaume ; seul le sacrifice d'Andromède, enchaînée à un rocher en offrande expiatoire, put apaiser sa colère — jusqu'à ce que Persée, de retour avec la tête de Méduse, la sauve et l'épouse (voir la fiche « Andromède »).",
    "Après sa mort, Cassiopée fut placée elle aussi parmi les étoiles (voir la fiche « Étoile ») — mais comme punition plutôt que récompense : sa constellation tourne autour du pôle céleste de telle sorte qu'elle se retrouve, une bonne partie de l'année, suspendue la tête en bas sur son propre trône.",
  ],
  "mélinoé": [
    "Selon l'hymne orphique qui lui est consacré, Mélinoé est née d'une ruse de Zeus : pour s'unir à Perséphone (voir la fiche « Perséphone »), déjà reine des Enfers, il aurait pris l'apparence de son propre époux Hadès (voir la fiche « Hadès ») — une tromperie qui explique le caractère trouble, à la fois divin et infernal, de la fille née de cette union.",
    "L'hymne la décrit vêtue de safran, mais surtout aux membres mi-noirs, mi-blancs — un partage qui traduit sa double origine, sombre du côté d'Hadès dont Zeus avait pris l'apparence, lumineuse du côté de l'Olympien lui-même. Elle erre la nuit parmi les tombes à la tête d'un cortège de fantômes, semant chez les mortels endormis des visions terrifiantes et une folie passagère.",
    "De nombreux récits modernes simplifient cette généalogie en en faisant directement la fille d'Hadès et de Perséphone — une confusion compréhensible, puisque dans la religion orphique Zeus et Hadès n'étaient parfois vus que comme deux visages d'une même puissance souveraine, l'une céleste et l'autre souterraine.",
    "Des offrandes lui étaient adressées pour apaiser les âmes errantes et détourner les cauchemars qu'elle pouvait envoyer — une déesse mineure et tardive, mais qui incarne à elle seule ce que le monde souterrain a de plus troublant : ni tout à fait vivante, ni tout à fait morte, ni tout à fait d'un seul camp.",
  ],
  "ascalaphos": [
    "Fils du fleuve infernal Achéron, Ascalaphos veillait sur le jardin des Enfers lorsqu'il vit Perséphone (voir la fiche « Perséphone ») cueillir et manger quelques grains de la grenade d'Hadès (voir la fiche « Grenade ») — un geste qui, une fois rapporté aux autres dieux, la liait irrévocablement au monde souterrain.",
    "Furieuse d'avoir ainsi perdu tout espoir de récupérer sa fille en entier, Déméter (voir la fiche « Déméter ») l'écrasa sous un énorme rocher aux Enfers ; il n'en fut délivré que des générations plus tard, lorsqu'Héraclès, venu y chercher le chien Cerbère pour son douzième travail, souleva la pierre à sa place (voir la fiche « Héraclès ») — c'est alors Déméter elle-même, sa colère toujours vive, qui le changea en une chouette au corps couvert de plumes grises et au bec crochu, oiseau de mauvais augure dont le cri annonce depuis un malheur à venir. Une tradition parallèle, chez Ovide, simplifie le récit : c'est Perséphone elle-même, dès qu'elle devint reine des Enfers, qui le transforma directement en chouette, sans rocher ni intervention d'Héraclès.",
    "Aucune version ancienne ne fait intervenir Athéna dans ce mythe : la chouette qui l'accompagne comme oiseau sacré vient d'une histoire entièrement différente, celle de Nyctimène. Princesse de Lesbos, elle fuit dans les bois après avoir subi l'inceste de son propre père ; par compassion pour sa honte, Athéna la changea en chouette et la recueillit parmi ses oiseaux sacrés. Les deux récits ne se rejoignent que par l'oiseau qu'ils ont en commun, ce qui explique une confusion fréquente entre les deux figures.",
  ],
  "pasiphaé": [
    "Fille d'Hélios (voir la fiche « Hélios ») et épouse du roi Minos de Crète (voir la fiche « Minos »), Pasiphaé fut frappée par Poséidon d'un désir irrépressible pour un taureau d'une blancheur éclatante que le dieu avait offert à Minos, et que celui-ci avait refusé de sacrifier comme convenu (voir la fiche « Taureau »).",
    "Pour assouvir cette passion contre nature, elle demanda à l'architecte Dédale (voir la fiche « Dédale ») de lui construire une vache de bois creuse, dans laquelle elle se glissa pour s'unir à l'animal — de cette union naquit le Minotaure, monstre à tête de taureau et corps d'homme.",
    "Minos, honteux, fit enfermer la créature dans le Labyrinthe que Dédale construisit à cet effet (voir la fiche « Labyrinthe »), où elle fut nourrie de tributs humains jusqu'à sa mort face à Thésée (voir la fiche « Thésée »). Pasiphaé eut par ailleurs plusieurs enfants légitimes avec Minos, dont Ariane (voir la fiche « Ariane »).",
  ],
  "hermaphrodite": [
    "Fils d'Hermès et d'Aphrodite (voir les fiches « Hermès » et « Aphrodite »), Hermaphrodite doit littéralement son nom à ses deux parents : les nymphes du mont Ida, qui l'élevèrent loin de l'Olympe, fondirent leurs deux noms en un seul pour le désigner, avant même que son destin ne rende ce nom deux fois plus juste.",
    "À quinze ans, parti découvrir le monde, il s'arrêta se baigner dans une source de Carie où vivait la naïade Salmacis. Éprise de lui au premier regard, elle tenta de le séduire ; repoussée, elle feignit de s'éloigner puis, le voyant nu dans l'eau, se jeta sur lui et l'enlaça de tout son corps, suppliant les dieux qu'aucun jour ne vienne jamais les séparer.",
    "Les dieux l'exaucèrent à la lettre : les deux corps enlacés ne firent plus qu'un seul être, ni tout à fait homme ni tout à fait femme, mais les deux à la fois — une fusion imposée plutôt qu'un don, née d'une étreinte qu'aucun des deux n'avait choisie de cette manière.",
    "Désespéré d'avoir perdu sa virilité entière malgré lui, Hermaphrodite obtint à son tour une faveur : que quiconque se baigne désormais dans cette même source en ressorte, lui aussi, à moitié efféminé — une malédiction locale que les habitants de la région racontaient encore des siècles plus tard pour expliquer l'eau troublante de leur pays.",
  ],
  "priape": [
    "Selon Diodore de Sicile, Priape naquit d'une liaison passagère entre Dionysos et Aphrodite (voir les fiches « Dionysos » et « Aphrodite »), conçu au moment même où la déesse, après s'être un temps éprise d'Adonis, se réconciliait avec lui — une tradition plus rare le donne pour fils d'Hermès.",
    "Furieuse de la conduite d'Aphrodite, Héra (voir la fiche « Héra ») posa la main sur son ventre encore enceinte et lui infligea, par ce seul geste, la disgrâce inverse de la beauté maternelle : l'enfant naquit d'une laideur repoussante, doté d'attributs virils démesurés mais, ironie que les poètes ne se lasseront pas de railler, incapables de le servir.",
    "Jugé trop difforme pour vivre parmi les dieux de l'Olympe, il fut abandonné et recueilli par des bergers, qui l'élevèrent loin des palais divins. Devenu adulte, il régna en petit dieu rustique sur les jardins, les troupeaux et la fertilité des champs, son image de bois plantée comme épouvantail au milieu des cultures qu'il était censé protéger.",
    "Son culte, surtout florissant à l'époque romaine, lui valut tout un recueil de poèmes grivois écrits en son honneur, les Priapées — un dieu mineur, tourné en dérision autant que vénéré, mais dont le nom est resté depuis dans le vocabulaire médical pour désigner une érection prolongée et douloureuse.",
  ],
  "antiope": [
    "Reine ou princesse parmi les Amazones, Antiope est celle que Thésée ramena avec lui d'une expédition sur leurs terres pour l'épouser (voir la fiche « Thésée ») — même si les auteurs anciens ne s'accordent pas sur son identité exacte : Plutarque rapporte que certaines de ses sources l'appellent Antiope, d'autres lui préfèrent le nom d'Hippolyté, la reine amazone dont Héraclès obtint par ailleurs la ceinture dans un tout autre épisode (voir la fiche « Hippolyté ») — au point qu'il est parfois difficile de savoir s'il s'agit de la même figure sous deux noms, ou de deux sœurs distinctes.",
    "Furieuses de cet enlèvement, les Amazones envahirent l'Attique et marchèrent jusqu'au cœur d'Athènes pour l'affronter. Acquise désormais à son mari, Antiope se retourna contre son propre peuple pour le défendre, et mourut au combat à ses côtés plutôt que contre lui.",
    "De leur union naquit un fils, lui aussi appelé Hippolyte (voir la fiche « Hippolyte ») — dévot d'Artémis et rival malgré lui d'Aphrodite, dont la légende se conclut de façon plus tragique encore que celle de sa mère.",
    "Une autre Antiope, fille du roi thébain Nyctée, n'a quant à elle aucun lien avec les Amazones : séduite par Zeus, elle enfanta les jumeaux Amphion et Zéthos, persécutée ensuite par sa propre tante Dircé — un tout autre récit que seul le nom partagé relie à la reine guerrière.",
  ],
  "thésée": [
    "Fils du roi Égée d'Athènes — ou, selon une tradition parallèle, de Poséidon lui-même, les deux s'étant unis la même nuit à sa mère Éthra —, Thésée grandit loin de son père, élevé secrètement à Trézène. Avant de repartir pour Athènes, Égée avait caché sous un rocher son épée et ses sandales, ne laissant à son fils que la promesse de venir le rejoindre une fois assez fort pour les soulever seul.",
    "Devenu adulte, Thésée souleva le rocher sans peine et choisit, pour rejoindre Athènes, la route terrestre la plus périlleuse plutôt que la voie maritime, plus sûre : il vainquit en chemin toute une série de brigands, arrivant à la cour de son père déjà couvert de gloire, avant même d'y être reconnu (voir la fiche « Chemin »).",
    "Peu après, il se porta volontaire pour affronter le Minotaure enfermé dans le Labyrinthe de Crète (voir la fiche « Labyrinthe »), et n'en réchappa que grâce au fil qu'Ariane, fille de Minos éprise de lui, lui confia en secret (voir la fiche « Ariane »). Il l'abandonna pourtant endormie sur l'île de Naxos au retour — un oubli qui coûta cher à son propre père : ayant lui-même oublié de hisser les voiles blanches convenues en signe de victoire, Égée, apercevant au loin les voiles noires du deuil, se jeta du haut d'une falaise, croyant son fils mort.",
    "Devenu roi d'Athènes, il participa selon certaines versions à l'expédition d'Héraclès contre les Amazones (voir la fiche « Héraclès ») et en ramena une reine amazone pour l'épouser — Antiope, dont il eut un fils, Hippolyte (voir les fiches « Antiope » et « Hippolyte ») ; l'enlèvement déclencha une invasion de l'Attique par les Amazones furieuses, qu'Athènes parvint de justesse à repousser.",
    "Il épousa ensuite Phèdre (voir la fiche « Phèdre »), sœur d'Ariane, dont la passion malheureuse pour Hippolyte, son propre beau-fils, causa la mort du jeune homme et la disgrâce de Thésée lui-même (voir la fiche « Hippolyte ») — un roi dont chaque grand amour, Ariane, Antiope, puis Phèdre, se solda finalement par une perte plutôt qu'un bonheur durable.",
  ],
  "hippolyté": [
    "Reine des Amazones, Hippolyté possédait une ceinture offerte par Arès lui-même en récompense de sa valeur guerrière (voir la fiche « Arès ») ; l'obtenir constitua le neuvième des douze travaux d'Héraclès (voir la fiche « Héraclès »).",
    "Prête d'abord à la lui céder de bon cœur, la rencontre tourna à la bataille lorsque Héra, semant la discorde parmi les Amazones, les persuada qu'Héraclès venait en réalité enlever leur reine. Selon certaines traditions, cette même reine — ou sa sœur, les sources hésitant sur ce point — est aussi celle qu'épousa plus tard Thésée sous le nom d'Antiope (voir la fiche « Antiope ») — sans lien de parenté avec Hippolyte, le fils que Thésée eut justement de cette union (voir la fiche « Hippolyte »).",
  ],
  "hippolyte": [
    "Fils de Thésée et d'Antiope (voir les fiches « Thésée » et « Antiope »), Hippolyte vouait un culte exclusif à Artémis et méprisait ouvertement l'amour et le mariage, provoquant ainsi la colère d'Aphrodite (voir la fiche « Aphrodite ») — sans lien de parenté avec Hippolyté, la reine amazone dont Héraclès obtint la ceinture (voir la fiche « Hippolyté »).",
    "Pour se venger, Aphrodite inspira à sa belle-mère Phèdre (voir la fiche « Phèdre »), seconde épouse de Thésée, une passion irrépressible pour lui ; repoussée et honteuse, Phèdre se donna la mort en laissant une lettre l'accusant faussement de l'avoir agressée.",
    "Thésée, y croyant, invoqua contre son propre fils l'une des trois malédictions que Poséidon lui avait promis d'exaucer sans jamais les discuter. Alors qu'Hippolyte fuyait en char le long du rivage, un taureau surgi des flots terrifia ses chevaux, qui s'emballèrent et le traînèrent à la mort sur les rochers — Thésée ne comprit son erreur qu'une fois trop tard, la vérité révélée par Artémis elle-même.",
  ],
  "didon": [
    "Princesse phénicienne de Tyr, Didon fuit sa cité natale après que son propre frère, le roi Pygmalion, eut fait assassiner son mari Sychée pour s'emparer de ses richesses. Elle traversa la Méditerranée avec une poignée de fidèles et fonda sur la côte d'Afrique du Nord la ville de Carthage, dont elle devint la reine.",
    "C'est là qu'échoua, des siècles plus tard selon la légende romaine, la flotte du prince troyen Énée (voir la fiche « Énée ») : Vénus, mère d'Énée, et Junon favorisèrent en secret leur idylle, jusqu'à ce que les dieux rappellent à Énée qu'il devait repartir fonder en Italie la lignée d'où naîtrait Rome. Abandonnée, Didon se transperça de l'épée même de son amant sur un bûcher funéraire, non sans maudire d'avance toute sa descendance — une malédiction que les Romains liront plus tard comme l'origine mythique de leurs guerres contre Carthage.",
    "Une tradition plus ancienne que celle de Virgile, rapportée par l'historien romain Justin, ignore complètement Énée : selon cette version, c'est le roi numide Iarbas qui exigea d'épouser Didon sous peine de guerre, et c'est pour rester fidèle au souvenir de son défunt mari qu'elle choisit de se donner la mort — un amour tragique avec Énée que Virgile aurait donc inventé, ou du moins largement développé, plusieurs siècles après la fondation historique de Carthage.",
  ],
  "érichthonios": [
    "Né de la terre elle-même, Érichthonios doit son existence à un geste manqué d'Héphaïstos envers Athéna (voir les fiches « Héphaïstos » et « Athéna ») : repoussé alors qu'il tentait de s'unir à elle de force, le dieu forgeron laissa sa semence tomber au sol lorsque la déesse, dégoûtée, l'essuya avec un morceau de laine — Gaïa, mère de toutes choses, en fut fécondée et donna naissance à l'enfant, qu'Athéna n'a donc jamais porté elle-même, mais qu'elle accepta d'élever.",
    "Pour le soustraire aux regards, Athéna l'enferma dans un coffre qu'elle confia à Pandrosos, fille du roi Cécrops (voir la fiche « Pandrosos »), en lui interdisant formellement de l'ouvrir. Curieuses, les deux sœurs de Pandrosos, Aglauros et Hersé (voir les fiches « Aglauros » et « Hersé »), désobéirent et découvrirent l'enfant enlacé par un serpent — un spectacle si terrifiant que certaines versions les disent tuées sur place par le serpent, ou rendues folles par la fureur d'Athéna au point de se jeter du haut de l'Acropole ; la tradition suivie ici les laisse toutes deux en vie, pour un tout autre malheur qui rattrapera Aglauros plus tard.",
    "Devenu adulte, Érichthonios régna sur Athènes, y fit ériger la statue de bois d'Athéna sur l'Acropole et institua les Panathénées, la plus grande fête de la cité en l'honneur de sa protectrice — un roi né serpent et poussière, mais devenu le fondateur du culte le plus durable de toute l'histoire d'Athènes.",
    "Ce n'est pas une coïncidence si ce même motif du roi-serpent surgi du sol se retrouve, avant lui, chez Cécrops (voir la fiche « Cécrops ») : les sources antiques elles-mêmes mêlent parfois les deux figures, tant elles incarnent chacune, à sa manière, la même revendication d'autochtonie — l'idée que les Athéniens ne descendent d'aucun peuple venu d'ailleurs, mais sont littéralement nés de leur propre terre.",
    "Une tradition plus tardive, issue de l'astronomie plutôt que du mythe fondateur, lui attribue aussi l'invention du char à quatre chevaux — pour compenser, dit-on, un handicap aux jambes hérité de sa naissance peu commune — un exploit qui lui aurait valu d'être élevé parmi les étoiles sous la forme de la constellation du Cocher.",
  ],
  "alcippé": [
    "Fille d'Arès et d'Aglauros (voir la fiche « Aglauros »), princesse d'Athènes — la même qui, plus tard, ouvrit par curiosité le coffre où Athéna cachait le jeune Érichthonios (voir la fiche « Érichthonios ») —, Alcippé grandit à la cour de son grand-père, le roi Cécrops (voir la fiche « Cécrops »).",
    "Halirrhothios, fils de Poséidon (voir la fiche « Poséidon »), tenta de la violenter ; surpris par Arès (voir la fiche « Arès »), qui le tua sur-le-champ pour la défendre, le dieu de la guerre se retrouva alors accusé de meurtre par Poséidon lui-même.",
    "Zeus convoqua un tribunal exceptionnel, composé des douze dieux de l'Olympe, sur une colline faisant face à l'Acropole : Arès y fut jugé et acquitté, son geste reconnu comme une défense légitime plutôt qu'un crime — le tout premier procès de l'histoire à opposer un dieu à un autre devant leurs pairs. La colline garda depuis le nom d'Aréopage, la « colline d'Arès », et devint plus tard le tribunal où l'on jugera Oreste, la première fois qu'un tribunal humain remplaça la vengeance sans fin des Érinyes (voir la fiche « Érinyes »).",
  ],
  "enyo": [
    "Enyo personnifie moins l'affrontement lui-même que le vacarme, le sang et le chaos qui l'accompagnent lorsqu'une bataille bascule dans le pire : Homère lui donne, dans l'Iliade, l'épithète de « ptoliporthos », la « pilleuse de villes » — un titre qui la lie moins au combat singulier qu'à la chute d'une cité tout entière.",
    "Elle accompagne Arès (voir la fiche « Arès ») en compagne de bataille plutôt qu'en descendante, et les auteurs la décrivent avec une crudité que le dieu de la guerre lui-même n'inspire pas toujours : chez Nonnos de Panopolis, elle attise la fureur des deux camps sans jamais favoriser l'un plus que l'autre, une frénésie impartiale plutôt qu'un parti pris ; chez Quintus de Smyrne, elle est « l'effroyable Enyo, aux membres tout éclaboussés de sang », de retour aux instants les plus sanglants d'un combat, comme si elle en incarnait le vacarme et l'horreur plutôt que la stratégie ou le courage.",
    "Elle fit l'objet d'un culte réel : Pausanias mentionne une statue d'Enyo, œuvre des fils de Praxitèle, dressée dans le sanctuaire même d'Arès sur l'Agora d'Athènes, aux côtés d'Athéna et d'Aphrodite. Les Romains l'identifièrent à leur propre déesse Bellone, dont le culte tardif — marqué par des prêtres qui s'entaillaient rituellement la peau lors du « jour du sang » — devint plus sanglant encore que celui d'Enyo elle-même, et dont le temple, près du cirque Flaminius, servait de cadre officiel à la déclaration romaine de guerre.",
    "Une tout autre Enyo existe par ailleurs dans la mythologie grecque : l'une des trois Grées, filles de Phorcys et de Céto, nées déjà vieilles et ne partageant à elles trois qu'un seul œil et une seule dent, qu'elles se passent à tour de rôle — une créature marine archaïque sans aucun rapport avec la guerre, que seul le nom partagé relie à la compagne d'Arès.",
  ],
  "hespérides": [
    "Selon Hésiode, la source la plus ancienne à leur sujet, les Hespérides sont filles de Nyx, la Nuit, seule (voir la fiche « Nyx ») — « qui ne s'unit à personne » —, nées sans père comme plusieurs des figures les plus anciennes et les plus sombres de sa Théogonie. Une tradition plus tardive, aujourd'hui la plus répandue, en fait plutôt les filles du Titan Atlas (voir la fiche « Atlas ») : un lien qui doit sans doute davantage à la géographie qu'à un mythe précis, puisque leur jardin se situe justement aux confins occidentaux du monde, près des montagnes qui portent son nom.",
    "Aux côtés du dragon Ladon, né de Typhon et d'Échidna, elles gardent un pommier d'or planté au bout du monde connu — un cadeau de noces que Gaïa avait offert à Héra le jour de son mariage avec Zeus. Leur nombre même reste incertain selon les auteurs, tantôt trois, tantôt quatre, parfois sept, et leurs noms varient tout autant : Aiglé, Érythie et Hespéréthuse comptent parmi les plus souvent cités.",
    "C'est ce jardin qu'Héraclès dut atteindre pour son onzième travail (voir la fiche « Héraclès ») : plutôt que d'affronter lui-même le dragon, il chargea Atlas d'aller cueillir les pommes à sa place, le temps de porter le ciel sur ses propres épaules — un répit que le Titan tenta de prolonger indéfiniment, avant qu'Héraclès ne le pousse par ruse à reprendre son fardeau.",
    "Une lecture évhémériste bien plus tardive, rapportée par l'historien grec Diodore de Sicile, rationalise entièrement ce mythe : les « pommes d'or », dit-il, désignaient en réalité des moutons — le mot grec mêlon signifiant à la fois « pomme » et « brebis » —, et le jardin merveilleux n'était autre qu'un domaine bien réel, appartenant à un roi libyen historique, que le onzième travail d'Héraclès se serait borné à visiter sans le moindre prodige. Une explication qui, en dépouillant le mythe de tout son merveilleux, n'a jamais réellement supplanté le récit qu'elle prétendait éclaircir.",
    "Réputées pour la douceur de leur chant, au point que certains poètes les surnomment les « chanteuses », les Hespérides restent des figures discrètes : aucun mythe ne leur attribue de destin propre en dehors de cette garde silencieuse, à l'écart de l'Olympe, aux confins d'un monde dont même les auteurs anciens ne savaient plus très bien situer le bord.",
  ],
  "cécrops": [
    "Né de la terre attique elle-même plutôt que d'un père et d'une mère, Cécrops fut le tout premier roi d'Athènes — mi-homme, mi-serpent à partir de la taille, comme il convient à un être surgi directement du sol qu'il allait gouverner. On lui attribue aussi, dans une tradition plus tardive, d'avoir institué le mariage monogame et le culte des morts, à une époque où les hommes vivaient encore, dit-on, sans connaître leur propre père.",
    "C'est sous son règne qu'Athéna et Poséidon se disputèrent le patronage de la cité naissante : Poséidon frappa le rocher de l'Acropole de son trident et en fit jaillir une source, mais son eau se révéla salée, impropre à toute vie ; Athéna, elle, planta un olivier, source de nourriture, d'huile et de bois. Cécrops, témoin du duel, atteste que l'olivier d'Athéna avait poussé le premier — un jugement qui fit pencher la balance en sa faveur, et donna son nom à la ville tout entière : Athènes.",
    "De son épouse Aglauros l'aînée (une nymphe portant le même nom que la première de ses trois filles), Cécrops eut Aglauros (voir la fiche « Aglauros »), Hersé (voir la fiche « Hersé ») et Pandrosos (voir la fiche « Pandrosos ») — les trois sœurs à qui Athéna confia plus tard le coffre contenant le jeune Érichthonios, en leur interdisant formellement de l'ouvrir (voir la fiche « Érichthonios »). C'est ce même Érichthonios qui recueillera un jour sa couronne, poursuivant sur le trône d'Athènes la lignée que Cécrops, sorti de la terre, avait la première fait régner sur elle.",
  ],
  "hersé": [
    "Fille du roi Cécrops d'Athènes (voir la fiche « Cécrops »), Hersé est l'une des trois sœurs — avec Aglauros et Pandrosos (voir les fiches « Aglauros » et « Pandrosos ») — à qui Athéna confia le coffre contenant le jeune Érichthonios, en leur interdisant de l'ouvrir (voir la fiche « Érichthonios »). Avec Aglauros, elle céda à la curiosité et l'ouvrit malgré l'interdit — seule Pandrosos s'y refusa —, mais elle survécut à la frayeur sans être elle-même inquiétée : c'est sa sœur seule qui, plus tard et pour une tout autre raison, paiera le prix fort.",
    "Lors de la procession des Panathénées, où les jeunes filles d'Athènes portaient en cortège les offrandes destinées à Athéna, Hersé se distingua par sa beauté au point qu'Hermès, la voyant passer, s'en éprit aussitôt (voir la fiche « Hermès »). Il entra dans la maison pour la rejoindre, mais trouva la porte de sa chambre gardée par Aglauros (voir la fiche « Aglauros »), qui exigea de l'or en échange de son aide.",
    "Athéna, qui n'avait pas oublié la désobéissance d'Aglauros au sujet du coffre, envoya l'Envie s'insinuer dans son cœur déjà rongé de jalousie envers le bonheur de sa propre sœur — dès lors, aucune somme ne put plus la faire céder : elle refusa de bouger du seuil qu'elle occupait déjà. Hermès, qu'aucun obstacle mortel n'arrête, la changea sur place en statue de pierre — assise, telle qu'elle avait voulu barrer le passage, pour l'éternité.",
    "De l'union d'Hermès et d'Hersé serait né un fils du nom de Céphale — à ne pas confondre avec l'autre Céphale, plus connu, fils de Déion et époux de Procris, lui aussi aimé de l'Aurore : la tradition antique elle-même semble avoir mêlé les deux figures sans jamais vraiment les démêler.",
  ],
  "aglauros": [
    "Fille du roi Cécrops d'Athènes et de la nymphe Aglauros, sa propre mère qui portait déjà ce nom (voir la fiche « Cécrops »), Aglauros grandit aux côtés de ses deux sœurs, Hersé et Pandrosos (voir les fiches « Hersé » et « Pandrosos »).",
    "Avec Hersé, elle céda à la curiosité et ouvrit le coffre qu'Athéna leur avait confié à toutes trois, découvrant l'enfant Érichthonios enlacé par un serpent — une désobéissance que la déesse n'oublia jamais (voir la fiche « Érichthonios »).",
    "D'une liaison avec Arès (voir la fiche « Arès »), elle eut une fille, Alcippé, dont l'agression par Halirrhothios, fils de Poséidon, provoqua le tout premier procès jugé entre dieux sur la colline qui prit depuis le nom d'Aréopage (voir la fiche « Alcippé »).",
    "Des années plus tard, lorsque Hermès (voir la fiche « Hermès ») s'éprit de sa sœur Hersé et vint la rejoindre, Aglauros lui barra d'abord le passage en exigeant de l'or en échange de son aide. Athéna, qui n'avait pas oublié le coffre ouvert, envoya alors l'Envie s'insinuer dans son cœur déjà rongé de jalousie envers le bonheur de sa sœur — dès lors, aucune somme ne put plus la faire céder : elle refusa de bouger du seuil qu'elle occupait. Hermès la changea sur place en statue de pierre — assise, telle qu'elle avait voulu barrer le passage, pour l'éternité (voir la fiche « Hersé »).",
  ],
  "pandrosos": [
    "Fille du roi Cécrops d'Athènes (voir la fiche « Cécrops »), Pandrosos est celle des trois sœurs — avec Aglauros et Hersé (voir les fiches « Aglauros » et « Hersé ») — à qui Athéna confia le coffre contenant le jeune Érichthonios, en leur interdisant formellement de l'ouvrir (voir la fiche « Érichthonios »).",
    "Seule des trois à respecter cet interdit jusqu'au bout quand ses sœurs cédèrent à la curiosité, Pandrosos échappa à toute conséquence — un culte lui fut même rendu à Athènes, sur l'Acropole même, dans un sanctuaire attenant à celui d'Athéna, le Pandroséion, en récompense de cette fidélité restée sans faille.",
  ],
  "électre": [
    "Fille d'Agamemnon et de Clytemnestre (voir les fiches « Agamemnon » et « Clytemnestre »), Électre vit son père assassiné à son retour de Troie et sauva de justesse son jeune frère Oreste (voir la fiche « Oreste »), qu'elle fit fuir avant que leur mère et son amant Égisthe (voir la fiche « Égisthe ») ne puissent s'en prendre à lui aussi.",
    "Des années durant, elle survécut dans sa propre maison réduite au rang de servante, humiliée par Clytemnestre et Égisthe, sans jamais renoncer à l'espoir du retour de son frère pour venger leur père.",
    "Lorsque Oreste revint enfin, déguisé pour ne pas être reconnu, c'est elle qui l'identifia la première et l'encouragea à accomplir la vengeance qu'elle n'avait jamais cessé d'attendre — un matricide qu'elle approuva sans réserve, contrairement à sa sœur Chrysothémis (voir la fiche « Chrysothémis »), bien plus prudente qu'elle.",
    "Après le meurtre de leur mère, elle épousa Pylade, le fidèle compagnon qui avait accompagné Oreste dans toute son épreuve — une fin plus apaisée que celle qu'imagine un temps Euripide, qui la montre menacée de mort aux côtés de son frère avant qu'Apollon n'intervienne pour les sauver tous deux.",
  ],
  "chrysothémis": [
    "Fille d'Agamemnon et de Clytemnestre (voir les fiches « Agamemnon » et « Clytemnestre »), Chrysothémis resta dans l'ombre de sa sœur Électre (voir la fiche « Électre »), dont l'existence entière se résume, chez Sophocle, à ce contraste entre les deux caractères.",
    "Plus soumise que sa sœur, elle refusa de se joindre au projet de vengeance contre leur mère Clytemnestre et son amant Égisthe (voir la fiche « Égisthe »), jugeant la prudence préférable à un matricide qui lui semblait voué à l'échec — un choix qu'Électre lui reprocha amèrement comme une lâcheté.",
    "Sophocle ne raconte jamais ce qu'il advint d'elle après le meurtre : contrairement à sa sœur, dont le destin se referme sur un mariage avec Pylade, Chrysothémis disparaît simplement du récit, aussi discrète dans sa sortie qu'elle l'aura été tout au long de la pièce.",
  ],
  "arachné": [
    "Tisserande lydienne d'un talent extraordinaire, Arachné se vantait de surpasser Athéna elle-même dans l'art du tissage (voir la fiche « Athéna ») — une prétention que la déesse, déguisée en vieille femme, vint d'abord tenter de tempérer en vain.",
    "Les deux rivales tissèrent alors chacune une tapisserie : Athéna y représenta les dieux de l'Olympe dans toute leur majesté, tandis qu'Arachné choisit d'y montrer leurs frasques amoureuses les moins glorieuses — Zeus changé en taureau, en cygne, en pluie d'or pour tromper ses conquêtes. Le travail d'Arachné, techniquement irréprochable, ne laissa à la déesse furieuse d'autre reproche à formuler que son sujet.",
    "Athéna déchira la tapisserie et frappa Arachné, qui, de honte, tenta de se pendre. La déesse la sauva de la mort mais la changea en araignée, la condamnant, elle et sa descendance, à tisser sans fin — un châtiment qui perpétue malgré tout, à sa manière, le talent qu'elle refusait de renier.",
  ],
  "leucothoé": [
    "Princesse d'Orient, fille du roi Orchamos, Leucothoé fut aimée d'Hélios (voir la fiche « Hélios »), qui prit l'apparence de sa propre mère pour s'introduire auprès d'elle avant de se révéler dans toute sa splendeur divine.",
    "Clytie (voir la fiche « Clytie »), nymphe éprise du même dieu et jalouse d'avoir été délaissée pour sa rivale, révéla la liaison au père de Leucothoé. Furieux, Orchamos fit enterrer vivante sa propre fille, sans que le dieu, accouru trop tard, ne puisse la sauver.",
    "Hélios changea le corps enseveli en un arbuste à encens, dont le parfum continue de s'élever de la terre — le seul hommage qu'il put encore rendre à son amante, une fois rendue à la terre qui l'avait recueillie.",
  ],
  "clytie": [
    "Nymphe éprise d'Hélios (voir la fiche « Hélios »), Clytie fut un temps payée de retour, jusqu'à ce que le dieu lui préfère la princesse Leucothoé (voir la fiche « Leucothoé »).",
    "Rongée de jalousie, elle révéla la liaison au père de sa rivale, provoquant sa mort — un geste qui ne lui rendit pourtant jamais l'amour d'Hélios, désormais détourné d'elle pour de bon.",
    "Restée assise nue sur la terre nue neuf jours durant, sans boire ni manger, à suivre des yeux la course du dieu à travers le ciel, elle finit par s'enraciner sur place et se changer en une fleur qui tourne encore aujourd'hui son visage vers le soleil tout au long du jour.",
  ],
  "danaé": [
    "Fille du roi Acrisios d'Argos, Danaé fut enfermée par son père dans une chambre de bronze après qu'un oracle lui eut prédit la mort de sa propre main par un futur petit-fils — une précaution que Zeus déjoua sans effort en s'unissant à elle sous la forme d'une pluie d'or.",
    "De cette union naquit Persée (voir la fiche « Persée »). Acrisios, découvrant l'enfant, jeta mère et fils à la mer dans un coffre de bois, que les flots portèrent jusqu'à l'île de Sériphos, où un pêcheur nommé Dictys les recueillit et les éleva.",
    "Le frère de Dictys, le roi Polydectès, épris de Danaé et désireux de se débarrasser de son fils devenu gênant, envoya Persée chercher la tête de la Gorgone Méduse (voir la fiche « Méduse ») — une mission pensée comme un aller sans retour. De retour victorieux, Persée pétrifia Polydectès et toute sa cour d'un dernier regard de la Gorgone, libérant enfin sa mère de cette emprise.",
  ],
  "adonis": [
    "Né d'un arbre à myrrhe, fruit de la faute funeste de sa mère Myrrha envers son propre père (voir la fiche « Myrrha »), Adonis fut un enfant d'une beauté si extraordinaire qu'Aphrodite elle-même, blessée par une flèche d'Éros en le voyant, en tomba éperdument amoureuse (voir la fiche « Aphrodite »).",
    "Confié en secret à Perséphone pour être élevé loin de tous (voir la fiche « Perséphone »), il grandit si beau que les deux déesses se le disputèrent, jusqu'à ce que Zeus tranche : Adonis partagerait son temps entre l'une et l'autre, choisissant de lui-même de passer le plus clair de ses jours auprès d'Aphrodite.",
    "Passionné de chasse malgré les mises en garde d'Aphrodite, effrayée à l'idée de le perdre, il fut mortellement blessé par un sanglier — envoyé, selon certains récits, par la jalousie d'Arès ou d'Artémis. Accourue trop tard, Aphrodite se blessa elle-même à une épine en se précipitant vers lui ; là où leurs sangs mêlés touchèrent la terre, des anémones rouges jaillirent aussitôt.",
    "Sa mort ne le sépare pas non plus tout à fait de Perséphone : les Enfers et l'Olympe se partagent depuis, dit-on, ce même jeune homme que se disputaient déjà deux déesses de son vivant — un cycle qui n'est pas sans rappeler celui de Perséphone elle-même, entre sa mère et son époux.",
  ],
  "myrrha": [
    "Princesse de Chypre, fille du roi Cinyras, Myrrha fut frappée d'un désir incestueux irrépressible pour son propre père — punition, selon les versions, d'Aphrodite elle-même, offensée que la mère de Myrrha ait osé comparer la beauté de sa fille à la sienne.",
    "Aidée par sa nourrice, elle s'unit à son père dans l'obscurité, sans qu'il reconnaisse sa propre fille, plusieurs nuits durant — jusqu'à ce que Cinyras, voulant enfin voir le visage de son amante, découvre la vérité et se lance à sa poursuite, une épée à la main.",
    "Fuyant sa colère et celle des dieux, Myrrha erra des mois durant avant d'implorer, épuisée, d'être changée en une forme qui ne soit ni tout à fait vivante ni tout à fait morte. Les dieux l'exaucèrent en la changeant en arbre à myrrhe, dont l'écorce continue de pleurer la résine odorante qui porte son nom.",
    "Dix mois plus tard, l'écorce de l'arbre se fendit et en sortit un enfant déjà formé, Adonis (voir la fiche « Adonis ») — né de la faute de sa mère, mais si beau qu'il devait bientôt faire tourner la tête d'une déesse à son tour.",
  ],
  "œagre": [
    "Roi légendaire de Thrace, Œagre est présenté par la tradition la plus répandue comme le père d'Orphée (voir la fiche « Orphée »), né de son union avec la Muse Calliope (voir la fiche « Calliope ») — une paternité que d'autres récits attribuent plutôt à Apollon lui-même, jugeant plus digne d'un musicien aussi exceptionnel de descendre directement d'un dieu.",
    "Simple mortel dans une lignée par ailleurs traversée de figures divines, Œagre reste une silhouette discrète de la mythologie thrace — moins un personnage aux exploits propres qu'un nom nécessaire pour ancrer la généalogie de son fils dans le monde des hommes autant que dans celui des dieux.",
  ],
  "crotos": [
    "Fils du dieu Pan et d'Euphémé, nourrice des Muses (voir la fiche « Pan »), Crotos grandit sur le mont Hélicon aux côtés des Muses elles-mêmes, qu'allaitait sa propre mère, partageant leur goût pour la musique et la poésie sans jamais en être un lui-même (voir la fiche « Muses »).",
    "Chasseur passionné vivant dans les montagnes parmi les satyres, il inventa, dit-on, l'art de l'applaudissement et des acclamations rythmées pour saluer les Muses après leurs concerts — un tel enthousiasme qu'elles obtinrent de Zeus qu'il soit changé en constellation en récompense.",
    "Il devint ainsi le Sagittaire, l'archer que l'on voit encore aujourd'hui dans le ciel nocturne, parfois figuré mi-homme mi-cheval en écho à sa vie sauvage parmi les bêtes des montagnes — sans qu'aucun lien antique ne le rattache pour autant au centaure Chiron (voir la fiche « Chiron »), malgré une ressemblance qui prête souvent à confusion.",
    "Selon cette même tradition tardive, la flèche que porte encore l'archer serait celle-là même qu'Apollon offrit un jour au prêtre hyperboréen Abaris (voir la fiche « Abaris »), capable de voyager à travers les airs à son bord — remontée au ciel avec Crotos une fois le voyage d'Abaris achevé.",
  ],
  "deucalion": [
    "Fils du Titan Prométhée (voir la fiche « Prométhée »), Deucalion régnait sur Phthie lorsque Zeus, excédé par la cruauté et l'impiété grandissante des hommes, décida de noyer l'humanité entière sous un déluge universel.",
    "Prévenu par son père, Deucalion construisit un coffre de bois où il s'enferma avec son épouse Pyrrha (voir la fiche « Pyrrha »), fille d'Épiméthée et de Pandore — les deux seuls survivants d'une humanité tout entière engloutie neuf jours et neuf nuits durant.",
    "Le coffre s'échoua enfin sur le mont Parnasse, où le couple, désireux de repeupler la terre, consulta l'oracle de Thémis (voir la fiche « Thémis »). Celui-ci leur ordonna de jeter derrière eux les os de leur mère : comprenant qu'il s'agissait des pierres de la Terre elle-même, ils obéirent, et des pierres jetées par Deucalion naquirent des hommes, tandis que celles jetées par Pyrrha donnèrent naissance à des femmes.",
    "De cette seconde humanité naquit Hellen, dont le nom donna naissance au mot même de Hellènes — les Grecs se pensant depuis, par cette généalogie, tous descendants d'un couple ayant survécu à la destruction complète du monde.",
  ],
  "pyrrha": [
    "Fille d'Épiméthée et de Pandore, la première femme façonnée par les dieux, Pyrrha épousa son cousin Deucalion (voir la fiche « Deucalion »), fils du Titan Prométhée (voir la fiche « Prométhée »).",
    "Lorsque Zeus déchaîna un déluge universel pour engloutir une humanité devenue impie, le couple survécut seul, enfermé dans un coffre de bois construit sur les conseils de Prométhée, jusqu'à s'échouer sur le mont Parnasse.",
    "Consultant l'oracle de Thémis (voir la fiche « Thémis ») pour savoir comment repeupler la terre, ils comprirent que « les os de leur mère » désignaient les pierres de la Terre elle-même : celles que jeta Pyrrha par-dessus son épaule devinrent des femmes, tandis que celles jetées par Deucalion donnèrent naissance à des hommes — une seconde humanité entièrement née de la pierre plutôt que de la chair.",
  ],
  "pléiades": [
    "Sept nymphes filles du Titan Atlas (voir la fiche « Atlas ») et de l'Océanide Pléioné, les Pléiades — Maïa, Électre, Taygète, Alcyone, Céléno, Stérope et Mérope — furent poursuivies sans relâche par le chasseur Orion (voir la fiche « Orion »), épris de leur beauté à toutes.",
    "Pour les soustraire à cette poursuite qui durait depuis des années, Zeus les changea d'abord en colombes, puis en étoiles, formant au ciel l'amas qui porte encore leur nom — Orion continue, dit-on, de les poursuivre nuit après nuit dans le ciel, sans jamais parvenir à les rattraper.",
    "Une seule d'entre elles, Mérope, brille aujourd'hui plus faiblement que ses sœurs : honteuse d'avoir aimé un simple mortel, Sisyphe, quand toutes les autres s'étaient unies à des dieux, elle se voile le visage de chagrin depuis qu'elle a rejoint le ciel.",
    "Maïa, l'aînée des sept, resta la plus célèbre : aimée de Zeus dans une grotte du mont Cyllène, elle devint la mère d'Hermès (voir la fiche « Hermès »).",
  ],
  "hyas": [
    "Frère des Hyades — nymphes que la tradition la plus répandue dit filles d'Atlas (voir la fiche « Atlas ») et sœurs des Pléiades (voir la fiche « Pléiades ») —, Hyas fut un chasseur habile, tué en pleine chasse par un lion ou un sanglier selon les versions.",
    "Ses sœurs, inconsolables, le pleurèrent sans fin jusqu'à en mourir elles-mêmes de chagrin — les dieux, touchés par une telle fidélité, les changèrent en étoiles, formant l'amas des Hyades, dont le lever, dans l'Antiquité, annonçait traditionnellement la saison des pluies.",
    "Leur nom même, associé au mot grec désignant la pluie, hyein, a longtemps fait croire à un lien direct avec ce phénomène — une étymologie aujourd'hui contestée, certains la faisant plutôt dériver du mot pour « pourceau », hys, en référence à la forme du groupe d'étoiles.",
  ],
  "grées": [
    "Trois sœurs nées vieilles dès leur naissance — Enyo, homonyme sans lien de parenté avec la déesse de la guerre du même nom (voir la fiche « Enyo »), Péphrédo et Dino —, les Grées, filles de Phorcys et de Céto, ne partagent à elles trois qu'un seul œil et une seule dent, qu'elles se passent tour à tour pour voir et mâcher.",
    "Sœurs des trois Gorgones (voir la fiche « Gorgones »), dont Méduse (voir la fiche « Méduse »), elles seules connaissaient le chemin vers le repaire des Nymphes détentrices des armes nécessaires pour la vaincre. Persée (voir la fiche « Persée »), envoyé chercher la tête de la Gorgone, leur déroba cet œil unique au moment de l'échange et refusa de le leur rendre tant qu'elles ne lui auraient pas révélé ce qui lui fallait savoir pour tuer leur propre sœur.",
    "Prises au piège de leur propre infirmité partagée, les Grées n'eurent d'autre choix que de céder — indiquant à Persée la route à suivre, malgré elles complices du sort funeste réservé à Méduse.",
  ],
  "méduse": [
    "Seule mortelle des trois Gorgones (voir la fiche « Gorgones »), Méduse fut autrefois, dit-on, une jeune femme d'une beauté remarquable, réputée surtout pour sa chevelure — jusqu'à ce que Poséidon (voir la fiche « Poséidon ») s'unisse à elle de force dans le temple même d'Athéna.",
    "Furieuse de voir son sanctuaire profané, Athéna (voir la fiche « Athéna ») punit non l'agresseur mais la victime : elle changea la chevelure de Méduse en un nid de serpents et son regard en une arme pétrifiante, condamnant quiconque la fixerait dans les yeux à se figer instantanément en pierre.",
    "Persée (voir la fiche « Persée »), envoyé par le roi Polydectès chercher sa tête, ne put la vaincre qu'en évitant soigneusement son regard direct, guidé par le seul reflet de son bouclier poli offert par Athéna. Du sang jailli de sa blessure naquirent d'un coup Pégase et le géant Chrysaor, tous deux déjà conçus en elle par Poséidon avant sa mise à mort.",
    "Sa tête, remise à Athéna qui la fixa pour toujours sur son égide, continua de pétrifier quiconque la regardait même après sa mort — un pouvoir qu'elle n'a jamais tout à fait perdu, malgré la fin qu'on lui connaît.",
  ],
  "gorgones": [
    "Trois sœurs monstrueuses, filles de Phorcys et de Céto comme leurs propres sœurs les Grées (voir la fiche « Grées ») — Sthéno, Euryale et Méduse (voir la fiche « Méduse ») —, les Gorgones partagent un même pouvoir : quiconque croise leur regard se change instantanément en pierre.",
    "Seule Méduse, parmi les trois, était mortelle — un détail qui scella son destin plus que celui de ses sœurs, puisque seule elle put être décapitée par Persée (voir la fiche « Persée »), tandis que Sthéno et Euryale, immortelles, se lancèrent en vain à sa poursuite pour venger leur cadette.",
    "Leur visage — une bouche large aux crocs de sanglier, une langue tirée, une chevelure de serpents — devint dans l'art grec un motif protecteur à part entière, l'apotropaïon par excellence : sculpté sur les boucliers, les frontons de temples ou les mosaïques de seuil, il servait à détourner le mauvais œil plutôt qu'à effrayer sans raison.",
  ],
  "ganymède": [
    "Prince troyen d'une beauté sans pareille parmi les mortels, Ganymède gardait les troupeaux de son père sur le mont Ida lorsque Zeus (voir la fiche « Zeus »), frappé par sa grâce, se changea en aigle — ou envoya son propre aigle, selon les versions — pour l'enlever et l'emporter jusqu'à l'Olympe.",
    "Devenu immortel, il y remplaça Hébé (voir la fiche « Hébé ») comme échanson des dieux, chargé de verser le nectar lors de leurs banquets — un honneur si rare qu'aucun autre mortel ne l'obtint jamais de cette manière.",
    "Pour consoler son père de cet enlèvement, Zeus lui offrit en dédommagement des chevaux divins d'une rapidité extraordinaire, capables de courir sur l'eau comme sur la terre ferme — un échange que la tradition grecque présente sans détour comme un juste prix, plutôt qu'une réparation suffisante pour un fils perdu.",
    "Les Grecs placèrent plus tard Ganymède parmi les étoiles sous la forme du Verseau, versant l'eau céleste depuis son urne — une dernière image qui prolonge, dans le ciel, le geste même qu'il accomplissait déjà sur l'Olympe.",
  ],
  "myrina": [
    "Reine légendaire des Amazones libyennes — un peuple guerrier distinct des Amazones du Pont-Euxin plus connues (voir la fiche « Amazones »), également gouvernées par des reines mais situées sur un tout autre rivage —, Myrina mena ses guerrières à la conquête de plusieurs peuples d'Afrique du Nord, selon le récit qu'en donne l'historien grec Diodore de Sicile.",
    "Elle vainquit notamment les Gorgones, un peuple libyen guerrier dont le nom, selon Diodore lui-même, n'a rien à voir avec les Gorgones monstrueuses de la légende de Persée (voir la fiche « Gorgones ») — une simple homonymie que les auteurs anciens prenaient déjà soin de ne pas confondre.",
    "Elle poursuivit ensuite sa conquête jusqu'en Égypte, puis en Syrie et en Asie Mineure, fondant sur son passage plusieurs cités qui portèrent longtemps son nom, avant de trouver la mort au combat contre une coalition de Thraces et de Scythes.",
    "Son nom reste attaché, aux côtés d'Otrera, d'Hippolyté et d'Antiope (voir les fiches « Otrera », « Hippolyté » et « Antiope »), à la longue liste des reines qui firent des Amazones l'un des peuples les plus redoutés de la mythologie grecque.",
  ],
  "penthésilée": [
    "Fille d'Arès (voir la fiche « Arès ») — la seule des reines amazones à porter ce titre dans les textes anciens (voir la fiche « Amazones ») —, Penthésilée mena ses guerrières au secours de Troie une fois Hector tombé sous les coups d'Achille (voir la fiche « Achille »), espérant redonner du souffle à une cité déjà proche de l'épuisement.",
    "Elle sema un temps la terreur parmi les Grecs, abattant plusieurs héros avant qu'Achille lui-même ne vienne l'affronter en un duel resté célèbre. Il la transperça de sa lance — mais en retirant son casque pour contempler le visage de son adversaire vaincue, il fut saisi d'un amour aussi soudain que tardif, et pleura sur elle devant l'armée entière.",
    "Thersite, le plus laid et le plus insolent des soldats grecs, railla ce chagrin qu'il jugeait indigne d'un guerrier — Achille, furieux, le tua d'un seul coup de poing, incapable de supporter qu'on souille ainsi le respect qu'il portait désormais à celle qu'il venait de vaincre.",
  ],
  "amazones": [
    "Peuple légendaire de femmes guerrières, les Amazones ne tolèrent aucun homme en leur sein : selon la tradition la plus répandue, elles ne se rapprochent des hommes des peuples voisins qu'une fois par an, pour assurer leur descendance, et n'élèvent que leurs filles, renvoyant leurs fils à leurs pères ou les tuant selon les versions les plus sombres.",
    "Leur société se transmet de reine en reine plutôt que de génération en génération dans une même famille : Otrera (voir la fiche « Otrera »), première d'entre elles et épouse mortelle d'Arès, fonda leur nation ; lui succédèrent, parmi d'autres, Hippolyté (voir la fiche « Hippolyté »), dont Héraclès obtint la ceinture, Antiope (voir la fiche « Antiope »), enlevée par Thésée, Penthésilée (voir la fiche « Penthésilée »), tuée par Achille devant Troie, et Myrina (voir la fiche « Myrina »), conquérante jusqu'en Égypte selon Diodore de Sicile.",
    "Leur nom même reste débattu depuis l'Antiquité : les Grecs le rattachaient à a-mazos, « sans sein », prétendant qu'elles se brûlaient ou s'ôtaient le sein droit pour mieux tirer à l'arc — une étymologie populaire qu'aucune représentation antique ne confirme jamais, puisque l'art grec les figure toujours avec leurs deux seins intacts.",
    "Guerrières redoutées autant que fascinantes pour l'imaginaire grec, elles incarnent un monde inversé où ce sont les femmes qui commandent, chassent et combattent — un miroir renversé de l'ordre social grec, convoqué chaque fois qu'un héros devait prouver sa valeur face à un adversaire à sa mesure.",
  ],
  "néréides": [
    "Cinquante nymphes marines, filles de Nérée et de l'Océanide Doris (voir la fiche « Nérée »), les Néréides personnifient la mer dans ce qu'elle a de plus bienveillant — contrairement aux monstres marins ou aux tempêtes que d'autres figures incarnent.",
    "Deux d'entre elles connurent un destin bien au-delà des autres : Amphitrite (voir la fiche « Amphitrite »), devenue reine des mers en épousant Poséidon, et Thétis (voir la fiche « Thétis »), mère d'Achille, que Zeus et Poséidon eux-mêmes durent renoncer à épouser par crainte d'une prophétie.",
    "On les représente traditionnellement au milieu des vagues, chevauchant des dauphins ou des hippocampes, leur corps de femme se prolongeant souvent, dans l'art le plus tardif, par une queue de poisson — une image que la tradition la plus ancienne ne leur réserve pourtant pas exclusivement, la représentation purement humaine restant tout aussi fréquente chez les Grecs archaïques et classiques.",
  ],
  "harpyes": [
    "Sœurs d'Iris (voir la fiche « Iris »), filles comme elle du Titan Thaumas et de l'Océanide Électre, les Harpyes sont des esprits ailés au visage de femme et au corps d'oiseau de proie, réputées pour la puanteur et la voracité qu'elles laissent sur leur passage.",
    "Envoyées par Zeus punir le devin Phinée, qui avait abusé de son don de prophétie, elles fondaient sur chacun de ses repas pour le dévorer ou le souiller avant qu'il ait pu y toucher, le condamnant à une faim perpétuelle malgré des tables sans cesse dressées.",
    "Les Argonautes de passage, exaspérés par ses tourments, chargèrent les fils ailés de Borée, Zétès et Calaïs (voir la fiche « Borée »), de les chasser. Sur le point de les tuer, les deux frères durent y renoncer sur l'ordre d'Iris elle-même, venue en personne épargner ses propres sœurs et leur faire promettre de ne plus jamais tourmenter Phinée.",
    "Leur nom reste depuis attaché à toute prise brutale et rapace — les « harpies » du langage courant leur doivent directement leur réputation.",
  ],
  "io": [
    "Prêtresse d'Héra à Argos, Io fut aimée de Zeus, qui la changea lui-même en génisse d'une blancheur éclatante pour dissimuler leur liaison à son épouse — ou, selon une autre version, ce fut Héra elle-même qui la surprit et la transforma. Peu dupe malgré tout, la déesse réclama l'animal en cadeau et le fit surveiller jour et nuit par le géant Argos Panoptès, « celui qui voit tout », dont les cent yeux ne se fermaient jamais tous à la fois.",
    "Zeus envoya Hermès délivrer sa bien-aimée : déguisé en berger, le dieu endormit Argos au son de sa flûte avant de le tuer d'un coup de serpe. Héra, en deuil de son fidèle gardien, recueillit ses cent yeux pour en parer la queue de son oiseau favori, le paon (voir la fiche « Paon »).",
    "Loin d'être libérée pour autant, Io fut alors pourchassée par un taon envoyé par Héra, dont la piqûre incessante la fit errer, toujours sous forme de génisse, à travers la Grèce et l'Asie tout entières — un détroit qu'elle traversa à la nage lui laissa le nom de Bosphore, « le passage de la vache », et la mer qu'elle longea plus au sud celui de mer Ionienne.",
    "Ce n'est qu'en atteignant l'Égypte, épuisée, qu'elle retrouva enfin forme humaine et mit au monde Épaphos, né du seul toucher de la main de Zeus — un fils dont la descendance, par Libye (voir la fiche « Libye »), donnera naissance aux deux plus grandes lignées royales de la mythologie grecque, celle d'Argos et celle de Thèbes. Une tradition locale plus tardive lui donne aussi une fille, Kéroessa, dont le fils Byzas donnera plus tard son nom à Byzance (voir la fiche « Byzas »).",
  ],
  "libye": [
    "Fille d'Épaphos — le fils qu'Io (voir la fiche « Io »), une jeune femme aimée de Zeus puis changée en génisse par la jalousie d'Héra, mit au monde après ses longues errances jusqu'en Égypte —, Libye donna son nom au continent tout entier qui porte encore le sien aujourd'hui.",
    "Unie au dieu-fleuve Nil, elle mit au monde des jumeaux, Bélos et Agénor : le premier régna sur l'Égypte et engendra à son tour Égyptos et Danaos (voir les fiches « Égyptos » et « Danaos »), tandis que le second partit fonder Tyr et Sidon, où naquirent plus tard Cadmos et Europe (voir les fiches « Cadmos » et « Europe »).",
    "Par cette double descendance, Libye se trouve à l'origine à la fois de la lignée royale d'Argos, promise aux Danaïdes et à Persée, et de celle de Thèbes, promise à Cadmos et à ses propres descendants — une même aïeule à l'origine de deux des plus grandes maisons de la mythologie grecque.",
  ],
  "égyptos": [
    "Roi jumeau de Danaos (voir la fiche « Danaos »), petit-fils de Libye (voir la fiche « Libye ») par leur père Bélos, Égyptos régna sur l'Égypte et engendra cinquante fils, tandis que son frère n'eut que cinquante filles, les Danaïdes (voir la fiche « Danaïdes »).",
    "Voulant réconcilier les deux branches rivales de la famille, il proposa à Danaos de marier ses cinquante fils à ses cinquante nièces — une offre que Danaos, averti par un oracle qu'un de ses futurs gendres le tuerait un jour, accepta en apparence tout en préparant en secret un tout autre sort à ses fils.",
    "La nuit même des noces, quarante-neuf des cinquante fils d'Égyptos furent poignardés par leurs jeunes épouses sur l'ordre de leur père — seul Lyncée (voir la fiche « Lyncée »), épargné par sa femme Hypermestre (voir la fiche « Hypermestre »), survécut à ce massacre nuptial.",
  ],
  "danaos": [
    "Roi jumeau d'Égyptos (voir la fiche « Égyptos »), Danaos régna sur la Libye avant de fuir vers Argos avec ses cinquante filles, les Danaïdes (voir la fiche « Danaïdes »), pour échapper au mariage forcé que leur imposaient leurs cinquante cousins.",
    "Rattrapé malgré tout par les fils d'Égyptos, il feignit d'accepter les noces mais arma chacune de ses filles d'un poignard, leur ordonnant de tuer leur époux la nuit même des noces — un massacre que toutes accomplirent sauf une, Hypermestre (voir la fiche « Hypermestre »), amoureuse de son propre mari Lyncée (voir la fiche « Lyncée »).",
    "Devenu roi d'Argos à la place du souverain local, Gélanor, qu'un jugement populaire lui préféra après qu'un loup eut attaqué un troupeau de bœufs sous les yeux de la cité — un présage que les Argiens interprétèrent comme annonçant la victoire de l'étranger sur l'autochtone —, Danaos fonda une dynastie qui allait, par Hypermestre et Lyncée, mener directement jusqu'à Persée (voir la fiche « Persée »).",
  ],
  "danaïdes": [
    "Les cinquante filles de Danaos (voir la fiche « Danaos »), forcées d'épouser leurs cinquante cousins, les fils d'Égyptos (voir la fiche « Égyptos »), reçurent chacune de leur père un poignard et l'ordre de tuer leur époux la nuit même des noces — un massacre que quarante-neuf d'entre elles accomplirent sans faillir.",
    "Seule Hypermestre (voir la fiche « Hypermestre ») épargna son mari Lyncée (voir la fiche « Lyncée »), par amour plutôt que par désobéissance calculée — un geste qui lui valut d'abord d'être jugée par son propre père, avant d'être acquittée et de fonder, avec lui, la lignée qui mènera jusqu'à Persée.",
    "Aux Enfers, les quarante-neuf autres furent condamnées à remplir sans fin un tonneau percé de partout, puisant une eau qui s'échappe toujours avant d'atteindre le bord — un châtiment resté depuis l'image même de l'effort perpétuellement recommencé et jamais achevé, le « tonneau des Danaïdes ».",
  ],
  "hypermestre": [
    "Seule des cinquante Danaïdes (voir la fiche « Danaïdes ») à épargner son époux la nuit de leurs noces, Hypermestre refusa d'obéir à l'ordre de son père Danaos (voir la fiche « Danaos ») par amour pour Lyncée (voir la fiche « Lyncée »), son propre cousin.",
    "Elle l'aida même à s'enfuir avant que la fureur de leurs sœurs ne puisse le rattraper, au prix d'être elle-même jugée pour désobéissance devant un tribunal argien — un procès dont elle sortit acquittée, Aphrodite elle-même étant, selon la légende, intervenue en sa faveur.",
    "De sa réconciliation avec Lyncée naquit une lignée royale qui traverse plusieurs générations avant d'aboutir, par Danaé, à la naissance de Persée (voir la fiche « Persée ») — la seule des cinquante sœurs dont la descendance survécut, précisément pour avoir refusé de tuer.",
  ],
  "lyncée": [
    "Fils d'Égyptos (voir la fiche « Égyptos ») et l'un des cinquante prétendants mariés de force aux Danaïdes (voir la fiche « Danaïdes »), Lyncée fut le seul à échapper au massacre organisé par son beau-père Danaos (voir la fiche « Danaos ») la nuit de ses propres noces.",
    "Son épouse Hypermestre (voir la fiche « Hypermestre »), amoureuse de lui plutôt que soumise à l'ordre paternel, le laissa fuir avant de l'aider à revenir plus tard reprendre le trône d'Argos, une fois Danaos disparu.",
    "De leur réconciliation naquit Abas, puis, quelques générations plus tard, Acrisios et Danaé (voir la fiche « Danaé »), dont le fils Persée (voir la fiche « Persée ») referme ainsi la boucle : le seul couple épargné parmi les Danaïdes se révèle, au bout du compte, l'ancêtre du plus grand tueur de monstres de la mythologie grecque.",
  ],
  "byzas": [
    "Fils de Poséidon (voir la fiche « Poséidon ») et de la nymphe Kéroessa — elle-même fille d'Io (voir la fiche « Io ») et de Zeus, née près d'une corne d'or à l'embouchure d'une baie qui prit depuis le nom de Corne d'Or —, Byzas grandit sur les rives du Bosphore avant de consulter l'oracle du temple de Delphes (voir la fiche « Temple ») pour savoir où fonder sa propre cité.",
    "L'oracle lui ordonna de bâtir « en face du pays des aveugles » : arrivé sur la rive européenne du détroit, il comprit l'énigme en découvrant une colonie déjà installée sur la rive asiatique, à Chalcédoine — ses habitants avaient été « aveugles » de ne pas voir la supériorité évidente du site d'en face, mieux protégé et bien plus fertile.",
    "Il fonda là, au confluent de deux mers, la cité de Byzance, qui portera son nom durant des siècles avant de devenir, sous l'empereur Constantin, Constantinople, puis Istanbul — trois noms pour une seule ville, unique à cheval sur deux continents.",
  ],
  "phidaléia": [
    "Figure féminine associée par une tradition tardive et peu développée à une occupation antérieure du site où Byzas (voir la fiche « Byzas ») fondera plus tard Byzance — les sources byzantines qui la mentionnent restent rares et bien postérieures à l'époque classique.",
    "Certains chroniqueurs byzantins la rattachent aux légendes plus anciennes qui font des Amazones (voir la fiche « Amazones ») les toutes premières occupantes de la région, avant l'arrivée des colons grecs venus de Mégare — une hypothèse parmi d'autres, à prendre avec la prudence qu'imposent des sources aussi tardives et lacunaires.",
  ],
  "admète": [
    "Roi de Phères en Thessalie, Admète fut aimé d'Apollon (voir la fiche « Apollon »), condamné à le servir un an comme simple berger mortel en punition d'avoir tué les Cyclopes — une corvée que l'affection sincère du dieu transforma en année particulièrement heureuse pour ses troupeaux, toujours féconds tant qu'Apollon veillait sur eux.",
    "En retour de cette amitié, Apollon obtint des Parques la faveur exceptionnelle de prolonger la vie d'Admète au-delà du jour fixé par le destin, à condition qu'un proche accepte de mourir à sa place le moment venu — une clause qu'aucun de ses vieux parents n'accepta, mais que sa propre épouse Alceste (voir la fiche « Alceste ») assuma sans hésiter.",
    "Lorsque le jour funeste arriva, Héraclès (voir la fiche « Héraclès »), de passage chez lui et ignorant tout du deuil qui venait de le frapper, insista pour être reçu en hôte malgré tout — une hospitalité maintenue en plein malheur qui devait rester célèbre. Mais c'est Perséphone (voir la fiche « Perséphone »), touchée aux Enfers par l'acte d'amour d'Alceste (voir la fiche « Alceste »), qui la renvoya elle-même auprès des vivants, la rendant à son époux.",
  ],
  "alceste": [
    "Fille du roi Pélias d'Iolcos (voir la fiche « Pélias »), Alceste épousa Admète (voir la fiche « Admète »), roi de Phères, après qu'il eut accompli l'épreuve exigée par son père — atteler à son char un lion et un sanglier ensemble —, un exploit qu'Admète ne réussit qu'avec l'aide discrète d'Apollon (voir la fiche « Apollon »), alors à son service.",
    "Lorsque le moment fixé par le destin pour la mort d'Admète arriva, et qu'aucun de ses vieux parents n'accepta de mourir à sa place malgré la faveur obtenue par Apollon auprès des Parques, Alceste se proposa elle-même sans hésiter, par amour pour son époux.",
    "Elle mourut donc à sa place — mais Perséphone (voir la fiche « Perséphone »), touchée aux Enfers par cet acte d'amour absolu, la renvoya elle-même auprès des vivants, la rendant à son époux.",
  ],
  "pélias": [
    "Roi usurpateur d'Iolcos, Pélias avait chassé du trône son propre demi-frère Éson, père de Jason (voir la fiche « Jason »), et gouvernait depuis en redoutant un oracle qui l'avertissait de se méfier d'un homme chaussé d'une seule sandale.",
    "Lorsque Jason, adulte, se présenta devant lui ayant perdu une sandale en traversant un fleuve à gué, Pélias, feignant d'accepter de lui rendre son trône, lui imposa en échange une mission jugée impossible : ramener la Toison d'or de Colchide, aux confins du monde connu.",
    "À son retour, découvrant que Pélias avait entre-temps fait périr son propre père, Jason laissa Médée (voir la fiche « Médée ») organiser seule la vengeance : elle persuada les propres filles de Pélias de le rajeunir en le découpant et en le faisant bouillir dans un chaudron magique, après une démonstration convaincante sur un vieux bélier changé en agneau — mais le sortilège, cette fois, ne joua jamais, et Pélias mourut de leurs mains sans jamais renaître.",
  ],
  "clito": [
    "Selon le récit qu'en donne Platon dans le Timée et le Critias, Clito était une mortelle qui vivait seule avec ses parents sur une colline au centre d'une île, aux confins occidentaux du monde connu, lorsque Poséidon (voir la fiche « Poséidon ») en tomba amoureux.",
    "Pour la protéger et s'unir à elle à l'abri des regards, le dieu entoura la colline d'anneaux concentriques de terre et d'eau, alternés comme des douves impossibles à franchir sans navire — le plan même de la cité qui allait devenir Atlantis.",
    "De leur union naquirent cinq paires de jumeaux, dont l'aîné, Atlas — homonyme du Titan porteur du ciel, sans aucun lien de parenté avec lui (voir la fiche « Atlas ») —, reçut en partage l'île tout entière et donna son nom à l'Atlantique comme à son peuple, les Atlantes, dont Clito reste ainsi la lointaine aïeule.",
  ],
  "sidé": [
    "Première épouse du chasseur géant Orion (voir la fiche « Orion »), Sidé osa se vanter d'une beauté supérieure à celle d'Héra elle-même — une prétention que la reine des dieux ne pouvait laisser passer.",
    "Furieuse, Héra la précipita aux Enfers, où Sidé demeure depuis, bien avant qu'Orion ne connaisse ses amours plus célèbres avec Éos, puis son amitié avec Artémis.",
    "Son nom, qui signifie « grenade » en grec, se retrouve aussi dans plusieurs cités d'Asie Mineure fondées sous ce même patronage — un nom resté attaché autant à un lieu qu'à cette première épouse effacée par l'histoire au profit des amours suivantes de son mari.",
  ],
  "picus": [
    "Roi légendaire du Latium, petit-fils de Saturne selon la tradition romaine, Picus était réputé pour sa beauté et son don de prophétie, qu'il exerçait notamment par le chant des oiseaux et des pics en particulier, dont il tenait déjà l'affection avant même sa métamorphose.",
    "Fidèlement marié à la nymphe Canens, il repoussa les avances de la magicienne Circé (voir la fiche « Circé »), rencontrée alors qu'il chassait en forêt — un refus qu'elle ne lui pardonna pas.",
    "Furieuse, Circé le changea en pivert, l'oiseau qui porte encore aujourd'hui son nom latin, picus. Canens, inconsolable, le chercha six jours et six nuits durant à travers tout le Latium avant de se laisser mourir de chagrin sur les rives du Tibre, se dissolvant peu à peu en un simple murmure d'air.",
  ],
  "ixion": [
    "Roi des Lapithes en Thessalie, Ixion assassina son propre beau-père pour échapper à une dette de mariage — le tout premier meurtre commis entre parents dans la mythologie grecque, si horrible qu'aucun mortel n'osa le purifier de sa faute.",
    "Zeus, pris de pitié, l'accueillit malgré tout sur l'Olympe et le purifia lui-même — une clémence qu'Ixion paya d'ingratitude en tentant de séduire Héra en personne. Zeus, pour vérifier ses intentions, façonna une nuée à l'image de son épouse, Néphélé : trompé, Ixion s'unit à elle sans jamais s'apercevoir de la substitution.",
    "De cette union naquirent les Centaures, mi-hommes mi-chevaux, dont Chiron (voir la fiche « Chiron ») reste la seule exception notable, né d'une tout autre union entre Cronos et Philyra. Pour cette double faute — l'ingratitude et l'outrage envers la reine des dieux —, Zeus condamna Ixion à tourner pour l'éternité, attaché à une roue enflammée, aux Enfers.",
  ],
  "pirithoos": [
    "Roi des Lapithes en Thessalie, fils d'Ixion (voir la fiche « Ixion ») — ou de Zeus lui-même selon une tradition parallèle, désireuse d'effacer le père indigne —, Pirithoos avait d'abord voulu éprouver la réputation de Thésée (voir la fiche « Thésée ») en lui volant son bétail, avant qu'une admiration mutuelle ne transforme leur affrontement avorté en amitié indéfectible.",
    "Pour ses propres noces avec Hippodamie (voir la fiche « Hippodamie »), il invita les Centaures, ses demi-frères par leur père commun — une réunion qui tourna au massacre lorsque l'un d'eux, ivre, tenta d'enlever la mariée elle-même, déclenchant la Centauromachie, bataille rangée entre Lapithes et Centaures.",
    "Fidèle jusqu'au bout à son amitié avec Thésée, il l'accompagna dans une tentative insensée d'enlever Perséphone (voir la fiche « Perséphone ») en personne aux Enfers pour l'épouser — un affront qu'Hadès (voir la fiche « Hadès ») punit en les figeant tous deux sur un banc de pierre, incapables de se relever. Seul Thésée, délivré plus tard par Héraclès, put un jour se relever de ce siège ; Pirithoos, lui, y resta pour toujours.",
  ],
  "hippodamie": [
    "Épouse de Pirithoos (voir la fiche « Pirithoos »), roi des Lapithes, Hippodamie vit ses propres noces basculer dans le sang lorsque les Centaures invités à la fête, ivres de vin, tentèrent de l'enlever elle-même ainsi que d'autres femmes présentes.",
    "Le Centaure Eurytion, le plus insistant, la saisit par les cheveux devant tous les invités — un outrage qui déclencha sur-le-champ la Centauromachie, bataille rangée où Thésée (voir la fiche « Thésée »), présent en ami du marié, prêta main-forte aux Lapithes contre les Centaures en déroute.",
    "Ce combat de noces resta l'un des sujets les plus représentés de l'art grec, sculpté notamment sur les métopes du Parthénon à Athènes — un affrontement entre l'ordre civilisé des hommes et la sauvagerie incontrôlée, que la fête elle-même avait pourtant réunis à la même table.",
  ],
  "cyllaros": [
    "Centaure d'une beauté rare parmi les siens, au point qu'Ovide le dit presque digne d'un visage humain sans défaut, Cyllaros combattit aux côtés des autres Centaures lors de la Centauromachie qui éclata aux noces de Pirithoos et Hippodamie (voir les fiches « Pirithoos » et « Hippodamie »).",
    "Il y trouva la mort, frappé d'un javelot resté fiché dans sa poitrine — une blessure qu'il ne sentit d'abord pas, tout entier tourné vers Hylonome (voir la fiche « Hylonome »), la centauresse qu'il aimait, occupée à panser une autre plaie plus légère avant de découvrir la mortelle.",
    "Voyant son bien-aimé agoniser puis mourir dans ses bras, Hylonome se transperça elle-même du même fer pour ne jamais lui survivre — un couple de Centaures resté, chez Ovide, l'image même d'un amour aussi tendre que celui d'humains, au milieu d'un massacre.",
  ],
  "hylonome": [
    "Centauresse aussi soignée de sa personne — peignant sa crinière, ornant son pelage de fleurs — qu'attentive à son seul amour, Hylonome n'aima jamais que Cyllaros (voir la fiche « Cyllaros »), le plus beau des Centaures, avec qui elle partageait tout, jusqu'à la même grotte pour demeure.",
    "Lors de la Centauromachie déclenchée aux noces de Pirithoos et Hippodamie (voir les fiches « Pirithoos » et « Hippodamie »), elle combattit à ses côtés plutôt que de se tenir à l'écart, et le vit mortellement frappé d'un javelot en pleine bataille.",
    "Plutôt que de lui survivre, elle retira l'arme encore fichée dans sa poitrine et s'en transperça à son tour, mourant serrée contre lui — un dernier geste qu'Ovide juge digne d'être raconté au milieu même du chaos d'une bataille, comme la preuve qu'un amour véritable peut survivre à tout sauf à la mort de l'autre.",
  ],
  "calchas": [
    "Devin le plus réputé de l'armée grecque partie pour Troie, Calchas révéla très tôt son don en prédisant, dès le rassemblement de la flotte à Aulis, que le siège de Troie durerait exactement dix ans — un présage tiré du nombre de moineaux dévorés par un serpent devant un autel.",
    "C'est encore lui qui, la flotte immobilisée par un vent contraire, révéla qu'Artémis exigeait le sacrifice d'Iphigénie (voir la fiche « Iphigénie ») pour l'apaiser — une annonce qui scella le destin de la fille d'Agamemnon (voir la fiche « Agamemnon ») et permit enfin le départ vers Troie.",
    "Un oracle lui avait par ailleurs annoncé qu'il mourrait le jour où il rencontrerait un devin plus habile que lui. De retour de Troie, il affronta en un concours de divination le devin Mopsos, qui devina avec une précision plus exacte encore le nombre de figues d'un arbre et le nombre de porcelets portés par une truie pleine — Calchas, vaincu, mourut de honte sur-le-champ, la prophétie enfin accomplie.",
  ],
  "hyperboréens": [
    "Peuple légendaire vivant, selon les Grecs, au-delà du souffle de Borée, le vent du Nord (voir la fiche « Borée ») — un pays sans hiver, sans maladie ni vieillesse, où l'on ne meurt, dit-on, que rassasié de vie, en se jetant de son plein gré dans la mer du haut d'une falaise.",
    "Apollon (voir la fiche « Apollon ») leur voue une affection particulière : chaque hiver, il quitte son sanctuaire de Delphes pour aller passer plusieurs mois parmi eux, avant de revenir au printemps reprendre son oracle — un peuple si proche des dieux que Pindare le dit visité aussi bien par les Muses que par Persée lors de l'un de ses voyages.",
    "Leur localisation exacte resta un mystère que les Grecs eux-mêmes ne cherchèrent jamais vraiment à résoudre, au-delà de l'idée d'un lieu au bout du monde connu, quelque part au nord des terres scythes — un pays moins géographique qu'idéal, la promesse d'une existence délivrée des maux ordinaires de la condition mortelle.",
  ],
  "abaris": [
    "Prêtre et devin originaire du pays des Hyperboréens (voir la fiche « Hyperboréens »), consacré au culte d'Apollon (voir la fiche « Apollon »), Abaris reçut du dieu lui-même une flèche d'or sur laquelle il pouvait voyager à travers les airs, traversant fleuves, montagnes et mers sans jamais avoir besoin de nourriture ni de repos.",
    "Parcourant ainsi le monde grec, il prédisait les famines, apaisait les épidémies par des rites purificateurs et prophétisait sans jamais accepter la moindre offrande en retour — une intégrité qui frappa jusqu'à Pythagore, dit-on rencontré en personne lors de l'un de ses passages.",
    "Sa seule flèche reste l'attribut par lequel on le reconnaît dans l'art antique : un simple prêtre errant, mais si proche d'Apollon qu'il en partage presque le pouvoir de se déplacer à volonté, sans jamais quitter tout à fait sa condition mortelle.",
    "Selon une tradition plus tardive, cette flèche d'or rejoignit elle aussi le ciel une fois le voyage d'Abaris achevé : elle serait devenue celle que tient encore aujourd'hui l'archer du Sagittaire, Crotos (voir la fiche « Crotos »), ultime hommage d'Apollon à la fidélité de son prêtre.",
  ],
  "hypsipyle": [
    "Reine de Lemnos, Hypsipyle épargna son propre père Thoas le jour où les femmes de l'île, délaissées par leurs maris partis chercher des captives thraces, massacrèrent tous les hommes de l'île en réponse — elle seule le cacha en secret plutôt que de se joindre au massacre.",
    "C'est elle qui accueillit Jason et les Argonautes (voir la fiche « Jason ») lors de leur escale sur l'île, dépourvue d'hommes depuis ce massacre : les Lemniennes, désireuses de repeupler leur cité, retinrent les marins plus d'un an, et Hypsipyle eut de Jason des jumeaux avant son départ pour la Colchide.",
    "Sa clémence envers son père finit par être découverte : chassée de Lemnos par les autres femmes, elle fut vendue comme esclave et devint nourrice du petit prince Opheltès à Némée. Une négligence d'un instant — le temps de guider des voyageurs, dont les futurs Sept contre Thèbes, jusqu'à une source — coûta la vie à l'enfant, mordu par un serpent ; en sa mémoire furent institués les Jeux Néméens, célébrés depuis tous les deux ans.",
  ],
  "œdipe": [
    "Fils de Laïos, roi de Thèbes descendant de Cadmos (voir la fiche « Cadmos »), et de Jocaste (voir la fiche « Jocaste »), Œdipe fut exposé sur le mont Cithéron, les chevilles percées et liées, dès sa naissance : un oracle avait prédit qu'il tuerait son propre père.",
    "Recueilli par des bergers puis élevé à la cour de Corinthe sans jamais connaître ses origines, il consulta à son tour l'oracle de Delphes une fois adulte, qui lui répéta la même prophétie — sans qu'il sache qu'il ne parlait déjà plus de ses parents adoptifs. Fuyant Corinthe pour l'éviter, il tua sans le savoir son père Laïos lors d'une rixe sur la route, au croisement de trois chemins.",
    "Arrivé à Thèbes, il délivra la ville du Sphinx en résolvant seul son énigme — quel est l'être qui marche à quatre pattes le matin, deux à midi et trois le soir ? l'homme, à chaque âge de sa vie —, et reçut pour récompense la main de la reine veuve, Jocaste, sans savoir qu'il épousait sa propre mère.",
    "La vérité éclata des années plus tard, lors d'une peste qui frappait Thèbes pour purifier la faute cachée : Jocaste se donna la mort en l'apprenant, et Œdipe, horrifié, se creva lui-même les yeux avant de partir en exil, accompagné de sa fille Antigone (voir la fiche « Antigone »).",
  ],
  "jocaste": [
    "Reine de Thèbes, descendante de Cadmos (voir la fiche « Cadmos »), Jocaste épousa Laïos, qu'un oracle avertit qu'un fils né d'elle le tuerait un jour — un avertissement qui poussa le couple à faire exposer leur unique enfant dès sa naissance plutôt que de risquer cette prophétie.",
    "Devenue veuve après la mort de Laïos, tué par un inconnu sur la route, elle épousa sans le savoir Œdipe (voir la fiche « Œdipe »), le vainqueur du Sphinx venu délivrer la ville — son propre fils, qu'elle croyait mort depuis longtemps.",
    "Elle eut de lui quatre enfants, dont Antigone (voir la fiche « Antigone »), avant qu'une peste ne révèle enfin la vérité sur cette double faute involontaire. Incapable de survivre à cette découverte, Jocaste se pendit de ses propres mains, laissant Œdipe seul face à l'horreur de ce qu'il avait accompli sans le savoir.",
  ],
  "antigone": [
    "Fille et demi-sœur d'Œdipe (voir la fiche « Œdipe »), née de son union involontaire avec sa propre mère Jocaste (voir la fiche « Jocaste »), Antigone accompagna son père en exil après qu'il se fut lui-même crevé les yeux, le guidant jusqu'à sa mort à Colone, près d'Athènes.",
    "De retour à Thèbes, elle vit ses deux frères, Étéocle et Polynice, s'entretuer pour le trône dans la guerre des Sept contre Thèbes — Polynice, ayant attaqué sa propre cité à la tête d'une armée étrangère, se vit refuser toute sépulture par le nouveau roi Créon, sous peine de mort pour quiconque l'enterrerait.",
    "Antigone brava l'interdit et accomplit seule les rites funéraires dus à son frère, choisissant la loi sacrée du sang plutôt que celle, plus récente, de la cité. Condamnée par Créon à être emmurée vivante malgré les liens qui l'unissaient à son propre fils Hémon, fiancé d'Antigone, elle se donna la mort avant que la sentence ne s'accomplisse — entraînant dans son sillage celles d'Hémon, puis de la propre épouse de Créon, désespérés l'un et l'autre.",
  ],
  "halia": [
    "Nymphe native de Rhodes, Halia s'unit à Poséidon (voir la fiche « Poséidon ») et lui donna six fils ainsi qu'une fille, Rhodos, qui donna son nom à l'île.",
    "Ses fils, devenus adultes, s'enorgueillirent au point d'empêcher Aphrodite (voir la fiche « Aphrodite ») elle-même d'aborder l'île lors de son propre passage — un outrage que la déesse ne pardonna jamais : elle les frappa de folie, et dans cet égarement ils violèrent leur propre mère avant de comprendre l'horreur de leur geste.",
    "Poséidon, pour les punir à son tour, les enferma sous terre où ils devinrent des démons souterrains ; Halia, incapable de survivre à ce déshonneur, se jeta dans la mer — les Rhodiens continuèrent depuis de l'honorer comme une déesse marine locale, sous le nom de Leucothéa, à ne pas confondre avec l'autre Leucothéa, l'ancienne Ino, déesse marine d'origine tout à fait distincte.",
  ],
  "hermione": [
    "Fille unique de Ménélas et d'Hélène (voir les fiches « Ménélas » et « Hélène »), Hermione grandit à Sparte durant les dix années où sa mère, enlevée ou consentante selon les versions, se trouvait à Troie aux côtés de Pâris (voir la fiche « Pâris »).",
    "Promise dès l'enfance à son cousin Oreste (voir la fiche « Oreste »), elle fut néanmoins donnée par son père à Néoptolème (voir la fiche « Néoptolème »), fils d'Achille, en récompense de sa bravoure devant Troie — un mariage arrangé sans elle, qui la rendit malheureuse aux côtés d'un époux déjà lié à sa captive Andromaque (voir la fiche « Andromaque »).",
    "Jalouse et sans enfant, elle accusa Andromaque de sorcellerie et tenta de la faire tuer avec son fils Molossos, avant qu'Oreste, venu la retrouver, ne fasse assassiner Néoptolème à Delphes lors d'une querelle sur les honneurs dus au sanctuaire d'Apollon.",
    "Libre enfin de son rival, elle épousa Oreste, comme le voulait la promesse de leur enfance — un dénouement que la tragédie grecque, chez Euripide notamment, transforme en un rare mariage heureux au milieu d'une lignée par ailleurs vouée aux malédictions.",
  ],
  "chryséis": [
    "Fille de Chrysès, prêtre d'Apollon à Chrysa (voir la fiche « Apollon »), Chryséis fut capturée lors d'un raid mené par Achille (voir la fiche « Achille ») sur une cité voisine de Troie, puis offerte en butin de guerre à Agamemnon (voir la fiche « Agamemnon »), qui la retint malgré les supplications et les riches présents de son propre père venu la racheter.",
    "Outragé par ce refus, Chrysès implora Apollon de punir les Grecs — le dieu répondit en abattant sur leur camp une peste dévastatrice, ses flèches invisibles frappant hommes et bêtes neuf jours durant, jusqu'à ce que le devin Calchas (voir la fiche « Calchas ») en révèle la cause devant l'armée assemblée.",
    "Contraint de rendre Chryséis à son père pour apaiser le dieu, Agamemnon se dédommagea en s'emparant de Briséis (voir la fiche « Briséis »), la captive d'Achille — un geste qui déclencha la colère du héros et, avec elle, l'intrigue tout entière de l'Iliade.",
    "Une tradition plus tardive, reprise notamment dans l'art contemporain sans fondement homérique direct, présente les deux jeunes femmes comme cousines — unies, par-delà cette parenté supposée, par le même sort de captives arrachées à leur foyer en une seule et même guerre.",
  ],
  "briséis": [
    "Captive d'Achille (voir la fiche « Achille ») depuis qu'il eut mis à sac sa cité natale de Lyrnessos et tué son époux ainsi que ses frères, Briséis vivait néanmoins auprès de lui dans une relation que l'Iliade décrit comme sincèrement affectueuse plutôt que forcée.",
    "Contraint de rendre Chryséis (voir la fiche « Chryséis ») à son père pour apaiser la colère d'Apollon, Agamemnon (voir la fiche « Agamemnon ») s'empara d'elle en dédommagement — une humiliation publique qui poussa Achille à se retirer des combats, laissant les Grecs perdre du terrain sans lui.",
    "Rendue à Achille une fois leur querelle apaisée, elle pleura sur le corps de Patrocle, mort au combat, louant la douceur qu'Achille avait toujours eue envers elle malgré les circonstances de leur rencontre — l'un des rares moments de l'Iliade où une captive de guerre reçoit une voix et un chagrin qui lui soient propres.",
    "Cette même tradition moderne qui unit Briséis et Chryséis (voir la fiche « Chryséis ») par les liens du sang les montre aussi proches par le cœur, consolées l'une par l'autre dans le camp achéen malgré la rivalité de leurs maîtres respectifs.",
  ],
  "menthé": [
    "Naïade des rives du Cocyte, aux Enfers, Menthé fut aimée d'Hadès (voir la fiche « Hadès ») avant même, selon certaines versions, qu'il n'ait épousé Perséphone (voir la fiche « Perséphone ») — ou, selon d'autres, alors qu'il l'était déjà.",
    "Perséphone, découvrant cette liaison, ne s'en prit pas à son époux mais à la nymphe elle-même : de rage, elle la piétina jusqu'à la changer en la plante odorante qui porte encore son nom, la menthe.",
    "Le parfum de la plante, dit-on, ne se libère jamais aussi fort que lorsqu'on la foule aux pieds — dernier écho, à chaque pas d'un promeneur, de la colère qui transforma Menthé pour toujours.",
  ],
  "pyrame": [
    "À Babylone, Pyrame et Thisbé (voir la fiche « Thisbé ») grandirent dans deux maisons voisines, séparées par un simple mur mitoyen — et s'éprirent l'un de l'autre malgré l'interdiction formelle de leurs deux familles, rivales sans que le mythe n'en précise jamais la raison.",
    "Une fissure dans ce mur leur permit d'échanger des mots à voix basse, seul refuge de leur amour interdit, jusqu'à ce qu'ils décident de fuir ensemble et de se retrouver, de nuit, près du tombeau de Ninos, sous un mûrier chargé de fruits blancs, aux portes de la ville.",
    "Thisbé, arrivée la première, s'enfuit terrifiée à l'approche d'une lionne à la gueule encore rouge d'une proie récente, et perdit dans sa fuite son voile, que la bête déchira et macula de sang. Pyrame, survenu peu après, ne trouva que ce voile ensanglanté et, croyant sa bien-aimée dévorée, se transperça de son épée au pied de l'arbre — son sang jaillissant jusqu'aux fruits du mûrier, blancs jusqu'alors.",
    "Revenue sur ses pas, Thisbé découvrit Pyrame agonisant et se donna la mort à son tour avec la même épée, sous les yeux des deux familles accourues trop tard pour les sauver, mais à temps pour réconcilier leur haine sur la tombe commune de leurs enfants. Depuis ce jour, dit la légende, les fruits du mûrier mûrissent toujours du blanc au rouge sombre, teints pour toujours par ce sang mêlé — un récit que Shakespeare reprendra, des siècles plus tard, pour Roméo et Juliette.",
  ],
  "thisbé": [
    "Jeune Babylonienne éprise de Pyrame (voir la fiche « Pyrame ») malgré l'opposition de leurs deux familles, Thisbé communiquait avec lui à travers la fissure d'un mur séparant leurs maisons, avant de convenir avec lui d'un rendez-vous nocturne près du tombeau de Ninos.",
    "Arrivée la première sous le mûrier convenu, elle prit la fuite à l'approche d'une lionne repue d'une proie récente, abandonnant dans sa hâte un voile que la bête déchiqueta, le maculant de sang. En le retrouvant, croyant Thisbé tuée, Pyrame se donna la mort — et Thisbé, revenue le trouver mourant, se transperça à son tour de la même épée plutôt que de lui survivre.",
    "Son nom reste depuis attaché à ce malentendu tragique né d'un simple voile ensanglanté : un amour empêché par des familles ennemies, une méprise fatale, une mort partagée — le schéma même que Shakespeare reprendra pour Roméo et Juliette, des siècles plus tard.",
  ],
  "muses": [
    "Filles de Zeus et de la Titanide Mnémosyne (voir les fiches « Zeus » et « Mnémosyne »), la Mémoire elle-même, les neuf Muses naquirent au terme de neuf nuits consécutives où le roi des dieux s'unit à elle. Hésiode, la source la plus ancienne à les nommer toutes ensemble, se contente de les énumérer sans leur attribuer de domaine particulier — la répartition en neuf arts bien distincts, aujourd'hui la plus connue, ne s'est fixée que plus tard, à l'époque hellénistique et romaine (voir les fiches consacrées à chacune).",
    "Elles résident traditionnellement sur le mont Hélicon, en Béotie, près de la source Hippocrène, née dit-on du sabot de Pégase frappant le rocher, ou sur le Parnasse, près de la source Castalie non loin de Delphes — deux lieux également associés à Apollon (voir la fiche « Apollon »), qui les conduit alors sous le nom d'Apollon Musagète, « guide des Muses ».",
    "Leur talent leur valut un jour un défi : les neuf filles de Piéros, roi de Macédoine, se crurent leurs égales et les provoquèrent en un concours de chant, jugé par des nymphes. Les Piérides chantèrent un hymne impie glorifiant les Géants contre les dieux de l'Olympe ; Calliope (voir la fiche « Calliope »), au nom des Muses, leur répondit par le récit du rapt de Perséphone par Hadès. Les nymphes tranchèrent sans appel en faveur des Muses — et les Piérides, refusant leur défaite et multipliant les insultes, furent changées en pies bavardes, condamnées à conserver dans ce nouveau corps le seul don qu'elles n'avaient jamais su maîtriser : parler sans savoir se taire.",
    "Chacune des neuf incarne aujourd'hui un art précis — l'épopée, l'histoire, la musique, la comédie, la tragédie, la danse, la poésie amoureuse, les hymnes sacrés et l'astronomie (voir les fiches individuelles) — mais leur légende commune reste celle d'un groupe inséparable, jamais représenté l'une sans les autres.",
  ],
  "clio": [
    "Clio préside à l'Histoire — son nom, dérivé du verbe grec « kleiein », célébrer, désigne celle qui proclame la gloire des actes dignes d'être retenus. On la représente tenant un rouleau ou un livre ouvert, parfois une trompette à la main, comme pour annoncer ce qui mérite de traverser le temps.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »), filles de Zeus et de Mnémosyne, la Mémoire elle-même (voir les fiches « Zeus » et « Mnémosyne ») — une parenté qui prend tout son sens pour elle en particulier : que serait l'Histoire sans la mémoire qui la précède ?",
  ],
  "euterpe": [
    "Euterpe préside à la musique, en particulier au son de l'aulos, une flûte double dont elle passe pour l'inventrice. Son nom signifie « celle qui réjouit », en écho au plaisir que procure son art.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »), et son image — une jeune femme jouant de la flûte — a longtemps servi d'allégorie à la musique elle-même dans l'art occidental, bien après la disparition de son culte antique.",
  ],
  "thalie": [
    "Thalie préside à la comédie et à la poésie pastorale — son nom signifie « celle qui fleurit » ou « l'abondance joyeuse ». On la représente tenant un masque comique et une houlette de berger, symbole de la vie champêtre que chante ce genre léger.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »), et forme avec Melpomène, muse de la tragédie (voir la fiche « Melpomène »), le couple de masques — l'un riant, l'autre pleurant — resté depuis le symbole universel du théâtre.",
    "Une autre Thalia existe parmi les trois Charites (voir la fiche « Thalia ») : les deux Thalie restent distinctes malgré ce nom commun.",
  ],
  "melpomène": [
    "Melpomène préside à la tragédie — son nom, dérivé du verbe grec « melpein », chanter ou célébrer par le chant, rappelle qu'à l'origine la tragédie grecque se chantait autant qu'elle se jouait. On la représente tenant un masque tragique et parfois une massue ou un poignard, attributs empruntés aux grands destins funestes qu'elle inspire.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »), et forme avec Thalie, muse de la comédie (voir la fiche « Thalie »), le couple de masques resté depuis le symbole universel du théâtre.",
  ],
  "terpsichore": [
    "Terpsichore préside à la danse et au chant choral — son nom signifie littéralement « celle qui se réjouit de la danse ». On la représente une lyre à la main, guidant de son rythme les pas d'un chœur.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »). Certaines traditions tardives lui prêtent, avec le dieu-fleuve Achéloos, la maternité des Sirènes — une ascendance que les auteurs anciens eux-mêmes hésitent à lui attribuer en propre, la donnant tour à tour à elle ou à sa sœur Melpomène.",
  ],
  "érato": [
    "Érato préside à la poésie lyrique et amoureuse — son nom, dérivé d'Éros, signifie « la désirable » ou « celle qui inspire l'amour ». On la représente une lyre à la main, parfois accompagnée d'un petit Éros ailé.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »). Ironie de son domaine : c'est elle que le poète latin Virgile invoque au début du chant guerrier de l'Énéide, bien loin de l'amour qu'elle inspire d'ordinaire — comme si même la muse la plus tendre pouvait prêter sa voix aux récits les plus rudes.",
  ],
  "polymnie": [
    "Polymnie préside aux hymnes sacrés et à la poésie religieuse — son nom signifie littéralement « aux nombreux chants ». On la représente pensive, drapée, un doigt posé sur les lèvres ou un voile relevé, dans une attitude de recueillement plutôt que d'action.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »). Les auteurs plus tardifs élargirent peu à peu son domaine à la pantomime, à la géométrie et même à la méditation philosophique — signe qu'une muse au domaine flou finit, avec le temps, par attirer tout ce qu'aucune autre ne réclame.",
  ],
  "uranie": [
    "Uranie préside à l'astronomie — son nom signifie « la céleste », le même que celui d'une épiclèse d'Aphrodite elle-même, sans aucun lien de parenté entre les deux. On la représente un globe céleste et un compas à la main, le regard tourné vers les étoiles plutôt que vers la terre.",
    "Elle appartient aux neuf Muses (voir la fiche « Muses »).",
  ],
  "heures": [
    "Filles de Zeus et de Thémis (voir la fiche « Thémis »), les Heures — Eunomia, l'Ordre légitime, Dikè, la Justice, et Eiréné, la Paix — veillent selon Hésiode sur les travaux des mortels, garantes d'un monde où chaque chose se déroule à sa juste place et en son temps.",
    "Chez Homère, elles tiennent un rôle plus concret encore : gardiennes des portes de l'Olympe, elles écartent ou referment le lourd nuage qui en tient lieu, laissant passer les dieux ou leur en interdisant l'accès selon ce que l'ordre du monde exige.",
    "Une tradition plus tardive élargit leur nombre et leur rôle : associées aux saisons elles-mêmes, on les voit aussi parer Aphrodite (voir la fiche « Aphrodite ») à sa sortie des flots, ou accompagner les Charites (voir la fiche « Charites ») dans les cortèges divins — des figures discrètes, mais sans lesquelles rien, dans le monde comme sur l'Olympe, ne se déroulerait en son temps.",
  ],
  "parques": [
    "Les Moires — en français plus couramment les Parques, du nom latin qui leur est resté — sont trois : Clotho, qui file le fil de chaque existence sur son fuseau ; Lachésis, qui en mesure la longueur et fixe la part de destin échue à chacun ; et Atropos, « celle qu'on ne peut détourner », qui tranche ce même fil au moment de la mort.",
    "Hésiode lui-même les fait naître deux fois dans sa Théogonie, sans jamais harmoniser les deux versions : la plus ancienne les dit filles de Nyx, la Nuit, seule (voir la fiche « Nyx »), nées aux côtés de la Mort et du Sommeil ; un passage plus tardif du même poème en fait plutôt les filles de Zeus et de Thémis (voir la fiche « Thémis »), sœurs des Heures (voir la fiche « Heures »).",
    "Une tradition orphique en fait plutôt les filles d'Ananké, la Nécessité elle-même (voir la fiche « Ananké ») — Platon décrit leur fuseau tournant sur les genoux de leur mère, axe autour duquel le monde entier accomplit sa course. Même Zeus s'incline devant leurs décrets dans la tradition la plus ancienne ; une épiclèse plus tardive, Zeus Moiragète, « guide des Moires », suggère pourtant une relation plus nuancée qu'une simple soumission.",
  ],
};
const DEITY_PORTRAITS = {
  "hécate": "assets/deity-hecate.jpg",
  "artémis": "assets/deity-artemis.jpg",
  "aphrodite": "assets/deity-aphrodite.jpg",
  "perséphone": "assets/deity-persephone.jpg",
  "déméter": "assets/deity-demeter.jpg",
  "mélinoé": "assets/deity-melinoe.jpg",
  "hestia": "assets/deity-hestia.jpg",
  "héra": "assets/deity-hera.jpg",
  "athéna": "assets/deity-athena.jpg",
  "dionysos": "assets/deity-dionysos.jpg",
  "thémis": "assets/deity-themis.jpg",
  "héphaïstos": "assets/deity-hephaistos.jpg",
  "thalie": "assets/deity-thalie.jpg",
  "terpsichore": "assets/deity-terpsichore.jpg",
  "clio": "assets/deity-clio.jpg",
  "érato": "assets/deity-erato.jpg",
  "polymnie": "assets/deity-polymnie.jpg",
  "uranie": "assets/deity-uranie.jpg",
  "melpomène": "assets/deity-melpomene.jpg",
  "euterpe": "assets/deity-euterpe.jpg",
  "calliope": "assets/deity-calliope.jpg",
  // Éros et Psyché, Harmonie et Cadmos : un même portrait de couple pour les deux figures
  // (demande explicite « à mettre dans les deux »). Dionysos et Ariane : le même principe de
  // couple, mais réservé à la seule fiche d'Ariane cette fois (demande explicite « à mettre
  // dans Ariane »), Dionysos n'en hérite pas.
  "éros": "assets/deity-eros-psyche.jpg",
  "psyché": "assets/deity-eros-psyche.jpg",
  "énée": "assets/deity-enee.jpg",
  "ariane": "assets/deity-dionysos-ariane.jpg",
  "harmonie": "assets/deity-harmonie-cadmos.jpg",
  "cadmos": "assets/deity-harmonie-cadmos.jpg",
  "heures": "assets/deity-heures.jpg",
  "parques": "assets/deity-parques.jpg",
  // Actéon : la première image reçue montrait aussi Artémis et ses nymphes au bain (la scène même
  // du mythe) — remplacée ensuite par l'utilisatrice par cette image-ci, qui ne montre plus que
  // lui-même, en tenue de chasse avec ses chiens et le cerf qu'il deviendra en arrière-plan.
  "actéon": "assets/deity-acteon.jpg",
  "achille": "assets/deity-achille.jpg",
  "hygie": "assets/deity-hygie.jpg",
  "charites": "assets/deity-charites.jpg",
  // Portrait de groupe (les 9 Muses ensemble) : image large, jamais recadrée en 4:5 comme les
  // portraits individuels — voir .deity-portrait-wide dans styles.css, qui lui laisse son propre
  // format plutôt que de sacrifier certaines des neuf sur les bords à un recadrage trop serré.
  "muses": "assets/deity-muses.jpg",
  // Pyrame et Thisbé : même portrait de couple partagé entre les deux fiches, comme pour
  // Éros/Psyché et Harmonie/Cadmos plus haut.
  "pyrame": "assets/deity-pyrame-thisbe.jpg",
  "thisbé": "assets/deity-pyrame-thisbe.jpg",
  "hermès": "assets/deity-hermes.jpg",
  "andromède": "assets/deity-andromede.jpg",
  "apollon": "assets/deity-apollon.jpg",
  "arès": "assets/deity-ares.jpg",
  "enyo": "assets/deity-enyo.jpg",
  // Phobos réutilise le même portrait de couple que la fiche d'Arès (demande explicite,
  // en plus de celle d'Arès plutôt qu'à sa place) — voir DEITY_INLINE_PORTRAITS["arès"].
  "phobos": "assets/deity-deimos-phobos.jpg",
  "médée": "assets/deity-medee.jpg",
  "circé": "assets/deity-circe.jpg",
  "amphitrite": "assets/deity-amphitrite.jpg",
  // Le jugement de Pâris : portrait de groupe (les quatre protagonistes), format large plutôt
  // que le recadrage 4:5 habituel, même traitement que les Muses plus haut — voir
  // DEITY_PORTRAIT_WIDE ci-dessous.
  "pâris": "assets/deity-jugement-paris.jpg",
  // Séléné et Endymion : même portrait de couple partagé entre les deux fiches, comme pour
  // Éros/Psyché, Harmonie/Cadmos et Pyrame/Thisbé plus haut.
  "séléné": "assets/deity-selene-endymion.jpg",
  "endymion": "assets/deity-selene-endymion.jpg",
  "atalante": "assets/deity-atalante-pomme.jpg",
  // Jason : même image que le portrait en ligne ajouté sur la fiche de Médée juste en dessous
  // (la scène où Éros la frappe de sa flèche), réutilisée ici comme portrait principal — il
  // n'en avait aucun jusqu'ici.
  "jason": "assets/deity-jason-medee.jpg",
  "hélios": "assets/deity-helios.jpg",
  "éos": "assets/deity-eos.jpg",
  "iris": "assets/deity-iris.jpg",
  "léda": "assets/deity-leda.jpg",
  "io": "assets/deity-io.jpg",
  "adonis": "assets/deity-adonis.jpg",
  "sémélé": "assets/deity-semele.jpg",
  // Orion : portrait de groupe (le géant fuyant, Artémis et Apollon, le scorpion et la
  // constellation à venir), format large plutôt que le recadrage 4:5 habituel — voir
  // DEITY_PORTRAIT_WIDE ci-dessous.
  "orion": "assets/deity-orion-mort.jpg",
  // Admète et Alceste : deux images distinctes plutôt qu'un seul portrait de couple partagé —
  // le char attelé (l'épreuve d'Admète, Apollon en retrait) devient celui d'Admète, les noces
  // qui suivent celui d'Alceste.
  "admète": "assets/deity-admete-char.jpg",
  "alceste": "assets/deity-alceste-admete-noces.jpg",
  // Hersé : scène de groupe (elle-même, ses deux sœurs, et Hermès) — format large plutôt que
  // le recadrage 4:5 habituel, voir DEITY_PORTRAIT_WIDE, pour ne perdre aucune des quatre
  // figures sur les bords.
  "hersé": "assets/deity-herse-panathenees.jpg",
  "pandrosos": "assets/deity-pandrosos.jpg",
  "aglauros": "assets/deity-aglauros.jpg",
  "hippolyté": "assets/deity-hippolyte-amazone.jpg",
  "myrina": "assets/deity-myrina.jpg",
  "otrera": "assets/deity-otrera.jpg",
  "antiope": "assets/deity-antiope.jpg",
  // Les Amazones : portrait de groupe (cinq d'entre elles) — format large plutôt que le
  // recadrage 4:5 habituel, voir DEITY_PORTRAIT_WIDE.
  "amazones": "assets/deity-amazones.jpg",
  // Penthésilée contre Achille : deux personnages en pleine bataille, format large plutôt que
  // le recadrage 4:5 habituel, voir DEITY_PORTRAIT_WIDE.
  "penthésilée": "assets/deity-penthesilee-achille.jpg",
  "chryséis": "assets/deity-chryseis.jpg",
  "briséis": "assets/deity-briseis.jpg",
  "alcippé": "assets/deity-alcippe.jpg",
  "hécube": "assets/deity-hecube.jpg",
  "priam": "assets/deity-priam.jpg",
  "andromaque": "assets/deity-andromaque.jpg",
  "hector": "assets/deity-hector.jpg",
  "hélène": "assets/deity-helene.jpg",
  "clytemnestre": "assets/deity-clytemnestre.jpg",
  "iphigénie": "assets/deity-iphigenie.jpg",
  "hermione": "assets/deity-hermione.jpg",
  "castor": "assets/deity-castor-pollux.jpg",
  "pollux": "assets/deity-castor-pollux.jpg",
  "pénélope": "assets/deity-penelope.jpg",
  "télégonos": "assets/deity-telegonos.jpg",
  "ulysse": "assets/deity-ulysse.jpg",
  "télémaque": "assets/deity-telemaque.jpg",
};
const DEITY_PORTRAIT_WIDE = new Set(["muses", "pâris", "orion", "heures", "parques", "hersé", "amazones", "penthésilée", "castor", "pollux"]);
const DEITY_INLINE_PORTRAITS = {
  "dionysos": [
    { match: "Ménades", src: "assets/deity-dionysos-cortege.jpg", alt: "Le cortège de Dionysos" },
    { match: "Ariane", src: "assets/deity-dionysos-ariane.jpg", alt: "Dionysos et Ariane" },
  ],
  "apollon": [
    { match: "Daphné", src: "assets/deity-apollon-daphne.jpg", alt: "Apollon et Daphné" },
  ],
  "aphrodite": [
    { match: "remporte le jugement de Pâris", src: "assets/deity-jugement-paris.jpg", alt: "Le jugement de Pâris", wide: true },
    { match: "dieu de la guerre", src: "assets/deity-ares-aphrodite.jpg", alt: "Arès et Aphrodite" },
    { match: "Diomède", src: "assets/deity-aphrodite-enee.jpg", alt: "Aphrodite qui sauve Énée" },
  ],
  "artémis": [
    { match: "une meute de chiennes", src: "assets/deity-artemis-suite.jpg", alt: "Artémis et sa suite" },
  ],
  "énée": [
    { match: "porta sur son dos son père âgé", src: "assets/deity-enee-fuite-troie.jpg", alt: "Énée fuyant Troie avec son père et son fils" },
    { match: "où règne la reine Didon", src: "assets/deity-enee-didon.jpg", alt: "Énée et Didon" },
  ],
  "andromède": [
    { match: "Persée", src: "assets/deity-persee-andromede.jpg", alt: "Persée volant au secours d'Andromède" },
  ],
  "arès": [
    { match: "Phobos et Deimos", src: "assets/deity-deimos-phobos.jpg", alt: "Phobos et Deimos" },
  ],
  "persée": [
    { match: "un pêcheur nommé Dictys les recueillit", src: "assets/deity-persee-danae-dictys.jpg", alt: "Dictys découvre Danaé et le bébé Persée" },
    { match: "Andromède", src: "assets/deity-persee-andromede-combat.jpg", alt: "Persée délivre Andromède" },
  ],
  "circé": [
    { match: "protégé par une plante magique", src: "assets/deity-circe-ulysse.jpg", alt: "Circé qui tente de transformer Ulysse" },
    { match: "change aussi la nymphe Scylla", src: "assets/deity-circe-scylla.jpg", alt: "Circé change Scylla en monstre" },
  ],
  "thétis": [
    { match: "Leurs noces", src: "assets/deity-thetis-noces.jpg", alt: "Les noces de Thétis et Pélée" },
  ],
  "médée": [
    { match: "décocher une flèche d'or dans le cœur de Médée", src: "assets/deity-jason-medee.jpg", alt: "Jason et Médée, sous la flèche d'Éros" },
  ],
  "orion": [
    { match: "l'emporta à Délos", src: "assets/deity-eos-orion.jpg", alt: "Éos et Orion" },
  ],
  "héphaïstos": [
    { match: "un bijou si redouté qu'Héra elle-même", src: "assets/deity-hephaistos-ceinture.jpg", alt: "Héphaïstos forgeant la ceinture magique d'Aphrodite" },
  ],
  // Le coffre d'Érichthonios : une même image (les trois sœurs découvrant l'enfant, format
  // large pour ne perdre aucune des trois) réutilisée sur les 4 fiches qui racontent cette
  // scène chacune à sa façon, comme pour Persée/Andromède plus haut.
  "pandrosos": [
    { match: "confia le coffre", src: "assets/deity-coffre-athena.jpg", alt: "Pandrosos reçoit le coffre d'Athéna" },
    { match: "cédèrent à la curiosité", src: "assets/deity-coffre-ouvert.jpg", alt: "Aglauros et Hersé ouvrent le coffre, Pandrosos découvre", wide: true },
  ],
  "aglauros": [
    { match: "céda à la curiosité et ouvrit le coffre", src: "assets/deity-coffre-ouvert.jpg", alt: "Aglauros et Hersé ouvrent le coffre, Pandrosos découvre", wide: true },
    { match: "lui barra d'abord le passage", src: "assets/deity-aglauros-hermes.jpg", alt: "Aglauros bloque l'accès à Hermès" },
  ],
  "érichthonios": [
    { match: "désobéirent et découvrirent l'enfant", src: "assets/deity-coffre-ouvert.jpg", alt: "Aglauros et Hersé ouvrent le coffre, Pandrosos découvre", wide: true },
  ],
  "hersé": [
    { match: "céda à la curiosité et l'ouvrit", src: "assets/deity-coffre-ouvert.jpg", alt: "Aglauros et Hersé ouvrent le coffre, Pandrosos découvre", wide: true },
    { match: "gardée par Aglauros", src: "assets/deity-aglauros-hermes.jpg", alt: "Aglauros bloque l'accès à Hermès" },
  ],
  "éris": [
    { match: "jeta parmi les déesses assemblées une pomme d'or", src: "assets/deity-eris-pomme.jpg", alt: "Éris jette la pomme d'or aux noces de Thétis" },
  ],
  "chryséis": [
    { match: "présente les deux jeunes femmes comme cousines", src: "assets/deity-chryseis-briseis.jpg", alt: "Chryséis et sa cousine Briséis", wide: true },
  ],
  "briséis": [
    { match: "consolées l'une par l'autre dans le camp achéen", src: "assets/deity-chryseis-briseis.jpg", alt: "Chryséis et sa cousine Briséis", wide: true },
  ],
};
// Table de résolution "nom affiché" -> cible cliquable (figure mythologique ou symbole),
// construite une seule fois à partir des données déjà là : DEITY_NOTES (id -> nom, simple
// majuscule initiale) et SYMBOL_LIBRARY (id -> label, qui peut différer de l'id — ex. « Enfer /
// monde souterrain » pour l'id "monde souterrain"). En cas de collision improbable entre un nom
// de figure et un label de symbole, la figure garde la priorité (déjà insérée en premier).
const LORE_LINK_TARGETS = (() => {
  const map = {};
  for(const id of Object.keys(DEITY_NOTES)){
    map[id.charAt(0).toUpperCase()+id.slice(1)] = { type:"deity", id };
  }
  for(const [id, s] of Object.entries(SYMBOL_LIBRARY)){
    if(!(s.label in map)) map[s.label] = { type:"symbol", id };
  }
  return map;
})();

// Un caractère "de mot" au sens large (lettres et chiffres Unicode, donc les accents français
// comptent) — sert à vérifier qu'une occurrence trouvée est bien un mot isolé plutôt qu'une
// coïncidence à l'intérieur d'un autre mot (ex. ne jamais confondre le symbole « Mer » avec
// une occurrence à l'intérieur de « commercer » ou « amer »).
function isWordChar(ch){
  return !!ch && /[\p{L}\p{N}]/u.test(ch);
}

// Cherche la DERNIÈRE occurrence de `needle` comme mot (ou groupe de mots) isolé dans `text`,
// insensible à la casse, en ne regardant qu'entre les indices [lowerBoundIdx, upperBoundIdx].
// Renvoie -1 si aucune occurrence valide n'existe dans cette fenêtre.
// Renvoie {idx, len} de la dernière occurrence valide, ou null. `len` peut dépasser
// needle.length d'un caractère lorsqu'un simple "s" de pluriel français a été toléré juste
// après (ex. needle "Forêt" trouvé dans "forêts") — inclus dans le lien pour souligner le mot
// entier plutôt que de laisser le "s" final en dehors, seul, juste après le lien.
function lastWordIndexCI(text, needle, upperBoundIdx, lowerBoundIdx){
  const hayLower = text.toLowerCase();
  const needleLower = needle.toLowerCase();
  let fromIndex = upperBoundIdx;
  while(fromIndex >= lowerBoundIdx){
    const idx = hayLower.lastIndexOf(needleLower, fromIndex);
    if(idx === -1 || idx < lowerBoundIdx) return null;
    const beforeCh = idx > 0 ? text[idx-1] : "";
    let len = needle.length;
    if(text[idx+len] === "s" || text[idx+len] === "S") len++;
    const afterCh = idx+len < text.length ? text[idx+len] : "";
    if(!isWordChar(beforeCh) && !isWordChar(afterCh)) return { idx, len };
    fromIndex = idx - 1;
  }
  return null;
}

// Repère chaque citation "(voir la fiche/les fiches « A »[, « B »][ et « C »])", et pour
// CHACUNE : ne la remplace que si TOUS les noms qu'elle cite se résolvent à la fois vers une
// cible connue (LORE_LINK_TARGETS) ET vers une occurrence littérale antérieure dans le texte
// (recherchée entre la fin de la citation précédente et le début de celle-ci, pour ne jamais
// relier deux fois le même mot). Tout ou rien par citation : si un seul des noms cités ne se
// résout pas, la citation entière reste intacte plutôt que de risquer de perdre un renvoi en
// silence — mieux vaut un renvoi non cliquable qu'un renvoi disparu.
function linkifyLore(text){
  const citationRe = /\(voir (?:la fiche|les fiches) («[^»]+»(?:\s*(?:,|et)\s*«[^»]+»)*)\)/g;
  const edits = []; // {start, end, html} — remplace text.slice(start,end) par html (vide = suppression)
  let m;
  let consumedUntil = 0;
  while((m = citationRe.exec(text))){
    const citationStart = m.index;
    const citationEnd = citationStart + m[0].length;
    const names = [...m[1].matchAll(/«\s*([^»]+?)\s*»/g)].map(x => x[1]);
    const resolved = [];
    let ok = true;
    for(const name of names){
      const target = LORE_LINK_TARGETS[name];
      if(!target){ ok = false; break; }
      const found = lastWordIndexCI(text, name, citationStart - 1, consumedUntil);
      if(!found){ ok = false; break; }
      resolved.push({ idx: found.idx, len: found.len, target });
    }
    if(ok){
      for(const r of resolved){
        const shown = text.slice(r.idx, r.idx + r.len); // garde la casse réelle du texte (et le "s" pluriel toléré, s'il y en a un)
        const attr = r.target.type === "deity" ? "data-deity" : "data-symbol";
        const cls = r.target.type === "deity" ? "clickable-deity" : "clickable-symbol";
        const html = `<span class="${cls}" ${attr}="${escapeHTML(r.target.id)}">${escapeHTML(shown)}</span>`;
        edits.push({ start:r.idx, end:r.idx+r.len, html });
      }
      let delStart = citationStart;
      if(text[delStart-1] === " ") delStart--;
      edits.push({ start: delStart, end: citationEnd, html: "" });
    }
    consumedUntil = citationEnd;
  }
  edits.sort((a,b)=>a.start-b.start);
  const cleaned = [];
  let cursor = 0;
  for(const e of edits){
    if(e.start < cursor) continue; // chevauchement rare : on garde le premier, ignore le suivant
    cleaned.push(e);
    cursor = e.end;
  }
  let out = "", pos = 0;
  for(const e of cleaned){
    out += escapeHTML(text.slice(pos, e.start));
    out += e.html;
    pos = e.end;
  }
  out += escapeHTML(text.slice(pos));
  return out;
}

/* ===================== NAVIGATION ===================== */

let navStack = [];
let currentScreen = { type: "home" };

function go(screen){
  navStack.push(currentScreen);
  currentScreen = screen;
  render();
  window.scrollTo(0, 0);
}

function back(){
  currentScreen = navStack.pop() || { type: "home" };
  render();
  window.scrollTo(0, 0);
}

// Depuis le menu fixe : toujours repartir d'une pile vide plutôt que d'empiler sans fin —
// chaque onglet est une racine, pas une étape de plus dans une chaîne de « ← Retour ».
function goToTab(type){
  navStack = [];
  currentScreen = { type };
  render();
  window.scrollTo(0, 0);
}

/* ===================== DONNÉES DÉRIVÉES ===================== */

// Liste triée une seule fois : [id, nom affiché, note] pour chaque figure.
const FIGURE_ENTRIES = Object.keys(DEITY_NOTES)
  .map(id => [id, id.charAt(0).toUpperCase() + id.slice(1), DEITY_NOTES[id]])
  .sort((a, b) => a[1].localeCompare(b[1], "fr"));

const SYMBOL_ENTRIES = Object.entries(SYMBOL_LIBRARY)
  .map(([id, s]) => [id, s])
  .sort((a, b) => a[1].label.localeCompare(b[1].label, "fr"));

// Index inverse : pour une figure donnée, quels symboles la citent dans leurs liens.
function symbolsLinkingTo(deityId){
  return SYMBOL_ENTRIES.filter(([, s]) => (s.links || []).includes(deityId));
}

function deityPortraitClass(id){
  return DEITY_PORTRAIT_WIDE.has(id) ? "deity-portrait deity-portrait-wide" : "deity-portrait";
}

// Hash djb2, déterministe : sert à choisir la « figure du jour » à partir de la date du
// jour — la même figure pour tout le monde, stable toute la journée, qui change le
// lendemain, sans jamais avoir besoin de stocker quoi que ce soit.
function djb2Hash(str){
  let hash = 5381;
  for(let i = 0; i < str.length; i++){
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash;
}

function figureOfTheDay(){
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  return FIGURE_ENTRIES[djb2Hash(key) % FIGURE_ENTRIES.length];
}

/* ===================== RENDU : ÉCRANS ===================== */

function figureOfTheDayHTML(){
  const [id, name, note] = figureOfTheDay();
  const portrait = DEITY_PORTRAITS[id];
  return `
    <section class="fotd">
      <h2 class="fotd-label">Figure du jour</h2>
      <button class="fotd-card" data-nav="figureDetail" data-id="${escapeHTML(id)}">
        ${portrait ? `<img class="fotd-portrait" src="${escapeHTML(portrait)}" alt="${escapeHTML(name)}" loading="lazy">` : ""}
        <span class="fotd-text">
          <span class="fotd-name">${escapeHTML(name)}</span>
          <span class="fotd-note">${escapeHTML(note)}</span>
        </span>
      </button>
    </section>
  `;
}

function renderHome(){
  return `
    <header class="hero">
      <div class="hero-mark">⚡</div>
      <h1>Panthéon</h1>
      <p class="tagline">Apprendre la mythologie grecque — dieux, héros et symboles</p>
    </header>
    ${figureOfTheDayHTML()}
    <div class="tiles">
      <button class="tile" data-nav="figures">
        <span class="tile-icon">🏛️</span>
        <span class="tile-title">Figures mythologiques</span>
        <span class="tile-count">${FIGURE_ENTRIES.length} fiches</span>
      </button>
      <button class="tile" data-nav="symbols">
        <span class="tile-icon">🔱</span>
        <span class="tile-title">Bibliothèque symbolique</span>
        <span class="tile-count">${SYMBOL_ENTRIES.length} symboles</span>
      </button>
      <div class="tile tile-soon" aria-disabled="true">
        <span class="tile-icon">🌳</span>
        <span class="tile-title">Généalogie des dieux</span>
        <span class="tile-count tile-badge">Bientôt</span>
      </div>
    </div>
  `;
}

// Recherche insensible aux accents : "Acteon" doit trouver "Actéon" aussi bien que "acteon".
// NFD décompose chaque lettre accentuée en lettre nue + diacritique séparé, qu'il suffit
// ensuite de retirer (plage Unicode des marques combinantes).
function normalizeSearch(str){
  return String(str || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function figureRowHTML([id, name, note]){
  return `<button class="list-item" data-nav="figureDetail" data-id="${escapeHTML(id)}" data-search="${escapeHTML(normalizeSearch(name + " " + note))}">
    <span class="list-item-title">${escapeHTML(name)}</span>
    <span class="list-item-note">${escapeHTML(note)}</span>
  </button>`;
}

function renderFiguresGrid(query){
  const q = normalizeSearch(query).trim();
  const list = q ? FIGURE_ENTRIES.filter(e => normalizeSearch(e[1] + " " + e[2]).includes(q)) : FIGURE_ENTRIES;
  if(!list.length) return `<p class="empty">Aucune figure ne correspond à « ${escapeHTML(query)} ».</p>`;
  return `<div class="list">${list.map(figureRowHTML).join("")}</div>`;
}

function renderFigures(){
  return `
    <div class="screen-header">
      <h2>Figures mythologiques</h2>
    </div>
    <input type="search" class="search" id="figuresSearch" placeholder="Chercher une figure (nom, rôle...)">
    <div id="figuresGrid">${renderFiguresGrid("")}</div>
  `;
}

function symbolRowHTML([id, s]){
  return `<button class="list-item" data-nav="symbolDetail" data-id="${escapeHTML(id)}" data-search="${escapeHTML(normalizeSearch(s.label + " " + s.desc))}">
    <span class="list-item-title">${escapeHTML(s.label)}</span>
    <span class="list-item-note">${escapeHTML(s.desc)}</span>
  </button>`;
}

function renderSymbolsGrid(query){
  const q = normalizeSearch(query).trim();
  const list = q ? SYMBOL_ENTRIES.filter(([, s]) => normalizeSearch(s.label + " " + s.desc).includes(q)) : SYMBOL_ENTRIES;
  if(!list.length) return `<p class="empty">Aucun symbole ne correspond à « ${escapeHTML(query)} ».</p>`;
  return `<div class="list">${list.map(symbolRowHTML).join("")}</div>`;
}

function renderSymbols(){
  return `
    <div class="screen-header">
      <h2>Bibliothèque symbolique</h2>
    </div>
    <input type="search" class="search" id="symbolsSearch" placeholder="Chercher un symbole">
    <div id="symbolsGrid">${renderSymbolsGrid("")}</div>
  `;
}

function relatedChipsHTML(entries, kind){
  if(!entries.length) return "";
  const attr = kind === "deity" ? "data-nav=\"figureDetail\"" : "data-nav=\"symbolDetail\"";
  const cls = kind === "deity" ? "chip" : "chip chip-symbol";
  const title = kind === "deity" ? "Figures associées" : "Symboles associés";
  return `
    <div class="related">
      <h3>${title}</h3>
      <div class="chips">
        ${entries.map(([id, val]) => {
          const label = kind === "deity" ? (id.charAt(0).toUpperCase() + id.slice(1)) : val.label;
          const icon = kind === "symbol" ? `${val.icon || "✦"} ` : "";
          return `<button class="${cls}" ${attr} data-id="${escapeHTML(id)}">${icon}${escapeHTML(label)}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderFigureDetail(id){
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  const note = DEITY_NOTES[id];
  const paragraphs = DEITY_LORE[id] || [];
  const portrait = DEITY_PORTRAITS[id];
  const inlinePortraits = DEITY_INLINE_PORTRAITS[id] || [];
  const related = symbolsLinkingTo(id);
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail">
      ${portrait ? `<img class="${deityPortraitClass(id)}" src="${escapeHTML(portrait)}" alt="${escapeHTML(name)}" loading="lazy">` : ""}
      <h2>${escapeHTML(name)}</h2>
      <p class="note">${escapeHTML(note)}</p>
      ${paragraphs.length ? `<h3>Le mythe</h3>${paragraphs.map(p => {
        const inline = inlinePortraits.find(cfg => p.includes(cfg.match));
        const inlineClass = inline?.wide ? "deity-portrait-inline deity-portrait-inline-wide" : "deity-portrait-inline";
        return `${inline ? `<img class="${inlineClass}" src="${escapeHTML(inline.src)}" alt="${escapeHTML(inline.alt)}" loading="lazy">` : ""}<p class="lore-text">${linkifyLore(p)}</p>`;
      }).join("")}` : ""}
      ${relatedChipsHTML(related, "symbol")}
    </article>
  `;
}

function renderSymbolDetail(id){
  const s = SYMBOL_LIBRARY[id];
  const related = (s.links || []).map(dId => [dId, dId]).filter(([dId]) => dId in DEITY_NOTES);
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail">
      <div class="symbol-icon-big">${s.icon || "✦"}</div>
      <h2>${escapeHTML(s.label)}</h2>
      <p class="note">${escapeHTML(s.desc)}</p>
      ${(s.lore || []).length ? `<h3>Aux origines du symbole</h3>${s.lore.map(p => `<p class="lore-text">${linkifyLore(p)}</p>`).join("")}` : ""}
      ${relatedChipsHTML(related, "deity")}
    </article>
  `;
}

/* ===================== RENDU : MENU FIXE ===================== */

const TABS = [
  { type: "home", icon: "🏠", label: "Accueil" },
  { type: "figures", icon: "🏛️", label: "Figures" },
  { type: "symbols", icon: "🔱", label: "Symboles" },
];

// Un onglet du bas reste actif tant qu'on est sur une fiche de sa section (figureDetail
// pour l'onglet Figures, symbolDetail pour l'onglet Symboles), pas seulement sur la liste
// elle-même — sinon le menu du bas paraîtrait « éteint » dès qu'on ouvre une fiche.
function activeTabType(){
  if(currentScreen.type === "figureDetail") return "figures";
  if(currentScreen.type === "symbolDetail") return "symbols";
  return currentScreen.type;
}

function renderBottomNav(){
  const active = activeTabType();
  return `
    <nav class="bottom-nav">
      ${TABS.map(t => `<button class="nav-tab${t.type===active?" active":""}" data-tab="${t.type}">
        <span class="nav-tab-icon">${t.icon}</span>
        <span class="nav-tab-label">${t.label}</span>
      </button>`).join("")}
      <div class="nav-tab nav-tab-soon" aria-disabled="true">
        <span class="nav-tab-icon">🌳</span>
        <span class="nav-tab-label">Généalogie</span>
      </div>
    </nav>
  `;
}

/* ===================== RENDU : DISPATCH ===================== */

function render(){
  const app = document.getElementById("app");
  let html;
  switch(currentScreen.type){
    case "figures": html = renderFigures(); break;
    case "figureDetail": html = renderFigureDetail(currentScreen.id); break;
    case "symbols": html = renderSymbols(); break;
    case "symbolDetail": html = renderSymbolDetail(currentScreen.id); break;
    default: html = renderHome();
  }
  app.innerHTML = html;
  document.getElementById("bottomNav").innerHTML = renderBottomNav();
  bindScreenEvents();
}

// Un seul écouteur, posé une fois pour toutes sur le conteneur stable #app (délégation
// d'événements) : il continue de fonctionner quel que soit le contenu réinjecté à chaque
// render(), sans jamais avoir besoin d'être ré-attaché. Même principe pour #bottomNav, fixe
// et jamais remplacé dans son intégralité (seul son innerHTML est rafraîchi à chaque render
// pour mettre à jour l'onglet actif).
function bindAppClickDelegation(){
  document.getElementById("app").addEventListener("click", e => {
    const navEl = e.target.closest("[data-nav]");
    if(navEl){
      const nav = navEl.dataset.nav;
      if(nav === "back") back();
      else if(nav === "figures") goToTab("figures");
      else if(nav === "symbols") goToTab("symbols");
      else if(nav === "figureDetail") go({ type: "figureDetail", id: navEl.dataset.id });
      else if(nav === "symbolDetail") go({ type: "symbolDetail", id: navEl.dataset.id });
      return;
    }
    const deityEl = e.target.closest("[data-deity]");
    if(deityEl){ go({ type: "figureDetail", id: deityEl.dataset.deity }); return; }
    const symbolEl = e.target.closest("[data-symbol]");
    if(symbolEl){ go({ type: "symbolDetail", id: symbolEl.dataset.symbol }); return; }
  });

  document.getElementById("bottomNav").addEventListener("click", e => {
    const tabEl = e.target.closest("[data-tab]");
    if(tabEl) goToTab(tabEl.dataset.tab);
  });
}

// Ré-attaché après chaque render() : les champs de recherche, eux, sont recréés à chaque
// fois (innerHTML remplacé), donc leurs écouteurs doivent l'être aussi.
function bindScreenEvents(){
  const figuresSearch = document.getElementById("figuresSearch");
  if(figuresSearch){
    figuresSearch.addEventListener("input", () => {
      document.getElementById("figuresGrid").innerHTML = renderFiguresGrid(figuresSearch.value);
    });
  }
  const symbolsSearch = document.getElementById("symbolsSearch");
  if(symbolsSearch){
    symbolsSearch.addEventListener("input", () => {
      document.getElementById("symbolsGrid").innerHTML = renderSymbolsGrid(symbolsSearch.value);
    });
  }
}

/* ===================== INIT ===================== */

bindAppClickDelegation();
render();

if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
