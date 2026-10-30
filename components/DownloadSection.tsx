"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/config";
export function Stats({ k }: { k: number }) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => { fetch("/api/stats", { cache: "no-store" }).then(r => r.json()).then(d => setN(d.downloads)).catch(() => {}); }, [k]);
  const items = [["Total Downloads", n === null ? "—" : n.toLocaleString()], ["Current Version", SITE.version], ["Latest Release", new Date(SITE.releaseDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })], ["APK Size", SITE.sizeLabel]];
  return <div className="stats">{items.map(([a, b]) => <div key={a} className="card"><b>{b}</b><span>{a}</span></div>)}</div>;
}
export function DownloadButton({ onDone }: { onDone?: () => void }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle"); const [pct, setPct] = useState(0);
  async function go() {
    setState("loading"); setPct(0);
    try {
      const res = await fetch("/api/download"); if (!res.ok || !res.body) throw new Error();
      const total = Number(res.headers.get("content-length")) || 0; const reader = res.body.getReader(); const chunks: Uint8Array[] = []; let got = 0;
      for (;;) { const { done, value } = await reader.read(); if (done) break; chunks.push(value); got += value.length; if (total) setPct(Math.round((got / total) * 100)); }
      const url = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: "application/vnd.android.package-archive" }));
      const a = document.createElement("a"); a.href = url; a.download = SITE.fileName; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
      setState("done"); onDone?.();
    } catch { setState("error"); }
  }
  return (<div className="dl">
    <button className="btn primary" onClick={go} disabled={state === "loading"}>{state === "loading" ? `DOWNLOADING… ${pct ? pct + "%" : ""}` : "DOWNLOAD FOR ANDROID"}</button>
    {state === "loading" && <div className="bar"><i style={{ width: pct + "%" }} /></div>}
    {state === "done" && <p className="ok" role="status">✓ Download complete. Open {SITE.fileName} to install — steps are in the FAQ below.</p>}
    {state === "error" && <p className="err" role="alert">Download was interrupted. <a href="/api/download">Tap here to download directly.</a></p>}
  </div>);
}
