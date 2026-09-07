// POST /api/apple-notifications — webhook serveur-à-serveur (App Store Server Notifications
// V2), à déclarer dans App Store Connect. C'est le SEUL mécanisme qui permet de savoir qu'Apple
// a remboursé ou révoqué un achat après coup — sans lui, un remboursement ne serait jamais
// répercuté et l'utilisateur garderait le Premium indéfiniment après un remboursement.
//
// Reçoit { signedPayload } (format imposé par Apple, pas de query string ni de body custom).
// Toujours vérifié via verifyAndDecodeNotification (signature Apple), jamais lu tel quel.
const { ensureSchema, markRevoked } = require("./_lib/db");
const { verifyNotification } = require("./_lib/apple");

// Types de notification qui indiquent que l'achat non-consommable n'est plus valide.
const REVOKING_TYPES = new Set(["REFUND", "REVOKE"]);

module.exports = async function handler(req, res){
  if(req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { signedPayload } = req.body || {};
  if(typeof signedPayload !== "string" || !signedPayload.trim()){
    res.status(400).json({ error: "Requête invalide : signedPayload attendu." });
    return;
  }

  try {
    await ensureSchema();
    const notification = await verifyNotification(signedPayload);

    if(notification.notificationType === "TEST"){
      // Notification de test envoyée depuis App Store Connect pour vérifier que le webhook
      // répond correctement — rien à persister.
      res.status(200).json({ ok: true });
      return;
    }

    if(REVOKING_TYPES.has(notification.notificationType) && notification.data && notification.data.signedTransactionInfo){
      const { verifyPremiumTransaction } = require("./_lib/apple");
      const transaction = await verifyPremiumTransaction(notification.data.signedTransactionInfo).catch(() => null);
      // Un produit qui n'est pas le nôtre (autre app partageant le même compte développeur,
      // ou notification hors sujet) : on l'ignore silencieusement plutôt que de planter.
      if(transaction && transaction.originalTransactionId){
        await markRevoked({
          originalTransactionId: transaction.originalTransactionId,
          revokedAt: new Date(transaction.revocationDate || Date.now()).toISOString(),
          reason: `${notification.notificationType}${notification.subtype ? `/${notification.subtype}` : ""}`,
        });
      }
    }

    // Toute autre notification (SUBSCRIBED, DID_RENEW, EXPIRED...) ne concerne pas un achat
    // non-consommable unique — reçue et acquittée (200) mais sans action, pour qu'Apple ne la
    // renvoie pas indéfiniment en pensant qu'elle a échoué.
    res.status(200).json({ ok: true });
  } catch(err) {
    console.error("Erreur /api/apple-notifications:", err);
    // Renvoie tout de même 200 : selon la doc Apple, un code d'erreur provoque des tentatives
    // de renvoi répétées, ce qui n'aiderait pas si la cause est une erreur applicative durable
    // plutôt qu'une panne transitoire. On logue pour investigation au lieu de bloquer Apple.
    res.status(200).json({ ok: false });
  }
};
