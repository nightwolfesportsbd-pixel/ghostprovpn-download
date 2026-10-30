// Cleans common paste mistakes (spaces, quotes, missing https://, redis:// links).
const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "");
let url = clean(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL);
const token = clean(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN);
if (url && !/^https?:\/\//.test(url)) url = "https://" + url.replace(/^rediss?:\/\//, "");
url = url.replace(/\/+$/, "");

export const redisConfigured = () => Boolean(url && token);
export const redisHost = () => { try { return new URL(url).host; } catch { return url ? "invalid-url" : ""; } };

export async function redis(cmd: (string | number)[]): Promise<any> {
  if (!url || !token) return null;
  const r = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(cmd), cache: "no-store" });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(`redis ${r.status}: ${j.error || "request failed"}`);
  return j.result;
}
