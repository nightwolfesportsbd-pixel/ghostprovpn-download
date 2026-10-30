import { redis } from "@/lib/redis";
import { SITE } from "@/lib/config";
export const dynamic = "force-dynamic";
export async function GET() {
  let downloads: number | null = null;
  try { const v = await redis(["GET", "downloads:total"]); if (v !== null) downloads = Number(v) || 0; } catch {}
  return Response.json({ downloads, version: SITE.version, releaseDate: SITE.releaseDate, size: SITE.sizeLabel });
}
