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

const SYMBOL_LIBRARY = {"porte":{"icon":"🚪","label":"Porte","category":"Lieux & passages","desc":"Seuil, choix à faire, passage d'un état à un autre."},"chemin":{"icon":"🛤","label":"Chemin","category":"Lieux & passages","desc":"Évolution en cours, quête, direction prise plutôt qu'imposée."},"pont":{"icon":"🌉","label":"Pont","category":"Lieux & passages","desc":"Transition, lien construit entre deux états qui semblaient séparés."},"grotte":{"icon":"🕳","label":"Grotte","category":"Lieux & passages","desc":"Inconscient, retrait nécessaire, initiation loin du regard des autres."},"montagne":{"icon":"⛰","label":"Montagne","category":"Lieux & passages","desc":"Épreuve, élévation progressive, objectif qui se mérite."},"forêt":{"icon":"🌲","label":"Forêt","category":"Lieux & passages","desc":"Inconnu, instinct, risque de s'égarer avant de retrouver son chemin."},"mer":{"icon":"🌊","label":"Mer","category":"Lieux & passages","desc":"Inconscient, immensité, départ vers un ailleurs incertain."},"rivière":{"icon":"🏞","label":"Rivière","category":"Lieux & passages","desc":"Passage, changement continu, ce qui circule sans jamais s'arrêter."},"temple":{"icon":"🏛","label":"Temple","category":"Lieux & passages","desc":"Connaissance sacrée, initiation, seuil entre le profane et le sacré."},"monde souterrain":{"icon":"⚱","label":"Enfer / monde souterrain","category":"Lieux & passages","desc":"Transformation profonde, mort symbolique, vérité qui ne peut plus rester cachée."},"labyrinthe":{"icon":"🌀","label":"Labyrinthe","category":"Lieux & passages","desc":"Épreuve complexe, chemin qui s'égare avant de se retrouver — à condition d'avoir un fil à suivre."},"caducée":{"icon":"⚕","label":"Caducée","category":"Mythologie","desc":"Attribut d'Hermès : médiation, circulation, communication entre des mondes séparés."},"chouette":{"icon":"🦉","label":"Chouette","category":"Mythologie","desc":"Attribut d'Athéna : sagesse, observation, vision claire dans l'obscurité.","atGlance":"L'animal le plus immédiatement reconnaissable d'Athéna, dont la capacité supposée à voir dans l'obscurité en a fait une image naturelle de la clairvoyance et du discernement.","why":"L'association précède peut-être Athéna elle-même : l'épithète homérique « Glaukôpis » (aux yeux pers/de chouette) suggère un lien remontant à des cultes pré-classiques, avant même que la déesse ne soit pleinement définie comme on la connaît. La capacité de l'oiseau à voir la nuit — quand tous les autres animaux diurnes sont aveugles — en fait, par analogie directe, l'image d'une intelligence qui perçoit ce que les autres ne voient pas.","links":["athéna"],"lore":["La chouette accompagne Athéna et devient l'un des animaux les plus immédiatement reconnaissables de la déesse.","Les Grecs lui attribuaient une capacité à voir dans l'obscurité. Cette particularité en faisait une image naturelle de la clairvoyance : là où les autres ne voient rien, la chouette voit.","Elle correspond donc parfaitement à Athéna, dont la sagesse consiste non seulement à accumuler des connaissances, mais surtout à observer, comprendre et discerner avant d'agir.","Homère donne d'ailleurs à Athéna l'épithète de « Glaukôpis », qu'on traduit par « aux yeux pers » ou « au regard de chouette » — un lien si ancien entre la déesse et l'oiseau qu'il remonte peut-être à des cultes antérieurs à l'époque classique. Les Athéniens frappèrent plus tard leur monnaie d'argent, la fameuse tétradrachme, à l'effigie de la chouette : une pièce si répandue dans tout le bassin méditerranéen qu'on la surnommait simplement « la chouette ».","La chouette est devenue un symbole de sagesse, d'observation, de discernement, de connaissance et de clairvoyance.","La chouette est particulièrement associée à Athéna."],"deities":[{"id":"athéna","role":"attribut principal, présent dans l'iconographie dès l'époque archaïque","certainty":"attesté"}],"dimensions":[{"axis":"sagesse","text":"discernement plutôt que simple accumulation de savoir"},{"axis":"vigilance","text":"une vision qui perce l'obscurité que d'autres ne pénètrent pas"},{"axis":"identité civique","text":"symbole d'Athènes elle-même, via la monnaie"}],"iconography":"La chouette figure sur les tétradrachmes athéniens en argent dès la fin du VIe siècle av. J.-C., toujours de profil, associée au profil d'Athéna au droit et à un rameau d'olivier — une monnaie si largement diffusée dans le commerce méditerranéen qu'on la désignait simplement par le nom de l'oiseau (« glaux »).","cult":"Des chouettes vivantes étaient semble-t-il tolérées, voire encouragées, sur l'Acropole d'Athènes autour du temple d'Athéna — un rapport concret entre l'animal réel et le lieu de culte de la déesse, documenté par des sources antiques tardives plutôt que par une prescription religieuse formelle.","sources":["Homère, Iliade, I, 206 (« Glaukôpis »)","Aristophane, Les Oiseaux, v. 301 (référence à « porter des chouettes à Athènes »)"],"relatedSymbols":["olivier","corbeau","araignée"]},"paon":{"icon":"🦚","label":"Paon","category":"Mythologie","desc":"Attribut d'Héra : beauté, vigilance, souveraineté légitime."},"foudre":{"icon":"⚡","label":"Foudre","category":"Mythologie","desc":"Attribut de Zeus : autorité, révélation soudaine, jugement qui s'impose de lui-même.","atGlance":"L'arme forgée par les Cyclopes pour Zeus après sa victoire sur les Titans, devenue l'instrument par excellence de son autorité — et, une fois, la cause involontaire de la mort de celle qu'il aimait.","why":"Le pouvoir de frapper à distance, sans préavis et sans recours, correspond directement à la fonction de Zeus comme garant final de l'ordre cosmique : contrairement à une arme de mêlée, la foudre agit depuis le ciel, hors d'atteinte, ce qui en fait moins une arme de combat qu'un instrument de jugement.","links":["zeus"],"lore":["La foudre est l'arme et l'emblème de Zeus.","Après avoir vaincu les Titans, Zeus reçoit des Cyclopes la foudre comme arme divine. Elle devient ensuite l'instrument grâce auquel il impose son autorité et punit ceux qui défient l'ordre des dieux.","Mais la foudre possède également une dimension de révélation : elle surgit brutalement dans le ciel et transforme la nuit en un éclair de lumière.","Zeus l'utilisa un jour malgré lui contre celle qu'il aimait : Sémélé, désireuse de voir son amant divin sous sa forme véritable, l'exigea de lui — et fut instantanément réduite en cendres par l'éclat de la foudre, que nul mortel ne peut contempler sans en mourir (voir la fiche « Sémélé »).","Elle est donc devenue un symbole de puissance divine, d'autorité, de révélation soudaine, de destruction et de transformation brutale.","La foudre est particulièrement associée à Zeus."],"deities":[{"id":"zeus","role":"arme et emblème souverain, reçue des Cyclopes","certainty":"attesté"}],"dimensions":[{"axis":"autorité","text":"instrument du jugement divin, hors de portée mortelle"},{"axis":"révélation","text":"lumière brutale qui déchire l'obscurité"},{"axis":"destruction","text":"la mort de Sémélé, incapable de survivre à la vraie forme de Zeus"}],"iconography":"Zeus est figuré brandissant la foudre — un faisceau stylisé, souvent ailé — sur les vases attiques à figures noires et rouges dès l'époque archaïque ; c'est l'un des attributs divins les plus anciens et les plus constants de toute l'iconographie grecque.","sources":["Hésiode, Théogonie, v. 501-506 (don des Cyclopes)","Euripide, Bacchantes, v. 1-9 (mort de Sémélé)"],"relatedSymbols":["éclair","sceptre","aigle"]},"trident":{"icon":"🔱","label":"Trident","category":"Mythologie","desc":"Attribut de Poséidon : puissance sur les forces naturelles instables — mer, séismes, émotions profondes."},"lyre":{"icon":"🎵","label":"Lyre","category":"Mythologie","desc":"Attribut d'Apollon : harmonie, vérité transmise par la beauté plutôt qu'imposée."},"arc":{"icon":"🏹","label":"Arc","category":"Mythologie","desc":"Attribut d'Artémis la chasseresse et d'Éros : intention, concentration, désir qui vise juste sans toujours consulter la raison."},"torches":{"icon":"🔥","label":"Torches","category":"Mythologie","desc":"Attribut d'Hécate : illumination, guidance dans l'obscurité sans jamais imposer le chemin."},"vigne":{"icon":"🍇","label":"Vigne","category":"Mythologie","desc":"Attribut de Dionysos : plaisir, transformation, abondance instinctive."},"grenade":{"icon":"🔴","label":"Grenade","category":"Mythologie","desc":"Le fruit aux innombrables graines : fertilité, abondance, cycle, attachement, ce qui relie au monde souterrain — associée à Perséphone et Hadès."},"épis":{"icon":"🌾","label":"Épis de blé","category":"Mythologie","desc":"Attribut de Déméter : récolte, travail, nourriture, cycle des saisons."},"char solaire":{"icon":"☀","label":"Char solaire","category":"Mythologie","desc":"Attribut d'Hélios (et repris par Apollon) : clarté, trajectoire réglée, rien ne peut rester caché sous cette lumière."},"arc-en-ciel":{"icon":"🌈","label":"Arc-en-ciel","category":"Mythologie","desc":"Attribut d'Iris : médiation, passage, réconciliation entre deux états."},"flûte":{"icon":"🎶","label":"Flûte","category":"Mythologie","desc":"Attribut de Pan : instinct non policé par la raison, appel de la nature brute."},"balance":{"icon":"⚖","label":"Balance","category":"Mythologie","desc":"Attribut de Thémis (et de Minos au Jugement) : équilibre, justice, mesure exacte avant toute décision."},"ailes":{"icon":"🕊","label":"Ailes","category":"Mythologie","desc":"Selon le contexte : Niké (victoire), Hermès (rapidité, message) ou Éros (désir qui s'envole). Toujours un mouvement qui échappe à la pesanteur ordinaire."},"couronne":{"icon":"👑","label":"Couronne","category":"Objets mythologiques","desc":"Autorité légitime, accomplissement, souveraineté assumée avec dignité."},"sceptre":{"icon":"🔱","label":"Sceptre","category":"Objets mythologiques","desc":"Pouvoir stable, commandement exercé avec constance plutôt qu'imposé par la force."},"clé":{"icon":"🗝","label":"Clé","category":"Objets mythologiques","desc":"Accès, connaissance réservée, passage qui ne s'ouvre qu'à qui sait où chercher."},"lanterne":{"icon":"🏮","label":"Lanterne","category":"Objets mythologiques","desc":"Recherche, lumière intérieure portée dans l'obscurité plutôt que réponse immédiate."},"torche":{"icon":"🔦","label":"Torche","category":"Objets mythologiques","desc":"Illumination, connaissance transmise, guidance dans l'incertitude."},"flèche":{"icon":"🎯","label":"Flèche","category":"Objets mythologiques","desc":"Direction précise, volonté qui vise, conséquence qui suit le tir."},"miroir":{"icon":"🪞","label":"Miroir","category":"Objets mythologiques","desc":"Introspection, vérité renvoyée, perception de soi parfois inconfortable."},"voile":{"icon":"🧣","label":"Voile","category":"Objets mythologiques","desc":"Secret, connaissance cachée, frontière entre ce qui se montre et ce qui se protège."},"chaîne":{"icon":"⛓","label":"Chaîne","category":"Objets mythologiques","desc":"Attachement, dépendance, lien — la question est toujours de savoir s'il enferme ou s'il peut être dénoué."},"roue":{"icon":"☸","label":"Roue","category":"Objets mythologiques","desc":"Cycle, changement, destin qui tourne sans considération pour le mérite."},"char":{"icon":"🏇","label":"Char","category":"Objets mythologiques","desc":"Direction, maîtrise, progression réglée vers un but choisi."},"corne d'abondance":{"icon":"🐐","label":"Corne d'abondance","category":"Objets mythologiques","desc":"La corne de la chèvre Amalthée : abondance intarissable, don généreux qui ne s'épuise jamais."},"aigle":{"icon":"🦅","label":"Aigle","category":"Animaux","desc":"Hauteur de vue, pouvoir, vision d'ensemble — lié à Zeus."},"serpent":{"icon":"🐍","label":"Serpent","category":"Animaux","desc":"Transformation, connaissance, guérison, lien avec le monde souterrain.","atGlance":"Un animal à la symbolique beaucoup plus riche et ambivalente que le simple mal : guérisseur chez Asclépios, gardien vaincu à Delphes, créature chthonienne liée aux profondeurs et aux secrets.","why":"La mue du serpent — qui semble mourir puis renaître sous une peau neuve — et son habitat souterrain (fissures, grottes) expliquent conjointement pourquoi il devient, dans presque toutes les cultures méditerranéennes anciennes et pas seulement en Grèce, l'animal de la régénération et du monde chthonien à la fois.","links":["hygie"],"lore":["Le serpent possède une symbolique beaucoup plus ancienne et plus complexe que celle d'un simple animal associé au mal.","Il change de peau et semble ainsi mourir puis renaître. Cette capacité a nourri son association avec la transformation et le renouvellement.","Il vit également dans les fissures du sol, les grottes et les lieux cachés. Il appartient donc symboliquement à ce qui se trouve sous la surface : la terre, les profondeurs et le monde souterrain.","Le serpent est aussi associé à Asclépios, dieu de la médecine. Son image enroulée autour du bâton du dieu est devenue un symbole de guérison — sa fille Hygie (voir la fiche « Hygie ») en tient elle aussi un, enroulé autour d'une coupe plutôt qu'un bâton : cette variante précise est restée le symbole international de la pharmacie.","À Delphes, c'est un serpent, Python, gardien de l'ancien oracle de la Terre, qu'Apollon dut vaincre pour s'emparer du sanctuaire et y installer le sien — la prêtresse qui y rendait ensuite les oracles, la Pythie, tenait son nom de ce combat fondateur.","Enfin, dans de nombreux mythes grecs, les serpents gardent des lieux ou des secrets : ils deviennent ainsi des créatures placées entre le monde visible et ce qui est caché.","Le serpent est donc devenu un symbole de transformation, de guérison, de connaissance cachée, de régénération et du monde souterrain.","Le serpent est associé à plusieurs divinités, notamment Asclépios et sa fille Hygie, Athéna, Apollon et les puissances chthoniennes."],"deities":[{"id":"asclépios","role":"bâton à un seul serpent, symbole international de la médecine","certainty":"attesté"},{"id":"hygie","role":"serpent enroulé autour d'une coupe, symbole de la pharmacie","certainty":"attesté"},{"id":"apollon","role":"vainqueur de Python à Delphes, fondateur du sanctuaire","certainty":"attesté"}],"dimensions":[{"axis":"guérison","text":"le bâton d'Asclépios, encore utilisé comme symbole médical"},{"axis":"monde chthonien","text":"habitant des profondeurs, gardien de secrets"},{"axis":"régénération","text":"la mue, image de mort et de renaissance"}],"history":"Le culte de Zeus Meilichios (« le doux »), souvent figuré sous forme de serpent sur des stèles votives, illustre une facette plus ancienne et plus discrète du serpent grec, liée à la purification et à la protection domestique — une tradition distincte du combat héroïque contre le serpent-monstre (Python, l'Hydre) et trop souvent absente des résumés courants du symbole.","sources":["Homère, Hymne homérique à Apollon Pythien (le combat contre Python)"],"relatedSymbols":["caducée","monde souterrain","grotte"]},"chien":{"icon":"🐕","label":"Chien","category":"Animaux","desc":"Gardien des seuils, protection, instinct fidèle — lié à Hécate."},"cheval":{"icon":"🐎","label":"Cheval","category":"Animaux","desc":"Mouvement, liberté, puissance mise en marche."},"pégase":{"icon":"🦄","label":"Pégase","category":"Animaux","desc":"Inspiration, élévation, maîtrise d'une force extraordinaire — monture de Bellérophon."},"dauphin":{"icon":"🐬","label":"Dauphin","category":"Animaux","desc":"Guidance, mer, protection pendant la traversée."},"colombe":{"icon":"🕊","label":"Colombe","category":"Animaux","desc":"Amour, paix — liée à Aphrodite."},"corbeau":{"icon":"🐦‍⬛","label":"Corbeau","category":"Animaux","desc":"Présage, connaissance du monde invisible."},"abeille":{"icon":"🐝","label":"Abeille","category":"Animaux","desc":"Travail, organisation collective, abondance construite patiemment."},"papillon":{"icon":"🦋","label":"Papillon","category":"Animaux","desc":"Transformation, âme, métamorphose accomplie."},"cerf":{"icon":"🦌","label":"Cerf","category":"Animaux","desc":"Nature, intuition, passage entre deux mondes."},"taureau":{"icon":"🐂","label":"Taureau","category":"Animaux","desc":"Puissance brute, désir irrésistible — et, parfois, ce qu'elle engendre de monstrueux."},"cygne":{"icon":"🦢","label":"Cygne","category":"Animaux","desc":"Métamorphose séduisante, beauté qui dissimule un dessein — lié à Zeus."},"araignée":{"icon":"🕷","label":"Araignée","category":"Animaux","desc":"Habileté sans limite, orgueil qui défie trop haut — la punition d'Arachné."},"bélier":{"icon":"🐏","label":"Bélier","category":"Animaux","desc":"Le bélier à la Toison d'or : sacrifice salvateur, guide céleste, quête à accomplir."},"crabe":{"icon":"🦀","label":"Crabe","category":"Animaux","desc":"Envoyé par Héra contre Héraclès : loyauté obstinée, sacrifice sans éclat."},"lion":{"icon":"🦁","label":"Lion","category":"Animaux","desc":"Lié à Héraclès : courage, force domptée sans violence gratuite."},"scorpion":{"icon":"🦂","label":"Scorpion","category":"Animaux","desc":"Envoyé par Apollon contre Orion : jalousie protectrice, mise à distance éternelle."},"chèvre":{"icon":"🐐","label":"Chèvre","category":"Animaux","desc":"Amalthée, qui nourrit Zeus enfant en secret : dévouement discret, protection généreuse."},"poisson":{"icon":"🐟","label":"Poisson","category":"Animaux","desc":"Aphrodite et Éros changés en poissons pour fuir Typhon : fuite salvatrice, lien qui ne se rompt pas."},"laurier":{"icon":"🌿","label":"Laurier","category":"Plantes","desc":"Victoire, gloire, accomplissement mérité après l'effort.","atGlance":"L'arbre en lequel Daphné fut changée pour échapper à l'amour d'Apollon — qui, ne pouvant l'avoir, en fit son emblème permanent et la parure de tous les vainqueurs.","why":"Le laurier reste vert toute l'année (arbre à feuillage persistant), une propriété naturelle qui en a fait, comme le lierre ou le cyprès, un symbole de permanence — mais ici une permanence liée non à la mort (cyprès) mais à la gloire qui, elle non plus, ne se flétrit pas.","links":["apollon","éros"],"lore":["Le laurier est intimement lié à Apollon. Selon le mythe, Apollon, frappé d'une flèche d'or par Éros après l'avoir raillé sur son habileté à l'arc (voir la fiche « Éros »), tomba éperdument amoureux de la nymphe Daphné — elle-même atteinte d'une flèche de plomb qui la rendit incapable de l'aimer en retour. Daphné, refusant ses avances, demanda à être sauvée et fut transformée en laurier par son père, le dieu-fleuve Pénée.","Apollon, comprenant qu'il ne pourrait jamais l'avoir, déclara alors que le laurier lui serait désormais consacré. Il en porta une couronne et en fit un arbre sacré.","Les Grecs offrirent ensuite des couronnes de laurier aux vainqueurs, aux poètes et à ceux qui avaient accompli de grandes choses. À Delphes, le laurier était également associé aux pratiques prophétiques d'Apollon.","Les jeux Pythiques, célébrés tous les quatre ans à Delphes en l'honneur d'Apollon, récompensaient ainsi leurs vainqueurs — musiciens, poètes et athlètes — d'une couronne de laurier coupé dans la vallée voisine de Tempé, là où, selon la légende, Apollon lui-même s'était purifié après avoir tué le serpent Python (voir la fiche « Serpent »).","Le laurier est ainsi devenu un symbole de victoire, de gloire, d'accomplissement, de poésie, de prophétie et de reconnaissance.","Le laurier est particulièrement associé à Apollon et à Daphné."],"deities":[{"id":"apollon","role":"consacre le laurier après la métamorphose de Daphné","certainty":"attesté"},{"id":"daphné","role":"changée en laurier pour échapper à Apollon","certainty":"attesté"}],"dimensions":[{"axis":"victoire","text":"couronne des vainqueurs des jeux Pythiques"},{"axis":"prophétie","text":"associé aux pratiques oraculaires de Delphes"},{"axis":"amour non réciproque","text":"un attachement qui devient culte plutôt que possession"}],"cult":"Le pèlerin qui allait consulter l'oracle de Delphes passait traditionnellement par la vallée de Tempé pour y couper le laurier destiné aux jeux Pythiques — un geste rituel géographiquement précis, pas une simple image littéraire.","sources":["Ovide, Métamorphoses, I, 452-567 (Apollon et Daphné — réception latine détaillée)","Pausanias, Description de la Grèce, X, 7 (jeux Pythiques)"],"relatedSymbols":["couronne","lyre","serpent"]},"olivier":{"icon":"🫒","label":"Olivier","category":"Plantes","desc":"Paix, sagesse, prospérité durable.","atGlance":"L'arbre offert par Athéna à Athènes contre la source d'eau salée de Poséidon — un don jugé plus précieux parce que directement utile à la vie quotidienne, choix fondateur qui donne son nom à la cité.","why":"Le concours entre Athéna et Poséidon oppose explicitement deux types de dons : une démonstration de puissance spectaculaire (une source jaillie du sol) contre une utilité concrète et durable (un arbre nourricier). Le choix des Athéniens en faveur de l'olivier est donc un jugement de valeur explicite sur ce que la civilisation doit privilégier — la sagesse pratique plutôt que la force pure.","links":["athéna","poséidon"],"lore":["L'olivier est lié à Athéna et à la naissance symbolique d'Athènes. Lorsque Poséidon et Athéna se disputèrent la protection de la cité, les deux divinités offrirent un présent aux habitants.","Poséidon fit jaillir une source d'eau salée. Athéna planta quant à elle le premier olivier. Les habitants considérèrent ce cadeau comme plus précieux, car l'arbre pouvait leur donner de la nourriture, de l'huile, du bois et de la lumière.","Athéna devint ainsi la protectrice de la cité, qui prit son nom : Athènes.","Les oliviers sacrés d'Athènes, descendants directs de celui planté par Athéna, étaient protégés par une loi si stricte que déraciner l'un d'eux, même sur son propre terrain, pouvait valoir l'exil à son propriétaire — preuve que ce don, des siècles après le mythe, restait toujours traité comme un bien appartenant à la cité entière plutôt qu'à un seul homme.","L'olivier est devenu le symbole de la paix, de la sagesse, de la prospérité, de la civilisation et de la protection divine.","L'olivier est particulièrement associé à Athéna."],"deities":[{"id":"athéna","role":"plante le premier olivier, devient protectrice d'Athènes","certainty":"attesté"},{"id":"poséidon","role":"concurrent malheureux, offre une source d'eau salée","certainty":"attesté"}],"dimensions":[{"axis":"civilisation","text":"un don utile plutôt qu'une démonstration de puissance"},{"axis":"protection légale","text":"les oliviers sacrés, propriété collective protégée par la loi"}],"cult":"Les moriai (oliviers sacrés d'Athènes) faisaient l'objet d'une surveillance légale attestée par les discours judiciaires attiques (notamment Lysias) : les déraciner, même par accident, exposait à des poursuites graves — un exemple rare où mythe fondateur et droit civique réel se rejoignent directement.","sources":["Hérodote, Histoires, VIII, 55","Apollodore, Bibliothèque, III, 14, 1 (le concours Athéna/Poséidon)"],"relatedSymbols":["olive","chouette","corne d'abondance"]},"blé":{"icon":"🌾","label":"Blé","category":"Plantes","desc":"Récolte, travail, nourriture, cycle des saisons."},"cyprès":{"icon":"🌲","label":"Cyprès","category":"Plantes","desc":"Mort, mémoire, passage — arbre funéraire qui reste vert toute l'année."},"rose":{"icon":"🌹","label":"Rose","category":"Plantes","desc":"Amour, beauté, désir — et la vulnérabilité qui va avec."},"myrte":{"icon":"🌸","label":"Myrte","category":"Plantes","desc":"Amour, mariage — liée à Aphrodite."},"lierre":{"icon":"🍃","label":"Lierre","category":"Plantes","desc":"Attachement, immortalité — lié à Dionysos."},"lotus":{"icon":"🪷","label":"Lotus","category":"Plantes","desc":"Émergence, purification, renaissance depuis les eaux troubles."},"pavot":{"icon":"🌺","label":"Pavot","category":"Plantes","desc":"Sommeil, oubli, rêve — ce qui apaise mais peut aussi endormir la vigilance."},"crocus":{"icon":"🌼","label":"Fleur de crocus","category":"Plantes","desc":"Renouveau, printemps, transformation qui recommence."},"chêne":{"icon":"🌳","label":"Chêne","category":"Plantes","desc":"Arbre sacré de Zeus : force tranquille, sagesse qui parle par le vent plutôt que par des mots clairs."},"raisin":{"icon":"🍇","label":"Raisin","category":"Fruits & graines","desc":"Abondance, plaisir partagé, transformation par la fermentation."},"olive":{"icon":"🫒","label":"Olive","category":"Fruits & graines","desc":"Le fruit concret du don d'Athéna : nourriture, huile, paix, prospérité."},"figue":{"icon":"🫐","label":"Figue","category":"Fruits & graines","desc":"Fécondité douce, plaisir simple, maturité assumée."},"pomme":{"icon":"🍎","label":"Pomme","category":"Fruits & graines","desc":"Beauté, désir et rivalité — le fruit du jugement de Pâris."},"noix":{"icon":"🌰","label":"Noix","category":"Fruits & graines","desc":"Ce qui reste protégé, caché, réservé à qui sait ouvrir la coque."},"graine":{"icon":"🌱","label":"Graine","category":"Fruits & graines","desc":"Potentiel pur, ce qui n'a pas encore germé mais porte déjà toute la forme à venir."},"feu":{"icon":"🔥","label":"Feu","category":"Éléments","desc":"Flamme, étincelle, soleil, fumée : action, volonté, élan."},"eau":{"icon":"💧","label":"Eau","category":"Éléments","desc":"Source, rivière, vague, pluie, miroir : émotion, relation, ce qui circule."},"air":{"icon":"🌬","label":"Air","category":"Éléments","desc":"Vent, souffle, plume, nuage : pensée, décision, clarté mentale."},"terre":{"icon":"🌿","label":"Terre","category":"Éléments","desc":"Racine, pierre, sol, montagne : matière, croissance, incarnation concrète."},"soleil":{"icon":"☀","label":"Soleil","category":"Astres & phénomènes","desc":"Clarté, conscience, vitalité, vérité qui n'a plus besoin de se cacher."},"lune":{"icon":"🌙","label":"Lune","category":"Astres & phénomènes","desc":"Inconscient, intuition, cycles, incertitude qui n'empêche pas d'avancer."},"étoiles":{"icon":"✦","label":"Étoile","category":"Astres & phénomènes","desc":"Orientation, espoir, inspiration retrouvée après l'épreuve."},"aurore":{"icon":"🌅","label":"Aurore","category":"Astres & phénomènes","desc":"Commencement, renaissance, ce qui redémarre après l'obscurité."},"éclipse":{"icon":"🌑","label":"Éclipse","category":"Astres & phénomènes","desc":"Obscurcissement temporaire, transition, révélation qui attend son heure."},"éclair":{"icon":"⚡","label":"Éclair","category":"Astres & phénomènes","desc":"Révélation brutale, rupture soudaine, énergie qui ne prévient pas."},"sanglier":{"icon":"🐗","label":"Sanglier","category":"Animaux","desc":"Sanglier de Calydon et d'Érymanthe, mort d'Adonis : violence sauvage indomptée, souffrance qui suit une offense."},"égide":{"icon":"🛡","label":"Égide","category":"Objets mythologiques","desc":"Le bouclier-peau à tête de Gorgone : protection redoutable, terreur qui repousse par sa seule apparition."},"lance":{"icon":"🗡","label":"Lance","category":"Objets mythologiques","desc":"Arme d'Achille et d'Athéna : force qui blesse et, seule entre toutes, peut aussi guérir la blessure qu'elle a causée."},"fil":{"icon":"🧵","label":"Fil","category":"Objets mythologiques","desc":"Fil d'Ariane, fil des Moires : ce qui guide hors de l'inextricable, ce qui mesure et tranche la durée d'une vie."},"carrefour":{"icon":"✳","label":"Carrefour","category":"Lieux & passages","desc":"Domaine d'Hécate Trioditis : lieu à la fois dangereux et sacré, où l'on déposait des offrandes nocturnes à la déesse."},"source":{"icon":"⛲","label":"Source","category":"Lieux & passages","desc":"Castalie à Delphes, Hippocrène sur l'Hélicon : l'eau qui jaillit de la terre, purifie et inspire."},"ouroboros":{"icon":"♾","label":"Ouroboros","category":"Motifs & concepts","desc":"Le serpent qui se mord la queue : symbole surtout attesté dans l'Égypte antique et l'hermétisme tardif, pas dans le mythe grec classique."},"narcisse-fleur":{"icon":"🥀","label":"Fleur de narcisse","category":"Plantes","desc":"La fleur née du corps de Narcisse, épris de son propre reflet — mais aussi, chez Homère, la fleur que cueillait Perséphone au moment de son enlèvement."}};
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
  // Onze figures ajoutées pour étoffer deux lignées jugées trop peu développées : celle de
  // Cadmos (le cycle thébain) et celle de Zeus et Europe (la Crète de Minos).
  "épaphos":"Fils de Zeus et d'Io, ancêtre des grandes lignées royales d'Argos et de Thèbes.",
  "ino":"Fille de Cadmos, devenue déesse marine sous le nom de Leucothéa après avoir sauté à la mer avec son fils.",
  "autonoë":"Fille de Cadmos, mère du chasseur Actéon, déchiré par ses propres chiens.",
  "agavé":"Fille de Cadmos, mère de Penthée qu'elle mit en pièces en pleine transe bachique.",
  "polydoros":"Fils de Cadmos, roi de Thèbes entre son père et son petit-fils Laïos — à ne pas confondre avec le fils de Priam du même nom.",
  "labdacos":"Fils de Polydoros, il donne son nom à la dynastie des Labdacides — celle de Laïos et d'Œdipe.",
  "laïos":"Roi de Thèbes, père d'Œdipe et victime de la prophétie qu'il tenta en vain de déjouer.",
  "amphion":"Fils de Zeus et d'Antiope, il bâtit avec son frère jumeau Zéthos les murailles de Thèbes au son de sa lyre.",
  "zéthos":"Frère jumeau d'Amphion, il posa de ses mains les fondations des murailles de Thèbes.",
  "rhadamanthys":"Fils de Zeus et d'Europe, frère de Minos, réputé pour sa justice jusque chez les morts.",
  "sarpédon":"Fils de Zeus et d'Europe, frère de Minos, il quitta la Crète pour régner sur la Lycie.",
  // Dix figures ajoutées pour que les enfants déjà recensés (Héraclès, Castor, Clytemnestre,
  // Danaé, Pénélope...) aient tous leur mère ou leur père identifiable, et pour relier
  // définitivement les racines encore isolées (Cadmos/Europe, Danaos/Égyptos, Persée) jusqu'au
  // socle primordial du corpus.
  "alcmène":"Fille d'Électryon, mère d'Héraclès par Zeus, épouse d'Amphitryon.",
  "amphitryon":"Fils d'Alcée, époux d'Alcmène et père légal d'Héraclès, qu'il éleva sans savoir qu'il était de Zeus.",
  "tyndare":"Roi de Sparte, époux de Léda, père mortel de Castor et de Clytemnestre.",
  "icarios":"Fils de Gorgophoné, père de Pénélope.",
  "atrée":"Roi de Mycènes, père d'Agamemnon et de Ménélas, dont la vengeance sur son frère Thyeste maudit toute sa lignée.",
  "thyeste":"Frère jumeau d'Atrée, père d'Égisthe qu'il conçut avec sa propre fille sur l'ordre d'un oracle.",
  "acrisios":"Roi d'Argos, père de Danaé et grand-père de Persée, tué malgré lui par ce petit-fils qu'il avait cru éviter.",
  "bélos":"Fils de Libye, père jumeau d'Égyptos et de Danaos, roi légendaire d'Égypte.",
  "agénor":"Fils de Libye, frère jumeau de Bélos, roi de Phénicie et père de Cadmos et d'Europe.",
  "abas":"Fils de Lyncée et d'Hypermestre, roi d'Argos, père d'Acrisios.",
};
const DEITY_LORE = {"dionysos":[],"hermès":[],"métis":[],"héra":["Fille de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), sœur et épouse de Zeus, Héra règne sur l'Olympe comme protectrice du mariage et garante de l'ordre légitime — un rôle qu'elle défend avec une fermeté que la mythologie associe souvent à la jalousie, tant les infidélités de son époux sont nombreuses.","Elle ne se contente jamais d'observer : elle pousse Sémélé à sa perte par ruse (voir la fiche « Sémélé »), poursuit Héraclès de sa colère toute sa vie durant simplement parce qu'il est le fruit d'une liaison de Zeus (voir la fiche « Héraclès »), et impose à Léto l'interdiction de mettre au monde ses enfants sur la moindre terre ferme, retardant ainsi la naissance d'Apollon et d'Artémis (voir la fiche « Léto »).","Reine avant d'être épouse, elle incarne la légitimité et l'autorité plus que la douceur.","À Argos, son principal foyer de culte, on l'honorait comme Héra Argienne ; mais c'est à Stymphale qu'elle recevait l'hommage le plus original, avec trois sanctuaires distincts dédiés à Héra Pais (l'enfant), Héra Teleia (l'épouse accomplie) et Héra Khéra (la veuve), comme les trois âges d'un même mariage. Une légende argienne ajoutait qu'elle retrouvait chaque année sa virginité en se baignant dans la source de Canathos à Nauplie — un secret réservé à ses mystères, et un renouveau que sa propre réputation de jalousie perpétuelle semble pourtant démentir sans cesse."],"zeus":["Plus jeune fils de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), Zeus échappa au sort de ses frères et sœurs — avalés à la naissance par un père craignant d'être détrôné — grâce à sa mère, qui le cacha dans une grotte du mont Ida en Crète et fit avaler à Cronos une pierre emmaillotée à sa place.","Devenu adulte, il libéra ses frères et sœurs et mena la guerre contre les Titans, dont il sortit vainqueur pour établir un nouvel ordre cosmique sur l'Olympe, dont il devint le souverain incontesté, maître de la foudre.","Garant de l'ordre du monde, il reste pourtant l'un des dieux aux liaisons et aux colères les plus nombreuses de toute la mythologie.","On l'invoquait aussi sous des noms précis, selon la part de sa protection sollicitée : Xénios veillait sur les hôtes et les étrangers, vengeant lui-même toute entorse aux devoirs de l'hospitalité ; Herkeios protégeait l'autel dressé dans la cour de chaque maison, marque d'une famille reconnue comme telle ; et Horkios, le plus redouté, gardait la sincérité des serments — sa statue à Olympie, brandissant la foudre, était si terrifiante qu'aucun athlète ni juge ne s'y serait parjuré de sang-froid. Une facette plus modeste, Zeus Ctésios, veillait quant à elle sur les provisions de chaque foyer (voir la fiche « Ctésios »)."],"chiron":[],"éros":[],"apollon":["Fils de Zeus et de Léto (voir la fiche « Léto »), Apollon naquit avec sa sœur jumelle Artémis sur l'île flottante de Délos, seul lieu qui accepta de les accueillir après qu'Héra eut interdit à toute terre ferme de recevoir l'accouchement de sa rivale.","Dieu de la lumière, de la musique et de la vérité — un rôle solaire parfois confondu avec celui d'Hélios (voir la fiche « Hélios »), qui seul conduit réellement le char du soleil —, Apollon rend depuis son temple de Delphes (voir la fiche « Temple ») des oracles par la voix de la Pythie : sa devise gravée sur le fronton du temple, « Connais-toi toi-même », résume son exigence de clarté.","Chef de chœur des Muses (voir la fiche « Muses »), qu'il conduit sous le nom d'Apollon Musagète, « guide des Muses », il partage avec elles le mont Parnasse et sa source Castalie, non loin de son propre sanctuaire de Delphes.","Plusieurs surnoms rappellent ses différents visages : Pythien, en souvenir du serpent Python vaincu à Delphes ; Phoibos, « le Brillant », pour son éclat solaire ; et Loxias, « l'Ambigu », pour la nature volontairement obscure de ses oracles, qu'il fallait savoir interpréter plutôt que prendre au pied de la lettre. Un autre surnom, Lycien, reste débattu depuis l'Antiquité même : lié au loup, à la lumière ou à la région de Lycie, sans qu'aucune des trois explications ne l'emporte vraiment sur les autres.","Il connut aussi un amour resté sans retour : ayant un jour raillé le petit arc d'Éros (voir la fiche « Éros »), jugé indigne d'un dieu de son rang, il s'attira la vengeance du dieu vexé — frappé à son tour d'une flèche d'or, il s'éprit aussitôt de la nymphe Daphné, elle-même atteinte d'une flèche de plomb qui la rendit incapable de l'aimer en retour. Il la poursuivit sans relâche jusqu'aux rives de son père, le dieu-fleuve Pénée, qui la changea en laurier pour la soustraire à ses avances — Apollon en fit dès lors son arbre sacré, et la couronne de laurier devint le symbole même de la victoire qu'il n'avait pas obtenue ce jour-là (voir la fiche « Laurier »).","Éprise de la princesse thessalienne Coronis (voir la fiche « Coronis »), il apprit d'un corbeau — blanc jusqu'alors — qu'elle lui préférait un mortel alors même qu'elle portait déjà son enfant : furieux, il la fit tuer par Artémis, mais arracha l'enfant du bûcher funéraire in extremis pour le confier à Chiron (voir la fiche « Chiron »). Cet enfant, Asclépios (voir la fiche « Asclépios »), devint un guérisseur si habile qu'il ressuscitait les morts, jusqu'à ce que Zeus, inquiet de le voir bouleverser l'ordre naturel, le foudroie. Fou de chagrin, Apollon se vengea sur les Cyclopes qui avaient forgé cette foudre — un crime qui lui valut d'être condamné à servir un an durant comme simple berger mortel auprès du roi Admète (voir la fiche « Admète »), corvée qu'il transforma en amitié si sincère qu'il obtint plus tard des Parques la grâce de prolonger sa vie. Quant au corbeau messager, resté blanc jusque-là, Apollon le noircit pour toujours en punition de sa nouvelle funeste.","Il aima aussi le jeune prince spartiate Hyacinthe (voir la fiche « Hyacinthe »), avec qui il partageait le goût du disque — jusqu'à ce qu'un disque qu'il lança dévie de sa trajectoire, détourné par le vent jaloux Zéphyr (voir la fiche « Zéphyr »), et frappe mortellement le jeune homme en pleine tempe. Incapable de le sauver, Apollon changea son sang versé en une fleur nouvelle, la jacinthe, sur les pétales de laquelle on croyait pouvoir lire les lettres grecques de son deuil.","Son dernier grand amour resta, lui, sans aucune réciprocité : à la princesse troyenne Cassandre (voir la fiche « Cassandre »), fille de Priam (voir la fiche « Priam »), il offrit le don de prophétie en échange de ses faveurs — mais elle refusa de tenir sa promesse une fois le don reçu. Ne pouvant le lui reprendre, Apollon la frappa d'une malédiction plus cruelle encore : ses prédictions, toujours exactes, ne seraient plus jamais crues par personne — pas même son avertissement, resté sans écho, contre le cheval de bois conçu par Ulysse (voir la fiche « Ulysse »), qui allait livrer Troie aux Grecs."],"thémis":[],"déméter":[],"tyché":[],"héraclès":[],"prométhée":[],"hadès":[],"perséphone":[],"iris":[],"pan":[],"poséidon":["Fils de Cronos et de Rhéa (voir les fiches « Cronos » et « Rhéa »), frère de Zeus et d'Hadès, Poséidon reçut la mer en partage lors de la division du cosmos (voir la fiche « Mer »). D'humeur aussi changeante que les flots qu'il gouverne, il peut aussi bien porter les navires que déchaîner tempêtes et tremblements de terre d'un coup de son trident.","Sa rivalité avec Athéna pour devenir le patron d'Athènes — il fit jaillir une source d'eau salée du rocher, elle offrit un olivier — illustre bien son tempérament : la force spectaculaire face à la sagesse durable, et c'est cette dernière que la ville choisit.","Trois épithètes résument ses domaines mieux que tout autre : Hippios, pour son lien avec les chevaux qu'il aurait lui-même inventés ; Asphaleios, le « sécurisant », invoqué contre les tremblements de terre qu'il pouvait tout aussi bien provoquer que prévenir ; et Pélagios, pour la haute mer elle-même. Homère l'invoque aussi comme Gaieokhos et Ennosigaios, celui qui « tient » et « secoue » la terre — deux noms qui résument à eux seuls un tempérament capable de porter comme de renverser."],"hécate":[],"séléné":[],"hélios":[],"minos":[],"gaïa":[],"chaos":[],"ouranos":[],"nyx":[],"érèbe":[],"tartare":[],"cronos":[],"océan":[],"téthys":[],"hypérion":[],"théia":[],"coéos":[],"phoebé":[],"crios":[],"japet":[],"mnémosyne":[],"épiméthée":[],"ménétios":[],"clymène":[],"athéna":["Née tout armée du crâne de Zeus, après qu'il eut avalé sa mère Métis enceinte (voir la fiche « Métis »), Athéna hérita à la fois de la puissance de son père et de la ruse de sa mère.","Déesse de la sagesse stratégique plutôt que de la guerre brutale, elle protège les héros rusés — Ulysse, Persée, Bellérophon — en leur offrant conseils et objets plutôt qu'en combattant à leur place, et devint la patronne d'Athènes après avoir offert à la ville l'olivier, symbole de paix durable.","Il lui arrive aussi d'endosser un rôle plus maternel malgré elle : lorsque Héphaïstos, épris d'elle, la poursuit et se voit repoussé, Gaïa recueille de cette rencontre manquée l'enfant Érichthonios et le confie à Athéna pour qu'elle l'élève (voir les fiches « Héphaïstos » et « Érichthonios ») — un enfant qu'elle n'a pas conçu, mais qu'elle protège avec la même rigueur qu'elle réserve à ses héros favoris.","On l'honorait sous plusieurs noms selon la part de sa protection invoquée : Parthénos, « la Vierge », a donné son nom au Parthénon qui la représente sur l'Acropole ; Polias, « gardienne de la cité », désignait son rôle de protectrice d'Athènes elle-même ; et Ergané, « l'Ouvrière », présidait aux travaux des artisans et des tisserandes — un titre qui résonne particulièrement face au destin d'Arachné, changée en araignée pour son insolence (voir la fiche « Araignée »)."],"aphrodite":[],"nérée":[],"bellérophon":[],"éos":[],"niké":[],"hestia":[],"héphaïstos":[],"himeros":[],"énée":[],"zéphyr":[],"éole":[],"chloris":[],"triptolème":[],"ploutos":[],"jason":[],"achille":[],"atlas":[],"psyché":[],"charites":[],"narcisse":[],"écho":[],"circé":[],"thétis":[],"amphitrite":[],"pythie":[],"endymion":[],"charon":[],"ulysse":[],"pénélope":[],"télégonos":[],"télémaque":[],"andromède":[],"hécube":[],"priam":[],"hector":[],"andromaque":[],"pâris":[],"hélène":[],"castor":[],"pollux":[],"léda":[],"clytemnestre":[],"persée":[],"persès":[],"électryon":[],"sthénélos":[],"gorgophoné":[],"alcée":[],"mestor":[],"héléos":[],"érinyes":[],"actéon":[],"artémis":[],"orion":[],"iphigénie":[],"agamemnon":[],"oreste":[],"asclépios":[],"néoptolème":[],"cassandre":[],"ménélas":[],"europe":[],"phèdre":[],"égisthe":[],"polyxène":[],"hyacinthe":[],"coronis":[],"œnone":[],"polydore":[],"polymestor":[],"astyanax":[],"icare":[],"penthée":[],"niobé":[],"otrera":[],"ariane":[],"sémélé":[],"hébé":[],"ilithyie":[],"léto":[],"astéria":[],"cadmos":[],"harmonie":[],"atalante":[],"protée":[],"cyclopes":[],"cybèle":[],"aletheia":[],"ananké":[],"éris":[],"lethée":[],"némésis":[],"palioxis":[],"apaté":[],"phobos":[],"morphée":[],"thanatos":[],"hormos":[],"arès":[],"thalia":[],"zelos":[],"bia":[],"agon":[],"borée":[],"alké":[],"kratos":[],"philotès":[],"euphrosyne":[],"hypnos":[],"orphée":[],"hyménée":[],"rhéa":[],"kairos":[],"dédale":[],"ctésios":[],"penia":[],"éléos":[],"aristée":[],"techné":[],"aglaé":[],"euthénie":[],"hygie":[],"médée":[],"calliope":[],"cassiopée":[],"mélinoé":[],"ascalaphos":[],"pasiphaé":[],"hermaphrodite":[],"priape":[],"antiope":[],"thésée":[],"hippolyté":[],"hippolyte":[],"didon":[],"érichthonios":[],"alcippé":[],"enyo":[],"hespérides":[],"cécrops":[],"hersé":[],"aglauros":[],"pandrosos":[],"électre":[],"chrysothémis":[],"arachné":[],"leucothoé":[],"clytie":[],"danaé":[],"adonis":[],"myrrha":[],"œagre":[],"crotos":[],"deucalion":[],"pyrrha":[],"pléiades":[],"hyas":[],"grées":[],"méduse":[],"gorgones":[],"ganymède":[],"myrina":[],"penthésilée":[],"amazones":[],"néréides":[],"harpyes":[],"io":[],"libye":[],"égyptos":[],"danaos":[],"danaïdes":[],"hypermestre":[],"lyncée":[],"byzas":[],"phidaléia":[],"admète":[],"alceste":[],"pélias":[],"clito":[],"sidé":[],"picus":[],"ixion":[],"pirithoos":[],"hippodamie":[],"cyllaros":[],"hylonome":[],"calchas":[],"hyperboréens":[],"abaris":[],"hypsipyle":[],"œdipe":[],"jocaste":[],"antigone":[],"halia":[],"hermione":[],"chryséis":[],"briséis":[],"menthé":[],"pyrame":[],"thisbé":[],"muses":[],"clio":[],"euterpe":[],"thalie":[],"melpomène":[],"terpsichore":[],"érato":[],"polymnie":[],"uranie":[],"heures":[],"parques":[],"épaphos":[],"ino":[],"autonoë":[],"agavé":[],"polydoros":[],"labdacos":[],"laïos":[],"amphion":[],"zéthos":[],"rhadamanthys":[],"sarpédon":[],"alcmène":[],"amphitryon":[],"tyndare":[],"icarios":[],"atrée":[],"thyeste":[],"acrisios":[],"bélos":[],"agénor":[],"abas":[]};
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
// Même principe que DEITY_PORTRAITS, mais pour la bibliothèque symbolique : une illustration
// dédiée (fournie par l'utilisatrice, fond détouré) qui remplace l'emoji d'un symbole partout où
// il apparaît (fiche détaillée, chips « symboles associés »). Une entrée absente ici retombe
// simplement sur SYMBOL_LIBRARY[id].icon, comme avant — la liste grandira au fil des illustrations
// fournies, sans rien casser pour les symboles qui n'en ont pas encore.
const SYMBOL_ILLUSTRATIONS = {
  "abeille": "assets/symbol-abeille.webp",
  "aigle": "assets/symbol-aigle.webp",
  "ailes": "assets/symbol-ailes.webp",
  "air": "assets/symbol-air.webp",
  "araignée": "assets/symbol-araignee.webp",
  "arc": "assets/symbol-arc.webp",
  "arc-en-ciel": "assets/symbol-arc-en-ciel.webp",
  "aurore": "assets/symbol-aurore.webp",
  "balance": "assets/symbol-balance.webp",
  "bélier": "assets/symbol-belier.webp",
  "blé": "assets/symbol-ble.webp",
  "caducée": "assets/symbol-caduceus.webp",
  "carrefour": "assets/symbol-carrefour.webp",
  "cerf": "assets/symbol-cerf.webp",
  "chaîne": "assets/symbol-chaine.webp",
  "char": "assets/symbol-char.webp",
  "char solaire": "assets/symbol-char-solaire.webp",
  "chemin": "assets/symbol-chemin.webp",
  "chêne": "assets/symbol-chene.webp",
  "cheval": "assets/symbol-cheval.webp",
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

/* ===================== GÉNÉALOGIE ===================== */

// Une seule source de vérité, id -> [id des parents] (0, 1 ou 2 entrées ; 0 pour une figure
// primordiale surgie sans union ni parent, 1 quand un seul parent a sa propre fiche dans ce
// corpus — l'autre restant un nom sans id, mortel secondaire ou figure absente). Tout le
// reste (enfants, unions, fratrie) se déduit automatiquement de cette seule table, jamais
// saisi à la main : voir genealogyRelations(). Construite exclusivement à partir de liens de
// parenté déjà établis en toutes lettres dans DEITY_LORE (voir la fiche « Nom » correspondante
// pour chaque relation ci-dessous) — jamais une figure inventée pour l'occasion. Couverture
// volontairement partielle : le socle primordial/Titans/Olympiens au complet, puis les
// lignées héroïques les mieux documentées du corpus (Persée, les Atrides, Troie, le cycle
// thébain, la famille d'Ulysse...), plutôt qu'une tentative hasardeuse sur les 253 figures.
const GENEALOGY_PARENTS = {
  // Chaos, rien avant lui ; Gaïa, Tartare, Érèbe et Nyx naissent de lui seul, "sans union ni
  // parent" — comme Ouranos naîtra plus tard de Gaïa seule (voir la fiche « Chaos »).
  "chaos": [],
  "gaïa": ["chaos"],
  "tartare": ["chaos"],
  "érèbe": ["chaos"],
  "nyx": ["chaos"],
  // Première génération : les douze Titans, enfants d'Ouranos et Gaïa.
  "ouranos": ["gaïa"],
  "cronos": ["ouranos", "gaïa"],
  "rhéa": ["ouranos", "gaïa"],
  "océan": ["ouranos", "gaïa"],
  "téthys": ["ouranos", "gaïa"],
  "hypérion": ["ouranos", "gaïa"],
  "théia": ["ouranos", "gaïa"],
  "coéos": ["ouranos", "gaïa"],
  "phoebé": ["ouranos", "gaïa"],
  "crios": ["ouranos", "gaïa"],
  "japet": ["ouranos", "gaïa"],
  "mnémosyne": ["ouranos", "gaïa"],
  "thémis": ["ouranos", "gaïa"],
  "aphrodite": ["ouranos"],
  // Les six premiers Olympiens, enfants de Cronos et Rhéa.
  "zeus": ["cronos", "rhéa"],
  "héra": ["cronos", "rhéa"],
  "poséidon": ["cronos", "rhéa"],
  "hadès": ["cronos", "rhéa"],
  "déméter": ["cronos", "rhéa"],
  "hestia": ["cronos", "rhéa"],
  // Enfants d'Hypérion et Théia, de Coéos et Phoebé, de Japet et Clymène.
  "hélios": ["hypérion", "théia"],
  "séléné": ["hypérion", "théia"],
  "éos": ["hypérion", "théia"],
  "léto": ["coéos", "phoebé"],
  "astéria": ["coéos", "phoebé"],
  "hécate": ["astéria"],
  "clymène": ["océan", "téthys"],
  "atlas": ["japet", "clymène"],
  "prométhée": ["japet", "clymène"],
  "épiméthée": ["japet", "clymène"],
  "ménétios": ["japet", "clymène"],
  // Enfants de Nyx (tradition hésiodique, "sans union ni parent").
  "hypnos": ["nyx"],
  "thanatos": ["nyx"],
  "éris": ["nyx"],
  "apaté": ["nyx"],
  "parques": ["nyx"],
  "philotès": ["nyx"],
  "némésis": ["nyx"],
  "morphée": ["hypnos"],
  "hespérides": ["atlas"],
  // Les neuf Muses, filles de Zeus et Mnémosyne ; les Heures, filles de Zeus et Thémis.
  "muses": ["zeus", "mnémosyne"],
  "calliope": ["zeus", "mnémosyne"],
  "clio": ["zeus", "mnémosyne"],
  "euterpe": ["zeus", "mnémosyne"],
  "melpomène": ["zeus", "mnémosyne"],
  "polymnie": ["zeus", "mnémosyne"],
  "terpsichore": ["zeus", "mnémosyne"],
  "thalie": ["zeus", "mnémosyne"],
  "uranie": ["zeus", "mnémosyne"],
  "érato": ["zeus", "mnémosyne"],
  "heures": ["zeus", "thémis"],
  // Les trois Charites, filles de Zeus et de l'Océanide Eurynomé (sans fiche propre) — même
  // logique de doublon assumé que les Muses ci-dessus (le collectif ET chaque figure nommée).
  "charites": ["zeus"],
  "aglaé": ["zeus"],
  "euphrosyne": ["zeus"],
  "thalia": ["zeus"],
  // Deuxième génération olympienne — la liste la plus longue et la plus disputée de tout le
  // corpus : chaque enfant de Zeus cité ici l'est avec la mère qui lui est attribuée dans sa
  // propre fiche, pour qu'elle reste identifiable à chaque fois plutôt que noyée dans un bloc
  // indifférencié (voir genealogyRelations(), qui regroupe justement les enfants par union).
  "apollon": ["zeus", "léto"],
  "artémis": ["zeus", "léto"],
  "perséphone": ["zeus", "déméter"],
  "athéna": ["zeus", "métis"],
  "arès": ["zeus", "héra"],
  "héphaïstos": ["héra"],
  "hébé": ["zeus", "héra"],
  "ilithyie": ["zeus", "héra"],
  "dionysos": ["zeus", "sémélé"],
  "hermès": ["zeus", "pléiades"],
  "persée": ["zeus", "danaé"],
  "hélène": ["zeus", "léda"],
  "pollux": ["zeus", "léda"],
  "castor": ["léda", "tyndare"],
  "héraclès": ["zeus", "alcmène"],
  "minos": ["zeus", "europe"],
  "rhadamanthys": ["zeus", "europe"],
  "sarpédon": ["zeus", "europe"],
  // Épaphos (fils de Zeus et d'Io) est défini plus bas, avec Libye et le reste de sa lignée.
  // Amphion et Zéthos sont bien fils de Zeus et d'une Antiope thébaine dans le mythe — mais
  // l'unique fiche « antiope » de ce corpus couvre AUSSI la reine amazone épouse de Thésée
  // (les deux traditions distinctes y sont expliquées ensemble). Les relier ici à "antiope"
  // les ferait apparaître à tort comme demi-frères d'Hippolyte dans l'arbre : on ne retient
  // donc que Zeus comme parent identifié pour la généalogie, la nuance restant expliquée en
  // toutes lettres dans le texte de leurs fiches respectives.
  "amphion": ["zeus"],
  "zéthos": ["zeus"],
  // Deux traditions concurrentes, rapportées telles quelles dans leurs propres fiches plutôt
  // que tranchées arbitrairement : Zeus comme un des parents possibles, sans que cela exclue
  // l'autre version qu'elles citent aussi (Chronos pour Aletheia, l'Océan pour Tyché).
  "aletheia": ["zeus"],
  "tyché": ["zeus"],
  // Enfants d'Arès.
  "phobos": ["arès", "aphrodite"],
  "harmonie": ["arès", "aphrodite"],
  "alcippé": ["arès", "aglauros"],
  "penthésilée": ["arès"],
  // Autres enfants d'Aphrodite et d'Hermès.
  "hermaphrodite": ["aphrodite", "hermès"],
  "priape": ["aphrodite", "dionysos"],
  "pan": ["hermès"],
  // Cécrops, premier roi d'Athènes, et sa descendance.
  "cécrops": [],
  "aglauros": ["cécrops"],
  "hersé": ["cécrops"],
  "pandrosos": ["cécrops"],
  "érichthonios": ["gaïa"],
  // Lignée de Persée, remontant désormais jusqu'à Abas et Bélos/Agénor (donc jusqu'au socle
  // primordial) grâce à Acrisios (père de Danaé) et aux figures créées pour lui.
  "danaé": ["acrisios"],
  "cassiopée": [],
  "andromède": ["cassiopée"],
  "électryon": ["persée", "andromède"],
  "sthénélos": ["persée", "andromède"],
  "gorgophoné": ["persée", "andromède"],
  "alcée": ["persée", "andromède"],
  "mestor": ["persée", "andromède"],
  "héléos": ["persée", "andromède"],
  "persès": ["persée", "andromède"],
  // Alcmène (mère d'Héraclès) et Amphitryon (son père légal, mais pas biologique — voir la
  // fiche « Héraclès ») : les deux branches d'Électryon et d'Alcée se rejoignent ici.
  "alcmène": ["électryon"],
  "amphitryon": ["alcée"],
  // Io, Épaphos, Libye et leur descendance jusqu'à Danaos et Égyptos (par Bélos) et jusqu'à
  // Cadmos et Europe (par Agénor) — les deux grandes lignées thébaine et argienne, désormais
  // reliées à la même souche.
  "épaphos": ["zeus", "io"],
  "libye": ["épaphos"],
  "bélos": ["libye"],
  "agénor": ["libye"],
  "danaos": ["bélos"],
  "égyptos": ["bélos"],
  "danaïdes": ["danaos"],
  "hypermestre": ["danaos"],
  "lyncée": ["égyptos"],
  "abas": ["lyncée", "hypermestre"],
  "acrisios": ["abas"],
  "byzas": ["poséidon"],
  // Les Atrides, désormais reliées à leur ancêtre Atrée (et son frère Thyeste, père d'Égisthe).
  "atrée": [],
  "thyeste": [],
  "agamemnon": ["atrée"],
  "ménélas": ["atrée"],
  "égisthe": ["thyeste"],
  "clytemnestre": ["léda", "tyndare"],
  // Tyndare et Icarios, fils de Gorgophoné (déjà eux-mêmes petits-fils de Persée).
  "tyndare": ["gorgophoné"],
  "icarios": ["gorgophoné"],
  "oreste": ["agamemnon", "clytemnestre"],
  "iphigénie": ["agamemnon", "clytemnestre"],
  "électre": ["agamemnon", "clytemnestre"],
  "chrysothémis": ["agamemnon", "clytemnestre"],
  "hermione": ["ménélas", "hélène"],
  "néoptolème": ["achille"],
  // La famille royale de Troie.
  "priam": [],
  "hécube": [],
  "pâris": ["priam", "hécube"],
  "cassandre": ["priam", "hécube"],
  "polyxène": ["priam", "hécube"],
  "polydore": ["priam", "hécube"],
  "hector": ["priam", "hécube"],
  "astyanax": ["hector", "andromaque"],
  // La Crète de Minos et Thésée.
  "pasiphaé": ["hélios"],
  "ariane": ["minos", "pasiphaé"],
  "phèdre": ["minos", "pasiphaé"],
  "hippolyte": ["thésée", "antiope"],
  "icare": ["dédale"],
  // La mer : Nérée et sa descendance.
  "nérée": [],
  "thétis": ["nérée"],
  "amphitrite": ["nérée"],
  "néréides": ["nérée"],
  "achille": ["thétis"],
  // La famille d'Ulysse.
  "circé": ["hélios"],
  "télégonos": ["circé", "ulysse"],
  "télémaque": ["ulysse", "pénélope"],
  "pénélope": ["icarios"],
  "alceste": ["pélias"],
  // Le cycle thébain : les cinq enfants de Cadmos et Harmonie, puis la lignée royale de
  // Thèbes jusqu'à Œdipe (Polydoros -> Labdacos -> Laïos -> Œdipe -> Antigone). Cadmos et
  // Europe remontent désormais eux aussi jusqu'à Agénor, donc jusqu'à la même souche que
  // Danaos et Égyptos (voir Libye/Bélos/Agénor plus haut).
  "cadmos": ["agénor"],
  "europe": ["agénor"],
  "sémélé": ["cadmos", "harmonie"],
  "ino": ["cadmos", "harmonie"],
  "autonoë": ["cadmos", "harmonie"],
  "agavé": ["cadmos", "harmonie"],
  "polydoros": ["cadmos", "harmonie"],
  "labdacos": ["polydoros"],
  "laïos": ["labdacos"],
  "actéon": ["aristée", "autonoë"],
  "penthée": ["agavé"],
  "œdipe": ["laïos", "jocaste"],
  "jocaste": [],
  "antigone": ["œdipe", "jocaste"],
  // Deucalion et Pyrrha, seuls survivants du déluge.
  "deucalion": ["prométhée"],
  "pyrrha": ["épiméthée"],
  // Autres enfants d'Apollon.
  "asclépios": ["apollon", "coronis"],
  "coronis": [],
  "aristée": ["apollon"],
  "orphée": ["œagre", "calliope"],
  // Énée et Ploutos.
  "énée": ["aphrodite"],
  "ploutos": ["déméter"],
};

// Index inverse construit une seule fois : pour un parent donné, la liste de ses enfants —
// jamais saisi à la main, toujours déduit de GENEALOGY_PARENTS pour ne jamais désynchroniser
// les deux sens de la relation.
const GENEALOGY_CHILDREN = (() => {
  const map = {};
  for(const [id, parents] of Object.entries(GENEALOGY_PARENTS)){
    for(const p of parents){
      if(!map[p]) map[p] = [];
      map[p].push(id);
    }
  }
  return map;
})();

// Pour une figure donnée : ses parents (peut être vide), ses enfants (déduits de l'index
// inverse), ses union(s) (les autres parents de ses enfants, déduits eux aussi) et sa
// fratrie (les autres figures qui partagent au moins un même parent qu'elle).
// Un parent ne contribue à la fratrie de ses enfants que s'il n'a pas eu d'enfants avec un
// nombre de partenaires différents dépassant ce seuil. Au-delà, ses enfants avec des
// partenaires différents ne forment plus une "vraie" fratrie au sens narratif — le cas de
// Zeus, avec une bonne douzaine de partenaires connues, qui ferait sinon apparaître comme
// "frère" ou "sœur" de Persée à peu près tout le reste du panthéon. En dessous du seuil, même
// des demi-frères et sœurs (partenaires différents mais peu nombreux) continuent de s'afficher
// — Castor et Pollux, demi-frères par leur mère commune Léda (seulement deux partenaires,
// Tyndare et Zeus), gardent ainsi toute leur importance l'un pour l'autre. Les naissances
// "en solitaire" (sans second parent identifié, comme Ouranos ou Aphrodite) ne comptent pour
// aucun partenaire et ne créent donc jamais de fratrie fantôme à ce niveau.
const SIBLING_PARENT_MAX_PARTNERS = 3;

// Les enfants qu'un parent contribue au calcul de fratrie : uniquement ceux nés d'une union
// avec un autre parent identifié (jamais des naissances en solitaire, qui ne font de personne
// des frères et sœurs), et seulement si ce parent reste sous SIBLING_PARENT_MAX_PARTNERS.
function siblingContributingChildren(parentId){
  const unions = genealogyChildUnions(parentId).filter(u => u.partner);
  if(unions.length > SIBLING_PARENT_MAX_PARTNERS) return [];
  return unions.flatMap(u => u.children);
}

function genealogyRelations(id){
  const parents = GENEALOGY_PARENTS[id] || [];
  const children = GENEALOGY_CHILDREN[id] || [];
  const partnerSet = new Set();
  for(const childId of children){
    for(const p of (GENEALOGY_PARENTS[childId] || [])){
      if(p !== id) partnerSet.add(p);
    }
  }
  // Exclut les propres parents et enfants d'id de sa fratrie : sans ce filtre, un cas comme
  // Gaïa — mère d'Ouranos seule, puis mère des Titans avec lui — ferait apparaître Ouranos
  // comme "frère" de Cronos alors qu'il est déjà son père (les deux partagent Gaïa comme
  // parent commun, mais à deux générations différentes).
  const siblingSet = new Set();
  for(const p of parents){
    for(const sib of siblingContributingChildren(p)){
      if(sib !== id && !parents.includes(sib) && !children.includes(sib)) siblingSet.add(sib);
    }
  }
  return { parents, children, partners: [...partnerSet], siblings: [...siblingSet] };
}

function genealogyHasData(id){
  const rel = genealogyRelations(id);
  return rel.parents.length > 0 || rel.children.length > 0 || rel.partners.length > 0 || rel.siblings.length > 0;
}

function genealogyDisplayName(id){
  return id.charAt(0).toUpperCase() + id.slice(1);
}
function byGenealogyDisplayName(a, b){
  return genealogyDisplayName(a).localeCompare(genealogyDisplayName(b), "fr");
}

// Petite vignette de portrait, insérée devant un nom partout où l'arbre affiche une figure qui
// en a un (DEITY_PORTRAITS) — pour rendre l'arbre plus visuel plutôt qu'une suite de noms nus.
// Chaîne vide, sans rien casser, pour les figures sans portrait (la majorité).
function genealogyPortraitHTML(id){
  const portrait = DEITY_PORTRAITS[id];
  if(!portrait) return "";
  return `<img class="tree-portrait" src="${escapeHTML(portrait)}" alt="" loading="lazy">`;
}

// Équivalent pour les chips « symbole associé » : une vignette de l'illustration dédiée
// (SYMBOL_ILLUSTRATIONS) quand le symbole en a une, sinon son emoji habituel (SYMBOL_LIBRARY[id]
// .icon) suivi d'un espace — mêmes usages qu'avant, juste transformés en illustration réelle.
function symbolChipIconHTML(id, s){
  const illustration = SYMBOL_ILLUSTRATIONS[id];
  if(illustration) return `<img class="chip-symbol-icon" src="${escapeHTML(illustration)}" alt="" loading="lazy">`;
  return `${s.icon || "✦"} `;
}

// Regroupe les enfants d'une figure par union (l'autre parent, ou null si non documenté) —
// c'est ce regroupement qui permet d'identifier la mère (ou le père) de chaque enfant plutôt
// que de les présenter en un seul bloc indifférencié.
function genealogyChildUnions(id){
  const children = GENEALOGY_CHILDREN[id] || [];
  const groups = new Map(); // partnerId|null -> [childId,...]
  for(const childId of children){
    const parents = GENEALOGY_PARENTS[childId] || [];
    const partner = parents.find(p => p !== id) || null;
    if(!groups.has(partner)) groups.set(partner, []);
    groups.get(partner).push(childId);
  }
  return [...groups.entries()]
    .map(([partner, kids]) => ({ partner, children: kids.sort(byGenealogyDisplayName) }))
    .sort((a, b) => {
      if(!a.partner) return 1;
      if(!b.partner) return -1;
      return byGenealogyDisplayName(a.partner, b.partner);
    });
}

// « Mettre son père et sa mère, ses deux grands-parents. Puis sa femme, ses enfants et c'est
// tout. » — la fiche familiale d'une figure ne va plus jamais au-delà de deux générations en
// amont (parents, grands-parents) ni d'une génération en aval (les enfants directs, jamais
// leurs propres enfants) : pour aller plus loin, un clic sur n'importe quel nom recentre
// l'écran sur lui, plutôt que de tout développer en ligne comme l'ancienne version le faisait.
function buildFamilyCard(id){
  const parents = GENEALOGY_PARENTS[id] || [];
  const grandparents = [];
  for(const p of parents){
    for(const gp of (GENEALOGY_PARENTS[p] || [])){
      if(!grandparents.includes(gp)) grandparents.push(gp);
    }
  }
  const rel = genealogyRelations(id);
  return { id, parents, grandparents, siblings: rel.siblings, partners: rel.partners, childUnions: genealogyChildUnions(id) };
}

// Nombre de figures reliées par au moins un lien de généalogie (parent ou enfant), tous
// comptés une seule fois — sert au décompte affiché sur la tuile d'accueil.
const GENEALOGY_FIGURE_COUNT = new Set([...Object.keys(GENEALOGY_PARENTS), ...Object.keys(GENEALOGY_CHILDREN)]).size;

// Les douze Olympiens (place traditionnellement disputée entre Hestia et Dionysos — on
// retient ici la liste la plus courante, Hestia cédant sa place). Chacun devient un point
// d'entrée vers sa propre fiche familiale complète, plutôt que de se concentrer sur Zeus seul.
const OLYMPIAN_IDS = ["zeus", "héra", "poséidon", "déméter", "athéna", "apollon", "artémis", "arès", "aphrodite", "héphaïstos", "hermès", "dionysos"];

// Points d'entrée choisis pour l'écran d'accueil de la généalogie — un aperçu large plutôt
// qu'une liste exhaustive des 264 figures. Chaque point de départ ouvre désormais l'arbre
// complet à partir de sa racine (branches et sous-branches comprises, pas une seule figure
// isolée) : les Titans partent d'Ouranos et Gaïa pour montrer toute leur génération plutôt que
// Cronos seul, et les Olympiens ont leur propre écran dédié (voir OLYMPIAN_IDS) plutôt que de
// se concentrer sur Zeus.
const GENEALOGY_STARTING_POINTS = [
  { special: "originsOverview", label: "Les origines du monde", sub: "Découvrez la naissance du monde et des premières puissances." },
  { special: "titansOverview", label: "Les douze Titans", sub: "Explorez la première grande génération divine." },
  { special: "olympiansOverview", label: "Les douze Olympiens", sub: "Découvrez les dieux qui règnent sur l'Olympe." },
  { special: "perseeLineage", label: "La lignée de Persée", sub: "Suivez la famille de Persée à travers les générations." },
  { special: "troyOverview", label: "La guerre de Troie", sub: "Découvrez les familles au cœur de la guerre de Troie." },
  { special: "atridesOverview", label: "Les Atrides", sub: "Suivez une famille marquée par les rivalités et les tragédies." },
  { special: "thebanOverview", label: "Le cycle thébain", sub: "Explorez les générations qui ont façonné Thèbes." },
  { special: "ulysseOverview", label: "La famille d'Ulysse", sub: "Découvrez les liens qui unissent la famille d'Ulysse." },
];

/* ===================== MODÈLE D'ACCÈS FREE / PREMIUM ===================== */

// Liste explicite et nommée — jamais un array.slice(0, 5) ni un index < 5 — des identifiants
// qui restent accessibles gratuitement. C'est la SEULE source de vérité pour la frontière
// free/premium côté contenu : modifier ce qui est gratuit ne demande jamais de toucher à la
// logique applicative (figureAccess()/symbolAccess()/genealogyAccess() ci-dessous), seulement
// à ces trois listes. Tout ce qui n'y figure pas est premium par défaut — la liste positive
// (plutôt qu'une liste de ce qui est premium) rend impossible d'oublier de verrouiller une
// nouvelle fiche ajoutée plus tard : elle est premium tant qu'elle n'est pas explicitement
// ajoutée ici.
//
// IMPORTANT — ce fichier reste pour l'instant un unique bundle statique livré tel quel au
// client (voir README, section "Premium & sécurité") : cette liste ne fait à ce stade
// qu'annoter les données, elle ne protège RIEN par elle-même. La vraie frontière de sécurité
// (contenu premium jamais envoyé avant vérification d'achat) dépend du backend à construire
// (api/), qui seul doit trancher qui reçoit le contenu complet.
const FREE_FIGURE_IDS = new Set(["zeus", "héra", "poséidon", "athéna", "apollon"]);
const FREE_SYMBOL_IDS = new Set(["chouette", "laurier", "foudre", "serpent", "olivier"]);
// GENEALOGY_STARTING_POINTS identifie chaque point d'entrée soit par "id" (une figure), soit
// par "special" (l'écran dédié aux douze Olympiens) — la clé de free/premium doit donc gérer
// les deux, voir genealogyAccess() ci-dessous.
const FREE_GENEALOGY_KEYS = new Set(["olympiansOverview"]);

function figureAccess(id){ return FREE_FIGURE_IDS.has(id) ? "free" : "premium"; }
function symbolAccess(id){ return FREE_SYMBOL_IDS.has(id) ? "free" : "premium"; }
function genealogyAccess(startingPoint){
  return FREE_GENEALOGY_KEYS.has(startingPoint.special || startingPoint.id) ? "free" : "premium";
}

// ATTENTION — ceci n'est PAS la barrière de sécurité. isPremiumUnlocked() ne sert qu'à décider
// quoi AFFICHER dans ce client ; le contenu premium réel n'est de toute façon plus embarqué
// dans ce fichier (voir scripts/export-premium-content.js) et reste servi par api/content.js,
// qui revérifie lui-même le droit d'accès côté serveur avant de répondre. Tant que
// l'intégration StoreKit/Capacitor (voir api/verify-purchase.js, api/entitlement.js) n'est pas
// branchée côté app, aucun achat n'est possible depuis ce contexte web : renvoie donc toujours
// false ici, plutôt qu'une fausse promesse de déblocage. À remplacer, une fois StoreKit branché,
// par une vérification qui appelle /api/entitlement avec l'originalTransactionId obtenu après
// achat/restauration — jamais par un simple booléen local, un localStorage ou un UserDefaults.
function isPremiumUnlocked(){
  return false;
}

// ===================== APERÇU PROPRIÉTAIRE (jamais un achat) =====================
//
// Mécanisme réservé au propriétaire de l'app pour continuer à tout relire pendant le
// développement, tant qu'aucun achat StoreKit réel n'est possible (ni Capacitor, ni compte
// Apple Developer branchés). Ouvre l'app une fois avec ?preview=<clé> dans l'URL : la clé est
// mémorisée dans localStorage, puis envoyée en en-tête à chaque appel à /api/content, qui la
// compare lui-même à sa propre variable d'environnement serveur (jamais présente ici, dans
// le code public) avant de renvoyer le contenu complet. app.js ne connaît donc jamais la bonne
// valeur — seulement ce que l'URL contenait —, exactement comme un mot de passe qu'on retape
// sans jamais le comparer soi-même. N'affecte JAMAIS isPremiumUnlocked() : ceci reste un aperçu
// pour une seule personne qui connaît la clé, pas une preuve d'achat.
function ownerPreviewKey(){
  try { return localStorage.getItem("pantheon-owner-preview-key") || null; } catch(e){ return null; }
}
function hasOwnerPreview(){
  return !!ownerPreviewKey();
}

// Capture ?preview=<clé> une seule fois au chargement, la mémorise, puis nettoie l'URL — pour
// ne pas la laisser traîner dans l'historique ou un partage de lien accidentel.
function initOwnerPreviewFromUrl(){
  try {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("preview");
    if(!key) return;
    localStorage.setItem("pantheon-owner-preview-key", key);
    params.delete("preview");
    const rest = params.toString();
    const newUrl = window.location.pathname + (rest ? `?${rest}` : "") + window.location.hash;
    window.history.replaceState({}, "", newUrl);
  } catch(e){}
}

// Deuxième point d'entrée pour la même clé, cette fois via une invite plutôt qu'un paramètre
// d'URL — indispensable dès que l'app tourne en mode « ajouté à l'écran d'accueil » sur iOS :
// ce mode s'exécute dans un contexte de stockage totalement séparé de Safari (son propre
// localStorage) et s'ouvre toujours sur le `start_url` fixe de manifest.json, sans jamais
// reprendre l'URL affichée au moment de l'ajout à l'écran d'accueil — ?preview=<clé> n'a donc
// aucun moyen d'y arriver. Bouton visible sur le paywall (data-action="owner-preview") : même
// effet exact que le paramètre d'URL, aucune vérification côté client, à refaire une fois par
// contexte de stockage (Safari, écran d'accueil... chacun le sien).
function promptOwnerPreviewKey(){
  try {
    const input = window.prompt("Clé d'aperçu propriétaire (laisser vide pour l'oublier) :", ownerPreviewKey() || "");
    if(input === null) return; // invite annulée, rien ne change
    const trimmed = input.trim();
    if(trimmed) localStorage.setItem("pantheon-owner-preview-key", trimmed);
    else localStorage.removeItem("pantheon-owner-preview-key");
    render();
  } catch(e){}
}

// Cache mémoire (perdu au rechargement, volontairement — rien de plus à gérer) : { loading },
// { locked: true } (mauvaise clé ou clé absente côté serveur) ou { content } (fiche complète).
const OWNER_PREVIEW_CACHE = { figures: {}, symbols: {} };

function fetchOwnerPreviewContent(type, id){
  if(OWNER_PREVIEW_CACHE[type][id]) return; // déjà en cache, en cours ou déjà résolu
  const key = ownerPreviewKey();
  if(!key) return;
  OWNER_PREVIEW_CACHE[type][id] = { loading: true };
  fetch(`api/content?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`, {
    headers: { "x-owner-preview-key": key },
  })
    .then(res => res.json())
    .then(data => {
      // Ne jamais traiter une réponse ambiguë comme un déverrouillage : il faut explicitement
      // { locked: false, content } pour afficher le contenu premium, sinon repli sur le
      // paywall — y compris pour une réponse d'erreur inattendue qui n'aurait ni l'un ni
      // l'autre (voir le repli côté serveur dans content.js, qui ne devrait plus jamais en
      // produire, mais ceinture et bretelles).
      OWNER_PREVIEW_CACHE[type][id] = (data.locked === false && data.content) ? { content: data.content } : { locked: true };
      // Ne redessine que si la fiche demandée est toujours celle affichée à l'écran.
      const expectedScreen = type === "figures" ? "figureDetail" : "symbolDetail";
      if(currentScreen.type === expectedScreen && currentScreen.id === id) render();
    })
    .catch(() => {
      OWNER_PREVIEW_CACHE[type][id] = { locked: true };
      const expectedScreen = type === "figures" ? "figureDetail" : "symbolDetail";
      if(currentScreen.type === expectedScreen && currentScreen.id === id) render();
    });
}

// Vignette d'en-tête partagée par la fiche détail et ses deux écrans de repli (paywall, chargement
// de l'aperçu propriétaire) : portrait de figure (rectangulaire, DEITY_PORTRAITS), illustration de
// symbole (détourée, SYMBOL_ILLUSTRATIONS) ou, à défaut, l'emoji d'origine — dans cet ordre.
function detailHeadingImageHTML({ icon, portrait, illustration, name }){
  if(portrait) return `<img class="deity-portrait" src="${escapeHTML(portrait)}" alt="${escapeHTML(name)}" loading="lazy">`;
  if(illustration) return `<img class="symbol-illustration-big" src="${escapeHTML(illustration)}" alt="${escapeHTML(name)}" loading="lazy">`;
  if(icon) return `<div class="symbol-icon-big">${icon}</div>`;
  return "";
}

function renderOwnerPreviewLoading({ icon, portrait, illustration, name, note }){
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail">
      ${detailHeadingImageHTML({ icon, portrait, illustration, name })}
      <h2>${escapeHTML(name)}</h2>
      ${note ? `<p class="note">${escapeHTML(note)}</p>` : ""}
      <p class="empty">Chargement du contenu premium (aperçu propriétaire)…</p>
    </article>
  `;
}

// Écran affiché à la place d'une fiche premium tant que l'achat n'est pas débloqué. Les
// boutons y figurent déjà (voir section 4/23 de l'audit) mais restent volontairement inertes
// dans ce contexte web — attemptPurchase()/attemptRestore() l'expliquent clairement plutôt que
// de simuler un achat qui n'engagerait à rien.
function renderPaywall({ icon, portrait, illustration, name, note }){
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail paywall-detail">
      ${detailHeadingImageHTML({ icon, portrait, illustration, name })}
      <h2>${escapeHTML(name)}</h2>
      ${note ? `<p class="note">${escapeHTML(note)}</p>` : ""}
      <section class="paywall-box">
        <h3>Découvrez la bibliothèque complète</h3>
        <p>Accédez à toutes les figures, tous les symboles et toutes les généalogies.</p>
        <p class="paywall-access">Accès permanent</p>
        <p class="paywall-price" id="paywallPrice">39,99 €</p>
        <button type="button" class="paywall-cta" data-action="unlock-premium">Débloquer Premium</button>
        <button type="button" class="paywall-restore" data-action="restore-purchase">Restaurer mon achat</button>
        <button type="button" class="paywall-restore" data-action="owner-preview">Propriétaire : entrer la clé d'aperçu</button>
        <p class="paywall-fineprint">Achat unique via l'App Store, sans abonnement ni renouvellement automatique.</p>
        <p class="paywall-fineprint"><a href="./politique-confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a></p>
      </section>
    </article>
  `;
}

// Le prix affiché ci-dessus (39,99 €) est un espace réservé : une fois StoreKit branché, ce
// texte doit être remplacé par le prix localisé réellement configuré dans App Store Connect
// (Product.displayPrice), jamais codé en dur définitivement — voir la tâche StoreKit/Capacitor.
function attemptPurchase(){
  window.alert("Le paiement Premium est disponible uniquement depuis l'app iOS (achat unique via l'App Store) — pas depuis cette page web.");
}
function attemptRestore(){
  window.alert("La restauration d'achat est disponible uniquement depuis l'app iOS.");
}

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

/* ===================== LIEUX & CARTE ===================== */

// Sélection volontairement curatée (36 lieux) plutôt qu'une liste exhaustive : chaque entrée
// correspond à un site réel (coordonnées géographiques véritables, archéologiques ou
// géographiques) auquel une tradition antique attache un épisode mythologique précis — jamais
// l'inverse (pas de géographie mythique pure sans ancrage réel, comme l'Atlantide ou le Jardin
// des Hespérides, dont la localisation reste trop incertaine pour figurer sur une carte
// sérieuse). `links` renvoie vers des figures parfois non encore présentes dans DEITY_NOTES
// (ex. Pélops, Scylla) : le rendu les affiche alors en chip non cliquable plutôt que de les
// omettre, exactement comme pour la Bibliothèque symbolique — l'information reste honnête sans
// jamais pointer vers un lien mort.
const MAP_PLACES = [{"id":"delphes","name":"Delphes","category":"sanctuaire","coords":[38.4824,22.501],"desc":"Sanctuaire panhellénique d'Apollon, siège de l'oracle le plus consulté du monde grec.","lore":["Niché sur les pentes du mont Parnasse, Delphes fut considéré par les Grecs comme l'omphalos, le « nombril du monde » : selon la légende rapportée par Pindare, Zeus y aurait fait se rejoindre deux aigles lâchés aux deux extrémités opposées de la terre. Le sanctuaire abritait la Pythie, prêtresse d'Apollon qui rendait ses oracles depuis l'adyton du temple, en un lieu que le dieu avait conquis en tuant le serpent Python qui le gardait.","Consultée par les cités grecques comme par des rois étrangers avant toute décision importante — fondation de colonie, déclaration de guerre, réforme politique —, l'oracle exerça une influence considérable pendant près de mille ans, jusqu'à sa fermeture définitive sur ordre de l'empereur chrétien Théodose Ier en 391 apr. J.-C."],"links":["apollon","pythie","artémis","dionysos"],"symbolLinks":["laurier","serpent"]},{"id":"olympie","name":"Olympie","category":"sanctuaire","coords":[37.6382,21.6296],"desc":"Sanctuaire de Zeus en Élide, où se tenaient tous les quatre ans les Jeux olympiques.","lore":["Olympie abritait le plus grand temple de Zeus du monde grec, qui renfermait la statue chryséléphantine (or et ivoire) du dieu sculptée par Phidias au Ve siècle av. J.-C. — l'une des Sept Merveilles du monde antique, aujourd'hui disparue.","Les Jeux olympiques, célébrés en l'honneur de Zeus à partir d'une date traditionnelle de 776 av. J.-C., rassemblaient des athlètes de toutes les cités grecques ; une trêve sacrée (l'ekecheiria) suspendait en théorie les conflits en cours pour permettre à chacun de s'y rendre en sécurité. La tradition en attribuait la fondation à Pélops, vainqueur d'une course de chars truquée contre le roi Oinomaos."],"links":["zeus","héra","pélops"],"symbolLinks":[]},{"id":"éleusis","name":"Éleusis","category":"sanctuaire","coords":[38.045,23.545],"desc":"Sanctuaire de Déméter et Perséphone, siège des Mystères d'Éleusis.","lore":["Selon l'Hymne homérique à Déméter, c'est à Éleusis que la déesse, errant à la recherche de sa fille Perséphone enlevée par Hadès, fut accueillie par la famille du roi Céléos — et qu'elle institua elle-même les rites secrets appelés Mystères en récompense de cet accueil, confiant à Triptolème le char ailé qui lui permit de répandre l'art de l'agriculture à travers le monde.","Célébrés chaque année pendant près de deux millénaires, les Mystères d'Éleusis promettaient à leurs initiés un sort plus heureux après la mort ; leur contenu précis reste largement inconnu aujourd'hui, les initiés ayant gardé un silence absolu sur ce qu'ils y voyaient, sous peine de mort."],"links":["déméter","perséphone","hadès","triptolème"],"symbolLinks":["épis"]},{"id":"dodone","name":"Dodone","category":"sanctuaire","coords":[39.546,20.788],"desc":"Plus ancien sanctuaire oraculaire de Grèce, où Zeus parlait par le bruissement d'un chêne sacré.","lore":["Selon Hérodote, l'oracle de Dodone aurait été fondé par une prêtresse égyptienne de Thèbes enlevée par des marchands phéniciens ; les prêtresses locales, les Péléiades, interprétaient la volonté de Zeus dans le bruissement des feuilles d'un chêne sacré planté au cœur du sanctuaire, dans les montagnes reculées d'Épire.","Moins prestigieux que Delphes mais plus ancien — déjà cité dans l'Iliade d'Homère —, le site est resté actif jusqu'à sa destruction lors des invasions du IIIe siècle apr. J.-C."],"links":["zeus"],"symbolLinks":["chêne"]},{"id":"délos","name":"Délos","category":"sanctuaire","coords":[37.396,25.269],"desc":"Île sacrée où naquirent Apollon et Artémis, centre religieux majeur des Cyclades.","lore":["Selon l'Hymne homérique à Apollon, l'île flottante de Délos fut la seule à accepter d'accueillir Léto, poursuivie par la jalousie d'Héra, pour y mettre au monde ses jumeaux Apollon et Artémis — fixée aux fonds marins par quatre colonnes au moment même de la naissance.","Si sacrée qu'aucune naissance ni aucune mort n'y était autorisée — les habitants sur le point de mourir ou d'accoucher devaient être transportés sur l'île voisine de Rhénée —, Délos devint le centre religieux, puis commercial, le plus important des Cyclades."],"links":["apollon","artémis","léto"],"symbolLinks":[]},{"id":"épidaure","name":"Épidaure","category":"sanctuaire","coords":[37.5959,23.0778],"desc":"Principal sanctuaire de guérison du monde grec, dédié à Asclépios.","lore":["Les malades venus consulter Asclépios à Épidaure pratiquaient l'incubation : ils dormaient dans l'abaton du sanctuaire dans l'espoir que le dieu leur apparaisse en rêve et leur révèle un remède, parfois en léchant leurs plaies sous la forme d'un serpent, animal qui lui reste associé.","Le théâtre d'Épidaure, l'un des mieux conservés du monde antique et réputé pour son acoustique exceptionnelle, faisait partie intégrante du sanctuaire : représentations théâtrales et jeux sportifs participaient au processus thérapeutique autant qu'au culte."],"links":["asclépios","apollon"],"symbolLinks":["serpent"]},{"id":"mont-olympe","name":"Mont Olympe","category":"montagne","coords":[40.0855,22.3583],"desc":"La plus haute montagne de Grèce, séjour légendaire des douze dieux olympiens.","lore":["Séparé du mont Ossa par la vallée de Tempé, l'Olympe (2917 m) était pour les Grecs le palais des dieux, un lieu au-dessus des nuages, à l'abri du vent, de la pluie et de la neige — selon la description qu'en donne Homère dans l'Odyssée, une demeure de lumière permanente.","C'est sur ses pentes que les dieux vainquirent les Titans puis les Géants, avant de s'y établir durablement comme maîtres du monde — l'origine même du nom « Olympiens » donné à la nouvelle génération divine dirigée par Zeus."],"links":["zeus","héra","poséidon","athéna","apollon","artémis","arès","aphrodite","héphaïstos","hermès","déméter","dionysos"],"symbolLinks":[]},{"id":"mont-ida-crète","name":"Mont Ida (Crète)","category":"montagne","coords":[35.25,24.75],"desc":"Montagne de Crète où Zeus enfant fut caché et élevé, loin de son père Cronos.","lore":["Selon la tradition rapportée par Hésiode, Rhée cacha son fils Zeus nouveau-né dans une grotte du mont Ida pour le soustraire à Cronos, qui dévorait ses enfants par crainte d'être détrôné ; le bébé y fut nourri par la chèvre Amalthée, tandis que les Curètes, ses gardiens armés, couvraient ses cris du choc de leurs armes."],"links":["zeus","cronos"],"symbolLinks":["chèvre"]},{"id":"mont-parnasse","name":"Mont Parnasse","category":"montagne","coords":[38.53,22.59],"desc":"Montagne sacrée d'Apollon et des Muses, surplombant Delphes.","lore":["Le Parnasse abrite, outre le sanctuaire de Delphes sur ses contreforts, la source Castalie où les poètes venaient traditionnellement chercher l'inspiration, et passait pour un refuge des Muses aux côtés de l'Hélicon voisin.","C'est aussi sur ses pentes que, selon Ovide, Deucalion et Pyrrha trouvèrent refuge lors du grand déluge envoyé par Zeus pour anéantir l'humanité corrompue de l'âge de bronze — les deux seuls survivants, à l'origine d'une humanité nouvelle."],"links":["apollon","deucalion","pyrrha"],"symbolLinks":[]},{"id":"mont-hélicon","name":"Mont Hélicon","category":"montagne","coords":[38.3167,22.85],"desc":"Montagne de Béotie consacrée aux Muses, où jaillit la source Hippocrène.","lore":["Selon Hésiode, qui affirme y avoir lui-même reçu le don de la poésie de la bouche des Muses alors qu'il gardait ses troupeaux sur ses pentes, l'Hélicon était leur résidence favorite avec le Parnasse.","La source Hippocrène (« la fontaine du cheval ») y aurait jailli, dit-on, sous le sabot du cheval ailé Pégase, et ses eaux passaient pour inspirer quiconque en buvait."],"links":["pégase"],"symbolLinks":[]},{"id":"athènes-acropole","name":"Athènes (Acropole)","category":"cité","coords":[37.9715,23.7267],"desc":"Citadelle sacrée d'Athènes, consacrée à Athéna après sa victoire sur Poséidon.","lore":["Selon la tradition rapportée par Apollodore, Athéna et Poséidon se disputèrent la protection de la ville naissante : Poséidon en fit jaillir une source d'eau salée en frappant le rocher de son trident, tandis qu'Athéna y fit pousser le premier olivier ; jugée plus utile aux habitants, l'offrande d'Athéna lui valut la victoire et donna son nom à la cité.","Le Parthénon, temple dédié à Athéna Parthénos (« la Vierge »), y fut construit au Ve siècle av. J.-C. sous Périclès pour abriter une statue chryséléphantine monumentale de la déesse, également sculptée par Phidias."],"links":["athéna","poséidon"],"symbolLinks":["olivier","chouette"]},{"id":"mycènes","name":"Mycènes","category":"cité","coords":[37.7307,22.7563],"desc":"Citadelle légendaire d'Agamemnon, chef de l'expédition grecque contre Troie.","lore":["Décrite par Homère comme « riche en or », Mycènes fut, selon la tradition, la cité d'où Agamemnon partit à la tête de la coalition grecque pour venger l'enlèvement d'Hélène — et celle où, à son retour victorieux, il fut assassiné par son épouse Clytemnestre et l'amant de celle-ci, Égisthe.","La Porte des Lionnes, monumentale entrée de la citadelle datée du XIIIe siècle av. J.-C., et les tombes à coupole attribuées par la tradition postérieure à Agamemnon lui-même comptent parmi les vestiges les mieux conservés de cette civilisation aujourd'hui appelée « mycénienne » en son honneur."],"links":["agamemnon","clytemnestre"],"symbolLinks":[]},{"id":"thèbes","name":"Thèbes","category":"cité","coords":[38.32,23.32],"desc":"Cité fondée par Cadmos, théâtre du cycle mythologique d'Œdipe et de sa descendance.","lore":["Selon Apollodore, Cadmos, envoyé par son père à la recherche de sa sœur Europe enlevée par Zeus, renonça à la retrouver sur les conseils de l'oracle de Delphes et fonda Thèbes à l'endroit où une génisse, guide envoyée par le dieu, s'arrêta d'épuisement ; il y sema les dents d'un dragon tué, dont naquirent des guerriers armés, ancêtres de la noblesse thébaine.","Thèbes reste surtout associée au sombre destin d'Œdipe, qui y tua son père sans le savoir et en épousa la veuve, sa propre mère Jocaste — et à la guerre fratricide de ses fils, Étéocle et Polynice, connue sous le nom des Sept contre Thèbes."],"links":["cadmos","œdipe","dionysos"],"symbolLinks":[]},{"id":"troie","name":"Troie","category":"cité","coords":[39.9576,26.2386],"desc":"Cité assiégée dix ans par les Grecs, théâtre de l'Iliade d'Homère.","lore":["Identifiée depuis les fouilles de Heinrich Schliemann au XIXe siècle au site archéologique d'Hisarlik, en Turquie actuelle, Troie fut selon la légende assiégée pendant dix ans par une coalition grecque venue venger l'enlèvement d'Hélène par le prince troyen Pâris.","La ville tomba finalement grâce à la ruse du cheval de bois conçue par Ulysse — un épisode que l'Iliade elle-même ne raconte pas directement, s'achevant avant la chute de la cité, mais que rapportent l'Odyssée puis, plus tard, l'Énéide de Virgile."],"links":["hélène","pâris","ulysse","hector","priam","achille"],"symbolLinks":[]},{"id":"sparte","name":"Sparte","category":"cité","coords":[37.0755,22.4238],"desc":"Cité de Ménélas et d'Hélène, en Laconie.","lore":["Selon l'Iliade, c'est à Sparte que Pâris, reçu comme hôte par le roi Ménélas, séduisit ou enleva son épouse Hélène — un affront qui déclencha la guerre de Troie.","Sparte fut aussi, dans les récits les plus tardifs, associée à Castor et Pollux, les Dioscures, frères d'Hélène et fils de Léda, honorés dans toute la région comme protecteurs de la cité et des marins."],"links":["ménélas","hélène","castor","pollux"],"symbolLinks":[]},{"id":"argos","name":"Argos","category":"cité","coords":[37.6333,22.7333],"desc":"L'une des plus anciennes cités de Grèce, particulièrement consacrée au culte d'Héra.","lore":["Argos abritait l'Héraion, l'un des plus importants sanctuaires d'Héra du monde grec, où la déesse était honorée comme protectrice du mariage et de la cité elle-même — un culte si central que la région tout entière, l'Argolide, lui était traditionnellement associée.","La cité fut aussi, selon Apollodore, le lieu de naissance de Persée, né de l'union de Zeus et de Danaé alors que celle-ci était enfermée par son père Acrisios dans une chambre souterraine de bronze, pour tenter d'échapper à une prophétie qui annonçait sa propre mort par la main de son petit-fils."],"links":["héra","persée","danaé","acrisios"],"symbolLinks":[]},{"id":"corinthe","name":"Corinthe","category":"cité","coords":[37.9061,22.8781],"desc":"Cité isthmique associée à Sisyphe et à l'épisode grec de Médée.","lore":["Fondée, selon la légende, par le rusé Sisyphe, Corinthe doit à ce roi son châtiment le plus célèbre des Enfers : condamné à rouler éternellement un rocher jusqu'au sommet d'une colline d'où il retombe aussitôt, pour avoir par deux fois trompé la mort elle-même.","C'est également à Corinthe qu'Euripide situe l'épisode le plus tragique de Médée : abandonnée par Jason pour la fille du roi local Créon, elle s'y venge en tuant sa rivale puis ses propres enfants, avant de fuir sur un char attelé de dragons ailés offert par son grand-père Hélios."],"links":["médée","jason","hélios"],"symbolLinks":[]},{"id":"cnossos","name":"Cnossos","category":"cité","coords":[35.2977,25.1633],"desc":"Palais crétois du roi Minos, siège légendaire du Labyrinthe et du Minotaure.","lore":["Le palais monumental de Cnossos, mis au jour par l'archéologue Arthur Evans au début du XXe siècle, a longtemps été identifié à la demeure du roi Minos et au Labyrinthe construit par l'artisan Dédale pour y enfermer le Minotaure, fruit de l'union contre nature de la reine Pasiphaé et d'un taureau envoyé par Poséidon.","Chaque année (ou tous les neuf ans, selon les versions), sept jeunes gens et sept jeunes filles athéniens y étaient envoyés en tribut pour être dévorés par le monstre, jusqu'à ce que Thésée, aidé du fil offert par Ariane, parvienne à le tuer et à ressortir du dédale."],"links":["minos","pasiphaé","dédale","thésée","ariane"],"symbolLinks":["labyrinthe","taureau","fil"]},{"id":"ithaque","name":"Ithaque","category":"île","coords":[38.42,20.71],"desc":"Île-royaume d'Ulysse, dans les îles Ioniennes.","lore":["Patrie d'Ulysse, Ithaque est le but du voyage de dix années que raconte l'Odyssée d'Homère — un retour sans cesse retardé par la colère de Poséidon, dont le héros avait aveuglé le fils, le cyclope Polyphème.","À son retour, déguisé en mendiant pour ne pas être reconnu, Ulysse y retrouve son épouse Pénélope, qui a tenu à distance ses prétendants pendant des années grâce à la ruse du linceul tissé le jour et défait chaque nuit."],"links":["ulysse","pénélope","poséidon"],"symbolLinks":["fil"]},{"id":"naxos","name":"Naxos","category":"île","coords":[37.1036,25.4761],"desc":"Île où Ariane, abandonnée par Thésée, fut trouvée par Dionysos.","lore":["Selon la version la plus répandue de la légende, Thésée, après avoir tué le Minotaure grâce à l'aide d'Ariane, l'abandonna endormie sur l'île de Naxos lors de leur fuite commune de Crète — un épisode dont les raisons varient selon les auteurs antiques.","C'est là que Dionysos, découvrant Ariane en pleurs, en tomba amoureux et l'épousa, lui offrant selon certaines versions une couronne qui devint plus tard la constellation de la Couronne boréale."],"links":["ariane","thésée","dionysos"],"symbolLinks":["couronne"]},{"id":"lemnos","name":"Lemnos","category":"île","coords":[39.917,25.137],"desc":"Île où Héphaïstos, rejeté de l'Olympe, retomba et établit sa forge.","lore":["Selon l'Iliade, Héphaïstos, jeté du haut de l'Olympe par son père Zeus (ou, selon une autre version, par sa mère Héra honteuse de sa difformité), tomba toute une journée avant de s'écraser sur l'île de Lemnos, où les habitants le recueillirent.","L'île resta associée au culte du dieu forgeron et à ses forges volcaniques ; elle est aussi connue pour le mythe des femmes de Lemnos, qui massacrèrent tous leurs hommes après que ceux-ci les eurent délaissées, un épisode que croisent plus tard les Argonautes lors de leur escale sur l'île."],"links":["héphaïstos","héra","zeus"],"symbolLinks":[]},{"id":"samothrace","name":"Samothrace","category":"île","coords":[40.5,25.528],"desc":"Île du nord de l'Égée, siège des mystères des Grands Dieux (Cabires).","lore":["Samothrace abritait un sanctuaire consacré à des divinités préhelléniques mystérieuses, les Cabires (ou Grands Dieux), dont les mystères, réputés protéger notamment les marins des naufrages, attirèrent des initiés de tout le monde grec, dont certains rois macédoniens.","La statue de la Victoire de Samothrace, aujourd'hui conservée au musée du Louvre, fut découverte sur ce site en 1863."],"links":[],"symbolLinks":[]},{"id":"rhodes","name":"Rhodes","category":"île","coords":[36.4341,28.2176],"desc":"Île consacrée au dieu solaire Hélios, qui érigea le Colosse à son entrée de port.","lore":["Selon la tradition, Rhodes fut offerte à Hélios par Zeus lors du partage du monde entre les dieux, au moment où le dieu solaire, absent ce jour-là, réclama en compensation cette île tout juste sortie des flots.","Le Colosse de Rhodes, statue monumentale d'Hélios haute d'une trentaine de mètres élevée à l'entrée du port au IIIe siècle av. J.-C. et comptée parmi les Sept Merveilles du monde antique, s'effondra lors d'un tremblement de terre moins d'un siècle après son érection."],"links":["hélios","zeus"],"symbolLinks":[]},{"id":"samos","name":"Samos","category":"île","coords":[37.75,26.9833],"desc":"Île égéenne où se trouvait l'un des plus grands sanctuaires d'Héra du monde grec.","lore":["Samos revendiquait être le lieu de naissance d'Héra elle-même, née selon la tradition locale au bord du fleuve Imbrasos ; son sanctuaire, l'Héraion de Samos, comptait parmi les plus vastes temples jamais construits en Grèce archaïque."],"links":["héra"],"symbolLinks":[]},{"id":"hellespont","name":"Hellespont (Dardanelles)","category":"détroit","coords":[40.2,26.4],"desc":"Détroit des Dardanelles, nommé d'après Hellé, tombée dans ses eaux.","lore":["Selon la légende du bélier à la Toison d'or, Hellé, fuyant avec son frère Phrixos la persécution de leur belle-mère sur le dos d'un bélier ailé envoyé par Zeus, glissa et tomba dans le détroit qui sépare l'Europe de l'Asie — lequel prit dès lors le nom d'Hellespont, « la mer d'Hellé ».","Le détroit est aussi le théâtre du mythe plus tardif de Léandre, qui le traversait chaque nuit à la nage depuis Abydos pour rejoindre sa bien-aimée Héro, prêtresse d'Aphrodite à Sestos, jusqu'à ce qu'il s'y noie par une nuit de tempête."],"links":["aphrodite"],"symbolLinks":[]},{"id":"détroit-de-messine","name":"Détroit de Messine","category":"détroit","coords":[38.23,15.63],"desc":"Détroit séparant l'Italie de la Sicile, repaire mythique de Charybde et Scylla.","lore":["Selon l'Odyssée, ce passage resserré entre l'Italie et la Sicile était gardé de part et d'autre par deux monstres : Charybde, un tourbillon dévorant qui engloutissait trois fois par jour toutes les eaux environnantes, et Scylla, créature à six têtes de chien nichée dans une grotte de la rive opposée — un passage si dangereux qu'Ulysse dut sacrifier une partie de son équipage à Scylla pour éviter l'anéantissement total dans le gouffre de Charybde."],"links":["ulysse"],"symbolLinks":[]},{"id":"colonnes-d-héraclès","name":"Colonnes d'Héraclès (Gibraltar)","category":"détroit","coords":[36.1408,-5.3536],"desc":"Détroit de Gibraltar, limite occidentale du monde connu des Grecs anciens.","lore":["Selon la tradition, Héraclès aurait dressé deux colonnes de part et d'autre du détroit séparant l'Europe de l'Afrique lors de son dixième travail, la capture des bœufs du géant Géryon — un geste marquant symboliquement la limite du monde habité connu des Grecs, au-delà de laquelle s'étendait l'Océan primordial.","L'expression « ne pas dépasser les Colonnes d'Hercule » est ainsi restée, jusque dans l'Antiquité tardive, une façon de désigner l'extrême limite de ce qu'il est raisonnable d'entreprendre."],"links":["héraclès"],"symbolLinks":[]},{"id":"bosphore","name":"Bosphore","category":"détroit","coords":[41.12,29.07],"desc":"Détroit séparant l'Europe de l'Asie, nommé d'après le passage de la génisse Io.","lore":["Le nom du Bosphore (« le passage de la vache ») viendrait, selon la tradition, du passage en cet endroit d'Io, la prêtresse aimée de Zeus transformée en génisse blanche pour la soustraire à la jalousie d'Héra, durant son errance tourmentée par un taon envoyé par la déesse à travers le monde.","À l'entrée du détroit, du côté du Pont-Euxin (la mer Noire), la tradition situait les Symplégades, deux rochers mobiles qui s'entrechoquaient pour broyer les navires de passage — un obstacle que les Argonautes ne franchirent, selon Apollonios de Rhodes, qu'en y lâchant d'abord une colombe pour tester le passage."],"links":["io","héra","zeus"],"symbolLinks":[]},{"id":"source-castalie","name":"Source Castalie","category":"source","coords":[38.4841,22.5029],"desc":"Source sacrée de Delphes où les pèlerins et la Pythie devaient se purifier.","lore":["Jaillissant entre les Phédriades, les deux parois rocheuses qui dominent Delphes, la source Castalie servait à la purification rituelle obligatoire de tout visiteur du sanctuaire, prêtres compris, avant toute consultation de l'oracle.","Elle passait également pour une source d'inspiration poétique, les eaux « castaliennes » devenant, dans la littérature antique puis dans la tradition occidentale qui en hérite, une métaphore courante de l'inspiration des poètes."],"links":["apollon","pythie"],"symbolLinks":["source"]},{"id":"fleuve-alphée","name":"Fleuve Alphée","category":"source","coords":[37.64,21.65],"desc":"Principal fleuve d'Élide, qui traverse le sanctuaire d'Olympie.","lore":["Le dieu-fleuve Alphée, selon la légende rapportée par Pausanias, poursuivit de son amour la nymphe Aréthuse jusque sous la mer, où elle fut changée en source par Artémis pour lui échapper — une légende que les Grecs de Sicile, où se trouve la source d'Aréthuse près de Syracuse, expliquaient en imaginant que les eaux du fleuve grec continuaient leur course sous la Méditerranée.","C'est aussi ce fleuve qu'Héraclès dérive, selon une version de son cinquième travail, pour nettoyer en un seul jour les écuries du roi Augias, jamais nettoyées depuis des années."],"links":["héraclès","artémis"],"symbolLinks":["source"]},{"id":"achéron-nekromanteion","name":"Nekromanteion de l'Achéron","category":"monde souterrain","coords":[39.227,20.47],"desc":"Site d'Épire identifié dans l'Antiquité à une entrée des Enfers, sur les rives de l'Achéron.","lore":["Le Nekromanteion, sanctuaire oraculaire construit sur les rives du fleuve Achéron en Épire, était consacré à la consultation des morts (nekromanteia) : les pèlerins y descendaient dans des chambres souterraines dans l'espoir d'entrer en contact avec les esprits des défunts.","L'Achéron lui-même comptait, avec le Styx, parmi les fleuves des Enfers que les âmes devaient franchir sous la conduite du nocher Charon — un site que la tradition locale, rapportée notamment par Hérodote, associait directement au royaume d'Hadès."],"links":["hadès","charon"],"symbolLinks":["monde souterrain"]},{"id":"cap-ténare","name":"Cap Ténare","category":"monde souterrain","coords":[36.3833,22.4833],"desc":"Pointe la plus méridionale du Péloponnèse, où s'ouvrait, selon la tradition, une entrée des Enfers.","lore":["Une grotte du cap Ténare passait dans l'Antiquité pour l'une des entrées du royaume d'Hadès sur la terre ferme ; c'est par là, selon certaines versions rapportées par Apollodore, qu'Héraclès serait descendu pour accomplir son douzième et dernier travail, la capture du chien Cerbère.","La tradition y situe également la descente d'Orphée aux Enfers pour tenter de ramener son épouse Eurydice, morte prématurément d'une morsure de serpent."],"links":["héraclès","orphée","hadès"],"symbolLinks":["monde souterrain","serpent"]},{"id":"aulis","name":"Aulis","category":"cité","coords":[38.4,23.5967],"desc":"Port de Béotie d'où la flotte grecque appareilla pour Troie, après le sacrifice d'Iphigénie.","lore":["Selon la tragédie d'Euripide, la flotte grecque réunie à Aulis pour partir vers Troie resta bloquée par l'absence de vent, punition d'Artémis contre Agamemnon pour une offense qu'il avait commise contre elle ; le devin Calchas révéla que seul le sacrifice de sa fille Iphigénie apaiserait la déesse.","Selon la version la plus répandue, la jeune fille fut effectivement immolée sur l'autel — mais une tradition parallèle, déjà présente chez Euripide dans sa pièce Iphigénie en Tauride, veut qu'Artémis l'ait substituée au dernier moment par une biche et l'ait transportée en Tauride pour en faire sa prêtresse."],"links":["agamemnon","artémis","calchas"],"symbolLinks":[]},{"id":"éphèse","name":"Éphèse","category":"sanctuaire","coords":[37.9395,27.3417],"desc":"Cité d'Ionie abritant le célèbre temple d'Artémis, l'une des Sept Merveilles du monde antique.","lore":["Le temple d'Artémis à Éphèse, reconstruit à plusieurs reprises après incendies et séismes, comptait parmi les Sept Merveilles du monde antique par ses dimensions colossales pour l'époque ; il abritait un culte d'Artémis aux traits particuliers, mêlant la déesse grecque de la chasse à des éléments d'une divinité-mère anatolienne plus ancienne.","Selon une légende rapportée par Plutarque, le temple aurait été incendié par un certain Érostrate, en 356 av. J.-C., dans le seul but de rendre son nom immortel — épisode qui a donné naissance à l'expression « complexe d'Érostrate »."],"links":["artémis"],"symbolLinks":[]},{"id":"carthage","name":"Carthage","category":"cité","coords":[36.8528,10.3233],"desc":"Cité fondée par la reine Didon, où elle aima puis perdit Énée.","lore":["Selon l'Énéide de Virgile, la reine phénicienne Didon (voir la fiche « Didon »), fuyant Tyr après le meurtre de son époux par son propre frère, fonda Carthage sur la côte d'Afrique du Nord — un territoire qu'elle négocia, dit-on, en ne demandant que ce qu'une peau de bœuf découpée en fines lanières pourrait entourer, avant d'en couvrir toute une colline par la ruse.","C'est à Carthage qu'Énée (voir la fiche « Énée »), échoué avec les rescapés de Troie après des années d'errance, trouva refuge auprès de Didon, dont il se fit aimer — avant de la quitter sur l'ordre des dieux pour accomplir son destin en Italie, la laissant se donner la mort de désespoir sur un bûcher."],"links":["didon","énée"],"symbolLinks":[]},{"id":"lavinium","name":"Lavinium","category":"cité","coords":[41.6667,12.4833],"desc":"Cité fondée par Énée en Italie, berceau légendaire du peuple romain.","lore":["Après avoir quitté Didon et Carthage, Énée (voir la fiche « Énée ») aborde enfin en Italie, où le roi Latinus lui accorde la main de sa fille Lavinia — non sans devoir d'abord vaincre Turnus, son rival déjà promis à la jeune femme, dans la guerre que raconte la seconde moitié de l'Énéide.","Énée y fonde Lavinium, qu'il nomme en l'honneur de son épouse : selon la légende romaine, son fils Ascagne fondera à son tour Albe la Longue, dont descendront plusieurs générations plus tard les jumeaux Romulus et Remus, fondateurs de Rome elle-même."],"links":["énée"],"symbolLinks":[]}];

// Icône, libellé pluriel et couleur (variable CSS déjà définie dans styles.css) pour chaque
// catégorie de lieu — sert à la fois aux marqueurs sur la carte et à la légende/aux filtres.
const MAP_CATEGORY_META = {
  "sanctuaire":        { icon:"🏛", label:"Sanctuaires",   color:"var(--bronze)" },
  "montagne":          { icon:"⛰",  label:"Montagnes",     color:"var(--laurel)" },
  "cité":              { icon:"🏺", label:"Cités",         color:"var(--ink-soft)" },
  "île":               { icon:"🏝", label:"Îles",          color:"#3d7a8c" },
  "détroit":           { icon:"🌊", label:"Mers & détroits", color:"#1f5c74" },
  "source":            { icon:"💧", label:"Sources & fleuves", color:"#2f7ba3" },
  "monde souterrain":  { icon:"💀", label:"Monde souterrain", color:"#5a3a2e" },
};

// Illustrations dédiées par catégorie de lieu (fournies par l'utilisatrice, fond détouré) —
// même principe que SYMBOL_ILLUSTRATIONS : remplace l'emoji de MAP_CATEGORY_META partout où il
// apparaît (marqueur, légende/filtres, liste, badge de fiche) via mapCategoryIconHTML() ci-dessous.
const MAP_CATEGORY_ILLUSTRATIONS = {
  "sanctuaire": "assets/map-icon-sanctuaire.webp",
  "montagne": "assets/map-icon-montagne.webp",
  "cité": "assets/map-icon-cite.webp",
  "île": "assets/map-icon-ile.webp",
  "détroit": "assets/map-icon-detroit.webp",
  "source": "assets/map-icon-source.webp",
  "monde souterrain": "assets/map-icon-souterrain.webp",
};

// Icône d'une catégorie de lieu : illustration si disponible (classe CSS au choix de l'appelant,
// pour s'adapter au marqueur/à la puce/au badge), sinon repli sur l'emoji d'origine.
function mapCategoryIconHTML(category, cls){
  const illustration = MAP_CATEGORY_ILLUSTRATIONS[category];
  const meta = MAP_CATEGORY_META[category] || { icon: "📍" };
  if(illustration) return `<img class="${cls}" src="${escapeHTML(illustration)}" alt="" loading="lazy">`;
  return `<i class="${cls} ${cls}-emoji">${meta.icon}</i>`;
}

const MAP_PLACE_ENTRIES = MAP_PLACES.slice().sort((a, b) => a.name.localeCompare(b.name, "fr"));

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

// Choisit la figure du jour de façon déterministe (hash du jour civil), puis épingle ce choix
// dans localStorage pour toute la journée : sans ça, une mise à jour du corpus en cours de
// journée (une figure ajoutée ou retirée change la longueur de FIGURE_ENTRIES, donc le reste
// de la division hash % longueur) ferait changer la figure affichée en plein milieu de la
// journée pour qui rechargerait la page — précisément ce que l'utilisatrice a signalé. Une
// fois choisie pour une date donnée, elle ne change plus avant le lendemain, quoi qu'il
// arrive au corpus entre-temps.
function figureOfTheDay(){
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  const compute = () => FIGURE_ENTRIES[djb2Hash(key) % FIGURE_ENTRIES.length];
  try {
    const stored = JSON.parse(localStorage.getItem("pantheon-fotd") || "null");
    if(stored && stored.date === key){
      const pinned = FIGURE_ENTRIES.find(e => e[0] === stored.id);
      if(pinned) return pinned;
    }
    const entry = compute();
    localStorage.setItem("pantheon-fotd", JSON.stringify({ date: key, id: entry[0] }));
    return entry;
  } catch(e){
    return compute();
  }
}

/* ===================== RENDU : ÉCRANS ===================== */

// Quelques étoiles à positions/durées pseudo-aléatoires mais déterministes (même hasard à
// chaque rendu, pour ne pas les voir sauter partout à chaque re-render de l'écran d'accueil).
const FOTD_STAR_SEEDS = [11, 47, 83, 19, 61, 29];
function fotdStarsHTML(){
  return FOTD_STAR_SEEDS.map(seed => {
    const left = (seed * 37) % 100;
    const top = (seed * 53) % 100;
    const delay = (seed % 7) * 0.4;
    const duration = 2.2 + (seed % 5) * 0.3;
    return `<span class="fotd-star" style="left:${left}%; top:${top}%; animation-delay:${delay}s; animation-duration:${duration}s;"></span>`;
  }).join("");
}

function figureOfTheDayHTML(){
  const [id, name, note] = figureOfTheDay();
  const portrait = DEITY_PORTRAITS[id];
  return `
    <section class="fotd">
      <h2 class="fotd-label">À découvrir aujourd'hui</h2>
      <button class="fotd-card" data-nav="figureDetail" data-id="${escapeHTML(id)}">
        <span class="fotd-stars" aria-hidden="true">${fotdStarsHTML()}</span>
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
      <img class="hero-banner" src="assets/hero-olympians.jpg" alt="Les douze dieux de l'Olympe : Hestia, Déméter, Héra, Zeus, Poséidon, Apollon, Artémis, Athéna, Arès, Aphrodite, Héphaïstos et Hermès">
      <h1>Panthéon</h1>
      <p class="tagline">Apprends la mythologie grecque à travers ses dieux, héros et symboles.</p>
      <img class="tagline-olive" src="assets/home-olive-branch.webp" alt="">
    </header>
    ${figureOfTheDayHTML()}
    <div class="tiles">
      <button class="tile" data-nav="figures">
        <img class="tile-badge" src="assets/badge-figures-portrait.webp" alt="">
        <span class="tile-title">Figures mythologiques</span>
        <span class="tile-count">${FIGURE_ENTRIES.length} fiches</span>
        <span class="tile-desc">Découvrez les dieux, héros et créatures des mythes grecs.</span>
      </button>
      <button class="tile" data-nav="symbols">
        <img class="tile-badge" src="assets/badge-symbols-lyre.webp" alt="">
        <span class="tile-title">Bibliothèque symbolique</span>
        <span class="tile-count">${SYMBOL_ENTRIES.length} symboles</span>
        <span class="tile-desc">Explorez les objets, animaux et attributs qui peuplent les mythes.</span>
      </button>
      <button class="tile" data-nav="genealogyHome">
        <img class="tile-badge" src="assets/badge-genealogy-mother.webp" alt="">
        <span class="tile-title">Généalogie des dieux</span>
        <span class="tile-count">${GENEALOGY_FIGURE_COUNT} figures reliées</span>
        <span class="tile-desc">Suivez les liens de parenté entre les grandes figures mythologiques.</span>
      </button>
      <button class="tile" data-nav="places">
        <img class="tile-badge" src="assets/badge-places-map.webp" alt="">
        <span class="tile-title">Lieux mythologiques</span>
        <span class="tile-count">${MAP_PLACES.length} lieux sur la carte</span>
        <span class="tile-desc">Parcourez les lieux où se déroulent les grands récits mythologiques.</span>
      </button>
    </div>
    <p class="home-footer-link"><a href="./politique-confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a></p>
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
    <span class="list-item-title">${escapeHTML(name)}${figureAccess(id) === "premium" ? ' <span class="lock-badge">🔒</span>' : ""}</span>
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
    <span class="list-item-title">${escapeHTML(s.label)}${symbolAccess(id) === "premium" ? ' <span class="lock-badge">🔒</span>' : ""}</span>
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
          const icon = kind === "symbol" ? symbolChipIconHTML(id, val) : "";
          return `<button class="${cls}" ${attr} data-id="${escapeHTML(id)}">${icon}${escapeHTML(label)}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

// Petit groupe de chips (une liste de figures) dans un sous-titre — brique commune à l'écran
// de généalogie (Parents/Union(s)/Fratrie/Enfants) et à la section « Lignée » d'une fiche.
// Contrairement aux chips de relatedChipsHTML (qui ouvrent directement une fiche), celles-ci
// recentrent l'arbre généalogique sur la figure cliquée — c'est tout l'intérêt de l'écran.
function genealogyChipsHTML(ids, title){
  if(!ids.length) return "";
  const sorted = ids.slice().sort(byGenealogyDisplayName);
  return `
    <div class="geneal-group">
      <h4>${escapeHTML(title)}</h4>
      <div class="chips">
        ${sorted.map(gid => `<button class="chip${DEITY_PORTRAITS[gid] ? " chip-portrait" : ""}" data-nav="genealogy" data-id="${escapeHTML(gid)}">${genealogyPortraitHTML(gid)}${escapeHTML(genealogyDisplayName(gid))}</button>`).join("")}
      </div>
    </div>
  `;
}

/* ===================== ARBRE GÉNÉALOGIQUE : MOTEUR GÉNÉRIQUE =====================
   Personnes -> Unions -> Enfants -> Connecteurs SVG. Aucune ligne n'est plus approximée avec
   des bordures CSS : chaque carte (.ft-card) et chaque couple (.ft-couple) porte un data-slot
   unique, et après l'injection du HTML, drawFamTree() lit la position RÉELLE de chaque nœud
   (getBoundingClientRect()) pour tracer, dans un <svg> superposé, des connecteurs strictement
   orthogonaux (jamais de diagonale) : une ligne de mariage entre les deux conjoints, une ligne
   descendante depuis son milieu, une ligne de fratrie horizontale, puis une petite chute
   verticale vers chaque enfant. Entièrement générique : ni Cronos, ni Zeus, ni aucune autre
   figure n'est câblée en dur dans ce moteur — seules les données (qui est l'enfant de qui,
   voir GENEALOGY_PARENTS/GENEALOGY_CHILDREN) pilotent la forme de l'arbre, ce qui le rend
   extensible à autant de figures qu'on voudra plus tard sans toucher au moteur lui-même. */

let FT_SEQ = 0;
let FT_CONNECTORS = []; // [{ unionSlot, childSlots: [...] }] — posé par le dernier écran d'arbre rendu, consommé par drawFamTree() juste après l'injection du HTML.

// Une carte-personne (ou, pour "la mer", une carte-symbole — seule exception, Ouranos + la mer
// n'étant pas une union entre deux figures du corpus). `self: true` la rend non cliquable (on
// est déjà sur cette fiche) et lui donne un contour distinct ; sinon elle ouvre l'arbre de la
// figure cliquée. Chaque appel produit une instance indépendante avec son propre data-slot,
// même pour la même figure (un même conjoint qui revient dans plusieurs unions, par exemple) —
// une duplication assumée et strictement identique visuellement à chaque fois.
function ftCardMarkup(id, opts){
  opts = opts || {};
  const slot = `p${FT_SEQ++}`;
  const isSymbol = !!opts.symbol;
  const name = isSymbol ? (SYMBOL_LIBRARY[id] ? SYMBOL_LIBRARY[id].label : genealogyDisplayName(id)) : genealogyDisplayName(id);
  const portrait = isSymbol ? "" : genealogyPortraitHTML(id);
  // Les douze Olympiens (OLYMPIAN_IDS) ressortent dans une couleur distincte partout où leur
  // carte apparaît dans un arbre — pas seulement sur l'écran qui leur est dédié — pour repérer
  // en un coup d'œil qui, parmi parents/conjoints/enfants, en fait partie.
  const olympianCls = (!isSymbol && OLYMPIAN_IDS.includes(id)) ? " ft-card-olympian" : "";
  if(opts.self){
    return { slot, html: `<div class="ft-card ft-card-self${olympianCls}" data-slot="${slot}">${portrait}<span class="ft-card-name">${escapeHTML(name)}</span></div>` };
  }
  const nav = isSymbol ? "symbolDetail" : "genealogy";
  return { slot, html: `<button class="ft-card${olympianCls}" data-slot="${slot}" data-nav="${nav}" data-id="${escapeHTML(id)}">${portrait}<span class="ft-card-name">${escapeHTML(name)}</span></button>` };
}

// Une branche : un couple (une ou deux cartes, réunies dans un .ft-couple qui porte son propre
// data-slot) suivi, le cas échéant, d'une rangée d'enfants — chaque enfant étant lui-même soit
// une simple feuille, soit une branche complète imbriquée (voir ftLeaf/récursivité de Zeus dans
// les Olympiens). Si des enfants sont fournis, le connecteur correspondant est enregistré ici :
// il sera tracé plus tard, une fois les positions réelles connues.
function ftBranchHTML(connectors, spec){
  const unionSlot = `u${FT_SEQ++}`;
  if(spec.childSlots && spec.childSlots.length){
    connectors.push({ unionSlot, childSlots: spec.childSlots });
  }
  return {
    slot: unionSlot,
    html: `<div class="ft-branch">
      <div class="ft-couple" data-slot="${unionSlot}">${spec.cardA.html}${spec.cardB ? spec.cardB.html : ""}</div>
      ${spec.childrenHTML ? `<div class="ft-children-row">${spec.childrenHTML}</div>` : ""}
    </div>`
  };
}

// Une feuille : une branche à une seule carte, sans descendance affichée à cet endroit.
function ftLeaf(connectors, id, opts){
  return ftBranchHTML(connectors, { cardA: ftCardMarkup(id, opts) });
}

// Une branche ascendante : les parents connus d'`personId` (0, 1 ou 2), reliés par une ligne
// de mariage jusqu'à `childCard` — qui est la carte RÉELLE de cette personne telle qu'affichée
// plus bas dans l'arbre (jamais une nouvelle instance dupliquée), pour que le connecteur
// aboutisse exactement à la bonne carte. Renvoie une chaîne vide s'il n'y a aucun parent connu
// à afficher (jamais de case vide pour autant).
function ftAncestorBranchHTML(connectors, childCard, personId){
  const gps = GENEALOGY_PARENTS[personId] || [];
  if(!gps.length) return "";
  const a = ftCardMarkup(gps[0]);
  const b = gps[1] ? ftCardMarkup(gps[1]) : null;
  const unionSlot = `u${FT_SEQ++}`;
  connectors.push({ unionSlot, childSlots: [childCard.slot] });
  return `<div class="ft-branch ft-branch-ancestor"><div class="ft-couple" data-slot="${unionSlot}">${a.html}${b ? b.html : ""}</div></div>`;
}

// La branche complète d'une figure et de sa propre descendance : sa carte, puis — si elle a un
// ou plusieurs unions documentées — une sous-rangée avec, pour chacune, un couple {figure +
// conjoint} menant à ses enfants (groupés par union, jamais mélangés). La figure centrale est
// donc dupliquée une fois par union (voir la remarque sur Zeus plus haut) : c'est le prix d'un
// arbre lisible plutôt qu'une unique ligne ambiguë reliant un seul nœud à tous ses conjoints.
function ftPersonBranchHTML(connectors, id, childUnions, opts){
  if(!childUnions.length) return ftLeaf(connectors, id, opts);
  if(childUnions.length === 1){
    // Une seule union : inutile de dessiner la figure une première fois comme simple « hub »
    // puis une seconde comme moitié du couple juste en dessous — le couple lui-même devient
    // directement la branche (demande explicite : « tu aurais pu mettre [le conjoint] à côté
    // de [la figure] directement, pour pas avoir à la remettre »). La duplication par union
    // (voir plus bas) ne se justifie que s'il faut départager plusieurs conjoints.
    const u = childUnions[0];
    const kids = u.children.map(cid => ftLeaf(connectors, cid));
    return ftBranchHTML(connectors, {
      cardA: ftCardMarkup(id, opts),
      cardB: u.partner ? ftCardMarkup(u.partner) : null,
      childrenHTML: kids.map(k => k.html).join(""),
      childSlots: kids.map(k => k.slot),
    });
  }
  const subNodes = childUnions.map(u => {
    const kids = u.children.map(cid => ftLeaf(connectors, cid));
    return ftBranchHTML(connectors, {
      cardA: ftCardMarkup(id, opts),
      cardB: u.partner ? ftCardMarkup(u.partner) : null,
      childrenHTML: kids.map(k => k.html).join(""),
      childSlots: kids.map(k => k.slot),
    });
  });
  return ftBranchHTML(connectors, {
    cardA: ftCardMarkup(id, opts),
    childrenHTML: subNodes.map(n => n.html).join(""),
    childSlots: subNodes.map(n => n.slot),
  });
}

// Trace, dans le <svg id="ftLinks"> superposé à #ftTree, tous les connecteurs enregistrés dans
// FT_CONNECTORS — à partir des positions RÉELLES des cartes (getBoundingClientRect()), jamais
// de coordonnées devinées à l'avance. Toujours strictement orthogonal : une ligne de mariage
// horizontale, une chute verticale depuis son milieu, un bus de fratrie horizontal, puis une
// petite chute verticale vers chaque enfant — recalculé à chaque appel, donc valable après un
// redimensionnement, un changement de contenu ou un défilement (les coordonnées sont relatives
// au conteneur de l'arbre, qui défile avec le SVG : le défilement ne les fait jamais dériver).
function drawFamTree(){
  const tree = document.getElementById("ftTree");
  const svg = document.getElementById("ftLinks");
  if(!tree || !svg || typeof tree.getBoundingClientRect !== "function") return;
  const treeRect = tree.getBoundingClientRect();
  if(!treeRect.width || !treeRect.height) return;
  svg.setAttribute("viewBox", `0 0 ${treeRect.width} ${treeRect.height}`);
  let out = "";
  for(const conn of FT_CONNECTORS){
    const originEl = tree.querySelector(`[data-slot="${conn.unionSlot}"]`);
    if(!originEl) continue;
    const cards = originEl.classList.contains("ft-couple") ? Array.from(originEl.querySelectorAll(":scope > .ft-card")) : [originEl];
    let trunkX, trunkY;
    if(cards.length === 2){
      const ra = cards[0].getBoundingClientRect(), rb = cards[1].getBoundingClientRect();
      const y = (Math.max(ra.top, rb.top) + Math.min(ra.bottom, rb.bottom)) / 2 - treeRect.top;
      const x1 = ra.right - treeRect.left, x2 = rb.left - treeRect.left;
      if(x2 > x1){
        out += `<line class="ft-line" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`;
        out += `<circle class="ft-joint" cx="${(x1 + x2) / 2}" cy="${y}" r="3.5" />`;
      }
      trunkX = (x1 + x2) / 2;
      trunkY = y;
    } else {
      const r = cards[0].getBoundingClientRect();
      trunkX = r.left + r.width / 2 - treeRect.left;
      trunkY = r.bottom - treeRect.top;
    }
    if(!conn.childSlots || !conn.childSlots.length) continue;
    const childRects = conn.childSlots
      .map(slot => tree.querySelector(`[data-slot="${slot}"]`))
      .filter(Boolean)
      .map(el => el.getBoundingClientRect());
    if(!childRects.length) continue;
    const childTopYs = childRects.map(r => r.top - treeRect.top);
    const childCenterXs = childRects.map(r => r.left + r.width / 2 - treeRect.left);
    const rowTopY = Math.min(...childTopYs);
    const busY = trunkY + Math.max(18, (rowTopY - trunkY) / 2);
    out += `<line class="ft-line" x1="${trunkX}" y1="${trunkY}" x2="${trunkX}" y2="${busY}" />`;
    const busX1 = Math.min(trunkX, ...childCenterXs), busX2 = Math.max(trunkX, ...childCenterXs);
    if(busX2 > busX1) out += `<line class="ft-line" x1="${busX1}" y1="${busY}" x2="${busX2}" y2="${busY}" />`;
    childCenterXs.forEach((cx, i) => {
      out += `<line class="ft-line" x1="${cx}" y1="${busY}" x2="${cx}" y2="${childTopYs[i]}" />`;
    });
  }
  svg.innerHTML = out;
}

// Centre le défilement horizontal de l'arbre sur sa figure la plus pertinente au premier
// affichage — la figure centrale (.ft-card-self) sur une fiche familiale, ou à défaut la
// première carte du tout premier couple (la racine de l'arbre, ex. Cronos + Rhéa) — plutôt que
// de laisser l'écran s'ouvrir sur le bord gauche brut d'un arbre qui peut être bien plus large
// que l'écran (un enfant très prolifique, comme Zeus, pousse toute la largeur totale très loin
// vers la droite). Appelé une seule fois au montage, jamais lors des redessins ultérieurs — on
// ne doit jamais reprendre la main sur un défilement que la lectrice a fait elle-même depuis.
function centerFamTreeScroll(){
  if(typeof document.querySelector !== "function") return;
  const scrollEl = document.querySelector(".ft-scroll");
  const tree = document.getElementById("ftTree");
  if(!scrollEl || !tree || typeof scrollEl.getBoundingClientRect !== "function" || typeof tree.querySelector !== "function") return;
  const target = tree.querySelector(".ft-card-self") || tree.querySelector(".ft-couple, .ft-card");
  if(!target || typeof target.getBoundingClientRect !== "function") return;
  const scrollRect = scrollEl.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetCenterX = targetRect.left + targetRect.width / 2 - scrollRect.left + scrollEl.scrollLeft;
  scrollEl.scrollLeft = Math.max(0, targetCenterX - scrollRect.width / 2);
}

// Recalcule les connecteurs chaque fois que la taille de l'arbre change pour une raison
// quelconque — redimensionnement de la fenêtre, contenu qui se charge, disposition responsive —
// plutôt que de ne réagir qu'à l'un de ces cas précis. Un seul ResizeObserver réutilisé (jamais
// empilé) : reconnecté au nouveau #ftTree après chaque render(), déconnecté du précédent avant.
let ftResizeObserver = null;
function initFamTree(){
  const tree = document.getElementById("ftTree");
  if(ftResizeObserver) ftResizeObserver.disconnect();
  if(!tree) return;
  drawFamTree();
  centerFamTreeScroll();
  // Un ResizeObserver sur #ftTree ne réagit qu'aux changements de TAILLE du conteneur — pas à
  // un simple recentrage interne de ses rangées (ex. la rangée des grands-parents, plus étroite
  // que celle des enfants, dont le centrage horizontal dépend de la largeur totale de l'arbre :
  // elle peut se décaler sans que #ftTree change lui-même de taille). Quelques passages
  // supplémentaires sur les deux prochaines frames rattrapent ce cas (et recentrent une
  // dernière fois, une fois la mise en page définitivement stabilisée) — et, plus généralement,
  // toute police qui finit de charger ou tout réajustement de mise en page qui suivrait le
  // premier rendu — à un coût négligeable (drawFamTree() ne fait que lire des rectangles et
  // réécrire un <svg>).
  if(typeof requestAnimationFrame === "function"){
    requestAnimationFrame(() => {
      drawFamTree();
      requestAnimationFrame(() => { drawFamTree(); centerFamTreeScroll(); });
    });
  }
  if(typeof ResizeObserver !== "undefined"){
    ftResizeObserver = new ResizeObserver(() => drawFamTree());
    ftResizeObserver.observe(tree);
  }
  if(document.fonts && document.fonts.ready && document.fonts.ready.then){
    document.fonts.ready.then(() => drawFamTree()).catch(() => {});
  }
}

// Écouteur unique, posé une seule fois (voir bindAppClickDelegation) : ne redessine que si un
// arbre est actuellement affiché, pour ne rien faire sur les autres écrans.
function handleFamTreeWindowResize(){
  if(document.getElementById("ftTree")) drawFamTree();
}

// Aperçu « Lignée » directement sur la fiche d'une figure : ses parents et ses enfants (groupés
// par union, pour identifier la mère de chacun) sans quitter la fiche, plus un lien vers
// l'arbre complet pour aller plus loin.
function genealogyLineageHTML(id){
  if(!genealogyHasData(id)) return "";
  const rel = genealogyRelations(id);
  const unions = genealogyChildUnions(id);
  return `
    <div class="related geneal-lineage">
      <h3>Lignée</h3>
      ${genealogyChipsHTML(rel.parents, "Parents")}
      ${unions.length ? `
        <div class="geneal-group">
          <h4>Enfants</h4>
          ${unions.map(u => `
            <div class="geneal-union-line">
              <span class="geneal-union-label">${u.partner ? `avec ${escapeHTML(genealogyDisplayName(u.partner))} :` : "union non précisée :"}</span>
              <div class="chips">
                ${u.children.map(cid => `<button class="chip${DEITY_PORTRAITS[cid] ? " chip-portrait" : ""}" data-nav="genealogy" data-id="${escapeHTML(cid)}">${genealogyPortraitHTML(cid)}${escapeHTML(genealogyDisplayName(cid))}</button>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <button class="geneal-tree-link" data-nav="genealogy" data-id="${escapeHTML(id)}">🌳 Voir dans l'arbre généalogique</button>
    </div>
  `;
}

function renderFigureDetail(id){
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  const note = DEITY_NOTES[id];
  const portrait = DEITY_PORTRAITS[id];
  let paragraphs = DEITY_LORE[id] || [];
  if(figureAccess(id) === "premium" && !isPremiumUnlocked()){
    if(!hasOwnerPreview()) return renderPaywall({ portrait, name, note });
    const cached = OWNER_PREVIEW_CACHE.figures[id];
    if(!cached || cached.loading){
      fetchOwnerPreviewContent("figures", id);
      return renderOwnerPreviewLoading({ portrait, name, note });
    }
    if(cached.locked) return renderPaywall({ portrait, name, note });
    paragraphs = cached.content.lore;
  }
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
      ${genealogyLineageHTML(id)}
      ${relatedChipsHTML(related, "symbol")}
    </article>
  `;
}

// Niveau de confiance d'une association symbole/divinité — affiché discrètement (une étiquette
// en italique, pas un badge de couleur criard) plutôt que présenté comme un fait uniforme :
// distinguer ce qui est explicitement attesté dans l'Antiquité de ce qui relève d'une
// interprétation, d'une tradition tardive ou d'une lecture moderne est un principe central de
// cette bibliothèque (voir le round de refonte demandé — "ne présente jamais une interprétation
// moderne comme une croyance grecque antique").
const SYMBOL_CERTAINTY_LABELS = {
  "attesté": "attesté dans les sources antiques",
  "fortement établi": "fortement établi par plusieurs sources convergentes",
  "interprétation": "interprétation plausible, non explicitement attestée",
  "tardif": "surtout issu d'une tradition postérieure",
  "moderne": "symbolique principalement moderne",
};

// La liste structurée des divinités/figures associées à un symbole (voir SYMBOL_LIBRARY[id]
// .deities) : chaque entrée précise la nature du lien et son degré de certitude plutôt que de
// se contenter d'un nom seul — c'est ce qui distingue "la chouette accompagne Athéna" (attesté,
// iconographie et monnaies à l'appui) d'une association forcée qui n'existerait que pour
// remplir une case.
function symbolDeitiesHTML(deities){
  if(!deities || !deities.length) return `<p class="empty">Aucune association divine clairement attestée n'a été identifiée pour ce symbole.</p>`;
  return `
    <div class="symbol-deities">
      ${deities.map(d => {
        const known = d.id in DEITY_NOTES;
        const name = d.id.charAt(0).toUpperCase() + d.id.slice(1);
        const certaintyLabel = SYMBOL_CERTAINTY_LABELS[d.certainty] || "";
        return `
          <div class="symbol-deity">
            ${known
              ? `<button class="chip" data-nav="figureDetail" data-id="${escapeHTML(d.id)}">${escapeHTML(name)}</button>`
              : `<span class="chip chip-inactive">${escapeHTML(name)}</span>`}
            <span class="symbol-deity-role">${escapeHTML(d.role)}</span>
            ${certaintyLabel ? `<span class="symbol-certainty">${escapeHTML(certaintyLabel)}</span>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// Les grands axes symboliques du symbole (vie, mort, guerre, sagesse, fertilité...), affichés
// en petites étiquettes plutôt qu'en une seule définition fourre-tout — un même symbole peut
// porter plusieurs significations, parfois contradictoires, selon le contexte.
function symbolDimensionsHTML(dimensions){
  if(!dimensions || !dimensions.length) return "";
  return `
    <div class="symbol-dimensions">
      ${dimensions.map(d => `<span class="symbol-dimension"><strong>${escapeHTML(d.axis)}</strong> — ${escapeHTML(d.text)}</span>`).join("")}
    </div>
  `;
}

// Renvoie vers d'autres fiches symboliques thématiquement liées (voir SYMBOL_LIBRARY[id]
// .relatedSymbols) — c'est ce qui transforme une collection de fiches isolées en un vrai réseau
// qu'on peut parcourir de proche en proche (ex. Laurier → Couronne → Lyre, tous liés à Apollon
// sous des angles différents).
function symbolRelatedHTML(ids){
  if(!ids || !ids.length) return "";
  return `
    <div class="related">
      <h3>Symboles associés</h3>
      <div class="chips">
        ${ids.filter(sid => sid in SYMBOL_LIBRARY).map(sid => {
          const rs = SYMBOL_LIBRARY[sid];
          return `<button class="chip chip-symbol" data-nav="symbolDetail" data-id="${escapeHTML(sid)}">${symbolChipIconHTML(sid, rs)}${escapeHTML(rs.label)}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function symbolSourcesHTML(sources){
  if(!sources || !sources.length) return `<p class="empty">Pas de source ancienne précise identifiée pour ce symbole — voir la mythologie ci-dessus pour le contexte général.</p>`;
  return `<ul class="symbol-sources">${sources.map(src => `<li>${escapeHTML(src)}</li>`).join("")}</ul>`;
}

// Fiche symbolique enrichie : synthèse immédiate, explication du "pourquoi", mythologie (le
// récit déjà présent, riche, sourcé et prudent sur les niveaux de certitude), divinités
// associées avec la nature exacte du lien, dimensions symboliques par grands axes, puis trois
// sections plus profondes repliées par défaut (iconographie, culte, histoire et évolution) pour
// que la fiche reste agréable à lire malgré sa profondeur, et enfin les sources et le réseau de
// fiches associées. Toutes les fiches n'ont pas de section culte ou d'évolution historique
// documentée — la section correspondante n'apparaît alors simplement pas, plutôt que d'être
// remplie pour la forme.
function renderSymbolDetail(id){
  let s = SYMBOL_LIBRARY[id];
  if(symbolAccess(id) === "premium" && !isPremiumUnlocked()){
    if(!hasOwnerPreview()) return renderPaywall({ icon: s.icon, illustration: SYMBOL_ILLUSTRATIONS[id], name: s.label, note: s.desc });
    const cached = OWNER_PREVIEW_CACHE.symbols[id];
    if(!cached || cached.loading){
      fetchOwnerPreviewContent("symbols", id);
      return renderOwnerPreviewLoading({ icon: s.icon, illustration: SYMBOL_ILLUSTRATIONS[id], name: s.label, note: s.desc });
    }
    if(cached.locked) return renderPaywall({ icon: s.icon, illustration: SYMBOL_ILLUSTRATIONS[id], name: s.label, note: s.desc });
    // content.json garde déjà icon/label/category/desc en plus du reste : un simple fusion
    // suffit, s redevient l'équivalent de la fiche complète d'avant la séparation du bundle.
    s = { ...s, ...cached.content };
  }
  const related = (s.links || []).map(dId => [dId, dId]).filter(([dId]) => dId in DEITY_NOTES);
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail symbol-detail">
      ${detailHeadingImageHTML({ icon: s.icon, illustration: SYMBOL_ILLUSTRATIONS[id], name: s.label })}
      <h2>${escapeHTML(s.label)}</h2>
      <p class="note">${escapeHTML(s.desc)}</p>

      ${s.atGlance ? `
        <section class="symbol-glance">
          <h4>En un coup d'œil</h4>
          <p>${linkifyLore(s.atGlance)}</p>
        </section>
      ` : ""}

      ${s.why ? `
        <section class="symbol-why">
          <h3>Pourquoi ?</h3>
          <p class="lore-text">${linkifyLore(s.why)}</p>
        </section>
      ` : ""}

      ${(s.lore || []).length ? `<h3>Dans la mythologie</h3>${s.lore.map(p => `<p class="lore-text">${linkifyLore(p)}</p>`).join("")}` : ""}

      <h3>Divinités associées</h3>
      ${symbolDeitiesHTML(s.deities)}

      ${symbolDimensionsHTML(s.dimensions)}

      ${s.iconography ? `
        <details class="symbol-more">
          <summary>Iconographie</summary>
          <p class="lore-text">${linkifyLore(s.iconography)}</p>
        </details>
      ` : ""}

      ${s.cult ? `
        <details class="symbol-more">
          <summary>Culte et religion</summary>
          <p class="lore-text">${linkifyLore(s.cult)}</p>
        </details>
      ` : ""}

      ${s.history ? `
        <details class="symbol-more">
          <summary>Histoire et évolution</summary>
          <p class="lore-text">${linkifyLore(s.history)}</p>
        </details>
      ` : ""}

      <details class="symbol-more">
        <summary>Sources</summary>
        ${symbolSourcesHTML(s.sources)}
      </details>

      ${relatedChipsHTML(related, "deity")}
      ${symbolRelatedHTML(s.relatedSymbols)}
    </article>
  `;
}

// Écran d'accueil de la généalogie : quelques points d'entrée choisis (voir
// GENEALOGY_STARTING_POINTS) plutôt qu'une liste des 264 figures — chacun ouvre désormais
// l'arbre complet à partir de sa racine (branches et sous-branches sur plusieurs générations,
// jamais une seule figure isolée), d'où l'exploration peut ensuite se poursuivre de proche en
// proche, un clic à la fois.
function renderGenealogyHome(){
  return `
    <div class="screen-header">
      <h2>Généalogie des dieux</h2>
    </div>
    <p class="note">Explorez les liens de parenté entre les figures du corpus sur plusieurs générations : parents, unions, frères et sœurs, enfants. Choisissez un point de départ, puis cliquez sur n'importe quel nom pour poursuivre l'exploration de proche en proche.</p>
    <div class="geneal-entrypoints">
      ${GENEALOGY_STARTING_POINTS.map(pt => `
        <button class="geneal-entry" data-nav="${pt.special ? escapeHTML(pt.special) : "genealogy"}"${pt.special ? "" : ` data-id="${escapeHTML(pt.id)}"`}>
          <span class="geneal-entry-title">${escapeHTML(pt.label)}${genealogyAccess(pt) === "premium" ? ' <span class="lock-badge">🔒</span>' : ""}</span>
          <span class="geneal-entry-sub">${escapeHTML(pt.sub)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

// Les unions de Zeus retenues pour l'écran des douze Olympiens : un choix éditorial pour cet
// écran précis (afficher ses 36 enfants recensés le rendrait illisible), mais chaque lien
// ci-dessous reste réel — enfants vérifiés directement contre GENEALOGY_PARENTS/CHILDREN
// (Zeus + Héra -> Arès, Hébé, Ilithyie ; Zeus + Pléiade Maïa -> Hermès ; Zeus + Léto -> Artémis
// et Apollon ; Zeus + Métis -> Athéna), pas une invention pour la mise en page.
const OLYMPIANS_ZEUS_UNIONS = [
  { partner: "héra", children: ["arès", "hébé", "ilithyie"] },
  { partner: "pléiades", children: ["hermès"] },
  { partner: "léto", children: ["artémis", "apollon"] },
  { partner: "métis", children: ["athéna"] },
  { partner: "sémélé", children: ["dionysos"] },
];

// Écran dédié aux douze Olympiens : Cronos et Rhéa en tête, leurs six enfants juste en dessous
// (les Olympiens ET Hadès, resté hors de l'Olympe mais bien de la même fratrie), puis, partant
// de Zeus, ses unions retenues pour ce tableau (voir OLYMPIANS_ZEUS_UNIONS), et enfin, dans une
// branche à part issue d'Ouranos seul, Aphrodite. Toutes les lignes de parenté sont tracées par
// le moteur générique ci-dessus (voir drawFamTree()) à partir des positions réelles des cartes,
// jamais approximées avec des bordures CSS.
function renderOlympiansOverview(){
  const connectors = [];
  FT_SEQ = 0;
  const row2Ids = ["déméter", "hestia", "héra", "poséidon", "zeus", "hadès"];
  const row2Nodes = row2Ids.map(cid => {
    if(cid === "zeus") return ftPersonBranchHTML(connectors, "zeus", OLYMPIANS_ZEUS_UNIONS);
    // Héphaïstos, enfant d'Héra seule (sans Zeus) selon la tradition la plus répandue : même
    // mécanisme de branche à union unique que Zeus, mais sans conjoint à afficher à côté d'elle.
    if(cid === "héra") return ftPersonBranchHTML(connectors, "héra", [{ partner: null, children: ["héphaïstos"] }]);
    return ftLeaf(connectors, cid);
  });
  const cronosRhea = ftBranchHTML(connectors, {
    cardA: ftCardMarkup("cronos"),
    cardB: ftCardMarkup("rhéa"),
    childrenHTML: row2Nodes.map(n => n.html).join(""),
    childSlots: row2Nodes.map(n => n.slot),
  });
  const aphroditeLeaf = ftLeaf(connectors, "aphrodite");
  const ouranosMer = ftBranchHTML(connectors, {
    cardA: ftCardMarkup("ouranos"),
    cardB: ftCardMarkup("mer", { symbol: true }),
    childrenHTML: aphroditeLeaf.html,
    childSlots: [aphroditeLeaf.slot],
  });
  FT_CONNECTORS = connectors;
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
      <h2>Les douze Olympiens</h2>
    </div>
    <div class="ft-wrap">
      <div class="ft-scroll">
        <div class="ft-tree ft-tree-stack" id="ftTree">
          ${cronosRhea.html}
          <div class="ft-tree-side">${ouranosMer.html}</div>
          <svg class="ft-links" id="ftLinks"></svg>
        </div>
      </div>
    </div>
  `;
}

// Les douze Titans (enfants d'Ouranos et Gaïa — voir GENEALOGY_PARENTS) : même principe que
// l'écran des douze Olympiens, pour ne plus focaliser ce point d'entrée sur Ouranos seul.
const TITAN_IDS = ["cronos", "rhéa", "océan", "téthys", "hypérion", "théia", "coéos", "phoebé", "crios", "japet", "mnémosyne", "thémis"];

function renderTitansOverview(){
  if(!isPremiumUnlocked() && !hasOwnerPreview()){
    return renderPaywall({ name: "Les douze Titans", note: "Ouranos, Gaïa et toute leur première génération divine." });
  }
  const connectors = [];
  FT_SEQ = 0;
  const childNodes = TITAN_IDS.map(cid => ftLeaf(connectors, cid));
  const ouranosGaia = ftBranchHTML(connectors, {
    cardA: ftCardMarkup("ouranos"),
    cardB: ftCardMarkup("gaïa"),
    childrenHTML: childNodes.map(n => n.html).join(""),
    childSlots: childNodes.map(n => n.slot),
  });
  FT_CONNECTORS = connectors;
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
      <h2>Les douze Titans</h2>
    </div>
    <div class="ft-wrap">
      <div class="ft-scroll">
        <div class="ft-tree" id="ftTree">
          ${ouranosGaia.html}
          <svg class="ft-links" id="ftLinks"></svg>
        </div>
      </div>
    </div>
  `;
}

// Vue par défaut de « La lignée de Persée » : les deux ascendances (Zeus/Danaé d'un côté,
// Cassiopée de l'autre) convergent directement vers le couple Persée/Andromède et leurs sept
// enfants — plutôt que la fiche familiale générique, centrée sur Persée seul, qui obligeait à
// redessiner Andromède une seconde fois pour afficher sa propre ascendance (voir
// ftAncestorBranchHTML : le connecteur rejoint ici directement la carte du couple, jamais une
// instance dupliquée). Cliquer sur n'importe quel nom retombe sur sa fiche familiale complète,
// toujours dérouable plus loin.
function renderPerseeLineage(){
  if(!isPremiumUnlocked() && !hasOwnerPreview()){
    return renderPaywall({ name: "La lignée de Persée", note: "De Zeus et Danaé à ses sept enfants avec Andromède." });
  }
  const connectors = [];
  FT_SEQ = 0;
  const perseeCard = ftCardMarkup("persée");
  const andromedeCard = ftCardMarkup("andromède");
  const childUnions = buildFamilyCard("persée").childUnions;
  const childIds = childUnions.length ? childUnions[0].children : [];
  const kids = childIds.map(cid => ftLeaf(connectors, cid));
  const union = ftBranchHTML(connectors, {
    cardA: perseeCard,
    cardB: andromedeCard,
    childrenHTML: kids.map(k => k.html).join(""),
    childSlots: kids.map(k => k.slot),
  });
  const perseeAncestors = ftAncestorBranchHTML(connectors, perseeCard, "persée");
  const andromedeAncestors = ftAncestorBranchHTML(connectors, andromedeCard, "andromède");
  FT_CONNECTORS = connectors;
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
      <h2>La lignée de Persée</h2>
    </div>
    <div class="ft-wrap">
      <div class="ft-scroll">
        <div class="ft-tree" id="ftTree">
          ${(perseeAncestors || andromedeAncestors) ? `<div class="ft-ancestors-row">${perseeAncestors}${andromedeAncestors}</div>` : ""}
          ${union.html}
          <svg class="ft-links" id="ftLinks"></svg>
        </div>
      </div>
    </div>
  `;
}

// Écrans « explication globale » pour les points de départ dont la fiche familiale d'une seule
// figure ne suffit pas à raconter la lignée (demande explicite : « il ne faut pas faire un focus
// sur un seul [...] fais un texte explicatif des origines », « parle des rois de Thèbes en
// général, pas que Cadmos ») : un texte qui embrasse toute la famille plutôt qu'un arbre centré
// sur une seule carte, suivi de chips vers chaque figure citée pour continuer à explorer (chacune
// ouvre sa propre fiche familiale complète, comme avant).
const GENEALOGY_OVERVIEWS = {
  origins: {
    title: "Les origines du monde",
    paragraphs: [
      "Tout part de Chaos (voir la fiche « Chaos »), le vide originel sans rien avant lui. De lui naissent, sans union ni parent, quatre puissances premières : Gaïa (voir la fiche « Gaïa »), la Terre elle-même ; Tartare (voir la fiche « Tartare »), l'abîme le plus profond ; Érèbe (voir la fiche « Érèbe »), les ténèbres ; et Nyx (voir la fiche « Nyx »), la nuit.",
      "Gaïa engendre à son tour, seule, Ouranos (voir la fiche « Ouranos »), le Ciel étoilé qui la recouvre entièrement. Unie ensuite à lui, elle donne naissance aux douze Titans — dont Cronos (voir la fiche « Cronos ») et Rhéa (voir la fiche « Rhéa ») —, ainsi qu'aux Cyclopes et aux Hécatonchires, des géants aux cent bras.",
      "Cronos, le plus jeune des Titans, renverse Ouranos à l'instigation de Gaïa, lasse de la cruauté de son époux, et règne à son tour sur le monde. Mais l'histoire se répète : ses propres enfants, menés par Zeus (voir la fiche « Zeus »), le détrônent après une longue guerre contre les Titans pour fonder l'ordre olympien qui donne son nom au reste de la généalogie.",
    ],
    chips: ["chaos", "gaïa", "ouranos", "nyx", "érèbe", "tartare", "cronos", "zeus"],
  },
  theban: {
    title: "Le cycle thébain",
    paragraphs: [
      "Cadmos (voir la fiche « Cadmos »), prince phénicien parti à la recherche de sa sœur Europe enlevée par Zeus, fonde Thèbes après avoir semé les dents d'un dragon, d'où surgissent les Spartes, ses premiers guerriers. Avec Harmonie (voir la fiche « Harmonie »), fille d'Arès et Aphrodite, il a cinq enfants — Sémélé, Ino, Autonoë, Agavé et Polydoros — dont les destins tournent presque tous à la tragédie : Sémélé, foudroyée en voulant contempler Zeus dans sa vraie forme, devient malgré tout mère de Dionysos ; Autonoë voit son fils Actéon déchiré par ses propres chiens ; Agavé, prise de folie bachique, démembre de ses mains son propre fils Penthée (voir les fiches « Sémélé », « Autonoë » et « Agavé »).",
      "Seul Polydoros transmet la lignée royale jusqu'à Laïos, son petit-fils. Averti par un oracle que son propre fils le tuerait un jour, Laïos fait exposer son enfant Œdipe (voir la fiche « Œdipe ») dès sa naissance — en vain : la prophétie s'accomplit malgré tout, et Œdipe, sans le savoir, tue son père et épouse sa mère Jocaste.",
      "Leurs enfants — Étéocle, Polynice, Antigone et Ismène — héritent d'une malédiction familiale qui déchire Thèbes jusqu'à la génération suivante, les deux frères s'entretuant pour le trône et Antigone (voir la fiche « Antigone ») payant de sa vie le simple droit d'enterrer les siens.",
    ],
    chips: ["cadmos", "harmonie", "sémélé", "autonoë", "agavé", "polydoros", "laïos", "œdipe", "antigone"],
  },
  troy: {
    title: "La guerre de Troie",
    paragraphs: [
      "Priam (voir la fiche « Priam »), roi de Troie, et son épouse Hécube (voir la fiche « Hécube ») ont de très nombreux enfants, au premier rang desquels Hector (voir la fiche « Hector »), le plus vaillant défenseur de la cité, et Pâris (voir la fiche « Pâris »), dont l'enlèvement d'Hélène — épouse du roi grec Ménélas — déclenche la guerre elle-même.",
      "Cassandre (voir la fiche « Cassandre »), une autre de leurs filles, reçoit d'Apollon le don de prophétie mais aussi la malédiction de n'être jamais crue : elle prédit en vain la chute de Troie à qui veut bien l'entendre.",
      "La guerre décime la lignée royale : Hector tombe sous les coups d'Achille, Pâris meurt peu après, et Troie, livrée par la ruse du cheval de bois, est détruite — Priam lui-même est tué durant le sac de la ville, mettant fin à sa dynastie.",
    ],
    chips: ["priam", "hécube", "hector", "pâris", "cassandre", "hélène", "achille"],
  },
  atrides: {
    title: "Les Atrides",
    paragraphs: [
      "Descendants d'Atrée (voir la fiche « Atrée »), dont la vengeance sur son frère Thyeste — lui faire manger ses propres enfants — maudit toute la lignée, les Atrides Agamemnon et Ménélas (voir les fiches « Agamemnon » et « Ménélas ») épousent les deux sœurs Clytemnestre et Hélène.",
      "L'enlèvement d'Hélène par Pâris pousse Agamemnon à mener la coalition grecque contre Troie — mais pour obtenir des vents favorables, il sacrifie sa propre fille Iphigénie (voir la fiche « Iphigénie »), un crime que Clytemnestre ne lui pardonne jamais : à son retour de Troie, elle l'assassine avec son amant Égisthe, fils de Thyeste.",
      "Leur fils Oreste (voir la fiche « Oreste »), poussé par sa sœur Électre, venge alors son père en tuant sa propre mère — un matricide qui le poursuit à son tour, jusqu'à ce qu'un tribunal athénien, dans une version tardive du mythe, l'acquitte enfin et brise la malédiction familiale.",
    ],
    chips: ["atrée", "thyeste", "agamemnon", "clytemnestre", "ménélas", "hélène", "iphigénie", "oreste", "électre"],
  },
  ulysseFamily: {
    title: "La famille d'Ulysse",
    paragraphs: [
      "Ulysse (voir la fiche « Ulysse »), roi d'Ithaque, épouse Pénélope (voir la fiche « Pénélope »), dont il a un fils, Télémaque (voir la fiche « Télémaque »), avant de partir pour la guerre de Troie — un voyage qui, à cause de la colère de Poséidon, se prolonge dix années de plus en un périple semé d'épreuves (Cyclope, sirènes, Charybde et Scylla...).",
      "Pendant ce temps, Pénélope repousse ses prétendants par la ruse, tandis que la magicienne Circé (voir la fiche « Circé »), qui retient un temps Ulysse sur son île, lui donne un autre fils, Télégonos.",
      "À son retour, Ulysse doit reconquérir sa propre maison en éliminant les prétendants — et, selon une tradition plus tardive, périt des années plus tard de la main de Télégonos, qui ne le reconnaît pas.",
    ],
    chips: ["ulysse", "pénélope", "télémaque", "circé", "télégonos"],
  },
};

function renderGenealogyOverview(key){
  const data = GENEALOGY_OVERVIEWS[key];
  if(!isPremiumUnlocked() && !hasOwnerPreview()){
    return renderPaywall({ name: data.title, note: data.paragraphs[0] });
  }
  const chips = data.chips.filter(cid => cid in DEITY_NOTES);
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
      <h2>${escapeHTML(data.title)}</h2>
    </div>
    ${data.paragraphs.map(p => `<p class="lore-text">${linkifyLore(p)}</p>`).join("")}
    ${chips.length ? `
      <div class="related">
        <h3>Figures de cette lignée</h3>
        <div class="chips">
          ${chips.map(cid => `<button class="chip${DEITY_PORTRAITS[cid] ? " chip-portrait" : ""}" data-nav="genealogy" data-id="${escapeHTML(cid)}">${genealogyPortraitHTML(cid)}${escapeHTML(genealogyDisplayName(cid))}</button>`).join("")}
        </div>
      </div>
    ` : ""}
  `;
}

// Fiche familiale d'une figure : ses grands-parents paternels et maternels (chacun dans sa
// propre branche, reliés à leur enfant respectif — jamais mélangés en une seule rangée plate),
// ses parents réunis en couple, sa fratrie et elle-même juste en dessous (les vrais frères et
// sœurs, ou ceux qui comptent vraiment — voir SIBLING_PARENT_MAX_PARTNERS), puis sa ou ses
// propres unions et leurs enfants — et rien de plus : jamais au-delà des grands-parents, jamais
// les petits-enfants. Aucun texte de section ("Ascendance", "Descendance"...), l'arbre lui-même
// suffit à se faire comprendre. Cliquer sur n'importe quel nom recentre l'écran sur lui (chaque
// clic empile un écran, si bien que « ← Retour » redéroule l'exploration pas à pas).
function renderGenealogy(id){
  const name = genealogyDisplayName(id);
  const note = DEITY_NOTES[id];
  const portrait = DEITY_PORTRAITS[id];
  // Seule "Les douze Olympiens" (renderOlympiansOverview, jamais cette fonction-ci) est
  // gratuite — l'arbre généalogique général reste premium quel que soit le point d'entrée
  // (démarré depuis un des 7 autres points de départ, ou atteint via "Voir dans l'arbre
  // généalogique" depuis n'importe quelle fiche figure, même gratuite) : fermer ici plutôt
  // que de gater chaque point d'entrée séparément évite tout contournement par un chemin
  // détourné vers la même fonction.
  if(!isPremiumUnlocked() && !hasOwnerPreview()){
    return renderPaywall({ portrait, name, note });
  }
  const card = buildFamilyCard(id);
  const hasAny = card.parents.length || card.partners.length || card.siblings.length || card.childUnions.length;
  const connectors = [];
  FT_SEQ = 0;
  let treeHTML;
  if(card.parents.length){
    const fatherCard = ftCardMarkup(card.parents[0]);
    const motherCard = card.parents[1] ? ftCardMarkup(card.parents[1]) : null;
    const ancestorsHTML = [ftAncestorBranchHTML(connectors, fatherCard, card.parents[0])];
    if(motherCard) ancestorsHTML.push(ftAncestorBranchHTML(connectors, motherCard, card.parents[1]));
    const filteredAncestorsHTML = ancestorsHTML.filter(Boolean);
    const combinedIds = [...card.siblings, id].sort(byGenealogyDisplayName);
    const combinedNodes = combinedIds.map(pid => pid === id
      ? ftPersonBranchHTML(connectors, id, card.childUnions, { self: true })
      : ftLeaf(connectors, pid));
    const parentsUnion = ftBranchHTML(connectors, {
      cardA: fatherCard,
      cardB: motherCard,
      childrenHTML: combinedNodes.map(n => n.html).join(""),
      childSlots: combinedNodes.map(n => n.slot),
    });
    treeHTML = `
      ${filteredAncestorsHTML.length ? `<div class="ft-ancestors-row">${filteredAncestorsHTML.join("")}</div>` : ""}
      ${parentsUnion.html}
    `;
  } else {
    // Aucun parent connu (figure primordiale, ou lignée non documentée) : la figure elle-même,
    // avec ses propres unions et enfants s'il y en a, devient la racine de l'arbre.
    treeHTML = ftPersonBranchHTML(connectors, id, card.childUnions, { self: true }).html;
  }
  FT_CONNECTORS = connectors;
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    ${hasAny ? `
      <div class="ft-wrap">
        <div class="ft-scroll">
          <div class="ft-tree" id="ftTree">
            ${treeHTML}
            <svg class="ft-links" id="ftLinks"></svg>
          </div>
        </div>
      </div>
    ` : ""}
    <div class="ft-self-meta">
      ${portrait ? `<img class="geneal-portrait" src="${escapeHTML(portrait)}" alt="${escapeHTML(name)}" loading="lazy">` : ""}
      <h2>${escapeHTML(name)}</h2>
      ${note ? `<p class="note">${escapeHTML(note)}</p>` : ""}
      <button class="geneal-fiche-link" data-nav="figureDetail" data-id="${escapeHTML(id)}">Voir la fiche complète →</button>
    </div>
    ${!hasAny ? `<p class="empty">Aucune parenté connue pour ${escapeHTML(name)} dans ce corpus.</p>` : ""}
  `;
}

/* ===================== RENDU : LIEUX & CARTE ===================== */

// État de filtrage in-memory (toutes les catégories actives par défaut) : volontairement pas
// persisté d'une session à l'autre, un filtre reste secondaire par rapport au contenu lui-même.
let activePlaceCategories = new Set(Object.keys(MAP_CATEGORY_META));

function placesFilteredList(){
  const searchEl = document.getElementById("placesSearch");
  const q = normalizeSearch(searchEl ? searchEl.value : "").trim();
  return MAP_PLACE_ENTRIES.filter(p =>
    activePlaceCategories.has(p.category) &&
    (!q || normalizeSearch(p.name + " " + p.desc).includes(q))
  );
}

function placeMarkerIcon(place){
  const meta = MAP_CATEGORY_META[place.category] || { icon: "📍", color: "var(--bronze)" };
  return L.divIcon({
    className: "place-marker",
    html: `<span class="place-marker-pin" style="background:${meta.color}">${mapCategoryIconHTML(place.category, "place-marker-icon")}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -24],
  });
}

// Contenu de popup construit comme un vrai nœud DOM (plutôt qu'une chaîne confiée à Leaflet) :
// le bouton qu'il contient reçoit son propre écouteur direct, Leaflet interceptant lui-même la
// propagation des clics à l'intérieur d'un popup avant qu'elle n'atteigne la délégation posée
// une fois pour toutes sur #app (voir bindAppClickDelegation) — sans ça, « Voir la fiche »
// resterait sans effet.
function placePopupContent(place){
  const el = document.createElement("div");
  el.className = "place-popup";
  el.innerHTML = `
    <strong>${escapeHTML(place.name)}</strong>
    <p>${escapeHTML(place.desc)}</p>
    <button type="button" class="chip">Voir la fiche</button>
  `;
  el.querySelector("button").addEventListener("click", () => {
    if(placesMapInstance) placesMapInstance.closePopup();
    go({ type: "placeDetail", id: place.id });
  });
  return el;
}

let placesMapInstance = null;
let placesMarkersLayer = null;
function destroyPlacesMap(){
  if(placesMapInstance){ placesMapInstance.remove(); placesMapInstance = null; placesMarkersLayer = null; }
}

function renderPlacesMarkers(){
  if(!placesMapInstance || !placesMarkersLayer) return;
  placesMarkersLayer.clearLayers();
  for(const p of placesFilteredList()){
    L.marker(p.coords, { icon: placeMarkerIcon(p) })
      .bindPopup(placePopupContent(p))
      .addTo(placesMarkersLayer);
  }
}

// Carte reconstruite entièrement à chaque passage sur l'écran : #placesMap n'est jamais le même
// nœud DOM d'un render() à l'autre (comme #ftTree pour l'arbre généalogique), donc l'ancienne
// instance Leaflet est toujours détruite avant, jamais empilée. Si Leaflet n'a pas pu se charger
// (hors-ligne au tout premier chargement, CDN inaccessible...), la recherche et la liste
// continuent de fonctionner normalement sans carte — le conteneur garde alors simplement son
// message de repli (voir renderPlaces()).
//
// Tuiles avec noms de lieux en graphie latine/internationale plutôt qu'en grec : le rendu OSM
// standard affiche chaque lieu dans sa langue locale (donc en grec ici), illisible sans la
// connaître — signalé par l'utilisatrice. Wikimedia "osm-intl" applique la transcription
// internationale (proche de l'anglais : « Athens », « Delphi »...) sans nécessiter de clé
// d'API, contrairement aux styles réellement multilingues (MapTiler et consorts) qui en
// réclament une — la vraie traduction française des libellés natifs de la carte n'est donc pas
// possible sans ce genre de service payant, mais au moins lisible sans connaître le grec.
function mapTileLayer(){
  return L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors, tuiles <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use" target="_blank" rel="noopener">Wikimedia</a>',
  });
}

function initPlacesMap(){
  const container = document.getElementById("placesMap");
  if(!container){ destroyPlacesMap(); return; }
  if(typeof L === "undefined") return;
  destroyPlacesMap();
  placesMapInstance = L.map(container, { scrollWheelZoom: false }).setView([38.2, 23.5], 6);
  mapTileLayer().addTo(placesMapInstance);
  placesMarkersLayer = L.layerGroup().addTo(placesMapInstance);
  renderPlacesMarkers();
  if(typeof requestAnimationFrame === "function"){
    requestAnimationFrame(() => { if(placesMapInstance) placesMapInstance.invalidateSize(); });
  }
}

let placeDetailMapInstance = null;
function destroyPlaceDetailMap(){
  if(placeDetailMapInstance){ placeDetailMapInstance.remove(); placeDetailMapInstance = null; }
}

function initPlaceDetailMap(){
  const container = document.getElementById("placeDetailMap");
  if(!container){ destroyPlaceDetailMap(); return; }
  if(typeof L === "undefined") return;
  const place = MAP_PLACES.find(p => p.id === container.dataset.placeId);
  destroyPlaceDetailMap();
  if(!place) return;
  placeDetailMapInstance = L.map(container, { scrollWheelZoom: false }).setView(place.coords, 8);
  mapTileLayer().addTo(placeDetailMapInstance);
  L.marker(place.coords, { icon: placeMarkerIcon(place) }).addTo(placeDetailMapInstance);
  if(typeof requestAnimationFrame === "function"){
    requestAnimationFrame(() => { if(placeDetailMapInstance) placeDetailMapInstance.invalidateSize(); });
  }
}

// Un seul écouteur, posé une seule fois (voir bindAppClickDelegation) : ne redessine que la
// carte effectivement présente sur l'écran courant, sans jamais rien recréer.
function handlePlacesMapWindowResize(){
  if(placesMapInstance) placesMapInstance.invalidateSize();
  if(placeDetailMapInstance) placeDetailMapInstance.invalidateSize();
}

function togglePlaceCategory(cat){
  if(activePlaceCategories.has(cat)) activePlaceCategories.delete(cat);
  else activePlaceCategories.add(cat);
  const grid = document.getElementById("placesGrid");
  if(grid) grid.innerHTML = renderPlacesGrid();
  const filters = document.querySelector(".place-filters");
  if(filters) filters.outerHTML = placeFilterChipsHTML();
  renderPlacesMarkers();
}

// Chips de filtre : fonctionnent aussi de légende, chaque catégorie affichant déjà son icône
// et sa couleur — inutile d'ajouter un second bloc de légende séparé rien que pour ça.
function placeFilterChipsHTML(){
  return `
    <div class="place-filters">
      ${Object.entries(MAP_CATEGORY_META).map(([cat, meta]) => `
        <button type="button" class="place-filter-chip${activePlaceCategories.has(cat) ? " active" : ""}" data-place-cat="${escapeHTML(cat)}" style="--place-color:${meta.color}">
          <span class="place-filter-dot"></span>${mapCategoryIconHTML(cat, "place-filter-icon")} ${escapeHTML(meta.label)}
        </button>
      `).join("")}
    </div>
  `;
}

function placeRowHTML(p){
  return `<button class="list-item" data-nav="placeDetail" data-id="${escapeHTML(p.id)}">
    <span class="list-item-title">${mapCategoryIconHTML(p.category, "place-row-icon")} ${escapeHTML(p.name)}</span>
    <span class="list-item-note">${escapeHTML(p.desc)}</span>
  </button>`;
}

function renderPlacesGrid(){
  const list = placesFilteredList();
  if(!list.length) return `<p class="empty">Aucun lieu ne correspond à ces critères.</p>`;
  return `<div class="list">${list.map(placeRowHTML).join("")}</div>`;
}

function renderPlaces(){
  return `
    <div class="screen-header">
      <h2>Lieux mythologiques</h2>
    </div>
    <p class="note">${MAP_PLACES.length} lieux réels — sanctuaires, montagnes, cités, îles, détroits, sources et entrées des Enfers — où la tradition antique situait ses mythes.</p>
    <div id="placesMap" class="places-map"><p class="map-fallback">Chargement de la carte…</p></div>
    ${placeFilterChipsHTML()}
    <input type="search" class="search" id="placesSearch" placeholder="Chercher un lieu (nom, mythe...)">
    <div id="placesGrid">${renderPlacesGrid()}</div>
  `;
}

function renderPlaceDetail(id){
  const p = MAP_PLACES.find(x => x.id === id);
  if(!p){
    return `
      <div class="screen-header"><button class="back" data-nav="back">← Retour</button></div>
      <p class="empty">Ce lieu est introuvable.</p>
    `;
  }
  const meta = MAP_CATEGORY_META[p.category];
  const relatedFigures = (p.links || []).filter(fid => fid in DEITY_NOTES).map(fid => [fid, DEITY_NOTES[fid]]);
  const relatedSymbols = (p.symbolLinks || []).filter(sid => sid in SYMBOL_LIBRARY).map(sid => [sid, SYMBOL_LIBRARY[sid]]);
  return `
    <div class="screen-header">
      <button class="back" data-nav="back">← Retour</button>
    </div>
    <article class="detail place-detail">
      <span class="place-category-badge" style="--place-color:${meta.color}">${mapCategoryIconHTML(p.category, "place-badge-icon")} ${escapeHTML(meta.label)}</span>
      <h2>${escapeHTML(p.name)}</h2>
      <p class="note">${escapeHTML(p.desc)}</p>
      <div id="placeDetailMap" class="place-detail-map" data-place-id="${escapeHTML(p.id)}"><p class="map-fallback">Chargement de la carte…</p></div>
      ${p.lore.map(par => `<p class="lore-text">${linkifyLore(par)}</p>`).join("")}
      ${relatedChipsHTML(relatedFigures, "deity")}
      ${relatedChipsHTML(relatedSymbols, "symbol")}
    </article>
  `;
}

/* ===================== RENDU : MENU FIXE ===================== */

// Les icônes des cinq onglets sont des badges illustrés (voir assets/badge-*.webp) plutôt que
// des emoji — insérés tels quels dans renderBottomNav(), qui ne les échappe pas (elles ne
// viennent jamais d'une saisie utilisateur).
const TABS = [
  { type: "home", icon: '<img class="nav-badge" src="assets/badge-home-temple.webp" alt="">', label: "Accueil" },
  { type: "figures", icon: '<img class="nav-badge" src="assets/badge-figures-portrait.webp" alt="">', label: "Figures" },
  { type: "symbols", icon: '<img class="nav-badge" src="assets/badge-symbols-lyre.webp" alt="">', label: "Symboles" },
  { type: "genealogyHome", icon: '<img class="nav-badge" src="assets/badge-genealogy-mother.webp" alt="">', label: "Généalogie" },
  { type: "places", icon: '<img class="nav-badge" src="assets/badge-places-map.webp" alt="">', label: "Lieux" },
];

// Un onglet du bas reste actif tant qu'on est sur une fiche de sa section (figureDetail
// pour l'onglet Figures, symbolDetail pour l'onglet Symboles, genealogy pour l'onglet
// Généalogie, placeDetail pour l'onglet Lieux), pas seulement sur la liste elle-même — sinon
// le menu du bas paraîtrait « éteint » dès qu'on ouvre une fiche.
//
// Chaque point de départ spécial de GENEALOGY_STARTING_POINTS (voir plus haut) a sa propre
// fonction de rendu ici — les diagrammes (Titans, Olympiens, lignée de Persée) profitent de
// toute la largeur de la page (GENEALOGY_WIDE_SCREENS) comme la fiche familiale générique ;
// les explications globales restent dans la colonne de lecture normale.
const GENEALOGY_SPECIAL_SCREENS = {
  originsOverview: () => renderGenealogyOverview("origins"),
  titansOverview: () => renderTitansOverview(),
  olympiansOverview: () => renderOlympiansOverview(),
  perseeLineage: () => renderPerseeLineage(),
  troyOverview: () => renderGenealogyOverview("troy"),
  atridesOverview: () => renderGenealogyOverview("atrides"),
  thebanOverview: () => renderGenealogyOverview("theban"),
  ulysseOverview: () => renderGenealogyOverview("ulysseFamily"),
};
const GENEALOGY_WIDE_SCREENS = new Set(["genealogy", "olympiansOverview", "titansOverview", "perseeLineage"]);

function activeTabType(){
  if(currentScreen.type === "figureDetail") return "figures";
  if(currentScreen.type === "symbolDetail") return "symbols";
  if(currentScreen.type === "genealogy" || currentScreen.type in GENEALOGY_SPECIAL_SCREENS) return "genealogyHome";
  if(currentScreen.type === "placeDetail") return "places";
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
    case "genealogyHome": html = renderGenealogyHome(); break;
    case "genealogy": html = renderGenealogy(currentScreen.id); break;
    case "originsOverview": case "titansOverview": case "olympiansOverview": case "perseeLineage":
    case "troyOverview": case "atridesOverview": case "thebanOverview": case "ulysseOverview":
      html = GENEALOGY_SPECIAL_SCREENS[currentScreen.type]();
      break;
    case "places": html = renderPlaces(); break;
    case "placeDetail": html = renderPlaceDetail(currentScreen.id); break;
    default: html = renderHome();
  }
  app.innerHTML = html;
  // Les écrans d'arbre généalogique profitent de toute la largeur disponible plutôt que de
  // rester cantonnés à la colonne de lecture étroite du reste de l'appli (voir #app.wide dans
  // styles.css) — vérifié défensivement, certains DOM simulés des tests n'ont pas classList.
  if(app.classList){
    app.classList.toggle("wide", GENEALOGY_WIDE_SCREENS.has(currentScreen.type));
  }
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
      else if(nav === "genealogyHome") goToTab("genealogyHome");
      else if(nav === "figureDetail") go({ type: "figureDetail", id: navEl.dataset.id });
      else if(nav === "symbolDetail") go({ type: "symbolDetail", id: navEl.dataset.id });
      else if(nav === "genealogy") go({ type: "genealogy", id: navEl.dataset.id });
      else if(nav in GENEALOGY_SPECIAL_SCREENS) go({ type: nav });
      else if(nav === "places") goToTab("places");
      else if(nav === "placeDetail") go({ type: "placeDetail", id: navEl.dataset.id });
      return;
    }
    const deityEl = e.target.closest("[data-deity]");
    if(deityEl){ go({ type: "figureDetail", id: deityEl.dataset.deity }); return; }
    const symbolEl = e.target.closest("[data-symbol]");
    if(symbolEl){ go({ type: "symbolDetail", id: symbolEl.dataset.symbol }); return; }
    const placeCatEl = e.target.closest("[data-place-cat]");
    if(placeCatEl){ togglePlaceCategory(placeCatEl.dataset.placeCat); return; }
    const actionEl = e.target.closest("[data-action]");
    if(actionEl){
      if(actionEl.dataset.action === "unlock-premium") attemptPurchase();
      else if(actionEl.dataset.action === "restore-purchase") attemptRestore();
      else if(actionEl.dataset.action === "owner-preview") promptOwnerPreviewKey();
      return;
    }
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
  const placesSearch = document.getElementById("placesSearch");
  if(placesSearch){
    placesSearch.addEventListener("input", () => {
      document.getElementById("placesGrid").innerHTML = renderPlacesGrid();
      renderPlacesMarkers();
    });
  }
  // Les écrans d'arbre généalogique (fiche familiale, douze Olympiens) recréent #ftTree à
  // chaque render() — jamais le même nœud persistant — donc l'observateur de redimensionnement
  // doit être reconnecté (et les connecteurs redessinés une première fois) à chaque passage ici.
  initFamTree();
  // Même principe pour la carte des lieux (#placesMap) et la mini-carte de fiche lieu
  // (#placeDetailMap) : chacune vérifie elle-même la présence de son conteneur et ne fait rien
  // si l'écran courant n'est pas le sien.
  initPlacesMap();
  initPlaceDetailMap();
}

/* ===================== INIT ===================== */

initOwnerPreviewFromUrl();
bindAppClickDelegation();
window.addEventListener("resize", handleFamTreeWindowResize);
window.addEventListener("resize", handlePlacesMapWindowResize);
render();

if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
