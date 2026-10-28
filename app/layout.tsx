import "./globals.css";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
const d = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const s = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
export const metadata = { title: "O2 Innovations Lab | Technology, software and training", description: "Enterprise software, IT consulting and tech training from Lafia, Nigeria." };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${d.variable} ${s.variable}`}><body>{children}</body></html>;
}
