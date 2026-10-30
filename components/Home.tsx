"use client";
import { useState } from "react";
import Logo from "./Logo"; import Globe from "./Globe"; import Gallery from "./Gallery";
import { Stats, DownloadButton } from "./DownloadSection"; import { SITE } from "@/lib/config";
const FEATURES = [
  ["🌐", "Global Server Locations", "Browse 199 country locations with ping and load shown for each."],
  ["⚡", "Fastest Server", "One tap to connect to the quickest available server."],
  ["🎲", "Random Server", "Jump to a random location instantly."],
  ["⭐", "Favorite Servers", "Star the locations you use most."],
  ["📡", "Live Network Diagnostics", "Run a test for download speed on the connected server."],
  ["⏱️", "Latency & Jitter", "See latency and jitter in milliseconds."],
  ["📉", "Packet Loss Monitoring", "Packet loss percentage shown alongside the speed test."],
  ["🛑", "Kill Switch", "Option to block traffic if the VPN drops."],
  ["🔁", "Auto Reconnect", "Restores the tunnel automatically."],
  ["🛡️", "Ad & Tracker Shield", "Setting to block malicious trackers."],
  ["🔀", "Split Tunneling", "Choose apps that bypass the VPN."],
  ["🎨", "Multiple App Themes", "Stealth, Cyber, Obsidian and Arctic themes."],
];
const FAQ = [
  ["What is Ghost VPN?", "Ghost VPN is an Android VPN app with global server locations, a kill switch, auto reconnect, split tunneling and live network diagnostics."],
  ["How can I download Ghost VPN?", "Press “Download for Android” on this page. The file is delivered as " + SITE.fileName + "."],
  ["How do I install the APK?", "Open the downloaded file. If Android asks, allow installs from your browser or file manager (Settings → Security / Install unknown apps), then tap Install."],
  ["What is the latest version?", `The latest version is ${SITE.version}, released ${SITE.releaseDate}.`],
  ["Is Ghost VPN available for Android?", `Yes. Ghost VPN is built for Android (${SITE.minAndroid}).`],
  ["How can I contact support?", `Email ${SITE.supportEmail}` + (SITE.whatsappUrl ? " or message us on WhatsApp." : ".")],
];
export default function Home() {
  const [k, setK] = useState(0);
  return (<>
    <header className="nav"><Logo /><nav aria-label="Main"><a href="#features">Features</a><a href="#screens">Screenshots</a><a href="#vip">VIP</a><a href="#faq">FAQ</a></nav></header>
    <main>
      <section className="hero">
        <div><span className="badge">v{SITE.version} · APK {SITE.sizeLabel} · {SITE.minAndroid}</span>
          <h1>Your Privacy.<br /><span className="grad">Your Freedom.</span><br />Your Ghost.</h1>
          <p>Ghost VPN is a fast, modern Android VPN with a world of server locations, a kill switch, split tunneling and live network diagnostics.</p>
          <DownloadButton onDone={() => setTimeout(() => setK(x => x + 1), 600)} />
          <a className="btn ghost" href="#features">EXPLORE FEATURES</a>
        </div><Globe />
      </section>
      <section className="wrap"><Stats k={k} /></section>
      <section id="screens" className="wrap"><h2>See the app</h2><Gallery /></section>
      <section id="features" className="wrap"><h2>Features</h2>
        <div className="grid">{FEATURES.map(([i, t, d]) => <div className="card" key={t}><span className="ico">{i}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section id="vip" className="wrap"><div className="vip"><span className="gold">★ VIP</span><h2>The VIP Experience</h2>
        <p>Unlock the full network: 192 VIP stealth nodes beyond the 7 free locations, plus the VIP High-Speed Boost option for multi-thread turbo routing.</p>
        <a className="btn gold-btn" href="#screens">Explore VIP Experience</a></div></section>
      <section id="faq" className="wrap"><h2>FAQ</h2>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    </main>
    <footer><Logo size={28} /><p>Ghost VPN — privacy tools for Android.</p>
      <p>Support: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>{SITE.whatsappUrl ? <> · <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp ({SITE.supportName})</a></> : ` · WhatsApp: ${SITE.supportName}`}</p>
      <p><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a></p><p>© 2026 Ghost VPN. All rights reserved.</p></footer>
  </>);
}
