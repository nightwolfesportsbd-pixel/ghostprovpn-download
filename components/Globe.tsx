"use client";
import { useEffect, useRef } from "react";
export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = 520, dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.height = S * dpr; ctx.scale(dpr, dpr);
    const pts = Array.from({ length: 160 }, (_, i) => { const y = 1 - (i / 159) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996; return [Math.cos(t) * r, y, Math.sin(t) * r]; });
    const links: [number, number][] = []; for (let i = 0; i < 26; i++) links.push([Math.floor(Math.random() * 160), Math.floor(Math.random() * 160)]);
    let a = 0, raf = 0, vis = true;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(c);
    const proj = (p: number[]) => { const x = p[0] * Math.cos(a) - p[2] * Math.sin(a), z = p[0] * Math.sin(a) + p[2] * Math.cos(a); return { x: S / 2 + x * 190, y: S / 2 + p[1] * 190, z }; };
    const draw = () => {
      raf = requestAnimationFrame(draw); if (!vis) return; if (!reduce) a += 0.004;
      ctx.clearRect(0, 0, S, S);
      const g = ctx.createRadialGradient(S / 2, S / 2, 60, S / 2, S / 2, 230); g.addColorStop(0, "rgba(79,124,255,.18)"); g.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(S / 2, S / 2, 230, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(120,160,255,.35)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(S / 2, S / 2, 190, 0, 7); ctx.stroke();
      const P = pts.map(proj);
      for (const [i, j] of links) { const p = P[i], q = P[j]; if (p.z < 0 || q.z < 0) continue; ctx.strokeStyle = "rgba(34,211,238,.55)"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.quadraticCurveTo((p.x + q.x) / 2, (p.y + q.y) / 2 - 50, q.x, q.y); ctx.stroke(); }
      for (const p of P) { ctx.fillStyle = p.z > 0 ? "rgba(167,139,250,.95)" : "rgba(79,124,255,.25)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.z > 0 ? 2.4 : 1.4, 0, 7); ctx.fill(); }
    };
    draw(); return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return <canvas ref={ref} className="globe" aria-label="Animated network globe" role="img" />;
}
