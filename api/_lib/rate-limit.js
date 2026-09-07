// Limitation de débit minimale mais réelle, appuyée sur la base de données plutôt que sur une
// variable en mémoire — une fonction serverless peut démarrer une instance neuve à tout moment
// (cold start), ce qui rendrait un compteur en mémoire silencieusement inefficace. Fenêtre
// glissante simplifiée : une fenêtre fixe par minute, ré-initialisée dès qu'elle expire.
//
// Objectif explicite (voir l'audit) : freiner l'extraction automatisée massive (scraping du
// contenu Premium fiche par fiche), pas gêner un usage normal — la limite reste large.
const { neon } = require("@neondatabase/serverless");

const WINDOW_MS = 60_000;

let cachedSql = null;
function sql(){
  if(!cachedSql){
    if(!process.env.DATABASE_URL) throw new Error("Variable d'environnement manquante : DATABASE_URL");
    cachedSql = neon(process.env.DATABASE_URL);
  }
  return cachedSql;
}

async function checkRateLimit(key, maxPerWindow){
  const db = sql();
  const now = new Date();
  const rows = await db`SELECT window_start, request_count FROM rate_limits WHERE rate_key = ${key}`;
  if(rows.length === 0){
    await db`INSERT INTO rate_limits (rate_key, window_start, request_count) VALUES (${key}, ${now.toISOString()}, 1)
              ON CONFLICT (rate_key) DO NOTHING`;
    return { allowed: true, remaining: maxPerWindow - 1 };
  }
  const windowStart = new Date(rows[0].window_start);
  const expired = (now.getTime() - windowStart.getTime()) > WINDOW_MS;
  if(expired){
    await db`UPDATE rate_limits SET window_start = ${now.toISOString()}, request_count = 1 WHERE rate_key = ${key}`;
    return { allowed: true, remaining: maxPerWindow - 1 };
  }
  const count = rows[0].request_count;
  if(count >= maxPerWindow) return { allowed: false, remaining: 0 };
  await db`UPDATE rate_limits SET request_count = request_count + 1 WHERE rate_key = ${key}`;
  return { allowed: true, remaining: maxPerWindow - count - 1 };
}

// Clé pragmatique : IP + route. x-forwarded-for peut contenir plusieurs adresses (proxy,
// Vercel) — on ne garde que la première, la plus proche du client réel.
function clientIp(req){
  const fwd = req.headers["x-forwarded-for"];
  if(typeof fwd === "string" && fwd.trim()) return fwd.split(",")[0].trim();
  return req.socket && req.socket.remoteAddress || "unknown";
}

module.exports = { checkRateLimit, clientIp };
