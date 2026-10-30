import { createHash } from "crypto";
import { redis } from "@/lib/redis";
import { SITE } from "@/lib/config";
export const dynamic = "force-dynamic";
// Counts one download per visitor per 24h, only when this endpoint is requested (never on page views).
export async function GET(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const id = createHash("sha256").update(ip + (process.env.IP_SALT || "")).digest("hex").slice(0, 32);
    const fresh = await redis(["SET", `dl:${SITE.version}:${id}`, "1", "NX", "EX", 86400]);
    if (fresh) await redis(["INCR", "downloads:total"]);
  } catch {}
  const target = SITE.apkUrl.startsWith("http") ? SITE.apkUrl : new URL(SITE.apkUrl, req.url).toString();
  return Response.redirect(target, 302);
}
