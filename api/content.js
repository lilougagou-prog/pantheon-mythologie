// GET /api/content?type=figures|symbols&id=... — sert le contenu premium COMPLET, uniquement
// après vérification côté serveur du droit d'accès (jamais une confiance dans ce que le client
// prétend). Le contenu gratuit n'a jamais besoin de cet endpoint : il est déjà entièrement dans
// app.js. Voir l'audit de sécurité, section 12/13 : ceci est justement l'endpoint dont
// l'absence rendrait toute la séparation du bundle inutile.
//
// Anti-énumération (section 13) : le mode liste (sans ?id=) ne renvoie JAMAIS le contenu
// complet, entitled ou non — seulement les aperçus déjà publics. Récupérer l'intégralité de la
// bibliothèque premium demande donc un appel par fiche, un par un, ce que la limitation de
// débit (voir _lib/rate-limit.js) ralentit délibérément.
const fs = require("fs");
const path = require("path");
const { ensureSchema, isEntitled } = require("./_lib/db");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

const CONTENT = JSON.parse(fs.readFileSync(path.join(__dirname, "_data", "content.json"), "utf8"));

function previewOf(type, id, full){
  if(type === "figures") return { name: full.name, note: full.note };
  return { icon: full.icon, label: full.label, category: full.category, desc: full.desc };
}

module.exports = async function handler(req, res){
  if(req.method !== "GET"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const type = req.query && req.query.type;
  if(type !== "figures" && type !== "symbols"){
    res.status(400).json({ error: "Requête invalide : ?type=figures ou ?type=symbols attendu." });
    return;
  }

  const { allowed } = await checkRateLimit(`content:${clientIp(req)}`, 60).catch(() => ({ allowed: true }));
  if(!allowed){
    res.status(429).json({ error: "Trop de requêtes, réessaie dans une minute." });
    return;
  }

  const store = CONTENT[type];
  const id = req.query && req.query.id;

  // Mode liste : aperçus seulement, quel que soit le droit d'accès (voir anti-énumération
  // ci-dessus).
  if(!id){
    const previews = {};
    for(const [entryId, full] of Object.entries(store)) previews[entryId] = previewOf(type, entryId, full);
    res.status(200).json({ items: previews });
    return;
  }

  const full = store[id];
  if(!full){
    res.status(404).json({ error: "Fiche introuvable ou non premium (déjà disponible côté client)." });
    return;
  }

  // Aperçu propriétaire : contourne entièrement la vérification en base — utile tant qu'aucune
  // base de données n'est encore configurée, et pour toujours pouvoir tout relire soi-même sans
  // passer par un achat réel. Jamais un mécanisme pour un utilisateur normal : la clé n'est
  // connue que du propriétaire (variable d'environnement Vercel), jamais présente dans app.js
  // (public) — seul ce fichier, qui ne tourne jamais dans le navigateur, la connaît.
  const ownerKey = req.headers["x-owner-preview-key"];
  if(process.env.OWNER_PREVIEW_KEY && ownerKey === process.env.OWNER_PREVIEW_KEY){
    res.status(200).json({ locked: false, content: full });
    return;
  }

  try {
    await ensureSchema();
    const originalTransactionId = req.headers["x-original-transaction-id"];
    const entitled = typeof originalTransactionId === "string" && await isEntitled(originalTransactionId);
    if(!entitled){
      res.status(200).json({ locked: true, preview: previewOf(type, id, full) });
      return;
    }
    res.status(200).json({ locked: false, content: full });
  } catch(err) {
    console.error("Erreur /api/content:", err);
    res.status(500).json({ error: "Impossible de vérifier le droit d'accès pour le moment." });
  }
};
