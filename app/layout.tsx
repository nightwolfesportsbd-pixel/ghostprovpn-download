import "./globals.css";
import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  title: "Ghost VPN — Official Android Download",
  description: "Download Ghost VPN for Android. Global servers, kill switch, auto reconnect, split tunneling and live network diagnostics.",
  openGraph: { title: "Ghost VPN — Your Privacy. Your Freedom. Your Ghost.", description: "Official Android download.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#070b1f" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
