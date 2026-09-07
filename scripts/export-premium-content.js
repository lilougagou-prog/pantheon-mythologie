#!/usr/bin/env node
// Script à lancer manuellement (jamais au déploiement) chaque fois que le contenu change :
//
//   node scripts/export-premium-content.js
//
// 1. Lit app.js tel qu'il est aujourd'hui (avec TOUT le contenu, y compris premium).
// 2. Écrit api/_data/content.json : le contenu complet des fiches PREMIUM uniquement
//    (DEITY_LORE, SYMBOL_LIBRARY et MAP_PLACES en entier pour les ids premium), lu ensuite
//    uniquement par api/content.js côté serveur, jamais exposé publiquement (voir vercel.json,
//    qui limite explicitement les fonctions routables à api/*.js listés — api/_data/ n'est
//    jamais une route).
// 3. Réécrit app.js en remplaçant DEITY_LORE / SYMBOL_LIBRARY / MAP_PLACES par des versions où
//    les fiches premium ne gardent que leurs champs d'aperçu (icon/label/category/desc/coords),
//    jamais le récit complet — c'est ça qui retire réellement le contenu premium du bundle
//    public, pas un simple masquage à l'affichage (voir l'audit de sécurité, section 7).
//
// Les fiches FREE, elles, gardent tout leur contenu directement dans app.js : rien à cacher,
// aucune raison de faire dépendre leur lecture d'un aller-retour réseau.
//
// Sûr à relancer : repart toujours de app.js tel qu'il est sur disque au moment de l'exécution.
// Si app.js a déjà été réduit par un lancement précédent, relance-le seulement après avoir
// remis le contenu complet (git checkout d'une version antérieure) — ce script ne sait pas
// "regonfler" un app.js déjà réduit, seulement réduire un app.js complet.

const fs = require("fs");
const path = require("path");

const APP_JS_PATH = path.join(__dirname, "..", "app.js");
const CONTENT_JSON_PATH = path.join(__dirname, "..", "api", "_data", "content.json");

const src = fs.readFileSync(APP_JS_PATH, "utf8");

// --- Charge les données réelles (même technique que les smoke tests de ce dépôt) ---
function makeMutableEl(){
  const el = { _html: "", listeners: [], classes: new Set() };
  Object.defineProperty(el, "innerHTML", { get(){ return el._html; }, set(v){ el._html = v; } });
  el.addEventListener = () => {};
  el.classList = { toggle(){}, contains(){ return false; } };
  return el;
}
const appEl = makeMutableEl();
global.document = { getElementById: id => (id === "app" || id === "bottomNav") ? appEl : null, querySelector(){ return null; } };
global.window = { scrollTo(){}, addEventListener(){} };
global.navigator = {};
eval(src + "\nglobal.__e = { DEITY_NOTES, DEITY_LORE, SYMBOL_LIBRARY, MAP_PLACES };");
const { DEITY_NOTES, DEITY_LORE, SYMBOL_LIBRARY, MAP_PLACES } = global.__e;
// figureAccess/symbolAccess sont des déclarations de fonction, déjà en portée directement.

// --- 1. Construit content.json (fiches premium uniquement, contenu complet + champs
//        d'aperçu dupliqués depuis app.js pour que api/content.js n'ait jamais besoin de lire
//        app.js lui-même) ---
const contentJson = { figures: {}, symbols: {}, places: {} };
for(const [id, lore] of Object.entries(DEITY_LORE)){
  if(figureAccess(id) === "premium"){
    contentJson.figures[id] = { lore, name: id.charAt(0).toUpperCase() + id.slice(1), note: DEITY_NOTES[id] };
  }
}
for(const [id, s] of Object.entries(SYMBOL_LIBRARY)){
  if(symbolAccess(id) === "premium"){
    contentJson.symbols[id] = { ...s }; // inclut déjà icon/label/category/desc (aperçu) + le reste (contenu complet)
  }
}
// Les lieux ne sont PAS concernés par ce chantier Premium (périmètre non demandé) : laissés
// intégralement publics dans app.js, jamais touchés ici — content.json.places reste vide.


fs.mkdirSync(path.dirname(CONTENT_JSON_PATH), { recursive: true });
fs.writeFileSync(CONTENT_JSON_PATH, JSON.stringify(contentJson, null, 0));
console.log(`content.json écrit : ${Object.keys(contentJson.figures).length} figures, ${Object.keys(contentJson.symbols).length} symboles, ${Object.keys(contentJson.places).length} lieux premium.`);

// --- 2. Trouve un bloc "const NAME = <valeur>;" dans le texte source par comptage de
//        crochets/accolades (jamais une regex fragile sur du contenu arbitraire) ---
function findTopLevelConstBlock(text, name){
  const declRe = new RegExp(`const ${name}\\s*=\\s*`, "m");
  const m = declRe.exec(text);
  if(!m) throw new Error(`Déclaration introuvable : const ${name}`);
  const valueStart = m.index + m[0].length;
  const openChar = text[valueStart];
  if(openChar !== "{" && openChar !== "[") throw new Error(`Valeur inattendue pour ${name} : ${openChar}`);
  const closeChar = openChar === "{" ? "}" : "]";
  let depth = 0, inString = null, i = valueStart;
  for(; i < text.length; i++){
    const c = text[i];
    if(inString){
      if(c === "\\") { i++; continue; }
      if(c === inString) inString = null;
      continue;
    }
    // Commentaires : très nombreux dans ce fichier (prose française abondante, avec ses
    // propres apostrophes) — il FAUT les ignorer avant tout suivi de chaîne, sans quoi une
    // simple apostrophe dans un commentaire ("l'Animal...") est prise pour l'ouverture d'une
    // chaîne JS réelle et désynchronise tout le comptage qui suit (bug constaté et corrigé
    // pendant la construction de ce script : voir le commit qui l'introduit).
    if(c === "/" && text[i+1] === "/"){
      const nl = text.indexOf("\n", i);
      i = (nl === -1 ? text.length : nl) - 1; // -1 car la boucle fait i++ juste après
      continue;
    }
    if(c === "/" && text[i+1] === "*"){
      const endC = text.indexOf("*/", i + 2);
      i = (endC === -1 ? text.length : endC + 1); // pointe sur le "/" final, la boucle avance ensuite
      continue;
    }
    if(c === '"' || c === "'" || c === "`"){ inString = c; continue; }
    if(c === openChar) depth++;
    else if(c === closeChar){ depth--; if(depth === 0) { i++; break; } }
  }
  // Avale un éventuel ";" final.
  let end = i;
  if(text[end] === ";") end++;
  return { start: m.index, end };
}

function replaceTopLevelConst(text, name, newValueLiteral){
  const { start, end } = findTopLevelConstBlock(text, name);
  return text.slice(0, start) + `const ${name} = ${newValueLiteral};` + text.slice(end);
}

// --- 3. Construit les versions publiques (aperçu seulement pour le contenu premium) ---
const publicDeityLore = {};
for(const [id, lore] of Object.entries(DEITY_LORE)){
  publicDeityLore[id] = figureAccess(id) === "free" ? lore : [];
}

const publicSymbolLibrary = {};
for(const [id, s] of Object.entries(SYMBOL_LIBRARY)){
  if(symbolAccess(id) === "free"){
    publicSymbolLibrary[id] = s;
  } else {
    // Aperçu seulement : icône, libellé, catégorie, description courte — jamais le récit, les
    // divinités associées, les dimensions symboliques, les sources, etc.
    publicSymbolLibrary[id] = { icon: s.icon, label: s.label, category: s.category, desc: s.desc };
  }
}

// Les lieux ne sont pas concernés par ce chantier Premium (périmètre non demandé par
// l'utilisateur) : MAP_PLACES n'est jamais touché, contrairement à DEITY_LORE et
// SYMBOL_LIBRARY ci-dessus.

let out = src;
out = replaceTopLevelConst(out, "DEITY_LORE", JSON.stringify(publicDeityLore));
out = replaceTopLevelConst(out, "SYMBOL_LIBRARY", JSON.stringify(publicSymbolLibrary));

fs.writeFileSync(APP_JS_PATH, out);
console.log("app.js réécrit : le contenu premium complet n'y figure plus (aperçu seulement).");
