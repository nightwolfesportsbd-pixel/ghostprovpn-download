"use client";
import { useState } from "react";
const SHOTS = [
  { src: "/shots/1.webp", t: "Home / VPN Connection" },
  { src: "/shots/2.webp", t: "Server Locations" },
  { src: "/shots/3.webp", t: "Live Network Diagnostics" },
  { src: "/shots/4.webp", t: "Security & Configuration" },
];
export default function Gallery() {
  const [i, setI] = useState(0); const [open, setOpen] = useState(false);
  return (<div>
    <div className="tabs" role="tablist">{SHOTS.map((s, k) => <button key={k} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>{s.t}</button>)}</div>
    <div className="phones">{SHOTS.map((s, k) => (
      <button key={k} className={"phone" + (k === i ? " active" : "")} onClick={() => (k === i ? setOpen(true) : setI(k))} aria-label={`${s.t} screenshot`}>
        <img src={s.src} alt={`Ghost VPN app: ${s.t}`} loading={k < 2 ? "eager" : "lazy"} />
      </button>))}</div>
    <p className="hint">Tap the highlighted screen to preview it full size.</p>
    {open && <div className="lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true"><img src={SHOTS[i].src} alt={SHOTS[i].t} /><span>Close ✕</span></div>}
  </div>);
}
