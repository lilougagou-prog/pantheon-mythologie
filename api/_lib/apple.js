// Vérification des transactions Apple (App Store Server Library officielle — jamais de JWS
// décodé "à la main" : la vérification de la chaîne de certificats jusqu'aux autorités racines
// d'Apple est ce qui garantit qu'une transaction n'a pas été forgée côté client).
//
// Variables d'environnement attendues (jamais commitées, configurées côté Vercel uniquement) :
//   APPLE_BUNDLE_ID            — identifiant de bundle de l'app iOS (ex. com.tondomaine.pantheon)
//   APPLE_APP_APPLE_ID         — identifiant numérique App Store Connect (production uniquement)
//   APPLE_ENVIRONMENT          — "Sandbox" ou "Production"
//   APPLE_ISSUER_ID            — Issuer ID de la clé d'API In-App Purchase (App Store Connect)
//   APPLE_KEY_ID               — Key ID de cette même clé
//   APPLE_PRIVATE_KEY          — contenu du fichier .p8 téléchargé (clé privée, PEM), tel quel
//   APPLE_ROOT_CERTIFICATES    — certificats racine Apple (PEM), un ou plusieurs, séparés par
//                                une ligne "-----END CERTIFICATE-----" suivie d'un saut de ligne
//                                (voir https://www.apple.com/certificateauthority/)
//
// PRODUIT ATTENDU : "premium_full_access", non-consommable (Type.NON_CONSUMABLE) — tout autre
// productId ou type est rejeté, même si la transaction est par ailleurs valide.
const {
  AppStoreServerAPIClient,
  SignedDataVerifier,
  Environment,
  Type,
} = require("@apple/app-store-server-library");

const PREMIUM_PRODUCT_ID = "premium_full_access";

function requiredEnv(name){
  const v = process.env[name];
  if(!v) throw new Error(`Variable d'environnement manquante : ${name}`);
  return v;
}

function appleEnvironment(){
  const raw = process.env.APPLE_ENVIRONMENT || "Sandbox";
  return raw === "Production" ? Environment.PRODUCTION : Environment.SANDBOX;
}

function parseRootCertificates(){
  const raw = requiredEnv("APPLE_ROOT_CERTIFICATES");
  // Autorise plusieurs certificats concaténés dans la même variable d'environnement.
  const blocks = raw.split(/(?<=-----END CERTIFICATE-----)/g).map(b => b.trim()).filter(Boolean);
  return blocks.map(b => Buffer.from(b, "utf8"));
}

let cachedVerifier = null;
function getVerifier(){
  if(cachedVerifier) return cachedVerifier;
  const bundleId = requiredEnv("APPLE_BUNDLE_ID");
  const environment = appleEnvironment();
  const appAppleId = environment === Environment.PRODUCTION
    ? Number(requiredEnv("APPLE_APP_APPLE_ID"))
    : undefined;
  cachedVerifier = new SignedDataVerifier(parseRootCertificates(), true, environment, bundleId, appAppleId);
  return cachedVerifier;
}

let cachedApiClient = null;
function getApiClient(){
  if(cachedApiClient) return cachedApiClient;
  cachedApiClient = new AppStoreServerAPIClient(
    requiredEnv("APPLE_PRIVATE_KEY"),
    requiredEnv("APPLE_KEY_ID"),
    requiredEnv("APPLE_ISSUER_ID"),
    requiredEnv("APPLE_BUNDLE_ID"),
    appleEnvironment(),
  );
  return cachedApiClient;
}

// Décode ET vérifie une transaction signée envoyée par le client (obtenue côté iOS via
// Transaction.currentEntitlements ou juste après un achat) — rejette tout ce qui n'est pas
// exactement l'achat non-consommable attendu, même une transaction Apple par ailleurs valide
// mais pour un autre produit.
async function verifyPremiumTransaction(signedTransactionInfo){
  const verifier = getVerifier();
  const payload = await verifier.verifyAndDecodeTransaction(signedTransactionInfo);
  if(payload.productId !== PREMIUM_PRODUCT_ID){
    throw new Error(`Produit inattendu : ${payload.productId}`);
  }
  if(payload.type !== Type.NON_CONSUMABLE){
    throw new Error(`Type de transaction inattendu : ${payload.type}`);
  }
  return payload;
}

// Décode ET vérifie une notification serveur-à-serveur (App Store Server Notifications V2) —
// utilisé par api/apple-notifications.js pour réagir aux remboursements/révocations.
async function verifyNotification(signedPayload){
  const verifier = getVerifier();
  return verifier.verifyAndDecodeNotification(signedPayload);
}

module.exports = { PREMIUM_PRODUCT_ID, verifyPremiumTransaction, verifyNotification, getApiClient, getVerifier };
