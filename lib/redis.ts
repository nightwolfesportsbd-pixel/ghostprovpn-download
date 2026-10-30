const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
export async function redis(cmd: (string | number)[]): Promise<any> {
  if (!url || !token) return null;
  const r = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(cmd), cache: "no-store" });
  if (!r.ok) throw new Error("redis " + r.status);
  return (await r.json()).result;
}
