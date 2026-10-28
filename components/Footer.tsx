import Link from "next/link";
import { socials, services } from "@/lib/data";
import { getCourses } from "@/lib/courses";

export default async function Footer() {
  const courses = await getCourses();
  return (
    <footer className="bg-ink text-white/80 px-5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-4">
        <div><h3 className="text-white text-2xl font-bold">O2 Innovations Lab</h3>
          <p className="mt-3 text-sm">IT consulting, custom software and hands-on tech training in Lafia, Nasarawa State.</p>
          <div className="mt-5 flex flex-wrap gap-2">{socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-3 py-1 text-xs hover:bg-flame hover:text-ink">{n}</a>)}</div></div>
        <div><h4 className="text-white font-semibold mb-3">Services</h4><ul className="grid gap-2 text-sm">{services.slice(0, 6).map(s => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul></div>
        <div><h4 className="text-white font-semibold mb-3">Training</h4><ul className="grid gap-2 text-sm">{courses.slice(0, 6).map(c => <li key={c.slug}><Link href={`/training/${c.slug}`}>{c.title}</Link></li>)}</ul></div>
        <div><h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">Plot 160 AJ Ahmadu Plaza, Custom Line, Makurdi Rd, Lafia, Nasarawa State</p>
          <p className="mt-2 text-sm"><a href="tel:+2349039022216">+234 903 902 2216</a></p>
          <p className="text-sm"><a href="mailto:02Innovationslab@gmail.com">02Innovationslab@gmail.com</a></p></div>
      </div>
      <p className="mx-auto max-w-7xl mt-12 border-t border-white/15 pt-6 text-xs">© 2026 O2 Innovations Lab. All rights reserved.</p>
    </footer>
  );
}
