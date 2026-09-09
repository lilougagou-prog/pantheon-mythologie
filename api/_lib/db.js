// Accès base de données (Neon Postgres — l'intégration Vercel Postgres officielle repose
// désormais sur Neon) pour les droits Premium — la SEULE source de vérité pour "cet
// utilisateur a-t-il payé ?" ; jamais une valeur envoyée par le client ni un booléen côté app.
// Lit DATABASE_URL depuis les variables d'environnement Vercel (jamais dans le code).
//
// Une seule table : chaque ligne est ancrée sur l'identifiant Apple STABLE d'un achat non-
// consommable (originalTransactionId), pas sur un compte ou un identifiant d'appareil inventé
// par l'app — c'est justement ce qui permet à StoreKit de retrouver le même achat après un
// changement d'appareil ou une réinstallation (voir verify-purchase.js).
const { neon } = require("@neondatabase/serverless");

let cachedSql = null;
function sql(){
  if(!cachedSql){
    if(!process.env.DATABASE_URL) throw new Error("Variable d'environnement manquante : DATABASE_URL");
    cachedSql = neon(process.env.DATABASE_URL);
  }
  return cachedSql;
}

async function ensureSchema(){
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS entitlements (
      original_transaction_id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      environment TEXT NOT NULL,
      purchased_at TIMESTAMPTZ NOT NULL,
      revoked_at TIMESTAMPTZ,
      revocation_reason TEXT,
      last_transaction_id TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await db`
    CREATE TABLE IF NOT EXISTS rate_limits (
      rate_key TEXT PRIMARY KEY,
      window_start TIMESTAMPTZ NOT NULL,
      request_count INT NOT NULL
    );
  `;
  await db`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      message_type TEXT NOT NULL,
      message TEXT NOT NULL,
      email TEXT,
      app TEXT NOT NULL DEFAULT 'pantheon',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  // Table partagée avec l'app sœur Tarot de Delphes (voir CONTACT_DATABASE_URL dans son
  // .env.example) : ses messages tombent dans cette même table, distingués par `app` — d'où
  // cette migration défensive pour une table qui existait déjà avant l'ajout de la colonne.
  await db`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS app TEXT NOT NULL DEFAULT 'pantheon';`;
}

// Formulaire "Nous contacter" (voir api/contact.js) — stockage simple, jamais d'envoi
// automatique : consulté par la propriétaire elle-même via GET /api/contact (clé
// OWNER_PREVIEW_KEY, même mécanisme que l'aperçu propriétaire du contenu premium). Table
// également écrite par l'app sœur Tarot de Delphes (son propre endpoint, sa propre connexion
// CONTACT_DATABASE_URL vers CETTE base) — `app` distingue l'origine de chaque message ; jamais
// une valeur envoyée par le client, toujours fixée par l'appelant serveur.
async function insertContactMessage({ type, message, email, app }){
  const db = sql();
  await db`
    INSERT INTO contact_messages (message_type, message, email, app)
    VALUES (${type}, ${message}, ${email}, ${app || "pantheon"})
  `;
}

async function listContactMessages(limit){
  const db = sql();
  return await db`
    SELECT id, message_type, message, email, app, created_at
    FROM contact_messages
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
}

// Upsert : ne fait jamais régresser un achat déjà validé en cas de rappel en double (Apple
// peut notifier plusieurs fois le même événement) — sauf pour poser une révocation, qui doit au
// contraire toujours l'emporter (voir markRevoked ci-dessous, jamais annulée par un upsert
// ultérieur d'ONE_TIME_CHARGE tardif).
async function upsertEntitlement({ originalTransactionId, productId, environment, purchasedAt, transactionId }){
  const db = sql();
  await db`
    INSERT INTO entitlements (original_transaction_id, product_id, environment, purchased_at, last_transaction_id, updated_at)
    VALUES (${originalTransactionId}, ${productId}, ${environment}, ${purchasedAt}, ${transactionId}, now())
    ON CONFLICT (original_transaction_id) DO UPDATE SET
      last_transaction_id = EXCLUDED.last_transaction_id,
      updated_at = now()
  `;
}

async function markRevoked({ originalTransactionId, revokedAt, reason }){
  const db = sql();
  await db`
    INSERT INTO entitlements (original_transaction_id, product_id, environment, purchased_at, revoked_at, revocation_reason, updated_at)
    VALUES (${originalTransactionId}, 'unknown', 'unknown', ${revokedAt}, ${revokedAt}, ${reason}, now())
    ON CONFLICT (original_transaction_id) DO UPDATE SET
      revoked_at = ${revokedAt},
      revocation_reason = ${reason},
      updated_at = now()
  `;
}

// Entitled si et seulement si une ligne existe ET n'a jamais été révoquée — jamais l'inverse
// (une ligne absente ne veut pas dire "à vérifier plus tard", elle veut dire "non entitled",
// point final).
async function isEntitled(originalTransactionId){
  if(!originalTransactionId) return false;
  const db = sql();
  const rows = await db`
    SELECT revoked_at FROM entitlements WHERE original_transaction_id = ${originalTransactionId}
  `;
  return rows.length > 0 && rows[0].revoked_at === null;
}

module.exports = { ensureSchema, upsertEntitlement, markRevoked, isEntitled, insertContactMessage, listContactMessages };
