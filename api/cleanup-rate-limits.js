// Nettoyage périodique de la table rate_limits (voir _lib/rate-limit.js) : chaque ligne n'est
// utile que pour la fenêtre d'une minute en cours, mais rien ne les supprime automatiquement
// (un UPSERT écrase une ligne existante, il ne fait jamais disparaître les lignes plus
// anciennes pour des clés — IP + route — qui ne se représentent plus). Sans purge, cette table
// grossirait indéfiniment et conserverait des adresses IP bien plus longtemps que nécessaire —
// contraire au principe de minimisation/limitation de conservation du RGPD pour une donnée qui
// n'a plus aucune utilité passé quelques minutes.
//
// Déclenché par un Cron Vercel (voir vercel.json, une fois par jour) — jamais appelé par le
// client. Supprime tout ce qui a plus d'une heure (large marge par rapport à la fenêtre d'une
// minute réellement utilisée).
const { neon } = require("@neondatabase/serverless");

module.exports = async function handler(req, res){
  // Vercel Cron signe ses appels avec ce header — évite qu'un tiers déclenche la purge à volonté
  // (sans conséquence grave ici, mais autant réserver l'endpoint à l'usage prévu).
  const authHeader = req.headers["authorization"];
  if(process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`){
    res.status(401).json({ error: "Non autorisé." });
    return;
  }
  try {
    if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL manquante");
    const sql = neon(process.env.DATABASE_URL);
    const deleted = await sql`DELETE FROM rate_limits WHERE window_start < now() - interval '1 hour' RETURNING rate_key`;
    res.status(200).json({ ok: true, deleted: deleted.length });
  } catch(err) {
    console.error("Erreur /api/cleanup-rate-limits:", err);
    res.status(500).json({ ok: false });
  }
};
