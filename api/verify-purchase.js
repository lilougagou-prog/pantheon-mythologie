// POST /api/verify-purchase — appelé par le client juste après un achat StoreKit réussi (ou
// après une restauration : voir Transaction.currentEntitlements côté iOS). Reçoit la
// transaction signée par Apple, la vérifie réellement (jamais une simple lecture du champ
// productId envoyé tel quel par le client), puis persiste le droit Premium en base — c'est
// cette ligne en base, et RIEN côté client, qui fait foi ensuite pour /api/content.
const { ensureSchema, upsertEntitlement } = require("./_lib/db");
const { verifyPremiumTransaction } = require("./_lib/apple");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

module.exports = async function handler(req, res){
  if(req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { allowed } = await checkRateLimit(`verify-purchase:${clientIp(req)}`, 20).catch(() => ({ allowed: true }));
  if(!allowed){
    res.status(429).json({ error: "Trop de tentatives, réessaie dans une minute." });
    return;
  }

  const { signedTransactionInfo } = req.body || {};
  if(typeof signedTransactionInfo !== "string" || !signedTransactionInfo.trim()){
    res.status(400).json({ error: "Requête invalide : signedTransactionInfo attendu." });
    return;
  }

  try {
    await ensureSchema();
    const payload = await verifyPremiumTransaction(signedTransactionInfo);

    // Une transaction déjà révoquée (remboursée) au moment même de la vérification initiale —
    // rare mais possible (rejeu d'une transaction ancienne) — ne doit jamais débloquer le
    // Premium.
    if(payload.revocationDate){
      res.status(200).json({ entitled: false, reason: "revoked" });
      return;
    }

    await upsertEntitlement({
      originalTransactionId: payload.originalTransactionId,
      productId: payload.productId,
      environment: payload.environment,
      purchasedAt: new Date(payload.purchaseDate).toISOString(),
      transactionId: payload.transactionId,
    });

    res.status(200).json({ entitled: true, originalTransactionId: payload.originalTransactionId });
  } catch(err) {
    console.error("Erreur /api/verify-purchase:", err);
    res.status(400).json({ error: "Transaction invalide ou non vérifiable.", entitled: false });
  }
};
