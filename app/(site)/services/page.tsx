import Link from "next/link";
import { PageHero, Wrap, Cta } from "@/components/ui";
import { services } from "@/lib/data";
export const metadata = { title: "IT services | O2 Innovations Lab" };
export default function Services() {
  return (<main><PageHero title="Systems built around how you work" text="Seven core services for schools, institutions and businesses, plus bespoke software for any industry." />
    <Wrap><div className="grid md:grid-cols-2 gap-6">{services.map(s => (
      <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"><h2 className="text-3xl font-bold">{s.title}</h2><p className="mt-3 text-ink/75">{s.body}</p><p className="mt-5 font-semibold text-navy">View details</p></Link>))}</div></Wrap><Cta /></main>);
}
