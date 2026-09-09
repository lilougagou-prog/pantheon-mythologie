// POST /api/contact — formulaire "Nous contacter" de la fiche Profil. Stockage simple en base
// (voir _lib/db.js), jamais d'envoi automatique d'email : la propriétaire consulte elle-même
// les messages via GET (voir plus bas) — c'est le choix retenu plutôt qu'un service d'emails
// transactionnel, pour ne dépendre d'aucun compte externe.
//
// GET /api/contact — lecture réservée à la propriétaire, même mécanisme que l'aperçu
// propriétaire du contenu premium (voir content.js) : clé envoyée en en-tête
// x-owner-preview-key, comparée à la variable d'environnement OWNER_PREVIEW_KEY (jamais connue
// du code public, jamais présente dans app.js).
const { ensureSchema, insertContactMessage, listContactMessages } = require("./_lib/db");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

const VALID_TYPES = new Set(["question", "bug", "autre"]);
const MAX_MESSAGE_LENGTH = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res){
  if(req.method === "GET"){
    const ownerKey = req.headers["x-owner-preview-key"];
    if(!process.env.OWNER_PREVIEW_KEY || ownerKey !== process.env.OWNER_PREVIEW_KEY){
      res.status(401).json({ error: "Clé invalide." });
      return;
    }
    try {
      await ensureSchema();
      const messages = await listContactMessages(200);
      res.status(200).json({ messages });
    } catch(err) {
      console.error("Erreur /api/contact (lecture):", err);
      res.status(500).json({ error: "Impossible de lire les messages pour le moment." });
    }
    return;
  }

  if(req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  // Limite volontairement stricte (formulaire, pas un usage normal répété) — freine le spam
  // automatisé sans jamais gêner une utilisatrice qui enverrait deux messages de suite.
  const { allowed } = await checkRateLimit(`contact:${clientIp(req)}`, 5).catch(() => ({ allowed: true }));
  if(!allowed){
    res.status(429).json({ error: "Trop de messages envoyés, réessaie dans quelques minutes." });
    return;
  }

  const { type, message, email } = req.body || {};
  if(!VALID_TYPES.has(type)){
    res.status(400).json({ error: "Requête invalide : type attendu (question, bug ou autre)." });
    return;
  }
  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  if(!trimmedMessage){
    res.status(400).json({ error: "Le message est vide." });
    return;
  }
  if(trimmedMessage.length > MAX_MESSAGE_LENGTH){
    res.status(400).json({ error: "Message trop long." });
    return;
  }
  let trimmedEmail = null;
  if(email != null){
    if(typeof email !== "string" || !EMAIL_RE.test(email.trim())){
      res.status(400).json({ error: "Adresse email invalide." });
      return;
    }
    trimmedEmail = email.trim();
  }

  try {
    await ensureSchema();
    await insertContactMessage({ type, message: trimmedMessage, email: trimmedEmail });
    res.status(200).json({ ok: true });
  } catch(err) {
    console.error("Erreur /api/contact (écriture):", err);
    res.status(500).json({ error: "Envoi impossible pour le moment, réessaie plus tard." });
  }
};
