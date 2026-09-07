// GET /api/entitlement?originalTransactionId=... — lecture rapide du droit Premium déjà
// persisté (voir verify-purchase.js), sans re-vérifier la signature Apple à chaque appel :
// c'est la ligne en base qui fait foi, et elle n'est mise à jour que par verify-purchase.js
// (achat/restauration) et apple-notifications.js (remboursement/révocation). Appelé au
// lancement de l'app pour décider quoi afficher, jamais comme unique barrière avant de servir
// le contenu (voir /api/content, qui revérifie lui-même).
const { ensureSchema, isEntitled } = require("./_lib/db");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

module.exports = async function handler(req, res){
  if(req.method !== "GET"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { allowed } = await checkRateLimit(`entitlement:${clientIp(req)}`, 60).catch(() => ({ allowed: true }));
  if(!allowed){
    res.status(429).json({ error: "Trop de requêtes, réessaie dans une minute." });
    return;
  }

  const originalTransactionId = req.query && req.query.originalTransactionId;
  if(typeof originalTransactionId !== "string" || !originalTransactionId.trim()){
    res.status(400).json({ error: "Requête invalide : ?originalTransactionId=... attendu." });
    return;
  }

  try {
    await ensureSchema();
    const entitled = await isEntitled(originalTransactionId);
    res.status(200).json({ entitled });
  } catch(err) {
    console.error("Erreur /api/entitlement:", err);
    res.status(500).json({ error: "Impossible de vérifier le droit Premium pour le moment." });
  }
};
