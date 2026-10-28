import Link from "next/link";
import { PageHero, Wrap } from "@/components/ui";
import { posts } from "@/lib/data";
export const metadata = { title: "Blog | O2 Innovations Lab" };
export default function Blog() {
  return (<main><PageHero title="Insights on technology, education and innovation" text="Stories and ideas from the O2 team and alumni." />
    <Wrap><div className="grid md:grid-cols-3 gap-6">{posts.map(p => <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-ink/5 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"><p className="text-sm text-flame font-semibold">{p.tag} · {p.date}</p><h2 className="mt-2 text-2xl font-bold">{p.title}</h2><p className="mt-3 text-ink/70">{p.excerpt}</p></Link>)}</div></Wrap></main>);
}
